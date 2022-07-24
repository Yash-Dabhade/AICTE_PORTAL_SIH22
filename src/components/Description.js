import React from 'react';
import PropTypes from 'prop-types'


function Description(props) {
  return (
    <div className="container w-96 m-3 p-4 border-2 border-black rounded-2xl">
        <h3 className="font-bold leading-relaxed">{props.name}</h3>
        <div className="code">
            <p className="leading-relaxed">{props.code}</p>
        </div>
        <div className="descp">
            <p className="leading-relaxed">{props.descp}</p>
        </div>
    </div>
  )
}

export default Description

Description.defaultProps = {
    name: 'set name here',
    code: 'write code here',
    descp: 'write description here'
}
