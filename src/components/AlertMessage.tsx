"use client"

import React, { useEffect } from 'react';
import { Alert, Button } from "@mui/material";
import { useAlert } from '@/context/AlertContext';

const AlertMessage: React.FC = () => {
  const { alert } = useAlert();
  const [isShow, setIsShow] = React.useState(false);
  useEffect(() => {
    if (!alert) {
      setIsShow(false);
      return;
    }
    setIsShow(true);
    const timer = setTimeout(() => {
      setIsShow(false);
    }, alert.duration);

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div style={{ top: '40px', right: '10px', position: 'absolute' }}>
      {alert && isShow && (
        <Alert severity="success">
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default AlertMessage;
