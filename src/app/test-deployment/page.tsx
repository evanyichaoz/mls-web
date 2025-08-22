export default function TestDeploymentPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">部署测试页面</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold text-green-800">✅ 前端环境变量</h2>
            <div className="text-sm text-green-700 mt-2">
              <p>Firebase Project ID: {process.env.NEXT_PUBLIC_PROJECT_ID ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>Firebase API Key: {process.env.NEXT_PUBLIC_API_KEY ? '✅ 已配置' : '❌ 未配置'}</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="font-semibold text-blue-800">🔧 后端环境变量</h2>
            <div className="text-sm text-blue-700 mt-2">
              <p>Firebase Admin Project ID: {process.env.MY_FIREBASE_PROJECT_ID ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>Firebase Admin Client Email: {process.env.MY_FIREBASE_CLIENT_EMAIL ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>Firebase Admin Private Key: {process.env.MY_FIREBASE_PRIVATE_KEY ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>Admin Email: {process.env.ADMIN_EMAIL ? '✅ 已配置' : '❌ 未配置'}</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h2 className="font-semibold text-yellow-800">📧 邮件服务</h2>
            <div className="text-sm text-yellow-700 mt-2">
              <p>Gmail User: {process.env.GMAIL_USER ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>Gmail Pass: {process.env.GMAIL_PASS ? '✅ 已配置' : '❌ 未配置'}</p>
            </div>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded">
            <h2 className="font-semibold text-purple-800">🖼️ ImageKit 配置</h2>
            <div className="text-sm text-purple-700 mt-2">
              <p>ImageKit Public Key: {process.env.IMAGEKIT_PUBLIC_KEY ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>ImageKit Private Key: {process.env.IMAGEKIT_PRIVATE_KEY ? '✅ 已配置' : '❌ 未配置'}</p>
              <p>ImageKit URL Endpoint: {process.env.IMAGEKIT_URL_ENDPOINT ? '✅ 已配置' : '❌ 未配置'}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
            <h2 className="font-semibold text-gray-800">📋 部署状态</h2>
            <div className="text-sm text-gray-700 mt-2">
              <p>构建时间: {new Date().toLocaleString()}</p>
              <p>环境: {process.env.NODE_ENV}</p>
              <p>Vercel: {process.env.VERCEL ? '✅ 是' : '❌ 否'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
