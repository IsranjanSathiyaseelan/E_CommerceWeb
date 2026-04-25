import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="group bg-white rounded-xl border border-gray-200 
        hover:shadow-lg transition-all duration-300 cursor-pointer 
        overflow-hidden"
      >
        {/* Image */}
        <div className="flex items-center justify-center p-4">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-28 md:w-32 object-contain 
            transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>

          <p className="text-sm md:text-base font-semibold text-gray-800 truncate mt-1">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <span className="text-xs text-gray-500 ml-1">(4)</span>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-4">
            {/* Price */}
            <div>
              <p className="text-lg font-semibold text-primary">
                {currency}
                {product.offerPrice}
              </p>
              <p className="text-xs text-gray-400 line-through">
                {currency}
                {product.price}
              </p>
            </div>

            {/* Cart */}
            <div
              onClick={(e) => e.stopPropagation()}
            >
              {!cartItems[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-primary text-white text-xs px-3 py-1.5 
                  rounded-md hover:bg-primary-dull transition"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-primary/10 px-2 py-1 rounded-md">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="px-2 text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm w-4 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-2 text-sm"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;