import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';


/**
 * OrderPlaced Component
 * 
 * Props:
 * - orderId: string (optional) - The identifier for the placed order
 * - onContinue: () => void (optional) - Callback for "Continue Shopping" button
 */
export default function OrderPlaced({ orderId, onContinue }) {
    return (
        <div className='flex items-center justify-center h-[80vh] px-4'>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={clsx(
                    'bg-gradient-to-r',
                    'from-purple-100',
                    'via-pink-100',
                    'to-emerald-100',
                    'p-8',
                    'rounded-2xl',
                    'shadow-xl',
                    'max-w-md',
                    'mx-auto',
                    'text-center'
                )}
            >
                <FiCheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                <h2 className="mb-2 text-2xl font-bold text-gray-800">Order Placed!</h2>
                {orderId && (
                    <p className="mb-4 text-gray-600">
                        Your order <span className="font-mono">#{orderId}</span> has been successfully placed.
                    </p>
                )}
                <p className="mb-6 text-gray-600">
                    Thank you for shopping with us. We&rsquo;ll start processing your items right away.
                </p>
                <Link
                    to={'/product'}

                    className={clsx(
                        'inline-block',
                        'px-6',
                        'py-2',
                        'bg-gradient-to-r from-pink-500 to-purple-600',
                        'text-white',
                        'font-semibold',
                        'rounded-lg',
                        'shadow',
                        'hover:from-pink-600 hover:to-purple-700 transition',


                    )}
                >
                    Continue Shopping
                </Link>
            </motion.div>
        </div>
    );
}
