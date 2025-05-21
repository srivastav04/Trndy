// components/Toast.jsx
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import clsx from 'clsx';

export default function Toast({
    message,
    show,
    onClose,
    type = 'success',     // 'success' | 'error'
    duration = 3000,
}) {
    useEffect(() => {
        if (!show) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [show, onClose, duration]);

    // styling per type
    const isError = type === 'error';
    const borderColor = isError ? 'border-red-500' : 'border-green-500';
    const Icon = isError ? FaTimesCircle : FaCheckCircle;
    const iconColor = isError ? 'text-red-500' : 'text-green-500';

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className={clsx(
                        'fixed bottom-8 right-8 z-50',
                        'bg-white/90 backdrop-blur-sm',
                        'shadow-2xl rounded-lg p-4 flex items-center space-x-3 max-w-xs',
                        'border-l-4',
                        borderColor
                    )}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <Icon className={clsx(iconColor, 'text-2xl flex-shrink-0')} />
                    <span className="text-gray-800 font-medium">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
