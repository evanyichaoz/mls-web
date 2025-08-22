import admin from 'firebase-admin';
// 从环境变量中获取您的 Firebase 服务账号凭证
// 您需要在 .env.local 文件中设置这些变量
const serviceAccount = {
  projectId: process.env.MY_FIREBASE_PROJECT_ID,
  clientEmail: process.env.MY_FIREBASE_CLIENT_EMAIL,
  // private_key 中的换行符 \n 需要被正确处理
  privateKey: process.env.MY_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch (error: unknown) {
    const err = error as { stack?: string };
    console.error('Firebase admin initialization error', err.stack);
  }
}
export const db = admin.firestore();
export const authAdmin = admin.auth();