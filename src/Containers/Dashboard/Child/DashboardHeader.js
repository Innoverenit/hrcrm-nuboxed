import React, { Component,lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";
const DashboardActionLeft=lazy(() => import("./DashboardActionLeft"));
class DashboardHeader extends Component {
  render() {
    return (
      <div>
          <Suspense fallback={<BundleLoader />}>
        
        <ActionHeader
           leftComponent={<DashboardActionLeft 
            buttonName={this.props.buttonName} 
            viewType={this.props.viewType}
            activeTab={this.props.activeTab}
            toggleShareForm={this.props.toggleShareForm}
            showShareForm={this.props.showShareForm}
            tab={this.props.tab}
            handleTabClick={this.props.handleTabClick}
            setDashboardViewType={this.props.setDashboardViewType}
            handleButtonClick={this.props.handleButtonClick}
            activeButton={this.props.activeButton}
            selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
           />
          }
          
          // rightComponent={<DashboardActionRight
          // viewType={this.props.viewType}
          //   setDashboardViewType={this.props.setDashboardViewType}
          //   handleButtonClick={this.props.handleButtonClick}
          //   activeButton={this.props.activeButton}
          //   />}
        /> </Suspense>
      </div>
    );
  }
}

export default DashboardHeader;
