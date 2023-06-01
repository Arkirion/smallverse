import { Physics } from '@react-three/cannon';

import { useWebSocket } from './hooks/useWebSocket';
import { Ground } from './components/Ground';
import { Player } from './components/Player/Player';
import { Players } from './components/Players';
import { EnvironmentWrapper } from './components/EnvironmentWrapper';
import { SphereTest } from './components/items/SphereTest';
import { Stats, Grid, PivotControls, GizmoHelper, GizmoViewport } from '@react-three/drei';


function App() {
  const { webSocketClient, userClients, sharePositionWebSocket } = useWebSocket()

  return (
    <>
      <EnvironmentWrapper>
        <Physics>
          <PivotControls position={[0, 0, 0]}>
            <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} castShadow>
              <boxGeometry />
              <meshStandardMaterial />
            </mesh>
            <mesh scale={[0.5, 0.5, 0.5]} position={[5, 0, 0]}  castShadow>
              <boxGeometry />
              <meshStandardMaterial color={'red'}/>
            </mesh>
            <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 5]}  castShadow>
              <boxGeometry />
              <meshStandardMaterial color={'blue'}/>
            </mesh>
          </PivotControls>

          <Player handleServerPosition={sharePositionWebSocket} />
          <Players webSocketClient={webSocketClient} userClients={userClients} />
          <Ground />
          <Stats />
          <GizmoHelper>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>
          <Grid infiniteGrid />
        </Physics>
      </EnvironmentWrapper>
      <div className="pointer">+</div>
    </>
  );
}

export default App;
