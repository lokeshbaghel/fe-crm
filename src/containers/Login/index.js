import './index.css';
import React from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets_crm/vendor/aos/aos.css";
import Logo from "../../assets_crm/img/logo.png";
import {login} from '../../actions/Login';
import BlockUI from "../../components/BlockUI";


class LoginCrm extends React.Component {
    
    constructor(props) {
        super(props);
        this.focusBtnRef = React.createRef();
        this.state = {
            fields    : {},
            errors    : {},
            location  : {}
        }
      }

    componentDidMount(){
        this.setState({location:this.props});
    }

    /* validate login form */
    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"] || fields["username"].trim() == '') {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (!fields["password"] || fields["password"].trim() == '') {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    /* handle input field changes */
    handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /* submit login form */
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const userData = new FormData(event.target);
            this.props.login(userData,this.state.location);
        }
        this.focusBtnRef.current.blur()
    }

    render() {
        const {errors} = this.state;
        const { blocking } = this.props.loggedUser;
        
        return (
            <>
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
                    {/* ======= Login Screen ======= */}
                    <Fade bottom>
                        <section id="login">
                            <div className="login-inner">
                                <h2 className="title">Log in</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Username"
                                            name="username"
                                            onChange={this.handleChange}
                                        />
                                        <div className="errorMsg">{errors.username}</div>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Password"
                                            name="password"
                                            onChange={this.handleChange}
                                        />
                                        <div className="errorMsg">{errors.password}</div>
                                    </div>
                                    <button type="submit" ref={this.focusBtnRef} className="btn btn-primary">Log in</button>
                                    <p><Link to="/forgetpassword">Forgot Password?</Link></p>
                                </form>
                            </div>
                        </section>
                        {/* End Section */}
                    </Fade>
                </main>
                {/* End #main */}
                <footer id="footer"></footer>
            </>
        );
    }
}

const mapsStateToProps = state => {
    return { 
        loggedUser  : state.authenticatedUser
    };
}

export default connect(mapsStateToProps, {login} )(LoginCrm);