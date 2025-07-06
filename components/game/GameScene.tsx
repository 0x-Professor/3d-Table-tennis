"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import TableTennis from "./TableTennis"
import Ball from "./Ball"
import PlayerPaddle from "./PlayerPaddle"
import AIPaddle from "./AIPaddle"
import Lighting from "./Lighting"
import AudioManager from "./AudioManager"

export default function GameScene() {
  const { state, dispatch } = useGame()
  const sceneRef = useRef<RapierRigidBody>(null)

  // Game loop
  useFrame((state, delta) => {
    // Update game logic here if needed
  })

  return (
    <>
      <Lighting />
      <AudioManager />

      {/* Table */}
      <TableTennis />

      {/* Ball */}
      <Ball />

      {/* Player Paddle */}
      <PlayerPaddle />

      {/* AI Paddle */}
      <AIPaddle />

      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -2, 0]} receiveShadow>
          <boxGeometry args={[50, 0.1, 50]} />
          <meshStandardMaterial color="#2a4d3a" />
        </mesh>
      </RigidBody>
    </>
  )
}
