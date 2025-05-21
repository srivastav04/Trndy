import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { HiMenu, HiX } from "react-icons/hi";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navRoutes = [

        { name: "Products", path: "/product" },
        { name: "Cart", path: "/cart" },
        { name: "Orders", path: "/orders" },
        { name: "Logout", path: "/" }
    ]


    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className=" w-auto bg-transparent px-4 py-3 z-50">
            <div className="w-full mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
                >
                    Trndy
                </Link>


                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Search */}


                    {/* Nav links */}
                    <nav className="flex items-center space-x-4">
                        {navRoutes.map((route) => (
                            <Link
                                key={route.name}
                                to={route.path}
                                className="px-3 py-2 rounded-md text-gray-800 hover:bg-pink-50 hover:text-pink-600 font-semibold transition"
                            >
                                {route.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Spacer */}
                    <div className="flex-1" />


                </div>


                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <HiX className="w-6 h-6 text-gray-800 " />
                    ) : (
                        <HiMenu className="w-6 h-6 text-gray-800 " />
                    )}

                </button>

            </div>

            <SearchBar />


            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-3 p-2 space-y-5 transition-all duration-300">



                    {navRoutes.map((route) => (
                        <Link
                            key={route.name}
                            to={route.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-lg text-gray-800 font-semibold hover:text-pink-600 transition-colors"
                        >
                            {route.name}
                        </Link>
                    ))}


                </div>
            )}


        </nav>
    );
};

export default Navbar;

