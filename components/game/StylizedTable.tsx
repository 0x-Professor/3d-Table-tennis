"use client"

import { RigidBody } from "@react-three/rapier"

export default function StylizedTable() {
  const tableWidth = 6
  const tableDepth = 3.5
  const tableHeight = 0.1
  const netHeight = 0.4

  return (
    <group>
      {/* Table Surface - Bright Green */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.9} friction={0.4}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[tableWidth, tableHeight, tableDepth]} />
          <meshLambertMaterial color="#00CC66" />
        </mesh>
      </RigidBody>

      {/* Table Border - White */}
      <mesh position={[0, 0.01, 0]}>
        <ringGeometry args={[tableWidth / 2 - 0.05, tableWidth / 2, 0, Math.PI * 2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* White Table Lines */}
      {/* Center Line */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Side Lines */}
      <mesh position={[-tableWidth / 2, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[tableWidth / 2, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* End Lines */}
      <mesh position={[0, 0.02, -tableDepth / 2]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.05, tableWidth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.02, tableDepth / 2]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.05, tableWidth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Net - White Grid Pattern */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.1} friction={0.9}>
        <mesh position={[0, netHeight / 2, 0]}>
          <boxGeometry args={[tableWidth + 0.2, netHeight, 0.02]} />
          <meshLambertMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      </RigidBody>

      {/* Net Posts */}
      <mesh position={[-tableWidth / 2 - 0.1, netHeight / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, netHeight]} />
        <meshLambertMaterial color="#cccccc" />
      </mesh>
      <mesh position={[tableWidth / 2 + 0.1, netHeight / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, netHeight]} />
        <meshLambertMaterial color="#cccccc" />
      </mesh>

      {/* Grid Pattern on Net */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={`vertical-${i}`} position={[-tableWidth / 2 + (i * tableWidth) / 19, netHeight / 2, 0.01]}>
          <planeGeometry args={[0.01, netHeight]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`horizontal-${i}`} position={[0, (i * netHeight) / 7, 0.01]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.01, tableWidth]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}
