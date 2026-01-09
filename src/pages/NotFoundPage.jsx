import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))]">
            <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
            <p className="text-xl text-secondary mb-8">Page not found</p>
            <Link
                to="/"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};
