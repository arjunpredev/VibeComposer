## 🎓 Built with pre.dev

This project was built using [**pre.dev**](https://pre.dev), an AI Solutions Architect.

<div align="center">
  <a href="https://pre.dev">
    <img src="https://pre.dev/predev_logo_name.png" alt="pre.dev logo" width="300">
  </a>
</div>

# 🎵 Vibe Composer

**Create music with AI in real-time.** Combine the power of [Strudel](https://strudel.cc/) (live coding music environment) with advanced AI for collaborative, instant music generation.

<div align="center">
  <img src="./public/vibe-composer.png" alt="Vibe Composer Interface" width="100%" style="border-radius: 8px; margin: 20px 0;">
</div>

## ✨ Features

- 🎹 **Split Interface** — Strudel REPL on the left, AI chat on the right
- 🤖 **AI-Powered Code Generation** — AI generates Strudel code from your prompts
- ⚡ **One-Click Apply** — Apply AI-generated code directly to the REPL
- 💾 **Persistent Storage** — Your API key and chat history stay in your browser
- 🎨 **Terminal Aesthetic** — Clean, minimal black/white theme with monospace typography
- 🚀 **Real-Time Streaming** — Watch AI responses appear live

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **Anthropic API Key** — [Get one free](https://console.anthropic.com/)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

## 📖 How to Use

1. **Add Your API Key** — Paste your Anthropic API key at the top of the app
2. **Chat with AI** — Describe the music you want (e.g., *"Create a drum pattern in C minor"*)
3. **Apply Code** — Click *"Apply to Strudel"* to load the generated code
4. **Play** — Press play or Ctrl+Enter in the Strudel REPL to hear your creation

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Build** | Vite + React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand |
| **AI** | Advanced LLM (Anthropic API) |
| **Music** | Strudel (CDN) |
| **UI Components** | Radix UI |

## 🔒 Security

Your API key is stored **only in your browser's localStorage** and is never sent anywhere except directly to Anthropic's API. No server, no tracking—just you and your music.

## 🙏 Acknowledgments

This project would not be possible without **[Strudel](https://strudel.cc/)**, an incredible live coding environment for algorithmic music and pattern creation. Strudel is developed and maintained by [Felix Roos](https://github.com/felixroos) and the broader Strudel community.

Strudel brings the joy of live coding to the web, making music creation accessible and fun. It's inspired by TidalCycles and built with modern web technologies. We're grateful for the amazing work the Strudel team has done to make creative music coding available to everyone.

**Learn more about Strudel:**
- 🌐 Website: [strudel.cc](https://strudel.cc/)
- 📚 Documentation: [strudel.cc/learn](https://strudel.cc/learn/)
- 💻 GitHub: [github.com/tidalcycles/strudel](https://github.com/tidalcycles/strudel)

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

### Third-Party Licenses

- **[Strudel](https://strudel.cc/)** — AGPL-3.0
  - Strudel is a live coding music environment that powers the REPL in this application.
  - The Strudel REPL runs as an embedded iframe from `strudel.cc` and is not bundled with this project.

### License Summary

Under AGPL-3.0, you are free to:
- ✅ Use, modify, and distribute this software
- ✅ Use it for any purpose (commercial or otherwise)

**With the following obligations:**
- 📋 Provide a copy of this license with any distribution
- 🔄 Disclose all modifications and when they were made
- 🔗 Distribute source code along with any web-based application
- 🏷️ License derivative works under the same AGPL-3.0 license

For the complete license text, see [LICENSE](./LICENSE) or visit [GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html).

## 🎵 Built with

- [Strudel](https://strudel.cc/) — Live coding music environment
- [React](https://react.dev/) — UI library
- [Anthropic Claude](https://www.anthropic.com/) — AI model

