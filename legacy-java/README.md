# Original Java Reference Implementation

This directory contains the original Java Swing desktop reference application for the **Tomato Math Puzzle Game** provided as the baseline for the CIS046-3 Software for Enterprise assignment.

## Structure
- `com/perisic/tomato/engine/`: Core game logic (`Game.java`, `GameEngine.java`, `GameServer.java`).
- `com/perisic/tomato/peripherals/`: Swing user interfaces (`GameGUI.java`, `LoginGUI.java`, `LoginData.java`).
- `module-info.java`: Java 9+ desktop module descriptor.

The Next.js + TypeScript web application enhances this baseline by replacing desktop Swing with a modern responsive browser interface, adding countdown timers, dynamic levels, accuracy analytics, keyboard accessibility, and an API intermediary route for the Banana API.
