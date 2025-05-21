// src/pages/ProductContainer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../apiFunctions';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import LoadingSpinner from '../components/LoadingSpinner';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const categories = [
    'all',
    't-shirt',
    'shirt',
    'pants',
    'cap',
    'watch',
    'women clothing',
];

export default function ProductContainer() {
    const [page, setPage] = useState(1);
    const limit = 12;
    const [category, setCategory] = useState('all');
    const [searchParams, setSearchParams] = useSearchParams();

    // Sync category from URL
    useEffect(() => {
        const cat = searchParams.get('category') || 'all';
        setCategory(cat);
        setPage(1);
    }, [searchParams]);

    const { data, isLoading, isError, error, isPreviousData } = useQuery({
        queryKey: ['products', page, category],
        queryFn: () => getProducts(page, limit, category === 'all' ? '' : category),
        keepPreviousData: true,
        onSuccess: (data) => {
            console.log("Successful");
        },
        onError: (error) => {
            console.error('Error fetching products:', error);
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorPage message={error.message} path="/product" />;
    const { products, pages } = data;

    const handleCategoryChange = (e) => {
        const cat = e.target.value;
        setSearchParams({ category: cat });
    };

    return (
        <div className="w-auto mx-2 px-6 py-10">
            {/* <h2 className="text-3xl font-extrabold text-purple-700 mb-6">Featured Fashion</h2> */}

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap items-center space-x-4">
                <label htmlFor="category" className="text-xl text-purple-700 font-semibold">
                    Filter:
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur-md border border-purple-300 text-purple-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat} className="text-purple-800 font-semibold">
                            {cat === 'women-clothing' ? 'Women Clothing' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

            </div>

            <motion.ul
                className={clsx(
                    'grid gap-6',
                    'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                )}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {products && products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                ))}
            </motion.ul>
            <div className="flex justify-center items-center mt-10 space-x-4">
                <button
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={page === 1}
                    className={clsx(
                        "flex items-center px-4 py-2 font-medium rounded-lg transition",
                        page === 1
                            ? "bg-gray-200 cursor-not-allowed text-gray-500"
                            : "bg-purple-800 hover:bg-purple-600 text-white"
                    )}
                >
                    <HiChevronLeft className="w-5 h-5 mr-1" />
                    Prev
                </button>

                <span className="text-purple-800">
                    Page <strong>{page}</strong> of <strong>{pages}</strong>
                </span>

                <button
                    onClick={() => {
                        if (page < pages) setPage(old => old + 1);
                    }}
                    disabled={page === pages || isPreviousData}
                    className={clsx(
                        "flex items-center px-4 py-2 font-medium rounded-lg transition",
                        page === pages
                            ? "bg-gray-200 cursor-not-allowed text-gray-500"
                            : "bg-purple-600 hover:bg-purple-800 text-white"
                    )}
                >
                    Next
                    <HiChevronRight className="w-5 h-5 ml-1" />
                </button>
            </div>

        </div>
    );
}




