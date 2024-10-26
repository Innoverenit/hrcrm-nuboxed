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
      <div class="rounded shadow-[0em 0.25em 0.625em -0.125em] border-solid text-black m-1 p-1 w-full font-poppins overflow-auto" Height={this.props.Height}>
        {this.props.children(this.state, this.toggleViewType)}
      </div>
    );
  }
}

export default ViewEditCard;
