import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";

import SmallLogo from "../../../../../assets_crm/img/small-logo.jpg";
import {stripStyleTag} from "../../../../../utils/helper"

const EmailTemplates = (props) => {

  const [preview, setPreview] = useState(false);
  const [active, setActive] = useState(0);

  const handleClick = (index) => {
    setPreview(true)
    setActive(index)
  }

  const handlePreview = (data, props) => {
    if(data){
      const record = data;
      let preview = <div dangerouslySetInnerHTML={{__html: stripStyleTag(record.template.text)}}></div>;
      if(props.tempName=="email")
         props.getTemplate(record.id);

      return preview;
    } 
  };

  const campaignHtml = (emailTemplates) => {
    return emailTemplates.map((data, index) => {
      return (
        <div className="new-campaign-template-box col-md-4 mb-3" key={index}>
          <div className="thumb-wrap">
            <a
              className={`card-click ${ active == index ? 'active' : '' }`}
              onClick={() => handleClick(index)}
              id={data.id}
            >
              <div className="thumb-mid">
                {/* <div className="mid-logo">
                  <img src={SmallLogo} />
                </div> */}
                {/* <h2>Dear Michael</h2> */}
                <div className="short-seperator"></div>
                <div dangerouslySetInnerHTML={{__html: stripStyleTag(data?.template?.text)}}></div>
              </div>
              <div className="thumb-footer">
                <h3>{data?.template?.name}</h3>
              </div>
            </a>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-7 col-md-12">
          <Scrollbars style={{ height: "800px" }}>
            <div id="testDiv5" className="scrollbar">
              <div className="row">
                <div className="col-md-12">
                  <h2>Available Templates</h2>
                </div>
              </div>
              <div className="row">
                {!_.isEmpty(props.emailTemplates)
                  ? campaignHtml(props.emailTemplates)
                  : "No Record Found"}
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className="col-lg-5 col-md-12">
          <h2 className="content-title">Template Previewer</h2>
          <div className="campaign-previewer">
            {!_.isEmpty(props.emailTemplates) ? (
              <Scrollbars style={{ height: "800px" }}>
                <div id="testDiv3" className="scrollbar">
                  <div className="preview-content">
                    {/* <div className="small-logo">
                      <img src={SmallLogo} />
                    </div> */}
                    {/* <h2>Dear Michael</h2> */}
                    <div className="short-seperator"></div>
                    { (!preview) ? handlePreview(props.emailTemplates[0], props) : handlePreview(props.emailTemplates[active], props)}
                </div>
              </div>
              </Scrollbars>
            ) : (
              "Preview Not available"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplates;
