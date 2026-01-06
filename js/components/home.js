// Home component
function renderHomeSection() {
    return `
        <div class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">Welcome to My Portfolio</h1>
                <p class="hero-subtitle">Professional Systems Engineer & Creative Technologist</p>
                <p class="hero-description">
                    Explore my professional journey, photography work, and interactive projects.
                    This portfolio showcases my passion for technology, creativity, and innovation.
                </p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="scrollToSection('resume')">View Resume</button>
                    <button class="btn btn-secondary" onclick="scrollToSection('contact')">Get In Touch</button>
                </div>
            </div>
            <div class="hero-image">
                <img src="./attached_assets/stinkygreek.jpg" alt="Michael Georgiades" class="profile-image">
            </div>
        </div>
    `;
}
