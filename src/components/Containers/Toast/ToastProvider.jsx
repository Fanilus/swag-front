import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './ToastContext';
import { Toast } from './Toast';
import { generateUEID } from '../../../lib/lib';
import { SwagToastWrapper } from './styled';

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState([]);
  const open = (content) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), content },
    ]);
  const close = (id) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <SwagToastWrapper>
          {toasts.map((toast) => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </SwagToastWrapper>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
