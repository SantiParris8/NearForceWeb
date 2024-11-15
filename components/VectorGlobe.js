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

function UruguayShape() {
  // Create a shape from the coordinates
  const shape = new THREE.Shape()
  const points = countries.uruguay.map(([lat, lon]) => {
    const point = latLongToVector3(lat, lon, 1)
    return new THREE.Vector2(point.x, point.y)
  })
  
  shape.moveTo(points[0].x, points[0].y)
  points.forEach((point) => shape.lineTo(point.x, point.y))
  shape.closePath()

  // Create geometry from the shape
  const geometry = new THREE.ShapeGeometry(shape)
  
  return (
    <mesh renderOrder={1}>
      <extrudeGeometry 
        args={[shape, {
          steps: 1,
          depth: 0.01,
          bevelEnabled: false
        }]}
      />
      <meshBasicMaterial 
        color="#2563eb"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

const countries = {
  uruguay: [
    [-30.1, -57.3], [-30.2, -56.2], [-31.0, -55.9], [-31.7, -55.0],
    [-32.5, -54.8], [-33.2, -53.8], [-33.7, -53.4], [-34.5, -53.5],
    [-35.0, -54.2], [-34.5, -55.4], [-34.3, -56.5], [-34.0, -57.0],
    [-33.5, -58.0], [-33.2, -58.4], [-32.5, -58.3], [-31.8, -58.2],
    [-30.9, -57.9], [-30.1, -57.3]
  ],
  otherCountries: [
      // South America (shifted slightly west)
      // uruguay


// southAmerica
[
  [12.4, -91.3], [4.0, -101.3], [-18.3, -90.3], [-52.3, -89.1], [-55.9, -87.3], [-54.9, -84.3], [-34.9, -76.2], [-29.5, -73.5], [-29.5, -70.5], [-28.7, -70.1], [-28.4, -69.1], [-22.9, -63.2], [-5.2, -55.3], [11.7, -91.3], [12.4, -91.3]
],

// centralAmerica
[
  [12.4, -91.3], [13.5, -95.5], [14.2, -99.8], [15.0, -103.9]
],

// northAmerica
[
  [87.3, -128.3], [81.9, -143.0], [83.6, -163.1], [75.2, -176.9], [69.7, -182.4], [65.9, -175.7], [60.6, -167.0], [54.5, -153.7], [48.5, -144.7], [45.5, -144.7], [40.2, -144.1], [34.5, -140.5], [32.5, -137.1], [29.8, -134.8], [24.4, -117.1], [21.1, -110.1], [15.0, -103.9], [29.2, -100.7], [35.9, -96.3], [51.3, -88.3], [55.3, -81.0], [65.9, -79.0], [76.6, -87.0], [76.6, -96.7], [84.6, -98.7], [87.8, -127.6]
],


// africa
[
  [26.1, 18.2], [21.8, 37.1], [23.6, 60.6], [3.9, 73.8], [-6.9, 66.2], [-23.2, 65.0], [-40.0, 58.6], [-53.8, 46.0], [-54.9, 38.7], [-38.9, 35.8], [-16.5, 26.2], [-10.1, 5.8], [11.5, 0.6], [25.3, 17.4]
],

// asia
[
  [56.9, 72.6], [65.0, 96.1], [57.2, 139.8], [57.3, 163.7], [46.9, 177.9], [31.1, 175.6], [16.0, 163.3], [9.9, 140.4], [0.6, 132.8], [-9.4, 130.1], [-12.9, 124.3], [-2.9, 119.7], [6.4, 117.4], [10.6, 77.7], [34.3, 66.1], [27.6, 36.5], [35.6, 38.5], [39.1, 31.1], [37.2, 24.3], [30.5, 21.4], [33.7, 12.7], [53.0, 16.9], [54.6, 40.4], [61.3, 54.5], [56.0, 72.2]
],

// australia
[
  [-12.9, 151.7], [-12.5, 161.3], [-10.6, 166.4], [-19.9, 170.0], [-27.9, 177.3], [-41.3, 172.7], [-42.6, 159.3], [-33.9, 150.7], [-35.9, 138.7], [-28.6, 131.3], [-22.6, 134.7], [-19.3, 144.7], [-12.9, 152.5]
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
      {Array.from({ length: 19 }, (_, i) => {
        const lat = -90 + i * 10
        const points = Array.from({ length: 361 }, (_, j) => {
          const lon = -180 + j * 0.5
          return latLongToVector3(lat, lon, 1)
        })
        return (
          <Line
            key={`lat-${i}`}
            points={points}
            color="#3182ce"
            lineWidth={0.3}
            transparent
            opacity={0.2}
          />
        )
      })}
      
      {Array.from({ length: 37 }, (_, i) => {
        const lon = -180 + i * 10
        const points = Array.from({ length: 181 }, (_, j) => {
          const lat = -90 + j * 0.5
          return latLongToVector3(lat, lon, 1)
        })
        return (
          <Line
            key={`lon-${i}`}
            points={points}
            color="#3182ce"
            lineWidth={0.3}
            transparent
            opacity={0.2}
          />
        )
      })}

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

<UruguayShape />

{/* Uruguay outline */}
{(() => {
  const points = countries.uruguay.map(([lat, lon]) => 
    latLongToVector3(lat, lon, 1.001)
  )
  return (
    <Line
      points={points}
      color="#2563eb"
      lineWidth={2}
    />
  )
})()}

      {/* Outer glow */}
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