import React, { Component, Fragment } from "react";
import CommonAgGrid from "../../components/CommonAgGrid";

import _ from "lodash";
import { displayRecordNotFound } from "../../utils/helper";


class PositiveScreeningRecords extends Component {

  render() {
    const { positiveScreeningRecords } = this.props;
    const filterLabelsRecords=['enquirer_name','local_authority','agency_name','priority_rate','call_attempts','marketing_source','date_progressed','date_enquired'];
    return (
      <Fragment>
        <h1>Positive Screenings</h1>
        {!_.isEmpty(positiveScreeningRecords) ? (
          <h2>
            Currently {positiveScreeningRecords.length} positive enquirers to
            this month
          </h2>
        ) : (
            <div className="no-records">{displayRecordNotFound()}</div>
        )}
        {!_.isEmpty(positiveScreeningRecords)
          ? <CommonAgGrid cardListRecords={positiveScreeningRecords} filterLabelsRecords={ filterLabelsRecords }/>
          : ""}
      </Fragment>
    );
  }
}

export default PositiveScreeningRecords;
