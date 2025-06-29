# Agentic AI Website Builder (Not Complete Version)

A modern, AI-powered website builder built with Next.js 15, featuring intelligent code generation and a comprehensive component library.

## 🚀 Features

- **AI-Powered Code Generation**: Generate React/Next.js code snippets using Gemini 2.0 Flash
- **Type-Safe APIs**: Full-stack type safety with tRPC
- **Modern UI**: Beautiful, responsive interface with shadcn/ui components
- **Background Processing**: Serverless function execution with Inngest
- **Database Integration**: PostgreSQL with Prisma ORM
- **Real-time Feedback**: Toast notifications and loading states
- **Dark Mode Support**: Built-in theme switching
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Backend**: [tRPC](https://trpc.io/) for type-safe APIs
- **Background Jobs**: [Inngest](https://www.inngest.com/) for serverless functions
- **AI Integration**: [Gemini 2.0 Flash](https://ai.google.dev/) via Inngest Agent Kit
- **State Management**: [TanStack Query](https://tanstack.com/query) (React Query)
- **UI Components**: Comprehensive [shadcn/ui](https://ui.shadcn.com/) component library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agentic-ai-website-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/agentic_ai_db"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
agentic-ai-website-builder/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── inngest/       # Inngest webhook
│   │   │   └── trpc/          # tRPC API endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   ├── inngest/               # Background job functions
│   ├── lib/                   # Utility functions
│   └── trpc/                  # tRPC configuration
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── package.json
```

## 🔧 Configuration

### Database Schema

The application uses a simple blog-like schema:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```

### API Endpoints

- **POST `/api/trpc/invoke`**: Send events to Inngest for AI processing
- **POST `/api/inngest`**: Inngest webhook for background function execution

### tRPC Procedures

- `invoke`: Sends user input to Inngest for AI code generation
- `hello`: Simple greeting endpoint for testing

## 🤖 AI Integration

The application uses Inngest with Gemini 2.0 Flash to generate React/Next.js code snippets:

1. User enters a description in the input field
2. The request is sent to the tRPC `invoke` procedure
3. An Inngest event is triggered with the user input
4. The background function processes the input using an AI agent
5. The AI generates readable, maintainable code snippets
6. Results are logged to the console

### AI Agent Configuration

```typescript
const summaryAgent = createAgent({
  name: "summary-agent",
  system: "You are an expert react js and next js developer...",
  model: gemini({ model: "gemini-2.0-flash" }),
});
```

## 🎨 UI Components

The project includes a comprehensive set of shadcn/ui components:

- **Layout**: Sidebar, Navigation, Breadcrumb
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Data Display**: Table, Card, Badge, Avatar
- **Overlays**: Dialog, Popover, Tooltip, Hover Card
- **Navigation**: Tabs, Accordion, Collapsible
- **And many more...**

## 📱 Responsive Design

The application includes:
- Mobile-first responsive design
- Custom `useIsMobile` hook for device detection
- Optimized layouts for all screen sizes
- Touch-friendly interactions

## 🔄 Background Processing

Inngest handles background tasks with:
- Event-driven architecture
- Automatic retries and error handling
- Scalable serverless execution
- Integration with AI services

## 🚀 Deployment

### Prerequisites
- PostgreSQL database
- Inngest account and configuration
- Environment variables set up

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm run build
   # Deploy to Vercel
   ```

2. **Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Commands

```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database
npx prisma studio    # Open Prisma Studio
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

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [tRPC](https://trpc.io/) for type-safe APIs
- [Inngest](https://www.inngest.com/) for background job processing
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Reach out to the maintainers

---

Built with ❤️ using modern web technologies
