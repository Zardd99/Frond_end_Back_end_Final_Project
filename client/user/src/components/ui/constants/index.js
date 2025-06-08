import Icon_Img from "../../../assets/Hero_img.png";
import FastFood from "../../../assets/Burgur.png";

import Emoji_1 from "../../../assets/paimon-s-paintings-set-35-2.png";
import Emoji_2 from "../../../assets/paimon-s-paintings-set-35-4.png";
import Emoji_3 from "../../../assets/paimon-s-paintings-set-35-6.png";
import ChickenBurger_Img from "../../../assets/FastFood.png";
import ChickenPizza_Img from "../../../assets/Burgur.png";
import FrenchFries_Img from "../../../assets/FrenchFries.png";

// Hero.jsx
export const HERO_CONTENT = [
  {
    title: "All Fast Food is Available at ",
    description: "We Are Just a Click Away When You Crave Delicious Fast Food",
    button: "Buy Now",
    orderButton: "How to Order",
    img: "https://i.pinimg.com/736x/64/40/c3/6440c345ba03086afa7ef024673574df.jpg",
  },
];

// Menu.jsx
export const MENU_CONTENT = [
  {
    description:
      "Thees Are Our Regular Menus. You Can Order Anything You Like. ",
  },
];

// Navbar.jsx
export const links = [
  { name: "Home", href: "#home" },
  { name: "Offer", href: "#offer" },
  { name: "Service", href: "#service" },
  { name: "Menu", href: "#menu" },
  { name: "About US", href: "#about" },
];

// Offer.jsx
export const OFFER_CONTENTS = [
  {
    title: "Fast Delivery",
    description:
      "The Food Will Be Delivered to Your Home Within 1 - 2 Hours Of Your Ordering.",
    img: Icon_Img,
    gradient: "from-offer-primary-400 to-offer-accent-500",
    shadowColor: "shadow-offer-primary-400/20",
    iconBg: "bg-gradient-to-br from-offer-primary-100 to-offer-primary-200",
    hoverGradient:
      "group-hover:from-offer-primary-400 group-hover:to-offer-accent-500",
    emoji: Emoji_1,
  },
  {
    title: "Fresh Food",
    description:
      "Your Food Will Be Delivered 100% Fresh To Your Home. We Do Not Deliver Stale Food.",
    img: FastFood,
    gradient: "from-offer-fresh-400 to-offer-emerald-500",
    shadowColor: "shadow-offer-fresh-400/20",
    iconBg: "bg-gradient-to-br from-offer-fresh-100 to-offer-fresh-200",
    hoverGradient:
      "group-hover:from-offer-fresh-400 group-hover:to-offer-emerald-500",
    emoji: Emoji_2,
  },
  {
    title: "Free Delivery",
    description:
      "Your Food Delivery Is Absolutely Free. No Cost Just Order And Enjoy.",
    img: Icon_Img,
    gradient: "from-offer-cool-400 to-offer-purple-500",
    shadowColor: "shadow-offer-cool-400/20",
    iconBg: "bg-gradient-to-br from-offer-cool-100 to-offer-cool-200",
    hoverGradient:
      "group-hover:from-offer-cool-400 group-hover:to-offer-purple-500",
    emoji: Emoji_3,
  },
];

// Service.jsx
export const SERVICE_CONTENT = [
  {
    description:
      "Here Are Some Of Our Best Distributed Categories. If You Want To You Can Order From Here.",
    img: ChickenBurger_Img,
    categories_title: "Chicken Burger",
    categories_description: "Go See Menu",
    bgGradient: "from-foodle-warning-50 to-foodle-brand-100",
    accentColor: "text-foodle-brand-500",
    hoverGradient:
      "group-hover:from-foodle-brand-500 group-hover:to-foodle-accent-500",
    shadowColor: "shadow-foodle-brand",
    iconBg: "bg-foodle-brand-100",
  },
  {
    description: null,
    img: ChickenPizza_Img,
    categories_title: "Chicken Pizza",
    categories_description: "Go See Menu",
    bgGradient: "from-foodle-accent-50 to-pink-100",
    accentColor: "text-foodle-accent-500",
    hoverGradient: "group-hover:from-red-500 group-hover:to-pink-500",
    shadowColor: "shadow-foodle-accent",
    iconBg: "bg-foodle-accent-100",
  },
  {
    description: null,
    categories_title: "French Fries",
    img: FrenchFries_Img,
    categories_description: "Go See Menu",
    bgGradient: "from-foodle-warning-50 to-foodle-warning-100",
    accentColor: "text-foodle-warning-600",
    hoverGradient: "group-hover:from-yellow-500 group-hover:to-amber-500",
    shadowColor: "shadow-foodle-warning",
    iconBg: "bg-foodle-warning-100",
  },
];
