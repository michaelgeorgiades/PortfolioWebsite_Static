# Michael Georgiades - Portfolio Website

A modern personal portfolio website featuring a dark copper aesthetic with animated background elements. Built with React, TypeScript, Express, and includes photography gallery with PayPal integration and browser games.

## Features

- **Multi-page Design**: Home, Resume, Photography, Games, and Contact pages
- **Photography Gallery**: High-quality images with PayPal purchasing integration
- **Browser Games**: Snake, Tetris, Pong, and Breakout games
- **Contact Form**: Functional contact form with backend handling
- **Responsive Design**: Mobile-friendly with dark copper theme
- **Animated Background**: Moving copper dots for visual appeal

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: PayPal SDK integration
- **Styling**: shadcn/ui components, Tailwind CSS
- **Deployment**: Ready for Railway, Vercel, or Render

## Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Add your environment variables:
   ```
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   DATABASE_URL=your_database_url (optional for development)
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5000](http://localhost:5000) in your browser

## Production Deployment

### Environment Variables Required
- `PAYPAL_CLIENT_ID`: PayPal client ID for payment processing
- `PAYPAL_CLIENT_SECRET`: PayPal client secret
- `DATABASE_URL`: PostgreSQL connection string (if using database)
- `NODE_ENV`: Set to "production"

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

### Deployment Platforms

**Railway:**
- Connect GitHub repository
- Set environment variables in Railway dashboard
- Deploy automatically on push to main branch

**Vercel:**
- Connect GitHub repository
- Configure build settings: Build Command: `npm run build`, Start Command: `npm start`
- Set environment variables in Vercel dashboard

**Render:**
- Connect GitHub repository
- Set build command: `npm run build`
- Set start command: `npm start`
- Configure environment variables

## GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Runs on pushes to main branch
- Installs dependencies and builds the project
- Deploys to your chosen platform automatically

Configure the deployment section in the workflow file for your preferred platform.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── paypal.ts          # PayPal integration
├── shared/                 # Shared types and schemas
└── attached_assets/        # Static assets
```

## Key Features Details

### Photography Gallery
- Browse professional photography
- Purchase high-quality prints via PayPal
- Responsive image gallery with modal views

### Browser Games
- **Snake**: Classic snake game with score tracking
- **Tetris**: Full Tetris implementation with line clearing
- **Pong**: Single-player vs AI with paddle controls
- **Breakout**: Brick-breaking game with multiple levels

### Contact Form
- Functional contact form with backend validation
- Email integration for receiving messages
- Form validation and user feedback

## License

Private portfolio project - All rights reserved.