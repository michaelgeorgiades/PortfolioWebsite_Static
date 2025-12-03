// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileNav.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            scrollToSection(section);
            
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                mobileNav.classList.remove('show');
                isMobileMenuOpen = false;
            }
        });
    });
}

function scrollToSection(sectionId) {
    // Remove all game event listeners when leaving games section
    if (window.currentSection === 'games' && sectionId !== 'games') {
        removeAllGameEventListeners();
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.currentSection = sectionId;
        
        // Add game event listeners only when entering games section
        if (sectionId === 'games') {
            addAllGameEventListeners();
        }
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

window.scrollToSection = scrollToSection;