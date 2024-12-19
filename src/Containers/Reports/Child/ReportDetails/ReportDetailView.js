import { Badge, Button, Tooltip } from "antd";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Select } from 'antd';
const { Option } = Select;

class ReportDetailView extends Component {
  render() {
    const {
        reportTypes,
        buttonData,
        handleIconClick,
        reportType,
        investorTypes,
        selectedReportType,
        dateRangeList,
        reportViewType,
        setReportViewType,
        setTimeRangeReport,
        setSelectedReportType,
        setSelectedTimeIntervalReport,
        role,
        user,
        activeIcon,
        dropdownData,
        selectedSubReportType,
        reportOpportunitySubTypes,
        reportRequirementSubTypes,
        setSubSelectedReportType,
        reportTaskSubTypes,
        reportMileageSubTypes,
        visibilityConditions,
      } = this.props;

    return (
      <>
             <span class="cursor-pointer ml-2"
             style={{display:"ruby"}}>
 {buttonData.filter(button => visibilityConditions[button.name])
 .map((button, index) => (

        <div key={index} className=" m-1 mb-2">

          <Button style={{backgroundColor:this.props.selectedCategory === button.name ? "tomato":"",
            color:this.props.selectedCategory === button.name ? "white":""
           }}
          onClick={() => this.props.handleButtonClick(button.name)} >
            {button.name}
            </Button>
         
        </div>
      ))}
        </span>


      </>
    );
  }
}
const mapStateToProps = ({ report, auth }) => ({
    reportTypes: report.reportTypes,
    investorTypes:report.investorTypes,
    role: auth.userDetails.role,
    user: auth.userDetails,
    reportType: report.reportType,
    reportTypes: report.reportTypes,
    dateRangeList: report.dateRangeList,
    reportViewType: report.reportViewType,
    selectedReportType: report.selectedReportType,
    selectedSubReportType: report.selectedSubReportType,
    reportOpportunitySubTypes: report.reportOpportunitySubTypes,
    reportRequirementSubTypes: report.reportRequirementSubTypes,
    reportMileageSubTypes: report.reportMileageSubTypes,
    reportTaskSubTypes: report.reportTaskSubTypes,
    reportTaskSubTypes: report.reportTaskSubTypes,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {

      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailView);
  

const ReportItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-row w-[95%] justify-between flex-no-wrap m-2">
     <div class=" text-[#444] font-semibold" >{label}</div>
     <div className="overflow-hidden truncate ml-8">
       {value}
   </div>
    </div>
  );
};