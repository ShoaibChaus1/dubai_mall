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

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShoaibChaus1/dubai_mall.git
   cd dubai_mall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
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

## 🤖 AI Tools Used
* **Google Antigravity:** This entire project was architected, coded, and debugged using Google's Antigravity agentic coding assistant. It was used to:
  * Scaffold the Next.js 15 App Router structure.
  * Generate the complex GSAP timeline math for multi-directional scrolling.
  * Diagnose and fix highly specific DOM offset and z-index overlap bugs during scroll pinning.
  * Rapidly iterate on the Tailwind luxury aesthetic based on prompt-driven feedback.

---
*Created for portfolio demonstration purposes.*
