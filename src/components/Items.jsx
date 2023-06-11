import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber'
import { Sphere } from '@react-three/drei';
import { Vector3 } from 'three';

const SphereComponent = ({ position, color }) => (
  <Sphere args={[1, 32, 32]} position={position}>
    <meshStandardMaterial color={color} />
  </Sphere>
)

const DISTANCE = 4

export function Items() {
  const { gl, raycaster, camera } = useThree();
  const [spheres, setSpheres] = useState([]);

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

    setSpheres((oldSpheres) => [
      ...oldSpheres,
      { position: [x, y, z], color: 'red', key: crypto.randomUUID() },
    ]);
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', onClick);

    return () => {
      canvas.removeEventListener('click', onClick);
    };
  }, [gl, raycaster]);

  return <group>
    {spheres.map((sphere) => {
      return <SphereComponent key={sphere.key} position={sphere.position} rotation={[0, Math.PI, 0]} color={sphere.color} />;
    })}
  </group>
}