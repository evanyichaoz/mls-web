import admin from 'firebase-admin';

// 检查是否在服务器环境中
const isServer = typeof window === 'undefined';

// 从环境变量中获取您的 Firebase 服务账号凭证
const serviceAccount = {
  projectId: process.env.MY_FIREBASE_PROJECT_ID,
  clientEmail: process.env.MY_FIREBASE_CLIENT_EMAIL,
  // private_key 中的换行符 \n 需要被正确处理
  privateKey: process.env.MY_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// 只在服务器环境中初始化Firebase Admin
if (isServer && !admin.apps.length) {
  try {
    // 检查必要的环境变量是否存在
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      console.warn('Firebase Admin environment variables are not set. Admin features will not work.');
      // 不抛出错误，让应用继续运行
    } else {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
      console.log('Firebase Admin initialized successfully');
    }
  } catch (error: unknown) {
    const err = error as { stack?: string };
    console.error('Firebase admin initialization error', err.stack);
    // 不抛出错误，让应用继续运行
  }
}

// 导出数据库和认证实例，如果初始化失败则导出undefined
export const db = admin.apps.length > 0 ? admin.firestore() : undefined;
export const authAdmin = admin.apps.length > 0 ? admin.auth() : undefined;