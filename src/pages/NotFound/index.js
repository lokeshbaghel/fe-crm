import "./index.css";
import React, {Component} from "react";
import {Link} from 'react-router-dom';

import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import Constants from '../../utils/constants';

class NotFound extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/fontawesomekit.js";
        script.async = true;
      
        document.body.appendChild(script);
    }

    render() {
        return (
            <React.Fragment>
                <Banner img={BannerImage} />
                <div className="page-content-wrapper accounts" data-aos="fade-up">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="curve-box">
                                    <div className="mainbox">
                                        <div className="not-found">
                                            <div className="err">4</div>
                                            <i className="far fa-question-circle fa-spin"></i>
                                            <div className="err2">4</div>
                                            <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                                                <p>Let's go <Link to={Constants['home_page']}>home</Link> and try from there.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NotFound;