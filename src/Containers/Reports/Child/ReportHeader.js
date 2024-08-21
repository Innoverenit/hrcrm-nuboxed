import React, { Component,lazy,Suspense} from "react";
import { ActionHeader } from "../../../Components/Utils";
import BundleLoader from "../../../Components/Placeholder/BundleLoader";
const ReportActionLeft =lazy(()=> import("./ReportActionLeft"));
const ReportActionRight =lazy(()=> import("./ReportActionRight"));
class ReportHeader extends Component {
  render() {
    const {} = this.props;
    return (
      <div >
         <Suspense fallback={<BundleLoader />}>
        <ActionHeader
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            leftComponent={<ReportActionLeft   
            handleIconClick={this.props.handleIconClick}
            activeIcon={this.props.activeIcon}
            dropdownData={this.props.dropdownData}
            handleDropChange={this.props.handleDropChange}
            selectedCategory={this.props.selectedCategory}
            handleButtonTask={this.props.handleButtonTask}
            selectedButtonIcon={this.props.selectedButtonIcon}
            handleButtonIcon={this.props.handleButtonIcon}
            UserOrgFlipClick={this.props.UserOrgFlipClick}
            userorgflipClick={this.props.userorgflipClick}
           />
              
              }
          // rightComponent={<ReportActionRight />}
        
        /> </Suspense>
      </div>
    );
  }
}

export default ReportHeader;
