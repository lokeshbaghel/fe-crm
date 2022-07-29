import "./index.css";
import React from "react";
import { connect } from "react-redux";

import SquareBox from "../../components/boxes/squarebox";
import { fetchDashboardData } from "../../actions/Dashboard";
import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import { images } from "../../utils/helper";

const RenderList = (props) => {
  const boxelements = [
    {
      link: "nav-home",
      boxcolor: "red",
      active: "active",
      linkid: "nav-home-tab",
      linkcontrol: "nav-home",
      title: "144",
      details: "Successful Calls",
      imagesrc: "icon-feather-phone-call.svg",
      widthper: "70%",
    },
    {
      link: "nav-profile",
      boxcolor: "blue",
      active: "",
      linkid: "nav-profile-tab",
      linkcontrol: "nav-profile",
      title: "20",
      details: "Unreachable enquirers",
      imagesrc: "icon-material-block.svg",
      widthper: "30%",
    },
    {
      link: "nav-contact",
      boxcolor: "green",
      active: "",
      linkid: "nav-contact-tab",
      linkcontrol: "nav-contact",
      title: "233",
      details: "Emails sent",
      imagesrc: "icon-feather-mail.svg",
      widthper: "50%",
    },
    {
      link: "nav-about",
      boxcolor: "green",
      active: "",
      linkid: "nav-about-tab",
      linkcontrol: "nav-about",
      title: "109",
      details: "Meetings Booked",
      imagesrc: "icon-feather-calendar.svg",
      widthper: "30%",
    },
  ];
  return boxelements.map((item, i) => (
    <SquareBox
      key={i}
      link={item.link}
      active={item.active}
      imagesrc={item.imagesrc}
      details={item.details}
      title={item.title}
      linkcontrol={item.linkcontrol}
      linkid={item.linkid}
      boxcolor={item.boxcolor}
      widthper={item.widthper}
    />
  ));
};
class Dashboard extends React.Component {
  componentDidMount() {
    //this.props.fetchDashboardData();
  }
  toggleModal = (value) => {
    this.setState({showModal: value})
  }
  render() {
  
    return (
      <React.Fragment>
        <Banner img={BannerImage} />
        <div className="page-content-wrapper dashboard" data-aos="fade-up">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <h1 className="dash-title">Dashboard</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <RenderList></RenderList>
                </div>
              </div>
            </div>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {/*   <DashboardLoop data={this.props.DashboardList.data} />    */}

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">5th Mar 2:00</div>

                  <div className="col-lg-3 col-md-3"> By Jon chase for update</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">8th March 4:03</div>

                  <div className="col-lg-3 col-md-3">Call Raj By Testing</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">5th Mar 2:00</div>

                  <div className="col-lg-3 col-md-3">Call By Gaurav</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">8th March 4:03</div>

                  <div className="col-lg-3 col-md-3">Call Raj By Testing</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">5th Mar 2:00</div>

                  <div className="col-lg-3 col-md-3">Call By Gaurav</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">8th March 4:03</div>

                  <div className="col-lg-3 col-md-3">Call Raj By Testing</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">2th April 9:00</div>

                  <div className="col-lg-3 col-md-3">
                    Robinson and chase for update
                  </div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">28th May 8:00</div>

                  <div className="col-lg-3 col-md-3">Call Robinson</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-about"
                role="tabpanel"
                aria-labelledby="nav-about-tab"
              >
                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">7th June 7:00</div>

                  <div className="col-lg-3 col-md-3">
                    By Jon chase for update
                  </div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
                </div>

                <div className="row dash-list">
                  <div className="col-lg-3 col-md-3">Call</div>
                  <div className="col-lg-3 col-md-3">6th Feb 9:00</div>

                  <div className="col-lg-3 col-md-3">Call Ray for update</div>
                  <div className="col-lg-3 col-md-3 last-child">
                    <img src={images["arrow-circle-icon.png"]} alt="Circle" />
                  </div>
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
    DashboardList: state.dashboard,
  };
};
export default connect(mapsStateToProps, { fetchDashboardData })(Dashboard);
