import React from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';
import { Scrollbars } from "react-custom-scrollbars";
import "./index.css";

class index extends React.Component {
  state = {
    showHide: this.props?.canShow,
    progress_items: this.props?.progressItems,
    selectedRow: 0,
    progressItem: this.props?.progressItems[0],
    searchInput: '',
    searchItems: [],
    searchStatus: false
  };

  progressItems = this.state?.progress_items;

  //Close modal
  handleModal() {
    this.props.updateModal(false);
  }

  //Handle outside click of modal
  handleClose = () =>  false;

  selectProgressItem = (selectedRow, progressItem) => (e) => {
    if (selectedRow !== undefined) {
      this.setState({ selectedRow });
      this.setState({progressItem: progressItem}) 
    }
  };

  getList = (data) => {
    if(data.length > 0){
      return data.map((item, i) => {
        return (
          <tr
            key={i}
            onClick={this.selectProgressItem(i, item)}
            className={this.state.selectedRow === i ? "tableSelected" : ""}
          >
            <td>{item.id}</td>
            <td>{item.name}</td>
          </tr>
        );
      });
    }else{
      return (
      <tr>
        <td><strong>No Record found</strong></td>
      </tr>
      )
    }
    
  };

  handleSubmit = () => {
    let fields = {};
    fields.progress_item_id = this.state.progressItem.id;
    this.props.updateModal(fields);
  }

  handleChange = (event) => {
    this.setState({searchInput: event.target.value})
  }

  searchHandler = (event) => {
    let code = event.keyCode;
    if(code === 13){
      let value = this.state.searchInput
      let newArray = this.progressItems.filter((d) => {

        let searchByNameInLowerCase = d.name.toLowerCase();
        let searchByNameInUpperCase = d.name.toUpperCase();
        let searchByName = d.name;

        return (
          searchByNameInLowerCase.indexOf(value.trim()) !== -1 ||
          searchByNameInUpperCase.indexOf(value.trim()) !== -1 ||
          searchByName.indexOf(value.trim()) !== -1
        )
      });

      this.setState({searchItems: newArray, searchStatus: true})

      if(newArray.length > 0)
        this.setState({progressItem: newArray[0]})
    
    }
  }

  render() {
    const {showHide, searchInput, progress_items, searchItems, searchStatus } = this.state
    return (
      <>
      <Fade>
        <Modal id="myModal" onHide={this.handleClose} className="progress-items" show={showHide} centered size="sm">
          <Modal.Header>
            <h1>Add Progress Items</h1>
            <button
              type="button"
              className="close"
              onClick={() => this.handleModal()}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="progress-items-list">
              <div className="item-search-wrap">
                <input className="search-progress-item" value={searchInput} type="text" onChange={this.handleChange} onKeyDown={this.searchHandler} />
                <button className="search-btn"></button>
              </div>
              <Scrollbars style={{ height: "125px" }}>
              <table>
                <tbody className="tableHover">{ (searchStatus) ? this.getList(searchItems) : (searchItems.length === 0) ? progress_items.length > 0 ? this.getList(progress_items) : '' : this.getList(searchItems) }</tbody>
              </table>
              </Scrollbars>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <h4>Description</h4>
                <p>
                  { (searchStatus && searchItems.length === 0) ? '' : (progressItem) ? progressItem.description : ''}
                </p>
              </div>
            </div> */}
            <div className="row">
              <div className="d-flex justify-content-center col-md-12">
                <button type="submit" disabled={searchStatus && searchItems.length === 0} className="btn btn-primary" onClick={()=>this.handleSubmit()}>
                  Add this progress item
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        </Fade>
      </>
    );
  }
}

export default index;
