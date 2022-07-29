import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";
import { engagementHubSmsCampaign } from "../../../../../../utils/helper";
const SmsTemplate = (props) => {
  let boxId = props.smsTemplates?.id;
  const [previewDefault, setPreviewDefault] = useState(false);
  const [boxSelected, setBoxSelected] = useState(boxId);
  const [boxFirstSelect, setBoxFirstSelect] = useState(false);

  const previewSmsClick = (data, props) => {
    setPreviewDefault(engagementHubSmsCampaign(data.template.text));
    setBoxSelected(data.crm_templates_id);
    if (props.tempName == "sms") {
      props.getTemplateSms(data.id);
    }
  };
  const firstSelect = (singlerecord, defaultCamp) => {
    let single = "";
    if (singlerecord.campaign_type == "sms") {
      single = singlerecord;
      setBoxSelected(single.crm_template_id);
      props.getTemplateSms(single.crm_template_id);
      setBoxFirstSelect(true);
      setPreviewDefault(engagementHubSmsCampaign(single.template_text));
    } else {
      single = defaultCamp[0];
      setBoxSelected(single.id);
      setBoxFirstSelect(true);
      props.getTemplateSms(single.id);
      setPreviewDefault(engagementHubSmsCampaign(single.template.text));
    }
    return engagementHubSmsCampaign(previewDefault);
  };

  const campaignHtml = (smsTemplates) => {
    return smsTemplates.map((data, index) => (
      <div className="new-campaign-template-box col-md-4 mb-3" key={index}>
        <div className="thumb-wrap">
          <a
            id={data.id}
            className={`card-click ${boxSelected == data.id ? "active" : ""}`}
            onClick={() => previewSmsClick(data, props)}
          >
            <div className="thumb-content">
              <div className="preview-content">
                <div className="sms-content">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.template.text }}
                  ></div>
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
    ));
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
                {!_.isEmpty(props.smsTemplates)
                  ? campaignHtml(props.smsTemplates)
                  : "No Template Available"}
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className="col-lg-5 col-md-12">
          <h2 className="content-title">Template Previewer</h2>
          <div className="campaign-previewer">
            <Scrollbars style={{ height: "800px" }}>
              <div id="testDiv3" className="scrollbar">
                {previewDefault
                  ? previewDefault
                  : !boxFirstSelect
                  ? firstSelect(props.campaign, props.smsTemplates)
                  : "Nothing To Show Preview"}
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsTemplate;
