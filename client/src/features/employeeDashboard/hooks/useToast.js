import { useToastContext } from "../context/ToastContext";

/**
 * useToast Hook - Simple toast notifications using ToastContext
 * @returns {Object} { showToast }
 */
export const useToast = () => {
  const { showToast } = useToastContext();
  return { showToast };
};

export default useToast;
