import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import './index.css';

import EditIcon from '../../assets_crm/img/edit-circle-icon.png'

const ToastPopUp = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      <div className="Toast-Wrap">
      <img className="Edit-icon" onClick={() => toggleShow(true)} src={EditIcon} alt="Edit" />
      <div className="custom-toast">
          <Toast show={show} onClose={() => toggleShow(false)}>
            {/* <Toast.Header>
              <strong className="mr-auto">Edit</strong>
            </Toast.Header> */}
            <Toast.Body>
            <button onClick={() => toggleShow(false)} type="button" className="close ml-2 mb-1" data-dismiss="toast"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
            {children}</Toast.Body>
          </Toast>
      </div>
      </div>
    </>
  );
};

export default ToastPopUp;
