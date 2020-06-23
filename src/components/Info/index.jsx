import React from 'react';
import './index.css';

function index(props) {
  return (
    <div className="tag-audio">
      <img src={props.img} alt="banner" className="thumbnail" />
      <p>{props.title}</p>
    </div>
  );
}

export default index;
