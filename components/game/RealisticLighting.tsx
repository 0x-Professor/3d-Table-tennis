"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function RealisticLighting() {
  const directionalRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (directionalRef.current) {
      // Subtle light movement for dynamic shadows
      directionalRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 3
    }
  })

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.4} color="#f0f8ff" />

      {/* Main Directional Light */}
      <directionalLight
        ref={directionalRef}
        position={[8, 20, 8]}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
        color="#ffffff"
      />

      {/* Fill Light */}
      <directionalLight
        position={[-8, 15, -8]}
        intensity={1.2}
        color="#e6f3ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Rim Light */}
      <directionalLight position={[0, 8, -20]} intensity={0.8} color="#4a90e2" />

      {/* Table Spot Light */}
      <spotLight
        position={[0, 12, 0]}
        angle={Math.PI / 2.5}
        penumbra={0.3}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#ffffff"
        target-position={[0, 1.5, 0]}
      />

      {/* Accent Lights */}
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#ff6b6b" distance={15} decay={2} />
      <pointLight position={[5, 5, -5]} intensity={0.8} color="#4ecdc4" distance={15} decay={2} />
    </>
  )
}
