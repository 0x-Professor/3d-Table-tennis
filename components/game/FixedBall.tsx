"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"

export default function FixedBall() {
  const ballRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()

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

      // Air resistance
      if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1) {
        ballRef.current.setLinvel(
          {
            x: velocity.x * 0.998,
            y: velocity.y,
            z: velocity.z * 0.998,
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
      linearDamping={0.05}
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
