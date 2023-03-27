<template>
  <div>
    <Header></Header>
    <!-- <Content></Content> -->
    <treeTable></treeTable>
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '/@/store/modules/app';
  import Header from '/@/views/header/index.vue';
  // import Content from '/@/views/content/index.vue';
  import treeTable from '/@/views/treeTable/index.vue';
  import { useRoute } from 'vue-router';
  import { setToken } from '/@/utils/auth';

  const appStore = useAppStore();
  // 获取路由参数并存到localStorage 里面
  const route = useRoute();
  setToken(route.query.tk as string);
  appStore.setToken(route.query.tk as string);
</script>

<style lang="less" scoped></style>
