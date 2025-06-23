# Michael Georgiades - Personal Portfolio Website

A modern personal portfolio website featuring a dark copper/circuit theme with responsive design.

## Features

- **Home Page**: Introduction with custom circuit board design around profile photo
- **Resume Page**: Professional experience, skills, and certifications
- **Photography Gallery**: Interactive gallery with PayPal purchase integration
- **Games Page**: Playable browser games (Snake and Tetris)
- **Contact Page**: Contact form with backend handling

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: TanStack Query
- **Payments**: PayPal SDK
- **Storage**: In-memory storage (easily replaceable with database)

## Setup Instructions

### Prerequisites
- Node.js 20 or higher
- PayPal Developer Account (for payment functionality)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure PayPal (Optional)**
   - Visit [PayPal Developer](https://developer.paypal.com)
   - Create a developer account and new app
   - Add your PayPal credentials as secrets in Replit:
     - `PAYPAL_CLIENT_ID`
     - `PAYPAL_CLIENT_SECRET`
   
   Note: The site will work without PayPal credentials, but payment functionality will be disabled.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── games/      # Game components (Snake, Tetris)
│   │   │   └── ui/         # shadcn UI components
│   │   ├── pages/          # Main pages
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── paypal.ts          # PayPal integration
├── shared/                 # Shared types and schemas
└── attached_assets/        # User-provided assets
```

### Customization

#### Adding Your Photo
Replace the profile photo by updating the import in `client/src/pages/Home.tsx`:
```typescript
import aviImage from "@assets/your-photo.jpg";
```

#### Updating Resume Content
Edit the `workExperience` and `skillCategories` arrays in `client/src/pages/Home.tsx` to reflect your experience.

#### Adding Photos to Gallery
Update the sample photos in `server/storage.ts` in the `initializePhotos()` method.

#### Customizing Theme
Modify the copper color scheme in `client/src/index.css`:
```css
--copper: hsl(28, 54%, 45%);
--copper-light: hsl(28, 54%, 65%);
--copper-dark: hsl(28, 54%, 25%);
```

### Features in Detail

#### Circuit Board Design
The homepage features a custom SVG circuit board design around the profile photo, creating a tech-focused aesthetic that complements the IT systems engineer theme.

#### Games
- **Snake**: Classic snake game with arrow key controls
- **Tetris**: Simplified Tetris with piece rotation and line clearing

#### Photography Gallery
- Responsive grid layout
- Hover effects and smooth transitions
- PayPal integration for print purchases
- Modal dialogs for purchase flow

#### Contact Form
- Form validation using Zod
- Backend storage of messages
- Toast notifications for user feedback

### Deployment

The application is configured for deployment on Replit. Simply:
1. Ensure all environment variables are set
2. The app will automatically deploy when ready

### Development Notes

- TypeScript is used throughout for type safety
- The application uses a modern component architecture
- State management is handled via TanStack Query
- Styling uses Tailwind CSS with custom components
- The backend uses Express with TypeScript for API routes

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on desktop, tablet, and mobile
- Games require keyboard input (desktop/laptop recommended)

### Support

For issues or questions, use the contact form on the website or check the code comments for implementation details.