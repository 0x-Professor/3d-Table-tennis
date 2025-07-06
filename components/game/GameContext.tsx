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

const initialState: GameState = {
  playerScore: 0,
  aiScore: 0,
  gameStatus: "menu",
  currentServer: "player",
  ballPosition: [0, 2, 0],
  playerPaddlePosition: [0, 1, 6],
  aiPaddlePosition: [0, 1, -6],
  gameSettings: {
    difficulty: "medium",
    soundEnabled: true,
    maxScore: 11,
  },
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SCORE_POINT":
      const newPlayerScore = action.player === "player" ? state.playerScore + 1 : state.playerScore
      const newAiScore = action.player === "ai" ? state.aiScore + 1 : state.aiScore
      const gameOver = newPlayerScore >= state.gameSettings.maxScore || newAiScore >= state.gameSettings.maxScore

      return {
        ...state,
        playerScore: newPlayerScore,
        aiScore: newAiScore,
        gameStatus: gameOver ? "gameOver" : "playing",
        currentServer: action.player === "player" ? "ai" : "player",
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
