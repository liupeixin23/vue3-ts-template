<template>
  <div class="login-form-wrapper">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="账号" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="handleDict">字典接口</a-button>
    <a-button type="primary" @click="handleHistory">历史记录接口</a-button>
    <a-button type="primary" @click="handleDetail">详情接口</a-button>
    <a-button type="primary" @click="handleAppList">应用列表接口</a-button>
    <div>字典：{{ dict }}</div>
    <div>历史记录：{{ history }}</div>
    <div>详情：{{ detail }}</div>
    <div>应用列表：{{ appList }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const useStore = useUserStore();
  const router = useRouter();
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = (values: any) => {
    message.success('This is a success message');
    router.push('/');
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('This is a error message');
    console.log('Failed:', errorInfo);
  };

  // 字典接口测试
  const dict = ref('');
  const handleDict = () => {
    let params = {
      dictTypes: ['gte4Phase', 'secretTerm'],
      appCodes: ['lz624-myworkspace', 'lz624-msgbom', 'lz624-library', 'lz624-document'],
    };
    useStore.xGetMoreDictEntryGroup(params).then((res) => {
      if (res.code === 0) {
        dict.value = res.data;
        message.success('This is a success message 字典');
      }
    });
  };
  // 历史记录接口测试
  const history = ref('');
  const handleHistory = () => {
    let params = { bomView: 'DOCUMENTBOM' };
    useStore.xGetHistory(params).then((res) => {
      if (res.code === 0) {
        history.value = res.data;
        message.success('This is a success message 历史记录');
      }
    });
  };
  // 详情接口测试
  const detail = ref('');
  const handleDetail = () => {
    useStore.xGetBomDetail().then((res) => {
      if (res.code === 0) {
        detail.value = res.data;
        message.success('This is a success message 详情');
      }
    });
  };
  // 应用列表接口测试
  const appList = ref('');
  const handleAppList = () => {
    let params = { groupId: 'all' };
    useStore.xGetApplication(params).then((res) => {
      if (res.code === 0) {
        appList.value = res.data;
        message.success('This is a success message 应用列表');
      }
    });
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 500px;
      margin: 50px auto;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
