"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations = {
  en: {
    // Header
    'login.signup': 'Login / Sign up',
    'logout': 'Logout',
    'welcome': 'Welcome',
    'language': 'Language',
    'english': 'English',
    'chinese': '中文',
    
    // Listing Grid
    'for.sale': 'For Sale',
    'sold': 'Sold',
    'asking.price': 'Asking price',
    'bedrooms': 'Bedrooms',
    'bathrooms': 'Bathrooms',
    'parking': 'Parking',
    
    // Common
    'delete': 'Delete',
    'confirm.delete': 'Are you sure you want to delete this listing?',
    'delete.success': 'Listing deleted successfully!',
    'delete.failed': 'Failed to delete listing:',
    'error.occurred': 'An error occurred. Please try again.',
    'must.login': 'You must be logged in to delete a listing.',
    'success.logout': 'Success logout',
    
    // Add Listing Dialog
    'add.listing': 'Add New Listing',
    'address': 'Address',
    'city': 'City',
    'province': 'Province',
    'postal.code': 'Postal Code',
    'price': 'Price',
    'bedrooms': 'Bedrooms',
    'bathrooms': 'Bathrooms',
    'parking': 'Parking',
    'upload.photo': 'Upload Photo',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'listing.added': 'Listing added successfully!',
    'failed.add': 'Failed to add listing:',
    
    // Contact Dialog
    'contact.us': 'Contact Us',
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'message': 'Message',
    'send': 'Send',
    'message.sent': 'Message sent successfully!',
    'failed.send': 'Failed to send message:',
    
    // Home Page
    'recently.listed': 'RECENTLY LISTED PROPERTIES',
    'recently.sold': 'RECENTLY SOLD PROPERTIES',
  },
  zh: {
    // Header
    'login.signup': '登录 / 注册',
    'logout': '退出登录',
    'welcome': '欢迎',
    'language': '语言',
    'english': 'English',
    'chinese': '中文',
    
    // Listing Grid
    'for.sale': '出售中',
    'sold': '已售',
    'asking.price': '要价',
    'bedrooms': '卧室',
    'bathrooms': '浴室',
    'parking': '停车位',
    
    // Common
    'delete': '删除',
    'confirm.delete': '您确定要删除这个房源吗？',
    'delete.success': '房源删除成功！',
    'delete.failed': '删除房源失败：',
    'error.occurred': '发生错误，请重试。',
    'must.login': '您必须登录才能删除房源。',
    'success.logout': '退出登录成功',
    
    // Add Listing Dialog
    'add.listing': '添加新房源',
    'address': '地址',
    'city': '城市',
    'province': '省份',
    'postal.code': '邮政编码',
    'price': '价格',
    'bedrooms': '卧室',
    'bathrooms': '浴室',
    'parking': '停车位',
    'upload.photo': '上传照片',
    'submit': '提交',
    'cancel': '取消',
    'listing.added': '房源添加成功！',
    'failed.add': '添加房源失败：',
    
    // Contact Dialog
    'contact.us': '联系我们',
    'name': '姓名',
    'email': '邮箱',
    'phone': '电话',
    'message': '消息',
    'send': '发送',
    'message.sent': '消息发送成功！',
    'failed.send': '发送消息失败：',
    
    // Home Page
    'recently.listed': '最新上市房源',
    'recently.sold': '最近售出房源',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // 从localStorage获取保存的语言设置
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
