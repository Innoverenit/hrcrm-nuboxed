import React, { Component } from "react";

class ViewEditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: "view",
    };
  }
  toggleViewType = () => {
    this.setState((prevState) => {
      if (prevState.viewType === "view") {
        return { viewType: "edit" };
      } else {
        return { viewType: "view" };
      }
    });
  };
  render() {
    return (
      <div class="rounded border-[#0000001f]  border-2  shadow-[#a3abb980] border-solid text-black  p-1 w-full font-poppins overflow-auto" Height={this.props.Height}>
        {/* {this.props.children(this.state, this.toggleViewType)} */}
        {typeof this.props.children === "function"
    ? this.props.children(this.state, this.toggleViewType)
    : this.props.children}
      </div>
    );
  }
}

export default ViewEditCard;
