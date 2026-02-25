import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook custom per gestire toast notifications
 * @returns {Object} { toast, showToast, hideToast }
 */
export const useToast = () => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info',
  });

  const toastTimeoutRef = useRef(null);

  /**
   * Mostra un toast notification
   * @param {string} message - Messaggio da mostrare
   * @param {string} type - Tipo di toast (success, error, warning, info)
   * @param {number} duration - Durata visibilità in ms
   */
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    // Pulizia timeout precedente
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    // Mostra il nuovo toast
    setToast({
      visible: true,
      message,
      type,
    });

    // Auto-hide dopo duration
    toastTimeoutRef.current = setTimeout(() => {
      hideToast();
    }, duration);
  }, [hideToast]);

  /**
   * Nasconde il toast notification
   */
  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      visible: false,
    }));

    // Pulizia timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
  }, []);

  // Cleanup su unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
};
