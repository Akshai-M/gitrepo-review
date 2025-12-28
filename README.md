# GitRepo Review

An AI-powered code review and analysis tool that allows you to chat with your Git repositories using natural language. Built with Next.js, Mistral AI, Supabase, and Redis.

## Features

- **Repository Management**: Add and manage Git repositories for analysis
- **AI-Powered Chat**: Ask questions about your codebase in natural language
- **Semantic Search**: Find relevant code snippets using vector embeddings
- **Code Chunking**: Automatically process and index code for efficient retrieval
- **Real-time Processing**: Background workers handle repository cloning and indexing
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI/ML**: Mistral AI (Codestral model for chat, Mistral Embed for embeddings)
- **Database**: Supabase (PostgreSQL with vector extensions)
- **Queue**: BullMQ with Redis
- **Git Integration**: Simple Git for repository cloning
- **Code Highlighting**: Highlight.js, React Syntax Highlighter

## Prerequisites

- Node.js 18+
- Git
- Redis instance (local or cloud like Upstash)
- Supabase account and project
- Mistral AI API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Mistral AI
MISTRAL_API_KEY=your_mistral_api_key

# Redis (for BullMQ queue)
UPSTASH_REDIS_URL=your_redis_url
```

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gitrepo-review
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env.local`

4. Set up the database schema in Supabase

5. Start the development server:
```bash
npm run dev
```

6. In a separate terminal, start the worker:
```bash
npm run worker
```

Or run both simultaneously:
```bash
npm run dev:all
```

## Usage

1. **Add a Repository**: Use the sidebar to add a Git repository by providing its URL
2. **Wait for Processing**: The system will clone, chunk, and index the repository
3. **Start Chatting**: Select a repository and ask questions about the codebase
4. **Get AI Responses**: Receive detailed answers with relevant code snippets

## API Endpoints

- `POST /api/add-repo` - Add a new repository for processing
- `GET /api/list-repos` - Get list of repositories for current session
- `POST /api/review` - Ask questions about a repository
- `GET /api/repo-status` - Check processing status of a repository
- `POST /api/cleanup-session` - Clean up session data
- `POST /api/search-chunks` - Search for code chunks (internal)

## Architecture

### Frontend
- **Main Page** (`app/page.tsx`): Repository selection and chat interface
- **Sidebar** (`app/repos/Sidebar.tsx`): Repository list and add repository form
- **Chat Window** (`app/repos/ChatWindow.tsx`): AI chat interface with code highlighting
- **Components**: Reusable UI components with Tailwind styling

### Backend
- **API Routes**: RESTful endpoints for repository management and AI interactions
- **Worker** (`worker/repoWorker.ts`): Background processing for repository cloning and indexing
- **Libraries**:
  - `lib/embed.ts`: Text embedding using Mistral AI
  - `lib/chunkText.ts`: Code chunking with overlap
  - `lib/queue.ts`: BullMQ queue management
  - `lib/supabase.ts`: Database client
  - `lib/session.ts`: Session management

### Processing Flow
1. User adds repository URL
2. Repository is queued for processing
3. Worker clones the repository
4. Code is chunked into manageable pieces
5. Each chunk is embedded using Mistral AI
6. Embeddings and chunks are stored in Supabase
7. User can now query the repository using natural language
8. Semantic search finds relevant chunks
9. AI generates responses based on context

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run worker` - Start the repo processing worker
- `npm run dev:all` - Run both dev server and worker concurrently

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling
- Component-based architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on the GitHub repository.