'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

const countries = {
  uruguay: [
    [-30.1, -57.8], [-30.8, -57.8], [-31.4, -58.0], 
    [-31.9, -58.0], [-32.5, -58.1], [-33.1, -58.3],
    [-33.5, -58.4], [-34.0, -58.4], [-34.5, -58.3],
    [-34.9, -57.8], [-34.9, -57.3], [-34.7, -56.7],
    [-34.5, -56.2], [-34.2, -55.7], [-33.7, -55.2],
    [-33.2, -54.7], [-32.7, -54.3], [-32.2, -54.2],
    [-31.7, -54.1], [-31.2, -54.2], [-30.9, -54.6],
    [-30.5, -55.0], [-30.2, -55.5], [-30.1, -56.0],
    [-30.1, -56.5], [-30.1, -57.2], [-30.1, -57.8]
  ],
  otherCountries: [
    // South America
    [
      [12.4, -71.3], [4.0, -81.3], [-18.3, -70.3], 
      [-52.3, -69.1], [-55.9, -67.3], [-54.9, -64.3],
      [-34.9, -56.2], [-22.9, -43.2], [-5.2, -35.3],
      [11.7, -71.3], [12.4, -71.3]
    ],
    // Rest of the continents remain the same...
    [83.1, -75.0], [76.2, -120.0], [68.9, -166.5],
      [45.5, -124.7], [25.8, -97.5], [15.0, -83.9],
      [51.3, -64.0], [83.1, -75.0]
  ]
}

// Generate latitude lines (now with more detail for smoother curves)
const latitudeLines = Array.from({ length: 19 }, (_, i) => {
  const lat = -90 + i * 10
  return Array.from({ length: 721 }, (_, j) => { // Increased resolution
    const lon = -180 + j * 0.5 // Smaller increments for smoother curves
    return latLongToVector3(lat, lon, 1)
  })
})

// Generate longitude lines (now with more detail)
const longitudeLines = Array.from({ length: 37 }, (_, i) => {
  const lon = -180 + i * 10
  return Array.from({ length: 361 }, (_, j) => { // Increased resolution
    const lat = -90 + j * 0.5 // Smaller increments for smoother curves
    return latLongToVector3(lat, lon, 1)
  })
})

function UruguayFill() {
  // Create a shape from Uruguay coordinates
  const shape = new THREE.Shape()
  const points = countries.uruguay.map(([lat, lon]) => {
    const vector = latLongToVector3(lat, lon, 1.001) // Slightly larger radius to prevent z-fighting
    return new THREE.Vector2(vector.x, vector.z)
  })
  
  shape.moveTo(points[0].x, points[0].y)
  points.forEach((point) => shape.lineTo(point.x, point.y))
  shape.closePath()

  return (
    <mesh rotation-y={Math.PI * 0.5}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial 
        color="#2563eb"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Globe() {
  const globeRef = useRef()

  useFrame(({ clock }) => {
    globeRef.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={globeRef}>
      {/* Base sphere */}
      <mesh>
        <sphereGeometry args={[0.99, 64, 64]} />
        <meshBasicMaterial color="#1a365d" transparent opacity={0.1} />
      </mesh>

      {/* Grid lines with material that ignores depth testing */}
      {latitudeLines.map((points, i) => (
        <Line
          key={`lat-${i}`}
          points={points}
          color="#3182ce"
          lineWidth={0.3}
          transparent
          opacity={0.2}
          depthTest={false} // This makes lines visible through the sphere
        />
      ))}
      {longitudeLines.map((points, i) => (
        <Line
          key={`lon-${i}`}
          points={points}
          color="#3182ce"
          lineWidth={0.3}
          transparent
          opacity={0.2}
          depthTest={false} // This makes lines visible through the sphere
        />
      ))}

      {/* Other countries */}
      {countries.otherCountries.map((country, i) => {
        const points = country.map(([lat, lon]) => latLongToVector3(lat, lon, 1))
        return (
          <Line
            key={`country-${i}`}
            points={points}
            color="#3182ce"
            lineWidth={1.5}
          />
        )
      })}

      {/* Uruguay outline and fill */}
      <UruguayFill />
      {(() => {
        const points = countries.uruguay.map(([lat, lon]) => 
          latLongToVector3(lat, lon, 1.002) // Slightly larger radius to appear above the fill
        )
        return (
          <Line
            points={points}
            color="#2563eb"
            lineWidth={2.5}
          />
        )
      })()}

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshBasicMaterial color="#63b3ed" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function VectorGlobe() {
  return (
    <div className="h-[500px] w-[500px]">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <Globe />
        <OrbitControls 
          enableZoom={true}
          minDistance={1.5}
          maxDistance={4}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}