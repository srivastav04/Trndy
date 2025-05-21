import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Rating from './Rating'

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.12)' },
};

export default function ProductCard({ product }) {
    return (
        <motion.li
            className="list-none relative -z-0"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ duration: 0.3 }}
        >
            <Link to={`/product/${product._id}`} className="block overflow-hidden rounded-2xl">
                <div className="relative w-full h-56 overflow-hidden rounded-t-2xl ">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                    />
                </div>
                <div className="bg-purple-50 p-4 rounded-b-2xl flex flex-col h-56">
                    <h3 className="text-lg font-bold text-purple-800 mb-1 truncate">
                        {product.name}
                    </h3>
                    <p className="text-sm text-pink-600 mb-2 line-clamp-2 font-semibold">

                        {product.tagline}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">
                            ${product.price}
                        </span>
                        <Rating rating={product.rating} dimension="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.li>
    );
}
