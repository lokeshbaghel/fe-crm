import React from "react";

import leftArrow from "../../assets_crm/img/pagination-left-arrow.png";
import rightArrow from "../../assets_crm/img/pagination-right-arrow.png";
import './index.css';

class Pagination extends React.Component {
  render() {
    return (
      <div className="pagination">
        <ul>
          <li>
            <a href="#">
              <img src={leftArrow} />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">
              <img src={rightArrow} />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
