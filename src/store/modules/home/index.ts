import { defineStore } from 'pinia';
import { getHomeTree } from '/@/api/tree/index';
import piniaStore from '/@/store/index';

export const useHomeStore = defineStore('home', {
  state: () => ({}),
  getters: {},
  actions: {
    // Home树
    async xGetHomeTree(data) {
      const res = await getHomeTree(data);
      return res;
    },
  },
});
export function useHomeOutsideStore() {
  return useHomeStore(piniaStore);
}
