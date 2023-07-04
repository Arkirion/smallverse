import { usePlayerModel } from './usePlayerModel';
import { useMovement } from './movement/useMovement';


export const Player = ({ handleServerPosition }) => {
  const { PlayerModel, playerModelApi, playerModelReference : ref } = usePlayerModel();
  useMovement({ playerModelApi, handleServerPosition })

  return (
    <mesh ref={ref}>
      <PlayerModel />
    </mesh>
  );
};
