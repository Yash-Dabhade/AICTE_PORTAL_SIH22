import React from "react";
import PropTypes from "prop-types";
import TrendingIntroImg from "../res/TrendingIntroImg.gif";

function TrendingInro() {
  return (
    <div>
      <div className="flex space-x-6 justify-between w-full bg-slate-900 rounded-xl p-8 border border-white ">
        <div className="p-4 text-left space-y-4">
          <h2 className="text-4xl font-medium text-white">
            Trending Technologies in Market
          </h2>
          <p className="text-lg font-light pt-3 w-card text-white">
            Gather and generate reports about trending and in demand
            technologies and skills in market in just a few steps !
          </p>
        </div>
        <img
          src={TrendingIntroImg}
          className="w-56 h-56 rounded-xl mx-auto"
        ></img>
      </div>
    </div>
  );
}

export default TrendingInro;
