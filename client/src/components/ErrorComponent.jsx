import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertOctagon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function ErrorComponent({ message, path }) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-300 via-red-400 to-red-500">
            {/* Dark Overlay */}
            <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Error Container */}
            <motion.div
                className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 max-w-lg w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.div
                    className="mb-6"
                    initial={{ rotate: -15, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FiAlertOctagon size={80} className="text-red-500 drop-shadow-xl" />
                </motion.div>

                <motion.h1
                    className="text-7xl font-black text-red-500 mb-4"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                    Error
                </motion.h1>

                <motion.p
                    className="text-xl text-white mb-8 text-center max-w-prose"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {message || "Oops, something didn't go as planned. Please try again or return home."}
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(path || '/product')}
                    className="px-8 py-3 rounded-full font-bold bg-gradient-to-r from-red-600 to-red-400 text-white shadow-2xl hover:from-red-400 hover:to-red-700 transition"
                >
                    Continue
                </motion.button>
            </motion.div>
        </div>
    );
}