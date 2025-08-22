"use client"
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react'
import LoginD from './LoginD';
import { Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Box, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);


  const { language, setLanguage, t } = useLanguage();
  const { currentUser, userData, logout } = useAuth();
  const { showAlert } = useAlert();

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
  
  useEffect(() => {
    if (currentUser && userData?.firstName) {
      showAlert(t('welcome') + ' ' + userData.firstName + ' ' + (userData.lastName || ''));
    }
  }, [currentUser, userData, showAlert, t])
  
  const handleLoginOpen = () => {
    setOpen(true);
  };

  const handleLoginClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    showAlert(t('success.logout'));
  }

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'zh') => {
    setLanguage(newLanguage);
    handleLanguageMenuClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }} role="presentation">
      <div className='py-2 px-4'>
        <div className={`text-[#b39f68] mb-1 pb-1 border-b-[2px] border-[#3d3d3d] font-semibold`}>{t('broker.name')}</div>
        <div className={`font-semibold text-black`}>{t('broker.title')}</div>
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
                   <ListItem disablePadding>
            <ListItemButton onClick={() => handleLanguageChange(language === 'en' ? 'zh' : 'en')}>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={language === 'en' ? '中文' :  'English'} />
            </ListItemButton>
          </ListItem>
         <Divider />
         {userData ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={`${t('logout')} (${userData.firstName})`} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLoginOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={t('login.signup')} />
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
          <div className={`${!isSticky ? 'hidden md:block' : ''}`}>
            <div className={`text-[#b39f68] mb-1 pb-1 border-b-[2px] ${isSticky ? 'border-[#3d3d3d] text-[#b39f68]' : 'border-[#ffff] text-[#ffff]'} font-semibold text-xs sm:text-base`}>{t('broker.name')}</div>
            <div className={`font-semibold ${isSticky ? 'text-[#b39f68]' : 'text-white'} text-xs sm:text-base`}>{t('broker.title')}</div>
          </div>

          {/* Spacer for mobile when brand is hidden */}
          <div className={`${!isSticky ? 'block md:hidden' : 'hidden'}`}></div>

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
            
            {/* Language Switcher */}
            <div className={`flex items-center ${isSticky ? '' : 'text-white'}`}>
              <Button
                onClick={handleLanguageMenuOpen}
                size='small'
                startIcon={<LanguageIcon />}
                sx={{ 
                  color: isSticky ? 'black' : 'white', 
                  fontSize: '14px', 
                  fontWeight: 'normal', 
                  textTransform: 'none',
                  minWidth: 'auto',
                  padding: '4px 8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="text-center pt-1">{language === 'en' ? 'EN' : '中'}</span>
              </Button>
              <Menu
                anchorEl={languageMenuAnchor}
                open={Boolean(languageMenuAnchor)}
                onClose={handleLanguageMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleLanguageChange('en')}>
                  {t('english')}
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('zh')}>
                  {t('chinese')}
                </MenuItem>
              </Menu>
            </div>
            
            <div className={`flex items-center ${isSticky ? '' : 'text-white'}`}>
              {userData ? (
                <div className="flex gap-1 text-[14px] items-center">
                  {userData.firstName} {userData.lastName}
                  <Button onClick={handleLogoutClick} size='small' sx={{
                    color: isSticky ? 'black' : 'white',
                    fontSize: '14px',
                    fontWeight: 'normal',
                  }} >
                    {t('logout')}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLoginOpen}
                  size='small'
                  startIcon={<LoginIcon />}
                  sx={{ color: isSticky ? 'black' : 'white', fontSize: '14px', fontWeight: 'normal', textTransform: 'none', '& .MuiButton-startIcon': { marginRight: '4px' } }}
                >
                  {t('login.signup')}
                </Button>
              )}
            </div>
          </div>

                  {/* Mobile-only Contact Info */}
        <div className={`md:hidden flex justify-center items-center gap-x-4 text-xs pt-2 ${isSticky ? 'text-gray-700' : 'hidden'}`}>
            <a href={`tel:6478826789`} className={`flex items-center gap-1`}>
                <PhoneIcon sx={{ fontSize: '12px' }} />
                (647) 882-6789
            </a>
            <a href="mailto:canadaqiu@qq.com" className={`flex items-center gap-1`}>
                <EmailIcon sx={{ fontSize: '12px' }} />
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
