'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (val: number) => void;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export function StarRating({
  value,
  onChange,
  maxStars = 5,
  size = 'lg',
  readonly = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
  };

  const currentVal = hoverValue !== null ? hoverValue : value;

  const labels = [
    '',
    '1 - Needs Refinement',
    '2 - Fair',
    '3 - Satisfactory',
    '4 - Very Good',
    '5 - Exquisite / Exceptional',
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 sm:gap-3">
        {Array.from({ length: maxStars }).map((_, idx) => {
          const starNumber = idx + 1;
          const isFilled = starNumber <= currentVal;

          return (
            <button
              key={starNumber}
              type="button"
              disabled={readonly}
              onClick={() => !readonly && onChange(starNumber)}
              onMouseEnter={() => !readonly && setHoverValue(starNumber)}
              onMouseLeave={() => !readonly && setHoverValue(null)}
              className={`transition-all duration-200 focus:outline-none transform ${
                readonly ? 'cursor-default' : 'hover:scale-110 active:scale-95 cursor-pointer'
              }`}
            >
              <Star
                className={`${starSizeClasses[size]} transition-colors duration-200 ${
                  isFilled
                    ? 'fill-gold-400 text-gold-500 drop-shadow-[0_2px_8px_rgba(215,199,135,0.4)]'
                    : 'text-neutral-300 fill-transparent hover:text-gold-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {!readonly && (
        <span className="text-xs sm:text-sm font-medium text-wellness-800 h-5 transition-opacity">
          {labels[currentVal] || 'Select your rating'}
        </span>
      )}
    </div>
  );
}
