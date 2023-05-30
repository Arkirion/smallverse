import { usePlayerModel } from './model';
import { handleMovement } from './movement/movement';


export const Player = ({ handleServerPosition }) => {
  const { PlayerModel, playerModelApi, playerModelReference } = usePlayerModel();
  handleMovement({ playerModelApi, handleServerPosition })

  return (
    <mesh ref={playerModelReference}>
      <PlayerModel />
    </mesh>
  );
};
