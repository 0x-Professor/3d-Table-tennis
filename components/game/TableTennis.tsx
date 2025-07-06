"use client"

import { RigidBody } from "@react-three/rapier"

export default function TableTennis() {
  // Standard table tennis dimensions (scaled down)
  const tableWidth = 8 // 2.74m scaled
  const tableDepth = 4.5 // 1.525m scaled
  const tableHeight = 0.76 // 0.76m actual height
  const netHeight = 0.6

  return (
    <group>
      {/* Table Surface */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, tableHeight, 0]} receiveShadow castShadow>
          <boxGeometry args={[tableWidth, 0.1, tableDepth]} />
          <meshStandardMaterial color="#0f4c3a" roughness={0.3} metalness={0.1} />
        </mesh>
      </RigidBody>

      {/* Table Legs */}
      {[
        [-tableWidth / 2 + 0.2, tableHeight / 2, -tableDepth / 2 + 0.2],
        [tableWidth / 2 - 0.2, tableHeight / 2, -tableDepth / 2 + 0.2],
        [-tableWidth / 2 + 0.2, tableHeight / 2, tableDepth / 2 - 0.2],
        [tableWidth / 2 - 0.2, tableHeight / 2, tableDepth / 2 - 0.2],
      ].map((position, index) => (
        <RigidBody key={index} type="fixed" colliders="cuboid">
          <mesh position={position as [number, number, number]} castShadow>
            <boxGeometry args={[0.1, tableHeight, 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </RigidBody>
      ))}

      {/* Net */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, tableHeight + netHeight / 2, 0]} castShadow>
          <boxGeometry args={[tableWidth, netHeight, 0.05]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Net Posts */}
      {[-tableWidth / 2 - 0.5, tableWidth / 2 + 0.5].map((x, index) => (
        <RigidBody key={index} type="fixed" colliders="cuboid">
          <mesh position={[x, tableHeight + netHeight / 2, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, netHeight]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </RigidBody>
      ))}

      {/* Table Lines */}
      <mesh position={[0, tableHeight + 0.01, 0]}>
        <planeGeometry args={[tableWidth, tableDepth]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      {/* Center Line */}
      <mesh position={[0, tableHeight + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.02, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Side Lines */}
      {[-tableWidth / 2, tableWidth / 2].map((x, index) => (
        <mesh key={index} position={[x, tableHeight + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, tableDepth]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* End Lines */}
      {[-tableDepth / 2, tableDepth / 2].map((z, index) => (
        <mesh key={index} position={[0, tableHeight + 0.02, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, tableWidth]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}
