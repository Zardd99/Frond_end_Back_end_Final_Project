import React, { useState } from "react";
import MenuItem from "./MenuItem";

const MENU_CARD = [
  {
    title: "Chicken Burger",
    priceTag: "$3.50",
    ratingValue: 10,
  },
  {
    title: "Chicken Pizza",
    priceTag: "$4.20",
    ratingValue: 10,
  },
  {
    title: "Chicken Fry",
    priceTag: "$5.00",
    ratingValue: 10,
  },
  {
    title: "Grill Sandwich",
    priceTag: "$4.80",
    ratingValue: 10,
  },
  {
    title: "Taco",
    priceTag: "$3.63",
    ratingValue: 10,
  },
  {
    title: "Noddle's Ramen",
    priceTag: "$6.50",
    ratingValue: 10,
  },
];

const MenuCard = () => {
  const [menuItems, setMenuItems] = useState(MENU_CARD);

  const handleRate = (itemIndex, newValue) => {
    const updatedItems = [...menuItems];
    updatedItems[itemIndex].ratingValue = newValue;
    setMenuItems(updatedItems);
  };

  return (
    <div className="Menu_Card flex flex-col items-center container h-screen">
      <div className="Menu_Card_Grid_Wrap grid grid-cols-3 gap-4 w-full h-screen items-end">
        {MENU_CARD.map((content, index) => (
          <MenuItem
            content={content}
            key={index}
            onRate={(newValue) => handleRate(index, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
