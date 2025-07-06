"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"

export default function StylizedBall() {
  const ballRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()

  useEffect(() => {
    if (ballRef.current && state.isServing) {
      const serveZ = state.currentServer === "player" ? 1.2 : -1.2
      ballRef.current.setTranslation({ x: 0, y: 1, z: serveZ }, true)
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
      if (position.z > 2.2) {
        dispatch({ type: "SCORE_POINT", player: "ai" })
      } else if (position.z < -2.2) {
        dispatch({ type: "SCORE_POINT", player: "player" })
      }

      if (Math.abs(position.x) > 3.5 || position.y < -0.5) {
        dispatch({ type: "SET_SERVING", serving: true })
      }

      if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1) {
        const airResistance = 0.995
        ballRef.current.setLinvel(
          {
            x: velocity.x * airResistance,
            y: velocity.y,
            z: velocity.z * airResistance,
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
      x: (Math.random() - 0.5) * 2,
      y: 2,
      z: serveDirection * 5,
    }

    ballRef.current.setLinvel(serveVelocity, true)
    dispatch({ type: "SERVE_BALL" })
  }

  useEffect(() => {
    if (state.isServing && state.currentServer === "ai") {
      const timer = setTimeout(handleServe, 1500)
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
      linearDamping={0.1}
      angularDamping={0.1}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshLambertMaterial color="#ffffff" />
      </mesh>
    </RigidBody>
  )
}
