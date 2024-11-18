import React, { useState, useContext } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { CartContext, WishlistContext } from "../Root/Root";
import { GoVerified } from "react-icons/go";

const notify = (message) => {
  toast.success(message, {
    style: {
      background: "#28a745",
      color: "white",
      borderRadius: "8px",
      padding: "12px 20px",
      fontWeight: "bold",
      fontSize: "16px",
    },
    icon: <GoVerified className="text-white text-xl" />,
    position: "top-center",
  });
};

const Details = () => {
  const { id } = useParams();
  const gadgetsData = useLoaderData();
  const gadget = gadgetsData.find(
    (gadget) => gadget.product_id.toString() === id
  );
  const [selectedRating, setSelectedRating] = useState(5);
  const { addToCart } = useContext(CartContext); // Use CartContext
  const { addToWhishList, wCart } = useContext(WishlistContext); // Use WishlistContext

  const [wishlistAdded, setWishlistAdded] = useState(false);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleAddToWishlist = (gadget) => {
    if (!wCart.some((item) => item.product_id === gadget.product_id)) {
      addToWhishList(gadget);
      notify("Added to wishlist");
      setWishlistAdded(true);
    } else {
      notify("Item already in wishlist");
    }
  };

  if (!gadget) {
    return <div>Gadget not found</div>;
  }

  return (
    <div className="p-5 text-white bg-[#9538E2] flex flex-col pt-[50px] pb-[80px] items-center justify-center">
      <h2 className="text-[32px] font-bold">Product Details</h2>
      <p className="max-w-[796px] text-center text-[16px] mb-6">
        Explore the latest gadgets that will take your experience to the next
        level. From smart devices to the coolest accessories, we have it all!
      </p>

      <div className="card card-side bg-base-100 shadow-xl flex flex-col md:flex-row w-full max-w-[1000px] p-5">
        <figure className="flex-grow h-full">
          <img
            src={gadget.product_image}
            alt={gadget.product_title}
            className="object-contain h-[400px] rounded-lg"
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

          <div className="flex flex-row items-center justify-start mt-4">
            <button
              className={`${
                gadget.availability ? "" : "btn-disabled"
              } btn mr-2 bg-[#9538E2] w-[193px] text-white rounded-xl`}
              onClick={() => {
                addToCart(gadget);
                notify("Successfully added to cart!"); // Use the customized toast
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
