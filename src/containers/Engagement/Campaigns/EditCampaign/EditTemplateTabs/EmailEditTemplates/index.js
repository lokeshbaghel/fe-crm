import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";
import {stripStyleTag} from '../../../../../../utils/helper'

const EmailEditTemplates = (props) => {
  const [preview, setPreview] = useState(false);
  const [active, setActive] = useState('');
  const [loadStop, setloadStop] = useState(false);

  const handleClick = (index,data) => {
    setPreview(<div dangerouslySetInnerHTML={{__html: stripStyleTag(data)}}></div>)
    setActive(index);
    props.getTemplate(index)
  }

  const handlePreview = (props) => {
    let record="";
    if(props.emailTemplates){
      if(props.campaign.campaign_type=='email'){
        record = props.campaign;
        setPreview(<div dangerouslySetInnerHTML={{__html: stripStyleTag(record.template_text)}}></div>);
        if(props.tempName=="email")
           props.getTemplate(record.crm_template_id);
           setActive(record.crm_template_id)
           props.getTemplate(record.crm_template_id)
      }else{
      record = props.emailTemplates[0];
      setPreview(<div dangerouslySetInnerHTML={{__html: stripStyleTag(record.template_text)}}></div>);
      if(props.tempName=="email")
         props.getTemplate(record.id);
         setActive(record.id)
         props.getTemplate(record.id)
      }
      setloadStop(true);
      return true;
    } 
  };

  const campaignHtml = (emailTemplates,props) => {
    return emailTemplates.map((data, index) => {
      return (
        <div className="new-campaign-template-box col-md-4 mb-3" key={index}>
          <div className="thumb-wrap">
            <a
              className={`card-click ${ active == data.id ? 'active' : '' }`}
              onClick={() => handleClick(data.id,data.template?.text)}
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
                { active
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
                   
                    { preview ? preview : ((!loadStop) ? handlePreview(props) : '') }
                   
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

export default EmailEditTemplates;