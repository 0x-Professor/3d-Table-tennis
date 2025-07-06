"use client"
import { RigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import RealisticTable from "./RealisticTable"
import RealisticBall from "./RealisticBall"
import RealisticPlayerPaddle from "./RealisticPlayerPaddle"
import RealisticAIPaddle from "./RealisticAIPaddle"
import RealisticLighting from "./RealisticLighting"
import AudioManager from "./AudioManager"
import CameraController from "./CameraController"

export default function GameScene() {
  const { state } = useGame()

  return (
    <>
      <RealisticLighting />
      <AudioManager />
      <CameraController />

      {/* Realistic Table */}
      <RealisticTable />

      {/* Game Objects */}
      <RealisticBall />
      <RealisticPlayerPaddle />
      <RealisticAIPaddle />

      {/* Room Environment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[50, 1, 50]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} metalness={0.1} clearcoat={0.1} />
        </mesh>
      </RigidBody>

      {/* Walls for ball containment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 5, -25]} visible={false}>
          <boxGeometry args={[50, 10, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 5, 25]} visible={false}>
          <boxGeometry args={[50, 10, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-25, 5, 0]} visible={false}>
          <boxGeometry args={[1, 10, 50]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[25, 5, 0]} visible={false}>
          <boxGeometry args={[1, 10, 50]} />
        </mesh>
      </RigidBody>
    </>
  )
}
