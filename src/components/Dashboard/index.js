import React from "react";
import { images } from "../../utils/helper";
import _ from "lodash";
import { Component } from "react";
const dataListing = (dataLists) => {
  if (!_.isEmpty(dataLists)) {
    return dataLists.map((datafiled, index) => (
      <div className="row dash-list" key={index}>
        <div className="col-lg-3 col-md-3">Call</div>
        <div className="col-lg-3 col-md-3">
          {new Date(datafiled.date).toLocaleString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div></div>
        <div className="col-lg-3 col-md-3">{datafiled.title}</div>
        <div className="col-lg-3 col-md-3 last-child">
          <img src={images["arrow-circle-icon.png"]} />
        </div>
      </div>
    ));
  }
};
class dashboardLoop extends Component {
  render(){
    const dataLists = this.props.data;
    //console.log(dataLists);
    return (<div>{dataListing(dataLists)}</div>);
  }
}

export default dashboardLoop;
