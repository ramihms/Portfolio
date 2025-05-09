document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement pour les éléments avec la classe 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    
    // Variables pour optimisation
    let lastScrollTop = 0;
    let ticking = false;
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Réduit pour déclencher l'animation plus tôt
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Vérifier si l'élément est visible dans la fenêtre
            if(elementTop < windowHeight - revealPoint && elementBottom > 0) {
                // Ajouter la classe mais avec un léger délai entre chaque élément
                if (!element.classList.contains('active')) {
                    // Utiliser requestAnimationFrame pour des animations plus fluides
                    requestAnimationFrame(() => {
                        element.classList.add('active');
                    });
                }
            } else {
                // Option: réinitialiser l'animation lorsque l'élément n'est plus visible
                // Décommenter si vous souhaitez que les animations se déclenchent à chaque fois
                element.classList.remove('active');
            }
        });
        
        ticking = false;
    }
    
    // Fonction pour gérer le défilement de manière optimisée
    function onScroll() {
        lastScrollTop = window.scrollY;
        
        if (!ticking) {
            // Utiliser requestAnimationFrame pour limiter les calculs
            requestAnimationFrame(() => {
                checkReveal();
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Exécuter une fois au chargement de la page avec un léger délai
    setTimeout(checkReveal, 100);
    
    // Utiliser un écouteur d'événements passif pour de meilleures performances
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Vérifier également lors d'un redimensionnement
    window.addEventListener('resize', onScroll, { passive: true });
});