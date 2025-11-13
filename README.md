# SPEED (Software Practice Empirical Evidence Database)

基于证据的软件工程实践研究平台，使用 NestJS 后端和 React 前端构建。

## 功能特性

- 🔍 **搜索和浏览证据** - 通过关键词、年份和主题过滤搜索软件工程实践证据
- 📄 **证据详情显示** - 查看证据的完整信息，包括方法、结论和摘要
- 📱 **响应式设计** - 在手机和桌面设备上都能获得良好的体验
- 🧭 **直观导航** - 使用 React Router 实现页面间的流畅导航

## 技术栈

### 后端
- NestJS
- TypeScript
- RESTful API
- CORS 支持

### 前端
- React 19
- React Router DOM
- Axios
- CSS3 (响应式设计)

## 快速开始

### 1. 启动后端服务

```bash
cd backend
npm install
npm start
```

后端服务将在 http://localhost:3000 运行

### 2. 启动前端服务

```bash
cd frontend
npm install
npm start
```

前端服务将在 http://localhost:3001 运行

### 3. 访问应用

打开浏览器访问 http://localhost:3001 即可使用 SPEED 应用。

## 项目结构

```
SPEED/
├── backend/                 # NestJS 后端
│   ├── src/
│   │   ├── evidence/        # 证据相关模块
│   │   │   ├── evidence.controller.ts
│   │   │   └── evidence.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
└── frontend/                # React 前端
    ├── src/
    │   ├── components/      # 可复用组件
    │   │   ├── Navbar.js
    │   │   └── Navbar.css
    │   ├── pages/           # 页面组件
    │   │   ├── HomePage.js
    │   │   ├── SearchPage.js
    │   │   ├── EvidenceDetailPage.js
    │   │   ├── AboutPage.js
    │   │   └── *.css
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## API 端点

### 搜索证据
- **GET** `/api/evidence`
- **查询参数**: 
  - `query` (可选): 搜索关键词
  - `year` (可选): 发表年份
  - `topic` (可选): 主题过滤

### 获取证据详情
- **GET** `/api/evidence/:id`

## 模拟数据

项目包含 5 个软件工程实践相关的模拟证据，涵盖：
- 敏捷开发
- 测试驱动开发
- 持续集成
- 代码审查
- 结对编程

## 开发说明

- 使用模拟数据，无需连接真实数据库
- 前端通过 CORS 与后端通信
- 包含基本的错误处理
- 响应式设计支持移动设备

## 许可证

本项目仅供演示使用。