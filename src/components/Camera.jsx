import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

/** First Point of View */
export function Camera() {
  const { camera, gl } = useThree()
  
  return (
    <PointerLockControls
      args={[camera, gl.domElement]}
    />
  )
}