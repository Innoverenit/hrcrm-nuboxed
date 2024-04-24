import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ReportActionLeft =lazy(()=> import("./ReportActionLeft"));
const ReportActionRight =lazy(()=> import("./ReportActionRight"));
class ReportHeader extends Component {
  render() {
    const {} = this.props;
    return (
      <div >
        <ActionHeader

          leftComponent={<ReportActionLeft   
            handleIconClick={this.props.handleIconClick}
            activeIcon={this.props.activeIcon}
            dropdownData={this.props.dropdownData}
               handleDropChange={this.props.handleDropChange}/>}
          // rightComponent={<ReportActionRight />}
        
        />
      </div>
    );
  }
}

export default ReportHeader;
