import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from 'lodash';

import { images } from "../../../../utils/helper";

class NotesTabData extends Component{
    notesList = () => {
        return(
            _.times(7, (index) => {
                return(
                    <div className="history-list" key={index}>
                        <div className="icon-main">
                            <img src={images["profile.png"]} />
                        </div>
                        <div className="history-content">
                            <p>12m Today</p>
                            <h3>Catherine Pepper</h3>
                            <h4>Jennifer said to call back on her office mobile on Friday 13th around lunchtime. </h4>
                        </div>
                    </div>
                )
            })
        )
    }

    render(){
        return(
            <div className="tab-pane fade show" id="notes" role="tabpanel" aria-labelledby="notes-tab">
                <div className="curve-box-content notes-content">
                    <Scrollbars style={{ height: "660px" }}>
                        <div className="scrollbar">
                            <div className="form-div">
                                <textarea placeholder="Add your Notes"></textarea>
                                <button type="submit" className="btn white btn-outline-primary">Submit</button>
                            </div>
                            <div className="history-list-main">
                                <h2>Notes History</h2>
                                {this.notesList()}
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

export default NotesTabData;