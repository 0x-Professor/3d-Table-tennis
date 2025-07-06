"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function AIPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const targetPosition = useRef(new THREE.Vector3(0, 1.2, -4))

  useFrame(() => {
    if (!paddleRef.current) return

    const position = paddleRef.current.translation()
    const ballPos = state.ballPosition

    // AI Logic - predict ball trajectory and move paddle
    const ballVelocity = new THREE.Vector3(ballPos[0] - position.x, 0, ballPos[2] - position.z)

    // Predict where ball will be when it reaches AI side
    if (ballPos[2] < 0 && ballVelocity.z < 0) {
      const timeToReach = Math.abs((position.z - ballPos[2]) / ballVelocity.z)
      const predictedX = ballPos[0] + ballVelocity.x * timeToReach

      targetPosition.current.x = THREE.MathUtils.clamp(predictedX, -3.5, 3.5)
    } else {
      // Return to center when ball is not coming
      targetPosition.current.x = THREE.MathUtils.lerp(targetPosition.current.x, 0, 0.02)
    }

    // Smooth movement towards target
    const currentPos = new THREE.Vector3(position.x, position.y, position.z)
    const newPos = currentPos.lerp(targetPosition.current, 0.1)

    // Add some difficulty-based variation
    const difficulty = state.gameSettings.difficulty
    let speed = 0.1
    let accuracy = 1

    switch (difficulty) {
      case "easy":
        speed = 0.06
        accuracy = 0.7
        break
      case "medium":
        speed = 0.08
        accuracy = 0.85
        break
      case "hard":
        speed = 0.12
        accuracy = 0.95
        break
    }

    // Add some randomness based on difficulty
    if (Math.random() > accuracy) {
      newPos.x += (Math.random() - 0.5) * 0.5
    }

    // Constrain to AI side
    newPos.x = Math.max(-3.5, Math.min(3.5, newPos.x))
    newPos.z = Math.max(-5.5, Math.min(-2, newPos.z))

    paddleRef.current.setTranslation(newPos, true)

    // Update game state
    dispatch({
      type: "UPDATE_AI_PADDLE",
      position: [newPos.x, newPos.y, newPos.z],
    })
  })

  return (
    <RigidBody ref={paddleRef} type="kinematicPosition" colliders="cuboid" restitution={1.2} friction={0.8}>
      <group>
        {/* Paddle Surface */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.02, 0.8]} />
          <meshStandardMaterial color="#0066cc" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Paddle Handle */}
        <mesh position={[0, -0.1, -0.5]} castShadow>
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
