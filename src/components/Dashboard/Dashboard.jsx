import { useContext, useEffect, useState } from "react";
import { CartContext, WishlistContext } from "../Root/Root";
import { BiSortAlt2 } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [wishlist, setWishlist] = useState(false);
  const [updateTotal, setUpdateTotal] = useState(0);

  const { cart, setCart } = useContext(CartContext);
  const { wCart, setWCart } = useContext(WishlistContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    document.title = "Dashboard | Gadget Heaven";
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  }, [cart]);

  const notify = (message) => {
    toast(message, {
      position: "top-center",
      style: {
        background: "#28a745",
        color: "white",
        borderRadius: "8px",
        padding: "10px 20px",
        fontWeight: "bold",
        fontSize: "16px",
      },
    });
  };

  const purchageProducts = () => {
    notify("✅ Products purchased successfully!");
    setTotal(0);
    setCart([]);
  };

  const removeFromWishlist = (index) => {
    notify("✅ Item removed from wishlist");
    setWCart((prevWCart) => prevWCart.filter((_, i) => i !== index));
  };

  const sortByPrice = () => {
    notify("✅ Sorting by price");
    setCart((prevCart) => [...prevCart].sort((a, b) => b.price - a.price));
  };

  const removeFromCart = (index) => {
    notify("✅ Item removed from cart");
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const addToCart = (item) => {
    notify("✅ Item added to cart");
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <>
      <dialog id="purchase_modal" className="modal">
        <div className="modal-box card">
          <div className="card-body flex-col justify-center items-center">
            <MdVerified className="text-green-500 text-4xl mb-4" />
            <p className="font-bold">Payment Successful</p>
            <p className="text-gray-600">Thanks for purchasing</p>
            <h3 className="font-bold text-lg">Total: ${updateTotal}</h3>
            <p className="py-4">Click outside to close</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      <div className="p-5 text-white bg-[#9538E2] flex flex-col pt-[50px] pb-[80px] items-center justify-center">
        <h2 className="text-[32px] font-bold">Dashboard</h2>
        <p className="max-w-[796px] text-center text-[16px]">
          Explore the latest gadgets that will take your experience to the next
          level. From smart devices to the coolest accessories, we have it all!
        </p>
        <div className="mt-5">
          <button
            className={`btn mr-2 w-[170px] rounded-2xl ${
              !wishlist ? "bg-white text-black" : "bg-[#9538E2] text-white"
            }`}
            onClick={() => setWishlist(false)}
          >
            Cart
          </button>

          <button
            className={`btn w-[170px] rounded-2xl ${
              wishlist ? "bg-white text-black" : "bg-[#9538E2] text-white"
            }`}
            onClick={() => setWishlist(true)}
          >
            Wishlist
          </button>
        </div>
      </div>

      <div
        className={`${
          wishlist ? "hidden" : "flex flex-col items-center my-4 justify-center"
        }`}
      >
        <div className="container mx-auto my-2">
          <div className="flex flex-row justify-between items-center">
            <h1></h1>
            <div className="flex flex-row items-center">
              <h2>Total Cost: ${total}</h2>
              <button
                className="btn mx-1 border border-primary rounded-full flex items-center"
                onClick={sortByPrice}
              >
                Sort by price <BiSortAlt2 className="ml-2" />
              </button>
              <button
                className={`${
                  cart.length === 0 ? "btn-disabled" : ""
                } btn mx-1 bg-[#8332C5] text-white rounded-3xl`}
                onClick={() => {
                  setUpdateTotal(total);
                  document.getElementById("purchase_modal").showModal();
                  purchageProducts();
                }}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>

        <div className="w-full container mx-auto rounded-xl p-6">
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="card card-side bg-base-100 shadow-xl container h-[188px] mx-auto rounded-xl p-6 mb-4"
              >
                <figure>
                  <img
                    src={item.product_image}
                    alt={item.product_title}
                    className="w-[200px] h-[124px] rounded-md"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.product_title}</h2>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {item.description}
                  </p>
                  <p className="font-bold">Price: ${item.price}</p>
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => removeFromCart(index)}
                  >
                    <IoMdClose className="text-red-500 text-xl" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className={`${
          wishlist ? "flex flex-col items-center" : "hidden"
        } bg-gray-100 p-6`}
      >
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <div className="w-full container mx-auto">
          {wCart.length === 0 ? (
            <p className="text-center">Your wishlist is empty</p>
          ) : (
            wCart.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center relative"
              >
                <img
                  src={item.product_image}
                  alt={item.product_title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">
                    {item.product_title}
                  </h3>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {item.description}
                  </p>
                  <p className="font-bold">Price: ${item.price}</p>
                </div>
                <button
                  className={`${
                    item.availability ? "bg-purple-500" : "btn-disabled"
                  } text-white px-4 rounded-full font-semibold ml-4 py-2`}
                  onClick={() => {
                    if (item.availability) {
                      addToCart(item);
                      removeFromWishlist(index);
                    }
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => removeFromWishlist(index)}
                >
                  <IoMdClose className="text-xl" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Dashboard;
