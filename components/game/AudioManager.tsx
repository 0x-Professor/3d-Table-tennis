"use client"

import { useEffect, useRef } from "react"
import { useGame } from "./GameContext"

export default function AudioManager() {
  const { state } = useGame()
  const audioContext = useRef<AudioContext | null>(null)
  const previousScore = useRef({ player: 0, ai: 0 })

  useEffect(() => {
    if (typeof window !== "undefined" && state.gameSettings.soundEnabled) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [state.gameSettings.soundEnabled])

  // Play sound effects
  const playSound = (frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (!audioContext.current || !state.gameSettings.soundEnabled) return

    const oscillator = audioContext.current.createOscillator()
    const gainNode = audioContext.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration)

    oscillator.start(audioContext.current.currentTime)
    oscillator.stop(audioContext.current.currentTime + duration)
  }

  // Sound effects for scoring
  useEffect(() => {
    if (state.playerScore > previousScore.current.player) {
      // Player scores - positive sound
      playSound(800, 0.3, "square")
      setTimeout(() => playSound(1000, 0.2, "square"), 100)
    } else if (state.aiScore > previousScore.current.ai) {
      // AI scores - neutral sound
      playSound(400, 0.3, "triangle")
    }

    previousScore.current = { player: state.playerScore, ai: state.aiScore }
  }, [state.playerScore, state.aiScore])

  // Game over sound
  useEffect(() => {
    if (state.gameStatus === "gameOver") {
      if (state.playerScore > state.aiScore) {
        // Victory sound
        playSound(523, 0.2, "square") // C
        setTimeout(() => playSound(659, 0.2, "square"), 200) // E
        setTimeout(() => playSound(784, 0.4, "square"), 400) // G
      } else {
        // Defeat sound
        playSound(300, 0.5, "sawtooth")
      }
    }
  }, [state.gameStatus])

  return null
}
