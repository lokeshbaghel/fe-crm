import "./index.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../../assets_crm/img/", false, /\.(png|jpe?g|svg)$/)
);

const SquareBox = (props) => {
  const imageconst = props.imagesrc;
  const widthper=props.widthper;
  return (
    <a
      className={`nav-item ${props.active} ${props.linkcontrol}`}
      id={props.linkid}
      data-toggle="tab"
      href={`#${props.link}`}
      role="tab"
      aria-controls={props.linkcontrol}
      aria-selected="true"
    >
      <div className={`box ${props.boxcolor}`}>
        <img src={images[imageconst]} />
        <h3>{props.title}</h3>
        <p>{props.details}</p>
        <div className="progress">
          <div style={{ width:widthper }} className="progress-bar"></div>
        </div>
      </div>
    </a>
  );
};
export default SquareBox;
