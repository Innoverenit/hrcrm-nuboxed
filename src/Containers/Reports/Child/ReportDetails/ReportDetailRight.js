import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReportsAttendenceCard from "../ReportDetails/ReportsAttendenceCard"
import ReportsTaskList from "../ReportDetails/ReportsTaskList"
import Requirement from "../MyViewReports/Requirement";
import Selected from "../OrganizationView/Selected";
import OrgSelected from "../OrganizationView/Selected";
import OrgRequirement from "../OrganizationView/Requirement";
import { setTimeRangeReport,getAllReportInvestors } from "../../ReportAction";
import ReportsProspectList from "../../ReportsProspectList";
import OrdeRepairTab from "./OrdeRepairTab";
import OrdeRepairOrgTab from "./OrdeRepairOrgTab";
import InvoiceReportUserTab from "./InvoiceReportUserTab";
import InvoiceReportOrgTab from "./InvoiceReportOrgTab";
import ProductionReportOrgTab from "./ProductionReportOrgTab";
import GSTReportUser from "./GSTReportUser";
import GSTReportOrg from "./GSTReportOrg";
class ReportDetailRight extends Component {

    state = {
        currentUser: "",
        dropdownData: {
          investorTypes: ["Investor List","Investor all contacts","All Deals","Open Deals","Closed Deals","Pitch"],
          prospectTypes: ["Prospect List","Prospect all contacts","All Opportunities","Open Opportunities","Closed Opportunities","Pitch"],
          hrTypes: ["Employee","Suspended Employee","All Attendedance","Expenses","Mileages","Leaves"],
          recruitProType: ["Requirement", "Selected"],
          // Add more icons and corresponding items as needed
        },
        activeIcon: null,
      };
        handleIconClick = (iconKey) => {
        this.setState({ activeIcon: iconKey });
      };
      handleDropChange = (value) => {
        this.setState({ currentUser: value });
        this.getAllReportInvestors(this.props.orgId);
      };
      componentDidMount() {
        const { setTimeRangeReport, todayStartDate, todayEndDate } = this.props;
        setTimeRangeReport(todayStartDate, todayEndDate);
      }
  render() {
    const { reportViewType, selectedReportType, selectedSubReportType } = this.props;
    console.log("selectedSubReportType", selectedSubReportType, selectedReportType)
    console.log("lkj",this.props.customer,this.props.reportViewType,this.props.userorgflipClick);
    return (
      <div class=" w-full">
                  {this.props.selectedCategory === "Productivity" && (
    <ReportsAttendenceCard 
    gettingReportProspect={this.props.gettingReportProspect}
    reportProspect={this.props.reportProspect}
    allReportInvestors={this.props.allReportInvestors} />
  )}
              {this.props.selectedCategory === "Prospect" && (
    <ReportsProspectList 
    gettingReportProspect={this.props.gettingReportProspect}
    reportProspect={this.props.reportProspect}
    allReportInvestors={this.props.allReportInvestors} />
  )}
            {this.props.selectedCategory === "Task" && (
    <ReportsTaskList 
  
    reportTask={this.props.reportTask}      
    gettingReportTask={this.props.gettingReportTask} />
  )}
   


          {this.props.reportViewType === "ME" && (
            <>
{this.props.selectedCategory === "Orders" && (
   <OrdeRepairTab               
   selectedButtonIcon={this.props.selectedButtonIcon}
   selectedCategory={this.props.selectedCategory}
   />
  )}

  {this.props.selectedCategory === "Invoice" && (
  <InvoiceReportUserTab
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  />
  )}
    {this.props.selectedCategory === "GST" && (
  <GSTReportUser
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  />
  )}
              {selectedReportType === "Requirement" && <Requirement />}
              {selectedReportType === "Selected" && <Selected />}
            </>
          )}
           {this.props.reportViewType === "ALL" && this.props.userorgflipClick && (
            <>
          {this.props.selectedCategory === "Orders" && (
   <OrdeRepairOrgTab               
   selectedButtonIcon={this.props.selectedButtonIcon}
   selectedCategory={this.props.selectedCategory}
   />
  )}
  {this.props.selectedCategory === "Invoice" && (
  <InvoiceReportOrgTab
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  />
  )}
    {this.props.selectedCategory === "Production" && (
  <ProductionReportOrgTab
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  />
  )}
  {this.props.selectedCategory === "GST" && (
  <GSTReportOrg
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  />
  )}
              {selectedReportType === "Requirement" &&
                <OrgRequirement />}
              {selectedReportType === "Selected" && <OrgSelected />}
            </>
          )}
      </div>
    );
  }
}
const mapStateToProps = ({auth, report }) => ({
    reportViewType: report.reportViewType,
    orgId:auth.userDetails.organizationId,
    allReportInvestors:report.allReportInvestors,
    selectedReportType: report.selectedReportType,
    fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
    fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
    selectedSubReportType: report.selectedSubReportType
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    setTimeRangeReport,
    getAllReportInvestors,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportDetailRight);


