import React, { Component } from 'react';
import _ from "lodash";

import {displayErrorMessage} from '../../utils/helper';

class SearchBox extends Component {
    state = {
        searchValue:this.props.searchValue
    }

    handleChange = (event) => {
        this.setState({searchValue:event.target.value})
    }

    handleInputChange = (event) => {
        const value = this.state.searchValue;
        // if(value.trim() == '') {
        //     displayErrorMessage('Please type some keywords to search');
        //     event.target.value = '';
        //     return false;
        // }
        this.props.searchInputChangeValue(value);
    }

    resetData = () => {
        const value = this.state.searchValue;
        this.setState({searchValue : ''})
        if(value.trim() !== '')
          this.props.searchInputChangeValue();
    }

    render() {
        let {searchValue} = this.state;
        const {placeholder} = this.props;
        

        return (
            <React.Fragment>
                <div className={this.props.searchParentClass || "search-div"}>
                    <input type="text" className="form-control search-user"
                                onKeyPress={(event) => {
                                    var key = event.keyCode || event.which;
                                    if (key === 13)
                                        this.handleInputChange(event)
                                }}
                                value={ searchValue }
                                onChange={this.handleChange}  
                                placeholder={(placeholder) ? placeholder :''}
                                />
                    <button type="submit" className={this.props.searchButtonClass || "search-btn"} onClick={this.handleInputChange} >search</button>
                </div>
                {/* {searchValue ? <a onClick={this.resetData} className={this.props.resetButtonClass}>Reset</a> : null} */}
            </React.Fragment>
        );
    }
}

export default SearchBox;