import React from "react";
import { connect } from "react-redux";
import { AgGridReact } from 'ag-grid-react'
import _ from 'lodash'
// import {Redirect, Route, withRouter} from 'react-router-dom';

import "./index.css";
import BlockUI from "../../components/BlockUI";
import Banner from "../../components/Banner";
// import Dropdown from "../../components/Dropdown";
// import ToastPopUp from "../../components/Toast";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
// import Pagination from "../../components/Pagination";
import AgGridModal from '../../components/Modals/AddAgGridTable'
import SavedTableModal from '../../components/Modals/SavedTableListModal'
import { getAccountUserLists, storeColumnList, getColumnList, getColumnDropdownList, deleteColumnListRecord } from "../../actions/Accounts";
import baseURL from '../../axios/baseURL'
import { requestTokenHeader, history, images} from '../../utils/helper';
import moment from "moment";
import { accessAllowed } from "../../utils/helper";
import Constants from "../../utils/constants";


class Accounts extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      columnDefs: this.getColumnDef(),
      rowData: [],
      gridApi: null,
      gridColumnApi: null,
      isDynamicListValue: false,
      showModal: false,
      isColumnDropdownList: false,
      columnDropdownList: null,
      columnRowData: null,
      isAccountUserRecordsFetched: false,
      accountsUserListArray: null,
      currentPage: 1,
      pageLimit: 20,
      resetRefreshPage: false,
      getUpdateColumnDropdownList: false,
      showSavedTableModal: false,
      isDeleteColumnListRecord: false,
      filterModel: null, 
      sortModel: null, 
      rowGroupCols: null, 
      groupKeys: null
    }
    
    
  }

  componentDidMount(){
    //this.props.getAccountUserLists()
    accessAllowed(Constants['enquiries']);
    const loggedUser = this.props.loggedUser.user;  //fetched from redux store
    this.props.callGetColumnDropdownList({
      userId: loggedUser.user_id,
      page: 'accounts'
    })
    this.setState({ isColumnDropdownList: true, isAccountUserRecordsFetched: true })

    
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    //update state columnDefs by each user record
    if(prevState.isDynamicListValue === true){
      if (prevState.isDynamicListValue === this.props?.getAccounts?.isDynamicListValue) {
        const { getColumnList } = this.props.getAccounts
        
        if(getColumnList.length > 0){
          this.setState({ columnDefs: [] })
          
          const dataArray = JSON.parse(getColumnList[0].data_array)
          
          const columnRowData = JSON.parse(getColumnList[0].row_data)

          let columnDefs = [

            { headerName: 'App1 First name', field: 'app1_first_name', sortable: true, filter: "agTextColumnFilter", hide: dataArray[0].hide },
            { headerName: 'App1 Surname', field: 'app1_last_name',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[1].hide },
            { headerName: 'App2 First name', field: 'app2_first_name', sortable: true, filter: "agTextColumnFilter", hide: dataArray[2].hide },
            { headerName: 'App2 Surname', field: 'app2_last_name',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[3].hide },
            { headerName: 'Telephone 1', field: 'ApplicantTelephone1',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[4].hide },
            { headerName: 'Mobile number', field: 'App1Mobile',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[5].hide },
            { headerName: 'Email', field: 'Email',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[6].hide },
            { headerName: 'Age', field: 'age',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[7].hide },
            { headerName: 'Address line 1', field: 'ApplicantAddress1',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[8].hide },
            { headerName: 'Address line 2', field: 'ApplicantAddress2',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[9].hide },
            { headerName: 'Postcode', field: 'ApplicantPostcode',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[10].hide },
            { headerName: 'Agency', field: 'Agency',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[11].hide },
            { headerName: 'Source', field: 'source',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[12].hide },
            { headerName: 'Date enquired', field: 'date_notified',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[13].hide },
            { headerName: 'Number of channels applied through', field: 'number_of_channels',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[14].hide },
            { headerName: 'Number of enquiries made', field: 'number_of_enquiries',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[15].hide },
            { headerName: 'Spare room', field: 'spare_room',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[16].hide },
            { headerName: 'Gender', field: 'gender_type',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[17].hide },
            { headerName: 'Ethnic Origin', field: 'ethnic_origin',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[18].hide },
            { headerName: 'Religion', field: 'religion',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[19].hide },
            { headerName: '1st language', field: 'Language1',  sortable: true, filter: "agTextColumnFilter" , hide: dataArray[20].hide },
            { headerName: '2nd language', field: 'Language2',  sortable: true, filter: "agTextColumnFilter" , hide: dataArray[21].hide },
            { headerName: 'Sexual orientation', field: 'sexual_orientation',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[22].hide },
            { headerName: 'Marketing consent', field: 'marketing_consent',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[23].hide },
            { headerName: 'Call or information', field: 'call_or_info_pack',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[24].hide },
            { headerName: 'Stage', field: 'account_stage',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[25].hide },
            { headerName: 'Closed reason', field: 'close_reason',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[26].hide },
            { headerName: 'On hold reason', field: 'hold_reason',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[27].hide },
            { headerName: 'Call 1', field: 'call1',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[28].hide },
            { headerName: 'Call 1 date and time', field: 'call1_start',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[29].hide },
            { headerName: 'Call 1 outcome', field: 'call1_outcome',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[30].hide },
            { headerName: 'Call 1 reason code', field: 'call1_unsuccess_reason',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[31].hide },
            { headerName: 'Call 2', field: 'call2',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[32].hide },
            { headerName: 'Call 2 time', field: 'call2_start',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[33].hide },
            { headerName: 'Call 2 outcome', field: 'call2_outcome',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[34].hide },
            { headerName: 'Call 2 reason code', field: 'call2_unsuccess_reason',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[35].hide },
            { headerName: 'Call 3', field: 'call3',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[36].hide },
            { headerName: 'Call 3 time', field: 'call3_start',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[37].hide },
            { headerName: 'Call 3 outcome', field: 'call3_outcome',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[38].hide },
            { headerName: 'Call 3 reason code', field: 'call3_unsuccess_reason',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[39].hide },
            { headerName: 'id', field: 'CRM_ID', width: 100, hide: dataArray[40].hide },
            { headerName: 'Last contacted', field: 'last_contact',  sortable: true, filter: "agTextColumnFilter", hide: dataArray[41].hide },
            { headerName: 'Menu', field: 'linkedEnquiries', hide: false, 
              cellRendererFramework: (params) => 
                <>
                  <button className="custom-aggrid-accound-btn" onClick={ () => this.redirectToAccountPage(params.data)}> Open </button>
                </>
            ,
              minWidth: 150
            },
          ]

          columnDefs.forEach((e, i) => {
            columnDefs[i].filter = "agSetColumnFilter";
            columnDefs[i].filterParams = { values: this.getFilterValuesAsync };
          });
          this.setState({ columnDefs: columnDefs,
             columnRowData
          })
          // gridApi.setRowData(columnRowData)
          
        }
        this.setState({ isDynamicListValue: false })
        
      }
    }
    
    //Get column dropdown list
    if(prevState.isColumnDropdownList === true){
      if (prevState.isColumnDropdownList === this.props?.getAccounts?.isColumnDropdownList) {
        const { getColumnDropdownList } = this.props.getAccounts
        
        if(getColumnDropdownList.length > 0){
          this.setState({ columnDropdownList: getColumnDropdownList })
        }
        this.setState({ isColumnDropdownList: false })
        
      }
    }

    //Get updated column dropdown after adding list
    if(prevState.getUpdateColumnDropdownList === true){
      if (prevState.getUpdateColumnDropdownList === this.props?.getAccounts?.getUpdateColumnDropdownList) {
        const { getDataWithNewColumnList } = this.props.getAccounts
        
        if(getDataWithNewColumnList.length > 0){
          this.setState({ columnDropdownList: getDataWithNewColumnList })
        }
        this.setState({ getUpdateColumnDropdownList: false })
        
      }
    }

    //Get account user list
    if(prevState.isAccountUserRecordsFetched === true){
      if (prevState.isAccountUserRecordsFetched === this.props?.getAccounts?.isAccountUserRecordsFetched) {
        const { accountsUserList } = this.props.getAccounts
        
        if(accountsUserList.length > 0){
          this.setState({ accountsUserListArray: accountsUserList })
        }
        this.setState({ isAccountUserRecordsFetched: false })
        
      }
    }

    //After Delete column list records
    if(prevState.isDeleteColumnListRecord === true){
      if (prevState.isDeleteColumnListRecord === this.props?.getAccounts?.isDeleteColumnListRecord) {
        const { getUpdatedColumnDropdownList } = this.props.getAccounts
        this.setState({ isDeleteColumnListRecord: false, columnDropdownList: getUpdatedColumnDropdownList })
        
      }
    }
  }

  getFilterValuesAsync = (params) => {
    const field = params.colDef.field;
    
    const url = `${baseURL}reports/column-values/${field}`
    fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': requestTokenHeader() }
    })
    .then(httpResponse => httpResponse.json())
    .then(response => {
      const { data } = response.data;

      setTimeout(function () {
        params.success(data);
      }, 250);
    });

   
  };

  getColumnDef = () => {

    /**
     * Make sure the "field" matches the name of the DB column 
     * so that it can easily be used for filtering and sorting etc
     */
    let columnDefs = [
        { headerName: 'App1 First name', field: 'app1_first_name', sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'App1 Surname', field: 'app1_last_name',  sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'App2 First name', field: 'app2_first_name', sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'App2 Surname', field: 'app2_last_name',  sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'Telephone 1', field: 'ApplicantTelephone1',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Mobile number', field: 'App1Mobile',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Email', field: 'Email',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Age', field: 'age',  sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'Address line 1', field: 'ApplicantAddress1',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Address line 2', field: 'ApplicantAddress2',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Postcode', field: 'ApplicantPostcode',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Agency', field: 'Agency',  sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'Source', field: 'source',  sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'Date enquired', field: 'date_notified',  sortable: true, filter: true },
        { headerName: 'Number of channels applied through', field: 'number_of_channels',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Number of enquiries made', field: 'number_of_enquiries',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Spare room', field: 'spare_room',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Gender', field: 'gender_type',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Ethnic Origin', field: 'ethnic_origin',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Religion', field: 'religion',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: '1st language', field: 'Language1',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: '2nd language', field: 'Language2',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Sexual orientation', field: 'sexual_orientation',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Marketing consent', field: 'marketing_consent',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call or information', field: 'call_or_info_pack',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Stage', field: 'account_stage',  sortable: true, filter: "agTextColumnFilter" },
        { headerName: 'Account status', field: 'account_status',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Closed reason', field: 'close_reason',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'On hold reason', field: 'hold_reason',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 1', field: 'call1',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 1 date and time', field: 'call1_start',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 1 outcome', field: 'call1Outcome',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 1 reason code', field: 'call1_unsuccess_reason',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 2', field: 'call2',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 2 time', field: 'call2_start',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 2 outcome', field: 'call2_outcome',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 2 reason code', field: 'call2_unsuccess_reason',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 3', field: 'call3',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 3 time', field: 'call3_start',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 3 outcome', field: 'call3_outcome',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'Call 3 reason code', field: 'call3_unsuccess_reason',  sortable: true, filter: "agTextColumnFilter", hide: true },
        { headerName: 'id', field: 'CRM_ID', width: 100, hide: "true" },
        { headerName: 'Last contacted', width: 150, field: 'last_contact', sortable: true, filter: "agTextColumnFilter", hide: true },
      { headerName: 'Menu', field: 'linkedEnquiries', hide: false, 
        cellRendererFramework: (params) => 
          <>
            <button className="custom-aggrid-accound-btn" onClick={ () => this.redirectToAccountPage(params.data)}> Open </button>
          </>
      ,
        minWidth: 150
      },
    ];

    columnDefs.forEach((e, i) => {
      columnDefs[i].filter = "agSetColumnFilter";
      columnDefs[i].filterParams = { values: this.getFilterValuesAsync };
    });

    return columnDefs;
  }

  redirectToAccountPage = (data) => {
    //window.location.href = `${window.location.origin}/account-details/${data.id}`
    history.push(`/account-details/${data.CRM_ID}`)
  }

  getPerPageValue = (value) => {
    console.log("Per Page: ", value);
  };

  onGridReady = async(params) => {
    this.setState({ gridApi: params.api , gridColumnApi: params.columnApi })
    let datasource = await this.createServerSideDatasource(this.state)
    params.api.setServerSideDatasource(datasource)
    params.api.closeToolPanel()
    let columnToolPanel = params.api.getToolPanelInstance('columns');
    columnToolPanel.setPivotModeSectionVisible(false);
    //Fetching params request value to use on export data 
    // const { filterModel, sortModel, rowGroupCols, groupKeys } = params.request
    this.setState({ currentPage: this.state.currentPage + 1, resetRefreshPage: false,  })
  }

  // updateStateOfAgGridRequest = request => {
  //   console.log('request', request)
  //   const { filterModel, sortModel, rowGroupCols, groupKeys } = request
  //   this.setState({ filterModel, sortModel, rowGroupCols, groupKeys })
  // }
  
  createServerSideDatasource =  (state) => {
    //Storing these state for Use of downloading csv file 
    const updateStateOfAgGridRequest = request => {
      const { filterModel, sortModel, rowGroupCols, groupKeys } = request
      this.setState({ filterModel, sortModel, rowGroupCols, groupKeys })
    }

    return {
      getRows: async function (params) {
        const { pageLimit, gridApi } = state
        //Filtering and sortiing the data
        await updateStateOfAgGridRequest(params.request)
        const { filterModel, sortModel, rowGroupCols, groupKeys } = params.request

        let sorting = null
        if(sortModel.length){
          const { colId, sort } = sortModel[0]
          sorting = {
            sortBy: colId,
            orderBy: sort
          }
        }
                
        const currentPage = gridApi.paginationGetCurrentPage() + 1
        const url = `${baseURL}reports`
        fetch(url, {
            method: 'post',
            body: JSON.stringify({currentPage, pageLimit, filterModel, sorting, rowGroupCols, groupKeys}),
            headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': requestTokenHeader() }
        })
        .then(httpResponse => httpResponse.json())
        .then(response => {
            let data = null
            let total = null
            if(state.columnDropdownList !== null){
              data = state.columnDropdownList
              total = state.columnDropdownList.length
            }
            else{
              let { data : rowData, total: totalData } = response.data;
              total = totalData
              data = rowData
            }
            let applicantsArray = data.map(function(person, index) {
              return {
                app1_first_name: person.app1_first_name,
                app1_last_name: person.app1_last_name,
                app2_first_name: person.app2_first_name,
                app2_last_name: person.app2_last_name,
                ApplicantTelephone1: person.ApplicantTelephone1,
                App1Mobile: person.App1Mobile,
                Email: person.Email,
                age: person.DOB ? moment().diff(moment(person.DOB, 'YYYY-MM-DD'), 'years') : "",
                DOB: person.DOB ? moment(person.DOB).format('YYYY-MM-DD') : "",
                ApplicantAddress1:  person.ApplicantAddress1 ,
                ApplicantAddress2: person.ApplicantAddress2,
                ApplicantPostcode: person.ApplicantPostcode,
                Agency: person.Agency,
                date_notified:  person.date_notified ? moment(person.date_notified).format("DD/MM/YYYY HH:mm:ss") : '',
                number_of_channels: person.number_of_channels,
                source: person.source,
                number_of_enquiries: person.number_of_enquiries,
                spare_room: person.spare_room,
                gender_type: person.gender_type,
                ethnic_origin: person.ethnic_origin,
                religion: person.religion,
                Language1: person.Language1,
                Language2: person.Language2,
                sexual_orientation: person.sexual_orientation,
                marketing_consent: person.marketing_consent,
                call_or_info_pack: person.call_or_info_pack,
                account_stage: person.account_stage,
                account_status: person.account_status,
                close_reason: person.close_reason,
                hold_reason: person.hold_reason,
                call1: 'Call 1',
                call1_start: person.call1_start ? moment(person.call1_start).format("DD/MM/YYYY HH:mm:ss") : "",
                call1_outcome: person.call1_outcome,
                call1_unsuccess_reason: person.call1_unsuccess_reason,
                call2: 'Call 2',
                call2_start: person.call2_start ? moment(person.call2_start).format("DD/MM/YYYY HH:mm:ss") : "",
                call2_outcome: person.call2_outcome,
                call2_unsuccess_reason: person.call2_unsuccess_reason,
                call3: 'Call 3',
                call3_start: person.call2_start ? moment(person.call2_start).format("DD/MM/YYYY HH:mm:ss") : "",
                call3_outcome: person.call3_outcome,
                call3_unsuccess_reason: person.call3_unsuccess_reason,
                CRM_ID: person.CRM_ID,
                last_contact: person.last_contact ? moment(person.last_contact).format("DD/MM/YYYY HH:mm:ss") : ""
              }
            });

            params.successCallback(applicantsArray, total)
        })
        .catch(error => {
            console.error(error);
            params.failCallback();
        })
      },
    };
  }

  saveTable =  (data) =>{
    const columnState = this.state.gridColumnApi.getColumnState()
    let rowNodeDataArray = []
    this.state.gridApi.forEachNode((rowNode, index) => {
      rowNodeDataArray.push(rowNode.data)
    });
    const loggedUser = this.props.loggedUser.user;  //fetched from redux store
    const postData = {
      userId: loggedUser.user_id,
      columnList: columnState,
      rowData: rowNodeDataArray,
      tableName: data.table_name,
      page: 'accounts'
    }
    this.props.callStoreColumnList(postData)
    this.setState({ getUpdateColumnDropdownList: true, showModal: false})
  }

  resetSaveDataFunction = () => {
    window.location.reload()
  }

  showSavedTableList = () => {
    this.savedToggleModal( true)
  }

  onBtExport = () => {
    this.state.gridApi.exportDataAsExcel();
  };

  toggleModal = async(value) => {
    this.setState({showModal: value})
  }

  savedToggleModal = async( value) => {
    this.setState({showSavedTableModal: value})
  }

  onColumnDropdownchange = event =>{
    const dropdownValue = event.target.value
    this.props.callGetColumnList({columnId: dropdownValue})
    this.setState({ isDynamicListValue: true })
  }

  //delete saved table record -- columnDropdownlist data --
  callDeleteColumnListRecordFunc = (postData) => {
    const loggedUser = this.props.loggedUser.user;  //fetched from redux store
    const postObject = {
      userId: loggedUser.user_id,
      page: 'accounts',
      columnListId: postData
    }
    this.props.callDeleteColumnListRecord(postObject)
    this.setState({ isDeleteColumnListRecord: true })
  }

  //Download csv file code down below
  exportCsvFile = () => {
    const { filterModel, sortModel,  rowGroupCols, groupKeys, pageLimit, currentPage } = this.state
    let sorting = null
    if(sortModel.length){
      const { colId, sort } = sortModel[0]
      sorting = {
        sortBy: colId,
        orderBy: sort
      }
    }
    const url = `${baseURL}reports`
        fetch(url, {
            method: 'post',
            body: JSON.stringify({currentPage, pageLimit, filterModel, sorting, rowGroupCols, groupKeys, isExport: true}),
            headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': requestTokenHeader() }
        })
        .then(httpResponse => httpResponse.json())
        .then(async response => {
            let { data  } = response;
            let applicantsArray = data.map(function(person, index) {
              return {
                App1FirstName: person.app1_first_name,
                App1LastName: person.app1_last_name,
                App1FirstName: person.app2_first_name,
                App2LastName: person.app2_last_name,
                ApplicantTelephone1: person.ApplicantTelephone1,
                App1Mobile: person.App1Mobile,
                Email: person.Email,
                Age: person.DOB ? moment().diff(moment(person.DOB, 'YYYY-MM-DD'), 'years') : "",
                DOB: person.DOB ? moment(person.DOB).format('YYYY-MM-DD') : "",
                ApplicantAddress1:  person.ApplicantAddress1 ,
                ApplicantAddress2: person.ApplicantAddress2,
                ApplicantPostcode: person.ApplicantPostcode,
                Agency: person.Agency,
                DateNotified:  person.date_notified ? moment(person.date_notified).format("DD/MM/YYYY HH:mm:ss") : '',
                NumberOfChannels: person.number_of_channels,
                Source: person.source,
                NumberOfEnquiries: person.number_of_enquiries,
                SpareRoom: person.spare_room,
                Gender: person.gender_type,
                EthinicOrigin: person.ethnic_origin,
                Religion: person.religion,
                Language1: person.Language1,
                Language2: person.Language2,
                SexualOrientation: person.sexual_orientation,
                MarketingConsent: person.marketing_consent,
                CallOrInfoPack: person.call_or_info_pack,
                AccountStage: person.account_stage,
                AccountStatus: person.account_status,
                CloseReason: person.close_reason,
                HoldReason: person.hold_reason,
                Call1: 'Call 1',
                Call1_start: person.call1_start ? moment(person.call1_start).format("DD/MM/YYYY HH:mm:ss") : "",
                Call1_outcome: person.call1_outcome,
                Call1_unsuccess_reason: person.call1_unsuccess_reason,
                call2: 'Call 2',
                Call2_start: person.call2_start ? moment(person.call2_start).format("DD/MM/YYYY HH:mm:ss") : "",
                Call2_outcome: person.call2_outcome,
                Call2_unsuccess_reason: person.call2_unsuccess_reason,
                Call3: 'Call 3',
                Call3_start: person.call2_start ? moment(person.call2_start).format("DD/MM/YYYY HH:mm:ss") : "",
                Call3_outcome: person.call3_outcome,
                Call3_unsuccess_reason: person.call3_unsuccess_reason,
                LastContacted: person.last_contact ? moment(person.last_contact).format("DD/MM/YYYY HH:mm:ss") : ""
              }
            });
            const csvData = await this.objectToCsv(applicantsArray)
            await this.downloadCsv(csvData)
        })
        .catch(error => {
        })
  }

  //converting object to csv row
  objectToCsv = data => {
    const csvRows = []

    //get the headers
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(','))

    //loop over the rows
    for(const row of data){
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"')
        return `"${ escaped }"`
      })
      csvRows.push(values.join(','))
    }
    return csvRows.join('\n')
  }

  // Download csv file of reports data
  downloadCsv = data => {
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const createElementObject = document.createElement('a')
    createElementObject.setAttribute('hidden', '')
    createElementObject.setAttribute('href', url)
    createElementObject.setAttribute('download', 'ReportsData.csv')
    document.body.appendChild(createElementObject)
    createElementObject.click()
    document.body.removeChild(createElementObject)
  }

  //Download csv file code end here


  render() {
    let { blocking } = this.props.getAccounts
    return (
      <>
        <Banner img={BannerImage} />
        <BlockUI blocking={blocking} />
        <div className="page-content-wrapper accounts" data-aos="fade-up">
          <div className="container-fluid">
          <h1 className="dash-title">Accounts</h1>
            <div className="row account-top d-flex justify-content-between align-items-start">
              <div className="col-lg-6 col-md-6 d-flex">
                {/* Save Table */}
                  <button className="btn btn-primary add-table-btn" onClick={() => this.toggleModal( true)}> Save <span className="icon-img"><img src={images["Icon-save.svg"]} /></span></button>
                            {this.state.showModal ? 
                                <AgGridModal heading={'Add New Table'} canShow={this.state.showModal} updateModal={this.toggleModal} 
                                    submitData={(data) => this.saveTable(data)}
                                /> 
                            : null}
                  {/* Refresh Table */}
                  <button className="btn btn-primary add-table-btn" onClick={ this.resetSaveDataFunction }> Refresh <span className="icon-img"><img src={images["Icon-refresh.svg"]} /></span></button>
                  {/* Delete Table */}
                  <button className="btn btn-primary add-table-btn" onClick={ () => this.savedToggleModal(true)  }> Delete <span className="icon-img"><img src={images["Icon-delete-sweep.svg"]} /></span></button>
                    {this.state.showSavedTableModal ? 
                      <SavedTableModal showModal={this.state.showSavedTableModal} updateSavedTableModal={this.savedToggleModal} 
                      tableList = {this.state.columnDropdownList}
                      deleteSubmitData={(data) => this.callDeleteColumnListRecordFunc(data)}
                       /> : null}
                  {/* Export CSV */}
                  <button className="btn btn-primary add-table-btn" onClick={ this.exportCsvFile  }> Export <span className="icon-img"><img src={images["Icon-transfer-download.svg"]} /></span></button>
              </div>
              <div className="col-lg-6 col-md-6 d-flex justify-content-md-end">
                <div className="content-wrap">
                    <div className="input-wrap-second">
                      <div className="group-wrap last">
                        <div className="form-group select-down">
                          {/* <label>Column List</label> */}
                          <select id="columnList" onChange={this.onColumnDropdownchange}>
                            <option key='x' value="">Select a view</option>
                            {(() => {
                                if (!_.isEmpty(this.state.columnDropdownList)) {
                                  const columnList = this.state.columnDropdownList
                                  return( 
                                    columnList.map((data, index) => (
                                          <option key={index} value={data.id}>{data.tableName}</option>
                                    ))
                                  )
                                }
                            })()}
                          </select>
                        </div>
                        
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="curve-box">
                  <div className="ag-theme-balham" style={{ height: 600 }}  >
                    <AgGridReact 

                      defaultColDef={{
                        flex: 1,
                        minWidth: 90,
                        resizable: true,
                        enableValue: true,
                        // allow every column to be grouped
                        enableRowGroup: true,
                        // allow every column to be pivoted
                        enablePivot: true,
                        sortable: true,
                        filter: true,
                      }}
                      sideBar={{
                        toolPanels: [
                          {
                            id: 'columns',
                            labelDefault: 'Columns',
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                            minWidth: 225,
                            width: 225,
                            maxWidth: 225,
                          },
                          {
                            id: 'filters',
                            labelDefault: 'Filters',
                            labelKey: 'filters',
                            iconKey: 'filter',
                            toolPanel: 'agFiltersToolPanel',
                            minWidth: 180,
                            maxWidth: 400,
                            width: 250,
                          },
                        ],
                        defaultToolPanel: 'filters'
                      }}
                      rowModelType={'serverSide'}
                      serverSideStoreType={'partial'}
                      pagination={true}
                      paginationPageSize={this.state.pageLimit}
                      cacheBlockSize={this.state.pageLimit}
                      animateRows={true}
                      columnDefs = { this.state.columnDefs}
                      onGridReady={this.onGridReady}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
      loggedUser  : state.authenticatedUser,
      getAccounts : state.accounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountUserLists: () => {
      dispatch(getAccountUserLists())
    },
    callStoreColumnList: (data) => {
      dispatch(storeColumnList(data))
    },
    callGetColumnList: (data) => {
      dispatch(getColumnList(data))
    },
    callGetColumnDropdownList: (data) => {
      dispatch(getColumnDropdownList(data))
    },
    callDeleteColumnListRecord: (data) => {
      dispatch(deleteColumnListRecord(data))
    }
    
  }
}

export default connect(mapsStateToProps, mapDispatchToProps)(Accounts);
