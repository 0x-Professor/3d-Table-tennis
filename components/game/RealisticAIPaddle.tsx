"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function RealisticAIPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { state, dispatch } = useGame()
  const targetPosition = useRef(new THREE.Vector3(0, 1.8, -1.6))
  const reactionTime = useRef(0)

  useFrame((frameState, delta) => {
    if (!paddleRef.current || !groupRef.current) return

    const position = paddleRef.current.translation()
    const ballPos = state.ballPosition

    // AI difficulty settings
    const difficulty = state.gameSettings.difficulty
    let speed = 0.08
    let accuracy = 0.85
    let reactionDelay = 0.3

    switch (difficulty) {
      case "easy":
        speed = 0.05
        accuracy = 0.6
        reactionDelay = 0.5
        break
      case "medium":
        speed = 0.08
        accuracy = 0.8
        reactionDelay = 0.3
        break
      case "hard":
        speed = 0.12
        accuracy = 0.95
        reactionDelay = 0.1
        break
    }

    // Update reaction timer
    reactionTime.current += delta

    // AI Logic - predict ball trajectory - adjusted for larger table
    if (ballPos[2] < 0 && reactionTime.current > reactionDelay) {
      const timeToReach = Math.abs((position.z - ballPos[2]) / Math.max(Math.abs(ballPos[2] - position.z), 1))
      const predictedX = ballPos[0] + (ballPos[0] - position.x) * timeToReach * 0.5

      targetPosition.current.x = THREE.MathUtils.clamp(predictedX, -2.5, 2.5)
      targetPosition.current.z = -1.6

      // Add some inaccuracy based on difficulty
      if (Math.random() > accuracy) {
        targetPosition.current.x += (Math.random() - 0.5) * 0.5
      }

      reactionTime.current = 0
    } else if (ballPos[2] > 0) {
      // Return to center when ball is on player side
      targetPosition.current.x = THREE.MathUtils.lerp(targetPosition.current.x, 0, 0.02)
      targetPosition.current.z = -1.6
    }

    // Smooth movement towards target
    const currentPos = new THREE.Vector3(position.x, position.y, position.z)
    const newPos = currentPos.lerp(targetPosition.current, speed)

    // Constrain to AI side - adjusted for larger table
    newPos.x = Math.max(-2.5, Math.min(2.5, newPos.x))
    newPos.z = Math.max(-2.2, Math.min(-0.8, newPos.z))

    paddleRef.current.setTranslation(newPos, true)

    // Animate paddle based on movement
    const movement = newPos.clone().sub(currentPos)
    groupRef.current.rotation.x = movement.z * 2
    groupRef.current.rotation.z = -movement.x * 2

    // Update game state
    dispatch({
      type: "UPDATE_AI_PADDLE",
      position: [newPos.x, newPos.y, newPos.z],
    })
  })

  return (
    <RigidBody ref={paddleRef} type="kinematicPosition" colliders="cuboid" restitution={1.1} friction={0.6}>
      <group ref={groupRef}>
        {/* Paddle Surface - Increased size */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.01, 0.5]} />
          <meshPhysicalMaterial
            color="#0066cc"
            roughness={0.2}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Paddle Handle - Increased size */}
        <mesh position={[0, -0.04, -0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.025, 0.15]} />
          <meshPhysicalMaterial color="#8B4513" roughness={0.8} metalness={0.0} />
        </mesh>

        {/* Rubber Surface - Blue Side */}
        <mesh position={[0, 0.006, 0]} castShadow>
          <boxGeometry args={[0.295, 0.002, 0.495]} />
          <meshPhysicalMaterial color="#003399" roughness={0.9} metalness={0.0} />
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
