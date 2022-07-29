import "./index.css";
import React from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';

const ConfirmationPopUp = (props) => {
    /**method to perform action on click of NO button */
    function handleModalCloseClick(props){
        props.handleModalClose();
    }

    /**method to perform action on click of YES button */
    function handleModalSuccessClick(props){
        props.handleModalSuccess();
    }

    const {showModal, heading} = props;

    return (
        <Fade>
        <Modal className="End-Call" id="myModal" centered size="sm" backdrop="static" 
                onHide={() => handleModalCloseClick(props)} show={showModal}
        >
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="main-content">
                    <div className="call-icon-wrap">
                        <span className="power-icon fa fa-power-off" />
                    </div>
                    <h1>{heading}</h1>
                    <div className="btn-wrap-custom text-center">        
                        <button type="button" className="btn btn-outline-primary red"
                                onClick={() => handleModalCloseClick(props)}
                        >No</button>
                        <button type="button" className="btn btn-outline-primary green"
                                onClick={() => handleModalSuccessClick(props)}
                        >Yes</button>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
        </Fade>
    )
}

export default ConfirmationPopUp;