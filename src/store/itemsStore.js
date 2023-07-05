import { create } from 'zustand';
import { nanoid } from 'nanoid';

export const useItemsStore = create((set, get) => ({
  items: [], //TODO: Type
  addItem: ({ pos, modelId, optional}) => {
    set((state) => ({
      items: [
        ...state.items,
        {
          id: nanoid(),
          pos: pos, // [x, y, z]
          modelId: modelId,
          optional : optional || null
        }
      ]
    }))
  }
}));
