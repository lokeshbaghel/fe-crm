import React from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';
import $ from "jquery";
import MessagePopup from './ConfirmPopup';


class ApplicantModal extends React.Component {
    state = {
        fields : (this.props.person) ? this.props.person : {},
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
       
            $("#myModallinkaccount").fadeOut(200, function () {
                $("#myModallinkaccount").modal("hide");
                instance.props.updateModal(false);
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
    callSearchApi= async ()=>{
        const { searchValue } = this.state;
       // if(searchValue.length>=3){
        
           var searchTitle = searchValue;
           await  this.props.getAccountDetails(searchTitle);
        //}
      }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value },this.toggleMessagePopupModal(true))
      }

    resultShowForLinkAccount=(data)=>{
      
        if(data && data.length>0){
        return data.map((dataSet,index)=>(
                <tr>
                       
                        <td><span>{index+1}</span></td>
                        <td><span>{dataSet.full_name}</span></td>
                        <td>  <button  className="btn btn-danger "  onClick={() => this.toggleMessagePopupfordeleteModal(true,dataSet?.account_id)}>
                        <i class="fa fa-trash danger" aria-hidden="true"></i>
                     </button></td>
               </tr>
         ))
    }
 }




       resultShowForLinkAccountSearch=(data)=>{
        if(data.length>0){
        
      return data.map((dataSet,index)=>(
        
      
                   <tr>
                        <td><span>{index+1}</span></td>
                        <td> <span><input type="checkbox" id="sub_id" onClick={this.onChange} checked={this.state.checked} value={dataSet.account_id}/></span></td>
                        <td><span>{dataSet.full_name}</span></td>
                        <td><span>{dataSet.email}</span></td>
                                              
                    </tr>
         
        ))
    }

        
       }

    
    render() {
        const {errors, fields,searchValue } = this.state;
        const {
            personInfo,
            accountName,
            personInfosearch
         } = this.props;
        
      

        return (
            <React.Fragment>
                  
                <Modal id="myModallinkaccount" className="applicant-info select-account account-profile-page" show={this.props.showModal} centered onHide={() => this.handleModal('hide')}>
                    <Modal.Header>
                        <h1>Select Account To Link</h1>

                        <button type="button" className="close" onClick={() => this.handleModal()}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>

                    <h2 className="searchTitle">
                          <input type="text" value={searchValue} className="form-control search-user" 
                                            onChange={this.handleSearchTitle} placeholder="Search for enquirer records" />
                        </h2> 

                      { !_.isEmpty(personInfosearch) && searchValue.length>=3 ?
                           <React.Fragment>
                        <div className="table-responsive">
                           <table className={`table duplicate-check-list-table dropdown-table`}>
                                   <tbody>
                                               <tr>
                                                    <th>SN</th>
                                                    <th><span> Add Account</span></th>
                                                    <th><span>Person Name</span></th>
                                                    <th><span>Email</span></th>
                                              </tr>
                           {this.resultShowForLinkAccountSearch( personInfosearch) }
                             </tbody>
                           </table>
                        </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                <div className="table-responsive">
               <table className={`table duplicate-check-list-table dropdown-table`}>
                 <tbody>
                    <tr>
                        <th>SN</th>
                        <th><span>Account Name</span></th>
                        <th><span>Menu</span></th>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span>{accountName}</span></td>
                        <td><span></span></td>
                    </tr>
                    
                    {this.resultShowForLinkAccount(personInfo) }
                 </tbody>
             </table>
            </div>
                        </React.Fragment>
                        
                      }
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