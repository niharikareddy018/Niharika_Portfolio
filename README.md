# Navadeep Naidu's Portfolio Website

A modern, highly interactive personal portfolio website built with Svelte and Vite. Hosted on Cloudflare Pages, it features smooth custom scroll animations, premium visual aesthetics, and a visitor guestbook ("The Wall") powered by Cloudflare D1 and GitHub OAuth.

## Tech Stack

- **Svelte** - Frontend framework
- **Vite** - Build tool & dev server
- **Vanilla CSS** - Styling and layout
- **Cloudflare Pages** - Hosting and serverless backend deployment
- **Cloudflare D1** - Serverless SQL database for visitor guestbook storage
- **GitHub OAuth** - Authentication for signing the visitor wall
- **Lenis** - Smooth scrolling animations

## Project Structure

```
portfolio-website/
├── functions/                      # Cloudflare Pages serverless functions (API backend)
│   └── api/                        # Backend API endpoints
│       ├── auth/                   # Authentication logic
│       │   ├── callback.js         # GitHub OAuth callback handler & D1 database entry
│       │   └── github.js           # Redirects user to GitHub OAuth login page
│       └── visitors.js             # GET endpoint returning all visitors
│
├── migrations/                     # SQLite database migrations
│   └── 0001_create_visitors.sql    # D1 visitors table schema and indexes
│
├── src/                            # Frontend source files
│   ├── components/                 # Reusable Svelte UI components
│   │   ├── About.svelte            # About section
│   │   ├── Experience.svelte       # Interactive work timeline
│   │   ├── FloatingActions.svelte  # Floating contact/action buttons
│   │   ├── Footer.svelte           # Footer component
│   │   ├── Hero.svelte             # Splash landing header with custom animations
│   │   ├── Loading.svelte          # Animated site entryway loading screen
│   │   ├── Navbar.svelte           # Responsive header navigation
│   │   ├── ScrollIndicator.svelte  # Top scroll-depth indicator
│   │   ├── Skills.svelte           # Developer skills & toolbelt showcase
│   │   ├── WallPreview.svelte      # 6-item guestbook grid preview
│   │   ├── Work.svelte             # Project gallery spotlight
│   │   └── Writing.svelte          # Latest blog articles overview
│   │
│   ├── pages/                      # Page-level Svelte templates
│   │   ├── BoardPage.svelte        # Guestbook grid page (/board)
│   │   ├── ProjectDetailPage.svelte# Expanded project detail template
│   │   └── WorkFullPage.svelte     # Full directory of completed projects (/work)
│   │
│   ├── styles/                     # CSS styling
│   │   └── global.css              # Global tokens, resets, variables, and typography
│   │
│   ├── App.svelte                  # Main Svelte container and client-side router
│   └── main.js                     # Application mounting entry point
│
├── public/                         # Static assets (fonts, images, etc.)
├── wrangler.jsonc                  # Cloudflare Pages & D1 database bindings
├── vite.config.js                  # Vite compiler configurations
└── package.json                    # Project dependencies and script runner
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Cloudflare Wrangler CLI (optional, for local database & API development)

### Installation & Run

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/navadeepnaidu7/navadeep-portfolio.git
   cd portfolio-website
   npm install
   ```

2. Start the local frontend development server:
   ```bash
   npm run dev
   ```

3. To run the full stack local dev server (supporting backend API routes and the D1 database binding):
   ```bash
   npx wrangler pages dev --d1 DB
   ```

---

## Database & OAuth Configuration

To get "The Wall" guestbook working locally with database storage and authentication:

1. **Initialize the local D1 Database and run migration**:
   ```bash
   npx wrangler d1 migrations apply portfolio-visitors --local
   ```

2. **Set up Local Secrets**:
   Create a `.dev.vars` file in the root folder and add your GitHub OAuth credentials:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

## License

This project is open-source. Feel free to use and customize it.
