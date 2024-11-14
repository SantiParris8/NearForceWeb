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
  [-30.9, -74.0], [-25.7, -74.5], [-23.1, -69.2], [-27.7, -68.5], [-31.6, -74.0]
],
  otherCountries: [
      // South America (shifted slightly west)
      // uruguay


// southAmerica
[
  [12.4, -91.3], [4.0, -101.3], [-18.3, -90.3], [-52.3, -89.1], [-55.9, -87.3], [-54.9, -84.3], [-34.9, -76.2], [-22.9, -63.2], [-5.2, -55.3], [11.7, -91.3], [12.4, -91.3]
],

// centralAmerica
[
  [12.4, -91.3], [13.5, -95.5], [14.2, -99.8], [15.0, -103.9]
],

// northAmerica
[
  [90.6, -106.7], [93.9, -112.3], [87.3, -128.3], [81.9, -143.0], [77.3, -161.0], [79.3, -181.0], [65.9, -183.7], [65.9, -175.7], [60.6, -167.0], [54.5, -153.7], [48.5, -144.7], [45.5, -144.7], [40.2, -144.1], [34.5, -140.5], [32.5, -137.1], [29.8, -134.8], [25.8, -117.5], [22.5, -110.2], [15.0, -103.9], [31.3, -104.3], [35.9, -96.3], [51.3, -88.3], [55.3, -81.0], [65.9, -79.0], [76.6, -87.0], [76.6, -96.7], [84.6, -98.7], [90.6, -105.3]
],

// europe
[
  [56.9, 42.2], [61.2, 57.8], [55.6, 70.6], [44.0, 72.2], [37.6, 65.8], [33.2, 57.4], [25.8, 54.6], [29.6, 41.6], [30.4, 32.4], [35.0, 26.0], [34.8, 21.2], [30.0, 15.2], [34.8, 12.8], [38.0, 16.0], [40.5, 18.4], [43.7, 17.0], [46.9, 17.0], [48.4, 24.0], [52.0, 30.4], [56.9, 42.2]
],

// africa
[
  [22.0, 14.6], [23.6, 60.6], [3.9, 73.8], [-6.9, 66.2], [-23.2, 65.0], [-40.0, 58.6], [-56.1, 38.2], [-38.9, 35.8], [-16.5, 26.2], [-10.1, 5.8], [11.5, 0.6], [20.8, 13.4]
],

// asia
[
  [60.0, 94.6], [61.6, 103.2], [57.2, 139.8], [44.0, 179.4], [34.0, 167.0], [30.4, 159.0], [28.4, 152.2], [22.4, 147.0], [9.9, 140.4], [0.6, 122.4], [-3.4, 103.1], [-6.7, 93.7], [5.3, 88.4], [10.6, 77.7], [34.4, 65.0], [43.2, 74.6], [56.0, 72.2], [59.2, 93.0]
],

// australia
[
  [-13.9, 151.3], [-12.6, 166.7], [-19.9, 170.0], [-27.9, 177.3], [-41.3, 172.7], [-42.6, 159.3], [-33.9, 150.7], [-35.9, 138.7], [-28.6, 131.3], [-22.6, 134.7], [-19.3, 144.7], [-15.9, 150.0]
]
  ]
}

function UruguayFill() {
  // Calculate the center point of Uruguay
  const centerLat = -32.5
  const centerLon = -56.0
  const centerPoint = latLongToVector3(centerLat, centerLon, 1.001)

  // Create vertices and faces
  const vertices = []
  const indices = []
  
  // Add center point as first vertex
  vertices.push(centerPoint.x, centerPoint.y, centerPoint.z)
  
  // Add border points
  countries.uruguay.forEach(([lat, lon]) => {
    const point = latLongToVector3(lat, lon, 1.001)
    vertices.push(point.x, point.y, point.z)
  })
  
  // Create triangles from center to each pair of consecutive border points
  for (let i = 1; i < countries.uruguay.length; i++) {
    indices.push(0, i, i + 1)
  }
  // Close the shape
  indices.push(0, countries.uruguay.length, 1)

  return (
    <mesh renderOrder={1}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(indices)}
          count={indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshBasicMaterial
        color="#2563eb"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Rest of the code remains the same
const latitudeLines = Array.from({ length: 19 }, (_, i) => {
  const lat = -90 + i * 10
  return Array.from({ length: 721 }, (_, j) => {
    const lon = -180 + j * 0.5
    return latLongToVector3(lat, lon, 1)
  })
})

const longitudeLines = Array.from({ length: 37 }, (_, i) => {
  const lon = -180 + i * 10
  return Array.from({ length: 361 }, (_, j) => {
    const lat = -90 + j * 0.5
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
          depthTest={false}
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
          depthTest={false}
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

      {/* Uruguay fill and outline */}
      <UruguayFill />
      {(() => {
        const points = countries.uruguay.map(([lat, lon]) => 
          latLongToVector3(lat, lon, 1.002)
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
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <Globe />
        <OrbitControls 
          enableZoom={true}
          minDistance={3}
          maxDistance={4}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}