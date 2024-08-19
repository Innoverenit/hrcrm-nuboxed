import React, {  Suspense, lazy,useState,useEffect } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { setTimeRangeReport,getAllReportInvestors,getReportProspect,getReportTask,getTaskData } from "./ReportAction";
import { bindActionCreators } from "redux";
import ReportsProspectList from "../Reports/ReportsProspectList"
import ReportsCardList from "./Child/ReportsCardList";
import ReportDetails from "./Child/ReportDetails/ReportDetails";
const ReportHeader =lazy(()=> import("./Child/ReportHeader"));
const Requirement =lazy(()=> import("./Child/MyViewReports/Requirement"));
const OrgSelected =lazy(()=> import("./Child/OrganizationView/Selected"));
const OrgRequirement =lazy(()=> import("./Child/OrganizationView/Requirement"));
const Selected =lazy(()=> import("./Child/MyViewReports/Selected"));
const buttonData = [
  { name: 'Task' },
  { name: 'Prospect' },
  { name: 'Investors' },
  { name: 'Orders' },
  { name: 'Production' },
  { name: 'Receivables' },
  { name: 'Productivity' },
];

const dropdownOptions = {
  Task: ['Option 1', 'Option 2', 'Option 3'],
  Prospect: ['Option A', 'Option B', 'Option C'],
  Investors: ['Investor 1', 'Investor 2', 'Investor 3'],
  Orders: ['Order X', 'Order Y', 'Order Z'],
  Production: ['Product 1', 'Product 2', 'Product 3'],
  Receivables: ['Receivable A', 'Receivable B', 'Receivable C'],
  Productivity: ['Receivable A', 'Receivable B', 'Receivable C'],
};
function Reports (props){

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedButtonIcon, setSelectedButtonIcon] = useState("");

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const handleButtonTask = (data) => {
    setSelectedTask(data);
  };

  const handleButtonIcon = (icon) => {
    setSelectedButtonIcon(icon);
  };

console.log(selectedTask)
  useEffect(()=> {
    if (selectedCategory==="Prospect") {
   props.getReportProspect(props.userId,props.startDate,props.endDate);
    }else if(selectedCategory==="Task"){
      props.getReportTask(props.userId,props.startDate,props.endDate,selectedTask);
    }

    props.getTaskData(props.organizationId)
    // else {
    //   props.getReportProspect(props.userId,props.startDate,props.endDate);
    // }
  },[props.userId,props.startDate,props.endDate]);


  // handleButtonClick = (category) => {
  //   this.setState({ selectedCategory: category });
  // };
 


 
  // componentDidMount() {
  //   const { setTimeRangeReport, todayStartDate, todayEndDate } = this.props;
  //   setTimeRangeReport(todayStartDate, todayEndDate);
  // }
  
   
 
    // const { reportViewType, selectedReportType, selectedSubReportType } = this.props;
    // console.log("selectedSubReportType", selectedSubReportType, selectedReportType)
    return (
      <React.Fragment>
        <ReportHeader 
        // handleDropChange={handleDropChange}
        // handleIconClick={this.handleIconClick}
        // activeIcon={this.state.activeIcon}
        // dropdownData={this.state.dropdownData}
        selectedCategory={selectedCategory}
        handleButtonTask={handleButtonTask}
        selectedButtonIcon={selectedButtonIcon}
        handleButtonIcon={handleButtonIcon}

        />
        <Suspense fallback={<BundleLoader />}>
          <ReportDetails
          reportTask={props.reportTask}
         
          gettingReportTask={props.gettingReportTask}
          reportProspect={props.reportProspect}
          gettingReportProspect={props.gettingReportProspect}
          buttonData={buttonData}
          selectedCategory={selectedCategory}
          handleButtonTask={handleButtonTask}
          taskData={props.taskData}

          dropdownOptions={dropdownOptions}
          // handleSelectChange={handleSelectChange}
          handleButtonClick={handleButtonClick}
          selectedButtonIcon={selectedButtonIcon}
          handleButtonIcon={handleButtonIcon}
          />
        {/* {selectedCategory === "Prospect" && (
    <ReportsProspectList 
    // allReportInvestors={this.props.allReportInvestors} 
    />
  )} */}
          {/* {reportViewType === "ME" && (
            <>

              {selectedReportType === "Requirement" && <Requirement />}
              {selectedReportType === "Selected" && <Selected />}
            </>
          )}
          {reportViewType === "ALL" && (
            <>

              {selectedReportType === "Requirement" &&
                <OrgRequirement />}
              {selectedReportType === "Selected" && <OrgSelected />}
            </>
          )} */}
        </Suspense>
      </React.Fragment>
    );
  }

const mapStateToProps = ({ auth, report }) => ({
  reportViewType: report.reportViewType,
  orgId:auth.userDetails.organizationId,
  allReportInvestors:report.allReportInvestors,
  selectedReportType: report.selectedReportType,
  timeRangeType:report.timeRangeType,
  reportProspect:report.reportProspect,
  taskData:report.taskData,
  gettingReportProspect:report.gettingReportProspect,

  userId:auth.userDetails.userId,
  organizationId:auth.userDetails.organizationId,
  gettingReportTask:report.gettingReportTask,
  reportTask:report.reportTask,
  startDate: report.startDate,
  endDate: report.endDate,
  fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
  fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
  selectedSubReportType: report.selectedSubReportType
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTimeRangeReport,
      getTaskData,
      getAllReportInvestors,
      getReportProspect,
      getReportTask
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reports);






















// import React, { useEffect, Suspense,useState, lazy } from "react";
// import { BundleLoader } from "../../Components/Placeholder";
// import { connect } from "react-redux";
// import { setTimeRangeReport,getAllReportInvestors } from "./ReportAction";
// import { bindActionCreators } from "redux";
// import ReportsCardList from "./Child/ReportsCardList";

// const ReportHeader = lazy(() => import("./Child/ReportHeader"));
// const Requirement = lazy(() => import("./Child/MyViewReports/Requirement"));
// const OrgSelected = lazy(() => import("./Child/OrganizationView/Selected"));
// const OrgRequirement = lazy(() => import("./Child/OrganizationView/Requirement"));
// const Selected = lazy(() => import("./Child/MyViewReports/Selected"));

// const Reports = ({
//   setTimeRangeReport,
//   getAllReportInvestors,
//   orgId,
//   allReportInvestors,
//   todayStartDate,
//   todayEndDate,
//   reportViewType,
//   selectedReportType,
//   selectedSubReportType,
// }) => {
//   handleIconClick = (iconKey) => {
//     this.setState({ activeIcon: iconKey });
//   };
  
//   const [currentUser, setCurrentUser] = useState("");
//   const handleDropChange = (value) => {
//     setCurrentUser(value);
//     getAllReportInvestors(orgId);
//   };
//   useEffect(() => {
//     setTimeRangeReport(todayStartDate, todayEndDate);
//   }, [setTimeRangeReport, todayStartDate, todayEndDate]);

//   return (
//     <>
//       <ReportHeader   handleDropChange={handleDropChange}/>
//       <Suspense fallback={<BundleLoader />}>
//       {reportViewType === "table" ? (
//           <ReportsCardList 
//           allReportInvestors={allReportInvestors} />
//         ) : null}
//         {reportViewType === "ME" && (
//           <>
//             {selectedReportType === "Requirement" && <Requirement />}
//             {selectedReportType === "Selected" && <Selected />}
//           </>
//         )}
//         {reportViewType === "ALL" && (
//           <>
//             {selectedReportType === "Requirement" && <OrgRequirement />}
//             {selectedReportType === "Selected" && <OrgSelected />}
//           </>
//         )}
//       </Suspense>
//     </>
//   );
// };

// const mapStateToProps = ({ auth, report }) => ({
//   reportViewType: report.reportViewType,
//   allReportInvestors:report.allReportInvestors,
//   orgId:auth.userDetails.organizationId,
//   selectedReportType: report.selectedReportType,
//   fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
//   fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
//   selectedSubReportType: report.selectedSubReportType,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setTimeRangeReport,
//       getAllReportInvestors,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(Reports);
