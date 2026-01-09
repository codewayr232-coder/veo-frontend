import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Film, Clapperboard, Video, ArrowRight, Star, Zap } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useApp } from '../contexts/AppContext';

export const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useApp();

    const handleStartCreating = () => {
        if (isAuthenticated) {
            navigate('/projects');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] font-sans selection:bg-primary-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/hero-bg.png"
                        alt="Cinematic Movie Set"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[rgb(var(--color-bg-primary))]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-accent-400" />
                        <span className="text-sm font-medium text-white">AI-Powered Storytelling</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
                        Turn Your Ideas Into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Cinematic Reality</span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                        Generate professional film scripts, storyboards, and video prompts instantly.
                        The ultimate tool for creators, filmmakers, and dreamers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                        <button
                            onClick={handleStartCreating}
                            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            Start Creating for Free
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <a
                            href="#features"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold text-lg transition-all"
                        >
                            Explore Features
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Everything You Need</h2>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            From character creation to scene-by-scene direction, our AI handles the details so you can focus on the story.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Film}
                            title="Scene Breakdown"
                            description="Automatically generate detailed shots, camera angles, and durations for every scene."
                        />
                        <FeatureCard
                            icon={Clapperboard}
                            title="Character Consistency"
                            description="Keep your characters looking exactly the same across every shot and scene."
                        />
                        <FeatureCard
                            icon={Video}
                            title="Veo Integration"
                            description="One-click generation of optimized prompts ready for Veo and other AI video tools."
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-[rgb(var(--color-bg-secondary))] relative border-t border-[rgb(var(--color-border))]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Built for Modern Filmmakers</h2>
                        <p className="text-secondary text-lg mb-6 leading-relaxed">
                            We believe that everyone has a story to tell. Our mission is to democratize high-end production planning by putting the power of a Hollywood writers' room in your pocket.
                        </p>
                        <p className="text-secondary text-lg mb-8 leading-relaxed">
                            Whether you're creating for social media, indie films, or just for fun, Veo Generator streamlines the creative process from concept to execution.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <ListItem>Instant Script Generation</ListItem>
                            <ListItem>Smart Location Management</ListItem>
                            <ListItem>Multilingual Support</ListItem>
                        </ul>
                        <Link
                            to="/signup"
                            className="text-primary-500 font-bold hover:text-primary-400 flex items-center gap-2 group"
                        >
                            Join the Revolution <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-3xl"></div>
                        <div className="relative bg-[rgb(var(--color-bg-primary))] border border-[rgb(var(--color-border))] rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6 border-b border-[rgb(var(--color-border))] pb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                    <Star className="w-6 h-6 text-white leading-none" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Pro Studio Quality</h3>
                                    <p className="text-sm text-tertiary">Trusted by creators worldwide</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-3/4 bg-[rgb(var(--color-bg-tertiary))] rounded animate-pulse"></div>
                                <div className="h-2 w-full bg-[rgb(var(--color-bg-tertiary))] rounded animate-pulse delay-75"></div>
                                <div className="h-2 w-5/6 bg-[rgb(var(--color-bg-tertiary))] rounded animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] hover:border-primary-500/50 transition-colors group">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-primary-500" />
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{title}</h3>
        <p className="text-secondary leading-relaxed">{description}</p>
    </div>
);

const ListItem = ({ children }) => (
    <li className="flex items-center gap-3 text-secondary">
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3 h-3 text-green-500" />
        </div>
        {children}
    </li>
);
