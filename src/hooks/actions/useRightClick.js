import { useEffect, useState, useContext } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useItemSelectorStore } from '../../store/itemSelectorStore';
import { useItemsStore } from '../../store/itemsStore';
import { WebSocketContext } from '../../context/webSocketContext'
import { CONFIGURATION } from '../../configurations';

export function useRightClick() {
  const { gl, raycaster, camera } = useThree();
  const [items, setItems] = useState([]);
  const { addItemWS } = useContext(WebSocketContext);
  const addItem = useItemsStore((state) => state.addItem)

  const onClick = (event) => {
    if (event.button === 2) {
      // // Actualizamos el raycaster con la posición del click
      // raycaster.setFromCamera(event.clientX, event.clientY, camera);
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      // console.log(direction)

      // // Obtenemos las intersecciones con los objetos de la escena
      // const intersects = raycaster.intersectObjects(scene.children);
      // // Si no hay intersecciones, se hizo click fuera de los objetos
      // if (intersects.length === 0) {
      //   console.log('Has hecho click en el espacio!');
      // }

      camera.getWorldDirection(direction);
      direction.normalize().multiplyScalar(CONFIGURATION.items.distanceToRender);
      const [x, y, z] = camera.position.clone().add(direction);

      const currentSelectedItem = useItemSelectorStore.getState().selectedItem;
      // in the future add more configuration and dinamically
      if (currentSelectedItem.name != 'empty') {
        const item = {
          modelId: currentSelectedItem.name,
        pos: [x, y, z],
        }
        CONFIGURATION.websocketFeatures.shareItems && addItemWS(item)
        addItem(item);
      }
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', onClick);

    return () => {
      canvas.removeEventListener('click', onClick);
    };
  }, [gl, raycaster]);
}
