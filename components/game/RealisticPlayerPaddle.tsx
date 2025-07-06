"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function RealisticPlayerPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const groupRef = useRef<THREE.Group>(null)
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

  useFrame((state, delta) => {
    if (!paddleRef.current || !groupRef.current) return

    const position = paddleRef.current.translation()
    const velocity = { x: 0, y: 0, z: 0 }
    const speed = 8

    // Handle movement
    if (keys.current.left) velocity.x -= speed
    if (keys.current.right) velocity.x += speed
    if (keys.current.up) velocity.z -= speed
    if (keys.current.down) velocity.z += speed

    // Constrain to player side and table bounds - adjusted for larger table
    const newX = Math.max(-2.5, Math.min(2.5, position.x + velocity.x * delta))
    const newZ = Math.max(0.8, Math.min(2.2, position.z + velocity.z * delta))

    paddleRef.current.setTranslation({ x: newX, y: 1.8, z: newZ }, true)

    // Animate paddle tilt based on movement
    const targetRotationX = velocity.z * 0.1
    const targetRotationZ = -velocity.x * 0.1

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.1)

    // Update game state
    dispatch({
      type: "UPDATE_PLAYER_PADDLE",
      position: [newX, 1.8, newZ],
    })
  })

  return (
    <RigidBody ref={paddleRef} type="kinematicPosition" colliders="cuboid" restitution={1.1} friction={0.6}>
      <group ref={groupRef}>
        {/* Paddle Surface - Increased size */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.01, 0.5]} />
          <meshPhysicalMaterial
            color="#cc1100"
            roughness={0.2}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Paddle Handle - Increased size */}
        <mesh position={[0, -0.04, 0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.025, 0.15]} />
          <meshPhysicalMaterial color="#8B4513" roughness={0.8} metalness={0.0} />
        </mesh>

        {/* Rubber Surface - Red Side */}
        <mesh position={[0, 0.006, 0]} castShadow>
          <boxGeometry args={[0.295, 0.002, 0.495]} />
          <meshPhysicalMaterial color="#990000" roughness={0.9} metalness={0.0} />
        </mesh>

        {/* Rubber Surface - Black Side */}
        <mesh position={[0, -0.006, 0]} castShadow>
          <boxGeometry args={[0.295, 0.002, 0.495]} />
          <meshPhysicalMaterial color="#000000" roughness={0.95} metalness={0.0} />
        </mesh>
      </group>
    </RigidBody>
  )
}
