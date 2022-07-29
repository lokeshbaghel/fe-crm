import React from "react";
import "./index.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const IsCurrentURL = (url) => {
  const location = useLocation();
  return location.pathname.toLowerCase() === url.toLowerCase() ? true : false;
};
const renderTooltip = (props) => 
  <Tooltip id={`tooltip-${props.idt}`}>{props.title}</Tooltip>
  // !IsCurrentURL(props.to) ? (
  //   <Tooltip id={`tooltip-${props.idt}`}>{props.title}</Tooltip>
  // ) : (
  //   <Tooltip id="tooltip-disabled"></Tooltip>
  // );

  

const ToolTipMenu = (props) => {
  return (
    <OverlayTrigger
      key={props.idt}
      placement="right"
      overlay={renderTooltip(props)}
    >
      {props.children}
    </OverlayTrigger>
  );
};
export default ToolTipMenu;
