import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, size = 14, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={star <= Math.round(rating) ? 'text-neon fill-neon' : 'text-gray-600'}
          size={size}
        />
      ))}
    </div>
  );
}
