# Gallery

figma : https://www.figma.com/design/aFQzPyVQKqF8aCgwWPCkkl/Ideathon?node-id=3-40&t=jSEdIJqwIMR9VwRh-1 

```
│── /frontend (React Native app)
│   ├── /src
│   │   ├── /components  # Reusable components
│   │   ├── /screens     # App screens
│   │   ├── /navigation  # Navigation setup
│   │   ├── /redux (or /context)  # State management
│   │   ├── /services    # API calls
│   │   ├── /assets      # Images, fonts, etc.
│   │   ├── App.js       # Main entry point
│   │   ├── index.js     # Entry file
│   ├── .env            # Environment variables
│   ├── package.json     # Dependencies
│   ├── babel.config.js  # Babel configuration
│   ├── metro.config.js  # Metro bundler config
│   ├── tsconfig.json    # If using TypeScript
│   ├── README.md        # Frontend docs
│
│── /backend (Node.js + Express API)
│   ├── /src
│   │   ├── /controllers  # Route handlers
│   │   ├── /routes       # API routes
│   │   ├── /models       # Database models (if using MongoDB, Sequelize, etc.)
│   │   ├── /middlewares  # Auth, logging, etc.
│   │   ├── /config       # Config files
│   │   ├── /utils        # Helper functions
│   │   ├── /tests        # Unit tests
│   │   ├── server.js     # Main entry point
│   ├── .env             # Environment variables
│   ├── package.json     # Dependencies
│   ├── README.md        # Backend docs
│
│── .gitignore           # Ignore unnecessary files
│── README.md            # Project overview
│── package.json         # Root dependencies (optional, if needed)
│── docker-compose.yml   # If using Docker
│── .github              # GitHub workflows (CI/CD)
│── docs                 # Additional documentation"

```