import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const DashboardActionLeft=lazy(() => import("./DashboardActionLeft"));
const DashboardActionRight=lazy(() => import("./DashboardActionRight"));
class DashboardHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
           leftComponent={<DashboardActionLeft 
            viewType={this.props.viewType}
            activeTab={this.props.activeTab}
            toggleShareForm={this.props.toggleShareForm}
            showShareForm={this.props.showShareForm}
            tab={this.props.tab}
            handleTabClick={this.props.handleTabClick}
            setDashboardViewType={this.props.setDashboardViewType}
            handleButtonClick={this.props.handleButtonClick}
            activeButton={this.props.activeButton}
           />}
          // rightComponent={<DashboardActionRight
          // viewType={this.props.viewType}
          //   setDashboardViewType={this.props.setDashboardViewType}
          //   handleButtonClick={this.props.handleButtonClick}
          //   activeButton={this.props.activeButton}
          //   />}
        />
      </div>
    );
  }
}

export default DashboardHeader;
