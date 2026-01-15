# VERICORA - Agentic Learning Platform

## Overview

VERICORA is a single-page stealth website targeting investors, presenting an integrity-first platform for agentic learning infrastructure. The site follows a premium editorial design language with a white/off-white theme, large serif headlines, and calm scroll-based interactions. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS v4 with custom theme variables defined in `client/src/index.css`
- **UI Components**: shadcn/ui component library (new-york style) with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for scroll-based reveals and micro-interactions
- **Smooth Scrolling**: Lenis for premium scroll experience
- **Typography**: Source Serif 4 (headings) + Inter (body) font pairing

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Development**: tsx for TypeScript execution, Vite for HMR during development
- **Production Build**: esbuild bundles server code, Vite builds client assets
- **Static Serving**: Express serves built client from `dist/public`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Migrations**: Drizzle Kit manages schema migrations in `./migrations`
- **Development Storage**: MemStorage class provides in-memory storage fallback
- **Database URL**: Configured via `DATABASE_URL` environment variable

### Project Structure
```
client/           # React frontend application
  src/
    components/ui/  # shadcn/ui components
    pages/          # Route components (home.tsx is main landing page)
    hooks/          # Custom React hooks
    lib/            # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data access layer interface
  vite.ts         # Vite dev server integration
  static.ts       # Production static file serving
shared/           # Shared code between client and server
  schema.ts       # Drizzle database schema
```

### Build System
- **Development**: `npm run dev` starts Express with Vite middleware for HMR
- **Production**: `npm run build` uses custom build script that:
  1. Builds client with Vite to `dist/public`
  2. Bundles server with esbuild to `dist/index.cjs`
- **Database**: `npm run db:push` pushes schema changes via Drizzle Kit

### Design System
- **Color Palette**: Warm white background, near-black text, muted teal accent
- **Spacing**: CSS custom properties for consistent spacing scale
- **Typography**: Large editorial serif headlines, clean sans-serif body
- **Components**: Cards with subtle borders, refined buttons with arrow icons
- **Interactions**: Scroll-triggered fade/translate animations, chapter-like sections

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **drizzle-zod**: Zod schema generation from Drizzle tables
- **framer-motion**: Animation library for scroll reveals
- **lenis**: Smooth scroll library for premium feel

### UI Framework
- **@radix-ui/react-***: Headless UI primitives (dialog, dropdown, tabs, etc.)
- **class-variance-authority**: Component variant management
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL)
- **connect-pg-simple**: Session store for PostgreSQL

### Development Tools
- **vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production server
- **drizzle-kit**: Database migration tooling