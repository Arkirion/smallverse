import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { Clock } from 'three'

const CHARACTER_SPEED = 5
const CHARACTER_JUMP_FORCE = 4

export const Player = ({innerRef, api, setPlayerPosition}) => {
  const { moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard()
  const { camera } = useThree();

  const pos = useRef([0,0,0])
  useEffect(() => {
    api.position.subscribe(p => {
      pos.current = p
    })
  }, [api.position])

  const vel = useRef([0,0,0])
  useEffect(() => {
    api.velocity.subscribe(p => {
      vel.current = p
    })
  }, [api.velocity])
  const clockRef = useRef(new Clock())
  const timePassedRef = useRef(0)
  //@link https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe
  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0],
        pos.current[1],
        pos.current[2]
      )
    )

    timePassedRef.current += clockRef.current.getDelta()

    if (timePassedRef.current >= 0) { 
      timePassedRef.current = 0
      setPlayerPosition([pos.current[0],
        pos.current[1],
        pos.current[2]])
    }
    
    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )


    direction
      .subVectors(frontVector, sideVector) // calculating vectors
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) 
      .applyEuler(camera.rotation)
      
    // api.velocity.set(0,0,-1)
    api.velocity.set(
      direction.x,
      vel.current[1],
      direction.z
    )

    const avoidDoubleJump = Math.abs(vel.current[1]) < 0.05;
    if (jump && avoidDoubleJump) {
      api.velocity.set(
        vel.current[0],
        CHARACTER_JUMP_FORCE,
        vel.current[2]
      )
    }

  })

  return (
    <mesh ref={innerRef}>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshNormalMaterial />
    </mesh>
  )
}