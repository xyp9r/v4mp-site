# 💻 root@v4mp.dev :~$

> **An interactive, terminal-themed personal portfolio and dashboard (v2.0).**
> Live at: [v4mp.dev](https://v4mp.dev)

This is a fully dynamic Single Page Application (SPA) dashboard built with **React** and **TypeScript**. It connects to multiple APIs in real-time to display my current status, what I'm listening to, and my coding statistics, with instant component rendering and zero page reloads.

## 🔌 Live Integrations (Real-Time Data)
* **🎵 Spotify / Soundcloud / Last.fm API:** Displays the track I am currently listening to, complete with album art and a CSS equalizer animation.
* **⌨️ WakaTime API:** Pulls my coding activity for the day, top programming languages, and my most-used IDE over the last 7 days.
* **🎮 Discord Status (Lanyard API):** Uses WebSockets to stream my live Discord presence (Online/Idle/DND) and current rich presence activity (e.g., what game I'm playing).
* **📱 Telegram Status:** Connects to a custom backend (`v4mp-tg-api`) via Server-Sent Events (SSE) to show my real-time Telegram online status.
* **🖥 GitHub Commits Status:** Uses GitHub public API for my account (xyp9r) to show my latest commits and their messages.
* **👁️ Page Views:** Tracks unique visits using CounterAPI.

## 🎨 UI / UX Features
* **React SPA:** Instant, seamless switching between the main terminal, projects view, and deep analytics.
* **Matrix Rain Background:** A custom HTML5 Canvas animation running at 60fps in the background.
* **Terminal Interface:** Designed to look and feel like a UNIX terminal, complete with a blinking text-typing effect.
* **Custom Context Menu:** Overrides the default browser right-click menu with a stylized terminal menu (Copy, Select All, Reload), aware of text selection.
* **Custom Hacker Cursor:** A reactive, animated crosshair cursor with click-trails and neon pulse on hover.
* **Hidden Easter Eggs:** Interactive terminal commands triggering custom overlays (like confetti).
* **Responsive Design:** Fully optimized for both desktop and mobile viewing.
* **Live Clock:** Hardcoded to `Europe/Warsaw` timezone so visitors always know my local time.

## ⚙️ Tech Stack
* **Frontend:** React 18, TypeScript (Strict typing & Interfaces), Vite
* **Styling:** CSS3 (Custom properties, animations)
* **Data Fetching:** Fetch API, WebSockets, Server-Sent Events (SSE)
* **Deployment:** GitHub Pages (gh-pages) / GitHub Actions CI/CD

## 📂 File Structure
* `src/App.tsx` - Main React application component & view switching logic.
* `src/main.tsx` - Strict-mode entry point.
* `src/components/` - Modular, strictly-typed reusable React components (Widgets, Cursors, Statuses).
* `src/index.css` - Custom styling, UI effects, animations, and mobile breakpoints.
* `public/` - Static assets, avatars, and custom domain configuration (CNAME).

---
*Stay out of my system.*