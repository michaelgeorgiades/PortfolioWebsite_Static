# Components Directory

This directory contains modular components for the portfolio website. Each tab section has been separated into its own file for better organization and maintainability.

## Structure

```
js/components/
├── componentLoader.js    # Main loader that initializes all components
├── home.js              # Home/Hero section component
├── resume.js            # Resume section component
├── photography.js       # Photography gallery component
├── games.js             # Games section component (HTML only)
└── contact.js           # Contact form component (HTML only)
```

## How It Works

1. **Component Files**: Each component file exports a `render*Section()` function that returns HTML as a string
2. **Component Loader**: The `componentLoader.js` file loads all components on page initialization
3. **Initialization**: Components are loaded in `main.js` via the `initializeComponents()` function
4. **One-time Loading**: Components are loaded once on page load, preventing unnecessary re-renders

## Component Details

### home.js
Contains the hero section with:
- Welcome message
- Professional title
- Call-to-action buttons
- Profile image

### resume.js
Contains professional information:
- Work experience
- Technical skills grid
- PDF resume download link

### photography.js
Contains photography gallery:
- Photo grid with 9 images
- Photo overlay information
- Purchase buttons with PayPal integration

### games.js (HTML Component)
Contains game canvases and UI:
- Snake game
- Tetris game
- Breakout game
- Pong game

**Note**: Game logic is handled by `js/games.js`

### contact.js (HTML Component)
Contains contact form:
- Name, email, subject, message fields
- reCAPTCHA integration
- Submit button

**Note**: Form logic is handled by `js/contact.js`

## Benefits of This Structure

1. **Separation of Concerns**: Each section is isolated in its own file
2. **Easier Maintenance**: Update one section without touching others
3. **Better Organization**: Clear file structure makes navigation easier
4. **Reusability**: Components can be easily reused or duplicated
5. **Smaller Files**: Each file is focused and manageable
6. **Performance**: Components are loaded once and cached

## Adding a New Component

To add a new component:

1. Create a new file: `js/components/newSection.js`
2. Add a render function:
   ```javascript
   function renderNewSection() {
       return `
           <div class="section-content">
               <!-- Your HTML here -->
           </div>
       `;
   }
   ```
3. Add the component to `componentLoader.js`:
   ```javascript
   loadComponent('newSection', renderNewSection);
   ```
4. Add the section to `index.html`:
   ```html
   <section id="newSection" class="section"></section>
   ```
5. Include the script in `index.html`:
   ```html
   <script src="js/components/newSection.js" defer></script>
   ```

## Optimizations

- **Single Initialization**: Components are loaded only once
- **Lazy Execution**: Game and contact form JS only runs after HTML is rendered
- **Clean Separation**: HTML structure separate from JavaScript logic
- **Maintained Theme**: Background orbs and theme remain intact
