import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // 监听所有地址，包括localhost、127.0.0.1和自定义域名
    port: 5173, // 使用不同的端口，避免冲突
    strictPort: false, // 如果端口被占用，尝试下一个可用端口
    open: true, // 启动时自动打开浏览器
    cors: true, // 启用CORS
    proxy: {
      // 如果需要代理API请求，可以在这里配置
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'test.makaixin.com'
    ]
  }
})
