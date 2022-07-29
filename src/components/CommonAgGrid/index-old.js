import React from "react";
import _ from "lodash";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "./index.css";
import {displaySuccessMessage, displayErrorMessage, requestTokenHeader,decryptObject } from '../../utils/helper';
import baseURL from '../../axios/baseURL'
import CustomCheckbox from "./CustomCheckbox";

class CommonAgGrid extends React.Component {
    state = {
        columnDefs      : [],
        // rowData         : [],
        // gridApi         : null,
        // gridColumnApi   : null,
        selectedRowData : [],
        pageLimit: this.props.paginationPageSize ? this.props.paginationPageSize : 10
    }

    componentDidMount() {
        let fillColumnName = [];
        let filterLabelsRecords=this.props.filterLabelsRecords;
        for(let key of filterLabelsRecords){
            let fillData = {};    
            fillData.headerName = key.headerName;
            fillData.field = key.field;
            fillData.sortable = true;
            fillData.filter = true;
            fillData.hide = (key.hasOwnProperty('hide') ? true : false);
            if(this.props.showCheckbox === key.field){
                fillData.checkboxSelection =true;
                fillData.headerComponentFramework = CustomCheckbox
            }

            fillColumnName.push(fillData);
        }
        
        this.setState({columnDefs: fillColumnName});
    }

    /**method to make the header of table */
    capitaliseString=(title)=>{
        let field=title.charAt(0).toUpperCase() + title.slice(1); 
        let returnTitle=field.replace(/_/g, ' ');
        return returnTitle;
    }

    /**method called when ag grid table is ready */
    onGridReady = async params => {
        this.setState({ gridApi: params.api , gridColumnApi: params.columnApi })
        let datasource = await this.createServerSideDatasource(this.state, this.props.paramsAgGridRecords)
        params.api.setServerSideDatasource(datasource);
        params.api.closeToolPanel();
        this.setState({ currentPage: this.state.currentPage + 1 })
    }

    createServerSideDatasource = (state, paramsAgGridRecords) => {
        return {
          getRows: function (params) {
            const { pageLimit, gridApi } = state
            let reportParams={}
            let url='';
            const currentPage = gridApi.paginationGetCurrentPage() + 1;
            let { passPathName } = paramsAgGridRecords
            let url_name=passPathName.substr(1)
        
            if(url_name=='report'){
                   const {agencyId, campaignId, endDate, tabName, region, sourceId, startDate } = paramsAgGridRecords
                   reportParams = `?tabName=${tabName}&currentPage=${currentPage}&pageLimit=${pageLimit}&campaignId=${campaignId}&agencyId=${agencyId}&startDate=${startDate}&sourceId=${sourceId}&region=${region}&endDate=${endDate}`
                   url = `${baseURL}${url_name}${reportParams}`
            }
            else{
                let queryParams = `?currentPage=${currentPage}&pageLimit=${pageLimit}`
                url = `${baseURL}${url_name}${queryParams}`   
            }
            fetch(url, {
                method: 'get',
                //body: JSON.stringify(paramsAgGridRecords),
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                     'Authorization': requestTokenHeader()
                }
            })
            .then(httpResponse => (httpResponse).json())
            .then(response => {
                let tableRecordsArray={};
                let totalCount = 0;
                const dataDecrypt = decryptObject(response.data)
                if(dataDecrypt.positiveScreeningRecords){
                    const { data, total } = dataDecrypt.positiveScreeningRecords;
                    tableRecordsArray = data
                    totalCount = total
                }
                else if(dataDecrypt.dropOffCardDataList){
                    const { data, total } = dataDecrypt.dropOffCardDataList
                    tableRecordsArray = data
                    totalCount = total
                }
                else if(dataDecrypt.enquirerRecords){
                    const { data, total } = dataDecrypt.enquirerRecords
                    tableRecordsArray = data
                    totalCount = total
                    document.querySelector('.selectAll').checked = false;
                }

                params.successCallback(tableRecordsArray, totalCount)
            })
            .catch(error => {
                console.error(error);
                params.failCallback();
            })
          },
        };
      }

    /**method to get the selected rows of table */
    getSelectedRowData = () => {
        let selectedNodes = this.state.gridApi.getSelectedNodes();
        let selectedData = selectedNodes.map(node => node.data.person_id);
        if(_.size(selectedData) > 0){
            this.props.selectedRows(selectedData);
            displaySuccessMessage('Data Recorded Successfully');
        } else {
            displayErrorMessage('Rows not recorded. Please try again')
        }
    }

    /**method to show select all option */
    // isFirstColumn(params) {
    //     var displayedColumns = params.columnApi.getAllDisplayedColumns();
    //     var thisIsFirstColumn = displayedColumns[0] === params.column;
    //     return thisIsFirstColumn;
    // }

    // /**method to show preselected columns in case of edit */
    // showSelectedRows = (event, preAddedRows) => {
    //     if(_.size(preAddedRows) > 0){
    //         event.api.forEachNode( function(rowNode, index) {
    //            // if(preAddedRows.includes(rowNode.data.person_id))
    //             if(preAddedRows.includes(rowNode.data))
    //                 rowNode.setSelected(true);
    //         });
    //     }
    // }

    render() {
        const { columnDefs, pageLimit }=this.state;
        
        return (
            <div className="table-responsive">
                {this.props.showCheckbox ? 
                    <button className="btn btn-sm btn-info mb-2" onClick={this.getSelectedRowData}>Add Selected Enquirers</button>
                : ''}

                <div className="ag-theme-balham" style={{ height: 600 }}>
                    <AgGridReact 
                        defaultColDef={{
                            flex: 1,
                            minWidth: 90,
                            resizable: true
                           
                        }}
                        sideBar= {'columns'}
                        rowModelType={'serverSide'}
                        serverSideStoreType={'partial'}
                        pagination={true}
                        paginationPageSize={pageLimit}
                        cacheBlockSize={pageLimit}
                        animateRows={true}
                        columnDefs={columnDefs}
                        rowSelection="multiple"
                        onGridReady={this.onGridReady}
                    />
                </div>
            </div>
        )
    }
}

export default CommonAgGrid;
