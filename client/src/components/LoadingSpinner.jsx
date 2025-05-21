import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100 backdrop-blur-2xl">
            <div className="relative w-24 h-24">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: '3px solid transparent',
                        background: 'conic-gradient(from 45deg at 50% 50%, #c084fc, #f9a8d4, #6ee7b7, #c084fc)',
                        boxShadow: '0 0 20px rgba(192, 132, 252, 0.6), 0 0 40px rgba(249, 168, 212, 0.5)'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                />

                {/* Inner Ring */}
                <motion.div
                    className="absolute inset-3 rounded-full"
                    style={{
                        border: '2px solid transparent',
                        background: 'conic-gradient(from -45deg at 50% 50%, #f9a8d4, #6ee7b7, #c084fc, #f9a8d4)',
                        boxShadow: '0 0 14px rgba(249, 168, 212, 0.5), 0 0 28px rgba(110, 231, 183, 0.4)'
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                />

                {/* Central Pulse */}
                <motion.div
                    className="absolute inset-6 rounded-full bg-purple-100"
                    style={{ boxShadow: '0 0 16px rgba(192, 132, 252, 0.8)' }}
                    animate={{ scale: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                />
            </div>
        </div>
    );
}