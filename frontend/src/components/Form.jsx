import { useState, useEffect } from 'react';
import Modal from './FormModal';

export default function Form() {

    const [firstName, setFirstName]     = useState('')
    const [lastName, setLastName]       = useState('')
    const [email, setEmail]             = useState('')
    const [phone, setPhone]             = useState('')
    const [message, setMessage]         = useState('')
    const [check, setCheck]             = useState(false)
    const [success, setSuccess]         = useState('');
    const [website, setWebsite]         = useState('') //Honeypot for spam/bot
    const [error, setError]             = useState('') // erreur générale (réseau / serveur)
    const [modal, setModal]             = useState(false)
    const emptyFieldErrors = {firstName: '', lastName: '', email: '', phone: '', message: '', consent: '', website: ''}
    const [fieldErrors, setFieldErrors] = useState(emptyFieldErrors) //erreur de champ

    useEffect(() => {
    if (!success) return;                 // rien à faire si pas de message
    const timer = setTimeout(() => {
        setSuccess('');                     // efface le message au bout de 30s
    }, 30000);

    return () => clearTimeout(timer);     // nettoie si le composant se démonte ou si success change
    }, [success]);

    const containsXMLPayload = (s = '') => {
        if (!s) return false;
        // Détecte instructions XML, DOCTYPE/ENTITY, CDATA, commentaires, et balises <tag>
        return (
            /<\?xml/i.test(s) ||
            /<!DOCTYPE/i.test(s) ||
            /<!ENTITY/i.test(s) ||
            /<!\[CDATA\[/i.test(s) ||
            /-->/i.test(s) || /<!--/i.test(s) ||
            /<[^>]+>/i.test(s)
        );
    };

    // Détection très défensive d'entrées typiques d'injection SQL
    const containsSQLiPayload = (s = '') => {
    if (!s) return false;
    const v = String(s);

    // Mots-clés SQL courants (en bord de mot) + UNION SELECT
    const kw = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|REPLACE|TRUNCATE|EXEC|MERGE)\b/i;
    // Séparateurs et commentaires SQL
    const sep = /(--|#|\/\*|\*\/|;)/; 
    // Tautologies simples ou tentatives de court-circuit (' OR 1=1, " OR "a"="a")
    const taut = /(\bor\b|\band\b)\s+('?\d+'?='?\d+'?|"?.+?"?="?".*"?)/i;
    // Empilements de quotes ou parenthèses anormales
    const weird = /('{2,}|" {2,}|\(\s*\)\s*\(|\)\s*\()/;

    return kw.test(v) || sep.test(v) || taut.test(v) || weird.test(v);
    };

    // Normalisation douce : supprime commentaires/points-virgules
    const softenSQLi = (s = '') => String(s)
    .replace(/\/\*[\s\S]*?\*\//g, '') // /* ... */
    .replace(/--.+$/gm, '')           // -- ...
    .replace(/#/g, '')                // # ...
    .replace(/;/g, '');               // ;


    // Supprime chiffres, certains caractères interdits et trim début/fin
    const sanitizeName = (s = '') => {
    return String(s)
        // supprimer chiffres
        .replace(/[0-9]/g, '')
        // supprimer les caractères interdits ! ; # $ % ? et les chevrons < >
        .replace(/[!;#$%?<>]/g, '')
        // remplacer plusieurs espaces par un seul (optionnel)
        .replace(/\s{2,}/g, ' ')
    };

    function onSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        setError('');

        const allErrors = { ...emptyFieldErrors };
        const setAllErrors = (key, msg) => { if (!allErrors[key]) allErrors[key] = msg; }

        setFieldErrors(emptyFieldErrors); // reset erreurs champ        

        // honeypot : si rempli -> on bloque silencieusement
        if (website && website.trim() !== '') {
            return;
        }

        // Prévention XML injection : blocage si balisage détecté (prioritaire !)
        const xmlTargets = { firstName, lastName, email, phone, message };
        Object.entries(xmlTargets).forEach(([key, val]) => {
          if (containsXMLPayload(String(val))) setAllErrors(key, 'Entrée invalide.');
        });


        // Prévention SQL injection : blocage si charge suspecte détectée
        const sqlTargets = { firstName, lastName, email, phone, message };
        Object.entries(sqlTargets).forEach(([key, val]) => {
        if (containsSQLiPayload(String(val))) {
            setAllErrors(key, 'Entrée invalide.');
        }
        });


        if (!firstName || firstName.trim() === '') setAllErrors('firstName', 'Le prénom est requis.');
        if (!lastName || lastName.trim() === '')  setAllErrors('lastName', 'Le nom est requis.');
        if (!email || email.trim() === '')     setAllErrors('email', "L'adresse e-mail est requise.");
        if (!message || message.trim() === '')   setAllErrors('message', 'Le message est requis.');
        if (!check) setAllErrors('consent', 'Le consentement au RGPD est nécessaire.');

        // téléphone : au moins 10 chiffres (numéro français)
        if (phone && !allErrors.phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.length < 10) {
                setAllErrors('phone', "Le numéro de téléphone doit comporter 10 chiffres.");
            } else {
                // Vérifie le préfixe autorisé (01 à 09)
                if (!/^0[1-9]/.test(digits)) {
                setAllErrors('phone', "Le numéro de téléphone n'est pas au bon format.");
                }
            }
        }

        // message : min 10 caractères
        if (message && !allErrors.message && message.trim().length < 10) {
          setAllErrors('message', 'Le message doit être de 10 caractères minimum.');
        }

        // S'il y a au moins une erreur, on stoppe et on les affiche toutes
        const hasErrors = Object.values(allErrors).some(Boolean);
        if (hasErrors) {
          setFieldErrors(allErrors);
          return;
        }

        // ——— envoi si OK ———
        fetch("https://formcarry.com/s/FwdUTcOhz6f", {
            method: 'POST',
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, phone, message, consent: check })
        })
        .then(response => response.json())
        .then(response => {
            if (response.code === 200) {
                // Reset des champs après succès
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setCheck(false);
                setWebsite('');
                setError(''); 
                setFieldErrors(emptyFieldErrors);   
                setSuccess('Merci ! Votre message a bien été envoyé.');            
            }
            else if(response.code === 422){
                // Field validation failed
                setError(response.message)
                console.log({error})
            }
            else {
                // other error from formcarry
                setError(response.message)
                console.log({error})
            }
        })
        .catch(error => {
        // request related error.
        setError(error.message ? error.message : error);
        console.log({error})
        });
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="identity__inputs">
                <div className="formcarry-block firstName__content">
                    <label htmlFor="firstName">Prénom <span className='red__star'>*</span></label>
                    <input 
                        id="firstName" 
                        maxLength={80}
                        name="firstName"
                        type="text" 
                        autoComplete="given-name"                    
                        value={firstName} 
                        onChange={(e) => {
                            let cleanValue = sanitizeName(e.target.value);    // supprime chiffres + !;#$%?
                            cleanValue = softenSQLi(cleanValue);              // supprime séquences SQL évidentes
                            setFirstName(cleanValue);
                            setFieldErrors(fe => fe.firstName ? { ...fe, firstName: '' } : fe);                        
                        }}                        
                        placeholder="ex. Jean" 
                        className='firstName__input'
                    />
                    {fieldErrors.firstName && (
                      <p id="firstName-error" role="alert" className="field-error">{fieldErrors.firstName}</p>
                    )}
                </div>
                <div className="formcarry-block lastName__content">
                    <label htmlFor="lastName">Nom <span className='red__star'>*</span></label>
                    <input 
                        id="lastName" 
                        maxLength={80}
                        name="lastName"
                        type="text" 
                        autoComplete="family-name"
                        value={lastName} 
                        onChange={(e) => {
                            let cleanValue = sanitizeName(e.target.value);    
                            cleanValue = softenSQLi(cleanValue);
                            setLastName(cleanValue);
                            setFieldErrors(fe => fe.lastName ? { ...fe, lastName: '' } : fe);
                        }}                        
                        placeholder="ex. Dupont" 
                        className='lastName__input'
                    />
                    {fieldErrors.lastName && (
                      <p id="lastName-error" role="alert" className="field-error">{fieldErrors.lastName}</p>
                    )}
                </div>
            </div>
            <div className="contact__details__imputs">
                <div className="formcarry-block email__content">
                    <label htmlFor="email">Email <span className='red__star'>*</span></label>
                    <input 
                        id="email"
                        maxLength={80}
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"                    
                        value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setFieldErrors(fe => fe.email ? { ...fe, email: '' } : fe);
                        }} 
                        placeholder="ex. jean@dupont.fr" 
                        className='email__input'
                    />
                    {fieldErrors.email && (
                      <p id="email-error" role="alert" className="field-error">{fieldErrors.email}</p>
                    )}
                </div>
                <div className="formcarry-block phone__content">
                    <label htmlFor="phone">Téléphone</label>
                    <input 
                        id="phone"
                        maxLength={10}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="ex. 06 12 34 56 78"                    
                        value={phone} 
                        onChange={(e) => {
                            setPhone(e.target.value)
                            setFieldErrors(fe => fe.phone ? { ...fe, phone: '' } : fe);
                        }} 
                        className='phone__input'
                    />
                    {fieldErrors.phone && (
                      <p id="phone-error" role="alert" className="field-error">{fieldErrors.phone}</p>
                    )}
                </div>
            </div>
            <div className="formcarry-block message__content">
                <label htmlFor="message">Message <span className='red__star'>*</span></label>
                <textarea 
                    id="message"
                    maxLength={1000}
                    name="message"
                    rows={6}            
                    value={message} 
                    onChange={(e) => {
                        // supprime commentaires/; pour limiter les payloads évidents
                        const clean = softenSQLi(e.target.value);
                        setMessage(clean);                        
                        setFieldErrors(fe => fe.message ? { ...fe, message: '' } : fe);
                    }} 
                    placeholder="Entrez votre message..."
                    className='message__input'>
                </textarea>
                {fieldErrors.message && (
                  <p id="message-error" role="alert" className="field-error">{fieldErrors.message}</p>
                )}
            </div>
            <div className="consent__content">
                <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={check}
                    onChange={(e) => {
                        setCheck(e.target.checked);
                        setFieldErrors(fe => fe.consent ? { ...fe, consent: '' } : fe);
                    }}
                    className="checkbox__input"
                />
                <div className='consent__text'>
                    <label htmlFor="consent">
                        J’autorise l’utilisation de mes données personnelles pour traiter ma demande et j’ai pris connaissance de la
                    </label>{" "}
                    <button
                        type="button"
                        className="rgpd__modal"
                        onClick={() => setModal(true)}
                        aria-haspopup="dialog"
                        aria-controls="rgpd-dialog"
                    >
                        politique de confidentialité
                    </button>.                    
                    <p className="consent-help">
                        Vous pouvez retirer votre consentement et demander la suppression de vos données à tout moment.
                    </p>
                    {fieldErrors.consent && (
                      <p id="consent-error" role="alert" className="field-error">{fieldErrors.consent}</p>
                    )}
                </div>
            </div>

            {/* Honeypot caché pour bot/spam */}
            <div style={{ position: "absolute", left: "-9999px" }} aria-hidden>
                <label htmlFor="website">Votre site web</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)} 
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>
            <div className="formcarry-block send__content">  
                <button type="submit">Envoyer</button>
            </div>
            <p className='required__fields'><span className='red__star'>*</span> Champs requis</p>
            {success && <p role="status" aria-live="polite" className="form-success">{success}</p>}
            <Modal 
                open={modal}
                onClose={() => setModal(false)}
            />
        </form>
    )
}