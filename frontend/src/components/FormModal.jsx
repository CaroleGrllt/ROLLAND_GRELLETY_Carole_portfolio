
export default function Modal({ open, onClose }) {
    if (!open) return null

    return (
        <div
        className="modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
        >
            <div
                className="modal__dialog"
                role="dialog"
                id="rgpd-dialog"
                aria-modal="true"
                aria-labelledby="rgpd-title"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="rgpd-title">Politique de confidentialité</h2>

                <div className="modal__body">
                    <p>
                        Les informations recueillies à partir de ce formulaire sont enregistrées par Carole ROLLAND GRELLETY 
                        afin de répondre à votre demande de contact. Les données ne sont pas diffusées à des tiers. <br/>
                        Les champs marqués d’un astérisque (*) sont obligatoires.  
                        Vos données (nom, prénom, adresse e-mail, téléphone) sont transmises et hébergées par notre prestataire Formcarry, 
                        dont les serveurs sont situés dans l’Espace Économique Européen (EEE).  

                        Conformément au Règlement Général sur la Protection des Données (RGPD), 
                        vous disposez d’un droit d’accès, de rectification, d’opposition, de limitation et de suppression de vos données.  
                        <br/><br/>
                        Vous pouvez exercer ces droits en écrivant à : <a href="mailto:contact@carole-rollandgrellety.fr">carole.rolland.grellety@proton.me</a>.  
                        <br/>
                        Vos données sont conservées uniquement le temps nécessaire au traitement de votre demande, 
                        puis supprimées dans un délai maximum de 6 mois, si aucun suivi n’est nécessaire.  
                    </p>
                </div>
                <div className="close__modal">
                    <button
                        type="button"
                        className="modal__close"
                        onClick={onClose}
                        autoFocus
                        aria-label="Fermer la modale"
                        >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}