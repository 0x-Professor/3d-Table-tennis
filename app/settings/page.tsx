"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Settings, Volume2, Gamepad2, Trophy } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [difficulty, setDifficulty] = useState("medium")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [maxScore, setMaxScore] = useState("11")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button
              variant="outline"
              size="icon"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white">Settings</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Game Settings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                Game Settings
              </CardTitle>
              <CardDescription className="text-blue-100">Customize your gameplay experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">AI Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy - Relaxed gameplay</SelectItem>
                    <SelectItem value="medium">Medium - Balanced challenge</SelectItem>
                    <SelectItem value="hard">Hard - Expert level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxScore">Match Length</Label>
                <Select value={maxScore} onValueChange={setMaxScore}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">First to 5 points</SelectItem>
                    <SelectItem value="11">First to 11 points</SelectItem>
                    <SelectItem value="21">First to 21 points</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio Settings
              </CardTitle>
              <CardDescription className="text-blue-100">Configure sound and music preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-effects">Sound Effects</Label>
                <Switch id="sound-effects" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Controls
              </CardTitle>
              <CardDescription className="text-blue-100">Keyboard and mouse controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Movement:</strong>
                  <div>WASD or Arrow Keys</div>
                </div>
                <div>
                  <strong>Serve:</strong>
                  <div>Spacebar</div>
                </div>
                <div>
                  <strong>Camera:</strong>
                  <div>Mouse drag</div>
                </div>
                <div>
                  <strong>Zoom:</strong>
                  <div>Mouse wheel</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Statistics
              </CardTitle>
              <CardDescription className="text-blue-100">Your gameplay statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="opacity-75">Games Won</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="opacity-75">Games Lost</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="opacity-75">Best Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="opacity-75">Total Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/game">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">Start Game</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
