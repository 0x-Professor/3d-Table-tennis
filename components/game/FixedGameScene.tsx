"use client"

import { RigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import FixedTable from "./FixedTable"
import FixedBall from "./FixedBall"
import FixedPlayerPaddle from "./FixedPlayerPaddle"
import FixedAIPaddle from "./FixedAIPaddle"
import StylizedLighting from "./StylizedLighting"
import AudioManager from "./AudioManager"

export default function FixedGameScene() {
  const { state } = useGame()

  return (
    <>
      <StylizedLighting />
      <AudioManager />

      {/* Fixed Table */}
      <FixedTable />

      {/* Game Objects */}
      <FixedBall />
      <FixedPlayerPaddle />
      <FixedAIPaddle />

      {/* Invisible floor */}
      <RigidBody type="fixed" colliders="cuboid">
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
