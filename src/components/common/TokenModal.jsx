import React, { useState } from 'react';
import { CreditCard, Zap, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../contexts/AppContext';
import { api } from '../../services/api';

export const TokenModal = ({ isOpen, onClose }) => {
    const { user, updateTokens, showToast } = useApp();
    const [isProcessing, setIsProcessing] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePurchase = async () => {
        setIsProcessing(true);
        try {
            const res = await loadRazorpay();
            if (!res) {
                showToast('Razorpay SDK failed to load. Are you online?', 'error');
                return;
            }

            // 1. Create Order
            const orderResponse = await api.payment.createOrder();
            const { amount, orderId: order_id, currency, key_id } = orderResponse.data;

            // 2. Open Razorpay options
            const options = {
                key: key_id,
                amount: amount.toString(),
                currency: currency,
                name: 'Veo Generator',
                description: 'Creator Pack - 200 Tokens',
                order_id: order_id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        const verifyResponse = await api.payment.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        updateTokens(verifyResponse.data.tokens);
                        showToast('Payment successful! Tokens added. 🎉', 'success');
                        setTimeout(onClose, 1500);
                    } catch (error) {
                        console.error('Verification failed', error);
                        showToast('Payment verification failed. Please contact support.', 'error');
                    }
                },
                prefill: {
                    name: user?.email?.split('@')[0] || 'User',
                    email: user?.email || 'user@example.com',
                },
                theme: {
                    color: '#8b5cf6', // Primary color
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            // Handle payment failure/closure logic if needed?
            // Razorpay doesn't have a direct 'close' callback in standard options easily accessible here unless using 'modal.ondismiss'
            paymentObject.on('payment.failed', function (response) {
                showToast(response.error.description, 'error');
            });

        } catch (error) {
            console.error('Purchase flow failed:', error);
            showToast('Unable to initiate payment. Please try again.', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Get More Tokens"
            size="md"
        >
            <div className="text-center space-y-6">
                <div className="bg-[rgb(var(--color-bg-secondary))] p-6 rounded-xl border border-[rgb(var(--color-border))]">
                    <div className="text-secondary mb-2">Current Balance</div>
                    <div className="text-4xl font-bold gradient-text flex items-center justify-center gap-2">
                        <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        {user?.tokens || 0}
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-[rgb(var(--color-bg-primary))] p-6 rounded-xl border-2 border-primary-500 text-left">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-[rgb(var(--color-text-primary))]">Creator Pack</h3>
                                <p className="text-secondary text-sm">Best value for storytellers</p>
                            </div>
                            <div className="bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Popular
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-sm">200 AI Generation Tokens</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-sm">Generate ~10 full stories</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-sm">Priority Support</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--color-border))]">
                            <div className="text-2xl font-bold">₹25</div>
                            <Button
                                onClick={handlePurchase}
                                loading={isProcessing}
                                icon={CreditCard}
                                variant="primary"
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-tertiary">
                    Secure payment powered by Razorpay. One-time payment, no subscription.
                </p>
            </div>
        </Modal>
    );
};  
