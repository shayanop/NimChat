# Nim Chat

Nim Scribe Chat is a lightweight chat frontend built to work with NVIDIA’s NIM API. It provides a clean UI for interacting with your language model, with support for rendering code blocks, Markdown formatting, and structured conversations.

---

## 🚀 Features

* Chat interface that supports Markdown rendering
* Automatic fenced code block formatting (with language tags)
* Syntax highlighting support (frontend)
* Easy setup with React + Vite + Tailwind CSS
* Pluggable backend — works with NVIDIA NIM API or other LLM endpoints
* Responsive and minimal UI for developer-centric usage

---

## 🧩 Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS
* **UI Components:** shadcn-ui (or your chosen component library)
* **Server / Proxy:** Node.js (server.js)
* **Deployment / Build:** Vite + associated configs

---

## 🛠️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shayanop/nim-scribe-chat.git
   cd nim-scribe-chat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment / backend endpoint
   Edit your configuration (e.g. `.env` or server settings) to point to your NIM API endpoint or other LLM server.

4. Start development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

6. Start the production server:

   ```bash
   npm run start
   ```

---

## 🧠 Usage & Behavior

* When the user submits a prompt, the app sends it to your backend (e.g. NIM API).
* The AI’s response should be returned **in Markdown**.
* For any code or technical response, the model **must** use fenced code blocks with proper language tags, such as:
```
  python
  def hello():
      print("Hello, world!")
  ```
  
* The frontend renderer (using a Markdown library + syntax highlighter) will convert it into a styled, interactive code block.

---

## 🔧 Example Prompt / System Message (for better code handling)

You may want to prepend a system message or instruction like:

````
You are a helpful AI assistant. When providing code, always format it using Markdown fenced code blocks with the correct language tag. For example:

python
print("Hello, world!")

````


Do not inline long code unless explicitly asked. Provide explanations in clear, structured sections. If uncertain, say you don’t know instead of guessing.

```

Using a prompt like that helps maintain consistency in how the model outputs code.

---

## 🧪 Testing & Verification

- Send different types of prompts (explanations, code, debugging) and verify the response is Markdown-friendly.  
- Inspect how code blocks render.  
- Try edge cases (e.g. nested code in explanation, multiple languages in one message).  
- Monitor network logs and backend response formats.

---

## 📦 Deployment Tips

- Use environment variables for API keys or endpoints.  
- Add rate limiting, caching, fallback handling (if NIM API is down).  
- Use a CDN or static hosting for built assets.  
- Monitor errors and logs for malformed Markdown or bad responses.

---

## 🤝 Contribution & Roadmap

Future enhancements might include:

- Message history persistence (local / backend)  
- User authentication & profiles  
- Media support (images, charts)  
- Richer UI themes or dark mode  
- Streaming responses (token-by-token)  
- Support for multiple LLM backends (OpenAI, local models, etc.)

Contributions are welcome — feel free to open issues or pull requests!

---

## 📄 License

Specify your license (e.g. MIT, Apache 2.0) here.

---

## 📬 Contact / Author

- **Author:** Shayan (or your name)  
- **Repository:** [nim-scribe-chat](https://github.com/shayanop/nim-scribe-chat)  
- **Issues & Feedback:** Use GitHub Issues or contact via email (if you want to add it)  

## Backend Setup & Connect

Follow these steps to run and connect the NVIDIA NIM backend to the frontend.

### 1) Prerequisites
- Node.js 18+ and npm
- An NVIDIA NIM (OpenAI-compatible) API key

### 2) Install deps
```bash
npm install
```

### 3) Configure environment variables
Create a `.env` file in the project root:
```
NVIDIA_API_KEY=your_real_key
PORT=3001
```


### 4) Start the backend
```bash
node server.js
```
- Server listens on `http://localhost:3001`
- Logs will show "Server running on http://localhost:3001"

### 5) Connect the frontend (recommended: Vite dev proxy)
The project is configured to proxy API requests during development.
- In `vite.config.ts`, `/api` is proxied to the backend (defaults to `http://localhost:3001`).
- Frontend calls should use a relative URL:
  - `fetch('/api/chat', { ... })`
- Start the frontend:
```bash
npm run dev
```
