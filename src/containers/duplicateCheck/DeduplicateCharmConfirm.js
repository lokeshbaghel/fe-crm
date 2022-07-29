import "./index.css";
import React from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';

const DeduplicateCharmConfirm = (props) => {
    /**method to perform action on click of NO button */
    function handleModalCloseClick(props){
        props.cancelModal();
    }

    /**method to perform action on click of YES button */
    function handleModalSuccessClick(props){
        props.submitData(true);
    }

    const {showModal, title} = props;

    return (
        <Fade>
        <Modal className="duplicateConfirm" id="myModal" centered size="sm" backdrop="static" 
                onHide={() => handleModalCloseClick(props)} show={showModal}>
            <Modal.Header>  
                {/* <button
                    type="button"
                    className="close"
                    onClick={(data) => this.handleModalCloseClick(props)}>
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Close</span>
                </button> */}
            </Modal.Header>
            <Modal.Body>
                <div className="main-content">
                    <h1>{title}</h1>
                    <div className="btn-wrap-custom text-center">    
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => handleModalSuccessClick(props)}>
                            Yes</button>    
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => handleModalCloseClick(props)}>
                            No</button>
                        
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
        </Fade>
    )
}

export default DeduplicateCharmConfirm;