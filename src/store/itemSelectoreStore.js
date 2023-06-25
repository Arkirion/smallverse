import { create } from 'zustand';

export const items = {
  empty: {
    id: 1,
    name: 'empty',
  },
  square: {
    id: 2,
    name: 'square',
  },
  sphere: {
    id: 3,
    name: 'sphere',
  },
};

export const useItemSelectorStore = create((set, get) => ({
  selectedItem: items['empty'],
  setItem: (itemKey) => {
    set({ selectedItem: items[itemKey] });
  },
}));
