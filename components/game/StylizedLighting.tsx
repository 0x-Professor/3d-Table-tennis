"use client"

export default function StylizedLighting() {
  return (
    <>
      {/* Bright ambient light for cartoon look */}
      <ambientLight intensity={0.8} color="#ffffff" />

      {/* Main directional light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />

      {/* Fill light to reduce harsh shadows */}
      <directionalLight position={[-5, 8, -5]} intensity={0.6} color="#ffffff" />
    </>
  )
}
