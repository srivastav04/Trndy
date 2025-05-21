import React from 'react';
import { motion } from 'framer-motion';
import store from '../store';
export default function OrderCard({ order }) {
    const total = order[0].reduce((sum, item) => sum + item.price * item.quantity, 0);
    const userId = store((state) => state.userId);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-6"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-gray-600">User</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {userId}
                    </p>
                </div>

                <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-md font-semibold text-gray-800">
                        {order[1]}
                    </p>
                </div>

            </div>
            <div
                className="space-y-3 overflow-y-auto"
                style={{ maxHeight: '10rem' }}
            >
                {order[0].map(item => (
                    <div key={item._id} className="flex items-center space-x-4">
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                            <p className="font-bold text-pink-600">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-emerald-500">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            {/* footer stays at bottom */}
            <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center">
                <p className="text-lg font-extrabold text-gray-800">Total</p>
                <p className="text-lg font-extrabold text-gray-800">${total.toFixed(2)}</p>
            </div>
        </motion.div>
    );
}
