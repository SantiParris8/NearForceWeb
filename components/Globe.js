'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function RotatingSphere() {
  const meshRef = useRef()
  
  useFrame(() => {
    meshRef.current.rotation.y += 0.002
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshPhongMaterial
        color="#4299e1"
        emissive="#2b6cb0"
        emissiveIntensity={0.5}
        roughness={0.7}
        metalness={0.5}
        wireframe
      />
    </Sphere>
  )
}

export default function Globe() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingSphere />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}