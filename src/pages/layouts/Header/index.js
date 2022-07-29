import "./index.css";
import React, { Component } from "react";
import AOS from "aos";
import {connect} from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { NavLink  } from "react-router-dom";
import _ from 'lodash';

import AddLead from "../../../components/Modals/AddLead";
import { images } from "../../../utils/helper";
import {resetLoggedUserData} from '../../../actions/Login';
import BlockUI from "../../../components/BlockUI";
import HeaderSearch from "../../../components/HeaderSearch";
import LogoutConfirmPopUp from "../../../components/Modals/LogoutConfirmPopUp";
import {fetchLeadAddFormDependantData, submitLeadFormData, hideLeadModal} from '../../../actions/Lead';
import { getAccountSearchLists } from "../../../actions/Accounts";
import Constants from '../../../utils/constants';
import { accessAllowedPageSection } from "../../../utils/helper";

class Header extends Component {
    state = {
        showModal: false,
        searchTitle: '',
        showSearch: false,
        showSearchResult:'',
        logoutPopUpState:false,
        accessAllowedSection:false
    };

    /* handle logout */
    logout = () => {
        const loggedUser = this.props.loggedUser.user;  //fetched from redux store
        this.props.resetLoggedUserData(loggedUser.user_session_id)
    }
    
    componentDidMount() {
        let accessAllowedBlock=accessAllowedPageSection(Constants['enquiries'])
        this.setState({accessAllowedSection:accessAllowedBlock})
        AOS.init();
        let isClosed = false;
        document.querySelector('.hamburger').addEventListener("click", function(){ 
            const trigger = document.querySelector('.hamburger');
            if (isClosed === true) {
                trigger.classList.remove("is-open");
                trigger.classList.add("is-closed");
                isClosed = false;
            } else {
                trigger.classList.remove("is-closed");
                trigger.classList.add("is-open");
                isClosed = true;
            }
        });

        document.querySelector('[data-toggle="offcanvas"]').addEventListener("click", function(){
            document.querySelector('#wrapper').classList.toggle("toggled");
        });

        const progress = document.querySelector(".progress-done");
        if (progress) {
            progress.style.width = progress.getAttribute("data-done") + "%";
            progress.style.opacity = 1;
        }
    }

    toggleModal = async(value) => {
        if(value === true)
            await this.props.fetchLeadAddFormDependantData();
        else{
            this.props.hideLeadModal()
            //this.setState({showModal: value})
        }
          
    }

    /** method to submit lead information */
    submitLeadData = (data, ImageData) => {
        const loggedUser = this.props.loggedUser.user;  //fetched from redux store
        const {first_name, last_name, address1,town,post_code,address,current_situation, email, spare_rooms, notes,marketing_consent, marketing_source_id,
            mobile_country_code, mobile, agency_id } = data;
        const {file, fileName, contentType} =  ImageData;   
        
        const postData = {
            first_name              : first_name.value,
            last_name               : last_name.value,
            town                    : town.value,
            address                 : address.value,
            address1                : address1.value,
            post_code               : post_code.value,
            current_situation       : current_situation.value,
            email                   : email.value,
            //mobile_country_code     : mobile_country_code.value,
            mobile                  : mobile.value,
            spare_rooms             : spare_rooms.value,
            notes                   : notes.value, 
            marketing_source_id     : marketing_source_id.value,
            marketing_consent       : marketing_consent.value,
            user_id                 : loggedUser.user_id,
            agency_id               : agency_id.value,
            file,
            fileName,
            contentType
        }
        
        this.props.submitLeadFormData(postData);
        //this.toggleModal(false)
    }

    /**method for call api based on search  */
    handleSearch=(value)=>{
        this.setState({showSearch:value});
        if(value===false){
            let data={}
            data.searchTitle='';
            this.props.getAccountSearchLists(data);
        }
    }

   /**method for pass search key and get data from api  */
    getAccountSearchData=(data)=>{
        if(!_.isEmpty(data.searchTitle)){
           this.props.getAccountSearchLists(data);
        }
    }

    /**method to set state to show user logout popup  */
    handleLogout=()=>{
       this.setState({logoutPopUpState:true})
    }

    /**method for user logout confirm popup or not  */
    closeModalLogoutConfirm=(data={})=>{
          this.setState({logoutPopUpState:data})
        if(data)
            this.logout();
              
    }
    
     /**method for store search change  */
   // onTitleChanged = e => this.setState({searchTitle: e.target.value});

    render() {
        let {accountSearchList}=this.props.searchResult;
        let {showSearch,logoutPopUpState,accessAllowedSection} = this.state;
        let searchResult_blocking = this.props.searchResult.blocking;
        const { blocking } = this.props.loggedUser;
        const { leadBlocking, marketingSources, genderTypes, agencies, checkEmail, showLeadForm,currentSituations } = this.props.leadData;
        
        let openModal = showLeadForm;
        
        return (
          <>
            <BlockUI blocking={blocking ? blocking : (leadBlocking ? leadBlocking : '')} />
            <header id="header" className="second-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <NavLink variant="secondary" to={Constants['home_page']}>
                                <img className="logo" src={images["logo.png"]} alt="Logo" />
                            </NavLink>
                        </div>
                        <div className="col-md-9 header-right">

                                { accessAllowedSection ? <div className="search-box">
                                    <div className="rounded-circle box-search">
                                       <button type="submit" className="search-btn" onClick={(data) =>this.handleSearch(true)}>search</button>
                                    </div>
                                     { showSearch ? <HeaderSearch canShowdata={showSearch} 
                                                             handleSearchModal={(data)=>this.handleSearch(data)} 
                                                             getAccountSearchData={(data)=>this.getAccountSearchData(data)}
                                                             showSearchResult={accountSearchList}
                                                             blocking={searchResult_blocking}
                                        /> :'' }
                                </div> :'' }
                            <button className="btn btn-primary add-button" onClick={() => this.toggleModal(true)}> Add an Enquiry </button>
                            {openModal ? 
                                <AddLead heading={'Add an Enquiry'} canShow={openModal} updateModal={this.toggleModal} 
                                    submitData={(data, ImageData) => this.submitLeadData(data, ImageData)}
                                    marketingSources={marketingSources}
                                    genderTypes={genderTypes}
                                    agencies={agencies}
                                    emailCheck={(data) => this.checkEmailExist(data)}
                                    checkEmail={checkEmail}
                                    currentSituations={currentSituations}
                                /> 
                            : null}
                            <img className="notification-icon" src={images["notification-icon.png"]} alt="Notification" />
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                <img className="user-icon" src={images["user.png"]} alt="User" />
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <NavLink className="dropdown-item" variant="secondary" to="/user-profile">
                                        My Profile
                                    </NavLink>
                                    <Dropdown.Item onClick={ this.handleLogout } >Logout <i className="fa fa-power-off" aria-hidden="true"></i></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
                            {logoutPopUpState ? 
                                <LogoutConfirmPopUp heading={'Are you sure, you want to logout ?'} canShow={logoutPopUpState} 
                                                    closeModalLogoutConfirm={(data)=>this.closeModalLogoutConfirm(data)} 
                                /> 
                            : null}
                        </div>
                    </div>
                </div>
            </header>
          </>
        )
    }
}

const mapsStateToProps = state => {
    return { 
        loggedUser  : state.authenticatedUser,
        leadData    : state.lead,
        searchResult : state.accounts
    };
}

export default connect(
                mapsStateToProps, 
                {resetLoggedUserData, fetchLeadAddFormDependantData, submitLeadFormData,getAccountSearchLists, hideLeadModal}
            )(Header);
            