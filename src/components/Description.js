import React from "react";
import PropTypes from "prop-types";

function Description(props) {
  return (
    <div className="container w-3/6 md:w-96 m-1 md:m-3 p-1 md:p-4 border-2 border-compatible darkMode rounded-2xl">
      <h3 className="font-bold leading-relaxed">{props.title}</h3>
      <div className="code">
        <p className="text-sm md:text-base md:leading-relaxed">{props.code}</p>
      </div>
      <div className="desc">
        <p className="text-sm md:text-base leading-relaxed">{props.fullName}</p>
      </div>
    </div>
  );
}

export default Description;

Description.defaultProps = {
  name: "set name here",
  code: "write code here",
  desc: "write description here",
};
