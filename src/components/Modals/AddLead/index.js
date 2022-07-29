import "./index.css";
import React from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';
import Fade from 'react-reveal';
import validator from 'validator'; 
import MessagePopup from './ConfirmPopup';
import imageGallery from "../../../assets_crm/img/image-gallery.png";
import validateLeadForm from './LeadFormValidation';
import {images, displayErrorMessage, displaySuccessMessage} from '../../../utils/helper'

let base64File, contentType, globalDropArea, globalDragContent, globalSubmit, globalReset;
let originalFile;

const FileDragDrop = () => {
    const dropArea = document.querySelector(".upload-container-lead"),
    dragText = dropArea.querySelector(".uploadtextLead"),
    input = dropArea.querySelector("#myFile");
    globalSubmit = document.querySelector('.submitFile');
    globalReset = document.querySelector('.resetFile');
    globalDropArea = document.querySelector(".upload-container-lead");
    globalDragContent = globalDropArea.querySelector(".upload-content");
    let file; //this is a global variable and we'll use it inside multiple functions

    //If user manually selects file
    input.addEventListener("change", function(){
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = this.files[0];
        dropArea.classList.add("active");
        showFile();
        this.value=null; 
        return false;
    });

    //If user Drag File Over DropArea
    dropArea.addEventListener("dragover", (event)=>{
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    //If user leave dragged File from DropArea
    dropArea.addEventListener("dragleave", ()=>{
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop your file here to upload, or";
    });

    //If user drop File on DropArea
    dropArea.addEventListener("drop", (event)=>{
        event.preventDefault();
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = event.dataTransfer.files[0];
        dragText.textContent = "Drag & Drop your file here to upload, or";
        showFile(); //calling function
    });
   
    function showFile() {
        //let validExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/msword"]; //adding some valid image extensions in array
        if(file.name.match(/\.(jpg|jpeg|png|pdf|doc|docx|xls|xlsx)$/)){ //if user selected file is an image file
            if(file.size <= 2000000){
                contentType = file.type; //getting selected file type
                if(_.isEmpty(contentType)){
                    if(file.name.match(/\.(doc)$/))
                        contentType = 'application/msword';
                    else
                        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
                
                let fileReader = new FileReader(); //creating new FileReader object
                fileReader.onload = ()=>{
                    let fileURL = fileReader.result; //passing user file source in fileURL variable
                    base64File = fileURL;
                    let imgTag = '';
                    originalFile = file;
                    if(file.name.match(/\.(jpg|jpeg|png)$/)) {
                        imgTag = `<img src="${fileURL}" alt="" />`; //creating an img tag and passing user selected file source inside src attribute
                        displaySuccessMessage('Image dragged & dropped successfully')
                    } else {
                        if(file.name.match(/\.(pdf)$/)){
                            imgTag = `<img src="${images['pdf-icon.png']}" />`
                            displaySuccessMessage('PDF dragged & dropped successfully')
                        } else if(file.name.match(/\.(doc|docx)$/)){
                            imgTag = `<img src="${images["doc-icon.jpg"]}" />`
                            displaySuccessMessage('Document dragged & dropped successfully')
                        } else {
                            imgTag = `<img src="${images["xls-icon.png"]}" />`
                            displaySuccessMessage('Excel dragged & dropped successfully')
                        }
                    }
    
                    
                    dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
                    globalSubmit.style.display = "block";
                    globalReset.style.display = "block";
                }
                fileReader.readAsDataURL(file);
            } else {
                displayErrorMessage("Please upload file of size less than 1 mb!");
                dropArea.classList.remove("active");
                dragText.textContent = "Drag & Drop your file here to upload, or";
            }
        }else{
            displayErrorMessage("This file is not allowed!");
            dropArea.classList.remove("active");
            dragText.textContent = "Drag & Drop your file here to upload, or";
        }
    }
}

class AddLead extends React.Component {
    constructor(props) {
        super(props);
        this.focusBtnRef = React.createRef();
        this.state = {
            showMessagePopup:false,
            showHide: this.props?.canShow,
            fields : {},
            errors : {},
            showHighlighed:false
        }
      }

      updateModalStatus =async (res) => {
        this.toggleMessagePopupModal(false);
        if(res==true)
        {
           this.handleModal(false);
        }
        
      }
    componentDidMount(){
        FileDragDrop()
    }
    toggleMessagePopupModal = (value) => {
        this.setState({ showMessagePopup: value });
     }
    handleModal(action = '') {


        if(action)
            return false;
        else 
            this.props.updateModal(false);
    }

    /* validate login form */
    validateForm = () => {
        let fields = this.state.fields;
        let response = validateLeadForm(fields);

        this.setState({errors: response.errors});
        return response.formIsValid;
    }

    /* handle input field changes */
    handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /* Handle input for country code for numbers */

    
    handleKeyDownCountryCode = (event) => {
        if(window.innerWidth>1000){
            const key = String.fromCharCode(event.which ? event.which : event.keyCode);
            if(event.keyCode== 13 || event.keyCode== 8 || event.keyCode== 18 || event.keyCode== 9 || event.keyCode== 46 || event.keyCode== 16 || event.keyCode== 38 || event.keyCode== 37 || event.keyCode== 39 || event.keyCode== 40){
                // 
            }else{
                const isValidPhoneNumber = validator.isNumeric(key)
                if (!isValidPhoneNumber) {
                    event.preventDefault();
                    //displayErrorMessage('Please type numbers only') 
                    return false;
                }
            }
        }
        
        return true;
    }
    

    /* handle input telephone changes for numbers only */
    handleKeyDown = (event) => {
        //this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(window.innerWidth>800){
            const key = String.fromCharCode(event.which ? event.which : event.keyCode);
            if(event.keyCode== 13 || event.keyCode== 9 ||event.keyCode== 8||event.keyCode== 18 || event.keyCode== 46 || event.keyCode== 16 || event.keyCode== 38 || event.keyCode== 37 || event.keyCode== 39 || event.keyCode== 40){
                // 
            }else{
                const isValidPhoneNumber = validator.isNumeric(key);
                if (!isValidPhoneNumber) {
                    event.preventDefault();
                   // displayErrorMessage('Please type numbers only')
                    return false;
                }
            }
        }
        
        return true;
    }

    /* submit lead form to parent method*/
    handleSubmit = (event) => {
        
        event.preventDefault();
        const ImageData = {
            file        : base64File ? base64File : null,
            fileName    : originalFile ? originalFile?.name : null,
            contentType : contentType ? contentType : null,
        }
        
        if (this.validateForm()) 
            this.props.submitData(event.target, ImageData);
        
        this.focusBtnRef.current.blur()
    }

    /**method to reset the preview */
    resetPreview = () => {
        globalDropArea.innerHTML = '';
        globalDropArea.append(globalDragContent);
        globalSubmit.style.display = "none";
        globalReset.style.display = "none";
    }

    /** method to marketing consent tab */
    handleToggle = (event) => {
        let value = 2;
        if(document.getElementById('marketing_consent').checked == true)
            value = 1;
        this.setState({ marketing_consent : parseInt(value) });
    }
    handleFocus = () => {
        this.setState({ showHighlighed : true });        
    }
    handleBlur = () => {
        this.setState({ showHighlighed : false });        
    }

    render() {
        const {errors,marketing_consent, showHighlighed} = this.state;
        const { marketingSources,agencies, currentSituations, canShow } = this.props;
        
        return (
            <>
             {
                      this.state.showMessagePopup ?
                      ( <MessagePopup canShow={this.state.showMessagePopup} message="Are you sure you want to close the add an enquiry modal?" handleModal={(data) => this.updateModalStatus(data)} />)
                      : null  
                 }
            <Fade>
                <Modal id="myModal" className="add-lead" show={canShow} centered onHide={() => this.handleModal('hide')} animation={true}>
                    <Modal.Header>
                        <h1>{this.props?.heading}</h1>
                        <button type="button" className="close" onClick={() => this.toggleMessagePopupModal(true)}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Enquiry Details</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group two-inline first">
                                <div className="inputs-group">
                                    <input type="text" tabIndex="1" placeholder="Name" name="first_name" onChange={this.handleChange} />
                                    <small className="form-text text-danger">{errors.first_name}</small>
                                </div>
                                <div className="inputs-group">
                                    <input type="text" tabIndex="2" placeholder="Surname" name="last_name" onChange={this.handleChange} />
                                    <small className="form-text text-danger">{errors.last_name}</small>
                                </div>
                            </div>

                            <div className="form-group two-inline">
                                <div className="inputs-group">
                                    <select tabIndex="3" name="spare_rooms" onChange={this.handleChange}>
                                        <option value="">Select Spare Rooms</option>
                                        <option value={1}>Yes</option>
                                        <option value={2}>No</option>
                                    </select>
                                    <small className="text-danger">{errors.spare_rooms}</small>
                                </div>
                                <div className="inputs-group">
                                    <select tabIndex="4" name="agency_id" onChange={this.handleChange}>
                                        <option value="">Select Agency</option>
                                        {(() => {
                                            if (!_.isEmpty(agencies)) {
                                                return( 
                                                    agencies.map((data, index) => (
                                                        <option key={index} value={data.id}>{data.agency_name}</option>
                                                    ))
                                                )
                                            }
                                        })()}
                                    </select>
                                    <small className="form-text text-danger">{errors.agency_id}</small>
                                </div>
                              
                            </div>

                           <div className="form-group three-inline">
                            <div className="inputs-group">
                                <input type="text" tabIndex="5" placeholder="Address Line 1" name="address" onChange={this.handleChange} />
                                <small className="text-danger">{errors.address}</small>
                            </div>
                            <div className="inputs-group">
                                <input type="text" tabIndex="6" placeholder="Address Line 2" name="address1" onChange={this.handleChange} />
                                <small className="text-danger">{errors.address1}</small>
                            </div>
                            </div>

                            <div className="form-group three-inline">
                                <div className="inputs-group">
                                    <input type="text" tabIndex="7" placeholder="Town" 
                                          name="town" 
                                          onChange={this.handleChange}
                                    />
                                    <small className="text-danger">{errors.town}</small>
                                </div>
                                <div className="inputs-group">
                                    <input type="text" tabIndex="8" placeholder="Post Code" 
                                          name="post_code" 
                                          onChange={this.handleChange}
                                    />
                                    <small className="text-danger">{errors.post_code}</small>
                                </div>
                                <div className="inputs-group">
                                    <select name="current_situation" tabIndex="9" className="current_situation_width" onChange={this.handleChange} >
                                        <option value="">Select Current situation</option>
                                        {(() => {
                                            if (!_.isEmpty(currentSituations)) {
                                                return( 
                                                    currentSituations.map((data, index) => (
                                                        <option key={index} value={data.id}>{data.value}</option>
                                                    ))
                                                )
                                            }
                                        })()}
                                    </select>
                                    <small className="text-danger">{errors.current_situation}</small>
                                </div>
                                
                            </div>



                            <div className="form-group">
                                <input type="text" placeholder="Email address" tabIndex="10" name="email" onChange={this.handleChange} />
                                <small className="text-danger">{ errors.email }</small>
                            </div>
                            <div className="form-group two-inline">
                                <div className="country-code-wrapper">
                                    {/* <div className="input-wrap country-code-div">
                                        <div className="country-code">
                                            <span>+</span>
                                            <input type="tel" placeholder="Country Code" className="telephone_country_code" 
                                                    name="mobile_country_code"
                                                    onChange={this.handleChange}
                                                    onKeyDown={this.handleKeyDownCountryCode}
                                            />
                                        </div>
                                        <small className="text-danger">{errors.mobile_country_code}</small>
                                    </div> */}
                                    <div className="inputs-wrap">
                                        <input type="tel" placeholder="Mobile number" tabIndex="11"  maxLength="11" name="mobile" autoComplete="off" 
                                                onChange={this.handleChange}
                                                onKeyDown={this.handleKeyDown}
                                        />
                                        <small className="text-danger">{errors.mobile}</small>
                                    </div>
                                </div>
                                
                                <div className="leadinner inputs-group">
                                    <div className="switch-btn" >
                                        Marketing Consent  
                                        <label className="switch">
                                        <input tabIndex="12" type="checkbox" name="marketing_consent" id="marketing_consent"
                                                value={marketing_consent ? marketing_consent : 2 }
                                                checked={marketing_consent == 1 ? true : false}
                                                onChange={this.handleToggle}
                                                onFocus={this.handleFocus} 
                                                onBlur={this.handleBlur} 
                                                />
                                        <span className={(showHighlighed) ? 'slider round show-highlited' : 'slider round'}></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="form-group">
                                <textarea tabIndex="13"
                                    placeholder="A record of all communications"
                                    className="textarea-scrollbar scrollbar-outer"
                                    name="notes"
                                    onChange={this.handleChange}
                                >
                                </textarea>
                                <small className="text-danger">{errors.notes}</small>
                            </div>
                            <div className="form-group two-inline first">
                                <div className="inputs-group select-market-dropdown">
                                    <select tabIndex="14" name="marketing_source_id" onChange={this.handleChange}>
                                        <option value="">Select Marketing Source</option>
                                        {(() => {
                                            if (!_.isEmpty(marketingSources)) {
                                                return( 
                                                    marketingSources.map((data, index) => (
                                                        <option key={index} value={data.id}>{data.name}</option>
                                                    ))
                                                )
                                            }
                                        })()}
                                    </select>
                                    <small className="text-danger">{errors.marketing_source_id}</small>
                                </div>
                           </div>

                           <div className="upload-container-lead">
                                <img src={imageGallery} alt="" />
                                {/* <p className="upload-doc">Upload Documents</p> */}
                                <div className="upload-content">
                                    <label className="uploadtextLead">Drag your image here, or</label>
                                    <input type="file" id="myFile" name="filename" />
                                </div>
                            </div> 
                            {/* <small style={{'color':'red'}}>Note:- fields with * are mandatory</small> */}
                            <div className="pdf-btn-div">
                                <a className="cancel-btn resetFile" style={{'display' : 'none'}}
                                    onClick={this.resetPreview}>Cancel</a>
                                    <a  className="submitFile">Upload</a>
                            </div>
                            <div className="btn-wrap">
                                <button tabIndex="15" type="submit" ref={this.focusBtnRef} className="btn btn-primary" >
                                    Create Enquiry
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        { /*<a className="cancel-btn" data-dismiss="modal" aria-label="Close" onClick={() => this.handleModal()}>
                          Cancel
                                    </a> */}
                    </Modal.Footer>
                </Modal>
            </Fade>
            </>
        )
    }
}

export default AddLead;