"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function StylizedAIPaddle() {
  const paddleRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const targetPosition = useRef(new THREE.Vector3(0, 0.3, -1.4))

  useFrame((frameState, delta) => {
    if (!paddleRef.current) return

    const position = paddleRef.current.translation()
    const ballPos = state.ballPosition

    const difficulty = state.gameSettings.difficulty
    let speed = 0.08
    let accuracy = 0.8

    switch (difficulty) {
      case "easy":
        speed = 0.05
        accuracy = 0.6
        break
      case "medium":
        speed = 0.08
        accuracy = 0.8
        break
      case "hard":
        speed = 0.12
        accuracy = 0.95
        break
    }

    if (ballPos[2] < 0) {
      const predictedX = ballPos[0] + (ballPos[0] - position.x) * 0.3
      targetPosition.current.x = THREE.MathUtils.clamp(predictedX, -2.5, 2.5)

      if (Math.random() > accuracy) {
        targetPosition.current.x += (Math.random() - 0.5) * 0.4
      }
    } else {
      targetPosition.current.x = THREE.MathUtils.lerp(targetPosition.current.x, 0, 0.02)
    }

    const currentPos = new THREE.Vector3(position.x, position.y, position.z)
    const newPos = currentPos.lerp(targetPosition.current, speed)

    newPos.x = Math.max(-2.5, Math.min(2.5, newPos.x))
    newPos.z = Math.max(-1.8, Math.min(-0.5, newPos.z))

    paddleRef.current.setTranslation(newPos, true)

    dispatch({
      type: "UPDATE_AI_PADDLE",
      position: [newPos.x, newPos.y, newPos.z],
    })
  })

  return (
    <RigidBody ref={paddleRef} type="kinematicPosition" colliders="cuboid" restitution={1.0} friction={0.6}>
      <group>
        {/* Paddle Surface - Red */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.02]} />
          <meshLambertMaterial color="#FF3333" />
        </mesh>

        {/* Paddle Handle - Wood Color */}
        <mesh position={[0, -0.05, -0.3]}>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <meshLambertMaterial color="#D2691E" />
        </mesh>
      </group>
    </RigidBody>
  )
}
