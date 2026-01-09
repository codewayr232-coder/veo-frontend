import React, { useState } from 'react';
import { Sun, Moon, Sparkles, History, Settings, Trash2, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../common/Button';
import { Tooltip } from '../common/Tooltip';

export const Header = ({ onVersionHistoryClick, onGenerateStory }) => {
    const { theme, toggleTheme, clearAllStory } = useApp();

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to delete ALL characters, locations, and scenes? This action cannot be undone.')) {
            clearAllStory();
        }
    };

    return (
        <header className="h-16 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] px-6 flex items-center justify-between sticky top-0 z-30">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold gradient-text">Cinematic Story Generator</h1>
                    <p className="text-xs text-tertiary">AI-Powered Video Creation</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Tooltip content="Delete all story data">
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={handleClearAll}
                        className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                    >
                    </Button>
                </Tooltip>

                <div className="w-px h-6 bg-[rgb(var(--color-border))] mx-1"></div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[rgb(var(--color-bg-secondary))] rounded-lg border border-[rgb(var(--color-border))] mr-2">
                    <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{useApp().user?.tokens || 0}</span>
                </div>

                <Tooltip content="Generate story with AI">
                    <Button
                        variant="accent"
                        size="sm"
                        icon={Sparkles}
                        onClick={onGenerateStory}
                    >
                        Generate Story
                    </Button>
                </Tooltip>

                <div className="w-px h-6 bg-[rgb(var(--color-border))] mx-1"></div>

                <Tooltip content={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors flex items-center justify-center"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-yellow-500" />
                        ) : (
                            <Moon className="w-5 h-5 text-primary-600" />
                        )}
                    </button>
                </Tooltip>

                <Tooltip content="Settings">
                    <a href="/settings" className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors flex items-center justify-center">
                        <Settings className="w-5 h-5" />
                    </a>
                </Tooltip>

                <Tooltip content="Profile">
                    <a href="/profile" className="w-9 h-9 ml-2 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20 hover:scale-105 transition-transform">
                        {useApp().user?.email?.[0].toUpperCase() || 'U'}
                    </a>
                </Tooltip>
            </div>
        </header>
    );
};
