"use client"

import { useGame } from "./GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pause, Play, RotateCcw, Home, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

export default function GameUI() {
  const { state, dispatch } = useGame()

  const handlePause = () => {
    if (state.gameStatus === "playing") {
      dispatch({ type: "PAUSE_GAME" })
    } else if (state.gameStatus === "paused") {
      dispatch({ type: "RESUME_GAME" })
    }
  }

  const handleReset = () => {
    dispatch({ type: "RESET_GAME" })
  }

  const toggleSound = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      settings: { soundEnabled: !state.gameSettings.soundEnabled },
    })
  }

  return (
    <>
      {/* Score Display */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-black/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-8 text-white">
              <div className="text-center">
                <div className="text-sm opacity-75">Player</div>
                <div className="text-3xl font-bold">{state.playerScore}</div>
              </div>
              <div className="text-2xl opacity-50">-</div>
              <div className="text-center">
                <div className="text-sm opacity-75">AI</div>
                <div className="text-3xl font-bold">{state.aiScore}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Game Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          onClick={toggleSound}
          variant="outline"
          size="icon"
          className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
        >
          {state.gameSettings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>

        <Button
          onClick={handlePause}
          variant="outline"
          size="icon"
          className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
        >
          {state.gameStatus === "playing" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          size="icon"
          className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
          >
            <Home className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Game Status Messages */}
      {state.gameStatus === "paused" && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <Card className="bg-black/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
              <Button onClick={handlePause} className="bg-green-600 hover:bg-green-700">
                Resume Game
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {state.gameStatus === "gameOver" && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <Card className="bg-black/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{state.playerScore > state.aiScore ? "You Win!" : "AI Wins!"}</h2>
              <p className="text-lg mb-6">
                Final Score: {state.playerScore} - {state.aiScore}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleReset} className="bg-green-600 hover:bg-green-700">
                  Play Again
                </Button>
                <Link href="/">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Main Menu
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls Help */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-black/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-3 text-white text-sm">
            <div className="space-y-1">
              <div>
                <strong>WASD</strong> or <strong>Arrow Keys</strong> - Move paddle
              </div>
              <div>
                <strong>Space</strong> - Serve ball
              </div>
              <div>
                <strong>Mouse</strong> - Camera control
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Indicator */}
      {state.gameStatus === "playing" && (
        <div className="absolute bottom-4 right-4 z-10">
          <Card className="bg-black/50 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-white text-center">
              <div className="text-sm opacity-75">Serving</div>
              <div className="font-bold">{state.currentServer === "player" ? "Your Turn" : "AI Turn"}</div>
              {state.currentServer === "player" && <div className="text-xs mt-1 opacity-75">Press SPACE to serve</div>}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
