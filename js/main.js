// Global variables
window.currentSection = 'home';
let isMobileMenuOpen = false;

window.gameEventListeners = {
    snake: null,
    tetris: null,
    pong: null,
    breakout: null
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Load all components first
    initializeComponents();

    // Initialize core functionality
    initializeNavigation();
    initializeBackground();
    initializeModal();

    // Note: initializeGames() and initializeContactForm() are now called
    // from componentLoader.js after their respective components are loaded
});

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Export functions for global access


window.showToast = showToast;
