import React, {Component} from "react";
import { CSVLink } from "react-csv";
class index extends Component {

    render() {
        return (
            <CSVLink data={this.props.data} filename={this.props.name}>
                {this.props.children}
            </CSVLink>
        )
    }
    
}

export default index;