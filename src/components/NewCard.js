import React, {useState} from "react";
import DetailCard from "../pages/TrendingPortal/DetailCard";

function NewCard() {
  const [ShowModal, setShowModal] = useState(false);
  return (
    <div className="flex">
        <div onClick={() => setShowModal(true)} className="border-2 flex justify-center items-center cursor-pointer hover:shadow-lg border-compatible border-black bg-white  card w-32 h-32 rounded-lg">
          <div className="text-center text-6xl font-medium">+</div>
        </div>

        <div onClick={() => setShowModal(false)} className="border-2 flex justify-center items-center cursor-pointer hover:shadow-lg border-compatible border-black bg-white  card w-32 h-32 rounded-lg mx-4" >
          <div className="text-center text-xl font-medium">15 AUG 2022
          <button className="bg-slate-500 rounded-md mt-2 p-1 text-white	text-sm">Details</button>
          </div>
          
        </div>
        <DetailCard onClose={() => setShowModal(false)} visible={ShowModal}/>
    </div>
  );
}

export default NewCard;
