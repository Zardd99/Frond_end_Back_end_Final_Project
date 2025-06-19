import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../../server/middleware/supabaseClient";

const MenuCard = ({ allMenuPage }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 cal-sans-bold">
      {error && (
        <div className="bg-hero-gray-50 border border-hero-gray-300 text-black px-4 py-3 rounded-lg mb-8 max-w-md mx-auto text-center">
          <svg
            className="w-5 h-5 inline mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-black mb-4">Our Menu</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-black to-hero-gray-600 mx-auto rounded-full"></div>
      </div>

      {!allMenuPage && menuItems.length > 8 && (
        <div className="text-center mt-12">
          <Link
            to="/allmenu"
            className="inline-flex items-center px-8 py-4 bg-black text-hero-white font-semibold rounded-full hover:bg-hero-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-hero-gray-200"
          >
            View All Menu Items
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
      <div className="p-4"></div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${
          allMenuPage
            ? ""
            : "max-h-[1200px] overflow-y-scroll overflow-x-hidden sm:overflow-auto"
        }`}
      >
        {(allMenuPage ? menuItems : menuItems.slice(0, 8)).map((item) => (
          <Link
            key={item.id}
            to={`/menu/${item.id}`}
            className="group relative bg-hero-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-hero-gray-200 hover:border-black"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-hero-gray-50 via-hero-gray-100 to-hero-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative p-6">
              <div className="aspect-square mb-6 rounded-xl overflow-hidden bg-hero-gray-50 border border-hero-gray-200">
                <img
                  src={item.image_url || "/api/placeholder/300/300"}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black group-hover:text-hero-gray-600 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-black">
                    {item.price_tag}
                  </span>
                  <div className="w-8 h-8 bg-hero-gray-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors duration-300 border border-hero-gray-200">
                    <svg
                      className="w-4 h-4 text-black group-hover:text-hero-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
