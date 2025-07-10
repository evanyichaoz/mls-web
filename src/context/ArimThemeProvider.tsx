'use client'
import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface ArimThemeProviderProps {
    children: ReactNode;
}

export const ArimThemeProvider: React.FC<ArimThemeProviderProps> = ({ children }) => {
    const theme = createTheme({
        typography: {
            fontFamily: '"Arima", "Roboto", sans-serif',  // 设置默认字体
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: '"Arima", sans-serif',
                        textTransform: 'none'
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};
