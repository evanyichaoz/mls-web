"use client"
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import LoginD from './LoginD';
import { Button } from '@mui/material';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    // 判断页面滚动的距离
    if (window.scrollY > 100) { // 距离页面顶部 100px 时触发吸顶
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 清理事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [open, setOpen] = React.useState(false);
  const { currentUser, userData, logout } = useAuth();
  const { showAlert } = useAlert()
  useEffect(() => {
    if (currentUser && userData) {
      showAlert('welcome ' + userData.firstName + ' ' + userData.lastName);
    }
  }, [currentUser, userData])
  const handleLoginOpen = () => {
    setOpen(true);
  };

  const handleLoginClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    showAlert('success logout');
  }

  return (
    <header className={`fixed w-full z-10 transition-all duration-500 ${isSticky ? 'top-0 bg-white shadow-md py-2' : 'top-auto py-4 bg-transparent'}`}>
      <div className='mx-auto pl-4 pr-4 flex'>
        <div className='w-1/5'>
          <div className={`text-[#b39f68] mb-1 pb-1 border-b-[2px] ${isSticky ? 'border-[#3d3d3d] text-[#b39f68]' : 'border-[#ffff] text-[#ffff]'} font-semibold`}>Sky Qui</div>
          <div className={`font-semibold ${isSticky ? 'text-[#b39f68]' : 'text-white'}`}>Broker</div>
        </div>
        <div className='flex-1 flex justify-end text-[14px] gap-4 h-[18px] items-center'>
          <a href={`tel:6478826789`} className={`flex items-center ${isSticky ? '' : 'text-white'}`}><i className="iconfont icon-phone mr-2" style={{ fontSize: '14px' }}></i>(647) 882-6789</a>
          <a href="mailto:canadaqiu@qq.com" className={`flex items-center ${isSticky ? '' : 'text-white'}`}><i className="iconfont icon-email mr-2" style={{ fontSize: '14px' }}></i>canadaqiu@qq.com</a>
          <div className={`flex items-center ${isSticky ? '' : 'text-white'}`}><i className={`iconfont icon-login ${userData ? 'mr-2' : 'mr-1'}`} style={{ fontSize: '14px' }}></i>
            {
              userData ? <div className="flex gap-1 text-[14px] items-center">
                {userData.firstName} {userData.lastName}
                <Button onClick={handleLogoutClick} size='small' sx={{
                  color: isSticky ? 'black' : 'white',
                  fontSize: '14px',
                  fontWeight: 'normal',
                }} >
                  Logout
                </Button>
              </div> :
                <Button onClick={handleLoginOpen} size='small' sx={{
                  color: isSticky ? 'black' : 'white',
                  fontSize: '14px',
                  fontWeight: 'normal',
                }}>
                  Login / Sign up
                </Button>
            }
          </div>
        </div>
      </div>
      {
        open ?
          <LoginD
            open={open}
            onClose={handleLoginClose}
          /> : null
      }
    </header >
  );
}

