import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const toastIcons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
};

const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-dark-950',
};

export const Toast = ({ message, type, onClose }) => {
    const Icon = toastIcons[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
        ${toastStyles[type]}
        min-w-[300px] max-w-md
      `}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="p-1 hover:bg-black/10 rounded transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const ToastContainer = () => {
    const { toasts, showToast } = useApp();

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => {
                            // Remove toast immediately
                            const updatedToasts = toasts.filter(t => t.id !== toast.id);
                            // This will be handled by context, but we can trigger removal
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
