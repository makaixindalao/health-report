# 健康体检报告 H5 应用

一个基于Vue 3和Vite构建的现代化健康体检报告H5应用，提供美观直观的体检结果展示和健康建议。

[English](#english-version) | 中文

> 注：预览图片需要在项目根目录添加preview.png文件

## 项目概述

本项目是一个高大上的H5体检报告页面，用于展示用户的体检结果和健康建议。应用采用现代化UI设计，包括卡片式布局、动态图表和交互式组件，为用户提供良好的视觉体验和使用体验。

## 功能特点

- **基本信息展示**：显示用户姓名、性别、年龄和检测时间等基本信息
- **系统健康概览**：以卡片形式展示各系统健康状况，包括呼吸系统、感觉系统等
- **系统详情查看**：点击系统卡片可查看详细检测结果和健康建议
- **健康建议**：提供饮食、运动、生活习惯等方面的健康建议
- **食物和矿物质推荐**：根据检测结果推荐适合的食物和矿物质
- **响应式设计**：适配不同屏幕尺寸，提供良好的移动端体验

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **UI组件**：自定义组件
- **图表库**：ECharts
- **样式处理**：CSS3（渐变、动画、弹性布局等）
- **数据获取**：Fetch API

## 安装步骤

1. 克隆项目到本地

   ```bash
   git clone <repository-url>
   cd health-report
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 启动开发服务器

   ```bash
   npm run dev
   ```

4. 构建生产版本

   ```bash
   npm run build
   ```

## 项目结构

```plaintext
health-report/
├── public/                 # 静态资源
│   └── report-data.json    # 体检报告数据
├── src/                    # 源代码
│   ├── assets/             # 资源文件
│   ├── components/         # 组件
│   │   └── report/         # 报告相关组件
│   │       ├── CoverPage.vue           # 封面页组件
│   │       ├── HealthSuggestion.vue    # 健康建议组件
│   │       ├── ReportPage.vue          # 报告主页组件
│   │       ├── SystemDetail.vue        # 系统详情组件
│   │       └── SystemDetailDialog.vue  # 系统详情对话框组件
│   ├── App.vue             # 应用入口组件
│   └── main.js             # 应用入口文件
├── index.html              # HTML模板
├── package.json            # 项目配置
└── vite.config.js          # Vite配置
```

## 数据格式

应用使用JSON格式的数据，包含以下主要部分：

- 基本信息（姓名、性别、年龄、检测时间）
- 器官能量图
- 各系统检测结果（呼吸系统、感觉系统等）
- 微生物和寄生虫检测结果
- 食物和矿物质推荐

## 自定义配置

如需自定义配置，请修改`vite.config.js`文件：

```javascript
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,        // 监听所有地址
    port: 5173,        // 指定端口
    strictPort: false, // 如果端口被占用，尝试下一个可用端口
    open: true,        // 启动时自动打开浏览器
    cors: true,        // 启用CORS
  }
})
```

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器 (iOS Safari, Android Chrome)

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

[MIT](LICENSE)

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 电子邮件：[makaixindalao@163.com](makaixindalao@163.com)
- 项目Issues：[GitHub Issues](https://github.com/makaixindalao/health-report/issues)

---

## English Version

A modern health examination report H5 application built with Vue 3 and Vite, providing beautiful and intuitive display of examination results and health advice.

[English](#english-version) | [中文](#健康体检报告-h5-应用)

## Project Overview

This project is a sophisticated H5 health examination report page for displaying user's examination results and health advice. The application adopts modern UI design, including card layout, dynamic charts, and interactive components, providing users with a good visual and user experience.

## Features

- **Basic Information Display**: Shows user's name, gender, age, and examination time
- **System Health Overview**: Displays health status of various systems in card form, including respiratory system, sensory system, etc.
- **System Details View**: Click on system cards to view detailed examination results and health advice
- **Health Suggestions**: Provides advice on diet, exercise, lifestyle, etc.
- **Food and Mineral Recommendations**: Recommends suitable foods and minerals based on examination results
- **Responsive Design**: Adapts to different screen sizes, providing a good mobile experience

## Technology Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **UI Components**: Custom components
- **Chart Library**: ECharts
- **Style Processing**: CSS3 (gradients, animations, flex layout, etc.)
- **Data Fetching**: Fetch API

## Installation Steps

1. Clone the project locally

   ```bash
   git clone <repository-url>
   cd health-report
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Build for production

   ```bash
   npm run build
   ```

## License

[MIT](LICENSE)

## Contact

If you have any questions or suggestions, please contact us through:

- Email: [makaixindalao@163.com](mailto:makaixindalao@163.com)
- Project Issues: [GitHub Issues](https://github.com/makaixindalao/health-report/issues)
