import React from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import _ from 'lodash'

import "./index.css";
import baseURL from '../../axios/baseURL'
import {displaySuccessMessage, displayErrorMessage, requestTokenHeader,decryptObject } from '../../utils/helper';
import api from '../../axios'

class CommonAgGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLimit   : this.props.paginationPageSize ? this.props.paginationPageSize : 20,
            columnDefs  : this.getColumnDef(),
        }
    }    

    getColumnDef = () => {
        const getFilterValuesAsync = async (params) => {
            const field = params.colDef.field;
            
            let { passPathName, tabName } = this.props.paramsAgGridRecords
            if(field){
                let url = `${baseURL}${passPathName}/column-values/${field}`
    
                let url_name = passPathName.split("/")
                if(url_name[0]=='report')
                    url += `?tabName=${tabName}`
    
                try {
                    const response = await api.get(url, { headers : requestTokenHeader() });
                    
                    if (response.data.success) {
                        setTimeout(function () {
                            params.success(decryptObject(response.data.data));
                        }, 250);
                    } 
                    
                } catch (error) {
                    //console.log(error)
                    displayErrorMessage(error)
                    params.failCallback();
                }
            }
        }
    
        /**
         * Make sure the "field" matches the name of the DB column 
         * so that it can easily be used for filtering and sorting etc
         */
        let columnDefs = this.props.filterLabelsRecords
    
        columnDefs.forEach((e, i) => {
            columnDefs[i].filter = "agSetColumnFilter";
            columnDefs[i].filterParams = { values: getFilterValuesAsync };
        })
    
        return columnDefs;
    }

    onGridReady = async(params) => {
        this.setState({ gridApi: params.api , gridColumnApi: params.columnApi })
        const listId = this.props.listId;
        let datasource = await this.createServerSideDatasource(this.state, this.props.paramsAgGridRecords, listId)
        params.api.setServerSideDatasource(datasource)
        params.api.closeToolPanel()
        let columnToolPanel = params.api.getToolPanelInstance('columns');
        columnToolPanel.setPivotModeSectionVisible(false);
        this.setState({ currentPage: this.state.currentPage + 1, resetRefreshPage: false })
    }
    
    createServerSideDatasource = (state, paramsAgGridRecords, listId) => {
        return {
            getRows: async function (params) {
                const { pageLimit, gridApi } = state
                const { filterModel, sortModel, rowGroupCols, groupKeys } = params.request

                let sorting = null
                if(sortModel.length){
                const { colId, sort } = sortModel[0]
                    sorting = {
                        sortBy: colId,
                        orderBy: sort
                    }
                }
                
                const currentPage = gridApi.paginationGetCurrentPage() + 1;
                let { passPathName } = paramsAgGridRecords
                let url_name = passPathName.split("/")
                
                let queryParams = { currentPage, pageLimit, groupKeys, rowGroupCols, sorting, filterModel }
                if(url_name[0]=='report'){
                       const {agencyId, campaignId, endDate, tabName, region, sourceId, startDate, enquiryType,localAuthority } = paramsAgGridRecords
                       queryParams.campaignId = campaignId
                       queryParams.agencyId = agencyId
                       queryParams.startDate = startDate 
                       queryParams.endDate = endDate
                       queryParams.sourceId = sourceId
                       queryParams.region = region
                       queryParams.enquiryType = enquiryType
                       queryParams.tabName = tabName
                       queryParams.localAuthority= localAuthority
                }
                
                /**case specially for engagement hub list edit functionality */
                if(typeof listId != 'undefined' && listId)
                    queryParams.listId = parseInt(listId);

                let url = `${baseURL}${passPathName}`

                try {
                    const response = await api.post(url, queryParams, { headers : requestTokenHeader() });
                    if (response.data.success) {
                        let tableRecordsArray={};
                        let totalCount = 0;
                        const dataDecrypt = decryptObject(response.data.data)
                        if(dataDecrypt.applicantList){
                            const { data, total } = dataDecrypt.applicantList;
                            tableRecordsArray = data
                            totalCount = total
                        } else if(dataDecrypt.enquirerRecords){
                            const { data, total } = dataDecrypt.enquirerRecords
                            tableRecordsArray = data
                            totalCount = total
                            if (document.querySelector('.selectAll') !== null)
                                document.querySelector('.selectAll').checked = false;
                        }
        
                        params.successCallback(tableRecordsArray, totalCount)
                    } 
                    
                } catch (error) {
                    //console.log(error)
                    displayErrorMessage(error)
                    params.failCallback();
                }
            }
        }
    }

    /**method to get the selected rows of table */
    getSelectedRowData = () => {
        let selectedNodes = this.state.gridApi.getSelectedNodes();
        let selectedData = []
        selectedNodes.map(node => {
            if((node.data.person_id))
                selectedData.push(node.data.person_id)
        })

        if(_.size(selectedData) > 0){
            this.props.selectedRows(selectedData);
            displaySuccessMessage('Data Recorded Successfully');
        } else {
            displayErrorMessage('Rows not recorded. Please try again')
        }
    }

    render() {
        const { columnDefs, pageLimit }=this.state;
        
        return (
            <div className="table-responsive">
                {this.props.showCheckbox ? 
                    <button className="btn btn-sm btn-info mb-2" onClick={this.getSelectedRowData}>Add Selected Enquirers</button>
                : ''}

                <div className="ag-theme-balham" style={{ height: 630 }}>
                    <AgGridReact 
                        defaultColDef={{
                            flex: 1,
                            minWidth: 90,
                            resizable: true,
                            enableValue: true,
                            enableRowGroup: true,
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
                        paginationPageSize={pageLimit}
                        cacheBlockSize={pageLimit}
                        animateRows={true}
                        columnDefs={columnDefs}
                        onGridReady={this.onGridReady}
                        rowSelection= {'multiple'}
                    />
                </div>
            </div>
        )
    }
  
}


export default CommonAgGrid;
