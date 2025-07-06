"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"

export default function ImprovedPlayerPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const keys = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
  })
  const previousPosition = useRef({ x: 0, z: 1.2 })

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
    if (!paddleRef.current) return

    const position = paddleRef.current.translation()
    const velocity = { x: 0, y: 0, z: 0 }
    const speed = 10

    if (keys.current.left) velocity.x -= speed
    if (keys.current.right) velocity.x += speed
    if (keys.current.up) velocity.z -= speed
    if (keys.current.down) velocity.z += speed

    const newX = Math.max(-2.5, Math.min(2.5, position.x + velocity.x * delta))
    const newZ = Math.max(0.3, Math.min(1.4, position.z + velocity.z * delta))

    paddleRef.current.setTranslation({ x: newX, y: 0.2, z: newZ }, true)

    // Store velocity for ball collision calculations
    const paddleVelocity = {
      x: (newX - previousPosition.current.x) / delta,
      z: (newZ - previousPosition.current.z) / delta,
    }

    previousPosition.current = { x: newX, z: newZ }

    dispatch({
      type: "UPDATE_PLAYER_PADDLE",
      position: [newX, 0.2, newZ],
    })
  })

  return (
    <RigidBody
      ref={paddleRef}
      type="kinematicPosition"
      colliders="cuboid"
      restitution={1.5}
      friction={0.8}
      sensor={false}
    >
      <group>
        {/* Paddle Surface - Dark/Black with better collision */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.03]} />
          <meshLambertMaterial color="#222222" />
        </mesh>

        {/* Paddle Handle */}
        <mesh position={[0, -0.03, 0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15]} />
          <meshLambertMaterial color="#D2691E" />
        </mesh>

        {/* Collision helper - invisible larger area */}
        <mesh position={[0, 0, 0]} visible={false}>
          <cylinderGeometry args={[0.25, 0.25, 0.05]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </RigidBody>
  )
}
