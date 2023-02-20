import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground } from './components/Ground'
import { Camera } from './components/Camera'
import { Player } from './components/Player'


const SphereExample = () => <mesh scale={[0.5, 0.5, 0.5]} position={[1, 2, 2]} castShadow>
  <sphereGeometry />
  <meshStandardMaterial />
</mesh>

const EnvironmentWrapper = ({ children }) => {
  return (
    <>
      <Canvas shadows>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.4} />
        <Camera/>
        <directionalLight
          position={[0, 10, 10]}
          castShadow
          shadow-mapSize-height={1000}
          shadow-mapSize-width={1000}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        {children}
      </Canvas>
    </>
  )
}


function App() {
  return (
    <>
      <EnvironmentWrapper>
        <Physics>
          <SphereExample/>
          <Player/>
          <Ground />
        </Physics>
      </EnvironmentWrapper>
      <div className='pointer'>+</div>
    </>
  )
}

export default App
