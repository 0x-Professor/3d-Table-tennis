"use client"

import { RigidBody } from "@react-three/rapier"

export default function RealisticTable() {
  // Increased table dimensions for better visibility and realism
  const tableWidth = 5.5 // Increased from 2.74
  const tableDepth = 3.0 // Increased from 1.525
  const tableHeight = 1.5 // Increased from 0.76
  const netHeight = 0.3 // Increased from 0.1525

  return (
    <group>
      {/* Table Surface */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.9} friction={0.4}>
        <mesh position={[0, tableHeight, 0]} receiveShadow castShadow>
          <boxGeometry args={[tableWidth, 0.1, tableDepth]} />
          <meshPhysicalMaterial
            color="#0a5d3e"
            roughness={0.2}
            metalness={0.0}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </RigidBody>

      {/* Table Frame */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, tableHeight - 0.1, 0]} castShadow>
          <boxGeometry args={[tableWidth + 0.2, 0.15, tableDepth + 0.2]} />
          <meshPhysicalMaterial color="#2d2d2d" roughness={0.3} metalness={0.8} />
        </mesh>
      </RigidBody>

      {/* Table Legs */}
      {[
        [-tableWidth / 2 + 0.3, tableHeight / 2, -tableDepth / 2 + 0.3],
        [tableWidth / 2 - 0.3, tableHeight / 2, -tableDepth / 2 + 0.3],
        [-tableWidth / 2 + 0.3, tableHeight / 2, tableDepth / 2 - 0.3],
        [tableWidth / 2 - 0.3, tableHeight / 2, tableDepth / 2 - 0.3],
      ].map((position, index) => (
        <RigidBody key={index} type="fixed" colliders="cuboid">
          <mesh position={position as [number, number, number]} castShadow>
            <boxGeometry args={[0.15, tableHeight, 0.15]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.4} metalness={0.9} />
          </mesh>
        </RigidBody>
      ))}

      {/* Net */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.1} friction={0.9}>
        <mesh position={[0, tableHeight + netHeight / 2, 0]} castShadow>
          <boxGeometry args={[tableWidth + 0.6, netHeight, 0.02]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.9} roughness={0.9} transmission={0.2} />
        </mesh>
      </RigidBody>

      {/* Net Posts */}
      {[-tableWidth / 2 - 0.3, tableWidth / 2 + 0.3].map((x, index) => (
        <RigidBody key={index} type="fixed" colliders="cuboid">
          <mesh position={[x, tableHeight + netHeight / 2, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, netHeight]} />
            <meshPhysicalMaterial color="#333333" roughness={0.3} metalness={0.9} />
          </mesh>
        </RigidBody>
      ))}

      {/* Table Lines */}
      <mesh position={[0, tableHeight + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[tableWidth, tableDepth]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      {/* Center Line */}
      <mesh position={[0, tableHeight + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.02, tableDepth]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Side Lines */}
      {[-tableWidth / 2, tableWidth / 2].map((x, index) => (
        <mesh key={index} position={[x, tableHeight + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, tableDepth]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* End Lines */}
      {[-tableDepth / 2, tableDepth / 2].map((z, index) => (
        <mesh key={index} position={[0, tableHeight + 0.003, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, tableWidth]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}
