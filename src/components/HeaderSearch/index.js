import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";
import { history } from '../../../src/utils/helper';
import BlockUI from "../../components/BlockUI";
import Fade from 'react-reveal/Fade';
import arrowleft from "../../assets_crm/img/pagination-left-arrow.png";
import arrowright from "../../assets_crm/img/pagination-right-arrow.png";

import "./index.css";


class HeaderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHide: this.props?.canShowdata,
            searchValue:''
          };
      }
      resultShowAfterFilter=(data)=>{
        return data.map((dataSet,index)=>(
          <div key={index}> 
              {index==0?<h2 className="search-header">Showing {data.length} out of {data.length} for: {this.state.searchValue}</h2>:''}
              <div  className="search-item" onClick={(data) => this.handleModal(false,dataSet.account_id)} variant="secondary">
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>Name :</strong> {dataSet.first_name} {dataSet.last_name}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>Address :</strong> {dataSet.person_address ? dataSet.person_address :'N/A'}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>City :</strong> {dataSet.city ? dataSet.city : 'N/A'}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>Post Code :</strong>{dataSet.post_code ? dataSet.post_code : 'N/A'} 
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>Email Address :</strong> {dataSet.email ? dataSet.email : 'N/A'}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>Telephone Number :</strong>: {dataSet.phone ? dataSet.phone : 'N/A'} 
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description">
                    <strong>Agency :</strong> {dataSet.agency_name ? dataSet.agency_name : 'N/A'} , {dataSet.agency_email ? dataSet.agency_email : ''} 
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description"><strong>CRM ID :</strong> {dataSet.account_id ? dataSet.account_id : 'N/A'} </p>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <p className="item-description"><strong>Account Status :</strong> {dataSet.account_status ? dataSet.account_status.toUpperCase() : 'N/A'} </p>
                  </div>
                  
                </div>
              </div>
           </div>
        ))
       }

       
  handleModal=(value,data='')=>{
          let instance = this;
          const prevHistoryPush = history.location.pathname;
          instance.props.handleSearchModal(value);
          if(data){
            let account_detail_page_url=`/account-details/${data}`;
            if(prevHistoryPush !== account_detail_page_url)
               history.push(account_detail_page_url); 
            else
              history.replace(account_detail_page_url); 
            }    
  }

  handleSearchTitle=(e)=>{
     this.setState({searchValue: e.target.value},this.callSearchApi);
 }
 callSearchApi=()=>{
   const { searchValue } = this.state;
   if(searchValue.length>=3){
   let params={};
      params.searchTitle = searchValue;
      this.props.getAccountSearchData(params);
   }
 }
  handleClose = () => false;
  render() {
    let { searchValue,showHide } = this.state;
    let {showSearchResult,blocking}=this.props;
    return (
      <>
     
       <Fade top>
       <Modal id="myModal"  dialogClassName="custom-map-modal custom-search-modal" className="modal-container"  onHide={this.handleClose} show={showHide} centered>
                    <Modal.Header>
                    <h2 className="searchTitle">
                          <input type="text" value={searchValue} className="form-control search-user" 
                                            onChange={this.handleSearchTitle} placeholder="Search for enquirer records" />
                        </h2>
                        <button type="button" className="close" onClick={(data) => this.handleModal(false)}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>  
                    <Modal.Body>
                        <div className="main-search-box">
                        <BlockUI blocking={blocking ? blocking : blocking} />
                        { !_.isEmpty(showSearchResult) && searchValue.length>=3 ?
                            this.resultShowAfterFilter(showSearchResult) 
                        : (searchValue.length>=3) ? <h1>Oops! We couldn't find any result for {searchValue}</h1> : <h1>Find enquirer records by searching using their Name, Email Address, CRM ID or Telephone Number</h1>
                        }
                      </div>
                      <div className="search-pagination">
                        <ul>
                          <li><a href="#"><img src={arrowleft} alt="" /></a></li>
                          <li><a href="#">1</a></li>
                          <li><a href="#">2</a></li>
                          <li><a href="#">3</a></li>
                          <li><a href="#">4</a></li>
                          <li><a href="#"><img src={arrowright} alt="" /></a></li>
                        </ul>
                      </div>
                    </Modal.Body>
        </Modal>
        </Fade>
      </>
    );
  }
}

export default HeaderSearch;
