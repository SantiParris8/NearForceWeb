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
    [-28.8, -73.3], [-28.7, -74.2], [-27.6, -75.0], [-26.4, -75.0], [-25.8, -74.7], 
    [-22.9, -74.5], [-21.6, -74.3], [-21.1, -73.9], [-20.9, -73.0], [-21.9, -71.6], 
    [-22.3, -70.8], [-22.9, -70.3], [-23.4, -69.5], [-24.1, -68.7], [-24.4, -68.2], 
    [-25.1, -67.7], [-25.5, -67.3], [-26.1, -67.4], [-26.1, -67.8], [-27.0, -67.9], 
    [-27.6, -67.5], [-28.9, -68.4], [-29.8, -69.6], [-29.4, -70.3], [-29.5, -71.6], 
    [-28.8, -73.3]
  ],
  otherCountries: [
    // South America
    [12.4, -91.3], [4.0, -101.3], [-18.3, -90.3], [-52.3, -89.1], [-55.9, -87.3], [-54.9, -84.3], [-34.9, -76.2], [-30.5, -73.7], [-28.8, -75.1], [-27.7, -75.0], [-28.8, -74.2], [-28.8, -73.3], [-29.5, -71.7], [-29.4, -70.3], [-29.8, -69.6], [-28.9, -68.3], [-27.5, -67.4], [-22.9, -63.2], [-5.2, -55.3], [11.7, -91.3], [12.4, -91.3]
    ,
    // Central America
    [12.4, -91.3, 13.5, -95.5, 14.2, -99.8, 15.0, -103.9],
    // North America
    [87.3, -128.3, 81.9, -143.0, 83.6, -163.1, 75.2, -176.9, 69.7, -182.4, 65.9, -175.7,
     60.6, -167.0, 54.5, -153.7, 48.5, -144.7, 45.5, -144.7, 40.2, -144.1, 34.5, -140.5,
     32.5, -137.1, 29.8, -134.8, 24.4, -117.1, 21.1, -110.1, 15.0, -103.9, 29.2, -100.7,
     35.9, -96.3, 51.3, -88.3, 55.3, -81.0, 65.9, -79.0, 76.6, -87.0, 76.6, -96.7,
     84.6, -98.7, 87.8, -127.6],
    // Africa
    [26.1, 18.2, 21.8, 37.1, 23.6, 60.6, 3.9, 73.8, -6.9, 66.2, -23.2, 65.0,
     -40.0, 58.6, -53.8, 46.0, -54.9, 38.7, -38.9, 35.8, -16.5, 26.2, -10.1, 5.8,
     11.5, 0.6, 26.1, 18.2],
    // Asia
    [56.9, 72.6, 65.0, 96.1, 57.2, 139.8, 57.3, 163.7, 46.9, 177.9, 31.1, 175.6,
     16.0, 163.3, 9.9, 140.4, 0.6, 132.8, -9.4, 130.1, -12.9, 124.3, -2.9, 119.7,
     6.4, 117.4, 10.6, 77.7, 34.3, 66.1, 27.6, 36.5, 35.6, 38.5, 39.1, 31.1,
     37.2, 24.3, 30.5, 21.4, 33.7, 12.7, 53.0, 16.9, 54.6, 40.4, 61.3, 54.5, 56.9, 72.6],
    // Australia
    [-12.9, 151.7, -12.5, 161.3, -10.6, 166.4, -19.9, 170.0, -27.9, 177.3, -41.3, 172.7,
     -42.6, 159.3, -33.9, 150.7, -35.9, 138.7, -28.6, 131.3, -22.6, 134.7, -19.3, 144.7,
     -12.9, 151.7]
  ]
}



function Globe() {
  const globeRef = useRef()

  useFrame(({ clock }) => {
    globeRef.current.rotation.y = clock.getElapsedTime() * 0.1
  })

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
        const points = []
        for (let j = 0; j < country.length; j += 2) {
          points.push(latLongToVector3(country[j], country[j + 1], 1))
        }
        return (
          <Line
            key={`country-${i}`}
            points={points}
            color="#3182ce"
            lineWidth={1.5}
          />
        )
      })}

      {/* Uruguay outline */}
      {(() => {
        const points = countries.uruguay.map(([lat, lon]) => 
          latLongToVector3(lat, lon, 1.002)
        )
        return (
          <Line
            points={points}
            color="#3182ce"
            lineWidth={1.5}
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