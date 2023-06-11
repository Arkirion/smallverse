import { Physics } from '@react-three/cannon';

import { useWebSocket } from './hooks/useWebSocket';
import { Ground } from './components/Ground';
import { Player } from './components/Player/Player';
import { DevTools } from './components/DevTools/DevTools';
import { Players } from './components/Players';
import { Items } from './components/Items';

import { EnvironmentWrapper } from './components/EnvironmentWrapper';
import { Canvas} from '@react-three/fiber';



function App() {
  const { webSocketClient, userClients, sharePositionWebSocket } = useWebSocket();

  return (
    <>
      <Canvas shadows>
        <EnvironmentWrapper>
          <Physics>
            <Items />
            <Player handleServerPosition={sharePositionWebSocket} />
            <Players webSocketClient={webSocketClient} userClients={userClients} />
            <DevTools />
            <Ground />
            {/* DevTools , TODO: feature flag*/}
          </Physics>
        </EnvironmentWrapper>
      </Canvas>
      <div className="pointer">+</div>
    </>
  );
}

export default App;
