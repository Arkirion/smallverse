import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber'
import { Sphere, Box } from '@react-three/drei';
import { Vector3 } from 'three';
import { useItemSelectorStore } from '../store/itemSelectoreStore';

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

const DISTANCE = 4

export function Items() {
  const { gl, raycaster, camera } = useThree();
  const [items, setItems] = useState([]);

  const onClick = (event) => {

    // // Actualizamos el raycaster con la posición del click
    // raycaster.setFromCamera(event.clientX, event.clientY, camera);
    const direction = new Vector3()
    camera.getWorldDirection(direction)
    // console.log(direction)

    // // Obtenemos las intersecciones con los objetos de la escena
    // const intersects = raycaster.intersectObjects(scene.children);
    // // Si no hay intersecciones, se hizo click fuera de los objetos
    // if (intersects.length === 0) {
    //   console.log('Has hecho click en el espacio!');
    // }

    camera.getWorldDirection(direction)
    direction.normalize().multiplyScalar(DISTANCE);
    const [x, y, z] = camera.position.clone().add(direction);
  
    const currentSelectedItem = useItemSelectorStore.getState().selectedItem.name;
    if (currentSelectedItem === 'sphere') {
      setItems((oldItems) => [
        ...oldItems,
        {  type: 'sphere' , position: [x, y, z], color: 'red', key: crypto.randomUUID() },
      ]);
    } else if (currentSelectedItem === 'square') {
      setItems((oldItems) => [
        ...oldItems,
        { type: 'square', position: [x, y, z], color: 'green', key: crypto.randomUUID() },
      ]);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', onClick);

    return () => {
      canvas.removeEventListener('click', onClick);
    };
  }, [gl, raycaster]);

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