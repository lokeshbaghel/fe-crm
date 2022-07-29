import React, { Component,useLayoutEffect } from "react";
import BlockUI from "../../../../../../components/BlockUI";
const _ = require('lodash');

class AgencyVisit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        agencyVisitFields:{},
        exitLoop:{}
    };
    this.errorFinal = React.createRef();
    this.buttonRef2 = React.createRef();
  }

  componentDidUpdate(){
    if(!_.isEmpty(this.props.responceBack)){
      if(this.props.responceBack.errors){
           this.errorFinal.current.scrollIntoView();
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.listIEFormData && props.listIEFormData.hasOwnProperty('AgencyVisitTab') && state.exitLoop){
      let agencyVisitFields={};
      let ExtraData = props.listIEFormData.AgencyVisitTab;
      if(ExtraData){
        if(ExtraData.hasOwnProperty('initialVisit')){
          agencyVisitFields.initialVisit=ExtraData.initialVisit
        }
        if(ExtraData.hasOwnProperty('initialVisitDetails')){
          agencyVisitFields.initialVisitDetails=ExtraData.initialVisitDetails
        }
        if(ExtraData.hasOwnProperty('nurturingDetails')){
          agencyVisitFields.nurturingDetails=ExtraData.nurturingDetails
        }
        if(ExtraData.hasOwnProperty('recommendedNurturingVisit')){
          agencyVisitFields.recommendedNurturingVisit=ExtraData.recommendedNurturingVisit
        }
        if(ExtraData.hasOwnProperty('passingoverDetails')){
          agencyVisitFields.passingoverDetails=ExtraData.passingoverDetails
        }
        if(ExtraData.hasOwnProperty('preferedMethodDetails')){
          agencyVisitFields.preferedMethodDetails=ExtraData.preferedMethodDetails
        }
        if(ExtraData.hasOwnProperty('preferedDateTimeDetails')){
          agencyVisitFields.preferedDateTimeDetails=ExtraData.preferedDateTimeDetails
        }
      }
      return { agencyVisitFields,exitLoop: false };
    }
    return null;
  }

  setValueHealth(e){
    let targetName = e.target.name;
    let agencyVisitFields=this.state.agencyVisitFields;
    agencyVisitFields[targetName] = e.target.value;
    this.setState({ agencyVisitFields });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let submitList={}
    if(this.state.agencyVisitFields)
      submitList.AgencyVisitTab=this.state.agencyVisitFields
      this.props.agencyVisitData(submitList);
      this.buttonRef2.current.blur();
  };
  submitFinalData=(event)=>{
    event.preventDefault();
    let submitList={}
    if(this.state.agencyVisitFields)
      submitList.AgencyVisitTab=this.state.agencyVisitFields
      this.props.finalSubmitIEForm(submitList);
  }
 

  render() {
    const {agencyVisitFields} = this.state;
    let {responceBack,blocking}=this.props;
   
    return (
      <React.Fragment>
         <div ref={this.errorFinal}>
         {
              !_.isEmpty(responceBack)?
              responceBack.errors ? responceBack.errors.map(data => (<div key={data}><div role="alert" className="fade alert alert-danger show">Please fill the { data } data</div></div>)):''
              :''
          }
          </div>
        <BlockUI blocking={blocking} />
        <form onSubmit={this.handleSubmit}>
          <div className="initial-form">
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>Recommend for initial visit?</label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="initialVisit"
                    value="1" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="yes"
                    checked={agencyVisitFields.initialVisit==="1"} />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="initialVisit" value="0" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="no"  
                    checked={agencyVisitFields.initialVisit==="0"} />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            {agencyVisitFields.initialVisit==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value= { agencyVisitFields.initialVisitDetails ? agencyVisitFields.initialVisitDetails:'' } 
                        name="initialVisitDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
            </div>
            : "" }
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Recommended for nurturing visit – potential for the future
                </label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="recommendedNurturingVisit"
                    value="1" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="yes"
                    checked={agencyVisitFields.recommendedNurturingVisit==="1"} />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="recommendedNurturingVisit" value="0" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="no"  
                    checked={agencyVisitFields.recommendedNurturingVisit==="0"} />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            { agencyVisitFields.recommendedNurturingVisit==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value= { agencyVisitFields.nurturingDetails ? agencyVisitFields.nurturingDetails : '' } name="nurturingDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
            </div> :''
            }

            <div className="form-group full-width">
              <label>Summary of reasons for passing over</label>
              <textarea value= { agencyVisitFields.passingoverDetails ? agencyVisitFields.passingoverDetails :'' } placeholder="..." name="passingoverDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Preferred method of contact over the next few days</label>
              <textarea value={ agencyVisitFields.preferedMethodDetails ? agencyVisitFields.preferedMethodDetails :'' } placeholder="..." name="preferedMethodDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Availability for IV/preferred date/time</label>
              <textarea placeholder="..." name="preferedDateTimeDetails" value={ agencyVisitFields.preferedDateTimeDetails ? agencyVisitFields.preferedDateTimeDetails : '' } onChange={(e) => this.setValueHealth(e)}></textarea>
            </div>
          </div>
          <div className="btn-wrap">
             <button type="submit" ref={this.buttonRef2} className="btn btn-primary mr-3">Save</button>
             <button type="button" ref={this.buttonRef} className="btn btn-primary" onClick={ (e)=>this.submitFinalData(e) }>Submit</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AgencyVisit;
