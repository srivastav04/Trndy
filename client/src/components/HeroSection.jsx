// components/HeroSection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function HeroSection({
    title = 'Next-Gen Fashion',
    subtitle = 'Where advanced technology meets avant-garde design. Experience clothing engineered for the future.',
    ctaText = 'Explore Cyber Collection',
    ctaOnClick,
}) {
    const polygons = [
        { size: 200, color: 'from-purple-600 to-purple-400', top: '10%', left: '15%', delay: 0 },
        { size: 150, color: 'from-pink-500 to-pink-300', top: '20%', right: '10%', delay: 1 },
        { size: 250, color: 'from-emerald-400 to-emerald-200', bottom: '15%', left: '20%', delay: 2 },
        { size: 180, color: 'from-blue-400 to-blue-200', bottom: '10%', right: '15%', delay: 0.5 },
    ];

    return (
        <section className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-6 overflow-hidden">
            {/* Animated Polygons */}
            {polygons.map(({ size, color, top, bottom, left, right, delay }, i) => (
                <motion.div
                    key={i}
                    className={clsx(
                        'absolute bg-gradient-to-br opacity-20',
                        `bg-gradient-to-br ${color}`
                    )}
                    style={{
                        width: size,
                        height: size,
                        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                        top,
                        bottom,
                        left,
                        right,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.1, 1], opacity: [0, 0.3, 0.2] }}
                    transition={{
                        delay,
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12 relative z-20"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-emerald-600">
                        {title}
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </motion.div>

            <Link to="/product">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={ctaOnClick}
                    className={clsx(
                        'px-12 py-4 rounded-xl font-bold text-lg',
                        'bg-gradient-to-r from-purple-500 to-pink-500',
                        'text-white shadow-xl hover:shadow-2xl',
                        'transition-all duration-300 relative z-20'
                    )}
                >
                    {ctaText}
                </motion.button>
            </Link>
        </section>
    );
}


