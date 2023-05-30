const color = Math.random() * 0xffffff

export function Players({webSocketClient, userClients}) {
  return Object.keys(userClients)
    .filter((clientKey) => clientKey !== webSocketClient.id)
    .map(client => {
      const { position } = userClients[client]
      return (
        <mesh position={position}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )
    })

}
