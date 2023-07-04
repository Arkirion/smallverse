import { Physics } from '@react-three/cannon';

import { useWebSocket } from './hooks/useWebSocket';
import { Ground } from './components/Scene/Ground';
import { Player } from './components/Player/Player';
import { DevTools } from './components/DevTools/DevTools';
import { PlayersRenderer } from './ObjectRenderer/PlayersRenderer';
import { ItemsRenderer } from './ObjectRenderer/ItemsRenderer';

import { EnvironmentWrapper } from './components/Scene/EnvironmentWrapper';
import { Canvas} from '@react-three/fiber';
import { Ui } from './components/UI/ui';
import { CONFIGURATION } from './configurations';


function App() {
  const { webSocketClient, userClients, sharePositionWebSocket } = useWebSocket();

  return (
    <>
      <Canvas shadows>
        <EnvironmentWrapper>
          <Physics>
            <ItemsRenderer />
            <PlayersRenderer webSocketClient={webSocketClient} userClients={userClients} />
            <Player sharePositionWebSocket={sharePositionWebSocket} />
            <Ground />
            {CONFIGURATION.devTools.enabled && <DevTools />}
            {/* DevTools , TODO: feature flag*/}
          </Physics>
        </EnvironmentWrapper>
      </Canvas>
      <Ui />
    </>
  );
}

export default App;
