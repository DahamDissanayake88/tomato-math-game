# Tomato Math Puzzle Game (Enhanced Web Edition)

**Project:** CIS046-3 – Software for Enterprise Assignment  
**Framework:** Next.js (App Router), React, TypeScript  
**Styling:** Tailwind CSS  
**External Integration:** University of Bedfordshire Banana API  

---

## 🍅 Project Overview

The **Enhanced Tomato Math Puzzle Game** is a modern, responsive, educational web game built upon the original University of Bedfordshire Java Swing reference implementation. 

The application retrieves mathematical puzzles dynamically from the Banana API, presents them as Base64-decoded images, challenges players to deduce the missing tomato value (0–9), tracks performance across a 10-question session, enforces an escalating countdown timer, and advances difficulty through level progression.

---

## 🏛 Software Engineering Concepts

1. **Version Control**: Git repository with incremental, descriptive commits matching each architectural development phase.
2. **Event-Driven Programming**: React event-driven architecture managing player inputs, timer intervals, answer validations, and state progression.
3. **Interoperability**: Distributed HTTP communication with the Banana API, decoding raw CSV payloads and Base64 image streams.
4. **Virtual Identity**: Session-scoped player profile tracking usernames and individual game records without persistent database bloat.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the game.
