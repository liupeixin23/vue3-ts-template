# 项目使用文档及注意事项

## 接口开发

### API 定义

```
import { get, post } from '/@/utils/http/axios';

// 接口服务地址
enum BASE {
  dict = 'lezao-dict-service',
  lzos= 'lezao-oauth-service',
}
// 接口地址 及 请求方式 和 参数
const getMoreDictEntryGroup = (data: any) => post<any>({ url: `${BASE.dict}/lezaoDictionaries/getMoreDictEntryGroup`, data });

const getApplication = (params: any) => get<any>({ url: `${BASE.lzos}/myApplication/userGroupApplication`, params });
export { getMoreDictEntryGroup,  getApplication };

```

### API 注意事项

1. 接口命名采用驼峰命名法
2. get 接口传参使用 params
3. post 接口传参使用 data
4. 接口服务地址使用枚举类型

### API 使用

```
import { getMoreDictEntryGroup } from '/@/api/lezao-dict-service/lezaoDictionaries';

actions: {
    // 获取字典
    async xGetMoreDictEntryGroup(data: any) {
      const res = await getMoreDictEntryGroup(data);
      return res;
    },
},
```

### store 注意事项

1. store 中 actions 的接口请求 x 开头命名规则，方便识别接口和方法，如：xGetMoreDictEntryGroup
2. store 中 actions 的方法命名采用驼峰命名法

### API 使用

```
  // 引入store
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  const dict = ref('');
  const handleDict = () => {
    let params = {
      dictTypes: ['gte4Phase', 'secretTerm'],
      appCodes: ['lz624-myworkspace'],
    };
    // 调用store中的方法
    useStore.xGetMoreDictEntryGroup(params).then((res) => {
      if (res.code === 0) {
        dict.value = res.data;
        message.success('This is a success message 字典');
      }
    });
  };

```

## Pinia 使用

### store 定义

```
// 引入pinia
import { defineStore } from 'pinia';
// 引入接口
import { getMoreDictEntryGroup } from '/@/api/user/index';
// 引入定义的类型
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  // 定义state
  state: (): UserState => ({
    user_name: 'kobe',
  }),
  // 定义getters
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  // 定义actions
  actions: {
    // 获取字典
    async xGetMoreDictEntryGroup(data: any) {
      const res = await getMoreDictEntryGroup(data);
      return res;
    },
    // 修改用户名
    changeUserName(params: string) {
      return (this.user_name = params);
    },
  },
});

```

### store 使用

```
  // 引入store
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  // 使用store的state
  const name = computed(() => userStore.user_name);
  const name = userStore.user_name;
  // 使用store的getters
  const profile = computed(() => userStore.userProfile);
  // 使用store的actions
  const handleChangeName = () => {
    // 第一种
    userStore.user_name = 'foo';
    // 第二种 推荐
    userStore.$patch((state) => {
      state.user_name = 'carlow';
    });
    // 第三种
    userStore.changeUserName('bar');
  };

```

## Router 使用

### vite-plugin-pages

vite-plugin-pages 插件配合 vue-router 来动态生成路由信息的插件,可以根据对应的文件结构来生成路由信息,不再需要手动的去配置路由

```
import Pages from 'vite-plugin-pages';
export const ConfigPagesPlugin = () => {
  return Pages({
    // views和pages目录下的文件都会自动生成路由
    pagesDir: [
      { dir: 'src/views', baseRoute: '' },
      { dir: 'src/pages', baseRoute: '' },
    ],
    extensions: ['vue', 'md'],
    exclude: ['**/components/*.vue'],
    nuxtStyle: true,
  });
};

```

### 使用

```
  // 加载content的index.vue组件
  <router-link to="/content">基础信息</router-link>
  // 加载login的index.vue组件
  <router-link to="/login">表单 FORM</router-link>
```

## 多组件库引入
### Vite 构建工具，使用 vite-plugin-style-import 和 unplugin-vue-components/vite 实现按需引入。

### 安装插件
```
yarn add vite-plugin-style-import -D
yarn add unplugin-vue-components/vite -D
```

### 使用组件库
在build/vite/plugins/component.ts下
```
import { ElementPlusResolver, VueUseComponentsResolver, AntDesignVueResolver,TDesignResolver,NaiveUiResolver } from 'unplugin-vue-components/resolvers';
...
resolvers: [
  ElementPlusResolver(),
  VueUseComponentsResolver(),
  AntDesignVueResolver(),
  TDesignResolver(),
  NaiveUiResolver()
]
...

```
### 不需要某个组件库
- 删除不需要的组件
- remove 不想要的组件的包依赖
- 删除build/vite/plugin/component下对应的resolvers