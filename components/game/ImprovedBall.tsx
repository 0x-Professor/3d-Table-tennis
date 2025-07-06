"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"
import * as THREE from "three"

export default function ImprovedBall() {
  const ballRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const lastHitTime = useRef(0)

  useEffect(() => {
    if (ballRef.current && state.isServing) {
      const serveZ = state.currentServer === "player" ? 1.0 : -1.0
      ballRef.current.setTranslation({ x: 0, y: 0.5, z: serveZ }, true)
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
    }
  }, [state.isServing, state.currentServer])

  useFrame(() => {
    if (!ballRef.current) return

    const position = ballRef.current.translation()
    const velocity = ballRef.current.linvel()

    dispatch({
      type: "UPDATE_BALL_POSITION",
      position: [position.x, position.y, position.z],
    })

    if (!state.isServing && state.gameStatus === "playing") {
      // Check collision with player paddle
      const playerPaddle = state.playerPaddlePosition
      const playerDistance = Math.sqrt(
        Math.pow(position.x - playerPaddle[0], 2) +
          Math.pow(position.y - playerPaddle[1], 2) +
          Math.pow(position.z - playerPaddle[2], 2),
      )

      if (playerDistance < 0.25 && Date.now() - lastHitTime.current > 200) {
        // Player hit the ball
        const hitDirection = new THREE.Vector3(
          position.x - playerPaddle[0],
          0.5, // Always add some upward velocity
          -Math.abs(velocity.z) - 3, // Send toward AI side
        )

        // Add some randomness and power based on paddle position
        hitDirection.x += (Math.random() - 0.5) * 1
        hitDirection.normalize()
        hitDirection.multiplyScalar(6)

        ballRef.current.setLinvel(hitDirection, true)

        // Add spin
        ballRef.current.setAngvel(
          {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 5,
            z: -5,
          },
          true,
        )

        lastHitTime.current = Date.now()
        dispatch({ type: "INCREMENT_RALLY" })
      }

      // Check collision with AI paddle
      const aiPaddle = state.aiPaddlePosition
      const aiDistance = Math.sqrt(
        Math.pow(position.x - aiPaddle[0], 2) +
          Math.pow(position.y - aiPaddle[1], 2) +
          Math.pow(position.z - aiPaddle[2], 2),
      )

      if (aiDistance < 0.25 && Date.now() - lastHitTime.current > 200) {
        // AI hit the ball
        const hitDirection = new THREE.Vector3(
          position.x - aiPaddle[0],
          0.5,
          Math.abs(velocity.z) + 3, // Send toward player side
        )

        // AI accuracy based on difficulty
        const accuracy =
          state.gameSettings.difficulty === "easy" ? 0.6 : state.gameSettings.difficulty === "medium" ? 0.8 : 0.95

        if (Math.random() > accuracy) {
          hitDirection.x += (Math.random() - 0.5) * 2
        }

        hitDirection.normalize()
        hitDirection.multiplyScalar(5.5)

        ballRef.current.setLinvel(hitDirection, true)

        ballRef.current.setAngvel(
          {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 4,
            z: 5,
          },
          true,
        )

        lastHitTime.current = Date.now()
        dispatch({ type: "INCREMENT_RALLY" })
      }

      // Check for scoring
      if (position.z > 1.8) {
        dispatch({ type: "SCORE_POINT", player: "ai" })
      } else if (position.z < -1.8) {
        dispatch({ type: "SCORE_POINT", player: "player" })
      }

      // Ball out of bounds
      if (Math.abs(position.x) > 3 || position.y < -1) {
        dispatch({ type: "SET_SERVING", serving: true })
      }

      // Bounce off table
      if (position.y < 0.1 && position.y > 0.05 && Math.abs(position.x) < 2.75 && Math.abs(position.z) < 1.5) {
        if (velocity.y < 0) {
          ballRef.current.setLinvel(
            {
              x: velocity.x * 0.9,
              y: -velocity.y * 0.7,
              z: velocity.z * 0.9,
            },
            true,
          )
        }
      }

      // Air resistance
      if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1) {
        ballRef.current.setLinvel(
          {
            x: velocity.x * 0.999,
            y: velocity.y,
            z: velocity.z * 0.999,
          },
          true,
        )
      }
    }
  })

  const handleServe = () => {
    if (!ballRef.current || !state.isServing) return

    const serveDirection = state.currentServer === "player" ? -1 : 1
    const serveVelocity = {
      x: (Math.random() - 0.5) * 1.5,
      y: 1.5,
      z: serveDirection * 4,
    }

    ballRef.current.setLinvel(serveVelocity, true)
    dispatch({ type: "SERVE_BALL" })
  }

  useEffect(() => {
    if (state.isServing && state.currentServer === "ai") {
      const timer = setTimeout(handleServe, 1000)
      return () => clearTimeout(timer)
    }
  }, [state.isServing, state.currentServer])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (state.isServing && state.currentServer === "player") {
        if (event.code === "Space" || event.code === "Enter" || event.code === "KeyS") {
          event.preventDefault()
          handleServe()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [state.isServing, state.currentServer])

  return (
    <RigidBody
      ref={ballRef}
      colliders="ball"
      restitution={0.8}
      friction={0.3}
      mass={0.003}
      linearDamping={0.02}
      angularDamping={0.05}
      ccd={true}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshLambertMaterial color="#ffffff" />
      </mesh>
    </RigidBody>
  )
}
