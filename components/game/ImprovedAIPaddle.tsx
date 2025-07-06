"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function ImprovedAIPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const targetPosition = useRef(new THREE.Vector3(0, 0.2, -1.2))
  const reactionTime = useRef(0)
  const previousPosition = useRef({ x: 0, z: -1.2 })

  useFrame((frameState, delta) => {
    if (!paddleRef.current) return

    const position = paddleRef.current.translation()
    const ballPos = state.ballPosition
    const ballVel = ballPos[2] - position.z

    const difficulty = state.gameSettings.difficulty
    let speed = 0.12
    let accuracy = 0.85
    let reactionDelay = 0.15

    switch (difficulty) {
      case "easy":
        speed = 0.08
        accuracy = 0.65
        reactionDelay = 0.3
        break
      case "medium":
        speed = 0.12
        accuracy = 0.85
        reactionDelay = 0.15
        break
      case "hard":
        speed = 0.18
        accuracy = 0.95
        reactionDelay = 0.05
        break
    }

    reactionTime.current += delta

    // AI Logic - only react when ball is coming towards AI and close enough
    if (ballPos[2] < 0 && ballPos[2] > -2 && ballVel < 0 && reactionTime.current > reactionDelay) {
      // Predict where ball will be
      const timeToReach = Math.abs(position.z - ballPos[2]) / Math.max(Math.abs(ballVel), 1)
      const predictedX = ballPos[0] + (ballPos[0] - position.x) * timeToReach * 0.2

      targetPosition.current.x = THREE.MathUtils.clamp(predictedX, -2.5, 2.5)

      // Add inaccuracy based on difficulty
      if (Math.random() > accuracy) {
        targetPosition.current.x += (Math.random() - 0.5) * 0.8
      }

      reactionTime.current = 0
    } else if (ballPos[2] > 0) {
      // Return to center when ball is on player side
      targetPosition.current.x = THREE.MathUtils.lerp(targetPosition.current.x, 0, 0.03)
    }

    const currentPos = new THREE.Vector3(position.x, position.y, position.z)
    const newPos = currentPos.lerp(targetPosition.current, speed)

    newPos.x = Math.max(-2.5, Math.min(2.5, newPos.x))
    newPos.z = Math.max(-1.4, Math.min(-0.3, newPos.z))

    paddleRef.current.setTranslation(newPos, true)

    previousPosition.current = { x: newPos.x, z: newPos.z }

    dispatch({
      type: "UPDATE_AI_PADDLE",
      position: [newPos.x, newPos.y, newPos.z],
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
        {/* Paddle Surface - Red with better collision */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.03]} />
          <meshLambertMaterial color="#FF3333" />
        </mesh>

        {/* Paddle Handle */}
        <mesh position={[0, -0.03, -0.25]}>
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
