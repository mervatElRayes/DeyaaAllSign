import React from "react";
import { Link } from "react-router-dom";
import "./error404.css";

const Error404 = () => {
  return (
    
  <>
  
      <div className="content">
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%">
              404
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
          </g>
        </svg>
      <div className="ourTitle">
          <h1 className="errorh1">Page Not Found</h1>
          <h3><Link to="/">Back to Home</Link></h3>
      </div>
      </div>
  </>
  );
};

export default Error404;
