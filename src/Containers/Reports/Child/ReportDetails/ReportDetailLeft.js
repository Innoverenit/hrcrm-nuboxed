import React, { Component,lazy} from "react";
// import ReportDocumentsCard from "./ReportDocumentsCard";
import ReportTimeCard from "./ReportTimeCard";
const ReportDetailCard =lazy(()=> import("./ReportDetailCard"));

class ReportDetailLeft extends Component {
  render() {
    const { customer } = this.props;
    return (
      <>
        <div class=" flex flex-col">
        
          {/* <CustomerExtraDetailCard customer={customer} />          */}
          <ReportDetailCard   handleIconClick={this.props.handleIconClick}
            activeIcon={this.props.activeIcon}
            buttonData={this.props.buttonData}
            visibilityConditions={this.props.visibilityConditions}
            selectedCategory={this.props.selectedCategory}
            dropdownOptions={this.props.dropdownOptions}
            handleSelectChange={this.props.handleSelectChange}
            handleButtonClick={this.props.handleButtonClick}
            dropdownData={this.props.dropdownData}
               handleDropChange={this.props.handleDropChange} 
               selectedButtonIcon={this.props.selectedButtonIcon}
               handleButtonIcon={this.props.handleButtonIcon}
               UserOrgFlipClick={this.props.UserOrgFlipClick}
               userorgflipClick={this.props.userorgflipClick}
               />
          <ReportTimeCard customer={customer} 
             handleButtonTask={this.props.handleButtonTask}
             taskData={this.props.taskData}
           selectedCategory={this.props.selectedCategory}
           selectedButtonIcon={this.props.selectedButtonIcon}
               handleButtonIcon={this.props.handleButtonIcon}
               UserOrgFlipClick={this.props.UserOrgFlipClick}
               userorgflipClick={this.props.userorgflipClick}
          />
          {/* <ReportDocumentsCard customer={customer} /> */}
        </div>
      </>
    );
  }
}
export default ReportDetailLeft;
