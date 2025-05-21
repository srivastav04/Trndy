import { FaStar } from 'react-icons/fa';

export default function Rating({ rating, dimension }) {
    const fullStars = Math.floor(rating);

    const maxStars = 5;

    return (
        <div className="flex items-center">
            {/* Stars */}
            {Array.from({ length: maxStars }).map((_, i) => {
                const isFilled = i < fullStars;
                return (
                    <span
                        key={i}
                        className={`
          inline-block ${dimension}
          ${isFilled
                                ? ' text-pink-500'
                                : 'text-gray-300'
                            }
        `}
                    >
                        <FaStar className="w-full h-full fill-current" />
                    </span>
                );
            })}

            {/* Numeric rating */}
            <span className="ml-2 text-purple-800 font-semibold">
                {rating.toFixed(1)}
            </span>
        </div>


    );
}
