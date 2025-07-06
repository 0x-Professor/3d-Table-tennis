"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Medal, Award, Star } from "lucide-react"

export default function LeaderboardPage() {
  // Mock data - in a real app, this would come from a database
  const leaderboardData = [{ rank: 1, name: "Player", score: 0, wins: 0, losses: 0, winRate: 0 }]

  const achievements = [
    { name: "First Win", description: "Win your first match", unlocked: false, icon: Trophy },
    { name: "Streak Master", description: "Win 5 matches in a row", unlocked: false, icon: Medal },
    { name: "Perfect Game", description: "Win 11-0", unlocked: false, icon: Award },
    { name: "Comeback King", description: "Win after being 0-5 down", unlocked: false, icon: Star },
  ]

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
          <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Top Players
              </CardTitle>
              <CardDescription className="text-blue-100">Best performing players</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm opacity-75">
                          {player.wins}W - {player.losses}L
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{player.score}</div>
                      <div className="text-sm opacity-75">{player.winRate}% WR</div>
                    </div>
                  </div>
                ))}
                {leaderboardData.length === 1 && (
                  <div className="text-center py-8 opacity-50">
                    <p>Play some games to see more players!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
              <CardDescription className="text-blue-100">Unlock achievements by playing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded ${
                        achievement.unlocked ? "bg-green-500/20" : "bg-white/5 opacity-50"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">{achievement.name}</div>
                        <div className="text-sm opacity-75">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && <div className="ml-auto text-green-400">✓</div>}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/game">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">Play Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
