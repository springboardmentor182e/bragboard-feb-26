import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * ToastContext - Centralized toast notification system
 */
const ToastContext = createContext();

/**
 * ToastProvider - Wraps components to provide toast functionality
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const value = { toasts, showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

/**
 * useToastContext Hook - Access toast context
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
};

/**
 * Toast Container Component
 */
const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg
            animate-in slide-in-from-bottom-4 fade-in duration-300
            pointer-events-auto
            ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContext;
