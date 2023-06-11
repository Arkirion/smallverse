import { Stats, Grid, PivotControls, GizmoHelper, GizmoViewport } from '@react-three/drei';

export const DevTools = () => {
  return <>
    <PivotControls position={[0, 0, 0]}>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[5, 0, 0]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color={'red'} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 5]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color={'blue'} />
      </mesh>
    </PivotControls>

    <Stats />
    <GizmoHelper>
      <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
    </GizmoHelper>
    <Grid infiniteGrid />
  </>
}