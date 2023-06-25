// @ts-check

import { useState, useEffect } from "react";
import { useItemSelectorStore } from "../../../store/itemSelectoreStore";

const ACTIONS_KEYBOARD_MAP = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyA: "moveLeft",
  KeyD: "moveRight",
  Space: "jump",

};

const SHORTCUT_ACTIONS_KEYBOARD_MAP = {
  Digit1: "empty",
  Digit2: "square",
  Digit3: "sphere",
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  const setItem = useItemSelectorStore(state => state.setItem)
  /**
   * Maneja la acción del teclado.
   * @param {KeyboardEvent} e - El evento del teclado.
   * @param {boolean} isPressed - Indica si la tecla está presionada o no.
   */
  const handleAction = (e, isPressed) => {
    const { code: keyKode } = e;
    const action = ACTIONS_KEYBOARD_MAP[keyKode];
    if (keyKode in SHORTCUT_ACTIONS_KEYBOARD_MAP) {
      console.log(SHORTCUT_ACTIONS_KEYBOARD_MAP[keyKode])
      setItem(SHORTCUT_ACTIONS_KEYBOARD_MAP[keyKode])
    }

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
