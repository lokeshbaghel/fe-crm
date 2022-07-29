import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../assets_crm/img/logo.png";
import Unsubscribe from "../../assets_crm/img/unsubscribe-icon.png";
import Constant from "../../utils/constants";
import BlockUI from "../../components/BlockUI";
import ConfirmModal from "./ConfirmModal";
import { history } from "../../utils/helper"
import './index.css';


import { unsubscribeUser } from "../../actions/Unsubscribe"

class index extends Component {

    state = {
        showModal: false,
        person_id: this.props.match.params.id
    };

    componentDidMount(){
        let params = {
            person_id: this.props.match.params.id,
            is_unsubscribe: ""
        }
        this.props.unsubscribeUser(params)
    }

    //Handle modal to show/hide
    handleModal = (action) => {
      this.setState({showModal: action})
    }

    //Handle to to call action for unsubscribe user
    unsubscribe = (data) => {
      if(data){
        let params = {
          person_id: this.props.match.params.id,
          is_unsubscribe: Constant['is_unsubscribe_yes']
        }
        this.props.unsubscribeUser(params)
        this.setState({showModal: false})
      }
    }

    //Close window and redirect to login page
    closeWindow = () => {
      history.push(`/`)
    }

  render() {
      const { blocking, is_unsubscribe, message } = this.props.unsubscribe;
      const { showModal } = this.state;
    return (
      <>
        <BlockUI blocking={blocking} />
        <header id="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <a href="#" className="logo">
                  <img src={Logo} />
                </a>
              </div>
            </div>
          </div>
        </header>
        <main id="unsubscribe-main">
          <section id="unsubscribe">
            <div className="unsubscribe-inner">
              <img src={Unsubscribe} />
              <h3 className="main-title">Unsubscribe</h3>
              <h2 className="sub-title">
                {
                  (is_unsubscribe == Constant['is_unsubscribe_yes']) ? message : 'Do you wish to unsubscribe from Outcomes First Groups marketing information?'
                }
                
              </h2>
              {
                (is_unsubscribe == Constant['is_unsubscribe_no']) ? 
                <div>
                  <button
                    className="btn green-btn"
                    onClick={() => this.handleModal(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="btn red-btn"
                    onClick={this.closeWindow}
                  >
                    No
                  </button>
                  { showModal ? <ConfirmModal modalAction={(data) => this.unsubscribe(data)} canShow={showModal} toggle={this.handleModal} /> : ''}
                </div>
                : ''}
            </div>
          </section>
          {/* End Section */}
        </main>
        {/* End #main */}
        <footer id="footer"></footer>
      </>
    );
  }
}

const mapsStateToProps = (state) => {
    return {
        unsubscribe : state.unsubscribe
    };
};

export default connect(
    mapsStateToProps, 
    {unsubscribeUser}
  )(index);
