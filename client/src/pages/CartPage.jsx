import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import useStore from '../store';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import {
    getCart,
    getCartItems,
    updateCartItem,
    removeCartItem,
} from '../apiFunctions';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import EmptyComponent from '../components/EmptyComponent';

const fetchCartItems = async (userId) => {
    const cart = await getCart(userId);

    if (!cart) {
        return [];
    }
    const ids = cart.products.map((p) => p.productId).join(',');
    const products = await getCartItems(ids);
    return cart.products.map((item) => {
        const prod = products.find((p) => p._id === item.productId);
        return { ...prod, quantity: item.quantity };
    });
};


const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 },
};

export default function CartPage() {
    const userId = useStore((state) => state.userId);
    const queryClient = useQueryClient();
    const {
        data: items,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['cartItems', userId],
        queryFn: () => fetchCartItems(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });

    const updateMutation = useMutation({
        mutationFn: ({ productId, quantity }) =>
            updateCartItem(userId, productId, quantity),
        onMutate: async ({ productId, quantity }) => {
            await queryClient.cancelQueries(['cartItems', userId]);
            const previous = queryClient.getQueryData(['cartItems', userId]);
            queryClient.setQueryData(['cartItems', userId], (old) =>
                old.map((it) =>
                    it._id === productId ? { ...it, quantity } : it
                )
            );
            return { previous };
        },
        onError: (_, __, context) => {
            if (context?.previous) {
                queryClient.setQueryData(
                    ['cartItems', userId],
                    context.previous
                );
            }
        },
        onSettled: () =>
            queryClient.invalidateQueries(['cartItems', userId]),
    });

    const removeMutation = useMutation({
        mutationFn: (productId) => removeCartItem(userId, productId),
        onSuccess: () =>
            queryClient.invalidateQueries(['cartItems', userId]),
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorComponent message={error.message} path={'/product'} />
    if (!items || items.length === 0) return <EmptyComponent message={" Your cart is empty 🛒"} subMessage={"Start shopping to add items to your cart!"} />


    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8"
            >
                Your Cart
            </motion.h2>

            <div className="max-w-5xl mx-auto px-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item._id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className={clsx(
                                'flex flex-col sm:flex-row items-center justify-between',
                                'bg-white/40 backdrop-blur-md border border-white/30',
                                'rounded-2xl shadow-lg p-6 mb-6',
                                'hover:shadow-2xl transition-shadow duration-300'
                            )}
                        >
                            {/* Image & Info */}
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <motion.img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <div>
                                    <h3 className=" text-lg text-purple-800 font-bold">
                                        {item.name}
                                    </h3>
                                    <p className="text-emerald-500 font-semibold">
                                        $ {item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Quantity Controls & Delete */}
                            <div className="flex items-center mt-4 sm:mt-0 space-x-3">
                                <button
                                    onClick={() =>
                                        updateMutation.mutate({
                                            productId: item._id,
                                            quantity: item.quantity - 1,
                                        })
                                    }
                                    disabled={
                                        item.quantity <= 1 || updateMutation.isLoading
                                    }
                                    className={clsx(
                                        'w-6 h-6 flex items-center justify-center rounded-full',
                                        'text-gray-800 font-bold transition-all',
                                        item.quantity > 1 &&
                                            !updateMutation.isLoading
                                            ? 'bg-white/60 hover:bg-white/80'
                                            : 'opacity-50 cursor-not-allowed'
                                    )}
                                >
                                    <FaMinus />
                                </button>
                                <span className="text-lg font-medium text-gray-800">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        updateMutation.mutate({
                                            productId: item._id,
                                            quantity: item.quantity + 1,
                                        })
                                    }
                                    disabled={updateMutation.isLoading}
                                    className={clsx(
                                        'w-6 h-6 flex items-center justify-center rounded-full',
                                        'text-gray-800 font-bold transition-all',
                                        !updateMutation.isLoading
                                            ? 'bg-white/60 hover:bg-white/80'
                                            : 'opacity-50 cursor-not-allowed'
                                    )}
                                >
                                    <FaPlus />
                                </button>

                                <button
                                    onClick={() => removeMutation.mutate(item._id)}
                                    disabled={removeMutation.isPending}
                                    className={clsx(
                                        'p-2 rounded-lg transition-colors text-xl',
                                        removeMutation.isPending
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'text-red-600 hover:text-red-800'
                                    )}
                                >
                                    <FaTrash />
                                </button>


                                <motion.p
                                    className="ml-auto text-lg font-semibold text-gray-800"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    $ {(item.price * item.quantity).toFixed(2)}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Total & Checkout */}
                <motion.div
                    className="text-right mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Total: $ {total.toFixed(2)}
                    </h3>
                    <Link to="/checkout">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={clsx(
                                'px-8 py-3 rounded-full text-white font-semibold text-lg',
                                'bg-gradient-to-r from-purple-500 to-pink-500',
                                'shadow-md hover:shadow-lg transition-all duration-300'
                            )}
                        >
                            Proceed to Checkout
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
