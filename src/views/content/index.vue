<template>
  <div class="content">
    <a-descriptions bordered title="一个开箱即用的Vue3后台模板">
      <a-descriptions-item label="Vue版本">Vue3</a-descriptions-item>
      <a-descriptions-item label="构建工具">Vite</a-descriptions-item>
      <a-descriptions-item label="状态管理">Pinia</a-descriptions-item>
      <a-descriptions-item label="语言">TS</a-descriptions-item>
      <a-descriptions-item label="组件库"> Ant Design Vue</a-descriptions-item>
      <a-descriptions-item label="事件总线">Mitt</a-descriptions-item>
    </a-descriptions>
    <a-button type="primary" @click="handleChangeName"> 修改名字 </a-button>
    {{ userStore.user_name }}
    <n-button type="primary"> Primary </n-button>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  const handleChangeName = () => {
    // 第一种
    // userStore.user_name = 'foo';
    // 第二种 推荐
    userStore.$patch((state) => {
      state.user_name = 'carlow';
    });
    // 第三种
    // userStore.changeUserName('bar');
  };
  console.log(userStore.user_name);
</script>

<style lang="less" scoped>
  .content {
    padding: 20px;
    height: 100vh;
    background-color: #fff;
  }
</style>
