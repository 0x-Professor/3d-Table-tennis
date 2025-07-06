"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Settings, Trophy, Info } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">3D Table Tennis</h1>
          <p className="text-xl text-blue-100 mb-8">Experience realistic physics and stunning 3D graphics</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Quick Match
              </CardTitle>
              <CardDescription className="text-blue-100">
                Jump straight into a game against our AI opponent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/game">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Start Game</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </CardTitle>
              <CardDescription className="text-blue-100">
                Customize controls, graphics, and audio settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/settings">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Configure
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Leaderboard
              </CardTitle>
              <CardDescription className="text-blue-100">View your best scores and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/leaderboard">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  View Scores
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                How to Play
              </CardTitle>
              <CardDescription className="text-blue-100">Learn the controls and game mechanics</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tutorial">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Tutorial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-200 text-sm">Use WASD or Arrow Keys to move • Mouse to aim • Space to serve</p>
        </div>
      </div>
    </div>
  )
}
