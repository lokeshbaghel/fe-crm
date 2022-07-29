import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from 'lodash';
import moment from 'moment';

import { images, displayErrorMessage, displaySuccessMessage, displayRecordNotFound } from "../../../../utils/helper";
import SearchBox from "../../../../components/Search";
import InitialEnquiryFormModal from './InitialEnquiryFormModal/index';
import Constant from '../../../../utils/constants';
import DeleteDocumentModal from './DeleteDocumentModal';

let base64File, contentType, globalDropArea, globalDragContent, globalSubmit, globalReset;
let originalFile;

const FileDragDrop = () => {
    const dropArea = document.querySelector(".upload-container"),
    dragText = dropArea.querySelector(".uploadtext"),
    input = dropArea.querySelector("#myFile");
    globalSubmit = document.querySelector('.submitFile');
    globalReset = document.querySelector('.resetFile');
    globalDropArea = document.querySelector(".upload-container");
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

class DocumentsTabData extends Component{
    state = {
        searchString    : '',
        showModal: false,
        showDeleteDocumentModal: false,
        selectedDocumentId:''
    }

    /*lifecycle method to implement drag & drop */
    componentDidMount(){
        FileDragDrop()
    }
    //handle modal for close open
    handleModal = (action, id) =>{
        this.setState({showDeleteDocumentModal:action, selectedDocumentId:id})
    }
    //handle function to delete document
    deleteDocument = (id)=>{
        if(id){
            this.props.deleteDocumentData(id);
        }
        this.setState({showDeleteDocumentModal:false})
    }

    /**method to display document list */
    docsList = (documentTabData, showDeleteDocumentModal, selectedDocumentId) => {
        if(!_.isEmpty(documentTabData)){
            return(
                documentTabData.map((data,index) => {
                    return(
                        <div className="doc-history-list" key={index}>
                            <a href={data.s3_location} target="_blank" rel="noopener noreferrer" alt="Image">
                                <div className="doc-history-icon">
                                    {/* <img src={images["doc-icon.jpg"]} /> */}
                                    {this.showImage(data)}
                                </div>
                            </a>
                            <div className="doc-right col-md-10">
                            <a href={data.s3_location} target="_blank" rel="noopener noreferrer">
                                <p>{moment(data.uploaded_ts).format("DD/MM/YYYY hh:mmA")}</p>
                                <h2>{data.name}</h2>
                            </a>
                                {/* <h3>Submited from progress item 12344</h3> */}
                            </div>
                            {(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]) && (this.props.post_hold_to_charms != Constant["post_hold_to_charms_yes"]) ?
                            <div className="col-md-2 text-danger"> 
                                <button className="btn btn-outline-danger btn-sm" style={{padding:"3px", fontSize:"12px"}} onClick={()=>this.handleModal(true, data.id)}>Delete</button>
                            </div>
                            : null }
                            {showDeleteDocumentModal && (selectedDocumentId ==data.id) ? 
                            <DeleteDocumentModal canShow={showDeleteDocumentModal} updateModal={(data)=>this.handleModal(false, data.id)} actionModal={()=>this.deleteDocument(data.id)} id={data.id}/>
                            :''}

                        </div>
                    )
                })
            )
        } else {
            return(
                displayRecordNotFound('No Documents Added')
            )
        }
    }

    /**method to display icon in the list */
    showImage = (data) => {
        if(data.name.match(/\.(pdf)$/))
            return <img src={images["pdf-icon.png"]} alt="PDF" />
        else if(data.name.match(/\.(doc|docx)$/))
            return <img src={images["doc-icon.jpg"]} alt="DOC" />
        else if(data.name.match(/\.(xls|xlsx)$/))
            return <img src={images["xls-icon.png"]} alt="Image" />
        else
            return <img src={data.s3_location} />
    }

    /**method to submit file to parent */
    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            file        : base64File,
            account_id  : this.props.account_id,
            fileName    : originalFile.name,
            contentType,
        }
        
        //If Account is not passed to Charms
        if(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]){
            this.props.submitDocument(data);
            this.resetPreview();
        }
    }

    /**method to reset the preview */
    resetPreview = () => {
        globalDropArea.innerHTML = '';
        globalDropArea.append(globalDragContent);
        globalSubmit.style.display = "none";
        globalReset.style.display = "none";
    }

    /*method called to when search is performed and called parent method*/
    handleSearchInputChange(value) {
        this.props.searchDocumentData({search : value})
    }

    /**
     * Handle Initial Enquiry Form Modal
     */
    toggleModal = (show) => {
        this.setState({ showModal: show });
    }
    saveGeneralIeForm=(data)=>{
        this.props.saveGeneralIeForm(data)
    }
    submitIEForm=(data)=>{
        this.props.submitIEForm(data)
    }
    submitPostCode=(data)=>{
        this.props.submitPostCode(data)
    }
    
    render(){
        const {documentTabData, is_post_to_charms, applicantsInfo, marketingList, personeEnquiryList, 
               CountryData,CurrentSituationData,RelationshipData,LocalAuthorityData,personTitleList,responceBack, 
               ethnicOriginList,agencyList,RelationshipStatusData,stageId,FosteringHistoryData,blocking,listIEFormData, OccupationData, post_hold_to_charms,authority_id, marketing_tab } = this.props;
               
        const {searchString, showModal, showDeleteDocumentModal, selectedDocumentId } = this.state;
        return(
            <div className="tab-pane fade show" id="documents" role="tabpanel" aria-labelledby="documents-tab">
                <div className="curve-box-content documents-content">
                    <Scrollbars style={{ height: "660px" }}>
                        <div className="scrollbar">
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="upload-wrapper">
                                            {is_post_to_charms == Constant["is_post_to_charms_yes"] ? <div className="disable-drag-drop"></div> : ''}
                                            <div className="upload-container">
                                                <img src={images["image-gallery.png"]} />
                                                {/* <p className="upload-doc">Upload Documents</p> */}
                                                <div className="upload-content">
                                                    <label className="uploadtext">Drag & Drop your file here to upload, or</label>
                                                    <input disabled={(is_post_to_charms == Constant["is_post_to_charms_yes"]) || (post_hold_to_charms == Constant["post_hold_to_charms_yes"])} type="file" id="myFile" name="filename" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pdf-btn-div">
                                            <a className="cancel-btn resetFile" style={{'display' : 'none'}}
                                                onClick={this.resetPreview}>Cancel</a>
                                            <button type="submit" disabled={(is_post_to_charms == Constant["is_post_to_charms_yes"]) || (post_hold_to_charms == Constant["post_hold_to_charms_yes"])} className="btn btn-primary float-right submitFile" style={{'display' : 'none'}}>Upload</button>
                                        </div>
                                    </form>
                                    <div className="inital-enquiry-form-btn-wrap">
                                        
                                     <button disabled={(is_post_to_charms == Constant["is_post_to_charms_yes"]) || (post_hold_to_charms == Constant["post_hold_to_charms_yes"]) ||  stageId!=1} className="btn btn-outline-primary initial-enquiry-btn" onClick={() => this.toggleModal(true)}><img src={images["enquery-icon.png"]} /> Initial Enquiry Form</button>
                                        {showModal ? 
                                            <InitialEnquiryFormModal 
                                                applicantsInfo={applicantsInfo} 
                                                listIEFormData={listIEFormData}
                                                marketingList={marketingList} 
                                                personeEnquiryList={personeEnquiryList} 
                                                personTitleList={personTitleList}
                                                ethnicOriginList={ethnicOriginList}
                                                canShow={showModal} 
                                                agencyList={agencyList}
                                                CountryData={CountryData}
                                                CurrentSituationData ={CurrentSituationData}
                                                RelationshipData={RelationshipData}
                                                LocalAuthorityData={LocalAuthorityData}
                                                RelationshipStatusData={RelationshipStatusData}
                                                FosteringHistoryData={FosteringHistoryData}
                                                saveGeneralIeForm={(data)=>this.saveGeneralIeForm(data)}
                                                closeModal={(action) => this.toggleModal(action)} 
                                                OccupationData={OccupationData}
                                                responceBack={responceBack}
                                                blocking={blocking}
                                                marketing_tab={marketing_tab}
                                                submitIEForm={(data)=>this.submitIEForm(data)}
                                                submitPostCode={(data) => this.submitPostCode(data)}
                                                authority_id={authority_id}
                                            /> 
                                        : ''}
                                    </div>
                                </div>
                                </div>

                            <div className="filter-container">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-5">
                                        <h3>Document upload history</h3>
                                    </div>
                                    <div className="col-md-7 d-flex justify-content-md-end">
                                        {/* <div className="search-div">
                                            <input type="text" className="form-control search-user" placeholder="" />
                                            <button type="submit" className="search-btn" >search</button>
                                        </div> */}
                                        <SearchBox searchInputChangeValue={(val) => this.handleSearchInputChange(val)}
                                                    searchValue={searchString}
                                                    resetButtonClass="btn filter-button btn-outline-primary"
                                                    placeholder={"Search filename"}
                                            />
                                        {/* <a href="#" className="btn filter-button btn-outline-primary">Filter</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.docsList(documentTabData, showDeleteDocumentModal, selectedDocumentId)}
                                </div>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

export default DocumentsTabData;