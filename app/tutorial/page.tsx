"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Gamepad2, Target, Zap, Trophy } from "lucide-react"

export default function TutorialPage() {
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
          <h1 className="text-4xl font-bold text-white">How to Play</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Controls */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                Basic Controls
              </CardTitle>
              <CardDescription className="text-blue-100">Master the fundamental controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                  <span>Move Paddle</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-sm">WASD / Arrow Keys</code>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                  <span>Serve Ball</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-sm">Spacebar</code>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                  <span>Camera Control</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-sm">Mouse Drag</code>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                  <span>Zoom</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-sm">Mouse Wheel</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Rules */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Game Rules
              </CardTitle>
              <CardDescription className="text-blue-100">Standard table tennis rules apply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  First player to reach 11 points wins
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  Must win by 2 points if tied at 10-10
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  Service alternates every 2 points
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  Ball must bounce once on each side
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  Point awarded if ball goes off table
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Strategy Tips */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Strategy Tips
              </CardTitle>
              <CardDescription className="text-blue-100">Improve your gameplay with these tips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Position yourself early to return shots
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Vary your shot placement to confuse AI
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Use the edges of the table for difficult returns
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Watch the ball's spin and trajectory
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Practice consistent serves for better control
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Advanced Techniques */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Advanced Techniques
              </CardTitle>
              <CardDescription className="text-blue-100">Master these for competitive play</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <strong>Spin Control:</strong> Ball physics include realistic spin effects
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <strong>Angle Shots:</strong> Use paddle positioning for angled returns
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <strong>Power Control:</strong> Movement speed affects shot power
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <strong>Defensive Play:</strong> Stay centered for better coverage
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/game">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">Start Playing</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
