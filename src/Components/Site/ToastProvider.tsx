import React, { ReactNode } from 'react';
import { Toaster, useToastController, useId } from '@fluentui/react-components';

import { ToastContext } from './ToastContext';

export interface ToastProviderProps
{
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) =>
{
    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);

    return (
        <ToastContext.Provider value={{ dispatchToast }}>
            {children}
            <Toaster toasterId={ toasterId }/>
        </ToastContext.Provider>
    );
};