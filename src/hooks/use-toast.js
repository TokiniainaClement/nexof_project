import { useState } from 'react';

let toastCount = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, action, ...props }) => {
    const id = ++toastCount;
    const newToast = { id, title, description, action, ...props };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    return id;
  };

  const dismiss = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, toast, dismiss };
}

export { toast } from './use-toast';