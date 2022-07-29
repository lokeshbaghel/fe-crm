import "./index.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from 'lodash';

import Logo from "../../assets_crm/img/logo.png";
import {sendForgetRequestEmail, resetForgetPasswordData} from '../../actions/ForgotPassword';
import BlockUI from "../../components/BlockUI";

class ForgetPassword extends React.Component {
  state = {
    username: "",
    usernameErr: "",
    buttonText: "Send Verification Code",
    isOtpScreen: false,
    otp: "",
    otpErr: "",
    password: "",
    passwordErr: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.split(" ").join("") });
  };

  isOtpScreenFunction(state) {
    if (state.isOtpScreen) {
      const { otp, password } = this.state;
      return (
        <>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={this.onChange}
              placeholder="OTP"
            />
            <small className="text-danger">{this.state.otpErr}</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={this.onChange}
              placeholder="New Password"
            />
            <small className="text-danger">{this.state.passwordErr}</small>
          </div>
        </>
      );
    }
  }

  validateFields() {
    let err = false;
    if (!this.state.username) {
      this.setState({ usernameErr: "Username is required" });
      err = true;
    } else {
      this.setState({ usernameErr: "" });
    }
    if (this.state.isOtpScreen) {
      if (this.state.otp === "") {
        this.setState({ otpErr: "OTP is required" });
        err = true;
      }else{
        this.setState({ otpErr: "" });
      }

      if (this.state.password === '') {
        this.setState({ passwordErr: 'Password is required' });
        err = true;
      } else {
        this.setState({ passwordErr: '' });
      }
    }
    return err;
  }

  onSubmit = (e) => {
    e.preventDefault();
    let userData = {};
    const isValid = this.validateFields();
    if (this.state.isOtpScreen) {
      if (!isValid) {
        userData.username = this.state.username;
        userData.passcode = this.state.otp;
        userData.newpassword = this.state.password;
        this.props.sendForgetRequestEmail(userData);
      }
    } else {
      if (!isValid) {
        userData.username = this.state.username;
        this.props.sendForgetRequestEmail(userData);
        this.setState({ buttonText: "Submit" });
      }
    }
  };

  /*lifecycle method to update state when data received from redux store */
  static getDerivedStateFromProps(props, state) {
    if(typeof props.forgotPassword != "undefined") {
        if (_.size(props.forgotPassword) !== _.size(state)) {
            return {
                isOtpScreen: props.forgotPassword.isOtpScreen
            };
        }else{
          return {
            isOtpScreen: false
          }
        }
    }
    return null;
}

/* lifecycle method to reset redux store data of forget password */
componentWillUnmount(){
  this.props.resetForgetPasswordData()
}

  render() {
    const { blocking } = this.props.forgotPassword;
    return (
      <React.Fragment>
        <BlockUI blocking={blocking} />
        <header id="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <a href="#" className="logo">
                  <img src={Logo} />
                </a>
              </div>
            </div>
          </div>
        </header>
        <main id="main">
          <Fade bottom>
            <section id="login">
              <div className="login-inner">
                <h2 className="title">
                  {!this.state.isOtpScreen
                    ? "Forgot Password"
                    : "Change Password"}
                </h2>
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      onChange={this.onChange}
                      value={this.state.username}
                    />
                    <small className="text-danger">
                      {this.state.usernameErr}
                    </small>
                  </div>
                  {this.state.isOtpScreen
                    ? this.isOtpScreenFunction(this.state)
                    : ""}
                  <button type="submit" className="btn btn-primary">
                    {this.state.buttonText}
                  </button>
                  <p>
                    <Link to="/">Back to Login</Link>
                  </p>
                </form>
              </div>
            </section>
          </Fade>
        </main>
        <footer id="footer"></footer>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = state => {
  return { 
    forgotPassword  : state.forgotPassword
  };
}

export default connect(mapsStateToProps, {sendForgetRequestEmail, resetForgetPasswordData})(ForgetPassword);
