document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement pour les éléments avec la classe 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    
    // Variables pour optimisation
    let lastScrollTop = 0;
    let ticking = false;
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if(elementTop < windowHeight - revealPoint && elementBottom > 0) {
                if (!element.classList.contains('active')) {
                    requestAnimationFrame(() => {
                        element.classList.add('active');
                    });
                }
            } else {
                element.classList.remove('active');
            }
        });
        
        ticking = false;
    }
    
    // Fonction pour gérer le défilement de manière optimisée
    function onScroll() {
        lastScrollTop = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                checkReveal();
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    setTimeout(checkReveal, 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
});
