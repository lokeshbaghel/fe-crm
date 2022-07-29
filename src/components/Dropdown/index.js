import React from "react";

import "./index.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false,
      haveText: this.props.default,
      options: this.props.option
    };
  }

  render() {
    const { isOpen, haveText } = this.state;

    return (
      <div
        className={isOpen ? "dropdown active" : "dropdown"}
        onClick={this.handleClick}
      >
        <div className="dropdown__text">
          {!haveText ? "Select" : haveText}
        </div>
        {this.itemList(this.state.options)}
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleText = (ev) => {
    this.setState({
      haveText: ev.target.textContent,
    });
    this.props.updateData(ev.target.id)
  };

  itemList = (props) => {
    let items = props[0]
    let list = [];
    for (const key in items) {
      list[key] = <div
                onClick={this.handleText}
                className="dropdown__item"
                key={key.toString()}
                id={key.toString()}
                >
                {items[key]}
              </div>;
    }

    // const list = props.map((item) => (
    //   <div
    //     onClick={this.handleText}
    //     className="dropdown__item"
    //     key={item.toString()}
    //   >
    //     {item}
    //   </div>
    // ));
    return <div className="dropdown__items"> {list} </div>;
  };
}

export default Dropdown;
