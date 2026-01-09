import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Mail, Lock } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { useApp } from '../contexts/AppContext';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login, showToast } = useApp();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.auth.login(email, password);
            login(response.token, response.user);
            navigate('/projects');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(var(--color-bg-primary))] flex relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-accent-900/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 z-10 relative">
                <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="max-w-md w-full mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Veo Generator</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-2 text-[rgb(var(--color-text-primary))]">Welcome Back</h1>
                    <p className="text-secondary mb-8">Enter your details to continue your journey.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border))] rounded-lg py-3 pl-10 pr-4 text-[rgb(var(--color-text-primary))] placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border))] rounded-lg py-3 pl-10 pr-4 text-[rgb(var(--color-text-primary))] placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-secondary">
                                <input type="checkbox" className="rounded border-[rgb(var(--color-border))] text-primary-600 focus:ring-primary-500 bg-[rgb(var(--color-bg-tertiary))]" />
                                Remember me
                            </label>
                            <a href="#" className="text-primary-500 hover:text-primary-400 font-medium">Forgot password?</a>
                        </div>

                        <Button type="submit" className="w-full py-3 text-lg" variant="accent" disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <div className="relative flex items-center gap-4 py-4">
                            <div className="flex-grow h-px bg-[rgb(var(--color-border))]"></div>
                            <span className="text-xs text-tertiary uppercase">Or continue with</span>
                            <div className="flex-grow h-px bg-[rgb(var(--color-border))]"></div>
                        </div>

                        <button type="button" className="w-full py-3 border border-[rgb(var(--color-border))] rounded-lg hover:bg-[rgb(var(--color-bg-secondary))] transition-colors flex items-center justify-center gap-2 text-secondary font-medium">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            Sign in with Google
                        </button>
                    </form>

                    <p className="mt-8 text-center text-secondary">
                        Don't have an account? <Link to="/signup" className="text-primary-500 font-bold hover:text-primary-400">Sign up</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Visual */}
            <div className="hidden md:block w-1/2 relative bg-black">
                <img
                    src="/assets/hero-bg.png"
                    alt="Cinematic Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[rgb(var(--color-bg-primary))] to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-16 pb-24">
                    <blockquote className="text-2xl font-medium text-white max-w-lg leading-relaxed mb-4">
                        "The most powerful person in the world is the storyteller. The storyteller sets the vision, values and agenda of an entire generation that is to come."
                    </blockquote>
                    <cite className="text-primary-400 font-bold not-italic">— Steve Jobs</cite>
                </div>
            </div>
        </div>
    );
};
