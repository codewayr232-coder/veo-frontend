import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Save, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../contexts/AppContext';

import { TokenModal } from '../common/TokenModal';

export const Navbar = () => {
    const { isAuthenticated, user, logout, currentProject, saveProject, isSaving } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[rgb(var(--color-bg-primary))]/80 backdrop-blur-md border-b border-[rgb(var(--color-border))]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Veo Generator</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/#features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Features</Link>
                        <Link to="/#how-it-works" className="text-sm font-medium text-secondary hover:text-primary transition-colors">How it Works</Link>
                        <Link to="/#pricing" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Pricing</Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsTokenModalOpen(true)} // You'll need to add this state
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] hover:border-primary-500 transition-colors"
                                >
                                    <span className="text-lg">💎</span>
                                    <span className="font-bold text-[rgb(var(--color-text-primary))]">{user?.tokens || 0}</span>
                                    <span className="text-xs text-secondary ml-1">Buy</span>
                                </button>
                                <span className="text-sm text-secondary">
                                    Hi, {user?.email?.split('@')[0]}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                >
                                    Log Out
                                </Button>
                                <Link to="/create">
                                    <Button size="sm" variant="accent">
                                        Open Studio
                                    </Button>
                                </Link>
                                <Link to="/profile" className="w-9 h-9 ml-2 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20 hover:scale-105 transition-transform">
                                    {user?.email?.[0].toUpperCase() || 'U'}
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Log In</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" size="sm">Start Creating</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <TokenModal
                        isOpen={isTokenModalOpen}
                        onClose={() => setIsTokenModalOpen(false)}
                    />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-secondary hover:text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[rgb(var(--color-bg-primary))] border-b border-[rgb(var(--color-border))]">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <Link to="/#features" className="block text-secondary hover:text-primary py-2">Features</Link>
                        <Link to="/#how-it-works" className="block text-secondary hover:text-primary py-2">How it Works</Link>
                        <Link to="/#pricing" className="block text-secondary hover:text-primary py-2">Pricing</Link>
                        <div className="h-px bg-[rgb(var(--color-border))]" />

                        {isAuthenticated ? (
                            <div className="space-y-4">
                                <div className="text-sm text-secondary">Signed in as {user?.email}</div>
                                <Link to="/create" className="block">
                                    <Button className="w-full" variant="accent">Open Studio</Button>
                                </Link>
                                <Button className="w-full" variant="outline" onClick={logout}>Log Out</Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Link to="/login" className="block">
                                    <Button className="w-full" variant="ghost">Log In</Button>
                                </Link>
                                <Link to="/signup" className="block">
                                    <Button className="w-full" variant="primary">Start Creating</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
