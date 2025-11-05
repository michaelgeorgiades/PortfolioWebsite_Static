// Animated background
function initializeBackground() {
    const container = document.getElementById('backgroundAnimation');
    const colors = ['#B87333', '#D4A574'];
    
    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random size between 1px and 1.5px
        const size = Math.random() * 0.5 + 1;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        
        // Random horizontal position
        dot.style.left = Math.random() * window.innerWidth + 'px';
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        dot.style.background = color;
        dot.style.boxShadow = `0 0 4px ${color}`;
        
        // Random animation duration between 8s and 15s
        const duration = Math.random() * 7 + 8;
        dot.style.animationDuration = duration + 's';
        
        container.appendChild(dot);
        
        // Remove dot after animation
        setTimeout(() => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        }, duration * 1000);
    }
    
    // Create dots at random intervals
    function startDotCreation() {
        createDot();
        // Random delay between 800ms and 8600ms
        const delay = Math.random() * 7800 + 800;
        setTimeout(startDotCreation, delay);
    }
    
    startDotCreation();
}
