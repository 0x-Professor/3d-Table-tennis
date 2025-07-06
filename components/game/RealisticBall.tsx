"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { useGame } from "./GameContext"

export default function RealisticBall() {
  const ballRef = useRef<RapierRigidBody>(null)
  const { state, dispatch } = useGame()
  const [isServing, setIsServing] = useState(true)

  useEffect(() => {
    if (ballRef.current && isServing) {
      // Reset ball position for serve - adjusted for larger table
      const serveZ = state.currentServer === "player" ? 1.2 : -1.2
      ballRef.current.setTranslation({ x: 0, y: 2.5, z: serveZ }, true)
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
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

    // Check for scoring - adjusted for larger table
    if (position.z > 2.5) {
      // AI scores
      dispatch({ type: "SCORE_POINT", player: "ai" })
      setIsServing(true)
    } else if (position.z < -2.5) {
      // Player scores
      dispatch({ type: "SCORE_POINT", player: "player" })
      setIsServing(true)
    }

    // Ball out of bounds (sides or too low) - adjusted for larger table
    if (Math.abs(position.x) > 3.5 || position.y < 1.0) {
      setIsServing(true)
    }

    // Add realistic air resistance
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

    // Spin decay
    const angularVel = ballRef.current.angvel()
    ballRef.current.setAngvel(
      {
        x: angularVel.x * 0.998,
        y: angularVel.y * 0.998,
        z: angularVel.z * 0.998,
      },
      true,
    )
  })

  const handleServe = () => {
    if (!ballRef.current || !isServing) return

    const serveDirection = state.currentServer === "player" ? -1 : 1
    const serveVelocity = {
      x: (Math.random() - 0.5) * 2.5,
      y: 4.0,
      z: serveDirection * 6,
    }

    // Add spin to serve
    const spin = {
      x: (Math.random() - 0.5) * 15,
      y: (Math.random() - 0.5) * 8,
      z: serveDirection * 12,
    }

    ballRef.current.setLinvel(serveVelocity, true)
    ballRef.current.setAngvel(spin, true)
    setIsServing(false)
  }

  // Auto-serve for AI
  useEffect(() => {
    if (isServing && state.currentServer === "ai") {
      setTimeout(handleServe, 1500)
    }
  }, [isServing, state.currentServer])

  // Handle player serve
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
      restitution={0.85}
      friction={0.4}
      mass={0.0027} // Official ping pong ball mass
      linearDamping={0.05}
      angularDamping={0.1}
      ccd={true} // Continuous collision detection for fast moving ball
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          emissive="#ffffff"
          emissiveIntensity={0.02}
        />
      </mesh>
    </RigidBody>
  )
}
