import React, {  Suspense, lazy,useState,useEffect } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { setTimeRangeReport,getAllReportInvestors,getReportProspect,getReportTask,getTaskData } from "./ReportAction";
import { bindActionCreators } from "redux";
import ReportsProspectList from "../Reports/ReportsProspectList"
import ReportsCardList from "./Child/ReportsCardList";
const ReportHeader =lazy(()=> import("./Child/ReportHeader"));
const ReportDetails =lazy(()=> import("./Child/ReportDetails/ReportDetails"));
const Requirement =lazy(()=> import("./Child/MyViewReports/Requirement"));
const OrgSelected =lazy(()=> import("./Child/OrganizationView/Selected"));
const OrgRequirement =lazy(()=> import("./Child/OrganizationView/Requirement"));
const Selected =lazy(()=> import("./Child/MyViewReports/Selected"));
const buttonData = [
  { name: 'Task' },
  { name: 'Calls' },
  { name: 'Events'},
  { name: 'Leads' },  
  { name: 'Prospect' },
  { name: 'Contact' },
  { name: 'Quotation'},
  { name: 'Orders' },
  { name: 'Customer'},
  { name: 'Materials In Stock' },
  { name: 'Goods In Stock' },
  { name: 'Production' },  
  { name: 'Productivity' },
  { name: 'Receivables' },
  { name: 'Invoice' },
  { name: 'Credit Memo' },
  { name: 'Investors' },
  { name: 'Deals' },
  { name: 'GST' },

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
  const [userorgflipClick, setuserorgflipClick] = useState(false);

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const handleButtonTask = (data) => {
    setSelectedTask(data);
  };

  const handleButtonIcon = (icon) => {
    setSelectedButtonIcon(icon);
  };

  const UserOrgFlipClick = () => {
    setuserorgflipClick(prevState => !prevState);
  }

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
         <Suspense fallback={<BundleLoader />}>
        <ReportHeader 
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        UserOrgFlipClick={UserOrgFlipClick}
        userorgflipClick={userorgflipClick}
        selectedCategory={selectedCategory}
        handleButtonTask={handleButtonTask}
        selectedButtonIcon={selectedButtonIcon}
        handleButtonIcon={handleButtonIcon}

        />
       
          <ReportDetails
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          reportTask={props.reportTask}         
          gettingReportTask={props.gettingReportTask}
          reportProspect={props.reportProspect}
          gettingReportProspect={props.gettingReportProspect}
          buttonData={buttonData}
          selectedCategory={selectedCategory}
          handleButtonTask={handleButtonTask}
          taskData={props.taskData}
          dropdownOptions={dropdownOptions}
          handleButtonClick={handleButtonClick}
          selectedButtonIcon={selectedButtonIcon}
          handleButtonIcon={handleButtonIcon}
          UserOrgFlipClick={UserOrgFlipClick}
          userorgflipClick={userorgflipClick}
          />
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