import React, { useState } from "react";

const MENU_STAR = [
  {
    indexID: 1,
  },
  {
    indexID: 2,
  },
  {
    indexID: 3,
  },
  {
    indexID: 4,
  },
  {
    indexID: 5,
  },
];

const MenuItem = ({ content, onRate }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleStarClick = () => {
    const currentValue = parseInt(content.ratingValue);
    onRate(currentValue + 1);
  };

  return (
    <div className="Menu_Card_Content flex flex-col items-start justify-end bg-background pt-10 rounded-[2rem] p-5 w-1/2 h-3/4">
      <h3 className="cal-sans-bold text-2xl">{content.title}</h3>
      <div className="p-1"></div>
      <div className="flex items-center">
        <div className="flex" onMouseLeave={() => setHoveredStar(null)}>
          {MENU_STAR.map((star) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`size-6 transition-colors ${
                star.indexID <= (hoveredStar || 0)
                  ? "text-yellow-dark"
                  : "text-light"
              }`}
              key={star.indexID}
              onMouseEnter={() => setHoveredStar(star.indexID)}
              id="rate"
              onClick={handleStarClick}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <div className="text-sm ml-3">({content.ratingValue})</div>
      </div>

      <div className="p-3"></div>
      <div className="flex justify-between w-full">
        <span className="cal-sans-regular text-bold-red text-2xl">
          {content.priceTag}
        </span>
        <button className="flex items-center px-5 py-2 text-sm text-light bg-bold-red hover:bg-bold-red-hover rounded-[50px] cal-sans-regular">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
