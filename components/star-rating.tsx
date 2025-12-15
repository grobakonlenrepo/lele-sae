import {
  IconStar,
  IconStarHalfFilled,
  IconStarFilled,
} from "@tabler/icons-react";

type StarRatingProps = {
  rating: number; // Contoh: 4.5
};

const StarRating = ({ rating }: StarRatingProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // bintang penuh
      stars.push(
        <IconStarFilled key={i} size={20} className="text-white" />,
      );
    } else if (rating >= i - 0.5) {
      // bintang setengah
      stars.push(
        <IconStarHalfFilled key={i} size={20} className="text-white" />,
      );
    } else {
      // bintang kosong
      stars.push(<IconStar key={i} size={20} className="text-white" />);
    }
  }

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
