import { Physics } from '@react-three/cannon';

import { useWebSocket } from './hooks/useWebSocket';
import { Ground } from './components/Ground';
import { Player } from './components/Player/Player';
import { Players } from './components/Players';
import { EnvironmentWrapper } from './components/EnvironmentWrapper';
import { SphereTest } from './components/items/SphereTest';


function App() {
  const { webSocketClient, userClients, sharePositionWebSocket } = useWebSocket()

  return (
    <>
      <EnvironmentWrapper>
        <Physics>
        <SphereTest />
          <Player handleServerPosition={ sharePositionWebSocket} />
          <Players webSocketClient={webSocketClient} userClients={userClients} />
          <Ground/>
        </Physics>
      </EnvironmentWrapper>
      <div className="pointer">+</div>
    </>
  );
}

export default App;
