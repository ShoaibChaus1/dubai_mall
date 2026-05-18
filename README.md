# Dubai Mall | The Global Stage

An interactive, cinematic sales operating system and presentation deck designed for elite luxury brand leasing, high-impact sponsorships, and world-class event bookings at The Dubai Mall.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge)

## 🌟 The Vision
This project replaces a traditional static PDF or PowerPoint sales deck with an immersive, browser-based cinematic experience. It leverages complex scroll-linked animations, horizontal pinning, and high-fidelity aesthetics to convince top-tier brands and event organizers to invest in The Dubai Mall.

## 🛠️ Tech Stack
* **Framework:** Next.js 15 (App Router) & React 19
* **Styling:** Tailwind CSS v4 for rapid utility-based styling.
* **Animation:** GSAP (GreenSock Animation Platform) + ScrollTrigger for complex scroll-linked scrubbing and horizontal section pinning.
* **Scroll Physics:** Lenis for buttery-smooth, cinematic scroll momentum.
* **Icons & UI:** Lucide React & Framer Motion.
* **State Management:** Zustand for lightweight global state (coordinating preloader, intro video, and scroll locks).

## Getting Started

First, run the development server:

   ```bash
   npm run dev
   ```

4. **Experience the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Decisions
* **Dark Luxury Aesthetic:** Opted for a deep, cinematic dark theme (`#050505` background) with muted gold accents (`#C9A440`) to evoke prestige and exclusivity.
* **Scroll as the Storyteller:** Instead of clicking through slides, the user controls the narrative pace by scrolling. Complex metrics and luxury brand grids are revealed organically as the user moves down the page.
* **Horizontal Pinning Architecture:** Utilized GSAP `ScrollTrigger` to pin vertical scrolling and force horizontal track movement for the Retail and Luxury sections. This maximizes screen real estate and feels highly interactive.
* **Cinematic Intro:** Implemented a full-screen, auto-playing video sequence with audio controls immediately following the preloader to set the emotional tone before unlocking the main site navigation.

## 🎯 Evaluation Criteria Addressed
This project was built to demonstrate a synthesis of frontend engineering and AI-powered interactive design:

* **Design Judgment:** Crafted a dark luxury aesthetic (`#050505` and `#C9A440`) employing glassmorphism, elegant typography, and minimalist UI that aligns with elite global brands.
* **Frontend Execution:** Built with Next.js 15 and Tailwind v4. Engineered complex horizontal and vertical scroll-pinning architectures using GSAP to maximize screen real estate and interactivity without breaking layouts.
* **Product Thinking:** Transformed a standard pitch deck into a "Sales Operating System" tailored specifically for conversion (e.g., interactive footfall simulators and high-ticket leasing contact flows).
* **Storytelling:** Utilized Lenis smooth-scrolling to pace the narrative organically, ensuring the user controls the reveal of metrics and immersive imagery.
* **Use of AI Tools:** Leveraged **Gemini** as a comprehensive creative and technical partner. Gemini generated the cinematic intro video, atmospheric background textures, and high-fidelity images, while also acting as an agentic coding assistant to accelerate development and debug complex GSAP timeline math.
* **Performance:** Implemented lazy loading for video assets, optimized media delivery, and carefully decoupled heavy GSAP calculations from React state to maintain a buttery-smooth cinematic experience.

---
*Created as an interactive design and frontend engineering portfolio assignment.*
