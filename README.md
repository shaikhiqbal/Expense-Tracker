# MERN TypeScript Application

A full-stack MERN application built with TypeScript, featuring a React frontend with Vite and an Express backend.

## 🚀 Tech Stack

### Frontend (client)
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Redux Toolkit** - State management
- **ESLint + Prettier** - Code quality

### Backend (server)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **ESLint + Prettier** - Code quality

## 📋 Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - Database (local or cloud)
  - Local: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - Version control

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd expense-tracker-egc
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, server, client)
npm run install:all

# Or install individually
npm install                    # Root dependencies
cd server && npm install       # Server dependencies
cd ../client && npm install    # Client dependencies
```

### 3. Environment Setup
```bash
# Copy environment template
cp server/.env.example server/.env

# Edit server/.env with your configuration
```

#### Environment Variables (server/.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/mern-app
NODE_ENV=development
```

## 🚀 Development

### Start Both Servers
```bash
npm run dev
```
This starts:
- **Backend**: http://localhost:5001
- **Frontend**: http://localhost:5173

### Individual Commands
```bash
# Backend only
cd server && npm run dev

# Frontend only
cd client && npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
expense-tracker-egc/
├── 📁 client/                 # React Frontend
│   ├── 📁 public/
│   │   └── vite.svg
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   └── 📁 ui/         # shadcn/ui components
│   │   │       ├── button.tsx
│   │   │       └── card.tsx
│   │   ├── 📁 pages/
│   │   │   └── HomePage.tsx
│   │   ├── 📁 features/       # Feature-based modules
│   │   ├── 📁 hooks/
│   │   │   └── redux.ts       # Typed Redux hooks
│   │   ├── 📁 store/
│   │   │   ├── index.ts       # Store configuration
│   │   │   └── 📁 slices/
│   │   │       └── counterSlice.ts
│   │   ├── 📁 lib/
│   │   │   └── utils.ts       # Utility functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .eslintrc.cjs
│   └── .prettierrc
├── 📁 server/                 # Express Backend
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── database.ts    # MongoDB connection
│   │   ├── 📁 models/         # Mongoose models
│   │   ├── 📁 routes/
│   │   │   └── healthRoutes.ts
│   │   ├── 📁 controllers/
│   │   │   └── healthController.ts
│   │   ├── 📁 middlewares/
│   │   │   └── cors.ts
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .eslintrc.js
│   └── .prettierrc
├── package.json               # Root package.json
├── README.md
└── .gitignore
```

## 🔌 API Endpoints

### Health Check
- **GET** `/api/health` - Server health status
  ```json
  {
    "status": "ok"
  }
  ```

## 🧪 Available Scripts

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run install:all  # Install all dependencies
npm run build        # Build both applications
```

### Server Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Client Scripts
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔧 Configuration Files

### TypeScript Configuration
- `server/tsconfig.json` - Node.js TypeScript config
- `client/tsconfig.json` - React TypeScript config
- `client/tsconfig.node.json` - Vite TypeScript config

### Build Tools
- `client/vite.config.ts` - Vite configuration
- `client/tailwind.config.js` - Tailwind CSS config
- `client/postcss.config.js` - PostCSS config

### Code Quality
- `.eslintrc.js/.cjs` - ESLint configuration
- `.prettierrc` - Prettier configuration

## 🎨 UI Components

The project uses **shadcn/ui** components with **Tailwind CSS**:

- **Button** - Various button variants and sizes
- **Card** - Container components with header, content, footer
- **Utility Functions** - `cn()` for class name merging

### Adding New shadcn/ui Components
```bash
cd client
npx shadcn-ui@latest add [component-name]
```

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster and database
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🔒 Environment Variables

### Server Environment Variables
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mern-app

# Security (add as needed)
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d

# External APIs (add as needed)
API_KEY=your-api-key
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
cd server
npm run build
# Deploy with start script: "node dist/index.js"
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Update `MONGODB_URI` to production database
- Configure CORS origins for production domains

## 🛠️ Development Workflow

### Adding New Features
1. **Backend**: Create model → controller → route
2. **Frontend**: Create component → page → Redux slice (if needed)
3. **Integration**: Connect frontend to backend API

### Code Quality
```bash
# Format code
npm run lint:fix

# Type checking
npx tsc --noEmit
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**TypeScript Errors**
- Run `npm install` in affected directory
- Check import paths and file extensions
- Verify TypeScript configuration

**Tailwind Styles Not Working**
- Ensure Tailwind is imported in `index.css`
- Check `tailwind.config.js` content paths
- Restart development server

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🎉**