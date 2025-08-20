"use client"
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import LoginD from './LoginD';
import { Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Box, Divider, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [open, setOpen] = React.useState(false);
  const { currentUser, userData, logout } = useAuth();
  const { showAlert } = useAlert()
  useEffect(() => {
    if (currentUser && userData?.firstName) {
      showAlert('welcome ' + userData.firstName + ' ' + (userData.lastName || ''));
    }
  }, [currentUser, userData, showAlert])
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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }} role="presentation">
      <div className='py-2 px-4'>
        <div className={`text-[#b39f68] mb-1 pb-1 border-b-[2px] border-[#3d3d3d] font-semibold`}>Sky Qui</div>
        <div className={`font-semibold text-black`}>Broker</div>
      </div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="tel:6478826789">
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="(647) 882-6789" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="mailto:canadaqiu@qq.com">
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="canadaqiu@qq.com" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {userData ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={`Logout (${userData.firstName})`} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLoginOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login / Sign up" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <header className={`fixed w-full z-10 transition-all duration-500 ${isSticky ? 'top-0 bg-white shadow-md py-2' : 'top-auto py-4 bg-transparent'}`}>
      <div className='mx-auto px-4'>
        <div className='flex items-center justify-between'>
          {/* Brand */}
          <div>
            <div className={`text-[#b39f68] mb-1 pb-1 border-b-[2px] ${isSticky ? 'border-[#3d3d3d] text-[#b39f68]' : 'border-[#ffff] text-[#ffff]'} font-semibold`}>Sky Qui</div>
            <div className={`font-semibold ${isSticky ? 'text-[#b39f68]' : 'text-white'}`}>Broker</div>
          </div>

          {/* Desktop Nav */}
          <div className='hidden md:flex flex-1 justify-end text-[14px] gap-4 items-center'>
            <a href={`tel:6478826789`} className={`flex items-center gap-1 ${isSticky ? '' : 'text-white'}`}>
              <PhoneIcon sx={{ fontSize: '16px' }} />
              (647) 882-6789
            </a>
            <a href="mailto:canadaqiu@qq.com" className={`flex items-center gap-1 ${isSticky ? '' : 'text-white'}`}>
              <EmailIcon sx={{ fontSize: '16px' }} />
              canadaqiu@qq.com
            </a>
            <div className={`flex items-center ${isSticky ? '' : 'text-white'}`}>
              {userData ? (
                <div className="flex gap-1 text-[14px] items-center">
                  {userData.firstName} {userData.lastName}
                  <Button onClick={handleLogoutClick} size='small' sx={{
                    color: isSticky ? 'black' : 'white',
                    fontSize: '14px',
                    fontWeight: 'normal',
                  }} >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLoginOpen}
                  size='small'
                  startIcon={<LoginIcon />}
                  sx={{ color: isSticky ? 'black' : 'white', fontSize: '14px', fontWeight: 'normal', textTransform: 'none', '& .MuiButton-startIcon': { marginRight: '4px' } }}
                >
                  Login / Sign up
                </Button>
              )}
            </div>
          </div>

                  {/* Mobile-only Contact Info */}
        <div className={`md:hidden flex justify-center items-center gap-x-4 text-xs pt-2 ${isSticky ? 'text-gray-700' : 'hidden'}`}>
            <a href={`tel:6478826789`} className={`flex items-center gap-1`}>
                <PhoneIcon sx={{ fontSize: '14px' }} />
                (647) 882-6789
            </a>
            <a href="mailto:canadaqiu@qq.com" className={`flex items-center gap-1`}>
                <EmailIcon sx={{ fontSize: '14px' }} />
                canadaqiu@qq.com
            </a>
        </div>

          {/* Mobile Nav - Hamburger */}
          <div className="md:hidden">
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: isSticky ? 'black' : 'white' }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>

      </div>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>

      <LoginD
        open={open}
        onClose={handleLoginClose}
      />
    </header >
  );
}
