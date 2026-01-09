import React from 'react';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[rgb(var(--color-bg-secondary))] border-t border-[rgb(var(--color-border))] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold gradient-text">Veo Generator</span>
                        </div>
                        <p className="text-secondary mb-6 max-w-sm">
                            Transform your stories into cinematic masterpieces with our AI-powered video prompt generation platform.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-tertiary hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-tertiary hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-tertiary hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-[rgb(var(--color-text-primary))]">Product</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">Showcase</a></li>
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-[rgb(var(--color-text-primary))]">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="text-secondary hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[rgb(var(--color-border))] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-tertiary">
                    <p>&copy; {new Date().getFullYear()} Veo Generator. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
