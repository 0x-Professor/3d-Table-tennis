"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function FixedAIPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const targetPosition = useRef(new THREE.Vector3(0, 0.2, -1.2))
  const reactionTime = useRef(0)

  useFrame((frameState, delta) => {
    if (!paddleRef.current) return

    const position = paddleRef.current.translation()
    const ballPos = state.ballPosition

    const difficulty = state.gameSettings.difficulty
    let speed = 0.1
    let accuracy = 0.8
    let reactionDelay = 0.2

    switch (difficulty) {
      case "easy":
        speed = 0.06
        accuracy = 0.6
        reactionDelay = 0.4
        break
      case "medium":
        speed = 0.1
        accuracy = 0.8
        reactionDelay = 0.2
        break
      case "hard":
        speed = 0.15
        accuracy = 0.95
        reactionDelay = 0.1
        break
    }

    reactionTime.current += delta

    // AI Logic - only react when ball is coming towards AI
    if (ballPos[2] < 0 && reactionTime.current > reactionDelay) {
      const ballVelocity = ballPos[2] - position.z
      if (ballVelocity < 0) {
        // Ball is moving towards AI
        const predictedX = ballPos[0] + (ballPos[0] - position.x) * 0.3
        targetPosition.current.x = THREE.MathUtils.clamp(predictedX, -2.5, 2.5)

        if (Math.random() > accuracy) {
          targetPosition.current.x += (Math.random() - 0.5) * 0.5
        }
        reactionTime.current = 0
      }
    } else if (ballPos[2] > 0) {
      // Return to center when ball is on player side
      targetPosition.current.x = THREE.MathUtils.lerp(targetPosition.current.x, 0, 0.02)
    }

    const currentPos = new THREE.Vector3(position.x, position.y, position.z)
    const newPos = currentPos.lerp(targetPosition.current, speed)

    newPos.x = Math.max(-2.5, Math.min(2.5, newPos.x))
    newPos.z = Math.max(-1.4, Math.min(-0.3, newPos.z))

    paddleRef.current.setTranslation(newPos, true)

    dispatch({
      type: "UPDATE_AI_PADDLE",
      position: [newPos.x, newPos.y, newPos.z],
    })
  })

  return (
    <RigidBody ref={paddleRef} type="kinematicPosition" colliders="cuboid" restitution={1.2} friction={0.6}>
      <group>
        {/* Paddle Surface - Red */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.02]} />
          <meshLambertMaterial color="#FF3333" />
        </mesh>

        {/* Paddle Handle */}
        <mesh position={[0, -0.03, -0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15]} />
          <meshLambertMaterial color="#D2691E" />
        </mesh>
      </group>
    </RigidBody>
  )
}
