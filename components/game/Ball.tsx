"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"

export default function Ball() {
  const ballRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const [isServing, setIsServing] = useState(true)

  useEffect(() => {
    if (ballRef.current && isServing) {
      // Reset ball position for serve
      ballRef.current.setTranslation({ x: 0, y: 2, z: state.currentServer === "player" ? 4 : -4 }, true)
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      setIsServing(false)
    }
  }, [state.currentServer, isServing])

  useFrame(() => {
    if (!ballRef.current) return

    const position = ballRef.current.translation()
    const velocity = ballRef.current.linvel()

    // Update ball position in game state
    dispatch({
      type: "UPDATE_BALL_POSITION",
      position: [position.x, position.y, position.z],
    })

    // Check for scoring
    if (position.z > 6) {
      // AI scores
      dispatch({ type: "SCORE_POINT", player: "ai" })
      setIsServing(true)
    } else if (position.z < -6) {
      // Player scores
      dispatch({ type: "SCORE_POINT", player: "player" })
      setIsServing(true)
    }

    // Ball out of bounds (sides)
    if (Math.abs(position.x) > 5 || position.y < -1) {
      // Reset ball
      setIsServing(true)
    }

    // Add subtle spin effect when ball is moving
    if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1) {
      const spinForce = {
        x: Math.sin(Date.now() * 0.001) * 0.02,
        y: 0,
        z: Math.cos(Date.now() * 0.001) * 0.02,
      }
      ballRef.current.addForce(spinForce, true)
    }
  })

  const handleServe = () => {
    if (!ballRef.current || !isServing) return

    const serveDirection = state.currentServer === "player" ? -1 : 1
    const serveVelocity = {
      x: (Math.random() - 0.5) * 2,
      y: 3,
      z: serveDirection * 8,
    }

    ballRef.current.setLinvel(serveVelocity, true)
    setIsServing(false)
  }

  // Auto-serve for AI or handle player serve
  useEffect(() => {
    if (isServing && state.currentServer === "ai") {
      setTimeout(handleServe, 1000)
    }
  }, [isServing, state.currentServer])

  // Handle player serve with spacebar
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && isServing && state.currentServer === "player") {
        event.preventDefault()
        handleServe()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isServing, state.currentServer])

  return (
    <RigidBody
      ref={ballRef}
      colliders="ball"
      restitution={0.8}
      friction={0.3}
      mass={0.0027} // Actual ping pong ball mass in kg
      linearDamping={0.1}
      angularDamping={0.1}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </RigidBody>
  )
}
