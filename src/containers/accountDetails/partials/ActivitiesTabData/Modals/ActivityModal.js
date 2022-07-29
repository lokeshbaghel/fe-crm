import React from "react";
import { Modal } from "react-bootstrap";


const ActivityModal = (props) => {
    /**method to perform action on click of NO button */
    function handleModalCloseClick(props){
        props.handleModalClose();
    }

    /**method to perform action on click of YES button */
    function handleModalSuccessClick(props, type){
        props.handleModalSuccess(type);
    }

    const {showModal, heading} = props;

    return (
        <Modal className="activity-modal" id="myModal" centered size="sm" backdrop="static" 
                onHide={() => handleModalCloseClick(props)} show={showModal}
        >
            <Modal.Header>
                <button type="button" className="close" onClick={() => handleModalCloseClick(props)}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="main-content">
                   
                    <h1>{heading}</h1>
                    <div className="btn-wrap-custom text-center">        
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => handleModalSuccessClick(props,'call')}
                        >Call</button>
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => handleModalSuccessClick(props,'email')}
                        >Email</button>
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => handleModalSuccessClick(props,'task')}
                        >SMS</button>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}

export default ActivityModal;