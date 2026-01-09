import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { api } from '../services/api';
import { Sparkles, Mail, Calendar, Zap, Clock, Receipt, User } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
    const { user, logout } = useApp();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.payment.getHistory();
                setHistory(response.data);
            } catch (error) {
                console.error('Failed to load history', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-primary))] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] pb-20">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-24">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h1 className="text-3xl font-bold gradient-text">Creator Profile</h1>
                    <Button variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => { logout(); navigate('/'); }}>
                        Sign Out
                    </Button>
                </div>

                {/* User Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Info */}
                    <div className="md:col-span-2 p-6 rounded-2xl bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] flex items-start gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary-500/20">
                            {user.email[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1">Creator</h2>
                            <div className="flex items-center gap-2 text-secondary text-sm mb-4">
                                <Mail className="w-4 h-4" />
                                {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-tertiary text-xs">
                                <Calendar className="w-3 h-3" />
                                Member since {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* Tokens */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap className="w-24 h-24" />
                        </div>
                        <div className="text-yellow-500 font-bold text-sm uppercase tracking-wide mb-1">Available Balance</div>
                        <div className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                            <Zap className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                            {user.tokens}
                        </div>
                        <Button size="sm" variant="accent" onClick={() => navigate('/projects')}>
                            Use Tokens
                        </Button>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-[rgb(var(--color-border))] flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-primary-500" />
                        <h3 className="font-bold text-lg">Transaction History</h3>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-secondary">Loading history...</div>
                    ) : history.length === 0 ? (
                        <div className="p-12 text-center text-secondary">
                            No transactions yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[rgb(var(--color-bg-tertiary))] text-xs uppercase text-tertiary">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Description</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Order ID</th>
                                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[rgb(var(--color-border))]">
                                    {history.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-[rgb(var(--color-bg-tertiary))]/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-secondary">
                                                {new Date(tx.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-white flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                                                    <Zap className="w-3 h-3 text-primary-500 fill-primary-500" />
                                                </div>
                                                {tx.tokens_added} Tokens
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${tx.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                        tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                            'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-tertiary">
                                                {tx.razorpay_order_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-white text-right">
                                                ₹{tx.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
