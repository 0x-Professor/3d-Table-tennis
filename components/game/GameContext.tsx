"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface GameState {
  playerScore: number
  aiScore: number
  gameStatus: "menu" | "playing" | "paused" | "gameOver"
  currentServer: "player" | "ai"
  ballPosition: [number, number, number]
  playerPaddlePosition: [number, number, number]
  aiPaddlePosition: [number, number, number]
  gameSettings: {
    difficulty: "easy" | "medium" | "hard"
    soundEnabled: boolean
    maxScore: number
  }
  lastPointWinner: "player" | "ai" | null
  gameStats: {
    rallies: number
    longestRally: number
    currentRally: number
  }
}

type GameAction =
  | { type: "SCORE_POINT"; player: "player" | "ai" }
  | { type: "START_GAME" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" }
  | { type: "RESET_GAME" }
  | { type: "UPDATE_BALL_POSITION"; position: [number, number, number] }
  | { type: "UPDATE_PLAYER_PADDLE"; position: [number, number, number] }
  | { type: "UPDATE_AI_PADDLE"; position: [number, number, number] }
  | { type: "CHANGE_SERVER"; server: "player" | "ai" }
  | { type: "UPDATE_SETTINGS"; settings: Partial<GameState["gameSettings"]> }
  | { type: "INCREMENT_RALLY" }
  | { type: "RESET_RALLY" }

const initialState: GameState = {
  playerScore: 0,
  aiScore: 0,
  gameStatus: "playing", // Auto-start the game
  currentServer: "player",
  ballPosition: [0, 2.5, 0],
  playerPaddlePosition: [0, 1.8, 1.6],
  aiPaddlePosition: [0, 1.8, -1.6],
  gameSettings: {
    difficulty: "medium",
    soundEnabled: true,
    maxScore: 11,
  },
  lastPointWinner: null,
  gameStats: {
    rallies: 0,
    longestRally: 0,
    currentRally: 0,
  },
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SCORE_POINT":
      const newPlayerScore = action.player === "player" ? state.playerScore + 1 : state.playerScore
      const newAiScore = action.player === "ai" ? state.aiScore + 1 : state.aiScore
      const gameOver = newPlayerScore >= state.gameSettings.maxScore || newAiScore >= state.gameSettings.maxScore

      // Determine next server (alternates every 2 points, or every point after 10-10)
      let nextServer: "player" | "ai"
      const totalPoints = newPlayerScore + newAiScore
      if (newPlayerScore >= 10 && newAiScore >= 10) {
        // Deuce - alternate every point
        nextServer = totalPoints % 2 === 0 ? "player" : "ai"
      } else {
        // Normal game - alternate every 2 points
        nextServer = Math.floor(totalPoints / 2) % 2 === 0 ? "player" : "ai"
      }

      return {
        ...state,
        playerScore: newPlayerScore,
        aiScore: newAiScore,
        gameStatus: gameOver ? "gameOver" : "playing",
        currentServer: nextServer,
        lastPointWinner: action.player,
        gameStats: {
          ...state.gameStats,
          rallies: state.gameStats.rallies + 1,
          longestRally: Math.max(state.gameStats.longestRally, state.gameStats.currentRally),
          currentRally: 0,
        },
      }

    case "START_GAME":
      return { ...state, gameStatus: "playing" }

    case "PAUSE_GAME":
      return { ...state, gameStatus: "paused" }

    case "RESUME_GAME":
      return { ...state, gameStatus: "playing" }

    case "RESET_GAME":
      return {
        ...initialState,
        gameSettings: state.gameSettings,
        gameStatus: "playing",
      }

    case "UPDATE_BALL_POSITION":
      return { ...state, ballPosition: action.position }

    case "UPDATE_PLAYER_PADDLE":
      return { ...state, playerPaddlePosition: action.position }

    case "UPDATE_AI_PADDLE":
      return { ...state, aiPaddlePosition: action.position }

    case "CHANGE_SERVER":
      return { ...state, currentServer: action.server }

    case "UPDATE_SETTINGS":
      return {
        ...state,
        gameSettings: { ...state.gameSettings, ...action.settings },
      }

    case "INCREMENT_RALLY":
      return {
        ...state,
        gameStats: {
          ...state.gameStats,
          currentRally: state.gameStats.currentRally + 1,
        },
      }

    case "RESET_RALLY":
      return {
        ...state,
        gameStats: {
          ...state.gameStats,
          currentRally: 0,
        },
      }

    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
