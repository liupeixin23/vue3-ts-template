import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';
import 'ant-design-vue/es/message/style/css';
// 支持SVG
import 'virtual:svg-icons-register';
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App);
app.use(VXETable)
app.use(router);
app.use(piniaStore);
app.mount('#app');