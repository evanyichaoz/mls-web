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
    
    // Carousel
    'what.is.your.home.worth': 'What is Your Home Worth?',
    'find.out.worth': 'Find out what your home can be worth today',
    'get.started': 'Get Started',
    
    // Broker Info
    'broker.name': 'Sky Qui',
    'broker.title': 'Real Estate Broker',
    
    // Footer
    'location': 'Toronto, Ontario',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'all.rights.reserved': 'All rights reserved.',
    
    // Broker Description
    'broker.description.1': 'As a passionate and dedicated real estate professional, I am committed to helping clients find their dream homes and make sound investment decisions. With 20 years of experience in the industry, I pride myself on providing personalized services and expert guidance tailored to each individual\'s needs.',
    'broker.description.2': 'Whether you\'re buying, selling, or renting, my goal is to make the process as smooth and stress-free as possible. Real estate is not just about properties; it\'s about the people who live in them. I strive to ensure you feel confident, informed, and supported every step of the way.',
    'broker.description.3': 'I look forward to working with you and helping you achieve your real estate goals. Let\'s turn your property dreams into reality!',
    
    // Mid Content Section
    'real.estate.done.right': 'REAL ESTATE DONE RIGHT',
    'first.time.buyer.question': 'ARE YOU A FIRST TIME HOME BUYER? ARE YOU LOOKING TO SELL?',
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
    
    // Carousel
    'what.is.your.home.worth': '您的房子值多少钱？',
    'find.out.worth': '立即了解您房子的当前价值',
    'get.started': '开始评估',
    
    // Broker Info
    'broker.name': '邱天',
    'broker.title': '房地产经纪人',
    
    // Footer
    'location': '多伦多，安大略省',
    'footer.phone': '电话',
    'footer.email': '邮箱',
    'all.rights.reserved': '版权所有。',
    
    // Broker Description
    'broker.description.1': '作为一名充满热情且专业的房地产经纪人，我致力于帮助客户找到理想的居所并做出明智的投资决策。凭借20年的行业经验，我以提供个性化服务和专业指导为荣，为每位客户量身定制解决方案。',
    'broker.description.2': '无论您是购买、出售还是租赁房产，我的目标都是让整个过程尽可能顺利且无压力。房地产不仅仅是关于房产本身，更是关于居住在其中的人们。我努力确保您在每一步都感到自信、知情并得到支持。',
    'broker.description.3': '我期待与您合作，帮助您实现房地产目标。让我们将您的房产梦想变为现实！',
    
    // Mid Content Section
    'real.estate.done.right': '专业房地产服务',
    'first.time.buyer.question': '您是首次购房者吗？您想要出售房产吗？',
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
    return (translations[language] as Record<string, string>)[key] || key;
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
