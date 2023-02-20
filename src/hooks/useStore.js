import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";
import { PERSIST_MODE } from "../featureFlag";


const normalMode = (set, get) => ({
  texture: "dirt",
  cubes: [], // Example : { id: nanoid(), pos: [1, 1, 3], texture: "dirt", },

  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          texture: state.texture,
          pos: [x, y, z],
        },
      ],
    }));
  },
  removeCube: (id) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => cube.id != id),
    }));
  },
  setTexture: () => {},
  saveWorld: (cubes) => set((state) => ({ cubes })),
  resetWorld: () => set({ cubes: []}),
})

const persistMode = persist(normalMode,
  {name: "world"}
)


export const useStore = create(PERSIST_MODE ? persistMode : normalMode );
