import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { useApp } from '../contexts/AppContext';

export const SignupPage = () => {
    const navigate = useNavigate();
    const { showToast } = useApp();
    const [step, setStep] = useState('signup'); // 'signup' | 'verify'
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // Note: Backend doesn't store name yet, but we collect it
    const [otp, setOtp] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.auth.signup(email, password);
            showToast('Signup successful! Please check your email for OTP.', 'success');
            setStep('verify');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.auth.verify(email, otp);
            showToast('Email verified successfully! You can now login.', 'success');
            navigate('/login');
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
                <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-primary-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-accent-900/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 md:order-2 flex flex-col justify-center p-8 md:p-16 z-10 relative bg-[rgb(var(--color-bg-primary))]/80 backdrop-blur-sm md:bg-transparent">
                <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="max-w-md w-full mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Veo Generator</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-2 text-[rgb(var(--color-text-primary))]">
                        {step === 'signup' ? 'Create Account' : 'Verify Email'}
                    </h1>
                    <p className="text-secondary mb-8">
                        {step === 'signup'
                            ? 'Start your journey to cinematic storytelling.'
                            : `We sent a 6-digit code to ${email}`}
                    </p>

                    {step === 'signup' ? (
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border))] rounded-lg py-3 pl-10 pr-4 text-[rgb(var(--color-text-primary))] placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>
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
                                            minLength={6}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-3 text-lg" variant="accent" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">One-Time Password (OTP)</label>
                                <div className="relative">
                                    <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border))] rounded-lg py-3 pl-10 pr-4 text-[rgb(var(--color-text-primary))] placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all tracking-widest text-lg"
                                        placeholder="123456"
                                        required
                                        maxLength={6}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full py-3 text-lg" variant="accent" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep('signup')}
                                className="w-full text-center text-secondary hover:text-primary text-sm"
                            >
                                Incorrect email? Go back
                            </button>
                        </form>
                    )}

                    {step === 'signup' && (
                        <p className="mt-8 text-center text-secondary">
                            Already have an account? <Link to="/login" className="text-primary-500 font-bold hover:text-primary-400">Log in</Link>
                        </p>
                    )}
                </div>
            </div>

            {/* Left Side - Image/Visual */}
            <div className="hidden md:block w-1/2 md:order-1 relative bg-black border-r border-[rgb(var(--color-border))]">
                <img
                    src="/assets/hero-bg.png"
                    alt="Cinematic Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-bg-primary))] via-transparent to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-center p-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Join the Community</h2>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                        Connect with thousands of creators who are pushing the boundaries of AI storytelling. Access exclusive features, save unlimited projects, and export to Veo with ease.
                    </p>
                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-3xl font-bold text-primary-400">10k+</span>
                            <span className="text-sm text-gray-400">Stories Created</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-3xl font-bold text-accent-400">1M+</span>
                            <span className="text-sm text-gray-400">Shots Generated</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
