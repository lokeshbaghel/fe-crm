import React, { Component } from "react";
import BlockUI from "../../../../../../components/BlockUI";
class Finances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fosteringFields:{},
      exitLoop:true
    };
  }
  static getDerivedStateFromProps(props, state) {
    if(props.listIEFormData && props.listIEFormData.hasOwnProperty('FosteringTab') && state.exitLoop){
      let fosteringFields={};
      let ExtraData = props.listIEFormData.FosteringTab;
      if(ExtraData){
        if(ExtraData.hasOwnProperty('preferences_on_care')){
          fosteringFields.preferences_on_care=ExtraData.preferences_on_care
        }
        if(ExtraData.hasOwnProperty('placement_preferences')){
          fosteringFields.placement_preferences=ExtraData.placement_preferences
        }
        if(ExtraData.hasOwnProperty('resource_age_from')){
          fosteringFields.resource_age_from=ExtraData.resource_age_from
        }
        if(ExtraData.hasOwnProperty('resource_age_to')){
          fosteringFields.resource_age_to=ExtraData.resource_age_to
        }
      }
      return { fosteringFields,exitLoop: false };
    }
    return null;
  }

  setValueFostering(e){
    let targetName = e.target.name;
    let fosteringFields=this.state.fosteringFields;
    fosteringFields[targetName] = e.target.value;
    this.setState({ fosteringFields });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let submitList={}
    if(this.state.fosteringFields)
      submitList.FosteringTab=this.state.fosteringFields
      this.props.fosteringData(submitList);
  };

  render() {
    const {fosteringFields} = this.state;
    let {blocking}=this.props
    return (
      <React.Fragment>
         <BlockUI blocking={blocking} />
      <form onSubmit={this.handleSubmit}>
        <div className="initial-form">
          <p>Do you have any preferences on the type of care you're hoping to offer? Placement type/age range?</p>
          <input type="text" name="preferences_on_care"
                  onChange={(e) => this.setValueFostering(e)}
                  value={fosteringFields.preferences_on_care ? fosteringFields.preferences_on_care:''}
                  />
          <br/>
          <br/>
          <p>Heading: Notes on placement preference</p>
          <input type="text" name="placement_preferences"
                  onChange={(e) => this.setValueFostering(e)}
                  value={fosteringFields.placement_preferences ? fosteringFields.placement_preferences:''}
                  />
          <br/>
          <br/>
          <p>Do you have any preference on the age of the Child you are wanting to care for?</p>
          <div className="date-group">
            <div className="form-group">
              <label>ResourceAgeFrom</label>
              <select onChange={(e) => this.setValueFostering(e)}
                      value={fosteringFields.resource_age_from ? fosteringFields.resource_age_from:''}
                      name="resource_age_from">
                <option value="">Select</option>
                <option value="1">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
              </select>
            </div>
            <div className="form-group">
              <label>ResourceAgeTo</label>
              <select onChange={(e) => this.setValueFostering(e)}
                      value={fosteringFields.resource_age_to ? fosteringFields.resource_age_to:''}
                      name="resource_age_to">
                <option value="">Select</option>
                <option value="1">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
              </select>
            </div>
          </div>
        </div>
        <div className="btn-wrap">
           <button type="submit" className="btn btn-primary">Save</button>
        </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Finances;
