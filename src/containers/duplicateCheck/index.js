import React,{ Component } from 'react'
import { connect } from "react-redux";
import _ from 'lodash';
import $, { param } from "jquery";
import { accessAllowed } from "../../utils/helper";
import Constants from "../../utils/constants";
import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";

import "./index.css";

// import BlockUI from "../../components/BlockUI";
import { getDuplicateEnqData, actionForDuplicate } from "../../actions/DuplicateEnquire";
import BlockUI from "../../components/BlockUI";
import doticon from '../../assets_crm/img/dot-icons.png';
import ConfirmRejectDuplicateModal from './ConfirmRejectDuplicateModal';
import DeduplicateCharmConfirm from './DeduplicateCharmConfirm';
class DuplicateCheck extends Component {
    
    state = {
        showModal: false,
        loggedInUser: this.props?.loggedUser?.user?.user_id,
        showRejectModal: false,
        showConfirmModal: false,
        selectedAccountId: '',
        title: '',
        message: '',
        caseName:'',
        actionName:'',
        search: ''
    };

    handleTableToggle=(event,index)=>{
        $(`.hidden-table-${index}`).toggleClass('custom-hide-table');
        $(`.parent-row-${index}`).toggleClass('table-expand');
        //$(".collapse-table").toggleClass("show"); 
        //event.target.classList.add('open')
        if(event.target.classList.contains('open')) {
            event.target.classList.remove('open')
         } else {
            event.target.classList.add('open')
        }
    }

    //handle modal for close open
    handleModal = (action, id, actionName) =>{
        let title = '';
        let message = '';
        let caseName='';
        if(actionName == 'Reject'){
            title = 'Reject Duplicate';
            message = 'Are you sure you want to reject this duplicate account?'
        }
        if(actionName == 'Confirm'){
            caseName='addEnquiry'
            title = 'Confirm Duplicate';
            message = 'Are you sure you want to confirm this duplicate account?'
        }
        this.setState({showRejectModal:action,actionName:actionName,caseName, selectedAccountId:id,title: title, message: message})
    }
    
    handleModalPostToCharm=(action, id,caseName={})=>{
        this.setState({showConfirmModal:action, selectedAccountId:id,caseName})
    }
       //Submit Data to API
    submitData = (actionName={}, account_id, duplicate_id, person_id,caseName={}) => {
        let params = {}
        if(this.state.actionName)
            actionName=this.state.actionName
        else
            actionName=actionName

        if(actionName == 'Reject'){
            params.action       = 'Reject';
            params.user_id      = this.state.loggedInUser;
            params.id           = duplicate_id;
            params.account_id   = account_id;
            params.caseName     = caseName ? caseName:''
            this.props.actionForDuplicate(params)
            this.setState({showRejectModal:false, duplicate_id,actionName:""})
        } 
        if(actionName == 'Confirm'){
            if(!_.isEmpty(caseName))
                caseName=caseName
            else
                caseName=this.state.caseName

            params.action       = 'Confirm';
            params.user_id      = this.state.loggedInUser;
            params.id           = duplicate_id;
            params.account_id   = account_id;
            params.person_id    = person_id;
            params.case_name    = caseName;
            this.props.actionForDuplicate(params)
            this.setState({showConfirmModal:false, duplicate_id,actionName:""})
        }
    }



    notesList = (duplicateList, showRejectModal, selectedAccountId, showConfirmModal, title, message) => {
        if(!_.isEmpty(duplicateList)){
            return(
                duplicateList.map((list,index) => {
                    return(
                        <React.Fragment key={index}>
                            <tr className={`parent-row-${index}`}>
                                <td><span>{ list.duplicateData.First_name }</span></td>
                                <td><span>{ list.duplicateData.Last_name}</span></td>
                                <td><span>{ list.duplicateData.date_of_birth ? list.duplicateData.date_of_birth:'N/A' }</span></td>
                                <td><span>{ list.duplicateData.Phone_number }</span></td>
                                <td><span>{ list.duplicateData.Email  }</span></td>
                                <td><span>{ list.duplicateData.Post_code}</span></td>
                                <td><span>N/A</span></td>
                                <td><span>N/A</span></td>
                                <td><div className="collapse-group">
                                        <div className="collapse-table hide-button" onClick={(event) => this.handleTableToggle(event,index)}>
                                             Enlarge Potential Duplicates
                                        </div>
                                    </div>
                                </td>
                            </tr>
                           
                            {/* <tr className={`hidden-table-${index} custom-hide-table`}> */}
                                {/* <td className="no-border" colSpan={9}> */}
                                    {/* <table className={`table duplicate-check-list-table dropdown-table`}> */}
                                        {/* <tbody>   */}
                                            {this.hiddenTable(index, list.realData, showRejectModal, selectedAccountId, showConfirmModal, title, message)}
                                        {/* </tbody> */}
                                    {/* </table> */}
                                {/* </td> */}
                            {/* </tr> */}
                        </React.Fragment> 
                    )
                })
            )
        }
    }

    hiddenTable = (index2, subObject, showRejectModal, selectedAccountId, showConfirmModal, title, message) => {
        if(!_.isEmpty(subObject)){
            return(
                subObject.map((list,index) => {
                    return(
                        <React.Fragment key={index}>
                            <tr className={`dropdown-table hidden-table-${index2} custom-hide-table`}>
                                <td><span>{ list.first_name?list.first_name:'N/A' }</span></td>
                                <td><span>{ list.last_name?list.last_name:'N/A' }</span></td>
                                <td><span>{ list.date_of_birth?list.date_of_birth:'N/A' }</span></td>
                                <td><span>{ list.number?list.number:'N/A' }</span></td>
                                <td><span>{ list.email?list.email:'N/A' }</span></td>
                                <td><span>{ list.postcode?list.postcode:'N/A' }</span></td>
                                <td><span>{ list.charms_id?list.charms_id:'N/A' }</span></td>
                                <td><span>{ list.stage?list.stage:'N/A' }</span></td>
                                <td>
                                    <div className="custom-toggle-second">
                                        <span className="custom-toggle-btn"><img src={doticon} /></span>
                                        <div className="cutom-toggle-content">
                                            <ul>    
                                            { ( (list.is_post_to_charms===Constants['is_post_to_charms_no'] && list.status_id === Constants['AccountActiveStatus'])) ? (
                                                <li><button className="btn btn-primary" onClick={()=>this.handleModal(true, list.id,'Confirm')}>Confirm Duplicate</button></li>
                                            ) : '' }   
                                             { (list.is_post_to_charms===Constants['is_post_to_charms_yes']  ) ? (
                                                <li><button onClick={()=>this.handleModalPostToCharm(true, list.id,'addEnquiry')} className="btn btn-primary">Confirm Duplicate</button></li>
                                            ) : '' }  
                                                
                                            { ( list.is_post_to_charms===Constants['is_post_to_charms_no'] && list.status_id === Constants['AccountCloseStatus']  ) ? (
                                                <li><button className="btn btn-primary" onClick={(data) => this.submitData('Confirm',list.account_id, list.duplicate_id, list.person_id,'reopenAccount')}>Confirm Duplicate - Reopen Account</button></li>
                                                
                                                ) : '' }  
                                            { ( list.is_post_to_charms===Constants['is_post_to_charms_no'] && list.status_id === Constants['AccountCloseStatus']  ) ? (
                                                <li><button className="btn btn-primary"  onClick={(data) => this.submitData('Confirm',list.account_id, list.duplicate_id, list.person_id,'createAccountAndLinkPerson')}>Confirm Duplicate - Create New Account</button></li>
                                                
                                                ) : '' } 
                                                <li><button className="btn btn-primary" onClick={()=>this.handleModal(true, list.id, 'Reject')}>Reject Duplicate</button></li>   
                                            </ul>
                                            {showRejectModal && (selectedAccountId == list.id) ? 
                                                <ConfirmRejectDuplicateModal canShow={showRejectModal} cancelModal={(data)=>this.handleModal(false, list.id)} submitData={(data) => this.submitData('Reject', list.account_id, list.duplicate_id, list.person_id)} title={title} bodyMessage={message}/>
                                            :''}
                                            { showConfirmModal && (selectedAccountId == list.id)  ? 
                                                <DeduplicateCharmConfirm showModal={showConfirmModal} cancelModal={(data)=>this.handleModalPostToCharm(false,list.id)} submitData={(data) => this.submitData('Confirm',list.account_id, list.duplicate_id, list.person_id)}  title="This Account is Managed in Charms are you happy to continue?" />
                                            :''}
           
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    )
                })   
            )
        }         

    }

    componentDidMount(){
        //Check permission for duplicate enquiries for a logged in user
        accessAllowed(Constants['duplicate-check']);
        if(this.state.loggedInUser){
            let fields = {
                search: ''
            }
            this.props.getDuplicateEnqData(fields);
        }
    }

    handleChange = (event) => {
        this.setState({search: event.target.value})
      }

    //Search Records
    _handleKeyDown = (event) => {
        let code = event.keyCode;
        if(code === 13){
            if(event.target.value.trim() == '') {
                this.resetProgressItems()
              }

            let fields = {
                search: this.state.search
            }
            this.props.getDuplicateEnqData(fields);
        }
    }

    /**
   * Reset Search functionality when user press enter key for blank input of search
   */
  resetProgressItems = (event) => {
    if(this.state.search){
      this.setState({search: ''})

      let fields = {
        search: ''
      }
      
      this.props.getDuplicateEnqData(fields);
    }
  }

    render() {
        const { duplicateEnquire, blocking } = this.props.getDuplicateData;
        const {showRejectModal, selectedAccountId, showConfirmModal, title, message, search} = this.state;
        return (
            <React.Fragment>
               <Banner img={BannerImage} />
                <BlockUI blocking={blocking}></BlockUI>
                <div className="page-content-wrapper duplicate-check" data-aos="fade-up">
                    <div className="container-fluid">
                    <h1 className="dash-title">Duplicate Checks</h1>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="inner-curve">
                                    {/* <h1 className="inner-title">Duplicate Enquiries</h1> */}
                                    <div className="search-div-second">
                                        <input 
                                            type="text" 
                                            class="form-control search-user2" 
                                            placeholder="Search" 
                                            value={search} 
                                            onChange={this.handleChange}
                                            onKeyDown={this._handleKeyDown} />
                                        <button type="submit" className="search-btn">search</button></div>
                                    <div className="table-responsive">
                                        <table className="table duplicate-check-list-table">
                                            <thead>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Surname</th>
                                                    <th>DOB</th>
                                                    <th>Mobile</th>
                                                    <th>Email Address</th>
                                                    <th>Postcode</th>
                                                    <th>Charms ID</th>
                                                    <th>Stage</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.notesList(duplicateEnquire, showRejectModal, selectedAccountId, showConfirmModal, title, message)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapsStateToProps = (state) => {
    
    return {
        loggedUser  : state.authenticatedUser,
        getDuplicateData : state.duplicateEnquire
    }
  }
  
  export default connect(mapsStateToProps, { getDuplicateEnqData, actionForDuplicate })(DuplicateCheck);