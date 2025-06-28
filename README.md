# 🥗 Macro Tracker PWA

A Progressive Web App built with React & Vite to help users track calories and macros from food images—with optional context, privacy-first design, and native-like mobile experience.

---

## 🚀 Features

- **📸 Capture or Upload Food Image**  
  Users choose between using the device camera or uploading a photo.  
- **🗣️ Optional Description Input**  
  Add context like “half a bowl of tomato soup” to improve accuracy.  
- **🤖 AI-based Macro Estimation**  
  Supports user-supplied API keys for:
  - **OpenAI** — GPT‑4 Vision / gpt‑4o  
  - **Google Gemini** — Gemini 2.5 Pro / Flash  
- **🎯 Daily Logging & Calendar View**  
  Save and view entries by date—including image and macros.  
- **🔐 Privacy-first Design**  
  Users store their own API keys in browser storage; no backend, no developer access.  
- **📲 Installable PWA**  
  Works offline, installable on mobile—no App Store submission required.

---

## 🧱 Tech Stack

- **Framework**: React 18 + Vite  
- **PWA Support**: `vite-plugin-pwa`  
- **Routing**: `react-router-dom`  
- **Camera UI**: `react-camera-pro`  
- **Calendar UI**: `react-calendar`  
- **Icons**: `lucide-react`  
- **AI Integration**:  
  - OpenAI API  
  - Google Gemini via `@google/genai`  
- **Storage**: `localStorage` + React hooks  
- **Deployment**: Static site hosting on Vercel

---

## 🔧 Setup & Run Locally

### Install dependencies

```bash
git clone https://your-repo-url
cd macro-tracker-pwa
npm install
````

### Start development server

```bash
npm run dev
```

Visit `http://localhost:5173` to test capture/upload, macro analysis, and calendar view.

---

## 🧪 Usage Flow

1. **Home Page**

   * Choose **Use Camera** or **Upload Photo**
   * Optional: add context description
   * Click **Analyze & Save**
   * See AI-generated calories & macros
2. **Calendar Page**

   * View days with entries highlighted
   * Click a date to see image + macros
3. **Settings Page**

   * Choose AI provider (OpenAI or Gemini)
   * Enter your API key & select model
   * Keys are stored locally—never shared

---

## 🌍 PWA & Offline Support

* Service worker enabled via `vite-plugin-pwa`
* Test offline mode: serve the `dist/` folder locally (`serve -s dist`), then disconnect internet
* Installable with “Add to Home Screen” prompt on mobile

---

## 📦 Production Deployment (Vercel)

```bash
npm run build
```

Make sure you have `vercel.json` with headers and SPA rewrites.
Push to GitHub/GitLab, connect to Vercel, and deploy — HTTPS is automatic.
Optional: custom domain, analytics integration, and usage monitoring.

---

## 🔒 API Keys & Privacy

* Users add their **own** API keys (OpenAI/Gemini)
* Keys are stored **only** in browser's local storage
* **No backend** — developer **never sees** user data or credentials
* **Warning**: Do not use unrestricted or sensitive-key accounts; review usage in vendor dashboards

---

## 📌 Why This Project?

* Builds hands-on experience with:

  * PWA best practices & service worker caching
  * AI integration with user-managed credentials
  * Device camera access in React
* Fully open source—serve as template for:

  * Food & nutrition apps
  * Journaling, wellness, or offline-first apps

---

## 🛠️ Future Improvements

* Add summary dashboard (weekly/monthly macros) using chart libraries
* Enhance UI/UX with Tailwind CSS or theming
* Add authentication and optional cloud sync
* Support more AI providers or model families

---

## 📝 License & Contribution

Open source under the [MIT License](./LICENSE). Feel free to file issues or submit PRs!

---

## 🙏 Acknowledgements

* Inspired by AI macro-estimation demos ([Medium post](https://andrewkushnerov.medium.com))
* Thanks to Vite, WAGMI, and the open-source community for tooling

---

**Enjoy eating smarter — one photo at a time!** 🍽️
