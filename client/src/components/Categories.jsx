import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 px-4 md:px-6">
      <p className="text-2xl md:text-3xl font-semibold text-gray-800">
        Explore Categories
      </p>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 
        xl:grid-cols-7 mt-8 gap-4"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group cursor-pointer rounded-xl p-4 flex flex-col 
            items-center justify-center text-center transition-all duration-300 
            hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: category.bgColor }}
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.text}
              className="w-14 h-14 object-contain 
              transition-transform duration-300 group-hover:scale-105"
            />

            {/* Text */}
            <p className="mt-2 text-xs md:text-sm font-medium text-gray-800">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;