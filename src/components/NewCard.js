import React, {useState} from "react";
import DetailCard from "../pages/TrendingPortal/DetailCard";

function NewCard() {
  const [ShowModal, setShowModal] = useState(false);
  return (
    <div className="">
        <div onClick={() => setShowModal(true)} className="border-2 flex justify-center items-center cursor-pointer hover:shadow-lg border-compatible border-black bg-white  card w-32 h-32 rounded-lg">
          <div className="text-center text-6xl font-medium">+</div>
        </div>
        <DetailCard onClose={() => setShowModal(false)} visible={ShowModal}/>
    </div>
  );
}

export default NewCard;
