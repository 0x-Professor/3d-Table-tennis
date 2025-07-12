# 3D Table Tennis Game

This is a 3D table tennis game built with Next.js, React Three Fiber, and Rapier physics engine. It features a realistic physics simulation, an AI opponent with adjustable difficulty, and a modern UI.

## Features

- **Realistic 3D Graphics**: Built with React Three Fiber, providing a smooth and immersive 3D experience.
- **Physics-Based Gameplay**: Uses the Rapier physics engine for realistic ball and paddle interactions.
- **AI Opponent**: Play against an AI with three difficulty levels: easy, medium, and hard.
- **Game Controls**: 
  - **WASD** or **Arrow Keys**: Move the paddle.
  - **Spacebar**: Serve the ball.
  - **Mouse**: Control the camera.
- **Game UI**: Includes a scoreboard, game status overlays (pause, game over), and game controls.
- **Responsive Design**: The UI is designed to work on different screen sizes.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Physics Engine**: [Rapier](https://rapier.rs/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Context](https://react.dev/reference/react/useContext)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/3d-table-tennis.git
   ```
2. Navigate to the project directory:
   ```sh
   cd 3d-table-tennis
   ```
3. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Project

To run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
.
├── app/                  # Next.js app directory
│   ├── game/             # Game page
│   ├── leaderboard/      # Leaderboard page
│   ├── settings/         # Settings page
│   └── tutorial/         # Tutorial page
├── components/
│   ├── game/             # Game-related components
│   │   ├── AIPaddle.tsx
│   │   ├── Ball.tsx
│   │   ├── GameContext.tsx
│   │   ├── GameScene.tsx
│   │   ├── PlayerPaddle.tsx
│   │   └── ...
│   └── ui/               # Reusable UI components
├── public/               # Static assets
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
