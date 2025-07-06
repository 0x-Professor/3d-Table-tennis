"use client"

import { RigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import FixedTable from "./FixedTable"
import ImprovedBall from "./ImprovedBall"
import ImprovedPlayerPaddle from "./ImprovedPlayerPaddle"
import ImprovedAIPaddle from "./ImprovedAIPaddle"
import StylizedLighting from "./StylizedLighting"
import AudioManager from "./AudioManager"

export default function ImprovedGameScene() {
  const { state } = useGame()

  return (
    <>
      <StylizedLighting />
      <AudioManager />

      {/* Fixed Table */}
      <FixedTable />

      {/* Improved Game Objects with better collision */}
      <ImprovedBall />
      <ImprovedPlayerPaddle />
      <ImprovedAIPaddle />

      {/* Invisible floor with bounce */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.3}>
        <mesh position={[0, -2, 0]} visible={false}>
          <boxGeometry args={[20, 1, 20]} />
        </mesh>
      </RigidBody>

      {/* Invisible walls for ball containment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, -8]} visible={false}>
          <boxGeometry args={[20, 4, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, 8]} visible={false}>
          <boxGeometry args={[20, 4, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-8, 2, 0]} visible={false}>
          <boxGeometry args={[1, 4, 20]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[8, 2, 0]} visible={false}>
          <boxGeometry args={[1, 4, 20]} />
        </mesh>
      </RigidBody>
    </>
  )
}
