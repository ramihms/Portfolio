document.addEventListener('DOMContentLoaded', function() {
    const cursorAura = document.querySelector('.cursor-aura');
    const htmlElement = document.documentElement;
    
    // Position actuelle de l'aura (initialisée en haut à gauche)
    let auraX = 20;
    let auraY = 20;
    
    // Position cible (initialisée également en haut à gauche)
    let targetX = 20;
    let targetY = 20;
    
    const smoothFactor = 0.05;
    let hasMouseMoved = false;
    
    // Affiche l'aura en haut à gauche dès le chargement
    function initAura() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const opacityValue = currentTheme === 'dark' ? '0.9' : '0.85';
        
        cursorAura.style.left = `${auraX}px`;
        cursorAura.style.top = `${auraY}px`;
        cursorAura.style.opacity = opacityValue;
        
        requestAnimationFrame(updateAuraPosition);
    }
    
    // Fonction appelée lorsque la souris se déplace
    function handleMouseMove(e) {
        hasMouseMoved = true;
        targetX = e.clientX;
        targetY = e.clientY;
    }
    
    // Fonction pour animer le suivi fluide
    function updateAuraPosition() {
        auraX += (targetX - auraX) * smoothFactor;
        auraY += (targetY - auraY) * smoothFactor;
        
        cursorAura.style.left = `${auraX}px`;
        cursorAura.style.top = `${auraY}px`;
        
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
    
    observer.observe(htmlElement, { attributes: true });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', function(e) {
        if (hasMouseMoved) {
            handleMouseMove(e);
        }
    });
    
    document.addEventListener('mousedown', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const baseOpacity = currentTheme === 'dark' ? 0.9 : 0.85;
        cursorAura.style.opacity = (baseOpacity * 0.7).toString();
    });
    
    document.addEventListener('mouseup', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const normalOpacity = currentTheme === 'dark' ? '0.9' : '0.85';
        cursorAura.style.opacity = normalOpacity;
    });
    
    initAura();
});
