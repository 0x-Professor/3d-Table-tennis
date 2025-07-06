"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGame } from "./GameContext"
import * as THREE from "three"
import gsap from "gsap"

export default function CameraController() {
  const { camera } = useThree()
  const { state } = useGame()
  const previousGameStatus = useRef(state.gameStatus)
  const ballPosition = state.ballPosition

  useFrame(() => {
    // Subtle camera follow for ball tracking
    if (state.gameStatus === "playing") {
      const targetX = ballPosition[0] * 0.1
      const targetY = 12 + ballPosition[1] * 0.2
      const targetZ = 15 + ballPosition[2] * 0.1

      camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.02)
      camera.lookAt(ballPosition[0], ballPosition[1] + 0.5, ballPosition[2])
    }
  })

  // Cinematic transitions
  useEffect(() => {
    if (state.gameStatus !== previousGameStatus.current) {
      switch (state.gameStatus) {
        case "playing":
          gsap.to(camera.position, {
            duration: 2,
            x: 0,
            y: 12,
            z: 15,
            ease: "power2.out",
          })
          break
        case "gameOver":
          // Dramatic overhead shot
          gsap.to(camera.position, {
            duration: 3,
            x: 0,
            y: 20,
            z: 0,
            ease: "power2.inOut",
          })
          gsap.to(camera.rotation, {
            duration: 3,
            x: -Math.PI / 2,
            y: 0,
            z: 0,
            ease: "power2.inOut",
          })
          break
      }
      previousGameStatus.current = state.gameStatus
    }
  }, [state.gameStatus, camera])

  return null
}
