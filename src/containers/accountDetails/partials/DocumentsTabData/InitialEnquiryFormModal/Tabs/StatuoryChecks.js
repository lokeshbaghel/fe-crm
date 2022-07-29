import React, { Component } from "react";
import BlockUI from "../../../../../../components/BlockUI";
class StatuoryChecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statuoryChecksFields:{},
      exitLoop:true,
      applicant_length:1
    };
  }

  setValueStatuoryChecks(e){
    let targetName = e.target.name;
    let statuoryChecksFields=this.state.statuoryChecksFields;
    statuoryChecksFields[targetName] = e.target.value;
    this.setState({ statuoryChecksFields });
  }

  
  static getDerivedStateFromProps(props, state) {
    let applicant_length=1
    let statuoryChecksFields={};
    if(props.listIEFormData){
      if(props.listIEFormData.hasOwnProperty('generalRecords') && !props.listIEFormData.hasOwnProperty('statuoryChecksTab')){
        applicant_length=Object.values(props.listIEFormData.generalRecords.applicantsData).length; 
      }
    if(props.listIEFormData.hasOwnProperty('statuoryChecksTab')){
      if(props.listIEFormData.hasOwnProperty('generalRecords')){
        applicant_length=Object.values(props.listIEFormData.generalRecords.applicantsData).length; 
      }
      let ExtraData = props.listIEFormData.statuoryChecksTab;
      if(ExtraData){
        if(ExtraData.hasOwnProperty('applicant1PoliceInvolvement')){
          statuoryChecksFields.applicant1PoliceInvolvement=ExtraData.applicant1PoliceInvolvement
        }
        if(ExtraData.hasOwnProperty('applicant1PoliceInvolvementAdditionalInfo')){
          statuoryChecksFields.applicant1PoliceInvolvementAdditionalInfo=ExtraData.applicant1PoliceInvolvementAdditionalInfo
        }
        if(ExtraData.hasOwnProperty('applicant1AssessmentProcess')){
          statuoryChecksFields.applicant1AssessmentProcess=ExtraData.applicant1AssessmentProcess
        }
        if(ExtraData.hasOwnProperty('applicant1AssesmentProcessAdditionalInfo')){
          statuoryChecksFields.applicant1AssesmentProcessAdditionalInfo=ExtraData.applicant1AssesmentProcessAdditionalInfo
        }
        if(ExtraData.hasOwnProperty('applicant2PoliceInvolvement')){
          statuoryChecksFields.applicant2PoliceInvolvement=ExtraData.applicant2PoliceInvolvement
        } 
        if(ExtraData.hasOwnProperty('applicant2PoliceInvolvementAdditionalInfo')){
          statuoryChecksFields.applicant2PoliceInvolvementAdditionalInfo=ExtraData.applicant2PoliceInvolvementAdditionalInfo
        } 
        if(ExtraData.hasOwnProperty('applicant2AssessmentProcess')){
          statuoryChecksFields.applicant2AssessmentProcess=ExtraData.applicant2AssessmentProcess
        } 
        if(ExtraData.hasOwnProperty('applicant2AssesmentProcessAdditionalInfo')){
          statuoryChecksFields.applicant2AssesmentProcessAdditionalInfo=ExtraData.applicant2AssesmentProcessAdditionalInfo
        } 
       }
       if(state.exitLoop) 
          return { statuoryChecksFields,applicant_length,exitLoop:false } 
       else
          return { applicant_length } 
    }
    }
    else{
      if(props.applicantsInfo && state.exitLoop){
            let applicant_length=Object.values(props.applicantsInfo).length;
            return {applicant_length}
      }
    }
    return {applicant_length};
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let submitList={}
    if(this.state.statuoryChecksFields)
      submitList.statuoryChecksTab=this.state.statuoryChecksFields
      this.props.statuoryChecksData(submitList);
  };

  render() {
    const {statuoryChecksFields,applicant_length} = this.state;
    let {blocking}=this.props
    return (
      <React.Fragment>
        <BlockUI blocking={blocking} />
        <form onSubmit={this.handleSubmit}>
          <div className="initial-form">
            <p>Applicant 1</p>
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Have you or any household member had any Cautions, Convictions
                  or other Police involvement?
                </label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="applicant1PoliceInvolvement" value="1" 
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="Yes"  
                    checked={statuoryChecksFields.applicant1PoliceInvolvement==="1"}
                     />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="applicant1PoliceInvolvement" value="0" 
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="No"  
                    checked={statuoryChecksFields.applicant1PoliceInvolvement==="0"}
                   />
                    <img />
                  </label>
                </div>
              </div>
            </div>
           {statuoryChecksFields.applicant1PoliceInvolvement==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea value={ statuoryChecksFields.applicant1PoliceInvolvementAdditionalInfo ?  statuoryChecksFields.applicant1PoliceInvolvementAdditionalInfo:''} placeholder="..." name="applicant1PoliceInvolvementAdditionalInfo" onChange={(e) => this.setValueStatuoryChecks(e)}></textarea>
            </div>:''
            }

            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Have you had any involvement with social services/just to let
                  you know local authority checks form part of the assessment
                  process?
                </label>
                <div className="options">
                <label title="item1">
                    Yes 
                    <input type="radio" name="applicant1AssessmentProcess" value="1" 
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="Yes"  
                    checked={ statuoryChecksFields.applicant1AssessmentProcess==="1" }
                    />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="applicant1AssessmentProcess" value="0" 
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="No"  
                    checked={ statuoryChecksFields.applicant1AssessmentProcess==="0" }
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            { statuoryChecksFields.applicant1AssessmentProcess==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value={ statuoryChecksFields.applicant1AssesmentProcessAdditionalInfo?statuoryChecksFields.applicant1AssesmentProcessAdditionalInfo:'' } name="applicant1AssesmentProcessAdditionalInfo" onChange={(e) => this.setValueStatuoryChecks(e)}></textarea>
            </div>:'' }
            {(applicant_length===2) ?
            <div>
            <p>Applicant 2</p>

            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Have you or any household member had any Cautions, Convictions
                  or other Police involvement?
                </label>
                <div className="options">
                <label title="item1">
                    Yes 
                    <input type="radio" name="applicant2PoliceInvolvement" value="1" 
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="Yes"  
                    checked={statuoryChecksFields.applicant2PoliceInvolvement==="1"}
                     />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="applicant2PoliceInvolvement" value="0" 
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="No"  
                    checked={statuoryChecksFields.applicant2PoliceInvolvement==="0"}
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            { statuoryChecksFields.applicant2PoliceInvolvement==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value={statuoryChecksFields.applicant2PoliceInvolvementAdditionalInfo?statuoryChecksFields.applicant2PoliceInvolvementAdditionalInfo:''} name="applicant2PoliceInvolvementAdditionalInfo" onChange={(e) => this.setValueStatuoryChecks(e)}></textarea>
            </div>:''
             }
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Have you had any involvement with social services/just to let
                  you know local authority checks form part of the assessment
                  process?
                </label>
                <div className="options">
                <label title="item1">
                    Yes
                    <input type="radio" name="applicant2AssessmentProcess" value="1"
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="Yes"  
                    checked={statuoryChecksFields.applicant2AssessmentProcess==="1"}
                    />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="applicant2AssessmentProcess" value="0"
                    onChange={(e) => this.setValueStatuoryChecks(e)} 
                    placeholder="No"  
                    checked={statuoryChecksFields.applicant2AssessmentProcess==="0"}
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            { statuoryChecksFields.applicant2AssessmentProcess==="1" ? 
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value={statuoryChecksFields.applicant2AssesmentProcessAdditionalInfo?statuoryChecksFields.applicant2AssesmentProcessAdditionalInfo:''} name="applicant2AssesmentProcessAdditionalInfo" onChange={(e) => this.setValueStatuoryChecks(e)}></textarea>
            </div>
            :'' }
          </div>:''}
          </div>
          <div className="btn-wrap">
             <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default StatuoryChecks;
