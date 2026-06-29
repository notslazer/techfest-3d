# NEURAL CORE — Techfest IIT Bombay

> A 3D interactive biomechanical landing page for Techfest IIT Bombay.

## 🚀 Live Demo
[View Deployment](https://techfest-neural-core.netlify.app/)

## 📖 About
**NEURAL CORE** is an immersive web experience built for Techfest IIT Bombay. It features a central 3D interactive biomechanical core that reacts to mouse movement and scroll position, surrounded by floating event modules. The design merges organic and mechanical elements using a cyberpunk/cyborg aesthetic.

## 🛠️ Tech Stack
- **Vue 3** (Composition API)
- **Three.js** (3D Rendering)
- **GSAP + ScrollTrigger** (Animations)
- **Tailwind CSS** (Styling)
- **Vite** (Build Tool)

##  Features
- 🧠 **Interactive 3D Core**: Mouse-reactive biomechanical sphere with rotating rings
- 📦 **Floating Modules**: 6 interactive cubes representing Techfest events
- 🌐 **Neural Network**: Dynamic connecting lines between 3D objects
-  **Scroll Animations**: Camera flights and object scaling triggered by scrolling
- 💎 **Glassmorphism UI**: Modern HUD overlay with real-time stats
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop

##  Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Steps
1. **Fork the repo**

2. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/techfest-neural-core.git
   cd techfest-neural-core
   ```
3. Install dependencies
  ```bash
  npm install
  ```
4. Run locally
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.

## 📂 Project Structure
```bash
techfest-neural-core/
── public/
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── HUDOverlay.vue
│   │   ├── FeaturesSection.vue
│   │   ├── AboutSection.vue
│   │   └── ContactSection.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
── README.md
```
## 🚀 Deployment
Netlify:
1. Run `npm run build`
2. Upload `dist` folder to Netlify
3. Ensure Build Command is `npm run build` and Publish Directory is `dist`

