import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useItemsStore } from '../store/itemsStore';
import { CONFIGURATION } from '../configurations';

const SERVER_URL = 'http://localhost:4000'
export const useWebSocket = () => {
  const [userClients, setClients] = useState({});
  const [webSocketClient, setWebSocketClient] = useState(null);
  const addItem = useItemsStore((state) => state.addItem)

  // connect socket
  useEffect(() => {
    const socket = io(SERVER_URL);
    setWebSocketClient(socket);

    socket.on('move', (userClients) => {
        setClients(userClients);
    });

     
    if (CONFIGURATION.websocketFeatures.shareItems) {
      socket.on('addItem', ({ item, id }) => {
        if (id !== socket.id) {
          addItem({ pos: item.pos, modelId : item.modelId});
        }
      });
    }


    return () => {
      socket.disconnect();
    };
  }, []);

  const sharePositionWebSocket = (playerPosition) => {
    webSocketClient?.emit('move', { id: webSocketClient.id, position: playerPosition });
  }

  const addItemWS = (item) => {
    webSocketClient?.emit('addItem', { item, id : webSocketClient.id});
  }

  return {
    webSocketClient,
    userClients,
    sharePositionWebSocket,
    addItemWS
  };
};