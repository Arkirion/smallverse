import { useSphere } from '@react-three/cannon';


export const usePlayerModel = () => {
  const [playerModelReference, playerModelApi] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [1],
    position: [5, 0.5, 5],
  }));

  const PlayerModel = () => {
    return (
      <>
        <sphereGeometry args={[1, 32, 32]} />
        <meshNormalMaterial />
      </>
    );
  };
  return { PlayerModel, playerModelReference, playerModelApi };
};