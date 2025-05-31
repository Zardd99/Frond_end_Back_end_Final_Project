import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../../server/middleware/supabaseClient";

const MenuCard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //
  // Fetch menu items
  //
  //
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div className="text-center p-8">Loading menu...</div>;

  return (
    <div className="container mx-auto p-8 relative">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4 mx-auto max-w-md text-center">
          {error}
        </div>
      )}

      <h1 className="cal-sans-bold text-4xl mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={`/menu/${item.id}`}
            className="group bg-gradient-to-br from-hero-orange-50 via-hero-red-50 to-hero-yellow-50 p-6 rounded-3xl shadow-xl shadow-offer-primary-400/20 hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 transform hover:scale-105 block"
          >
            <div className="h-48 mb-4 rounded-xl flex items-center justify-center">
              <img
                src={item.image_url || ""}
                alt={item.title}
                className="object-contain w-full h-full rounded-xl group-hover:scale-105 transition-all duration-300 "
              />
            </div>
            <h2 className="cal-sans-bold text-2xl mb-2">{item.title}</h2>
            <p className="cal-sans-bold text-bold-red text-xl mb-4">
              {item.price_tag}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
