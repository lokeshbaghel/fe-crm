import React from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';
import $ from "jquery";
import ApplicantLinkAccount from './ApplicantLinkAccountModal';
import validateApplicantForm from './ApplicantValidation';
import {displayErrorMessage} from '../../../../utils/helper';

class ApplicantModal extends React.Component {
    state = {
        showModal       : false,
        fields : (this.props.person) ? this.props.person : {},
        errors : {}
    }
    toggleModal = (value) => {
        this.setState({showModal: value})
    }
    /**method to close modal */
    handleModal(action) {
        if(action)
            return false;
        else {
            let instance = this;
            // document.getElementById("myModal").addEventListener('click', function(){
            //     instance.props.updateModal(false);
            // });
            $("#myModal").fadeOut(200, function () {
                $("#myModal").modal("hide");
                instance.props.updateModal(false);
            });
        }
    }
    getAccountDetailsSearch = (data) => {
        this.props.getAccountDetailsSearch(data);
            
          }
    /* handle input field changes */
    handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /* handle check field changes */
    handleCheckChange = (event) => {
        let fields = this.state.fields;
        if(event.target.checked){
            fields[event.target.name] = 1;
        }else{
            fields[event.target.name] = 0;
        }
        this.setState({fields});
    }
    handleClick = () => {
       // this.handleModal()
        this.toggleModal(true);
        this.props.getAccountDetailsSearch('');
       // this.setState({personData : data, personId : id})
    }
    /* validate form */
    validateForm = () => {
        let fields = this.state.fields;
        let response = validateApplicantForm(fields);

        this.setState({errors: response.errors});
        return response.formIsValid;
    }

    /* submit applicant form to parent method*/
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const {first_name, last_name, date_of_birth, address1, address2, city, post_code, email, 
                    telephone_country_code, telephone, mobile_country_code, mobile, gender_id, religion_id, ethnic_origin_id, 
                    nationality_id, sexual_orientation_id, primary_language, secondary_language, other_language, title, 
                    preferred_contact_time, fostering_history, fostering_preference, relationship_status,registered_disabled,driving_license, country_of_birth } = event.target;
            
            let registered_disabled_val = 0;
            let driving_license_val = 0;
            if(registered_disabled.checked)
                registered_disabled_val =1;
            if(driving_license.checked)
                driving_license_val =1;    

            const postData = {
                title                   : title.value,
                first_name              : first_name.value,
                last_name               : last_name.value,
                date_of_birth           : date_of_birth.value,
                address1                : address1.value,
                address2                : address2.value,
                city                    : city.value,
                post_code               : post_code.value,
                email                   : email.value,
                //telephone_country_code  : telephone_country_code.value,
                telephone               : telephone.value,
                //mobile_country_code     : mobile_country_code.value,
                mobile                  : mobile.value,
                gender_id               : gender_id.value,
                religion_id             : religion_id.value, 
                ethnic_origin_id        : ethnic_origin_id.value, 
                nationality_id          : nationality_id.value, 
                sexual_orientation_id   : sexual_orientation_id.value,
                primary_language        : primary_language.value,
                secondary_language      : secondary_language.value,
                other_language          : other_language.value,
                preferred_contact_time  : preferred_contact_time.value,
                fostering_history       : fostering_history.value,
                fostering_preference    : fostering_preference.value,
                relationship_status     : relationship_status.value,
                registered_disabled     : registered_disabled_val,
                driving_license         : driving_license_val,
                country_of_birth        : country_of_birth.value
            }
            this.props.submitData(postData)
        } else {
            displayErrorMessage('You may have missed some fields')
        }
    }

    handleAddLinkSubmit = (postData) => {
           this.props.submitAddLinkData(postData)
    }
    handleDeleteLinkSubmit = (postData) => {
        this.props.submitDeleteLinkData(postData)
    }
    
    render() {
        
        const {errors, fields ,showModal} = this.state;
        const {
            genderTypes, 
            religionList, 
            ethnicOriginList, 
            nationalityList, 
            sexualOrientationList, 
            personTitleList, 
            PreferredContactTimeData,
            personInfo, 
            personInfosearch,
            accountName,
            FosteringHistoryData, 
            FosteringPreferenceData, 
            RelationshipStatusData,
            actionName,
            LanguageData,
            CountryData
        } = this.props;
        
        let enable_registered_value = false;
        let enable_driving_value = false;
        if( fields.registered_disabled)
            enable_registered_value = true;
        if( fields.driving_license)
            enable_driving_value = true;

        return (
            <React.Fragment>
                <Modal id="myModal" className="applicant-info account-profile-page" show={this.props.showModal} centered onHide={() => this.handleModal('hide')}>
                    <Modal.Header>
                        <h1>Applicant Information</h1>
                        <button type="button" className="close" onClick={() => this.handleModal()}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-details-content">
                            <form onSubmit={this.handleSubmit} >
                                <div className="form-group-main first-group">
                                
                                <div className="form-wrap-main">
                                    <div className={`form-group`}>
                                        <label>Title</label>
                                        
                                        <select name="title" value={fields.title || ''} onChange={this.handleChange}>
                                            {(() => {
                                                if (!_.isEmpty(personTitleList)) {
                                                    return( 
                                                        personTitleList.map((data, index) => (
                                                            <option key={index} value={data.id}>{data.title}</option>
                                                        ))
                                                    )
                                                }
                                            })()}
                                        </select>
                                        <small className="form-text text-danger">{errors.title || ''}</small>
                                    </div>
                                </div>
                                <div className="form-wrap-main">
                                    <div className={`form-group`}>
                                        <label>Name</label>
                                        <input type="text" placeholder="Bob" name="first_name" 
                                                value={fields.first_name || ''}
                                                onChange={this.handleChange}
                                        />
                                        <small className="form-text text-danger">{errors.first_name || ''}</small>
                                    </div>
                                </div>
                                <div className="form-wrap-main">
                                    <div className={`form-group `}>
                                        <label>Surname</label>
                                        <input type="text" placeholder="Lennon" name="last_name"
                                                value={fields.last_name || ''}
                                                onChange={this.handleChange} />
                                        <small className="form-text text-danger">{errors.last_name || ''}</small>
                                    </div>
                                </div>

                                <div className="form-wrap-main">
                                    <div className={`form-group dob-input `}>
                                        <label>DOB</label>
                                        <input type="date" placeholder="Charles" name="date_of_birth" 
                                                value={fields.date_of_birth || ''}
                                                onChange={this.handleChange}  />
                                        <small className="form-text text-danger">{errors.date_of_birth}</small>
                                    </div>
                                </div>
                                </div>
                                <div className="form-wrap-main">
                                    <div className="form-group-main double-group">
                                    <div className={`form-group address-input `}>
                                            <label>Address Line 1</label>
                                            <input type="text" placeholder="7 Bridge St" name="address1" 
                                                    value={fields.address1 || ''}
                                                    onChange={this.handleChange}  />
                                            <small className="form-text text-danger">{errors.address1}</small>
                                        </div>
                                        <div className={`form-group address-input`}>
                                            <label>Address Line 2</label>
                                            <input type="text" placeholder="7 Bridge St" name="address2" 
                                                    value={fields.address2 || ''} 
                                                    onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main second-group">
                                    <div className="form-wrap-main">   
                                        <div className={`form-group common-width `}>
                                            <label>Town</label>
                                            <input type="text" placeholder="Chester" name="city" 
                                                    value={fields.city || ''}
                                                    onChange={this.handleChange}  />
                                            <small className="form-text text-danger">{errors.city}</small>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main">
                                        <div className={`form-group post-code `}>
                                            <label>Postcode</label>
                                            <input type="text" placeholder="CH2 2ED" name="post_code" 
                                                    value={fields.post_code || ''}
                                                    onChange={this.handleChange} />
                                            <small className="form-text text-danger">{errors.post_code}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main half-width">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Email</label>
                                            <input type="text" placeholder="boblennon@testing.com" name="email" 
                                                    value={fields.email || ''}
                                                    onChange={this.handleChange} />
                                            <small className="form-text text-danger">{errors.email}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main first-group">
                                    {/* <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Country Code</label>
                                            <input type="text" className="country_code_telephone1" name="country_code_telephone1" 
                                                    defaultValue="+" disabled 
                                            />
                                            <input type="text" className="country_code_telephone" name="telephone_country_code" 
                                                    placeholder="44"
                                                    value={fields.telephone_country_code || ''}
                                                    onChange={this.handleChange}
                                            />
                                            <small className="form-text text-danger">{errors.telephone_country_code}</small>
                                        </div>
                                    </div> */}
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Telephone number</label>
                                            <input type="text" placeholder="787 0387 565" name="telephone" 
                                                    value={fields.telephone || ''}
                                                    onChange={this.handleChange} 
                                            />
                                            <small className="form-text text-danger">{errors.telephone}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main first-group">
                                    {/* <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Country Code</label>
                                            <input type="text" className="country_code_mobile1" name="country_code_mobile1" 
                                                    defaultValue="+" disabled 
                                            />
                                            <input type="text" className="country_code_mobile" name="mobile_country_code" 
                                                    placeholder="44"
                                                    value={fields.mobile_country_code || ''}
                                                    onChange={this.handleChange}
                                            />
                                            <small className="form-text text-danger">{errors.mobile_country_code}</small>
                                        </div>
                                    </div> */}
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Mobile number</label>
                                            <input type="text" placeholder="787 0387 565" name="mobile" 
                                                    value={fields.mobile || ''}
                                                    onChange={this.handleChange} 
                                            />
                                            <small className="form-text text-danger">{errors.mobile}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-spacer"></div>
                                <div className="form-group-main">
                                    <div className="form-wrap-main">
                                        <div className={`form-group gender-input `}>
                                            <label>Gender</label>
                                            <select name="gender_id" value={fields.gender_id} onChange={this.handleChange}>
                                                {(() => {
                                                    if (!_.isEmpty(genderTypes)) {
                                                        return( 
                                                            genderTypes.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.gender_type}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.role_id}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main same-width">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Ethic Origin</label>
                                            <select name="ethnic_origin_id" value={fields.ethnic_origin_id} onChange={this.handleChange}>
                                                {(() => {
                                                    if (!_.isEmpty(ethnicOriginList)) {
                                                        return( 
                                                            ethnicOriginList.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.ethnic_origin}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.ethnic_origin_id}</small>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Nationality</label>
                                            <select name="nationality_id" value={fields.nationality_id} onChange={this.handleChange}>
                                                {(() => {
                                                    if (!_.isEmpty(nationalityList)) {
                                                        return( 
                                                            nationalityList.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.Nationality}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.nationality_id}</small>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main country-of-birth">
                                        <div className={`form-group`}>
                                            <label>Country Of Birth</label>
                                            <select name="country_of_birth" value={fields.country_of_birth || ''} onChange={this.handleChange}>
                                                <option value="">Select Country Of Birth</option>
                                                {(() => {
                                                    if (!_.isEmpty(CountryData)) {
                                                        return( 
                                                            CountryData.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.country_name}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group-main half-width">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>1st Language</label>
                                            {/* <input type="text" placeholder="English" name="primary_language" 
                                                    value={fields.primary_language || ''}
                                                    onChange={this.handleChange}  
                                            /> */}
                                            <select name="primary_language" value={fields.primary_language || ''} onChange={this.handleChange}>
                                                <option value="">Select Primary Language</option>
                                                {(() => {
                                                    if (!_.isEmpty(LanguageData)) {
                                                        return( 
                                                            LanguageData.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.language}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.primary_language}</small>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>2nd Language</label>
                                            {/* <input type="text" placeholder="Welsh" name="secondary_language" 
                                                    value={fields.secondary_language || ''}
                                                    onChange={this.handleChange}  
                                            /> */}
                                            <select name="secondary_language" value={fields.secondary_language  || ''} onChange={this.handleChange}>
                                            <option value="">None</option>
                                                {(() => {
                                                    if (!_.isEmpty(LanguageData)) {
                                                        return( 
                                                            LanguageData.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.language}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.secondary_language}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group-main half-width">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Other Language</label>
                                            {/* <input type="text" placeholder="None" name="other_language" 
                                                    value={fields.other_language || ''}
                                                    onChange={this.handleChange} 
                                            /> */}
                                            <select name="other_language" value={fields.other_language  || ''} onChange={this.handleChange}>
                                            <option value="">None</option>
                                                {(() => {
                                                    if (!_.isEmpty(LanguageData)) {
                                                        return( 
                                                            LanguageData.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.language}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.other_language}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main three-col">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Religion</label>
                                            <select name="religion_id" value={fields.religion_id} onChange={this.handleChange}>
                                                {(() => {
                                                    if (!_.isEmpty(religionList)) {
                                                        return( 
                                                            religionList.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.religion}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.religion_id}</small>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Sexual Orientation</label>
                                            <select name="sexual_orientation_id" value={fields.sexual_orientation_id} onChange={this.handleChange}>
                                                {(() => {
                                                    if (!_.isEmpty(sexualOrientationList)) {
                                                        return( 
                                                            sexualOrientationList.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.sexual_orientation}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                            <small className="form-text text-danger">{errors.sexual_orientation_id}</small>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main custom-check">
                                        <div className={`form-group `}>
                                            <label>Registered Disabled</label>
                                            <input type="checkbox" name="registered_disabled" defaultChecked={enable_registered_value} onChange={this.handleCheckChange}  />
                                        </div>
                                    </div>
                                </div>
                                <div className="border-spacer"></div>

                                <div className="form-group-main three-col">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}> 
                                            <label>Link Family</label>
                                            <input type="text" placeholder="Lorem Ipsum" name=""   />
                                            <span className="btn btn-primary custom-link" onClick={() => this.handleClick()}>Link</span>
                                        </div>
                                    </div>
                                    <div className="form-wrap-main custom-check">
                                        <div className={`form-group `}>
                                            <label>Driving License</label>
                                            <input type="checkbox" name="driving_license" defaultChecked={enable_driving_value} onChange={this.handleCheckChange} />
                                        </div>
                                    </div>
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Preferred contact time</label>
                                            <select name="preferred_contact_time" value={fields.preferred_contact_time || ''} onChange={this.handleChange}>
                                                <option value="">Select</option>
                                                {(() => {
                                                        if (!_.isEmpty(PreferredContactTimeData)) {
                                                            return( 
                                                                PreferredContactTimeData.map((data, index) => (
                                                                    <option key={index} value={data.id}>{data.value}</option>
                                                                ))
                                                            )
                                                        }
                                                    })()}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-main three-col">
                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Previous fostering history</label>
                                            <select name="fostering_history" value={fields.fostering_history || ''} onChange={this.handleChange}>
                                                <option value="">Select</option>
                                                {(() => {
                                                        if (!_.isEmpty(FosteringHistoryData)) {
                                                            return( 
                                                                FosteringHistoryData.map((data, index) => (
                                                                    <option key={index} value={data.id}>{data.value}</option>
                                                                ))
                                                            )
                                                        }
                                                    })()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Fostering preference</label>
                                            <select name="fostering_preference" value={fields.fostering_preference || ''} onChange={this.handleChange}>
                                                <option value="">Select</option>
                                                {(() => {
                                                        if (!_.isEmpty(FosteringPreferenceData)) {
                                                            return( 
                                                                FosteringPreferenceData.map((data, index) => (
                                                                    <option key={index} value={data.id}>{data.value}</option>
                                                                ))
                                                            )
                                                        }
                                                    })()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-wrap-main">
                                        <div className={`form-group `}>
                                            <label>Relationship status</label>
                                            <select name="relationship_status" value={fields.relationship_status || ''} onChange={this.handleChange}>
                                                <option value="">Select</option>
                                                {(() => {
                                                        if (!_.isEmpty(RelationshipStatusData)) {
                                                            return( 
                                                                RelationshipStatusData.map((data, index) => (
                                                                    <option key={index} value={data.id}>{data.value}</option>
                                                                ))
                                                            )
                                                        }
                                                    })()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="btn-wrap">
                                    <button type="submit" className="btn btn-primary text-center">{actionName}</button>
                                </div>
                            
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <a className="cancel-btn" data-dismiss="modal" aria-label="Close" onClick={() => this.handleModal()}>
                          Cancel
                        </a> */}
                    </Modal.Footer>
                </Modal>


                {showModal ? 
                                <ApplicantLinkAccount showModal={showModal} updateModal={this.toggleModal} person={this.props.person}
                                getAccountDetails={(data) => this.getAccountDetailsSearch(data)}  
                                submitData={(data) => this.handleAddLinkSubmit(data)}
                                deleteSubmitData={(data) => this.handleDeleteLinkSubmit(data)}
                                personInfo={personInfo}
                                personInfosearch={personInfosearch}
                                accountName={accountName}
                                /> 
                    : null}
            </React.Fragment>
        )
    }
}

export default ApplicantModal;