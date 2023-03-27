<template>
  <header>
    <div class="header">
      <a-menu v-model:selectedKeys="current" mode="horizontal" class="h-full menu">
        <a-menu-item key="app">
          <template #icon>
            <mail-outlined />
          </template>
          <router-link to="/content">基础信息</router-link>
        </a-menu-item>
        <a-menu-item key="info">
          <template #icon>
            <appstore-outlined />
          </template>
          <a href="https://note.youdao.com/s/12BPxyAw" target="_blank" rel="noopener noreferrer">使用说明</a>
        </a-menu-item>
        <a-sub-menu key="components">
          <template #icon>
            <setting-outlined />
          </template>
          <template #title>组件使用</template>
          <a-menu-item-group title="基础组件">
            <a-menu-item key="form">
              <router-link to="/login">表单 FORM</router-link>
            </a-menu-item>
            <a-menu-item key="table">
              <router-link to="/table">表格 TABLE</router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
  const current = ref<string[]>(['app']);
</script>

<style lang="less" scoped>
  .header {
    height: 64px;
    background-color: aquamarine;
    .menu {
      line-height: 64px;
    }
  }
</style>
