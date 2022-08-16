import React from "react";

function ExpertIntro() {
  return (
    <div>
      <div className="flex space-x-6 items-center justify-between w-full bg-slate-900 rounded-xl p-4 border border-white h-intro md:h-2/6 lg:h-2/5">
        <div className="lg:p-4 text-left space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-small md:font-small lg:font-medium text-white">
            Assigned Reports - Expert Portal
          </h2>
          <p className="text-lg font-light pt-3 w-4/6 text-white introPara">
            Fill assigned reports and share your knowledge with the world to
            contribute towards the community by giving proper guidance to the
            students
          </p>
        </div>
        {/* <img
      src={TrendingIntroImg}
      className="w-32 h-32 lg:w-52 lg:h-52 rounded-xl mx-auto trendingIntroImg"
    ></img> */}
      </div>
    </div>
  );
}

export default ExpertIntro;
