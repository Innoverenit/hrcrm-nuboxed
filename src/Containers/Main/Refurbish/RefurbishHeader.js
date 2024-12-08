import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import RefurbishActionLeft from "./RefurbishActionLeft";

class RefurbishHeader extends Component {
  render() {
    return (
      <>
        <ActionHeader
          leftComponent={
            <RefurbishActionLeft
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
              setProductionViewType={this.props.setProductionViewType}
              viewType={this.props.viewType}
            />
          }
       
        />
      </>
    );
  }
}

export default RefurbishHeader;
