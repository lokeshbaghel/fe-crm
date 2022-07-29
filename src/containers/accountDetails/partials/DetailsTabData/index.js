import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from 'lodash';
import ApplicantModal from './ApplicantModal';
import {countryCodeHtml} from '../../../../utils/helper';
import Constant from "../../../../utils/constants";

class DetailsTabData extends Component{
    state = {
        personData      : {},
        showModal       : false,
        personId        : '',
        showCreateApplicantModal: false
    }

    /**method to show form editable when edit button is clicked */
    handleClick = (data, id) => {
        this.toggleModal(true);
        this.setState({personData : data, personId : id})
    }

    /**method to create tab */
    detailsTab = (data) => {
        if(data > 0) {
            return(
                _.times(data, (index) => {
                    return(
                        <li key={index}>
                            <a className={`nav-item nav-link ${index == 0 ? "active" : ""}`} data-toggle="tab" 
                                href={`#detail_applicant${index}`} role="tab" aria-controls="all-content" aria-selected="true">
                                Applicant{index+1}
                            </a>
                        </li>
                    )
                })
            )
        }
    }

    /* submit applicant form to parent method*/
    handleSubmit = (data) => {
        const id = this.state.personId;
        
        //If Account is not passed to Charms
        if(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]){
            this.props.submitApplicant(id, data);
            this.toggleModal(false);
            this.handleCreateApplicantModal(false);
        }
    }

    getAccountDetailsSearch = (data) => {
      this.props.getAccountDetails(data);
          
        }
    
    
    /**method to open/close modal */
    toggleModal = (value) => {
        this.setState({showModal: value})
    }
    handleAddLinkSubmit = (postData) => {
        this.props.submitAddLinkData(postData)
 }
 handleDeleteLinkSubmit = (postData) => {
    this.props.submitDeleteLinkData(postData)
}
 
    /**method to display tab data */
    detailTabContent = (tabData) => {
        if(!_.isEmpty(tabData)) {
            return(
                tabData.map((person,index) => {
                    return(
                        <div className={`tab-pane fade show ${index == 0 ? "active" : ""}`} id={`detail_applicant${index}`} role="tabpanel" aria-labelledby="activities-tab" key={index}>
                            <Scrollbars style={{ height: "600px" }} renderThumbVertical={props => <div {...props} className="" style={{position: "relative",display: "block",width: "100%",cursor: "pointer",borderRadius: "inherit", backgroundColor: "rgba(0, 0, 0, 0.2)",height: "335px"}} />}
                            renderThumbHorizontal={props => <div {...props} style={{display: "none"}} />}  >
                            {(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]) && (this.props.post_hold_to_charms != Constant["post_hold_to_charms_yes"]) ? <a className="btn btn-outline-primary float-right edit-btn" onClick={() => this.handleClick(person, person.id)}>Edit</a> : ''}
                            <div className="form-details-content">
                                <div className="form-group-main first-group">
                                <div className={`form-group common-width disabled-input`}>
                                        <label>Title</label>
                                        <input type="text" placeholder="Mr" disabled={true} 
                                                value={person.title_name} />
                                    </div>
                                    <div className={`form-group common-width disabled-input`}>
                                        <label>Name</label>
                                        <input type="text" placeholder="Bob" disabled={true} 
                                                value={person.first_name} />
                                    </div>
                                    <div className={`form-group common-width disabled-input`}>
                                        <label>Surname</label>
                                        <input type="text" placeholder="Lennon" disabled={true} 
                                                value={person.last_name} />
                                    </div>
                                    <div className={`form-group dob-input disabled-input`}>
                                        <label>DOB</label>
                                        <input type="date" placeholder="Charles" disabled={true}  
                                                defaultValue={person.date_of_birth} />
                                    </div>
                                </div>
                                <div className="form-group-main double-group">
                                    <div className={`form-group address-input disabled-input`}>
                                        <label>Address Line 1</label>
                                        <input type="text" placeholder="7 Bridge St" disabled={true} 
                                                value={person.address1} />
                                    </div>
                                    <div className={`form-group address-input disabled-input`}>
                                        <label>Address Line 2</label>
                                        <input type="text" placeholder="7 Bridge St" disabled={true} 
                                                value={person.address2} />
                                    </div>
                                </div>
                                <div className="form-group-main second-group">
                                   
                                    <div className={`form-group common-width disabled-input`}>
                                        <label>Town</label>
                                        <input type="text" placeholder="Chester" disabled={true}  
                                                value={person.city}/>
                                    </div>
                                    <div className={`form-group post-code disabled-input`}>
                                        <label>Postcode</label>
                                        <input type="text" placeholder="CH2 2ED" disabled={true}  
                                                value={person.post_code} />
                                    </div>
                                </div>

                                <div className="form-group-main half-width">
                                    <div className={`form-group disabled-input`}>
                                        <label>Email</label>
                                        <input type="text" placeholder="boblennon@testing.com" disabled={true} 
                                                value={person.email ? person.email: ''} />
                                    </div>
                                </div>

                                <div className="form-group-main double-group">
                                    {/* <div className={`form-group disabled-input`}>
                                        <label>Country Code</label>
                                        <input type="text" value={countryCodeHtml(person.telephone_country_code)} disabled={true}/>
                                    </div> */}
                                    <div className={`form-group disabled-input`}>
                                        <label>Telephone number</label>
                                        <input type="text" placeholder="+44 787 0387 565" disabled={true} 
                                                value={person.telephone || ''}
                                        />
                                    </div>
                                </div>

                                <div className="form-group-main double-group">
                                    {/* <div className={`form-group disabled-input`}>
                                        <label>Country Code</label>
                                        <input type="text" value={countryCodeHtml(person.mobile_country_code)} disabled={true}/>
                                    </div> */}
                                    <div className={`form-group disabled-input`}>
                                        <label>Mobile number</label>
                                        <input type="text" placeholder="+44 787 0387 565" disabled={true} 
                                                value={person.mobile || 'N/A'}
                                        />
                                    </div>
                                </div>

                                <div className="border-spacer"></div>

                                <div className="form-group-main">
                                    <div className={`form-group gender-input disabled-input`}>
                                        <label>Gender</label>
                                        <input type="text" placeholder="Male" disabled={true} 
                                                value={person.gender_name || 'N/A'} />
                                    </div>
                                    {/* <div className={`form-group managed-width disabled-input`}>
                                        <label>Gender Notes</label>
                                        <input type="text" placeholder="Male" disabled={true}  />
                                    </div> */}
                                </div>

                                <div className="form-group-main same-width">
                                    <div className={`form-group disabled-input`}>
                                        <label>Ethic Origin</label>
                                        <input type="text" placeholder="White British" disabled={true} 
                                                value={person.ethnic_origin_name || ''} />
                                    </div>
                                    <div className={`form-group disabled-input nationality`}>
                                        <label>Nationality</label>
                                        <input type="text" placeholder="White British" disabled={true} 
                                                value={person.nationality_name || ''} />
                                    </div>
                                    <div className={`form-group disabled-input country-of-birth`}>
                                        <label>Country Of Birth</label>
                                        <input type="text" placeholder="Country Of Birth" disabled={true} 
                                                value={person.country_of_birth_name || ''} />
                                    </div>
                                </div>

                                <div className="form-group-main half-width">
                                    <div className={`form-group disabled-input`}>
                                        <label>1st Language</label>
                                        <input type="text" placeholder="English" disabled={true} 
                                                value={person.primary_language_name} />
                                    </div>
                                    <div className={`form-group disabled-input`}>
                                        <label>2nd Language</label>
                                        <input type="text" placeholder="Welsh" disabled={true} 
                                                value={person.secondary_language_name} />
                                    </div>
                                </div>

                                <div className="form-group-main half-width">
                                    <div className={`form-group disabled-input`}>
                                        <label>Other Language</label>
                                        <input type="text" placeholder="None" disabled={true} 
                                                value={person.other_language_name} />
                                    </div>
                                </div>

                                <div className="form-group-main three-col">
                                    <div className={`form-group disabled-input`}>
                                        <label>Religion</label>
                                        <input type="text" placeholder="Not Specified" disabled={true} 
                                                value={person.religion_name || 'N/A'} />
                                    </div>
                                    
                                    <div className={`form-group disabled-input`}>
                                        <label>Sexual Orientation</label>
                                        <input type="text" placeholder="heterosexual" disabled={true} 
                                                value={person.sexual_orientation_name || 'N/A'} />
                                    </div>

                                    <div className={`form-group disabled-input`}>
                                        <label>Registered Disabled</label>
                                        <input type="text" placeholder="Registered" value={person.registered_disabled_name || 'No'} disabled={true} />
                                    </div>
                                </div>

                                <div className="border-spacer"></div>

                                <div className="form-group-main three-col">
                                    <div className={`form-group disabled-input`}>
                                        <label>Link Family</label>
                                        <input type="text" placeholder="Link Family" disabled={true}  />
                                    </div>
                                    
                                    <div className={`form-group disabled-input`}>
                                        <label>Driving License</label>
                                        <input type="text" placeholder="Driving License" value={person.driving_license_name || 'No'} disabled={true}  />
                                    </div>

                                    <div className={`form-group disabled-input`}>
                                        <label>Preferred contact time</label>
                                        <input type="text" value={person.preferred_contact_time_name || ''} placeholder="Preferred contact time" disabled={true}  />
                                    </div>
                                </div>

                                <div className="form-group-main three-col">
                                    <div className={`form-group disabled-input`}>
                                        <label>Previous fostering history</label>
                                        <input type="text" value={person.fostering_history_name || ''} placeholder="Previous fostering history" disabled={true}  />
                                    </div>

                                    <div className={`form-group disabled-input`}>
                                        <label>Fostering preference</label>
                                        <input type="text" value={person.fostering_preference_name || ''} placeholder="Previous fostering history" disabled={true}  />
                                    </div>

                                    <div className={`form-group disabled-input`}>
                                        <label>Relationship status</label>
                                        <input type="text" value={person.relationship_status_name || ''} placeholder="Previous fostering history" disabled={true}  />
                                    </div>

                                </div>
                            </div>
                            </Scrollbars>
                        </div>
                    )
                })
            )
        }
    }

    //Handle modal for create applicant
    handleCreateApplicantModal = (action) => {
        this.setState({showCreateApplicantModal: action, personId: ''})
    }

    render(){
      
        const { showModal, personData, showCreateApplicantModal } = this.state;
        const { applicantsCount, applicantsInfo, genderTypes, religionList, ethnicOriginList, nationalityList,
                sexualOrientationList, personTitleList, PreferredContactTimeData, FosteringHistoryData, FosteringPreferenceData, RelationshipStatusData, LanguageData, CountryData ,personInfo, personInfosearch , accountName} = this.props;
                
        return(
            <div className="tab-pane fade show" id="details" role="tabpanel" aria-labelledby="details-tab">
                <div className="curve-box-content">
                    
                        <div className="scrollbar">
                            <div className="tab-links">
                                <ul className="nav nav-tabs nav-item items" id="nav-tab" role="tablist">
                                    {this.detailsTab(applicantsCount)}
                                        {
                                            (this.props.is_post_to_charms == Constant["is_post_to_charms_no"]) 
                                            && 
                                            (applicantsCount == 1) ? 
                                            <button onClick={() => this.handleCreateApplicantModal(true)} className="btn btn-outline-primary add-applicant-btn">
                                                Add Secondary Applicant
                                            </button> 
                                            : ''
                                        }
                                </ul>
                                {showCreateApplicantModal ? 
                                <ApplicantModal showModal={showCreateApplicantModal} updateModal={(data) => this.handleCreateApplicantModal(data)} 
                                    genderTypes={genderTypes}
                                    religionList={religionList}
                                    ethnicOriginList={ethnicOriginList}
                                    nationalityList={nationalityList}
                                    sexualOrientationList={sexualOrientationList}
                                    personTitleList={personTitleList}
                                    PreferredContactTimeData={PreferredContactTimeData}
                                    personInfo={personInfo}
                                    personInfosearch={personInfosearch}
                                    accountName={accountName}
                                    getAccountDetailsSearch={(data) => this.getAccountDetailsSearch(data)}
                                    FosteringHistoryData={FosteringHistoryData}
                                    FosteringPreferenceData={FosteringPreferenceData}
                                    RelationshipStatusData={RelationshipStatusData}
                                    LanguageData={LanguageData}
                                    actionName={'Create'}
                                    submitData={(data) => this.handleSubmit(data)}
                                    submitAddLinkData={(data) => this.handleAddLinkSubmit(data)}
                                    submitDeleteLinkData={(data) => this.handleDeleteLinkSubmit(data)}
                                    CountryData={CountryData}
                                /> 
                                : ''}
                                <div className="tab-content" id="nav-tabContent">
                                    {this.detailTabContent(applicantsInfo)}
                                </div>
                                
                            </div>
                        </div>
                    

                    {showModal ? 
                                <ApplicantModal showModal={showModal} updateModal={this.toggleModal} person={{...personData}}
                                    submitData={(data) => this.handleSubmit(data)}
                                    submitAddLinkData={(data) => this.handleAddLinkSubmit(data)}
                                    submitDeleteLinkData={(data) => this.handleDeleteLinkSubmit(data)}
                                    genderTypes={genderTypes}
                                    religionList={religionList}
                                    ethnicOriginList={ethnicOriginList}
                                    nationalityList={nationalityList}
                                    sexualOrientationList={sexualOrientationList}
                                    personTitleList={personTitleList}
                                    PreferredContactTimeData={PreferredContactTimeData}
                                    personInfo={personInfo}
                                    personInfosearch={personInfosearch}
                                    accountName={accountName}
                                    getAccountDetailsSearch={(data) => this.getAccountDetailsSearch(data)}
                                    FosteringHistoryData={FosteringHistoryData}
                                    FosteringPreferenceData={FosteringPreferenceData}
                                    RelationshipStatusData={RelationshipStatusData}
                                    LanguageData={LanguageData}
                                    actionName={'Update'}
                                    CountryData={CountryData}
                                /> 
                    : null}
                </div>
            </div>
        )
    }
}

export default DetailsTabData;