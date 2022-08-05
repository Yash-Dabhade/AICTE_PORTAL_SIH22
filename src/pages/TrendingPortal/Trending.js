import React from "react";
import TrendingIntro from "../../components/TrendingInro";
import NewCard from "../../components/NewCard";

function Trending() {
  return (
    <div className="parent-section darkMode">
      <TrendingIntro />
      <div className="flex m-8">
        <NewCard />
      </div>
    </div>
  );
}

export default Trending;
