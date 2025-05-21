import React, { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { searchproducts } from "../apiFunctions";

export default function SearchBar() {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef();
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

    // Measure position whenever dropdown opens
    useLayoutEffect(() => {
        if (open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [open]);

    const { data: suggestions = [], refetch, isFetching } = useQuery({
        queryKey: ["search", term],
        queryFn: () => searchproducts(term),
        enabled: false,
        keepPreviousData: true,
    });

    React.useEffect(() => {
        if (term.trim().length < 2) return setOpen(false);
        const id = setTimeout(() => {
            refetch();
            setOpen(true);
        }, 300);
        return () => clearTimeout(id);
    }, [term, refetch]);

    React.useEffect(() => {
        function onClick(e) {
            if (!containerRef.current?.contains(e.target)) {
                setOpen(false);
            }
        }
        window.addEventListener("mousedown", onClick);
        return () => window.removeEventListener("mousedown", onClick);
    }, []);

    const select = (id) => {
        navigate(`/product/${id}`);
        setOpen(false);
        setTerm("");
    };

    // Render the dropdown via Portal
    const dropdown = (
        <AnimatePresence>
            {open && (
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                        position: "absolute",
                        top: coords.top,
                        left: coords.left,
                        width: coords.width,
                    }}
                    className="bg-white backdrop-blur-sm rounded-lg shadow-xl overflow-hidden divide-y divide-gray-100 z-[9999]"
                >
                    {isFetching && (
                        <li className="px-4 py-3 text-sm text-gray-500">Loading...</li>
                    )}
                    {!isFetching && suggestions.length === 0 && (
                        <li className="px-4 py-3 text-sm text-gray-500">No matches</li>
                    )}
                    {suggestions.map((p) => (
                        <li
                            key={p._id}
                            onClick={() => select(p._id)}
                            className={clsx(
                                "flex items-center px-4 py-3 cursor-pointer hover:bg-pink-50 transition-colors"
                            )}
                        >
                            <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-10 h-10 object-cover rounded-md mr-4"
                            />
                            <span className="text-sm text-gray-800 font-medium">{p.name}</span>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <div className="relative mt-4 w-full flex justify-center" ref={containerRef}>
                <input
                    type="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full  px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
            </div>
            {createPortal(dropdown, document.body)}
        </>
    );
}
