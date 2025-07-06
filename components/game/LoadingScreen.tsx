"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center">
      <Card className="bg-black/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Loading Game...</h2>
          <p className="text-sm opacity-75">Preparing the table tennis experience</p>
        </CardContent>
      </Card>
    </div>
  )
}
