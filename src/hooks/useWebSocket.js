import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

const SERVER_URL = 'http://localhost:4000'
export const useWebSocket = () => {
  const [userClients, setClients] = useState({});

  const [webSocketClient, setWebSocketClient] = useState(null);

  // connect socket
  useEffect(() => {
    const socket = io(SERVER_URL);
    setWebSocketClient(socket);

    socket.on('move', (userClients) => {
        setClients(userClients);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sharePositionWebSocket = (playerPosition) => {
    webSocketClient?.emit('move', { id: webSocketClient.id, position: playerPosition });
  }

  return {
    webSocketClient,
    userClients,
    sharePositionWebSocket
  };
};