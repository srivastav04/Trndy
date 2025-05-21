import clsx from 'clsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useStore from '../store';
import {
    getCart,
    getCartItems,
    placeorder
} from '../apiFunctions';
import OrderPlaced from '../components/OrderPlaced';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';

export default function CheckoutPage() {
    const userId = useStore((state) => state.userId);
    console.log

    const fetchCartItems = async (userId) => {
        const cart = await getCart(userId);
        const ids = cart.products.map((p) => p.productId).join(',');
        const products = await getCartItems(ids);
        return cart.products.map((item) => {
            const prod = products.find((p) => p._id === item.productId);
            return { ...prod, quantity: item.quantity };
        });
    };

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

    const orderMutation = useMutation({
        mutationFn: () => placeorder({ userId, items }),
        onError: (error) => {
            console.error("Error sending email:", error);
        },
    });

    if (orderMutation.isSuccess) return <OrderPlaced />;
    if (orderMutation.isLoading) return <p className="text-center mt-10">Loading fashion picks...</p>;

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorComponent message={error.message} path="/cart" />;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-gray-700 mb-4"
                >
                    Your cart is empty 🛒
                </motion.h2>
                <p className="text-gray-600 text-lg">Start shopping to add items to your cart!</p>
            </div>
        );
    }

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Billing & Shipping Form */}
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-purple-800 mb-6">Billing & Shipping</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-pink-600 mb-1" htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Jane Doe"
                                defaultValue={userId}
                                className="w-full px-4 py-2 rounded-lg bg-white/30 focus:bg-white/50 transition text-purple-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-pink-600 mb-1" htmlFor="address">Address</label>
                            <input
                                id="address"
                                type="text"
                                defaultValue="Main Street,Hyderabad"
                                placeholder="Enter Address"
                                className="w-full px-4 py-2 rounded-lg bg-white/30 focus:bg-white/50 transition text-purple-900"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-pink-600 mb-1" htmlFor="city">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    defaultValue="Hyderabad"
                                    placeholder='Enter City'
                                    className="w-full px-4 py-2 rounded-lg bg-white/30 focus:bg-white/50 transition text-purple-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-pink-600 mb-1" htmlFor="zip">ZIP Code</label>
                                <input
                                    id="zip"
                                    type="text"
                                    defaultValue="54321"
                                    className="w-full px-4 py-2 rounded-lg bg-white/30 focus:bg-white/50 transition text-purple-900"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-purple-800 mb-6">Order Summary</h2>
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item._id} className="flex justify-between flex-wrap text-sm sm:text-base">
                                    <span className="font-semibold text-pink-600 w-2/3 sm:w-auto">{item.name} x {item.quantity}</span>
                                    <span className="font-semibold text-emerald-500 w-1/3 sm:w-auto text-right">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                            <li className="flex justify-between border-t border-white/20 pt-4 text-xl font-bold text-gray-800 mt-4">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        className={clsx(
                            'mt-6 w-full py-3 rounded-full font-bold text-base sm:text-lg uppercase',
                            'bg-gradient-to-r from-pink-500 to-purple-600',
                            'tracking-wide hover:from-pink-600 hover:to-purple-700 transition text-white'
                        )}
                        onClick={() => orderMutation.mutate()}
                    >
                        Complete Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}
