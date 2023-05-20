const color = Math.random() * 0xffffff

export function Players({ socketClient, clients }) {
  return Object.keys(clients)
    .filter((clientKey) => clientKey !== socketClient.id)
    .map(client => {
      const { position } = clients[client]
      return (
        <mesh position={position}>
          <sphereBufferGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )
    })

}
