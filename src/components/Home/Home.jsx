import { useState } from "react";
import gadgetsData from "../../../public/gadgetsData.json";
import banner from "../../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [gadgets, setGadgets] = useState([]);
  const navigate = useNavigate;
  // console.log(gadgetsData);

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

  return (
    <div className="container mx-auto">
      <div className="bg-[#9538E2]  mb-[330px] text-white flex flex-col justify-center items-center text-center py-4 h-[580px] rounded-b-[32px] relative">
        <h2 className="text-[56px] font-bold my-4 px-5">
          Upgrade Your Tech Accessorize with Gadget Heaven Accessories
        </h2>
        <p className="text-[16px] py-2">
          Explore the latest gadgets that will take your experience to the next
          level. From smart devices to the coolest accessories, we have it all!
        </p>
        <a>
          <button className="btn rounded-3xl">Shop Now</button>
        </a>
        <div>
          <img
            src={banner}
            alt=""
            className="rounded-3xl w-[600px] h-[400px]"
          />
        </div>
      </div>

      <div className="flex">
        <div className="w-1/4 p-5">
          <h2 className="text-center text-[24px] font-bold text-[#0B0B0B] mb-4">
            Categories
          </h2>
          <ul className="flex flex-col gap-2">
            {[
              "All",
              "Computers",
              "Phones",
              "Smart Watches",
              "Chargers",
              "Power Banks",
            ].map((category) => (
              <li>
                <button className={`btn w-[192px] ${selectedCategory === category ? "btn-active" : ""}`} onClick={(event) => handleCategoryClick(event, category)}>{category}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4">
            <h2 className="text-center text-[40px] font-bold text-[#0B0B0B] mb-4">
              Explore Cutting-Edge Gadgets
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {gadgets.map((gadget) => {
                <div key={gadget.product_id} className="card card-bordered p-4">
                  {gadget.product_id !== 0 ? (
                    <>
                      <img src={gadget.product_image}
                      alt={gadget.product_title}
                      className="w-full h-48 object-cover mb-4 rounded-md" />
                      <h3 className="text-[20px] font-bold mb-2">
                        {gadget.product_title}
                      </h3>
                      <p className="text-[16px] mb-2">${gadget.price}</p>
                      <button className="btn" onClick={(event) => }>Details</button>
                    </>
                  ) : ()}
                </div>
              })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
