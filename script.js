
document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeBackgroundDots();
    initializePhotoModal();
    initializeContactForm();
    initializeSnakeGame();
    initializeTetrisGame();
    initializePongGame();
    initializeBreakoutGame();
});

/* --- Navigation --- */
function initializeNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const mobileNav = document.getElementById("mobileNav");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove .active from all nav links
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Hide all sections and show the selected one
            const target = link.getAttribute("data-section");
            sections.forEach(section => {
                section.classList.remove("active");
                if (section.id === target) {
                    section.classList.add("active");
                }
            });

            // Close mobile nav if open
            mobileNav.classList.remove("show");
        });
    });

    // Handle mobile nav toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("show");
    });
}

function scrollToSection(sectionId) {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    navLinks.forEach(l => l.classList.remove("active"));
    sections.forEach(section => {
        section.classList.remove("active");
        if (section.id === sectionId) {
            section.classList.add("active");
            document.querySelector(\`[data-section="\${sectionId}"]\`).classList.add("active");
        }
    });
}

/* --- Background Dots --- */
function initializeBackgroundDots() {
    const container = document.getElementById("backgroundAnimation");
    const numDots = 100;

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.width = dot.style.height = \`\${Math.random() * 4 + 2}px\`;
        dot.style.left = \`\${Math.random() * 100}vw\`;
        dot.style.animationDuration = \`\${Math.random() * 10 + 5}s\`;
        dot.style.animationDelay = \`-\${Math.random() * 10}s\`;
        container.appendChild(dot);
    }
}

/* --- Photo Modal --- */
function initializePhotoModal() {
    const modal = document.getElementById("photoModal");
    const closeBtn = document.getElementById("closeModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");

    window.openPhotoModal = function(id) {
        const photoItem = document.querySelector(\`[data-photo-id="\${id}"]\`);
        modalImage.src = photoItem.querySelector("img").src;
        modalTitle.textContent = photoItem.querySelector("h4").textContent;
        modalDescription.textContent = photoItem.querySelector("p").textContent;
        modalPrice.textContent = photoItem.querySelector(".btn").textContent.match(/\$\d+/)[0];
        modal.classList.add("show");
    };

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    const purchaseBtn = document.getElementById("purchaseBtn");
    purchaseBtn.addEventListener("click", () => {
        const price = modalPrice.textContent.replace("$", "");
        const paypalUrl = \`https://www.paypal.com/paypalme/YOURPAYPALNAME/\${price}\`;
        window.open(paypalUrl, "_blank");
    });
}

/* --- Contact Form --- */
function initializeContactForm() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showToast("Please complete the reCAPTCHA.");
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch("contact.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showToast("Message sent successfully!");
                form.reset();
                grecaptcha.reset();
            } else {
                showToast(result.error || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            showToast("Network error — please try again.");
        }
    });
}

/* --- Toast Notification --- */
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* --- Key Handling Guard --- */
function shouldIgnoreKey(e) {
    const tag = e.target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea';
}

/* --- Snake Game --- */
function initializeSnakeGame() {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const startBtn = document.getElementById("snakeStartBtn");
    const scoreDisplay = document.getElementById("snakeScore");

    let snake, food, direction, gameLoop, score;

    const gridSize = 20;
    const tileSize = canvas.width / gridSize;

    function startGame() {
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        score = 0;
        spawnFood();
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(update, 100);
    }

    function spawnFood() {
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    function update() {
        const head = { ...snake[0] };
        if (direction === "up") head.y--;
        if (direction === "down") head.y++;
        if (direction === "left") head.x--;
        if (direction === "right") head.x++;

        if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            clearInterval(gameLoop);
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = score;
            spawnFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#fff";
        snake.forEach(part => {
            ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
        });

        ctx.fillStyle = "#f00";
        ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
    }

    startBtn.addEventListener("click", startGame);

    document.addEventListener("keydown", e => {
        if (shouldIgnoreKey(e)) return;
        if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") direction = "up";
        if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") direction = "down";
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") direction = "left";
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") direction = "right";
    });
}

// Other games (Tetris, Pong, Breakout) would be updated similarly to respect shouldIgnoreKey()
