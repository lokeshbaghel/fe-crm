import "./index.css";
import React, { Component } from "react";
import {connect} from 'react-redux';
import { NavLink } from "react-router-dom";

import { images, accessAllowed,accessAllowedPageSection } from "../../../utils/helper";
import SidebarMenu from "../../../components/SidebarMenu";
import {resetLoggedUserData, getDuplicateEnquiryData} from '../../../actions/Login';
import BlockUI from "../../../components/BlockUI";
import LogoutConfirmPopUp from "../../../components/Modals/LogoutConfirmPopUp";
import Constants from "../../../utils/constants";

class Sidebar extends Component {
    state = {
        logoutPopUpState:false,
        allowedPageSection:false
    };
    /* handle logout */
    logout = () => {
        const loggedUser = this.props.loggedUser.user;  //fetched from redux store
        this.props.resetLoggedUserData(loggedUser.user_session_id)
    }  
     /**method to set state to show user logout popup  */
     handleLogout=()=>{
        this.setState({logoutPopUpState:true})
     }

    componentDidMount() {
        let accessAllowedBlock=accessAllowedPageSection(Constants['diary-management'])
        this.setState({allowedPageSection:accessAllowedBlock})
        this.props.getDuplicateEnquiryData()
     }

     /**method for user logout confirm popup or not  */
     closeModalLogoutConfirm=(data={})=>{
           this.setState({logoutPopUpState:data})
         if(data)
             this.logout();
               
     }
    render() {
        const { blocking,user,duplicateCount } = this.props.loggedUser;
        const {logoutPopUpState,allowedPageSection}=this.state;     
        
        
        let isAdmin = false;
        if(user?.role_id === 1){
            isAdmin = true;
        }
        return (
            <>
                <BlockUI blocking={blocking} />
                <button type="button" className="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
                    <span className="hamb-top"></span>
                    <span className="hamb-middle"></span>
                    <span className="hamb-bottom"></span>
                </button>
                <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
                    <ul className="nav sidebar-nav">
                        {/* <li>
                            <SidebarMenu title="Dashboard" to="/dashboard" idt="dashboard">
                                <NavLink variant="secondary" to="/dashboard" id="dashboard">
                                    <img src={images["home-icon.svg"]} alt="Home" />
                                </NavLink>
                            </SidebarMenu>
                        </li> */}
                        { allowedPageSection || accessAllowed(Constants['diary-management'], false) ?
                            <li>
                                <SidebarMenu title="Diary Management" to="/diarymanagement" idt="diarymanagement">
                                    <NavLink variant="secondary" to="/diary-management" id="diarymanagement">
                                        <img src={images["calendar-icon.svg"]} alt="Calendar" />
                                    </NavLink>
                                </SidebarMenu>
                            </li>
                            : null 
                        }
                        { accessAllowed(Constants['duplicate-check'], false) ?
                        <li>
                            <SidebarMenu title="Duplicate Enquiries" idt="enquirer-list" to="/account/enquirer-list">
                                <NavLink variant="secondary" to="/account/enquirer-list" id="enquirer-list">
                                <span className="duplicate-notification">{duplicateCount}</span><img src={images["duplicate-icon.png"]} alt="Enquirer List" style={{'margin' : '0'}} />
                                </NavLink>
                            </SidebarMenu>
                        </li>
                        : null }
                        { accessAllowed(Constants['enquiries'], false) ?
                            <li>
                                <SidebarMenu title="Records Table" idt="accounts" to="/accounts">
                                    <NavLink variant="secondary" to="/accounts" id="accounts">
                                        <img src={images["user-icon.svg"]} alt="User" />
                                    </NavLink>
                                </SidebarMenu>
                            </li>
                        : null }
                        { accessAllowed(Constants['reports'], false) ?
                            <li>
                                <SidebarMenu title="Reports" idt="report" to="/report">
                                    <NavLink variant="secondary" to="/report" id="report">
                                        <img src={images["pie-chart-icon.svg"]} alt="Chart" />
                                    </NavLink>
                                </SidebarMenu>
                            </li>
                        : null }
                        { accessAllowed(Constants['engagement-hub'], false) ?
                            <li>
                                <SidebarMenu title="Engagement Hub" idt="engagement" to="/engagement">
                                    <NavLink variant="secondary" to="/engagement" id="engagement">
                                        <img src={images["users-icon.svg"]} alt="Users" />
                                    </NavLink>
                                </SidebarMenu>
                            </li>
                        : null }
                        {  accessAllowed(Constants['user'], false) ?
                            <li>
                                <SidebarMenu title="Users" idt="users" to="/users">
                                    <NavLink variant="secondary" to="/users" id="users">
                                        <img src={images["users-icon.png"]} alt="User" />
                                    </NavLink>
                                </SidebarMenu>
                            </li>
                        : null}
                        
                        
                        {/* <li>
                            <SidebarMenu title="Blank" idt="blank" to="/blank">
                                <NavLink variant="secondary" to="/blank" id="blank">
                                    <img src={images["heart-icon.svg"]} alt="Heart" />
                                </NavLink>
                            </SidebarMenu>
                        </li> */}
                        
                        
                        <li>
                            <a title="Logout" idt="Logout" onClick={ this.handleLogout }>
                                <img src={images['logout.png']} alt="Logout" /> 
                            </a>
                        </li>
                    </ul>
                </nav>
                {logoutPopUpState ? 
                                <LogoutConfirmPopUp heading={'Are you sure, you want to logout ?'} canShow={logoutPopUpState} 
                                                    closeModalLogoutConfirm={(data)=>this.closeModalLogoutConfirm(data)} 
                                /> 
                            : null}
            </>
        );
    }
}

const mapsStateToProps = state => {
    return { 
        loggedUser  : state.authenticatedUser
    };
}

export default connect(mapsStateToProps, {resetLoggedUserData, getDuplicateEnquiryData})(Sidebar);
