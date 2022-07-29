import React, { Component } from "react";
import BlockUI from "../../../../../../components/BlockUI";
class Health extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthFields:{},
      exitLoop:true
    };
  }

  static getDerivedStateFromProps(props, state) {
    if(props.listIEFormData && props.listIEFormData.hasOwnProperty('HealthTab') && state.exitLoop){
      let healthFields={};
      let ExtraData = props.listIEFormData.HealthTab;
      if(ExtraData){
        if(ExtraData.hasOwnProperty('dailyMedicineDetails')){
          healthFields.dailyMedicineDetails=ExtraData.dailyMedicineDetails
        }
        if(ExtraData.hasOwnProperty('electronicCigarettes')){
          healthFields.electronicCigarettes=ExtraData.electronicCigarettes
        }
        if(ExtraData.hasOwnProperty('electronicCigarettesDetails')){
          healthFields.electronicCigarettesDetails=ExtraData.electronicCigarettesDetails
        }
        if(ExtraData.hasOwnProperty('bereavement')){
          healthFields.bereavement=ExtraData.bereavement
        }
        if(ExtraData.hasOwnProperty('bereavementDetails')){
          healthFields.bereavementDetails=ExtraData.bereavementDetails
        }
      }
      return { healthFields,exitLoop: false };
    }
    return null;
  }

  setValueHealth(e){
    let targetName = e.target.name;
    let healthFields=this.state.healthFields;
    healthFields[targetName] = e.target.value;
    this.setState({ healthFields });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let submitList={}
    if(this.state.healthFields)
      submitList.HealthTab=this.state.healthFields
      this.props.healthData(submitList);
  };


  render() {
    const {healthFields} = this.state;
    let {blocking}=this.props;
    return (
      <React.Fragment>
         <BlockUI blocking={blocking} />
        <form onSubmit={this.handleSubmit}>
          <div className="initial-form">
            <div className="form-group full-width">
              <label>
                Later in the process of becoming a foster carer we will ask you to
                undertake a medical. Do you (or your partner) have any health
                conditions? Do you take any medication on a daily basis?
              </label>
              <textarea value={healthFields.dailyMedicineDetails ? healthFields.dailyMedicineDetails :''} placeholder="..." name="dailyMedicineDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
            </div>
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Does anyone in the home smoke cigarettes or electronic
                  cigarettes?
                </label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="electronicCigarettes"
                    value="1"
                    onChange={(e) => this.setValueHealth(e)} 
                    checked={healthFields.electronicCigarettes==="1"}
                    placeholder="yes"
                   />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="electronicCigarettes" value="0" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="no"  
                    checked={healthFields.electronicCigarettes==="0"}
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            { healthFields.electronicCigarettes==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value={healthFields.electronicCigarettesDetails?healthFields.electronicCigarettesDetails:''} name="electronicCigarettesDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
            </div> :"" }
            <div className="checkbox-main">
              <div className="checkbox-wrap">
                <label>
                  Have you or your partner had a close family bereavement within
                  the last 12 months?
                </label>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input type="radio" name="bereavement"
                    value="1" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="yes"
                    checked={healthFields.bereavement==="1"} />
                    <img />
                  </label>
                  <label title="item2">
                    No
                    <input type="radio" name="bereavement" value="0" 
                    onChange={(e) => this.setValueHealth(e)} 
                    placeholder="no"  
                    checked={healthFields.bereavement==="0"}  />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            {healthFields.bereavement==="1" ?
            <div className="form-group full-width">
              <label>Additional information</label>
              <textarea placeholder="..." value={healthFields.bereavementDetails?healthFields.bereavementDetails:''} name="bereavementDetails" onChange={(e) => this.setValueHealth(e)}></textarea>
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

export default Health;
