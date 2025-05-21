import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { userSignUp } from '../apiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Login() {
    const navigate = useNavigate();
    const setuserId = useStore((s) => s.setuserId);
    const [errorMsg, setErrorMsg] = useState(null);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { mutate, isLoading } = useMutation({
        mutationFn: () => userSignUp(userName, password),
        onSuccess: () => {
            setuserId(userName);
            navigate('/product');
        },
        onError: (error) => {
            setErrorMsg(error.response?.data?.message || 'Something went wrong');
        },
    });

    if (isLoading) return <LoadingSpinner />;


    const onSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(null);
        mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100 p-4">
            <motion.div
                className="relative w-full max-w-md bg-gradient-to-br from-purple-200 via-pink-200 to-emerald-200 backdrop-blur-lg rounded-2xl shadow-xl p-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Sign Up</h2>
                <form onSubmit={onSubmit} className="space-y-4" >
                    <div className="relative">
                        <input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Username"
                            className="w-full px-4 py-2 rounded-lg bg-white/30 focus:bg-white/50 transition text-purple-900 font-semibold"
                        />
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg bg-white/30 focus:bg-white/50 transition text-purple-900 font-semibold"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        className={clsx(
                            'mt-6 w-full py-3 rounded-full font-bold text-base sm:text-lg uppercase',
                            'bg-gradient-to-r from-pink-500 to-purple-600',
                            'tracking-wide hover:from-pink-600 hover:to-purple-700 transition text-white'
                        )}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </motion.button>
                </form>
                <p className="mt-4 text-sm text-center text-pink-600 relative z-20 font-semibold">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-400 hover:underline">
                        Login
                    </Link>
                </p>

                {errorMsg && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-full max-w-xs bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <p className="text-purple-800 font-semibold mb-4">{errorMsg}</p>
                            <button
                                onClick={() => setErrorMsg(null)}
                                className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold uppercase transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}





