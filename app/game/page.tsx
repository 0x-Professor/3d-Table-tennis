"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, Bloom, SSAO, FXAA } from "@react-three/postprocessing"
import GameScene from "@/components/game/GameScene"
import GameUI from "@/components/game/GameUI"
import { GameProvider } from "@/components/game/GameContext"
import LoadingScreen from "@/components/game/LoadingScreen"

export default function GamePage() {
  return (
    <GameProvider>
      <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-700 to-slate-800">
        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            shadows="soft"
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: 2, // ACESFilmicToneMapping
              toneMappingExposure: 1.0,
            }}
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[0, 18, 25]} fov={45} near={0.1} far={1000} />

            <OrbitControls
              enablePan={false}
              enableZoom
              enableRotate
              minDistance={15}
              maxDistance={35}
              minPolarAngle={Math.PI / 8}
              maxPolarAngle={Math.PI / 2.2}
              target={[0, 1.5, 0]}
              enableDamping
              dampingFactor={0.05}
            />

            <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} paused={false}>
              <GameScene />
            </Physics>

            <Environment preset="warehouse" background={false} environmentIntensity={0.6} />

            <EffectComposer enableNormalPass multisampling={4}>
              <SSAO intensity={0.5} radius={0.3} bias={0.01} samples={32} rings={4} />
              <Bloom intensity={0.2} luminanceThreshold={0.9} luminanceSmoothing={0.9} mipmapBlur />
              <FXAA />
            </EffectComposer>
          </Canvas>
        </Suspense>

        <GameUI />
      </div>
    </GameProvider>
  )
}
