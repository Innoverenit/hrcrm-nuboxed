import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
const CustomerDetailActionLeft =lazy(()=> import("./CustomerDetailActionLeft"));

class CustomerDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<CustomerDetailActionLeft 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default CustomerDetailHeader;
