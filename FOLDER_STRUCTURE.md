# Portfolio Website - Folder Structure

## Project Overview
A modern personal portfolio website built with React, TypeScript, and Express.js featuring a dark copper theme, interactive games, photography gallery with PayPal integration, and contact form.

## Complete Folder Structure

```
portfolio-website/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Shadcn/ui components (30+ files)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   └── ... (other UI components)
│   │   │   ├── games/               # Interactive browser games
│   │   │   │   ├── SnakeGame.tsx    # Classic Snake game
│   │   │   │   ├── TetrisGame.tsx   # Tetris with rotation
│   │   │   │   ├── PongGame.tsx     # Pong vs AI
│   │   │   │   └── BreakoutGame.tsx # Breakout brick breaker
│   │   │   ├── Navigation.tsx       # Main navigation with animated background
│   │   │   └── PayPalButton.tsx     # PayPal checkout integration
│   │   ├── pages/                   # Application pages
│   │   │   ├── Home.tsx            # Landing page with hero section
│   │   │   ├── Resume.tsx          # Professional experience
│   │   │   ├── Photography.tsx     # Gallery with purchase options
│   │   │   ├── Games.tsx           # Interactive games showcase
│   │   │   ├── Contact.tsx         # Contact form with validation
│   │   │   └── not-found.tsx       # 404 error page
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── use-mobile.tsx      # Mobile detection
│   │   │   └── use-toast.ts        # Toast notifications
│   │   ├── lib/                    # Utility libraries
│   │   │   ├── queryClient.ts      # TanStack Query setup
│   │   │   └── utils.ts            # Helper functions
│   │   ├── App.tsx                 # Main app with routing
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Global styles with copper theme
│   └── index.html                 # HTML template
├── server/                        # Backend Express.js API
│   ├── index.ts                   # Server entry point
│   ├── routes.ts                  # API route handlers
│   ├── storage.ts                 # Data storage interface (in-memory)
│   ├── paypal.ts                  # PayPal SDK integration
│   └── vite.ts                    # Development middleware
├── shared/                        # Shared TypeScript schemas
│   └── schema.ts                  # Database schemas and types
├── attached_assets/               # User-uploaded assets
│   ├── CPU_1750702588804.png     # Profile image
│   ├── avi_1750702570483.jpg     # Avatar image
│   ├── pong_1750704940147.png    # Game screenshot
│   └── Michael Georgiades CV_1750702119202.pdf # Resume PDF
├── .github/workflows/             # GitHub Actions
│   └── deploy.yml                # Multi-platform deployment
├── Configuration Files
├── components.json               # Shadcn/ui configuration
├── drizzle.config.ts            # Database ORM config
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler config
├── postcss.config.js           # PostCSS configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
├── replit.md                   # Project architecture notes
└── package-lock.json           # Dependency lock file
```

## Key Technologies

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **Tailwind CSS** with custom copper theme
- **Shadcn/ui** component library (30+ components)
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **HTML5 Canvas** for interactive games

### Backend Stack
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Drizzle ORM** for database operations
- **PayPal Server SDK** for payments
- **Express sessions** for authentication
- **In-memory storage** for development

### Game Features
- **Snake**: Classic snake game with WASD/arrow controls
- **Tetris**: Block falling game with piece rotation
- **Pong**: Player vs AI paddle game
- **Breakout**: Brick breaking arcade game

### Special Features
- **Animated Background**: Moving copper dots with circuit theme
- **PayPal Integration**: Photo purchasing system
- **Responsive Design**: Mobile-first approach
- **Form Validation**: Zod schemas with error handling
- **Toast Notifications**: User feedback system

## Build System
- **Development**: TSX for TypeScript execution
- **Production**: ESBuild for optimized bundling
- **Deployment**: Multi-platform GitHub Actions (Railway, Vercel, Render)

## Environment Variables Needed
```
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
DATABASE_URL=your_database_url (optional, uses in-memory by default)
```