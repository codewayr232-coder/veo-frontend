import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white dark:bg-dark-600 dark:hover:bg-dark-500',
    accent: 'bg-accent-500 hover:bg-accent-600 text-dark-950 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent hover:bg-dark-100 dark:hover:bg-dark-800 text-[rgb(var(--color-text-primary))]',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    outline: 'bg-transparent border-2 border-primary-500 hover:bg-primary-500/10 text-primary-600 dark:text-primary-400',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-950';

    return (
        <motion.button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
                </>
            )}
        </motion.button>
    );
};
