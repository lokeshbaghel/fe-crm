import React from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';
import $ from "jquery";
import MessagePopup from './ConfirmPopUP';
import "./index.css";


class ApplicantModal extends React.Component {
    state = {
        fields : (this.props.tableList) ? this.props.tableList : {},
        errors : {},
        searchValue:'',
        sub_id:'',
        checked:false,
        deleteid:'',
        showdeleteMessagePopup:false,
        showMessagePopup:false
    }

    toggleMessagePopupModal = (value) => {
       this.setState({ showMessagePopup: value });
    }

    toggleMessagePopupfordeleteModal = (value,id) => {
        if(id!=='')
        {
            this.setState({ showdeleteMessagePopup: value ,deleteid:id});
        }
     
        else
        {
            this.setState({ showdeleteMessagePopup: value });
        }
       
     }

    /**method to close modal */
    handleModal(action) {
        if(action)
            return false;
        else {
            let instance = this;
            $("#savedTableModal").fadeOut(200, function () {
                $("#savedTableModal").modal("hide");
                instance.props.updateSavedTableModal(false);
            });
        }
    }

   /* validate form */
    updateModalStatus =async (res) => {
        this.toggleMessagePopupModal(false);
        if(res==true)
        {
            let data={account_Id2:this.state.sub_id,
                searchTitle:this.state.searchValue,}
            await  this.props.submitData(data)
            //await this.setState({errors: ''},this.callSearchApi);
        }
      }
    

    updateDeleteModalStatus=async (res) => {
        
        await  this.toggleMessagePopupfordeleteModal(false,'');
        if(res==true)
        {
            await  this.props.deleteSubmitData(this.state.deleteid)
            //  await this.setState({errors: ''},this.callSearchApi);
        }
    
    }
 
  
    handleSearchTitle= async (e)=>{
      await  this.setState({searchValue: e.target.value},this.callSearchApi);
     

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value },this.toggleMessagePopupModal(true))
    }




    appendSavedTableResult=(data)=>{  
        return data.map(( dataSet,index )=>(
            <tr key={ index + 1 } >
                
                <td><span>{dataSet.tableName}</span></td>
                <td>  <button  className="btn btn-danger del-btn"  onClick={() => this.toggleMessagePopupfordeleteModal(true,dataSet?.id)}>
                    <i class="fa fa-trash danger" aria-hidden="true"></i></button>
                </td>
                                        
            </tr> 
        ))
  
    }

    
    render() {
        const {errors, fields,searchValue } = this.state;
        const {tableList } = this.props;
        return (
            <React.Fragment>
                  
                <Modal id="savedTableModal" className="saved-table-list-modal" show={this.props.showModal} centered onHide={() => this.handleModal('hide')}>
                    <Modal.Header>
                        <h1>Saved Table List</h1>

                        <button type="button" className="close" onClick={() => this.handleModal()}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                           <React.Fragment>
                                <div className="table-responsive">
                                    <table className={`table saved-table-list dropdown-table`}>
                                        <tbody>
                                            <tr>
                                                <th><span> Table Name</span></th>
                                                <th>Delete</th>
                                            </tr>
                                            {  !_.isEmpty(tableList) && tableList.length >= 1 ? this.appendSavedTableResult( tableList ) 
                                                :
                                                <tr>
                                                    No Record Found.
                                                </tr>  
                                            }  
                                        </tbody>
                                    </table>
                                </div>
                            </React.Fragment>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <a className="cancel-btn" data-dismiss="modal" aria-label="Close" onClick={() => this.handleModal()}>
                          Cancel
                        </a> */}
                    </Modal.Footer>
                </Modal>
                {
                      this.state.showMessagePopup ?
                      ( <MessagePopup canShow={this.state.showMessagePopup} message='Are you sure want to add this account ?' handleModal={(data) => this.updateModalStatus(data)} />)
                      : null  
                 }
                   {
                      this.state.showdeleteMessagePopup ?
                      ( <MessagePopup canShow={this.state.showdeleteMessagePopup} message='Are you sure want to delete this account ?' handleModal={(data) => this.updateDeleteModalStatus(data)} />)
                      : null  
                 }
                 
            </React.Fragment>
        )
    }
}

export default ApplicantModal;