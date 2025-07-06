"use client"

import { useGame } from "./GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pause, Play, RotateCcw, Home, Volume2, VolumeX, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
      {/* Animated Score Display */}
      <motion.div
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="bg-black/20 backdrop-blur-md border-white/10 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-12 text-white">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-sm opacity-75 font-medium">Player</div>
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  key={state.playerScore}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {state.playerScore}
                </motion.div>
              </motion.div>

              <div className="text-3xl opacity-30 font-thin">:</div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-sm opacity-75 font-medium">AI</div>
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
                  key={state.aiScore}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {state.aiScore}
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Game Controls */}
      <motion.div
        className="absolute top-6 right-6 z-10 flex gap-3"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleSound}
            variant="outline"
            size="icon"
            className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10 shadow-lg"
          >
            {state.gameSettings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handlePause}
            variant="outline"
            size="icon"
            className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10 shadow-lg"
          >
            {state.gameStatus === "playing" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Button
              variant="outline"
              size="icon"
              className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10 shadow-lg"
            >
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Game Status Overlays */}
      <AnimatePresence>
        {state.gameStatus === "paused" && (
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-12 text-center text-white">
                  <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
                    <Pause className="w-16 h-16 mx-auto mb-6 text-blue-400" />
                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Game Paused
                    </h2>
                    <Button
                      onClick={handlePause}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg"
                    >
                      Resume Game
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {state.gameStatus === "gameOver" && (
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-12 text-center text-white">
                  <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
                    <Trophy
                      className={`w-20 h-20 mx-auto mb-6 ${state.playerScore > state.aiScore ? "text-yellow-400" : "text-gray-400"}`}
                    />
                    <h2
                      className={`text-4xl font-bold mb-4 ${
                        state.playerScore > state.aiScore
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
                      }`}
                    >
                      {state.playerScore > state.aiScore ? "Victory!" : "Defeat!"}
                    </h2>
                    <p className="text-xl mb-8 opacity-80">
                      Final Score: {state.playerScore} - {state.aiScore}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={handleReset}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg"
                      >
                        Play Again
                      </Button>
                      <Link href="/">
                        <Button
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-3 text-lg"
                        >
                          Main Menu
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Controls Help */}
      <motion.div
        className="absolute bottom-6 left-6 z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Card className="bg-black/20 backdrop-blur-md border-white/10 shadow-lg">
          <CardContent className="p-4 text-white text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>
                  <strong>WASD</strong> or <strong>Arrow Keys</strong> - Move paddle
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded flex items-center justify-center text-xs font-bold text-black">
                  ⎵
                </div>
                <span>
                  <strong>Space</strong> - Serve ball
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded flex items-center justify-center text-xs">🖱</div>
                <span>
                  <strong>Mouse</strong> - Camera control
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Server Indicator */}
      <AnimatePresence>
        {state.gameStatus === "playing" && (
          <motion.div
            className="absolute bottom-6 right-6 z-10"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <Card className="bg-black/20 backdrop-blur-md border-white/10 shadow-lg">
              <CardContent className="p-4 text-white text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-sm opacity-75 mb-1">Serving</div>
                  <div
                    className={`font-bold text-lg ${
                      state.currentServer === "player" ? "text-blue-400" : "text-red-400"
                    }`}
                  >
                    {state.currentServer === "player" ? "Your Turn" : "AI Turn"}
                  </div>
                  {state.currentServer === "player" && (
                    <motion.div
                      className="text-xs mt-2 opacity-75"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Press SPACE to serve
                    </motion.div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
