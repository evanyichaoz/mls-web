# Vercel 部署指南

## 环境变量配置

在Vercel上部署时，你需要在项目设置中配置以下环境变量：

### Firebase 客户端配置 (前端)
这些变量用于客户端Firebase配置：

- `NEXT_PUBLIC_API_KEY` - Firebase API Key
- `NEXT_PUBLIC_AUTH_DOMAIN` - Firebase Auth Domain
- `NEXT_PUBLIC_PROJECT_ID` - Firebase Project ID
- `NEXT_PUBLIC_STORAGE_BUCKET` - Firebase Storage Bucket
- `NEXT_PUBLIC_MESSAGING_SENDER_ID` - Firebase Messaging Sender ID
- `NEXT_PUBLIC_APP_ID` - Firebase App ID
- `NEXT_PUBLIC_MEASUREMENT_ID` - Firebase Analytics Measurement ID (可选)

### Firebase Admin 配置 (后端)
这些变量用于服务器端Firebase Admin：

- `MY_FIREBASE_PROJECT_ID` - Firebase Project ID
- `MY_FIREBASE_CLIENT_EMAIL` - Firebase Service Account Client Email
- `MY_FIREBASE_PRIVATE_KEY` - Firebase Service Account Private Key
- `ADMIN_EMAIL` - 管理员邮箱地址

### 邮件服务配置
- `GMAIL_USER` - Gmail邮箱地址
- `GMAIL_PASS` - Gmail应用专用密码

### ImageKit 配置
- `IMAGEKIT_PUBLIC_KEY` - ImageKit Public Key
- `IMAGEKIT_PRIVATE_KEY` - ImageKit Private Key
- `IMAGEKIT_URL_ENDPOINT` - ImageKit URL Endpoint

## 获取Firebase配置

1. 登录 [Firebase Console](https://console.firebase.google.com/)
2. 选择你的项目
3. 点击项目设置 (齿轮图标)
4. 在"常规"标签页中找到"你的应用"部分
5. 复制Web应用的配置信息

## 获取Firebase Service Account

1. 在Firebase Console中，转到"项目设置"
2. 点击"服务账户"标签页
3. 点击"生成新的私钥"
4. 下载JSON文件
5. 从JSON文件中提取以下值：
   - `project_id` → `MY_FIREBASE_PROJECT_ID`
   - `client_email` → `MY_FIREBASE_CLIENT_EMAIL`
   - `private_key` → `MY_FIREBASE_PRIVATE_KEY`

## 在Vercel中配置环境变量

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击"Settings"标签页
4. 点击"Environment Variables"
5. 添加上述所有环境变量
6. 确保选择正确的环境 (Production, Preview, Development)

## 重要注意事项

1. **Private Key格式**: `MY_FIREBASE_PRIVATE_KEY` 应该包含完整的私钥，包括 `-----BEGIN PRIVATE KEY-----` 和 `-----END PRIVATE KEY-----`
2. **换行符**: 私钥中的换行符会被自动处理
3. **安全性**: 所有环境变量在Vercel中都是加密存储的
4. **重新部署**: 添加环境变量后，需要重新部署项目

## 验证部署

部署成功后，你可以通过以下方式验证：

1. 访问你的Vercel域名
2. 检查浏览器控制台是否有错误
3. 测试API端点是否正常工作
4. 检查Vercel函数日志是否有错误信息

## 常见问题

### Firebase Admin初始化错误
如果看到 "Service account object must contain a string 'project_id' property" 错误：
- 检查 `MY_FIREBASE_PROJECT_ID` 是否正确设置
- 确保所有Firebase Admin环境变量都已配置

### 构建失败
如果构建过程中出现错误：
- 检查所有必需的环境变量是否已设置
- 查看Vercel构建日志获取详细错误信息
- 确保代码中没有硬编码的配置值

### API端点返回500错误
如果API端点返回服务器错误：
- 检查Firebase Admin环境变量
- 查看Vercel函数日志
- 确保数据库权限配置正确
