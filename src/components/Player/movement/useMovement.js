import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import { useKeyboard } from './useKeyboard';
import { Clock } from 'three';
import { CONFIGURATION } from '../../../configurations';

export const useMovement = ({playerModelApi, sharePositionWebSocket}) => {
  const playerVelocity = useRef([0, 0, 0]);
  const playerPosition = useRef([0, 0, 0]);

  const clockRef = useRef(new Clock());
  const timePassedRef = useRef(0);

  const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard();
  const { camera } = useThree();

  useEffect(() => {
    playerModelApi.position.subscribe((p) => {
      playerPosition.current = p;
    });
  }, [playerModelApi.position]);

  useEffect(() => {
    playerModelApi.velocity.subscribe((p) => {
      playerVelocity.current = p;
    });
  }, [playerModelApi.velocity]);

  const setMovementDirection = (cameraDirection) => {
    const frontVectorZ = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
    const sideVectorX = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);
    const direction = new Vector3();
    direction
      .subVectors(frontVectorZ, sideVectorX) // a - b to calculate direction
      .normalize() // change "magnitude/length" to 1 but maintain direction to work only with it
      .multiplyScalar(CONFIGURATION.player.speed) // multiplies the vector for an scalar(real number) by the character speed, this is to change magnitude maintaining direcction
      .applyEuler(cameraDirection); // rotates Vector 'direcction' base on camera direction to pair/match directions.
    playerModelApi.velocity.set(direction.x, playerVelocity.current[1], direction.z);
  };

  const handleDoubleJumpIssue = () => {
    const avoidDoubleJump = Math.abs(playerVelocity.current[1]) < 0.05;
    if (jump && avoidDoubleJump) {
      playerModelApi.velocity.set(playerVelocity.current[0], CONFIGURATION.player.jumpForce, playerVelocity.current[2]);
    }
  };

  //@link https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe
  useFrame(() => {
    const posX = playerPosition.current[0];
    const posY = playerPosition.current[1];
    const posZ = playerPosition.current[2];
    camera.position.copy(new Vector3(posX, posY, posZ));
    
    // RATE OF POSITION UPDATE
    timePassedRef.current += clockRef.current.getDelta();
    if (timePassedRef.current > CONFIGURATION.player.dataSharedFrequency) {
      timePassedRef.current = 0;
      sharePositionWebSocket([posX, posY, posZ]);
    }

    setMovementDirection(camera.rotation);
    handleDoubleJumpIssue();
  });
}