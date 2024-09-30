import React, { Component } from "react";
import ReportActionRight from "../ReportActionRight";
import ReportDocumentsCard from "./ReportDocumentsCard";
class ReportTimeView extends Component {
  render() {
    return (
      <>
     <div className=" flex flex-row">
        <div class=" flex items-center w-[90%] justify-between flex-no-wrap m-2">
          <ReportActionRight 
             handleButtonTask={this.props.handleButtonTask}
             taskData={this.props.taskData}
           selectedCategory={this.props.selectedCategory}
          />

        </div>
        <div>
        <ReportDocumentsCard  />
        </div>
        </div>
      </>
    );
  }
}
export default ReportTimeView;

const ReportItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate ml-8">
        {value}
      </div>
    </div>
  );
};