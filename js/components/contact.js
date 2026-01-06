// Contact component
function renderContactSection() {
    return `
        <div class="section-content">
            <h2 class="section-title">Get In Touch</h2>
            <p class="section-subtitle">Let's discuss your next project</p>

            <form id="contactForm" action="contact.php" method="POST">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <div class="g-recaptcha" data-sitekey="6LfwV3ArAAAAAEw1Pha_M7CE7J4mRyOcEOwneNky"></div>
                <br>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    `;
}
