import React, { Component } from 'react';
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";

import { displayRecordNotFound } from '../../../utils/helper';
import Dropdown from "../../../components/Dropdown";
import ContactForm from './ContactForm';
import {ContactPreview} from '../PreviewTemplates';
import SearchBox from '../../../components/Search';
const options = [{ 0: "Contacting Data1", 1: "Contacting Data2", 2: "Contacting Data3" }];

class ContactList extends Component{
    state = {
        showContactForm     : false,
        activeContactIndex  : 0,
        searchTitle         : ''
    }
    
    /**method to show card of left side */
    listsCardHtml = (contactLists) => {
        if(!_.isEmpty(contactLists)){
            return(
                contactLists.map((list,index) => {
                    return(
                        <div className="col-md-4 col-lg-6 col-xl-4" key={index}>
                            <a className={`contact-card-click ${(index === 0) ? 'active' : ''}`} onClick={(event) => this.handleClick(event,index)}>
                                <div className="list-curve-box">
                                    <div className="date-container">
                                        <p>{list.contactDate}</p>
                                        <p>{list.contactTime}</p>
                                    </div>
                                    <h4>{list.contactCount} contacts</h4>
                                    <h3>{list.contactName}</h3>
                                </div>
                            </a>
                        </div>
                    )
                })
            )
        } else{
            return (
                <div className="col-12">
                    {displayRecordNotFound('No Contacts')}
                </div>
            )
        }
    }

    /**method to pass selected data for preview and append active class to clicked card */
    handleClick = (event, index) => {
        var tabLink = document.querySelectorAll(".contact-card-click");
        tabLink.forEach(function (item) {
            item.classList.remove("active");
        });
        
        event.target.closest('a').classList.add("active");
        this.setState({activeContactIndex : index})
    }

    /**method to show/hide contact form */
    handleContactForm = (data, type="add") => {
        const element = document.getElementById("campaigns-content-tab");
        if(data === true){
            element.removeAttribute("href");
            element.classList.add('disabled-tab');
            this.props.callListAction('contactListCreateForm');
        } else {
            if(!element.hasAttribute("href")){
                element.setAttribute("href","#campaigns-content");
                element.classList.remove("disabled-tab");
            }

            if(type === 'edit'){
                this.props.cancelEditForm(false)
            }
        }
        
        this.setState({ showContactForm : data })
    }

    /**method to submit list form */
    submitList = async(id, data) => {
        await this.props.submitListForm(id, data);
        this.handleContactForm(false,'edit')
    }

    /**method to set preview of card */
    previewCard(data) {
        if(!_.isEmpty(data)) {
            const result = ContactPreview(this.props, data[this.state.activeContactIndex]);
            return result;
        } else {
            return 'No Data to Preview'
        }
    }

    /*method called to when search is performed and called parent method*/
    handleSearchInputChange(value) {
        this.setState({ searchTitle : value }, () => {
            this.props.callListAction('contacts', { search : value })
        });
    }

    render(){
        const { showContactForm, searchTitle } = this.state;
        const {contactLists, enquirerLists, editContactListRecord, showListForm} = this.props;
        
        let showForm = showContactForm;
        if(showListForm)
            showForm = showListForm; //needed to do this in case when edit button is clicked
        
        return(
            <React.Fragment>
                <div className="tab-pane fade lists-content" id="lists-content" role="tabpanel" aria-labelledby="lists-content-tab">
                    {!showForm ?
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="row">
                                        <div className="col-lg-9 col-md-12">
                                            {/* <div className="search-campaign">
                                                <input type="text" className="form-control search-user"/>
                                                <button type="submit" className="campaign-btn">search</button>
                                            </div> */}
                                            <div className="filter-wrap">
                                                <SearchBox searchParentClass="search-campaign customfilter"
                                                            searchButtonClass="campaign-btn"
                                                            resetButtonClass="btn white filter-btn btn-outline-primary"
                                                            searchInputChangeValue={(val) => this.handleSearchInputChange(val)}
                                                            searchValue={searchTitle} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-12 d-flex justify-content-end">
                                            {/* <div className="contact-select show">
                                                <Dropdown
                                                    updateData={this.getPerPageValue}
                                                    option={options}
                                                    default="Contacting Ascending"
                                                />
                                            </div> */}
                                        </div>
                                    </div>

                                    <Scrollbars style={{ height: "600px" }}>
                                        <div id="testDiv3" className="scrollbar">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h2>Contact Lists Details</h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {this.listsCardHtml(contactLists)}
                                            </div>
                                        </div>
                                    </Scrollbars>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="new-campaign-btn">
                                        <a className="btn btn-primary" onClick={() => this.handleContactForm(true, 'add')}>New List</a>
                                    </div>
                                    <div className="list-right">
                                        <div className="col-md-12">
                                            <h2 className="right-top-head">Contact Lists</h2>
                                        </div>
                                        <div className="list-right-inner">
                                            { this.previewCard(contactLists) }
                                        </div>
                                    </div>    
                                </div>
                            </div>
                    :   
                        <ContactForm enquirerLists={enquirerLists} editContactListRecord={editContactListRecord}
                                    submitForm={(id, data) => this.submitList(id, data)}
                                    cancelListForm={(data, type) => this.handleContactForm(data,type)}
                                    editContactForm={(data) => this.handleContactForm(data)}
                        />   
                    }
                </div>
            </React.Fragment>    
        )
    }
}

export default ContactList;