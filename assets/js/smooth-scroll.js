document.addEventListener('DOMContentLoaded', function() {
    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // Ne pas activer pour les liens qui utilisent data-panel
        if (!this.hasAttribute('data-panel')) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset pour l'en-tête
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });