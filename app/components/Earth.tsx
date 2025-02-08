"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Environment } from "@react-three/drei"

export default function Earth({ location }) {
  const earthRef = useRef()
  const gridRef = useRef()

  useFrame(() => {
    if (earthRef.current) {
      // Rotate to location
      const lat = location.lat * (Math.PI / 180)
      const lon = -location.lon * (Math.PI / 180)
      earthRef.current.rotation.y = lon
      earthRef.current.rotation.x = lat
    }
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.001
    }
  })

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 2, 5]} intensity={1} />

      {/* Earth Sphere */}
      <group ref={earthRef}>
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            color="#1a237e"
            emissive="#1a237e"
            emissiveIntensity={0.5}
            roughness={0.7}
            metalness={0.3}
          />
        </Sphere>

        {/* Grid Effect */}
        <group ref={gridRef}>
          <Sphere args={[2.1, 32, 32]}>
            <meshStandardMaterial
              color="#4fc3f7"
              emissive="#4fc3f7"
              emissiveIntensity={0.2}
              transparent
              opacity={0.1}
              wireframe
            />
          </Sphere>
        </group>

        {/* Location Marker */}
        <mesh
          position={[
            2 * Math.cos(location.lat * (Math.PI / 180)) * Math.sin(location.lon * (Math.PI / 180)),
            2 * Math.sin(location.lat * (Math.PI / 180)),
            2 * Math.cos(location.lat * (Math.PI / 180)) * Math.cos(location.lon * (Math.PI / 180)),
          ]}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ff4081" emissive="#ff4081" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Atmosphere Effect */}
      <Sphere args={[2.2, 32, 32]}>
        <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.1} transparent opacity={0.1} />
      </Sphere>
    </>
  )
}

