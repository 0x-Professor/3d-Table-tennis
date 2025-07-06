"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing"
import GameScene from "@/components/game/GameScene"
import GameUI from "@/components/game/GameUI"
import { GameProvider } from "@/components/game/GameContext"
import LoadingScreen from "@/components/game/LoadingScreen"

export default function GamePage() {
  return (
    <GameProvider>
      <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-800">
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
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={60} near={0.1} far={1000} />

            {/* Controls */}
            <OrbitControls
              enablePan={false}
              enableZoom
              enableRotate
              minDistance={8}
              maxDistance={20}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              target={[0, 0, 0]}
            />

            {/* Physics & game scene */}
            <Physics gravity={[0, -9.81, 0]}>
              <GameScene />
            </Physics>

            {/* HDRI / environment */}
            <Environment preset="warehouse" />

            {/* Post-processing – turn on the internal normal pass */}
            <EffectComposer enableNormalPass>
              <SSAO intensity={0.5} radius={0.1} />
              <Bloom intensity={0.5} luminanceThreshold={0.9} />
            </EffectComposer>
          </Canvas>
        </Suspense>

        <GameUI />
      </div>
    </GameProvider>
  )
}
