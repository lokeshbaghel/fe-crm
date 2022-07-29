import React, {Component} from "react"; 

class CustomCheckbox extends Component {
    state = {
        checked: false,
    }
    
    /**update checkbox value and its state */
    updateState = event => {
        let value = false;
        if(document.querySelector('.selectAll').checked)
            value = true;
        
        this.setState({ checked: value });
        this.selectAllRows(value);
    }

    /**select all rows on current or before page */
    selectAllRows = bool => {
        this.props.api.forEachNode(row => {
            this.props.api.getRowNode(row.id).selectThisNode(bool);
        });
    }

    render() {
        return (
            <div className="custom-header-checkbox">
                <input type="checkbox" className="selectAll" value={this.state.checked} onChange={this.updateState} />{this.props.displayName}
            </div>
        )
    }
}

export default CustomCheckbox;