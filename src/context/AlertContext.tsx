'use client'
import React, { createContext, useContext, useState, ReactNode, useCallback  } from 'react';

interface AlertState {
    message: string;
    duration: number;
}

interface AlertContextType {
    alert: AlertState | null;
    showAlert: (message: string, duration?: number) => void;
    hideAlert: () => void;
}

interface AlertProviderProps {
    children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlertContext must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alert, setAlert] = useState<AlertState | null>(null);

    const showAlert = useCallback((message: string, duration = 3000) => {
        setAlert({ message, duration });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert(null);
    }, []);

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
