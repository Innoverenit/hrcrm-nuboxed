import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTimeRangeReport,getAllReportInvestors } from "../../ReportAction";

const ReportsAttendenceCard=lazy(()=>import  ("../ReportDetails/ReportsAttendenceCard"));
const ReportsTaskList = lazy(()=>import("../ReportDetails/ReportsTaskList"));
const Requirement=lazy(()=>import ("../MyViewReports/Requirement"));
const Selected=lazy(()=>import ("../OrganizationView/Selected"));
const OrgSelected = lazy(()=>import("../OrganizationView/Selected"));
const OrgRequirement = lazy(()=>import("../OrganizationView/Requirement"));
const ReportsProspectList=lazy(()=>import  ("../../ReportsProspectList"));
const OrdeRepairTab = lazy(()=>import("./OrdeRepairTab"));
const OrdeRepairOrgTab=lazy(()=>import ("./OrdeRepairOrgTab"));
const InvoiceReportUserTab=lazy(()=>import ("./InvoiceReportUserTab"));
const InvoiceReportOrgTab = lazy(()=>import("./InvoiceReportOrgTab"));
const ProductionReportOrgTab = lazy(()=>import("./ProductionReportOrgTab"));
const GSTReportUser=lazy(()=>import  ("./GSTReportUser"));
const GSTReportOrg = lazy(()=>import("./GSTReportOrg"));
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
        <Suspense>
                  {this.props.selectedCategory === "Productivity" && (
    <ReportsAttendenceCard 
    gettingReportProspect={this.props.gettingReportProspect}
    reportProspect={this.props.reportProspect}
    allReportInvestors={this.props.allReportInvestors}
    translateText={this.props.translateText}
    selectedLanguage={this.props.selectedLanguage} />
  )}
              {this.props.selectedCategory === "Prospect" && (
    <ReportsProspectList 
    gettingReportProspect={this.props.gettingReportProspect}
    reportProspect={this.props.reportProspect}
    allReportInvestors={this.props.allReportInvestors} 
    translateText={this.props.translateText}
    selectedLanguage={this.props.selectedLanguage}/>
  )}
            {this.props.selectedCategory === "Task" && (
    <ReportsTaskList 
  
    reportTask={this.props.reportTask}      
    gettingReportTask={this.props.gettingReportTask}
    translateText={this.props.translateText}
    selectedLanguage={this.props.selectedLanguage} />
  )}
   


          {this.props.reportViewType === "ME" && (
            <>
{this.props.selectedCategory === "Orders" && (
   <OrdeRepairTab               
   selectedButtonIcon={this.props.selectedButtonIcon}
   selectedCategory={this.props.selectedCategory}
   translateText={this.props.translateText}
   selectedLanguage={this.props.selectedLanguage}
   />
  )}

  {this.props.selectedCategory === "Invoice" && (
  <InvoiceReportUserTab
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  />
  )}
    {this.props.selectedCategory === "GST" && (
  <GSTReportUser
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  />
  )}
              {selectedReportType === "Requirement" && <Requirement 
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}/>}
              {selectedReportType === "Selected" && <Selected 
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}/>}
            </>
          )}
           {this.props.reportViewType === "ALL" && this.props.userorgflipClick && (
            <>
          {this.props.selectedCategory === "Orders" && (
   <OrdeRepairOrgTab               
   selectedButtonIcon={this.props.selectedButtonIcon}
   selectedCategory={this.props.selectedCategory}
   translateText={this.props.translateText}
   selectedLanguage={this.props.selectedLanguage}
   />
  )}
  {this.props.selectedCategory === "Invoice" && (
  <InvoiceReportOrgTab
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  />
  )}
    {this.props.selectedCategory === "Production" && (
  <ProductionReportOrgTab
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  />
  )}
  {this.props.selectedCategory === "GST" && (
  <GSTReportOrg
  selectedButtonIcon={this.props.selectedButtonIcon}
  selectedCategory={this.props.selectedCategory}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  />
  )}
              {selectedReportType === "Requirement" &&
                <OrgRequirement
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage} />}
              {selectedReportType === "Selected" && <OrgSelected 
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}/>}
               
            </>
          )}
          </Suspense>
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


