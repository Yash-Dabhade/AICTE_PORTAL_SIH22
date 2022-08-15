import React from "react";
import PropTypes from "prop-types";
import TrendingIntroImg from "../res/TrendingIntroImg.gif";

function TrendingInro() {
  return (
    <div className="flex space-x-6 justify-between w-full bg-slate-900 rounded-xl p-4 border border-white h-1/5 md:h-1/5 lg:h-3/5">
      <div className="lg:p-4 text-left space-y-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-small md:font-small lg:font-medium text-white">
          Trending Technologies in Market
        </h2>
        <p className="text-lg font-light pt-3 w-card text-white introPara">
          Gather and generate reports about trending and in demand technologies
          and skills in market in just a few steps !
        </p>
      </div>
      <img
        src={TrendingIntroImg}
        className="w-52 h-52 rounded-xl mx-auto trendingIntroImg"
      ></img>
    </div>
  );
}

export default TrendingInro;
