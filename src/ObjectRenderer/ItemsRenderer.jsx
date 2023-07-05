import { Sphere, Box } from '@react-three/drei';
import { actions } from '../hooks/actions';

const SphereComponent = ({ key, position, color = 'red' }) => (
  <Sphere args={[1, 32, 32]} position={position} key={key}>
    <meshStandardMaterial color={color} />
  </Sphere>
)

const BoxComponent = ({ key, position, color='green' }) => (
  <Box args={[1, 1, 1]} position={position} key={key}>
    <meshStandardMaterial color={color} />
  </Box>
)

const ShapesMap = {
  'sphere': SphereComponent,
  'square': BoxComponent
}

export function ItemsRenderer() {
  const { items } = actions.rightClick()
  return <group>
    {items.map((item) => {
      const ShapeComponent = ShapesMap[item.type];
      return <ShapeComponent key={item.key} position={item.position} /> 
    })}
  </group>
}