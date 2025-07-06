"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import ImprovedGameScene from "@/components/game/ImprovedGameScene"
import GameUI from "@/components/game/GameUI"
import { GameProvider } from "@/components/game/GameContext"
import LoadingScreen from "@/components/game/LoadingScreen"

export default function GamePage() {
  return (
    <GameProvider>
      <div className="w-full h-screen relative overflow-hidden">
        {/* Blue cloudy background like the reference image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
          {/* Cloud effects */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-32 right-20 w-60 h-60 bg-white rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/3 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 right-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-10 right-1/3 w-36 h-36 bg-white rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>

        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            shadows
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[0, 8, 6]} fov={60} near={0.1} far={1000} />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={6}
              maxDistance={15}
              minPolarAngle={Math.PI / 8}
              maxPolarAngle={Math.PI / 2}
              target={[0, 0, 0]}
              enableDamping
              dampingFactor={0.05}
            />

            <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} debug={false}>
              <ImprovedGameScene />
            </Physics>
          </Canvas>
        </Suspense>

        <GameUI />
      </div>
    </GameProvider>
  )
}
