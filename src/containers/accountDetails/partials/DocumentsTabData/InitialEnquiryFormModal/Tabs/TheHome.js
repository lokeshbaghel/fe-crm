import React, { Component } from "react";
import BlockUI from "../../../../../../components/BlockUI";
import { displayErrorMessage } from "../../../../../../utils/helper";

class TheHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theHomeFields:{},
      exitLoop:true,
      errors : {}
    };
  }
  static getDerivedStateFromProps(props, state) {
    if(props.listIEFormData && props.listIEFormData.hasOwnProperty('HomeTab') && state.exitLoop){
      let theHomeFields={};
      let ExtraData = props.listIEFormData.HomeTab;
      if(ExtraData){
        if(ExtraData.hasOwnProperty('home_type')){
          theHomeFields.home_type=ExtraData.home_type
        }
        if(ExtraData.hasOwnProperty('number_of_bedrooms')){
          theHomeFields.number_of_bedrooms=ExtraData.number_of_bedrooms
        }
        if(ExtraData.hasOwnProperty('spare_rooms')){
          theHomeFields.spare_rooms=ExtraData.spare_rooms
        }
        if(ExtraData.hasOwnProperty('planstomovehome')){
          theHomeFields.planstomovehome=ExtraData.planstomovehome
        }
        if(ExtraData.hasOwnProperty('applicant2_weekly_working_hours')){
          theHomeFields.applicant2_weekly_working_hours=ExtraData.applicant2_weekly_working_hours
        } 
        if(ExtraData.hasOwnProperty('pets_you_have')){
          theHomeFields.pets_you_have=ExtraData.pets_you_have
        } 
        if(ExtraData.hasOwnProperty('children_adult_living_in_home')){
          theHomeFields.children_adult_living_in_home=ExtraData.children_adult_living_in_home
        } 
        if(ExtraData.hasOwnProperty('children_adult_living_in_elsewhere')){
          theHomeFields.children_adult_living_in_elsewhere=ExtraData.children_adult_living_in_elsewhere
        } 
        if(ExtraData.hasOwnProperty('other_household_members')){
          theHomeFields.other_household_members=ExtraData.other_household_members
        } 
        if(ExtraData.hasOwnProperty('additional_information')){
          theHomeFields.additional_information=ExtraData.additional_information
        }
      }
      return { theHomeFields,exitLoop: false };
    }
    return null;
  }
  setValueTheHome(e){
    let targetName = e.target.name;
    let theHomeFields=this.state.theHomeFields;
    theHomeFields[targetName] = e.target.value;
    this.setState({ theHomeFields });
  }

  //Validation fields
  validateFormCheck = () => {
    let errors = {};
    let formIsValid = true;
    let fields = this.state.theHomeFields;
    let keyname = '';

    if(fields.number_of_bedrooms){
      if (!fields.number_of_bedrooms.match(/^[0-9]*$/)) {
        formIsValid = false;
        keyname = 'number_of_bedrooms';
        errors[keyname] = "Please enter numbers only";
        this.setState({errors});
      }
    }

    if(fields.spare_rooms){
      if (!fields.spare_rooms.match(/^[0-9]*$/)) {
        formIsValid = false;
        keyname = 'spare_rooms';
        errors[keyname] = "Please enter numbers only";
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
    if(this.state.theHomeFields){
      submitList.HomeTab=this.state.theHomeFields;
      if (this.validateForm())
        this.props.theHomeData(submitList)
      else
        displayErrorMessage('There is one or more fields mandatory,please check and fill information')
    }
      
  };
 
  render() {
    const {theHomeFields, errors} = this.state;
    const {blocking} = this.props;  
    return (
      <>
       <BlockUI blocking={blocking} />
        <form onSubmit={this.handleSubmit}>
          <div className="initial-form">
            <div className="form-group-main">
              <div className="form-group">
                <label>Home owned or rented?</label>
                <select onChange={(e) => this.setValueTheHome(e)}
                    value={theHomeFields.home_type ? theHomeFields.home_type :''}
                    name="home_type">
                  <option value="">Select</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of bedrooms</label>
                <input
                  type="text"
                  placeholder="Number of Bedrooms"
                  name="number_of_bedrooms"
                  value={theHomeFields.number_of_bedrooms ? theHomeFields.number_of_bedrooms :''}
                  onChange={(e) => this.setValueTheHome(e)}
                />
                <small className="form-text text-danger">{errors["number_of_bedrooms"]}</small>
              </div>

              <div className="form-group">
                <label>How many spare rooms</label>
                  <input
                    type="text"
                    placeholder="How many spare rooms"
                    name="spare_rooms"
                    value={theHomeFields.spare_rooms ? theHomeFields.spare_rooms :''}
                    onChange={(e) => this.setValueTheHome(e)}
                  />
                  <small className="form-text text-danger">{errors["spare_rooms"]}</small>
                </div>
            </div>

            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>Do you have any plans to move home?</label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="planstomovehome" checked={theHomeFields.planstomovehome==="1"} 
                           value="1" onChange={(e) => this.setValueTheHome(e)} placeholder="yes"
                           />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="planstomovehome" checked={theHomeFields.planstomovehome==="0"} 
                           value="0" onChange={(e) => this.setValueTheHome(e)} placeholder="no"
                           />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            {theHomeFields.planstomovehome==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." name="additional_information" onChange={(e) => this.setValueTheHome(e)}
                        value={theHomeFields.additional_information ? theHomeFields.additional_information:''}
                    ></textarea>
            </div>:''
            }
            <div className="form-group full-width">
              <label>Tell me about any pets you have</label>
              <textarea placeholder="..." name="pets_you_have" value={theHomeFields.pets_you_have ? theHomeFields.pets_you_have:''}
                        onChange={(e) => this.setValueTheHome(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Children or adults living in the home</label>
              <textarea placeholder="..."  name="children_adult_living_in_home" value={theHomeFields.children_adult_living_in_home ? theHomeFields.children_adult_living_in_home:''}
                    onChange={(e) => this.setValueTheHome(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Children or adults living elsewhere</label>
              <textarea placeholder="..." name="children_adult_living_in_elsewhere"
                        value={theHomeFields.children_adult_living_in_elsewhere ? theHomeFields.children_adult_living_in_elsewhere:''}
                        onChange={(e) => this.setValueTheHome(e)}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Other household members</label>
              <textarea placeholder="..." name="other_household_members"
                        value={theHomeFields.other_household_members ? theHomeFields.other_household_members:''}
                        onChange={(e) => this.setValueTheHome(e)}></textarea>
            </div>
          </div>
          <div className="btn-wrap">
             <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </>
    );
  }
}

export default TheHome;
