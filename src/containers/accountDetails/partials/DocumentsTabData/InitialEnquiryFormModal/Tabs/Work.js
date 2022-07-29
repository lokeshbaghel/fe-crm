import React, { Component } from "react";
import BlockUI from "../../../../../../components/BlockUI";
import { displayErrorMessage } from "../../../../../../utils/helper";
import _ from "lodash";
class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workFields:{},
      exitLoop:true,
      applicant_length:1,
      errors : {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    let workFields={}
    let applicant_length=1
    if(props.listIEFormData){
      if(props.listIEFormData.hasOwnProperty('generalRecords') && !props.listIEFormData.hasOwnProperty('WorkTab')){
            applicant_length=Object.values(props.listIEFormData.generalRecords.applicantsData).length; 
      }
      if(props.listIEFormData.hasOwnProperty('WorkTab')){
        if(props.listIEFormData.hasOwnProperty('generalRecords')){
          applicant_length=Object.values(props.listIEFormData.generalRecords.applicantsData).length; 
        }
        let ExtraData = props.listIEFormData.WorkTab;
        if(ExtraData && state.exitLoop==true){
        if(ExtraData.hasOwnProperty('applicant1_occupation')){
          workFields.applicant1_occupation=ExtraData.applicant1_occupation
        }
        if(ExtraData.hasOwnProperty('applicant1_weekly_working_hours')){
          workFields.applicant1_weekly_working_hours=ExtraData.applicant1_weekly_working_hours
        }
        if(ExtraData.hasOwnProperty('applicant1Drivinglicense')){
          workFields.applicant1Drivinglicense=ExtraData.applicant1Drivinglicense
        }
        if(ExtraData.hasOwnProperty('applicant2_occupation')){
          workFields.applicant2_occupation=ExtraData.applicant2_occupation
        }
        if(ExtraData.hasOwnProperty('applicant2_weekly_working_hours')){
          workFields.applicant2_weekly_working_hours=ExtraData.applicant2_weekly_working_hours
        } 
        if(ExtraData.hasOwnProperty('applicant2Drivinglicense')){
          workFields.applicant2Drivinglicense=ExtraData.applicant2Drivinglicense
        } 
        if(ExtraData.hasOwnProperty('work_note_details')){
          workFields.work_note_details=ExtraData.work_note_details
        } 
        if(ExtraData.hasOwnProperty('work_pfc_to_consider')){
          workFields.work_pfc_to_consider=ExtraData.work_pfc_to_consider
        } 
        if(ExtraData.hasOwnProperty('work_exp_with_children')){
          workFields.work_exp_with_children=ExtraData.work_exp_with_children
        } 
       }
       if(state.exitLoop) 
          return { workFields,applicant_length,exitLoop:false } 
       else
          return { applicant_length } 

      }
    }else{
        if(props.applicantsInfo && state.exitLoop){
           applicant_length=Object.values(props.applicantsInfo).length;
        }
    }
    return { applicant_length }
  }

  setValueWork(e){
    let targetName = e.target.name;
    let workFields=this.state.workFields;
    workFields[targetName] = e.target.value;
   if(targetName==='applicant1_occupation'){
     workFields['applicant1_occupation_name'] =e.target.options[e.target.selectedIndex].text
   }
   if(targetName==='applicant2_occupation'){
     workFields['applicant2_occupation_name'] =e.target.options[e.target.selectedIndex].text
   }
    this.setState({ workFields });
  }

  //Validation fields
  validateFormCheck = () => {
    let errors = {};
    let formIsValid = true;
    let fields = this.state.workFields;
    let keyname = '';

    if(fields.applicant1_weekly_working_hours){
      if (!fields.applicant1_weekly_working_hours.match(/^-?\d*(\.\d+)?$/)) {
        formIsValid = false;
        keyname = 'applicant1_weekly_working_hours';
        errors[keyname] = "Accept only number or float values";
        this.setState({errors});
      }
    }

    if(fields.applicant2_weekly_working_hours){
      if (!fields.applicant2_weekly_working_hours.match(/^-?\d*(\.\d+)?$/)) {
        formIsValid = false;
        keyname = 'applicant2_weekly_working_hours';
        errors[keyname] = "Accept only number or float values";
        this.setState({errors});
      }
    }

    return {
      errors : errors,
      formIsValid : formIsValid
    };
  }

  /* validate form */
  validateForm = () => {
    let response = this.validateFormCheck();
    this.setState({errors: response.errors});
    return response.formIsValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let submitList={}
    if(this.state.workFields){
      submitList.WorkTab=this.state.workFields
      if (this.validateForm())
        this.props.workData(submitList)
      else
        displayErrorMessage('There is one or more fields mandatory,please check and fill information')
    }
      
  };

  render() {
    const { workFields,applicant_length, errors } = this.state;
    const { OccupationData,blocking} = this.props;  
    return (
      <React.Fragment>
         <BlockUI blocking={blocking} />
        <form onSubmit={this.handleSubmit}>
          <div className="initial-form">
            <p>Applicant 1</p>

            <div className="form-group-main-second">
              <div className="form-group">
                <label>Occupation</label>
                <select value={ workFields.applicant1_occupation?workFields.applicant1_occupation:''} onChange={(e) => this.setValueWork(e)}
                      name="applicant1_occupation">
                <option value="">Select Occupation</option>
                  {OccupationData.map((occupationList, occupationKey) => (
                          <option key={occupationKey} value={occupationList.id}>
                            {occupationList.value}
                          </option>
                        ))}
                </select>
              </div>

              <div className="form-group small-width">
                <label>Working hours per week</label>
                <div className="inner-content">
                  <input type="text" placeholder="37.5" 
                  name="applicant1_weekly_working_hours"
                  value={ workFields.applicant1_weekly_working_hours?workFields.applicant1_weekly_working_hours:''}
                  onChange={(e) => this.setValueWork(e)}
                  value={workFields.applicant1_weekly_working_hours?workFields.applicant1_weekly_working_hours:''}
                  />
                  <span>hrs</span>
                </div>
                <small className="form-text text-danger">{errors["applicant1_weekly_working_hours"]}</small>
              </div>
            </div>
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>Do you have a driving license</label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="applicant1Drivinglicense"
                    value="1" 
                    onChange={(e) => this.setValueWork(e)} 
                    placeholder="yes"
                    checked={workFields.applicant1Drivinglicense==="1"}
                    />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="applicant1Drivinglicense" value="0" 
                    onChange={(e) => this.setValueWork(e)} 
                    placeholder="no"  
                    checked={workFields.applicant1Drivinglicense==="0"}
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group full-width">
              <label>Please note any details</label>
              <textarea placeholder="..." name="work_note_details" value={workFields.work_note_details?workFields.work_note_details:''} onChange={(e) => this.setValueWork(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>
                Ask the PFC to consider (but not answer now) how they might manage
                balancing the fostering task with any employment? (at this point
                do they have an intention to give up work? PFC to CONSIDER
                availability for school runs, contact, meetings etc)
              </label>
              <textarea placeholder="..." value={workFields.work_pfc_to_consider?workFields.work_pfc_to_consider:''} name="work_pfc_to_consider" onChange={(e) => this.setValueWork(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>
                Describe any experience with children or vulnerable adults? This
                may include previous employment or voluntary work.
              </label>
              <textarea placeholder="..."  value={workFields.work_exp_with_children?workFields.work_exp_with_children:''} name="work_exp_with_children" onChange={(e) => this.setValueWork(e)}></textarea>
            </div>
        
           { (applicant_length===2) ? 
           <div>
            <p>Applicant 2</p>
            <div className="form-group-main-second">
              <div className="form-group">
                <label>Occupation</label>
                <select name="applicant2_occupation" value={workFields.applicant2_occupation?workFields.applicant2_occupation:''} onChange={(e) => this.setValueWork(e)}>
                <option value="">Select Occupation</option>
                  {OccupationData.map((occupationList, occupationKey) => (
                          <option key={occupationKey} value={occupationList.id}>
                            {occupationList.value}
                          </option>
                        ))}
                </select>
              </div>

              <div className="form-group small-width">
                <label>Working hours per week</label>
                <div className="inner-content">
                  <input type="text" value={workFields.applicant2_weekly_working_hours?workFields.applicant2_weekly_working_hours:''}  placeholder="37.5" 
                  name="applicant2_weekly_working_hours"
                  onChange={(e) => this.setValueWork(e)}/>
                  <span>hrs</span>
                </div>
                <small className="form-text text-danger">{errors["applicant2_weekly_working_hours"]}</small>
              </div>
            </div>

            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>Do you have a driving license</label>
                <div className="options">
                <label title="item1">
                    Yes
                    <input type="radio" name="applicant2Drivinglicense"
                    value="1"
                    onChange={(e) => this.setValueWork(e)} 
                    placeholder="yes"
                    checked={workFields.applicant2Drivinglicense==="1"}
                   />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="applicant2Drivinglicense" value="0" 
                    onChange={(e) => this.setValueWork(e)} 
                    placeholder="no"  
                    checked={workFields.applicant2Drivinglicense==="0"}
                     />
                    <img />
                  </label>
                </div>
              </div>
            </div>
              </div> :'' }
          </div>
           <div className="btn-wrap">
              <button type="submit" className="btn btn-primary">Save</button>
           </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Work;
