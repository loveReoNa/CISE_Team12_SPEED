# SPEED 服务器演示指南

## 从零开始演示步骤

### 1. 启动服务器
在项目根目录（d:/CISE_SPEED/CISE_Team12_SPEED）中，运行以下命令：

```powershell
# 方法1：使用 npm 脚本（推荐）
cd backend
npm run start:simple

# 方法2：直接运行 Node.js
cd backend
node server.js
```

### 2. 验证服务器运行
成功启动后，终端将显示：
```
SPEED server is running on port 3000
Visit http://localhost:3000 to test the server
Health check available at http://localhost:3000/health
```

### 3. 测试端点

**方法A：使用浏览器**
- 打开浏览器访问：http://localhost:3000/
- 应该看到：`{"message":"SPEED server is running successfully."}`
- 访问：http://localhost:3000/health
- 应该看到：`{"status":"healthy","timestamp":"2025-11-13T07:23:00.000Z"}`

**方法B：使用 PowerShell 命令**
```powershell
# 测试根端点
Invoke-RestMethod -Uri "http://localhost:3000/" -Method Get

# 测试健康检查端点
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
```

**方法C：使用 curl（如果已安装）**
```bash
curl http://localhost:3000/
curl http://localhost:3000/health
```

### 4. 停止服务器
在运行服务器的终端中按 `Ctrl + C` 即可优雅关闭服务器。

## 快速演示命令序列

以下是完整的演示命令序列，可以逐行执行：

```powershell
# 1. 进入 backend 目录
cd backend

# 2. 启动服务器
npm run start:simple

# 3. 在另一个终端中测试（保持服务器运行）
# 测试根端点
Invoke-RestMethod -Uri "http://localhost:3000/" -Method Get

# 测试健康检查端点  
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get

# 4. 返回服务器终端按 Ctrl+C 停止
```

## 功能说明

- **根端点** (`/`): 返回服务器运行状态消息
- **健康检查** (`/health`): 返回服务器健康状态和当前时间戳
- **端口配置**: 默认端口3000，可通过环境变量 `PORT` 修改
- **错误处理**: 包含端口占用错误处理和优雅关闭功能

## 技术栈
- Node.js + Express.js
- 纯 JavaScript（无额外依赖）
- 遵循 RESTful API 设计原则