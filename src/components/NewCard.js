import React from "react";

function NewCard() {
  return (
    <div className="border-2 flex justify-center items-center cursor-pointer hover:shadow-lg border-compatible border-black bg-white  card w-32 h-32 rounded-lg">
      <div className="text-center text-6xl font-medium">+</div>
    </div>
  );
}

export default NewCard;
