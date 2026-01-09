import React from 'react';
import { motion } from 'framer-motion';

export const Toggle = ({
    label,
    checked,
    onChange,
    disabled = false,
    helperText,
    className = ''
}) => {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className="flex-1">
                {label && (
                    <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))]">
                        {label}
                    </label>
                )}
                {helperText && (
                    <p className="text-sm text-[rgb(var(--color-text-tertiary))] mt-0.5">{helperText}</p>
                )}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-dark-950
          ${checked ? 'bg-primary-600' : 'bg-dark-300 dark:bg-dark-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
            >
                <motion.span
                    className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
            transition-transform duration-200 ease-in-out
          `}
                    animate={{ x: checked ? 24 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );
};
