import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import RefurbishActionLeft from "./RefurbishActionLeft";
import RefurbishActionRight from "./RefurbishActionRight";

class RefurbishHeader extends Component {
  render() {
    return (
      <>
        <ActionHeader
          leftComponent={
            <RefurbishActionLeft
              setProductionViewType={this.props.setProductionViewType}
              viewType={this.props.viewType}
            />
          }
        // rightComponent={
        //   <RefurbishActionRight
        //   />
        // }
        />
      </>
    );
  }
}

export default RefurbishHeader;
