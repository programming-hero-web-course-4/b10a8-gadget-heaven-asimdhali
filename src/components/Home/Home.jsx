import { useState } from "react";
import gadgetsData from "../../../public/gadgetsData.json";
import banner from "../../assets/banner.jpg";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  console.log(gadgetsData);
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
                <button className={`btn w-[192px] ${selectedCategory === category ? "btn-active" : ""}`} >{category}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
