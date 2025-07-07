# 🚀 Agentic AI Website Builder 
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/maxckes/SaaS-Agentic-AI-Website-Builder)

> Transform your ideas into stunning SaaS websites with the power of AI. Just describe what you want, and watch it come to life.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.10.1-2D3748)](https://www.prisma.io/)

## ✨ Features

### 🤖 AI-Powered Generation
- **Natural Language Input**: Describe your website in plain English
- **Multi-Agent AI System**: Specialized agents for different aspects of development
- **Google Gemini 2.5 Flash**: Powered by advanced AI models
- **Intelligent Code Generation**: Creates production-ready Next.js applications

### 🎨 Modern Tech Stack
- **Next.js 15.3.3** with React 19 and TypeScript
- **shadcn/ui** components for beautiful, accessible interfaces  
- **Tailwind CSS** for utility-first styling
- **Prisma ORM** with PostgreSQL database
- **tRPC** for type-safe API routes
- **Clerk** for user authentication

### ⚡ Real-Time Development
- **Live Code Execution**: E2B sandboxes for secure code running
- **Split View Interface**: Preview websites alongside source code
- **Hot Reload**: See changes instantly as AI generates code
- **Interactive Chat**: Iterate on your project through conversation

### 🔧 Developer Experience
- **Type Safety**: Full TypeScript support throughout
- **Component Library**: Pre-built shadcn/ui components
- **Responsive Design**: Mobile-first approach by default
- **Modern Tooling**: ESLint, PostCSS, and more

## 🏗️ Architecture

### Multi-Agent AI System
The application uses **Inngest Agent Kit** to orchestrate multiple specialized AI agents:

- **Summary Agent**: Analyzes requirements and manages project state
- **Response Agent**: Generates user-friendly explanations
- **Fragment Title Agent**: Creates descriptive titles for code fragments

### Technology Stack

```mermaid
graph TB
    A[Next.js Frontend] --> B[tRPC API]
    B --> C[Prisma ORM]
    C --> D[PostgreSQL Database]
    B --> E[Inngest Agents]
    E --> F[Google Gemini AI]
    E --> G[E2B Sandboxes]
    A --> H[Clerk Auth]
    A --> I[shadcn/ui Components]
    A --> J[Tailwind CSS]
```

### Database Schema

```prisma
model Project {
  id        String    @id @default(uuid())
  name      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  messages  Message[]
  userId    String
}

model Message {
  id        String      @id @default(uuid())
  content   String
  role      MessageRole
  type      MessageType
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  fragments Fragment?
  projectId String
  project   Project     @relation(fields: [projectId], references: [id])
}

model Fragment {
  id         String   @id @default(uuid())
  messageId  String   @unique
  message    Message  @relation(fields: [messageId], references: [id], onDelete: Cascade)
  sandboxUrl String
  title      String
  files      Json
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm/yarn
- PostgreSQL database
- Clerk account for authentication
- E2B account for code sandboxes
- Google AI API key for Gemini

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/agentic_ai_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

# E2B Sandboxes
E2B_API_KEY="your-e2b-api-key"
SANDBOX_TIMEOUT="600000"

# Google AI
GOOGLE_AI_API_KEY="your-gemini-api-key"

# Profile
NEXT_PUBLIC_AVATAR_URL="https://github.com/yourusername.png"
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agentic-ai-website-builder.git
   cd agentic-ai-website-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
agentic-ai-website-builder/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts               # Database seeding
│   └── migrations/           # Database migrations
├── sandbox-templates/
│   └── nextjs/
│       ├── e2b.Dockerfile    # E2B sandbox configuration
│       └── compile_page.sh   # Build script
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── (home)/          # Home page and auth
│   │   ├── projects/        # Project management
│   │   └── api/             # API routes
│   ├── components/          # Reusable UI components
│   │   └── ui/              # shadcn/ui components
│   ├── modules/             # Feature modules
│   │   ├── projects/        # Project management
│   │   └── messages/        # Chat functionality
│   ├── inngest/             # AI agent functions
│   ├── lib/                 # Utilities and config
│   ├── trpc/                # tRPC setup
│   ├── middleware.ts        # Authentication middleware
│   └── prompt.ts            # AI prompts
└── package.json
```

## 🔧 Key Components

### AI Agent System
Located in `src/inngest/functions.ts`, the multi-agent system includes:

- **Code Generation**: Creates Next.js applications with shadcn/ui
- **File Management**: Handles project files and structure  
- **Terminal Access**: Executes commands in sandboxed environment
- **Error Handling**: Manages build errors and debugging

### Project Interface
The main project view (`src/modules/projects/ui/views/project-views.tsx`) provides:

- **Split Layout**: Chat on left, preview/code on right
- **Live Preview**: Real-time website rendering
- **Code Explorer**: File tree and syntax highlighting
- **Interactive Chat**: Natural language project iteration

### Authentication
Powered by Clerk with middleware protection:

- **Public Routes**: Home, sign-in, sign-up, API
- **Protected Routes**: All project pages
- **User Context**: Available throughout the application

## 🎯 Usage

1. **Sign Up/Sign In**: Create an account using Clerk authentication

2. **Create a Project**: 
   ```
   Describe your website: "A task management app with user authentication, 
   dashboard, and team collaboration features"
   ```

3. **Watch AI Generate**: The system will:
   - Parse your requirements
   - Generate Next.js code with shadcn/ui components
   - Create a working application in E2B sandbox
   - Provide live preview and source code

4. **Iterate and Refine**: 
   - Chat with the AI to modify features
   - Request design changes
   - Add new functionality
   - Fix bugs and issues

## 🔮 AI Capabilities

The system can generate:

- **Full SaaS Applications**: Complete with authentication, dashboards, and data management
- **Landing Pages**: Marketing sites with modern design
- **E-commerce Stores**: Product catalogs, shopping carts, checkout flows
- **Dashboards**: Analytics, admin panels, data visualization
- **Interactive Widgets**: Forms, calculators, tools
- **Content Management**: Blogs, portfolios, documentation sites

## 🚧 Development

### Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations

```bash
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [E2B](https://e2b.dev/) for secure code execution environments
- [Inngest](https://www.inngest.com/) for the agent orchestration platform
- [Clerk](https://clerk.com/) for seamless authentication
- [Vercel](https://vercel.com/) for hosting and deployment


---

**Built with ❤️ by [KES](https://github.com/maxckes)**
