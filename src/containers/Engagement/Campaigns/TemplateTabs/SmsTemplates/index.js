import React, { useState  } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";

import { engagementHubSmsCampaign, stripStyleTag } from "../../../../../utils/helper";

const SmsTemplate=(props)=>{
  let boxId=0;
  const [previewDefault, setPreviewDefault] = useState(false);
  const [activeClass, setActiveClass] = useState(0);
  const previewSmsClick=(data,index,props)=>{
    setPreviewDefault(engagementHubSmsCampaign(data.template.text));
    setActiveClass(index);
    boxId=data.id;
    if(props.tempName=="sms")
       props.getTemplateSms(boxId);
  }
  const firstSelect=(singlerecord,props)=>{
    let single=singlerecord[0];
    boxId=single.id;
    if(props.tempName=="sms")
      props.getTemplateSms(boxId);
    return engagementHubSmsCampaign(single.template.text);
  }
  const campaignHtml = (smsTemplateList) => {
    return ( smsTemplateList.map((data,index) => (
        <div className="new-campaign-template-box col-md-4 mb-3" key={index}>
          <div className="thumb-wrap">
            <a className={`card-click ${ activeClass==index ? 'active' : '' }`} onClick={ ()=>previewSmsClick(data,index,props) }>
              <div className="thumb-content">
                <div className="preview-content">
                  <div className="sms-content">
                  <div dangerouslySetInnerHTML={{__html: stripStyleTag(data.template.text)}}></div>
                  </div>
                </div>
              </div>
              {/* <div className="thumb-footer">
                <h3>Template 1</h3>
                <p>Commonly used for Stage 1 and 2 enquirer's</p>
              </div> */}
            </a>
          </div>
        </div>
        
    ))
    )
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
                <div className="row">{!_.isEmpty(props.smsTemplateList) ? campaignHtml(props.smsTemplateList) : 'No Template Available'}</div>
              </div>
            </Scrollbars>
          </div>
          <div className="col-lg-5 col-md-12">
            <h2 className="content-title">Template Previewer</h2>
            <div className="campaign-previewer">
              <Scrollbars style={{ height: "800px" }}>
                <div id="testDiv3" className="scrollbar">
                 { !_.isEmpty(previewDefault)? previewDefault: !_.isEmpty(props.smsTemplateList) ? firstSelect(props.smsTemplateList,props) :'Nothing To Show Preview' }
            </div>
              </Scrollbars>
            </div>
          </div>
        </div>
      </>
    );
  
}

export default SmsTemplate;
