import { usePlayerModel } from './usePlayerModel';
import { useMovement } from './movement/useMovement';


export const Player = ({ sharePositionWebSocket }) => {
  const { PlayerModel, playerModelApi, playerModelReference : ref } = usePlayerModel();
  useMovement({ playerModelApi, sharePositionWebSocket })

  return (
    <mesh ref={ref}>
      <PlayerModel />
    </mesh>
  );
};
