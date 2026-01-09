import React from 'react';

export const Input = ({
    label,
    error,
    helperText,
    className = '',
    icon: Icon,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-tertiary))]">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <input
                    className={`
            w-full px-3 py-2 ${Icon ? 'pl-10' : ''}
            bg-[rgb(var(--color-bg-secondary))]
            border border-[rgb(var(--color-border))]
            rounded-lg
            text-[rgb(var(--color-text-primary))]
            placeholder:text-[rgb(var(--color-text-tertiary))]
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1 text-sm text-[rgb(var(--color-text-tertiary))]">{helperText}</p>
            )}
        </div>
    );
};
