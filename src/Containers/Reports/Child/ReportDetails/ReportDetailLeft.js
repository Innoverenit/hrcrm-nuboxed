import React, { Component,lazy} from "react";
import ReportDocumentsCard from "./ReportDocumentsCard";
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
            selectedCategory={this.props.selectedCategory}
            dropdownOptions={this.props.dropdownOptions}
            handleSelectChange={this.props.handleSelectChange}
            handleButtonClick={this.props.handleButtonClick}
            dropdownData={this.props.dropdownData}
               handleDropChange={this.props.handleDropChange} />
          <ReportTimeCard customer={customer} 
             handleButtonTask={this.props.handleButtonTask}
             taskData={this.props.taskData}
           selectedCategory={this.props.selectedCategory}
          />
          <ReportDocumentsCard customer={customer} />
        </div>
      </>
    );
  }
}
export default ReportDetailLeft;
