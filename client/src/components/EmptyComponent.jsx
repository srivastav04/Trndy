import { motion } from "framer-motion";


export default function EmptyComponent({ message, subMessage }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-gray-700 mb-4"
            >
                {message}
            </motion.h2>
            <p className="text-gray-600 text-lg">{subMessage}</p>
        </div>
    );
}


