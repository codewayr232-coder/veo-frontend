import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
    label,
    error,
    helperText,
    options = [],
    className = '',
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
                <select
                    className={`
            w-full px-3 py-2 pr-10
            bg-[rgb(var(--color-bg-secondary))]
            border border-[rgb(var(--color-border))]
            rounded-lg
            text-[rgb(var(--color-text-primary))]
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all duration-200
            appearance-none
            cursor-pointer
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    {...props}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[rgb(var(--color-text-tertiary))]">
                    <ChevronDown className="w-4 h-4" />
                </div>
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
