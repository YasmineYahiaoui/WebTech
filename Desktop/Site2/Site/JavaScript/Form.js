document.addEventListener('DOMContentLoaded', function() {
 var form = document.querySelector('form');
 form.addEventListener('submit', function(event) {
     event.preventDefault();

     var nom = document.getElementById('nom').value;
     var email = document.getElementById('email').value;
     var message = document.getElementById('message').value;

     if (!nom || !email || !message) {
         alert('Veuillez remplir tous les champs.');
     } else {
         // Vérification de la validité de l'email
         var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
         if (regex.test(email)) {
             alert('Merci, ' + nom + '. Votre message a été envoyé.');
         } else {
             alert('Email non valide.');
         }
     }
 });
});
document.addEventListener('DOMContentLoaded', function() {
    var formulaire = document.querySelector('form');
    formulaire.addEventListener('submit', function(evenement) {
        evenement.preventDefault();

        var nomUtilisateur = document.getElementById('name').value;
        var emailUtilisateur = document.getElementById('email').value;

        if (!nomUtilisateur || !emailUtilisateur) {
            alert('Veuillez remplir tous les champs.');
        } else {
            // Vérification de la validité de l'email
            var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (regexEmail.test(emailUtilisateur)) {
                alert('Merci, ' + nomUtilisateur + '. vous êtes bien connecté.');
            } else {
                alert('Email non valide.');
            }
        }
    });
});
document.getElementById('changeImageButton').addEventListener('click', function() {
    var mainImageElement = document.getElementById('main-image');
    var currentBackgroundImage = window.getComputedStyle(mainImageElement).backgroundImage;
    if (currentBackgroundImage.includes('Accueil.jpg')) {
        mainImageElement.style.backgroundImage = 'url(../image/Cyber.jpg)';
    } else {
        mainImageElement.style.backgroundImage = 'url(../image/Accueil.jpg)';
    }
});