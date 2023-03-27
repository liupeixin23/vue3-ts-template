import { ProxyOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;

const init: ProxyTargetList = {
  // test
  '/api': {
    target: 'http://120.46.143.248',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^\/api`), '/api'),
  },
  // mock
  '/bpi': {
    target: 'http://120.46.143.247',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^\/bpi/`), '/ppi'),
  },
};

export default init;
