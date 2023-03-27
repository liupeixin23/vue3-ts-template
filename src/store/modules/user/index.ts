import { defineStore } from 'pinia';
import { getMoreDictEntryGroup, getHistory, getBomDetail, getApplication } from '/@/api/user/index';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_name: 'kobe',
    avatar: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    blogJuejin: undefined,
    blogZhihu: undefined,
    blogGithub: undefined,
    profileBio: undefined,
    devLanguages: undefined,
    role: '',
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 获取字典
    async xGetMoreDictEntryGroup(data: any) {
      const res = await getMoreDictEntryGroup(data);
      return res;
    },
    // 获取历史记录
    async xGetHistory(data: any) {
      const res = await getHistory(data);
      return res;
    },
    // 获取详情
    async xGetBomDetail() {
      const res = await getBomDetail();
      return res;
    },
    // 获取应用列表
    async xGetApplication(data: any) {
      const res = await getApplication(data);
      return res;
    },
    // 修改用户名
    changeUserName(params: string) {
      return (this.user_name = params);
    },
  },
});
