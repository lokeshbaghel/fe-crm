import "./index.css";
import React from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import Pagination from "react-js-pagination";

import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import UserPopUp from "../../components/Modals/UserPopUp";
import { fetchUsersData, submitUserFormData, fetchUserEditFormDependantData, resetUserData, csvUsersData } from "../../actions/Users";
import BlockUI from "../../components/BlockUI";
import ExportCsv from "../../components/ExportCsv";
import { accessAllowed } from "../../utils/helper";
import Constants from "../../utils/constants";
import { displayRecordNotFound } from "../../utils/helper";
import SearchBox from '../../components/Search';

class Users extends React.Component {
    state = {
        showModal: false,
        searchTitle: '',
        pageAccessPermission:''
    };

    /*lifecycle method to get data */
    componentDidMount(){
        accessAllowed(Constants['user']);
        this.getData();
    }

    /*lifecycle method to reset data */
    componentWillUnmount(){
        this.props.resetUserData();
    }

    getData = (data) => {
        const params = {
            page : data ? data : 1,
            searchTitle : this.state.searchTitle
        }
        this.props.fetchUsersData(params);
    }

    /**method for show edit popup of user  */
    toggleModal = async(value, id) => {
        if(typeof id != 'undefined')
            await this.props.fetchUserEditFormDependantData(id)

        this.setState({showModal: value})
    }

    /**method for form submit  */
    handleSubmit(id, data) {
        this.props.submitUserFormData(id, data);
        this.setState({showModal : false})
    }

    /**method for display user listing  */
    tableBodyHtml = (users) => {
        let {showModal} = this.state;
        if(!_.isEmpty(users)){
            return(
                <table className="table table-fixed">
                    <thead>
                        <tr>
                            <th scope="col" >User Name</th>
                            <th scope="col" >First Name</th>
                            <th scope="col" >Last Name</th>
                            <th scope="col" >Email</th>
                            {/* <th scope="col" >Phone Number</th> */}
                            <th scope="col" >Role</th>
                            <th scope="col" >Permissions</th>
                            <th scope="col" >Status Type</th>
                            <th scope="col" >Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) => (
                            <tr key={index}>
                                <td>{ user.username } </td>
                                <td>{ user.first_name } </td>
                                <td>{ user.last_name }</td>
                                <td>{ user.email}</td>
                                {/* <td>{ user.phone }</td> */}
                                <td>{ user.role_name}</td>
                                <td>
                                
                                {user?.permission_name?.map((permission,index) => (
                                    <React.Fragment key={index}>  
                                          {permission? permission?.permission?.permission_name :''}
                                          
                                    <br/></React.Fragment>
                              
                                 ))}
                               </td>
                                {/* <td>{ 
                                user.permission_name }</td> */}
                                <td>{ user.StatusType }</td>
                                <td>
                                        {!showModal ?
                                             <a onClick={() => this.toggleModal(true, user.user_id)}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                            : ''
                                        }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        } else{
            return (displayRecordNotFound('Records not found'))
        }
    }

    /**method for calling api based on page change  */
    handlePageChange = (pageNumber) => {
        this.getData(pageNumber)
    }

    /*method called to when search is performed and called parent method*/
    handleSearchInputChange(value) {
        this.setState({ searchTitle : value }, () => {
            this.getData();
        });
    }

    render() {
        const {totalRecords, per_page , blocking, userList, currentPage, roles, permissions, user,
                csvUsers} = this.props.users;
       
        const {showModal, searchTitle} = this.state;

        let CsvData = [];
        if(csvUsers){
            csvUsers.map(user => {
                //const phoneNumber = user.person?.person_phone_number;
                CsvData.push({
                    "Username"      : user.username, 
                    "First name"    : user.first_name, 
                    'Last Name'     : user.last_name, 
                    'Email'         : user.email,
                    "Role"          : user.role_name,
                    "Permission"    : user.permission_name,
                    "Status"        : user.statusType
                });
            })
        }
        
        let total = 0;
        if(typeof totalRecords != 'undefined')
            total = totalRecords;
        
        return (
            <React.Fragment>
                <Banner img={BannerImage} />
                <BlockUI blocking={blocking} />
                <div className="page-content-wrapper users" data-aos="fade-up">
                    <div className="container-fluid">
                        <div className="row account-top">
                            <div className="col-lg-3 col-md-3 d-flex flex-column">
                                <h1 className="dash-title">Users</h1>
                                <ExportCsv data={CsvData} name="Users.csv">
                                  <button className="export-csv">
                                    Export CSV File
                                  </button>
                                </ExportCsv>
                            </div>
                            <div className="col-lg-9 col-md-9 d-flex flex-md-row flex-column justify-content-md-end align-items-md-end align-items-center">
                                <SearchBox searchInputChangeValue={(val) => this.handleSearchInputChange(val)}
                                            searchValue={searchTitle} 
                                            resetButtonClass="btn white filter-btn btn-outline-primary"
                                />
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="curve-box">
                                    <div className="table-responsive">
                                        {this.tableBodyHtml(userList)}

                                        {/* pagination bar */} 
                                            {(total > per_page) ? 
                                                <div className="pagination mb-3" style={{"justifyContent" : "center"}}>
                                                    <Pagination
                                                        activePage={currentPage}
                                                        itemsCountPerPage={Number(per_page)}
                                                        totalItemsCount={total}
                                                        pageRangeDisplayed={5}
                                                        onChange={this.handlePageChange}
                                                        itemClass="page-item"
                                                        linkClass="page-link"
                                                        innerClass="pagination text-center"
                                                    /> 
                                                </div> 
                                            : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal ? 
                    <UserPopUp 
                            user={user}
                            heading="Edit User" 
                            canShow={showModal} 
                            updateModal={(val) => this.toggleModal(val)}
                            submitUserForm={(id, data) => this.handleSubmit(id, data)}
                            roles={roles}
                            permissions={permissions}
                    /> 
                : null}
            </React.Fragment>
        );
    }
}

const mapsStateToProps = state => {
    return { 
        users  : state.users,
        csvData: state.csvData
    };
}

export default connect(
            mapsStateToProps,
            {fetchUsersData, submitUserFormData, fetchUserEditFormDependantData, resetUserData, csvUsersData}
          )(Users);
