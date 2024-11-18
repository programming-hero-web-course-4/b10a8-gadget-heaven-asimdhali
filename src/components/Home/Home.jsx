import { useState, useEffect, useRef } from "react";
import gadgetsData from "../../../public/gadgetsData.json";
import banner from "../../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [gadgets, setGadgets] = useState([]);
  const navigate = useNavigate();

  const categoriesRef = useRef(null);

  useEffect(() => {
    setGadgets(gadgetsData);
  }, []);

  const handleCategoryClick = (event, category) => {
    event.preventDefault();
    setSelectedCategory(category);
    if (category === "All") {
      setGadgets(gadgetsData);
    } else {
      const filteredGadgets = gadgetsData.filter(
        (gadget) => gadget.category === category
      );
      setGadgets(
        filteredGadgets.length > 0
          ? filteredGadgets
          : [{ product_id: 0, product_title: "No data found" }]
      );
    }
  };

  const handleDetailsClick = (event, productId) => {
    event.preventDefault();
    navigate(`/details/${productId}`, { state: { gadgetsData } });
  };

  const handleShopNowClick = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#9538E2] mb-[200px] text-white flex flex-col justify-center items-center text-center py-4 h-[580px] rounded-b-[32px] relative pt-[12rem]">
        <h2 className="text-[56px] font-bold my-4 px-5">
          Upgrade Your Tech Accessories with Gadget Heaven
        </h2>
        <p className="text-[16px] py-2">
          Explore the latest gadgets that will take your experience to the next
          level. From smart devices to the coolest accessories, we have it all!
        </p>
        <button className="btn rounded-3xl" onClick={handleShopNowClick}>
          Shop Now
        </button>
        <div>
          <img
            src={banner}
            alt="Banner"
            className="rounded-3xl w-[600px] h-[400px] mt-10"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-10 py-10">
       
        <aside
          className="lg:w-1/4 w-full bg-gray-100 p-6 rounded-lg shadow-md"
          ref={categoriesRef}
        >
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Categories
          </h2>
          <ul className="space-y-3">
            {[
              "All",
              "Computers",
              "Phones",
              "Smart Watches",
              "Chargers",
              "Power Banks",
            ].map((category) => (
              <li key={category}>
                <button
                  className={`w-full py-3 px-4 rounded-lg transition duration-300 font-medium ${
                    selectedCategory === category
                      ? "bg-[#9538E2] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-[#eae5f5]"
                  }`}
                  onClick={(event) => handleCategoryClick(event, category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
            Explore Cutting-Edge Gadgets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gadgets.map((gadget) => (
              <div
                key={gadget.product_id}
                className="p-5 bg-white rounded-lg shadow-lg flex flex-col justify-between transition transform hover:-translate-y-2 hover:shadow-xl"
              >
                {gadget.product_id !== 0 ? (
                  <>
                    <div className="relative h-48 overflow-hidden rounded-md mb-4">
                      <img
                        src={gadget.product_image}
                        alt={gadget.product_title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {gadget.product_title}
                    </h3>
                    <p className="text-lg text-gray-500 font-medium mb-4">
                      ${gadget.price}
                    </p>
                    <div className="mt-auto">
                      <button
                        className="btn bg-[#9538E2] hover:bg-[#7c2cb4] text-white w-full py-2 rounded-lg font-semibold"
                        onClick={(event) =>
                          handleDetailsClick(event, gadget.product_id)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </>
                ) : (
                  <h3 className="text-xl font-bold text-gray-500 text-center">
                    {gadget.product_title}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
