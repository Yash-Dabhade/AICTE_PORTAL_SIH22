import React from 'react';
import PropTypes from "prop-types";


function TrendingInro(props) {
  return (
    <div>
      <div className="flex w-card bg-slate-900 rounded-xl p-8">
        <div className="p-4 text-left space-y-4">
          <p className="text-lg font-medium text-white">{props.title}</p>
          <p className="text-lg font-light text-white">{props.desc}</p>
        </div>
        <div className='w-48 h-auto rounded-xl mx-auto hover:scale-105'>
          {props.img}
        {/* <img className='w-48 h-auto rounded-xl mx-auto' ></img> */}
        </div>

      </div>
    </div>
  )
}

export default TrendingInro

TrendingInro.defaultProps = {
    title: "set title here",
    img: "set img here",
    desc: "write description here",
  };
