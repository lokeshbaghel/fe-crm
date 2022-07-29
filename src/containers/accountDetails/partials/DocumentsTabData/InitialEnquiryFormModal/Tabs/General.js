import React, { Component } from "react";
import moment from "moment";
import BlockUI from "../../../../../../components/BlockUI";
import { isValid } from "postcode";

import { images, displayErrorMessage, validateEmail } from "../../../../../../utils/helper";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: [],
      exitLoop: true,
      outsideFields:{},
      errors : {}
    };
    this.mobile1 = React.createRef();
    this.first_name0 = React.createRef();
    this.first_name1 = React.createRef();
    this.last_name0 = React.createRef();
    this.last_name1 = React.createRef();
    this.post_code0 = React.createRef();
    this.post_code1 = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    
    if(props.listIEFormData && props.listIEFormData.hasOwnProperty('generalRecords') && state.exitLoop){
      
      let applicants = [];
      let outsideFields={};
      let appicantLoop = props.listIEFormData.generalRecords.applicantsData;
      let ExtraData = props.listIEFormData.generalRecords.ExtraData;
      let keyFieldData = [];
      Object.keys(appicantLoop).map((keyfield) => {
        keyFieldData = appicantLoop[keyfield];
        applicants[keyfield] = keyFieldData;
      });
      
      if(ExtraData){
        if(ExtraData.hasOwnProperty('fostering_advisory')){
           outsideFields.fostering_advisory=ExtraData.fostering_advisory
        }
        if(ExtraData.hasOwnProperty('CarerReferal')){
          outsideFields.CarerReferal=ExtraData.CarerReferal
        }
        if(ExtraData.hasOwnProperty('carer_name')){
          outsideFields.carer_name=ExtraData.carer_name
        }
        if(ExtraData.hasOwnProperty('additional_notes')){
          outsideFields.additional_notes=ExtraData.additional_notes
        }
        if(ExtraData.hasOwnProperty('date_enquired')){
          outsideFields.date_enquired=ExtraData.date_enquired
        }
        if(ExtraData.hasOwnProperty('code')){
         outsideFields.code=ExtraData.code
        }
        if(ExtraData.hasOwnProperty('application_status')){
          outsideFields.application_status=ExtraData.application_status
        }
        if(ExtraData.hasOwnProperty('hear_about_us')){
          outsideFields.hear_about_us=ExtraData.hear_about_us
        } 
        if(ExtraData.hasOwnProperty('FosteringExperience')){
          outsideFields.FosteringExperience=ExtraData.FosteringExperience
        } 
        if(ExtraData.hasOwnProperty('existing_carer1')){
          outsideFields.existing_carer1=ExtraData.existing_carer1
        } 
        if(ExtraData.hasOwnProperty('existing_carer2')){
          outsideFields.existing_carer2=ExtraData.existing_carer2
        } 
        if(ExtraData.hasOwnProperty('existing_carer3')){
          outsideFields.existing_carer3=ExtraData.existing_carer3
        } 
        if(ExtraData.hasOwnProperty('existing_carer4')){
          outsideFields.existing_carer4=ExtraData.existing_carer4
        } 
        if(ExtraData.hasOwnProperty('existing_carer5')){
          outsideFields.existing_carer5=ExtraData.existing_carer5
        } 
        if(ExtraData.hasOwnProperty('marketing_consent')){
          outsideFields.marketing_consent=ExtraData.marketing_consent
        } 
        if(ExtraData.hasOwnProperty('local_autority')){
          outsideFields.local_autority=ExtraData.local_autority
        } 
        if(ExtraData.hasOwnProperty('NationalForsteringGroup')){
          outsideFields.NationalForsteringGroup=ExtraData.NationalForsteringGroup
        } 
        if(ExtraData.hasOwnProperty('employee_name')){
          outsideFields.employee_name=ExtraData.employee_name
        } 
        if(ExtraData.hasOwnProperty('agency')){
          outsideFields.agency=ExtraData.agency
        } 
        if(ExtraData.hasOwnProperty('relationship')){
          outsideFields.relationship=ExtraData.relationship
        }
        if(ExtraData.hasOwnProperty('additional_notes')){
          outsideFields.additional_notes=ExtraData.additional_notes
        } 
      }
      return { applicants,outsideFields, exitLoop: false };
    }
    else if (props.applicantsInfo !== state.fields && state.exitLoop) {
      
      let applicants = [];
      let outsideFields=state.outsideFields
      let marketing_tab=props.marketing_tab ? props.marketing_tab : ''
      let appicantLoop = props.applicantsInfo;
      let keyFieldData = [];
      Object.keys(appicantLoop).map((keyfield) => {
        keyFieldData = appicantLoop[keyfield];
        applicants[keyfield] = keyFieldData;
      });
      if(marketing_tab)
           outsideFields.marketing_consent=marketing_tab
      return { outsideFields , applicants , exitLoop: false };
    }
    // else if(props.listIEFormData && props.listIEFormData.generalRecords && props.listIEFormData.generalRecords.ExtraData.local_autority ){
    //   let applicants = [];
    //   let outsideFields=state.outsideFields
    //   let appicantLoop = props.applicantsInfo;
    //   let keyFieldData = [];
    //   let ExtraData = props.listIEFormData.generalRecords.ExtraData;
    //   Object.keys(appicantLoop).map((keyfield) => {
    //     keyFieldData = appicantLoop[keyfield];
    //     applicants[keyfield] = keyFieldData;
    //   });
    //   if(ExtraData.hasOwnProperty('local_autority')){
    //     outsideFields.local_autority=ExtraData.local_autority
    //   }
    //   return { outsideFields , applicants , exitLoop: false };
    // }
    
    if(props.authority_id !== undefined ){

      let applicants = [...state.applicants];       
      let outsideFields = state.outsideFields;
      applicants[0].local_autority = props.authority_id;
      outsideFields.local_autority = props.authority_id;
      return { applicants, outsideFields }
          
    }
    return null;
  }

  setValue = (key, e) => {
    let targetName = "";
    targetName = e.target.name;
    let applicants = [...this.state.applicants];
    let applicant = { ...applicants[key] };
    applicant[targetName] = e.target.value;
    applicants[key] = applicant;
    if(targetName=='ethnic_origin_id'){
      applicant['ethnic_origin_name'] =e.target.options[e.target.selectedIndex].text
      applicants[key] = applicant;
    }
    if(targetName=='title' || targetName=='country_birth'|| targetName=='relationship_status'|| 
       targetName=='hear_about_us' || targetName=='hear_about_us'){
      applicant[`${targetName+'_name'}`] =e.target.options[e.target.selectedIndex].text
      applicants[key] = applicant;
    }
    // if(targetName=='post_code'){
    //   let a = this.props.LocalAuthorityData.find( ({ post_code }) => post_code === e.target.value );
    //   console.log('LocalAuthorityData',a);
    // }
    this.setState({ applicants });
  };
  setValueOutside(e){
    let targetName = e.target.name;
    let outsideFields=this.state.outsideFields;
    outsideFields[targetName] = e.target.value;
    if(targetName=='application_status'){
      outsideFields['ApplicantStatus_name'] =e.target.options[e.target.selectedIndex].text
    }
    if(targetName=='agency'){
      outsideFields['agency_name'] =e.target.options[e.target.selectedIndex].text
      outsideFields['agency_code'] =e.target.options[e.target.selectedIndex].getAttribute('agency_code')
    }
    if(targetName=='relationship'){
      outsideFields['relationship_name'] =e.target.options[e.target.selectedIndex].text
    }
    this.setState({ outsideFields });
  }
  
   /* applicant validation */
   validateFormCheck = () => {
    let errors = {};
    let formIsValid = true;
    let fields = this.state.applicants;
    let outsideFields = this.state.outsideFields;
    let keyname = '';
    fields.map((data,key)=>{
          if(data['address1'] && data['address1'].length > 50){
            formIsValid = false;
            keyname = 'address1'+key;
            errors[keyname]= "Max 50 characters allow";
            this.setState({errors});
          }

          if(data['address2'] && data['address2'].length > 50){
            formIsValid = false;
            keyname = 'address2'+key;
            errors[keyname]= "Max 50 characters allow";
            this.setState({errors});
          }   

          if(data['city'] && data['city'].length > 50){
            formIsValid = false;
            keyname = 'city'+key;
            errors[keyname]= "Max 50 characters allow";
            this.setState({errors});
          }

          if (data['mobile_country_code']) {
            if(data['mobile_country_code'].length > 2){
                formIsValid = false;
                keyname = 'mobile_country_code'+key;
                errors[keyname]= "Max 2 characters allow for Country Code";
                this.setState({errors});
            }
            else if (!data['mobile_country_code'].match(/^([0-9]{2})$/)) {
                formIsValid = false;
                keyname = 'mobile_country_code'+key;
                errors[keyname]= "Invalid Country Code";
                this.setState({errors});
            }
            else if(!data["mobile"]){
              formIsValid = false;
              keyname = 'mobile'+key;
              errors[keyname] = "Please enter mobile number";
              this.setState({errors});
            }
          }

          if (data["mobile"]) {
            if (!data["mobile"].match(/^([0-9]{11})$/)) {
                formIsValid = false;
                keyname = 'mobile'+key;
                errors[keyname] = "Please enter a 11 digit number";
                this.mobile1.current.focus();
                this.setState({errors});
            }
            // else if(!data['mobile_country_code']){
            //     formIsValid = false;
            //     keyname = 'mobile_country_code'+key;
            //     errors[keyname]= "Please enter Country Code";
            //     this.setState({errors});
            // }
          }

          //if(data['telephone_country_code']){
            // if(data['telephone_country_code'].length > 2){
            //   formIsValid = false;
            //   keyname = 'telephone_country_code'+key;
            //   errors[keyname]= "Max 2 characters allow for Country Code";
            //   this.setState({errors});
            // }
            // if (!data['telephone_country_code'].match(/^([0-9]{2})$/)) {
            //     formIsValid = false;
            //     keyname = 'telephone_country_code'+key;
            //     errors[keyname]= "Invalid Country Code";
            //     this.setState({errors});
            // }
            if(!data["telephone"]){
              formIsValid = false;
              keyname = 'telephone'+key;
              errors[keyname] = "Please enter telephone number";
              this.setState({errors});
            }
         // }

          if (data["telephone"]) {
            if (!data["telephone"].match(/^([0-9]{11})$/)) {
                formIsValid = false;
                keyname = 'telephone'+key;
                errors[keyname] = "Please enter a 11 digit number";
                this.setState({errors});
            }
            // else if(!data['telephone_country_code']){
            //     formIsValid = false;
            //     keyname = 'telephone_country_code'+key;
            //     errors[keyname]= "Please enter Country Code";
            //     this.setState({errors});
            // }
          }

          if(data["email"]){
            if (!validateEmail(data["email"])) {
              formIsValid = false;
              keyname = 'email'+key;
              errors[keyname] = "Please enter valid email.";
              this.setState({errors});
            }
            else if(data["email"] && data["email"].length > 100){
              formIsValid = false;
              keyname = 'email'+key;
              errors[keyname] = "Max 100 characters allow";
              this.setState({errors});
            }
          }

          if(data["year_move_touk"]){
            if (!data["year_move_touk"].match(/^([0-9]{4})$/)) {
              formIsValid = false;
              keyname = 'year_move_touk'+key;
              errors[keyname] = "Invalid Year Value";
              this.setState({errors});
            }
            else if(data["year_move_touk"].match(/^([0-9]{4})$/)){
              if(data["year_move_touk"] > moment().format("YYYY")){
                formIsValid = false;
                keyname = 'year_move_touk'+key;
                errors[keyname] = "Invalid Year Value";
                this.setState({errors});
              }
            }
          }
        
          if (!data['post_code'] || data['post_code'].trim() == '') {
            formIsValid = false;
            keyname = 'post_code'+key;
            errors[keyname]= "Please enter your postcode";
            if(keyname==='post_code0')
              this.post_code0.current.focus();
            if(keyname==='post_code1')
              this.post_code1.current.focus();
            this.setState({errors});
          }
          else if(data['post_code']){
            if(!isValid(data['post_code'])){
              formIsValid = false;
                keyname='post_code'+key
                errors[keyname]= "Please enter valid Postcode";
                if(keyname==='post_code0')
                  this.post_code0.current.focus();
                if(keyname==='post_code1')
                  this.post_code1.current.focus();
                this.setState({errors});
            }
          }  
          
        if(!data['first_name'] || data['first_name'].trim() == '') {
          formIsValid=false
          keyname=`first_name${key}`
          errors[keyname]= "Please enter your name.";
          if(keyname==='first_name0')
             this.first_name0.current.focus();
          if(keyname==='first_name1')
             this.first_name1.current.focus();
                
        }else if(data['first_name'].length > 50){
          formIsValid=false
          keyname=`first_name${key}`
          errors[keyname]= "Max 50 characters allow";
          if(keyname==='first_name0')
             this.first_name0.current.focus();
          if(keyname==='first_name1')
             this.first_name1.current.focus();
        }
      
        if (!data['last_name'] || data['last_name'].trim() == '') {
          formIsValid=false
          keyname='last_name'+key
          errors[keyname]= "Please enter your surname.";
          if(keyname==='last_name0')
            this.last_name0.current.focus();
          if(keyname==='last_name1')
            this.last_name1.current.focus();
          this.setState({errors});
        }else if(data['last_name'].length > 50){
          formIsValid=false
          keyname='last_name'+key
          if(keyname==='last_name0')
             this.last_name0.current.focus();
          if(keyname==='last_name1')
             this.last_name1.current.focus();
          errors[keyname]= "Max 50 characters allow";
        }
       
      })

      if(outsideFields.fostering_advisory && outsideFields.fostering_advisory.length > 200){
        formIsValid=false;
        keyname='fostering_advisory';
        errors[keyname]= "Max 200 characters allow";
        this.setState({errors});
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
  handleSubmit =(event) => {
    event.preventDefault();
    let submitList={}
    let arrayGeneral={}
    if(this.state.outsideFields)
      submitList.ExtraData=this.state.outsideFields

    if(this.state.applicants){
      submitList.applicantsData=this.state.applicants
      arrayGeneral.generalRecords=submitList;
      if (this.validateForm()) 
         this.props.submitIeFormData(arrayGeneral);
      else
        displayErrorMessage('There is one or more fields mandatory,please check and fill information')
    }
  };
  createNewApplicant=()=>{
    let applicants= {...this.state.applicants.splice(1, 0, 1)};
    this.setState(applicants);
  }

  setLocalValue = (key) => {
      
      if(this.state.applicants[key].post_code){
         
          this.props.submitPostCode(this.state.applicants[key].post_code);
          
      }else{
        let errors = {};
        let keyname = '';
        keyname = 'post_code'+key;
        errors[keyname] = "Please enter post code";
        this.post_code0.current.focus();
        this.setState({errors});
      }
    
  };

  
  render() {
    const { applicants,outsideFields,errors} = this.state;
    const { marketingList,personeEnquiryData,ethnicOriginList,personTitleList,applicantsInfo,
            agencyList,RelationshipStatusData,CountryData,CurrentSituationData,RelationshipData,
            LocalAuthorityData,FosteringHistoryData,blocking
          } = this.props;
    const keyValue = 1;
    let enqDate = "";
    if (personeEnquiryData?.enquiry_ts)
      enqDate = moment(personeEnquiryData?.enquiry_ts).format("YYYY-MM-DD");

    return (
      <>
       <BlockUI blocking={blocking} />
        <form onSubmit={this.handleSubmit}>
          <div className="initial-form">
            <div className="form-group-main">
              <div className="form-group">
                <label>Fostering advisor/CRO</label>
                <input 
                  type="text"
                  placeholder="Fostering advisor/CRO"
                  name="fostering_advisory"
                  onChange={(e) => this.setValueOutside(e)}
                  value={ outsideFields.fostering_advisory ?outsideFields.fostering_advisory:''}
                />
                <small className="form-text text-danger">{errors["fostering_advisory"]}</small>
              </div>

              <div className="form-group">
                <label>Date Enquired</label>
                <input
                  type="date"
                  placeholder="Date Enquired"
                  name="date_enquired"
                  onChange={(e) => this.setValueOutside(e)}
                  value={ outsideFields.date_enquired ?outsideFields.date_enquired: enqDate ? enqDate : ''}
                />
              </div>

              <div className="form-group">
                <label>Charms ID</label>
                <input
                  type="text"
                  placeholder=""
                  name="charm_id"
                  defaultValue={""}
                  disabled
                />
              </div>
            </div>

            <div className="form-group-main">
              <div className="form-group">
                <label>How did you hear about us?</label>
                <select
                  onChange={(e) => this.setValueOutside(e)}
                  name="hear_about_us"
                  value={ outsideFields.hear_about_us ?outsideFields.hear_about_us: personeEnquiryData?.marketing_source || ""}
                >
                  <option value="">Select</option>
                  {marketingList.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Code</label>
                <input
                  type="text"
                  placeholder="Code"
                  name="code"
                  value={outsideFields.code ? outsideFields.code:''}
                  onChange={(e) => this.setValueOutside(e)}
                />
              </div>

              <div className="form-group">
                <label>Applicant Status</label>
                <select name="application_status" value={ outsideFields.application_status ? outsideFields.application_status:''}  onChange={(e) => this.setValueOutside(e)}>
                  <option value="">Select Applicant Status</option>
                  {CurrentSituationData.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>
            <div className="form-group-main">
            <div className="form-group">
              <div className="checkbox-main">
                  <div className="checkbox-wrap">
                    <p>Carer Referal</p>
                    <div
                      className="options"
                    >
                      <label title="item1">
                        Yes
                        <input
                          type="radio"
                          value="1"
                          name="CarerReferal"
                          placeholder="1"
                          onChange={(e) => this.setValueOutside(e)}
                          checked={outsideFields.CarerReferal==="1"}
                        />
                        <img />
                      </label>
                      <label title="item2">
                        No
                        <input
                          type="radio"
                          value="0"
                          name="CarerReferal"
                          placeholder="0"
                          onChange={(e) => this.setValueOutside(e)}
                          checked={outsideFields.CarerReferal==="0"}
                        />
                        <img />
                      </label>
                    </div>
                  </div>
                </div>
                {(outsideFields.CarerReferal === "1") ? (
                  <div>
                    <label>Name of Carer</label>
                    <input
                      type="text"
                      name="carer_name"
                      placeholder="Carer Name"
                      onChange={(e) => this.setValueOutside(e)}
                      value={outsideFields.carer_name ? outsideFields.carer_name : ""}
                    />
                  </div>
                ) : (
                  ""
                )}
             </div>
             <div className="form-group">
                <h3>Marketing Consent</h3>
                <h4>
                  Would you like us to include you in our newsletter and keep
                  you informed of events in your area ?
                </h4>

                <div className="checkbox-main">
                  <div className="checkbox-wrap">
                    <div className="options">
                      <label title="item1">
                        Yes
                        <input type="radio" checked={outsideFields.marketing_consent==1 }  name="marketing_consent" value={1}  onChange={(e) => this.setValueOutside(e)} />
                        <img />
                      </label>
                      <label title="item2">
                        No
                        <input type="radio" checked={outsideFields.marketing_consent==2 }  name="marketing_consent" value={2}  onChange={(e) => this.setValueOutside(e)} />
                        <img />
                      </label>
                    </div>
                  </div>

               </div>

               </div>
              
               <div className="form-group">
                    <label>Local Authority</label>
                    <select disabled
                      onChange={(e) => this.setValueOutside(e)}
                      name="local_autority"
                      value={outsideFields.local_autority ? outsideFields.local_autority : ""}
                    >
                      <option value="">Select</option>
                      {LocalAuthorityData.map((data, key) => {
                        return (
                          <option value={data.id} key={key}>
                            {data.authority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
            
             </div>

            <div className="form-group full-width">
               <div className="checkbox-main">
                  <div className="checkbox-wrap">
                    <p>
                      Do you know or are you related to anyone who works for the
                      National Forstering Group?
                    </p>
                    <div
                      className="options"
                    >
                      <label title="item1">
                        Yes
                        <input
                          type="radio"
                          value="1"
                          name="NationalForsteringGroup"
                          placeholder="1"
                          onChange={(e) => this.setValueOutside(e)}
                          checked={outsideFields.NationalForsteringGroup==="1"}
                        />
                        <img />
                      </label>    
                      <label title="item2">
                        No
                        <input
                          type="radio"
                          value="0"
                          name="NationalForsteringGroup"
                          placeholder="0"
                          onChange={(e) => this.setValueOutside(e)}
                          checked={outsideFields.NationalForsteringGroup==="0"}
                        />
                        <img />
                      </label>
                    </div>
                  </div>
                </div>
                {(outsideFields.NationalForsteringGroup === "1") ? (
                  <div className="form-group-main">
                    <div className="form-group">
                      <label>Employee Name</label>
                      <input
                        type="text"
                        name="employee_name"
                        placeholder="Employee Name"
                        onChange={(e) => this.setValueOutside(e)}
                        value={outsideFields.employee_name ? outsideFields.employee_name : ""}
                      />
                    </div>

                    <div className="form-group">
                      <label>Agency</label>
                      <select name="agency" value={outsideFields.agency ? outsideFields.agency : ""}  onChange={(e) => this.setValueOutside(e)}>
                        <option value="">Select Agency</option>
                        {agencyList.map((agency_list, aggency_key) => (
                          <option agency_code={agency_list.short_code} key={aggency_key} value={agency_list.id}>
                            {agency_list.agency_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Relationship</label>
                      <select name="relationship" value={outsideFields.relationship ? outsideFields.relationship : ""} onChange={(e) => this.setValueOutside(e)}>
                      <option value="">Select relationship</option>
                       {RelationshipData.map((relationship_list, relationship_key) => (
                          <option key={relationship_key} value={relationship_list.id}>
                            {relationship_list.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}
               </div>
          

            <div className="form-group full-width">
                  <label>Additional Notes</label>
                  <textarea onChange={(e) => this.setValueOutside(e)} name="additional_notes" placeholder="..." value={outsideFields.additional_notes?outsideFields.additional_notes:''}></textarea>
                
              </div>

            {applicants.map((data, key) => (
              <div key={key}>
                <h2>For Applicant {key + 1}</h2>
                <div className="form-group">
                  <p>Enquirer Information</p>
                  <label>Title</label>
                  <select
                    name="title"
                    value={data.title}
                    onChange={(e) => this.setValue(key, e)}
                    value={data.title ? data.title : ""}
                  >
                    <option value="">Select</option>
                    {personTitleList.map((data, key) => {
                      return (
                        <option value={data.id} key={key}>
                          {data.title}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group-main">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      onChange={(e) => this.setValue(key, e)}
                      value={data.first_name ? data.first_name : ""}
                      ref={this["first_name"+key]}
                    />
                    <small className="form-text text-danger">{errors["first_name"+key]}</small>
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={(e) => this.setValue(key, e)}
                      ref={this["last_name"+key]}
                      value={data.last_name ? data.last_name : ""}
                    />
                    <small className="form-text text-danger">{errors["last_name"+key]}</small>
                  </div>

                  <div className="form-group">
                    <label>DOB</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      placeholder="01/04/1987"
                      onChange={(e) => this.setValue(key, e)}
                      value={data.date_of_birth ? data.date_of_birth : ""}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Ethnic background</label>
                  <select
                    name="ethnic_origin_id"
                    value={data.ethnic_origin_id?data.ethnic_origin_id:''}
                    onChange={(e) => this.setValue(key, e)}
                  >
                    <option value="">Select</option>
                    {ethnicOriginList.map((data, key) => {
                      return (
                        <option value={data.id} key={key}>
                          {data.ethnic_origin}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <p>Contact Information</p>
                  <label>Postcode</label>
                  <div className="input-btn-wrap">
                    <input
                      onChange={(e) => this.setValue(key, e)}
                      type="text"
                      name="post_code"
                      placeholder="CH2 2AP"
                      ref={this["post_code"+key]}
                      value={data.post_code ? data.post_code : ""}
                    />
                    <small className="form-text text-danger">{errors["post_code"+key]}</small>
                    { ( (key===0)) ? (
                      <button type="button"  onClick={(e) => this.setLocalValue(key)} >Search</button>
                    ) : '' }
                    
                  </div>
                </div>
                <div className="form-group-main">
                  <div className={`form-group address-select double-group`}>
                    <label>Address Line 1</label>
                    <input
                      onChange={(e) => this.setValue(key, e)}
                      type="text"
                      placeholder="Address Line 1"
                      name="address1"
                      value={data.address1 ? data.address1 : ""}
                    />
                    <small className="form-text text-danger">{errors["address1"+key]}</small>
                  </div>
                  <div className={`form-group address-input address-select`}>
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      onChange={(e) => this.setValue(key, e)}
                      placeholder="Address Line 2"
                      name="address2"
                      value={data.address2 ? data.address2 : ""}
                    />
                    <small className="form-text text-danger">{errors["address2"+key]}</small>
                  </div>
                </div>
                <div className="form-group-main">
                  <div className="form-group address-select">
                    <label>City/Town</label>
                    <input
                      type="text"
                      onChange={(e) => this.setValue(key, e)}
                      name="city"
                      placeholder="City/Town"
                      value={data.city ? data.city : ""}
                    />
                    <small className="form-text text-danger">{errors["city"+key]}</small>
                  </div>
                 </div>

                <div className="form-group-main number-div mb-3">
                  <div className="number-wrap">
                    {/* <div className="country-code-wrap">
                      <label>Country Code</label>
                      <div className="country-wrap">
                        <span>+</span>
                        <input
                          type="text"
                          onChange={(e) => this.setValue(key, e)}
                          className="country_code_telephone"
                          name="mobile_country_code"
                          value={
                            data.mobile_country_code
                              ? data.mobile_country_code
                              : ""
                          }
                          placeholder="44"
                        />
                        
                      </div>
                    </div> */}

                    <div className="mobile-no-wrap">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        name="mobile"
                        ref={this.mobile1}
                        onChange={(e) => this.setValue(key, e)}
                        value={data.mobile ? data.mobile : ""}
                      />
                    </div>
                    <span className="msg-wrap">
                      <small className="form-text text-danger">{errors["mobile_country_code"+key]}</small>
                      <small className="form-text text-danger">{errors["mobile"+key]}</small>
                    </span>
                  </div>

                  <div className="number-wrap">
                    {/* <div className="country-code-wrap">
                      <label>Country Code</label>
                      <div className="country-wrap">
                        <span>+</span>
                        <input
                          type="text"
                          className="country_code_telephone"
                          name="telephone_country_code"
                          onChange={(e) => this.setValue(key, e)}
                          value={
                            data.telephone_country_code
                              ? data.telephone_country_code
                              : ""
                          }
                          placeholder="44"
                        />
                      </div>
                    </div> */}
                    <div className="mobile-no-wrap">
                      <label>Landline Telephone Number</label>
                      <input
                        type="text"
                        className="country_code_telephone"
                        name="telephone"
                        placeholder="Telephone Number"
                        onChange={(e) => this.setValue(key, e)}
                        value={data.telephone ? data.telephone : ""}
                      />
                    </div>
                    <span className="msg-wrap">
                       { /*<small className="form-text text-danger">{errors["telephone_country_code"+key]}</small> */ }
                      <small className="form-text text-danger">{errors["telephone"+key]}</small>
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="email"
                      onChange={(e) => this.setValue(key, e)}
                      placeholder="Email"
                      value={data.email ? data.email : ""}
                    />
                    <small className="form-text text-danger">{errors["email"+key]}</small>
                  </div>
                </div>
                <div className="form-group">
                  <label>Relationship Status</label>
                  <select name="relationship_status"  onChange={(e) => this.setValue(key, e)} value={data.relationship_status ? data.relationship_status :''}>
                    <option value="">Select</option>
                    {RelationshipStatusData.map(
                      (relationshipData, relationshipKey) => {
                        return (
                          <option
                            value={relationshipData.id}
                            key={relationshipKey}
                          >
                            {relationshipData.value}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Relationship Notes</label>
                  <textarea name="relationship_notes" onChange={(e) => this.setValue(key, e)} placeholder="..." value={data.relationship_notes?data.relationship_notes:''}></textarea>
                </div>
                <div className="form-group-main">
                  <div className="form-group">
                    <label>Country of Birth</label>
                    <select name="country_birth" onChange={(e) => this.setValue(key, e)} value={data.country_birth?data.country_birth:''}>
                    <option value="">Select</option>
                      {CountryData.map((countryListData, countryDataKey) => {
                        return (
                          <option
                            value={countryListData.id}
                            key={countryDataKey}
                          >
                            {countryListData.country_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Year Moved to The UK</label>
                    <input onChange={(e) => this.setValue(key, e)} value={data.year_move_touk ? data.year_move_touk : ''} type="text" name="year_move_touk" placeholder="Year Moved to The UK" />
                    <small className="form-text text-danger">{errors["year_move_touk"+key]}</small>
                  </div>

                  <div className="form-group">
                    <label>Indefinite Leave ro Remain in the UK</label>
                    <select onChange={(e) => this.setValue(key, e)} name="indefinite_leave" value={data.indefinite_leave?data.indefinite_leave:''} >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(applicantsInfo).length === 1 && applicants.length<=1 ? (
              <div className="accordion" id="accordionSecondApplicant" onClick={data=>this.createNewApplicant(data)}>
                <span
                  className="add-second-applicant"
                >
                  <img src={images["add-applicant.png"]} />
                  Add A Second Applicant
                </span>
              </div>
            ) : (
              ""
            )}

            <div className="checkbox-main seocond-box">
              <div className="checkbox-wrap">
                <p>Fostering Experience</p>
                <div className="options">
                  {FosteringHistoryData.map(
                    (fosteringListData, fosteringDataKey) => {
                      return (
                        <label key={fosteringDataKey}>
                          {fosteringListData.value}
                          <input
                            onChange={(e) => this.setValueOutside(e)}
                            type="radio"
                            name="FosteringExperience"
                            checked={outsideFields.FosteringExperience==fosteringListData.value}
                            value={fosteringListData.value}
                          />
                          <img />
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="form-group full-width">
              <p>Existing Carers Only</p>
              <label>
                Which Local Authority or Agency is the carer registered with?
              </label>
              <textarea value={outsideFields.existing_carer1 ? outsideFields.existing_carer1:''} placeholder="..." name="existing_carer1"   onChange={(e) => this.setValueOutside(e)}></textarea>
            </div>

            <div className="form-group full-width">
              <label>Any additional information shared?</label>
              <textarea value={outsideFields.existing_carer2 ? outsideFields.existing_carer2:''} placeholder="..." name="existing_carer2"   onChange={(e) => this.setValueOutside(e)}></textarea>
            </div>

            <div className="form-group full-width">
              <label>
                Any complaints or allegations (only if volunteered by the caller
                – do not ask at this stage)
              </label>
              <textarea value={outsideFields.existing_carer3 ? outsideFields.existing_carer3:''} placeholder="..." name="existing_carer3"   onChange={(e) => this.setValueOutside(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Reason for considering transfer?</label>
              <textarea value={outsideFields.existing_carer4 ? outsideFields.existing_carer4:''} placeholder="..." name="existing_carer4" onChange={(e) => this.setValueOutside(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Children in placement?</label>
              <textarea value={outsideFields.existing_carer5 ? outsideFields.existing_carer5:''} placeholder="..." name="existing_carer5" onChange={(e) => this.setValueOutside(e)}></textarea>
            </div>
          </div>
          <div className="btn-wrap">
                   <button type="submit" className="btn btn-primary">
                        Save
                   </button>
         </div>
        </form>
      </>
    );
  }
}

export default General;
