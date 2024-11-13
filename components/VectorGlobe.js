'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

// Helper function to convert lat/long to 3D coordinates
function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Simplified country coordinates (just for demonstration)
const countries = [
  // North America
  [
    [50, -125], [60, -95], [45, -75], [30, -85],
    [25, -100], [35, -120], [50, -125]
  ],
  // South America
  [
    [5, -80], [0, -50], [-20, -40], [-40, -65],
    [-30, -75], [-5, -80], [5, -80]
  ],
  // Europe
  [
    [45, -10], [60, 0], [55, 20], [45, 30],
    [40, 20], [35, 0], [45, -10]
  ],
  // Africa
  [
    [35, -10], [30, 30], [0, 40], [-30, 20],
    [-35, -10], [0, -10], [35, -10]
  ],
  // Asia
  [
    [55, 40], [60, 60], [55, 90], [45, 120],
    [30, 110], [25, 90], [35, 70], [30, 50],
    [45, 40], [55, 40]
  ],
  // Australia
  [
    [-20, 110], [-15, 130], [-25, 145], [-35, 140],
    [-35, 115], [-20, 110]
  ]
]

// Latitude lines
const latitudeLines = Array.from({ length: 19 }, (_, i) => {
  const lat = -90 + i * 10
  return Array.from({ length: 361 }, (_, j) => {
    const lon = -180 + j
    return latLongToVector3(lat, lon, 1)
  })
})

// Longitude lines
const longitudeLines = Array.from({ length: 37 }, (_, i) => {
  const lon = -180 + i * 10
  return Array.from({ length: 181 }, (_, j) => {
    const lat = -90 + j
    return latLongToVector3(lat, lon, 1)
  })
})

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

      {/* Grid lines */}
      {latitudeLines.map((points, i) => (
        <Line
          key={`lat-${i}`}
          points={points}
          color="#3182ce"
          lineWidth={0.3}
          transparent
          opacity={0.2}
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
        />
      ))}

      {/* Continents */}
      {countries.map((country, i) => {
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
    <div className="h-[600px] w-full">
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