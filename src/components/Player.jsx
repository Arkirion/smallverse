import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { Clock } from "three";

const CHARACTER_SPEED = 5;
const CHARACTER_JUMP_FORCE = 4;
const UPDATE_FREQUENCY_ON_SECONDS = 0.01; // e.g :  0.3 seg, 1 seg, 2 seg

export const Player = ({ innerRef, api, setPlayerPosition }) => {
  const playerVelocity = useRef([0, 0, 0]);
  const playerPosition = useRef([0, 0, 0]);

  const clockRef = useRef(new Clock());
  const timePassedRef = useRef(0);

  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();
  const { camera } = useThree();

  useEffect(() => {
    api.position.subscribe((p) => {
      playerPosition.current = p;
    });
  }, [api.position]);

  useEffect(() => {
    api.velocity.subscribe((p) => {
      playerVelocity.current = p;
    });
  }, [api.velocity]);


  //@link https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe
  useFrame(() => {
    const posX = playerPosition.current[0];
    const posY = playerPosition.current[1];
    const posZ = playerPosition.current[2];

    camera.position.copy(new Vector3(posX, posY, posZ));
    timePassedRef.current += clockRef.current.getDelta();

    if (timePassedRef.current > UPDATE_FREQUENCY_ON_SECONDS ) {
      timePassedRef.current = 0;
      setPlayerPosition([posX, posY, posZ]);
    }

    const frontVectorZ = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    const sideVectorX = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    const direction = new Vector3();
    direction
      .subVectors(frontVectorZ, sideVectorX) // a - b to calculate direction
      .normalize() // change "magnitude/length" to 1 but maintain direction to work only with it
      .multiplyScalar(CHARACTER_SPEED) // multiplies the vector for an scalar(real number) by the character speed, this is to change magnitude maintaining direcction
      .applyEuler(camera.rotation); // rotates Vector 'direcction' base on camera direction to pair/match directions.

    
    api.velocity.set(direction.x, playerVelocity.current[1], direction.z);

    const avoidDoubleJump = Math.abs(playerVelocity.current[1]) < 0.05;
    if (jump && avoidDoubleJump) {
      api.velocity.set(playerVelocity.current[0], CHARACTER_JUMP_FORCE, playerVelocity.current[2]);
    }
  });

  return (
    <mesh ref={innerRef}>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshNormalMaterial />
    </mesh>
  );
};
