document.addEventListener('DOMContentLoaded', function() {
    const cursorAura = document.querySelector('.cursor-aura');
    const htmlElement = document.documentElement;
    
    // Position actuelle de l'aura (initialisée en haut à gauche)
    let auraX = 20; // Légère marge par rapport au coin
    let auraY = 20; // Légère marge par rapport au coin
    
    // Position cible (initialisée également en haut à gauche)
    let targetX = 20;
    let targetY = 20;
    
    // Facteur de lissage - contrôle la vitesse de suivi
    const smoothFactor = 0.05;
    
    // Indique si la souris a déjà bougé
    let hasMouseMoved = false;
    
    // Affiche l'aura en haut à gauche dès le chargement
    function initAura() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const opacityValue = currentTheme === 'dark' ? '0.9' : '0.85';
        
        cursorAura.style.left = `${auraX}px`;
        cursorAura.style.top = `${auraY}px`;
        cursorAura.style.opacity = opacityValue;
        
        // Démarrer la boucle d'animation
        requestAnimationFrame(updateAuraPosition);
    }
    
    // Fonction appelée lorsque la souris se déplace
    function handleMouseMove(e) {
        // Marquer que la souris a bougé
        hasMouseMoved = true;
        
        // Mettre à jour la position cible avec celle du curseur
        targetX = e.clientX;
        targetY = e.clientY;
    }
    
    // Fonction pour animer le suivi fluide
    function updateAuraPosition() {
        // Calculer la nouvelle position avec interpolation
        auraX += (targetX - auraX) * smoothFactor;
        auraY += (targetY - auraY) * smoothFactor;
        
        // Appliquer la position
        cursorAura.style.left = `${auraX}px`;
        cursorAura.style.top = `${auraY}px`;
        
        // Continuer l'animation
        requestAnimationFrame(updateAuraPosition);
    }
    
    // Fonction pour ajuster l'opacité lors du changement de thème
    function updateAuraOpacity() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const opacityValue = currentTheme === 'dark' ? '0.9' : '0.85';
        cursorAura.style.opacity = opacityValue;
    }
    
    // Observer les changements d'attribut data-theme
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updateAuraOpacity();
            }
        });
    });
    
    // Configurer l'observateur pour surveiller les changements de thème
    observer.observe(htmlElement, { attributes: true });
    
    // Ajouter les écouteurs d'événements
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', function(e) {
        if (hasMouseMoved) {
            // Si la souris a déjà été déplacée, mettre à jour la cible
            handleMouseMove(e);
        }
    });
    
    // Effet simple au clic : légère réduction d'opacité
    document.addEventListener('mousedown', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const baseOpacity = currentTheme === 'dark' ? 0.9 : 0.85;
        cursorAura.style.opacity = (baseOpacity * 0.7).toString(); // 70% de l'opacité normale
    });
    
    // Restauration de l'opacité normale au relâchement du clic
    document.addEventListener('mouseup', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const normalOpacity = currentTheme === 'dark' ? '0.9' : '0.85';
        cursorAura.style.opacity = normalOpacity;
    });
    
    // Initialiser l'aura au chargement de la page
    initAura();
});