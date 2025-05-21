import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { getProductById, addToCart } from '../apiFunctions';
import useStore from '../store';
import Rating from '../components/Rating';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductPage() {
    const { productId } = useParams();
    const userId = useStore((s) => s.userId);
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success',
    });

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const queryClient = useQueryClient();

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
    });

    const { mutate: addToCartMutate, isPending } = useMutation({
        mutationFn: () => addToCart(userId, [{ productId, quantity: 1 }]),
        onSuccess: () => {
            triggerToast('Product added to cart!', 'success');
            queryClient.invalidateQueries(['cartItems', userId]);
        },
        onError: () => {
            triggerToast('Failed to add to cart. Please try again.', 'error');
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorPage message={error.message} path="/product" />;
    return (
        <motion.div
            className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
        >
            {/* Image */}
            <motion.div
                className="rounded-3xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
            >
                <img src={product.images[0]} alt={product.name} className="w-full h-96 object-contain" />
            </motion.div>

            {/* Details & Add Button */}
            <div className="flex flex-col justify-between">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-purple-700">
                        {product.name}
                    </h1>
                    <p className="text-pink-700 text-lg font-semibold">
                        {product.tagline}
                    </p>

                    <p className="text-gray-800 leading-relaxed font-medium">
                        {product.description}
                    </p>
                    <div className="flex w-full items-center justify-between">
                        <span className="text-3xl font-bold text-emerald-500">
                            ${product.price}
                        </span>
                        <Rating rating={product.rating} dimension="w-6 h-6" />
                    </div>
                </div>


                <motion.button
                    onClick={() => addToCartMutate()}
                    disabled={isPending}
                    whileTap={{ scale: 0.97 }}
                    className={clsx(
                        'mt-6 w-full py-3 rounded-full text-lg font-semibold transition',
                        isPending
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:brightness-120"

                    )}
                >
                    {isPending ? 'Adding...' : 'Add to Cart'}
                </motion.button>
                <Toast
                    message={toast.message}
                    show={toast.show}
                    type={toast.type}
                    onClose={() => setToast(tv => ({ ...tv, show: false }))}
                />
            </div>
        </motion.div>
    );
}
