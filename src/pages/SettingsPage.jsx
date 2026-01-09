import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { useApp } from '../contexts/AppContext';
import { Sun, Moon, Laptop, Type, Timer, Volume2, Save } from 'lucide-react';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
    const { theme, toggleTheme } = useApp();
    const [preferences, setPreferences] = useState({
        defaultDuration: '60',
        defaultStyle: 'Cinematic',
        notifications: true
    });

    const handleSave = () => {
        // Mock save
        alert('Settings saved!');
    };

    return (
        <div className="min-h-screen bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] pb-20">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 pt-24">
                <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
                <p className="text-secondary mb-10">Customize your workspace and preferences.</p>

                {/* Appearance */}
                <Section title="Appearance" icon={Sun}>
                    <div className="grid grid-cols-3 gap-4">
                        <ThemeCard
                            active={theme === 'light'}
                            onClick={theme === 'dark' ? toggleTheme : undefined}
                            icon={Sun}
                            label="Light"
                        />
                        <ThemeCard
                            active={theme === 'dark'}
                            onClick={theme === 'light' ? toggleTheme : undefined}
                            icon={Moon}
                            label="Dark"
                        />
                        <ThemeCard
                            active={false}
                            disabled
                            icon={Laptop}
                            label="System"
                        />
                    </div>
                </Section>

                {/* Editor Preferences */}
                <Section title="Editor Defaults" icon={Type}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">Default Video Duration</label>
                            <select
                                className="w-full bg-[rgb(var(--color-bg-primary))] border border-[rgb(var(--color-border))] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                value={preferences.defaultDuration}
                                onChange={(e) => setPreferences({ ...preferences, defaultDuration: e.target.value })}
                            >
                                <option value="15">15 Seconds (Shorts)</option>
                                <option value="30">30 Seconds (Commercial)</option>
                                <option value="60">60 Seconds (Trailer)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">Default Style</label>
                            <select
                                className="w-full bg-[rgb(var(--color-bg-primary))] border border-[rgb(var(--color-border))] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                value={preferences.defaultStyle}
                                onChange={(e) => setPreferences({ ...preferences, defaultStyle: e.target.value })}
                            >
                                <option value="Cinematic">Cinematic</option>
                                <option value="Anime">Anime</option>
                                <option value="Realistic">Photorealistic</option>
                            </select>
                        </div>
                    </div>
                </Section>

                <div className="flex justify-end pt-6">
                    <Button onClick={handleSave} icon={Save}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, icon: Icon, children }) => (
    <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
            <Icon className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-2xl p-6">
            {children}
        </div>
    </div>
);

const ThemeCard = ({ active, onClick, icon: Icon, label, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${active
                ? 'bg-primary-500/10 border-primary-500 text-primary-500'
                : 'border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-bg-tertiary))] text-secondary'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        <Icon className="w-6 h-6 mb-2" />
        <span className="text-sm font-medium">{label}</span>
    </button>
);
