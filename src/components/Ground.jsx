import { usePlane } from "@react-three/cannon";

export function Ground({ color = '#87B27D' }) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z
    position: [0, -0.1, 0],
  }))
  const size = [100, 100]

  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry attach="geometry" args={size} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    </group>
  )
}
