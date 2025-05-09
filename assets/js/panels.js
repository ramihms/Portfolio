document.addEventListener('DOMContentLoaded', function() {
    // Gestion des panneaux
    const navLinks = document.querySelectorAll('nav a[data-panel]');
    const panels = document.querySelectorAll('.panel');
    const overlay = document.querySelector('.panel-overlay');
    const closeButtons = document.querySelectorAll('.close-panel');

    // Ouvrir le panneau quand un lien de navigation est cliqué
    // (seulement pour les liens avec data-panel)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPanelId = this.getAttribute('data-panel');
            const targetPanel = document.getElementById(targetPanelId);
            
            // Fermer tous les panneaux ouverts
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Ouvrir le panneau cible
            targetPanel.classList.add('active');
            overlay.classList.add('active');
        });
    });

    // Fermer le panneau quand le bouton de fermeture est cliqué
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            panels.forEach(panel => panel.classList.remove('active'));
            overlay.classList.remove('active');
        });
    });

    // Fermer le panneau en cliquant sur la superposition
    overlay.addEventListener('click', function() {
        panels.forEach(panel => panel.classList.remove('active'));
        overlay.classList.remove('active');
    });

    // Fermer le panneau en appuyant sur la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            panels.forEach(panel => panel.classList.remove('active'));
            overlay.classList.remove('active');
        }
    });

});

