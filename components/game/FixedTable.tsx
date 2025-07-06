"use client"

import { RigidBody } from "@react-three/rapier"

export default function FixedTable() {
  const tableWidth = 5.5
  const tableDepth = 3
  const tableHeight = 0.05
  const netHeight = 0.3

  return (
    <group>
      {/* Table Surface - Bright Green */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.9} friction={0.4}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[tableWidth, tableHeight, tableDepth]} />
          <meshLambertMaterial color="#00CC66" />
        </mesh>
      </RigidBody>

      {/* White Table Border */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[tableWidth / 2 - 0.05, tableWidth / 2, 0, Math.PI * 2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* White Table Lines */}
      {/* Center Line */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Side Lines */}
      <mesh position={[-tableWidth / 2, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[tableWidth / 2, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* End Lines */}
      <mesh position={[0, 0.03, -tableDepth / 2]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.04, tableWidth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.03, tableDepth / 2]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.04, tableWidth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Proper Net with Mesh Pattern */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.1} friction={0.9}>
        <mesh position={[0, netHeight / 2, 0]}>
          <boxGeometry args={[tableWidth + 0.4, netHeight, 0.01]} />
          <meshLambertMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </RigidBody>

      {/* Net Posts */}
      <mesh position={[-tableWidth / 2 - 0.2, netHeight / 2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, netHeight]} />
        <meshLambertMaterial color="#888888" />
      </mesh>
      <mesh position={[tableWidth / 2 + 0.2, netHeight / 2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, netHeight]} />
        <meshLambertMaterial color="#888888" />
      </mesh>

      {/* Net Mesh Pattern */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={`net-v-${i}`} position={[-tableWidth / 2 + (i * tableWidth) / 14, netHeight / 2, 0.005]}>
          <planeGeometry args={[0.005, netHeight]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={`net-h-${i}`} position={[0, (i * netHeight) / 5, 0.005]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.005, tableWidth]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}
