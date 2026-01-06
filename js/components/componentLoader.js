// Component Loader
// This module handles loading and rendering components into their respective sections
// Optimizations:
// - Components are loaded only once on initial page load
// - Game and contact form initialization happens after their respective HTML is rendered
// - No unnecessary re-renders or re-initializations

let componentsInitialized = false;

function initializeComponents() {
    // Prevent multiple initializations
    if (componentsInitialized) {
        console.log('Components already initialized');
        return;
    }

    // Load all component content
    loadComponent('home', renderHomeSection);
    loadComponent('resume', renderResumeSection);
    loadComponent('photography', renderPhotographySection);
    loadComponent('games', renderGamesSection);
    loadComponent('contact', renderContactSection);

    componentsInitialized = true;
}

function loadComponent(sectionId, renderFunction) {
    const section = document.getElementById(sectionId);
    if (section && typeof renderFunction === 'function') {
        section.innerHTML = renderFunction();

        // Re-initialize specific functionality after component loads
        if (sectionId === 'games') {
            // Initialize games after the canvas elements are in the DOM
            initializeGames();
        } else if (sectionId === 'contact') {
            // Initialize contact form after the form elements are in the DOM
            initializeContactForm();
        }
    }
}

// Export for global access
window.initializeComponents = initializeComponents;
