# Vibe Composer

A Vite-powered web app that combines [Strudel](https://strudel.cc/) (live coding music environment) with Claude Haiku 4.5 AI for collaborative music creation.

## Features

- **Split Interface**: Strudel REPL on the left, AI chat on the right
- **AI-Powered Code Generation**: Claude Haiku 4.5 generates Strudel code based on your prompts
- **One-Click Apply**: Apply AI-generated code directly to the Strudel REPL
- **Persistent Storage**: API key and chat history stored in localStorage
- **Terminal Aesthetic**: Clean black/white theme with monospace font
- **Streaming Responses**: Real-time AI response streaming

## Getting Started

### Prerequisites

- Node.js (v18+)
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Enter API Key**: Input your Anthropic API key in the top section
2. **Chat with AI**: Ask for Strudel code in the chat interface (e.g., "Create a drum pattern in C minor")
3. **Apply Code**: Click the "Apply to Strudel" button on any AI response
4. **Play Music**: Hit play or Ctrl+Enter in the Strudel REPL to hear your composition

## Tech Stack

- **Frontend**: Vite, React, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **AI**: Anthropic Claude Haiku 4.5
- **Music**: Strudel (embedded via CDN)

## Security Note

Your API key is stored locally in your browser's localStorage and never sent to any server except Anthropic's API directly from your browser.

## License

MIT
