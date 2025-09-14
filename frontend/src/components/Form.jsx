import { useState } from 'react';
import Modal from './Modal';

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
          if (containsXMLPayload(String(val))) setAllErrors(key, 'Mauvais format détecté.');
        });

        if (!firstName || firstName.trim() === '') setAllErrors('firstName', 'Le prénom est requis.');
        if (!lastName || lastName.trim() === '')  setAllErrors('lastName', 'Le nom est requis.');
        if (!email || email.trim() === '')     setAllErrors('email', "L'adresse e-mail est requise.");
        if (!message || message.trim() === '')   setAllErrors('message', 'Le message est requis.');

        // consentement
        if (!check) setAllErrors('consent', 'Le consentement au RGPD est nécessaire.');


        // email simple
        if (email && !allErrors.email) {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
          if (!emailOk) setAllErrors('email', "L'adresse e-mail semble invalide.");
        }

        // téléphone : au moins 10 chiffres (numéro français)
        if (phone && !allErrors.phone) {
          const digits = phone.replace(/\D/g, '');
          if (digits.length < 10) setAllErrors('phone', "Le numéro de téléphone semble incorrect.");
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
                        name="firstName"
                        type="text" 
                        autoComplete="given-name"                    
                        value={firstName} 
                        onChange={(e) => {
                            setFirstName(e.target.value)
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
                        name="lastName"
                        type="text" 
                        autoComplete="family-name"
                        value={lastName} 
                        onChange={(e) => {
                            setLastName(e.target.value)
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
                    name="message"
                    rows={6}            
                    value={message} 
                    onChange={(e) => {
                        setMessage(e.target.value)
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