import React from "react";
import PropTypes from "prop-types";

function Description(props) {
  return (
    <div className="container w-96 m-3 p-4 border-2 border-black rounded-2xl">
      <h3 className="font-bold leading-relaxed">{props.title}</h3>
      <div className="code">
        <p className="leading-relaxed">{props.code}</p>
      </div>
      <div className="desc">
        <p className="leading-relaxed">{props.fullName}</p>
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
