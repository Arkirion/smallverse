import { Sphere, Box } from '@react-three/drei';
import { actions } from '../hooks/actions';

const SphereComponent = ({ position, color }) => (
  <Sphere args={[1, 32, 32]} position={position}>
    <meshStandardMaterial color={color} />
  </Sphere>
)

const BoxComponent = ({ position, color }) => (
  <Box args={[1, 1, 1]} position={position}>
    <meshStandardMaterial color={color} />
  </Box>
)

export function ItemsRenderer() {
  const { items } = actions.rightClick()
  return <group>
    {items.map((item) => {
      if (item.type === 'square') {
        return <BoxComponent key={item.key} position={item.position} rotation={[0, Math.PI, 0]} color={item.color} />
      }
      if (item.type === 'sphere') {
        return <SphereComponent key={item.key} position={item.position} rotation={[0, Math.PI, 0]} color={item.color} />;
      }
    })}
  </group>
}