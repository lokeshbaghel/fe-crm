import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { history } from '../../utils/helper';

import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import ChangePassword from "../../components/Modals/ChangePassword";
import { getUserProfileData,passwordChange,resetPasswordChange } from "../../actions/UserProfile";
import BlockUI from "../../components/BlockUI";

import "./index.css";

class UserProfile extends Component {
  state = {
    showModal: false,
    loggedInUser: this.props?.loggedUser?.user?.user_id,
    changePassoword:{}
  };

  handleModal = (value,param={}) => {
       this.props.resetPasswordChange();
       this.setState({ showModal: value });
   
  };

    /*lifecycle method to update state when data received from redux store */
    static getDerivedStateFromProps(props, state) {
            if (typeof props.getProfileData.changePassoword != "undefined"){
                if(!_.isEmpty(props?.getProfileData?.changePassoword?.type) && props?.getProfileData?.changePassoword?.type==='Sucessfully'){
                     props.resetPasswordChange();
                     return {showModal: false};
                }
                if (_.size(props.getProfileData.changePassoword) != _.size(state.changePassoword)){
                     return { changePassoword: props.getProfileData.changePassoword };
                }
            }
        return null;
    }

  sendChangePassword=(data)=>{
      this.props.passwordChange(data);
  }
  componentDidMount(){
    if(this.state.loggedInUser){
      this.props.getUserProfileData(this.state.loggedInUser);
    }
}

  render() {
    const { showModal,changePassoword } = this.state;
    const { userProfile, blocking } = this.props.getProfileData;

    return (
      <React.Fragment>
        <div className="user-banner">
          <Banner img={BannerImage} />
        </div>
        <BlockUI blocking={blocking} />
        <div className="page-content-wrapper user-profile" data-aos="fade-up">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <h2 className="dash-title">{userProfile?.First_name} {userProfile?.Last_name}</h2>
                <div className="inner-curve-box">
                  <h3>
                    <span>Contact Details</span>
                  </h3>
                  <div className="user-section">
                    <strong>Username:</strong> {userProfile?.username}
                  </div>
                  <div className="user-section">
                    <strong>Permissions:</strong> {userProfile?.permission_name}
                  </div>
                  <div className="user-section">
                    <strong>Role Type:</strong> {userProfile?.role_name}
                  </div>
                  <div className="user-section">
                    <strong>Email Address:</strong> {userProfile?.Email}
                  </div>

                  <div className="bottom-content">
                    <h3>Security Details</h3>
                      <div className="user-section">
                        <div className="pass-wrap">
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                              <span>
                                <strong>Password:</strong> ********
                              </span>
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <button className="change-pass-btn" onClick={() => this.handleModal(true)}>
                                Change Password
                              </button>
                            </div>
                          </div>
                              {showModal ? <ChangePassword responceError={changePassoword} sendChangePassword={ (data)=>this.sendChangePassword(data) } canShow={showModal} close={(data) => this.handleModal(data)} /> : ''}
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
      loggedUser  : state.authenticatedUser,
      getProfileData : state.userProfile
  }
}

//export default UserProfile;
export default connect(mapsStateToProps, {getUserProfileData,passwordChange,resetPasswordChange})(UserProfile);