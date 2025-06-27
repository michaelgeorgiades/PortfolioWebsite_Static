# Michael Georgiades - Static Portfolio Website

A modern, fully static HTML/CSS/JavaScript portfolio website featuring a dark copper theme, interactive games, and photography gallery.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Games**: Four fully functional browser games built with HTML5 Canvas
- **Photography Gallery**: Professional photo showcase with modal viewing
- **Animated Background**: Moving copper dots with circuit board aesthetic
- **Contact Form**: Functional contact form with validation
- **Modern Design**: Glass morphism effects and copper color scheme

## File Structure

```
static/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling and responsive design
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## Games Included

### Snake Game
- Classic snake gameplay
- Arrow keys or WASD controls
- Score tracking
- Collision detection

### Tetris Game
- Falling block puzzle game
- Piece rotation with proper algorithm
- Line clearing mechanics
- Arrow keys/WASD + Space/Up for rotation

### Pong Game
- Player vs AI paddle game
- Smooth ball physics
- Score tracking for both players
- W/S or Up/Down arrow controls

### Breakout Game
- Classic brick-breaking arcade game
- Multiple brick rows with different colors
- Lives system
- A/D or Left/Right arrow controls

## Technical Details

### CSS Features
- CSS Custom Properties for theming
- Flexbox and Grid layouts
- Responsive design with media queries
- Keyframe animations for background dots
- Glass morphism effects with backdrop-filter

### JavaScript Features
- Vanilla JavaScript (no frameworks)
- HTML5 Canvas for game rendering
- Event-driven navigation system
- Modal functionality
- Toast notifications
- Form validation

### Design Elements
- **Color Palette**: Copper (#B87333), Light Copper (#D4A574), Dark Copper (#8B4513)
- **Typography**: Inter font family with proper hierarchy
- **Animations**: Subtle hover effects and smooth transitions
- **Background**: Animated copper dots moving vertically

## Browser Compatibility

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Installation

1. Download all files to a directory
2. Open `index.html` in any modern web browser
3. No build process or dependencies required

## Customization

### Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
  --copper: #B87333;
  --copper-light: #D4A574;
  --copper-dark: #8B4513;
  /* ... */
}
```

### Content
- Update personal information in `index.html`
- Replace placeholder images with your own
- Modify the resume section with your experience
- Update contact information

### Games
Each game is modular and can be easily modified:
- Adjust game speeds by changing constants
- Modify colors by updating the color arrays
- Add new features by extending the game objects

## Performance

- Lightweight: ~50KB total (HTML + CSS + JS)
- No external dependencies
- Optimized game loops using requestAnimationFrame
- Efficient DOM manipulation
- Responsive images with proper sizing

## License

This is a personal portfolio template. Feel free to use and modify for your own portfolio.