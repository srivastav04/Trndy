import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

export default function HomePage() {
    const reviews = [
        {
            id: 0,
            user: 'John Doe',
            rating: 5,
            text: 'Absolutely loved this collection! High quality and innovative design.'
        },
        {
            id: 1,
            user: 'Dwight Schrute',
            rating: 4,
            text: 'Great quality and fast delivery. Will definitely shop again!'
        },
        {
            id: 2,
            user: 'Michael Scott',
            rating: 5,
            text: 'Stylish and comfortable—this brand never disappoints!'
        },
        {
            id: 3,
            user: 'Phil Dunphy',
            rating: 4,
            text: 'Very well-made pieces. Got lots of compliments wearing them.'
        },
        {
            id: 4,
            user: 'Jay Pritchett',
            rating: 5,
            text: 'Excellent craftsmanship and attention to detail. Worth every penny.'
        },
        {
            id: 5,
            user: 'Chandler Bing',
            rating: 4,
            text: 'Loved the modern vibe. Fits true to size and feels premium.'
        },
        {
            id: 6,
            user: 'Ted Mosby',
            rating: 5,
            text: 'Top-notch materials and unique designs. I’m impressed.'
        },
        {
            id: 7,
            user: 'Pam Beesly',
            rating: 4,
            text: 'Packaging was beautiful and the clothes feel luxurious.'
        },
        {
            id: 8,
            user: 'Clarie Dunphy',
            rating: 5,
            text: 'I’ve never felt more confident in an outfit. Amazing work!'
        },
        {
            id: 9,
            user: 'Rachael Green',
            rating: 5,
            text: 'From fabric to fit, everything is perfect. Highly recommended!'
        }
    ];

    const blobVariants = {
        animate: {
            scale: [1, 1.4, 1],
            rotate: [0, 50, 0],
            borderRadius: ['30%', '60%', '30%'],
            transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
        },
    };

    const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: custom => ({ opacity: 1, y: 0, transition: { delay: custom * 0.3, ease: 'easeOut' } }) };



    return (
        <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100 text-gray-800">

            {/* Animated Blobs */}
            <motion.div
                className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 opacity-20"
                variants={blobVariants}
                animate="animate"
            />
            <motion.div
                className="absolute -top-20 -right-20 w-80 h-80 bg-pink-300 opacity-20"
                variants={blobVariants}
                animate="animate"
            />

            <motion.div
                className="absolute top-100 -right-20 w-60 h-60 bg-blue-300 opacity-20"
                variants={blobVariants}
                animate="animate"
            />
            <motion.div
                className="absolute top-110 -left-10 w-60 h-60 bg-red-300 opacity-20"
                variants={blobVariants}
                animate="animate"
            />


            {/* Wavy background element */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full h-40"
                viewBox="0 0 1440 320"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                transition={{ duration: 5, repeat: Infinity, yoyo: true, ease: 'easeInOut' }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#fff"
                    fillOpacity="1"
                    d="M0,96L60,112C120,128,240,160,360,144C480,128,600,64,720,74.7C840,85,960,171,1080,202.7C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </motion.svg>

            {/* Hero */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-20 px-4">
                <motion.h1 custom={0} variants={fadeIn} initial="hidden" animate="visible" className="text-6xl sm:text-8xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent p-4 font-bold">
                    Trndy
                </motion.h1>
                <motion.p custom={1} variants={fadeIn} initial="hidden" animate="visible" className="text-xl sm:text-2xl max-w-2xl mb-8 text-purple-600 font-semibold">
                    Seamlessly blending technology with style to redefine your wardrobe experience.
                </motion.p>
                <Link to="/signup">
                    <motion.button
                        custom={2}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-2xl"
                    >
                        Get Started
                    </motion.button>
                </Link>
            </section>

            {/* Showcase Strip */}
            <section className="relative z-10 overflow-hidden py-12">
                <div className="whitespace-nowrap animate-scroll px-4 space-x-8">
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            className="p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100 backdrop-blur-md rounded-2xl shadow-md flex flex-col text-wrap w-[300px]"
                            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }}
                        >
                            <div className="flex items-center mb-2">
                                <span className="font-semibold text-purple-800">{r.user}</span>
                            </div>
                            <Rating rating={r.rating} dimension={'w-4 h-4'} />
                            <p className="text-pink-600 flex-1 mt-2">"{r.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <motion.footer
                className="relative z-10 bg-white/20 backdrop-blur-lg py-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="max-w-3xl mx-auto text-center text-gray-700">
                    <p>© {new Date().getFullYear()} Future Fashion. All rights reserved.</p>
                </div>
            </motion.footer>
        </div>
    );
}
