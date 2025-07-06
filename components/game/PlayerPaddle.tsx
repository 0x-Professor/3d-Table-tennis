"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"

export default function PlayerPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const keys = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
  })

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = true
          break
        case "KeyD":
        case "ArrowRight":
          keys.current.right = true
          break
        case "KeyW":
        case "ArrowUp":
          keys.current.up = true
          break
        case "KeyS":
        case "ArrowDown":
          keys.current.down = true
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = false
          break
        case "KeyD":
        case "ArrowRight":
          keys.current.right = false
          break
        case "KeyW":
        case "ArrowUp":
          keys.current.up = false
          break
        case "KeyS":
        case "ArrowDown":
          keys.current.down = false
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (!paddleRef.current) return

    const position = paddleRef.current.translation()
    const velocity = { x: 0, y: 0, z: 0 }
    const speed = 8

    // Handle movement
    if (keys.current.left) velocity.x -= speed
    if (keys.current.right) velocity.x += speed
    if (keys.current.up) velocity.z -= speed
    if (keys.current.down) velocity.z += speed

    // Constrain to player side and table bounds
    const newX = Math.max(-3.5, Math.min(3.5, position.x + velocity.x * 0.016))
    const newZ = Math.max(2, Math.min(5.5, position.z + velocity.z * 0.016))

    paddleRef.current.setTranslation({ x: newX, y: 1.2, z: newZ }, true)

    // Update game state
    dispatch({
      type: "UPDATE_PLAYER_PADDLE",
      position: [newX, 1.2, newZ],
    })
  })

  return (
    <RigidBody ref={paddleRef} type="kinematicPosition" colliders="cuboid" restitution={1.2} friction={0.8}>
      <group>
        {/* Paddle Surface */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.02, 0.8]} />
          <meshStandardMaterial color="#cc0000" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Paddle Handle */}
        <mesh position={[0, -0.1, 0.5]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* Rubber Surface */}
        <mesh position={[0, 0.011, 0]} castShadow>
          <boxGeometry args={[0.58, 0.001, 0.78]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>
      </group>
    </RigidBody>
  )
}
