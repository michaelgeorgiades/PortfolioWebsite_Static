# Portfolio Website - Michael Georgiades

## Overview

This is a modern personal portfolio website built as a full-stack TypeScript application featuring a dark copper/circuit theme. The application showcases professional experience, a photography gallery with PayPal integration, interactive browser games, and a contact form. It's architected as a single-page application (SPA) with server-side rendering capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom copper theme variables and CSS-in-JS animations
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: Express sessions with PostgreSQL session store
- **Payment Processing**: PayPal Server SDK integration
- **Development**: Hot module replacement (HMR) with Vite middleware

### Design Patterns
- **Monorepo Structure**: Shared schema and types between client/server
- **Repository Pattern**: Storage abstraction layer supporting both in-memory and database implementations
- **Component Composition**: Radix UI headless components with custom styling
- **Error Boundaries**: Global error handling with toast notifications

## Key Components

### Navigation System
- Responsive navigation with mobile hamburger menu
- Circuit board animation background with moving dots
- Active route highlighting and smooth transitions

### Photography Module
- Interactive gallery with modal viewing
- PayPal payment integration for photo purchases
- Responsive grid layout with loading states
- Image optimization and lazy loading

### Games Engine
- Four interactive browser games: Snake, Tetris, Pong, and Breakout
- HTML5 Canvas-based rendering with 60fps game loops
- Keyboard input handling with anti-repeat mechanisms
- Game state management and collision detection

### Contact System
- Form validation with Zod schemas
- Server-side message persistence
- Toast notification feedback
- Rate limiting and spam protection

## Data Flow

### Client-Server Communication
1. **API Layer**: RESTful endpoints with Express.js middleware
2. **Query Management**: TanStack Query handles caching, refetching, and optimistic updates
3. **Type Safety**: Shared TypeScript interfaces ensure end-to-end type consistency
4. **Error Handling**: Centralized error boundary with user-friendly messages

### Payment Flow
1. **Photo Selection**: User selects photo from gallery
2. **PayPal Integration**: Order creation through PayPal Server SDK
3. **Payment Processing**: Secure capture and verification
4. **Order Tracking**: Database persistence with status updates

### Game State Management
1. **Initialization**: Canvas setup and game state creation
2. **Input Handling**: Keyboard event listeners with state tracking
3. **Game Loop**: RequestAnimationFrame-based 60fps updates
4. **Collision Detection**: Boundary checking and object interaction

## External Dependencies

### Payment Processing
- **PayPal Server SDK**: Production-ready payment processing
- **Environment Configuration**: Sandbox/production environment switching
- **Webhook Support**: Order status updates and notifications

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling with custom theme
- **Lucide React**: Consistent icon library
- **Font Awesome**: Additional icon support

### Development Tools
- **Vite**: Fast development server and build tool
- **ESBuild**: JavaScript/TypeScript bundler for production
- **Drizzle Kit**: Database migration and schema management
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Production Build
- **Client**: Vite builds optimized static assets to `dist/public`
- **Server**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static files served through Express with proper caching headers

### Environment Configuration
- **Development**: Local development with hot reloading
- **Production**: Optimized builds with environment variable configuration
- **Database**: PostgreSQL with connection pooling and migration support

### Replit Integration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Workflows**: Automated development server startup
- **Port Configuration**: Internal port 5000 mapped to external port 80

## Changelog
- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.