import React, { useEffect, useRef } from 'react';

export const Textarea = ({
    label,
    error,
    helperText,
    autoResize = false,
    maxLength,
    showCount = false,
    className = '',
    value,
    onChange,
    ...props
}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value, autoResize]);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1.5">
                    {label}
                </label>
            )}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`
          w-full px-3 py-2
          bg-[rgb(var(--color-bg-secondary))]
          border border-[rgb(var(--color-border))]
          rounded-lg
          text-[rgb(var(--color-text-primary))]
          placeholder:text-[rgb(var(--color-text-tertiary))]
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          resize-none
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
                {...props}
            />
            <div className="flex justify-between items-center mt-1">
                <div className="flex-1">
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                    {helperText && !error && (
                        <p className="text-sm text-[rgb(var(--color-text-tertiary))]">{helperText}</p>
                    )}
                </div>
                {showCount && maxLength && (
                    <span className="text-sm text-[rgb(var(--color-text-tertiary))]">
                        {value?.length || 0} / {maxLength}
                    </span>
                )}
            </div>
        </div>
    );
};
