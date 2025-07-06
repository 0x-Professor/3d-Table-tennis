"use client"

export default function Lighting() {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* Main Spotlight */}
      <spotLight
        position={[0, 15, 0]}
        angle={Math.PI / 3}
        penumbra={0.5}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={50}
        color="#ffffff"
      />

      {/* Side Lights */}
      <spotLight position={[-8, 8, 0]} angle={Math.PI / 4} penumbra={0.3} intensity={0.8} castShadow color="#ffffff" />

      <spotLight position={[8, 8, 0]} angle={Math.PI / 4} penumbra={0.3} intensity={0.8} castShadow color="#ffffff" />

      {/* Rim Light */}
      <directionalLight position={[0, 5, -10]} intensity={0.5} color="#4a90e2" />
    </>
  )
}
