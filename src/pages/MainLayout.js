import '../assets_crm/css/style.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../assets_crm/vendor/aos/aos.css";

import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';

class MainLayout extends Component {
    /* method to close sidebar menu for responsive */
    handleResponsiveMenu = () => {
        document.querySelector('#wrapper').classList.remove("toggled");
        document.querySelector('.hamburger').classList.remove("is-open");
        document.querySelector('.hamburger').classList.add("is-closed");
    }

    render() {
        return(
            <div id="wrapper">
                <Header {...this.props.children.props}></Header>
                <Sidebar {...this.props.children.props} ></Sidebar>
                    <div onClick={this.handleResponsiveMenu}>
                        {this.props.children}
                    </div>
                <Footer {...this.props.children.props}></Footer>
            </div>
        )
    }
}

export default MainLayout;