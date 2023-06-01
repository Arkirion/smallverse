import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { Sphere } from '@react-three/drei';
import { PivotControls } from '@react-three/drei';

const SphereComponent = ({ position, color }) => (
  <Sphere args={[1, 32, 32]} position={position}>
    <meshStandardMaterial color={color} />
  </Sphere>
)

export function Ground({ color = '#87B27D' }) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z
    position: [0, -0.1, 0],
  }))
  const size = [100, 100]
  const [spheres, setSpheres] = useState([]);
  const { camera } = useThree();

  const handleCanvasClick = (event) => {
    event.stopPropagation();

    const positionArray = camera.position.toArray()
    const x = positionArray[0]
    const y = positionArray[1]
    const z = positionArray[2]

    setSpheres((oldSpheres) => [
      ...oldSpheres,
      { position: [x, y, z], color: 'red', key: crypto.randomUUID() },
    ]);
  };


  return (
    <group>
      <mesh ref={ref} onClick={(event) => handleCanvasClick(event)} receiveShadow>
        <planeGeometry attach="geometry" args={size} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
      {spheres.map((sphere) => {
        return <PivotControls>
          <SphereComponent key={sphere.key} position={sphere.position} rotation={[0, Math.PI, 0]} color={sphere.color} />
        </PivotControls>
      }

      )}
    </group>
  )
}
