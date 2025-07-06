"use client"

import { RigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import StylizedTable from "./StylizedTable"
import StylizedBall from "./StylizedBall"
import StylizedPlayerPaddle from "./StylizedPlayerPaddle"
import StylizedAIPaddle from "./StylizedAIPaddle"
import StylizedLighting from "./StylizedLighting"
import AudioManager from "./AudioManager"

export default function StylizedGameScene() {
  const { state } = useGame()

  return (
    <>
      <StylizedLighting />
      <AudioManager />

      {/* Stylized Table */}
      <StylizedTable />

      {/* Game Objects */}
      <StylizedBall />
      <StylizedPlayerPaddle />
      <StylizedAIPaddle />

      {/* Invisible floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -2, 0]} visible={false}>
          <boxGeometry args={[20, 1, 20]} />
        </mesh>
      </RigidBody>

      {/* Invisible walls for ball containment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, -10]} visible={false}>
          <boxGeometry args={[20, 4, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, 10]} visible={false}>
          <boxGeometry args={[20, 4, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-10, 2, 0]} visible={false}>
          <boxGeometry args={[1, 4, 20]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[10, 2, 0]} visible={false}>
          <boxGeometry args={[1, 4, 20]} />
        </mesh>
      </RigidBody>
    </>
  )
}
