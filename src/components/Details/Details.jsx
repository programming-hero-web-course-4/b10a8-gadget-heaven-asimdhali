import React, { useState, useContext, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { CartContext, WishlistContext } from "../Root/Root";

// Notification function
const notify = (message) => {
  toast(message);
};

const Details = () => {
  const { id } = useParams();
  
  // If you're using useLoaderData, gadgetsData should be fetched from loader
  const gadgetsData = useLoaderData(); // assuming the data is being loaded via this hook

  // Ensure gadgetsData is available and find the specific gadget
  const gadget = gadgetsData?.find(
    (gadget) => gadget.product_id.toString() === id
  );

  // State to handle rating and wishlist actions
  const [selectedRating, setSelectedRating] = useState(5);
  const { addToCart } = useContext(CartContext);
  const { addToWishList, wCart } = useContext(WishlistContext);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const handleRatingChange = (rating) => setSelectedRating(rating);

  const handleAddToWishlist = (gadget) => {
    if (!wCart.some((item) => item.product_id === gadget.product_id)) {
      addToWishList(gadget);
      notify("Added to wishlist");
      setWishlistAdded(true);
    } else {
      notify("Item already in wishlist");
    }
  };

  // If no gadget found or gadgetsData is missing, display an error
  if (!gadget) {
    return (
      <div className="text-center mt-10">
        <p>Gadget not found</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 text-white bg-[#9538E2] flex flex-col pt-[50px] pb-[80px] items-center justify-center">
      <h2 className="text-[32px] font-bold">Product Details</h2>
      <p className="max-w-[796px] text-center text-[16px] mb-6">
        Explore the latest gadgets that will take your experience to the next
        level. From smart devices to the coolest accessories, we have it all!
      </p>

      {/* Card Section for Product Details */}
      <div className="card card-side bg-base-100 shadow-xl flex flex-col md:flex-row w-full max-w-[1000px]">
        <figure className="flex-grow h-full">
          <img
            src={gadget.product_image}
            alt={gadget.product_title}
            className="object-cover h-[567px] rounded-lg"
          />
        </figure>
        <div className="card-body text-black p-5">
          <h2 className="card-title">{gadget.product_title}</h2>
          <h3 className="p-0">Price: ${gadget.price}</h3>
          <h4 className="text-[#09080f99]">{gadget.description}</h4>

          <div
            className={`badge ${
              gadget.availability ? "badge-primary" : "badge-secondary"
            }`}
          >
            {gadget.availability ? "In stock" : "Not available"}
          </div>
          
          {/* Product Specifications */}
          <div className="mt-4">
            <h1>Specification:</h1>
            <ol
              style={{ listStyleType: "decimal" }}
              className="text-[#09080f99] pl-4"
            >
              {Array.isArray(gadget.specification) &&
                gadget.specification.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ol>
          </div>

          {/* Rating Section */}
          <div className="mt-4">
            <h2>Rating ⭐ </h2>
            <div className="flex items-center">
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked={selectedRating === i + 1}
                    onClick={() => handleRatingChange(i + 1)}
                  />
                ))}
              </div>
              <span className="ml-3 text-black border px-5 rounded-lg bg-[#09080f0d] m-1">
                {selectedRating} star{selectedRating > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-row items-center justify-start mt-4">
            <button
              className={`${
                gadget.availability ? "" : "btn-disabled"
              } btn mr-2 bg-[#9538E2] w-[193px] text-white rounded-xl`}
              onClick={() => {
                addToCart(gadget);
                notify("Added to cart");
              }}
            >
              Add to cart <FaCartArrowDown className="ml-2 w-[24px]" />
            </button>
            <button
              className={`btn btn-outline h-[48px] rounded-full ${
                wishlistAdded ? "btn-disabled" : ""
              }`}
              onClick={() => handleAddToWishlist(gadget)}
              disabled={wishlistAdded}
            >
              <FaHeart className="w-[24px]" />
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Details;
