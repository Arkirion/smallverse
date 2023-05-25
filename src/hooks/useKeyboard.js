// @ts-check

import { useState, useEffect } from "react";

const ACTIONS_KEYBOARD_MAP = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyA: "moveLeft",
  KeyD: "moveRight",
  Space: "jump",
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  /**
   * Maneja la acción del teclado.
   * @param {KeyboardEvent} e - El evento del teclado.
   * @param {boolean} isPressed - Indica si la tecla está presionada o no.
   */
  const handleAction = (e, isPressed) => {
    const { code: keyKode } = e;
    const action = ACTIONS_KEYBOARD_MAP[keyKode];

    if (action) {
      setActions((prevActions) => ({
        ...prevActions,
        [action]: isPressed,
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleAction(event, true);
    };

    const handleKeyUp = (event) => {
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code];

      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: false,
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return actions;
};
