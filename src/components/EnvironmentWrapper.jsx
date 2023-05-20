import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Camera } from './Camera'

/** No dinamic items */
export const EnvironmentWrapper = ({ children }) => {
  return (
    <>
      <Canvas shadows>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.4} />
        <Camera />
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
