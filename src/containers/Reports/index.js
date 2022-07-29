import "./index.css";
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import $ from "jquery";

import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import BlockUI from "../../components/BlockUI";
import PostiveScreeningCard from "./Cards/PositiveScreening";
import DropOffCard from "./Cards/DropOffCard";
import EnquiryTarget from "./Cards/EnquiryTarget";
import {getAllReportsLists, resetReportData} from "../../actions/Reports";
import ApprovalForeCast from "./Cards/ApprovalForecast";
import Conversion from "./Cards/Conversion";
import CostConversion from "./Cards/CostConversion";
import CommonAgGrid from "../../components/CommonAgGrid";
import FilterPanel from './FilterPanel';
import EnquiryTargetGraph from "./Graphs/EnquiryTargetGraph";
import ConversionRateGraph from "./Graphs/ConversionRateGraph";
import CostPerConversionGraph from "./Graphs/CostPerConversionGraph";
import ApprovalForeCastSection from "./ApprovalForecastSection";
import {accessAllowed, displayErrorMessage} from '../../utils/helper';
import Constants from "../../utils/constants";

const initialState = {
    startDate       : '',
    endDate         : '',
    agencyId        : '',
    region          : '',
    sourceId        : '',
    campaignId      : '',
    enquiryType     : '',
    localAuthority  : ''
}

const positiveScreeningHeaders=[
    { headerName: 'First Name', field: 'first_name', sortable : true, filter : true },
    { headerName: 'Surname', field: 'surname', sortable : true, filter : true },
    { headerName: 'Age', field: 'date_of_birth', sortable : true, filter : true  },
    { headerName: 'Source', field: 'marketing_source', sortable : true, filter : true  },
    { headerName: 'Date Enquired', field: 'date_enquired', sortable : true, filter : true  },
    { headerName: 'Agency', field: 'agency', sortable : true, filter : true  },
    { headerName: 'Local Authority', field: 'local_authority', sortable : true, filter : true },
    { headerName: 'Stage', field: 'stage', sortable : true, filter : true,  hide : true },
    //{ headerName: 'Priority Rate', field: 'priority_rate', sortable : true, filter : true,  hide: true},
    { headerName: 'Call Attempts', field: 'call_attempts', sortable : true, filter : true,  hide: true },
];

const dropOffHeaders=[
    { headerName: 'First Name', field: 'first_name', sortable : true, filter : true },
    { headerName: 'Surname', field: 'surname', sortable : true, filter : true },
    { headerName: 'Age', field: 'date_of_birth', sortable : true, filter : true },
    { headerName: 'Agency', field: 'agency', sortable : true, filter : true  },
    { headerName: 'Local Authority', field: 'local_authority', sortable : true, filter : true },
    { headerName: 'Date Required', field: 'date_enquired', sortable : true, filter : true },
    { headerName: 'Stage', field: 'stage', sortable : true, filter : true  },
    { headerName: 'Closed', field: 'closed', sortable : true, filter : true },
    { headerName: 'Closed Reason', field: 'closed_reason', sortable : true, filter : true  },
    //{ headerName: 'Priority Rate', field: 'priority_rate', sortable : true, filter : true , hide: true},
    { headerName: 'Call Attempts', field: 'call_attempts', sortable : true, filter : true , hide: true },
    { headerName: 'Marketing Source', field: 'marketing_source', sortable : true, filter : true , hide: true},
    //{ headerName: 'Date Progressed', field: 'date_progressed', sortable : true, filter : true , hide: true },
];

class Reports extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tabName                     : 'enquiryTargetGraph',
            passPathName                : `report/enquirer`,
            fieldVal                    : { tabName:'enquiryTargetGraph', passPathName:`report/enquirer` },
            approvalForecastTabName     : 'approval',
            approvalForecastStartDate   : '', 
            approvalForecastEndDate     : '', 
            approvalForecastSourceId    : '',
            selectedSource              : [],
            ...initialState
        };
    }

    /**lifecycle method to fetch the initial data */
    componentDidMount() {
        accessAllowed(Constants['reports']);
        this.props.getAllReportsLists({tabName:this.state.tabName});
        this.toggleCardBoxes();
    }

    /**lifecycle method to reset the data stored in redux*/
    componentWillUnmount(){
        this.props.resetReportData()
    }

    /**method to toggle boxes when clicked */
    toggleCardBoxes = () => {
        $(".showSingle").click(function () {
            $(".targetDiv").hide();
            $("#div" + $(this).attr("target")).show();
        });

        $(".showSingle").click(function (e) {
            $(".showSingle").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });
    }
    
    /**method called when any card is clicked or filter is applied */
    getReportData=(keyname, data={})=>{
        const params={};
        this.setState({fieldVal:''});
        const keyNameList=['enquiryTargetGraph','conversionRateGraph','costPerConversion','approvalForecastGraph'];
        const keyAgGridNameList=['dropoff','positiveScreening'];                    
        
        const { tabName, startDate, endDate, agencyId, region, sourceId, campaignId, enquiryType, passPathName, 
            approvalForecastTabName, approvalForecastStartDate, approvalForecastEndDate, approvalForecastSourceId, localAuthority } = this.state;
        
        if(!_.isEmpty(startDate))  
            params.startDate = startDate;

        if(!_.isEmpty(endDate))
            params.endDate=endDate;

        if(!_.isEmpty(agencyId)) 
            params.agencyId=agencyId;

        if(!_.isEmpty(region)) 
            params.region=region;

        if(!_.isEmpty(sourceId)) 
            params.sourceId=sourceId;

        if(!_.isEmpty(campaignId)) 
            params.campaignId=campaignId;

        if(!_.isEmpty(enquiryType)) 
            params.enquiryType=enquiryType;
        
        if(!_.isEmpty(localAuthority)) 
            params.localAuthority=localAuthority    
            
        if(!_.isEmpty(passPathName)) 
            params.passPathName=passPathName;   
        
        if(!_.isEmpty(approvalForecastStartDate)) 
            params.approvalForecastStartDate = approvalForecastStartDate;

        if(!_.isEmpty(approvalForecastEndDate)) 
            params.approvalForecastEndDate = approvalForecastEndDate;

        if(!_.isEmpty(approvalForecastSourceId)) 
            params.approvalForecastSourceId = approvalForecastSourceId;

        if(!_.isEmpty(approvalForecastTabName)) 
            params.approvalForecastTabName = approvalForecastTabName;

         //action called to show card data  
        if(keyNameList.indexOf(keyname) !== -1)
        {
            if(keyname !== 'approvalForecastGraph')
                this.setState({ approvalForecastTabName : 'approval', approvalForecastStartDate : '', approvalForecastEndDate : '', approvalForecastSourceId : '' })

            params.tabName=keyname;
            this.setState({tabName:keyname});
            this.props.getAllReportsLists(params);

        } else if(keyAgGridNameList.indexOf(keyname) !== -1){
            params.tabName=keyname;
            
            this.props.getAllReportsLists(params);
            this.setState({fieldVal:params});
            this.setState({tabName:keyname});
        }

        /**action called for filter applied data*/
       
        if(keyname === 'report'){
            const { startDate, endDate, agencyId, region, sourceId, campaignId, enquiryType , localAuthority } = data;
            if(!_.isEmpty(startDate))  
                params.startDate = startDate;

            if(!_.isEmpty(endDate))
                params.endDate=endDate;

            if(!_.isEmpty(agencyId)) 
                params.agencyId=agencyId;

            if(!_.isEmpty(region)) 
                params.region=region;

            if(!_.isEmpty(sourceId)) 
                params.sourceId=sourceId;

            if(!_.isEmpty(campaignId)) 
                params.campaignId=campaignId;

            if(!_.isEmpty(enquiryType)) 
                params.enquiryType=enquiryType;
            
            if(!_.isEmpty(passPathName)) 
                params.passPathName=passPathName;  

            if(!_.isEmpty(localAuthority)) 
                params.localAuthority=localAuthority; 

            params.tabName=tabName;
            params.passPathName=passPathName;
            this.setState({ fieldVal:params, startDate,endDate,agencyId,region,sourceId,campaignId, enquiryType, approvalForecastTabName, 
                approvalForecastStartDate, approvalForecastEndDate, approvalForecastSourceId, localAuthority })
            //console.log('filter', params)
            this.props.getAllReportsLists(params);
        }

        /**action called for reset filter applied */
        if(keyname === 'resetFilter'){
            params.tabName=tabName;
            params.passPathName=passPathName;
            this.setState({fieldVal:params});
            this.setState(initialState)
            //console.log('reset', params)
            this.props.getAllReportsLists(params);
        }

        /**action called for reset filter applied from approval graph */
        if(keyname === 'resetApprovalForecastGraph'){
            params.approvalForecastTabName='approval';
            params.approvalForecastStartDate='';
            params.approvalForecastEndDate='';
            params.approvalForecastSourceId='';
            params.tabName=tabName;
            params.passPathName=passPathName;
            this.setState({ approvalForecastTabName : 'approval', approvalForecastStartDate : '', approvalForecastEndDate : '', approvalForecastSourceId : '' })
            this.props.getAllReportsLists(params);
        }

        /**action called when filter data submitted from approval graph */
        if(keyname === 'approvalForecastComparisionGraph'){
            let isEmpty = false;
            if(approvalForecastStartDate){
                isEmpty = true
                if(!approvalForecastEndDate){
                    displayErrorMessage('Please select end date also')
                    return false;
                }}

            if(approvalForecastEndDate){
                isEmpty = true
                if(!approvalForecastStartDate){
                    displayErrorMessage('Please select start date also')
                    return false;
                }
            }

            if(approvalForecastSourceId.length > 0) {
                isEmpty = true
                
                if(approvalForecastSourceId.length > 5){
                    displayErrorMessage('Please select 5 sources only at a time.')
                    return false; 
                }
            }

            if(!isEmpty){ 
                displayErrorMessage('Please select atleast one filter.')
                return false; 
            }

            params.tabName=tabName;
            params.passPathName=passPathName;
            this.props.getAllReportsLists(params);
        }
    }

    /**method to handle approval input change */
    handleApprovalTabChange = (event) => {
        event.preventDefault();

        const type = event.target.name;
        if(type === 'approvalForecastStartDate')
            this.setState({approvalForecastStartDate : event.target.value})

        if(type === 'approvalForecastEndDate')
            this.setState({approvalForecastEndDate : event.target.value})

        if(type === 'approvalForecastSourceId')
            this.setState({approvalForecastSourceId : event.target.value})
    }

    /**method to handle approval tab change */
    setApprovalTabName = (tabName) => {
        this.setState({approvalForecastTabName : tabName});
    }

    /**method to handle approval source change */
    handleApprovalSource = (data) => {
        let sourceArray=[];
        if(!_.isEmpty(data))
            data.map((data) => sourceArray.push(parseInt(data.value)));

        this.setState({approvalForecastSourceId : sourceArray});
    }

    render() {
        const { blocking, enquiryTargetCardData, enquiryTargetGraphData, positiveScreeningCardData, dropOffCardData, 
                dropOffCardDataList, positiveScreeningRecords, conversionRateTargetCard, conversionRateGraphData, 
                costPerConversionGraphData,costPerConversionCardData,approvalForecastCardData, approvalForecastGraphData, 
                agencies, marketingSources, campaigns, enquiryTypes, localAuthorityList } = this.props.reportsData;

        const {fieldVal, approvalForecastTabName, approvalForecastStartDate, approvalForecastEndDate } = this.state;

        return (
            <React.Fragment>
                <Banner img={BannerImage} />
                <BlockUI blocking={blocking}></BlockUI>
                <div className="page-content-wrapper reports" data-aos="fade-up">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 d-flex flex-column">
                                <h1 className="dash-title">Reports</h1>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-lg-6 col-md-6">
                                {/* <div className="custom-nav-tabs">
                                    <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <li>
                                            <a className="nav-item nav-link active" id="monthly-content-tab" data-toggle="tab" 
                                                href="#monthly-content" role="tab" aria-controls="all-content" aria-selected="true"
                                            >
                                                Monthly
                                            </a>
                                        </li>
                                        <li>
                                            <a className="nav-item nav-link" id="quaterly-content-tab" data-toggle="tab"
                                                href="#quaterly-content" role="tab" aria-controls="inprogress-content" aria-selected="true"
                                            >
                                                Quarterly
                                            </a>
                                        </li>
                                        <li>
                                            <a className="nav-item nav-link" id="yearly-content-tab" data-toggle="tab"
                                                href="#yearly-content" role="tab" aria-controls="scheduled-content" aria-selected="true"
                                            >
                                                Yearly
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>

                            <div className="col-lg-6 col-md-6 d-flex justify-content-end">
                                <FilterPanel agencies={agencies} marketingSources={marketingSources} campaigns={campaigns} 
                                            submitFilterData={(type, data) => this.getReportData(type, data)}
                                            resetFilter={(data)=>this.getReportData('resetFilter',data)}
                                            enquiryTypes={enquiryTypes}
                                            localAuthorityList={localAuthorityList}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-9">
                                <div className="row top-tabs">
                                    <EnquiryTarget enquiryTarget={enquiryTargetCardData} handleTabChange={() => this.getReportData('enquiryTargetGraph')} />
                                    <PostiveScreeningCard positiveScreening={positiveScreeningCardData} callReportClickTab={(data)=>this.getReportData('positiveScreening',data)}/>
                                    <DropOffCard dropOff={ dropOffCardData } callReportClickTab={(data)=>this.getReportData('dropoff',data)}/>
                                   
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                            <div id="div1" className="targetDiv">
                                                <h3>Enquiries Vs Target</h3>
                                                {/* <h5>Current average 15000</h5> */}
                                                {!_.isEmpty(enquiryTargetGraphData) ? 
                                                    <EnquiryTargetGraph graphData={enquiryTargetGraphData} /> 
                                                : ''}
                                            </div>
                                        
                                        <div id="div2" className="targetDiv" style={{ display: "none" }}>
                                            <h1>Positive Screenings</h1>
                                            { (_.size(positiveScreeningRecords) > 0) ?   
                                                <CommonAgGrid 
                                                    paramsAgGridRecords={ fieldVal } 
                                                    filterLabelsRecords={ positiveScreeningHeaders }
                                                    paginationPageSize={20} //no of records in single page
                                                />  
                                            :'' }
                                        </div>
                            
                                        <div id="div3"  className="targetDiv" style={{ display: "none" }}>
                                            <h1>Drop Offs</h1>
                                            { (_.size(dropOffCardDataList) > 0) ?   
                                                <CommonAgGrid 
                                                    paramsAgGridRecords={ fieldVal } 
                                                    cardListRecords={dropOffCardDataList} 
                                                    filterLabelsRecords={ dropOffHeaders }
                                                    paginationPageSize={20} //no of records in single page
                                                />  
                                            :'' }
                                        </div>
                            
                                        <div id="div4" className="targetDiv" style={{ display: "none" }}>
                                            <ApprovalForeCastSection approvalForecastGraphData={approvalForecastGraphData} 
                                                    marketingSources={marketingSources}
                                                    approvalForecastTabName={approvalForecastTabName}
                                                    approvalForecastStartDate={approvalForecastStartDate}
                                                    approvalForecastEndDate={approvalForecastEndDate}
                                                    setApprovalTab={(tab) => this.setApprovalTabName(tab)}
                                                    filterChange={(filterData) => this.handleApprovalTabChange(filterData)}
                                                    handleSource={(source) => this.handleApprovalSource(source)}
                                                    submitComparision={(type) => this.getReportData(type)}
                                            />
                                        </div>

                                        <div id="div5" className="targetDiv" style={{ display: "none" }}>
                                            <h3>Conversion Rate</h3>
                                            {!_.isEmpty(conversionRateGraphData) ? 
                                                    <ConversionRateGraph graphData={conversionRateGraphData} /> 
                                                : ''}
                                        </div>

                                        <div id="div6" className="targetDiv" style={{ display: "none" }}>
                                            <h3>Cost per Conversion</h3>
                                            {!_.isEmpty(costPerConversionGraphData) ? 
                                                    <CostPerConversionGraph graphData={costPerConversionGraphData} /> 
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 reports-right">
                                <div className="row">
                                    <ApprovalForeCast approvalForecastCardData={approvalForecastCardData} handleTabChange={() => this.getReportData('approvalForecastGraph')}/>
                                    <Conversion conversionRateTargetCard={conversionRateTargetCard} callReportClickTab={(data)=>this.getReportData('conversionRateGraph',data)}  />
                                    <CostConversion costPerConversionCardData={costPerConversionCardData} callReportClickTab={(data)=>this.getReportData('costPerConversion',data)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        loggedUser    : state.authenticatedUser,
        reportsData  : state.reports
    };
};

export default connect(
            mapsStateToProps, 
            { getAllReportsLists, resetReportData }
          )(Reports);
