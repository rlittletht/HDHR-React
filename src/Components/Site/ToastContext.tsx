import React, { ReactNode } from 'react';

export interface ToastContextType
{
    dispatchToast: (content: ReactNode, options?: any | undefined) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);
