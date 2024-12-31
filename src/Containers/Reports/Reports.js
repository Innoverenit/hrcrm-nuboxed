import React, {  Suspense, lazy,useState,useEffect } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { setTimeRangeReport,getAllReportInvestors,getReportProspect,getReportTask,getTaskData,getReportLeads,getReportLeadsOrg, 
  getReportConvertedOrg,getReportConverted,
  getReportCallOrg,
  getReportCall

} from "./ReportAction";
import { bindActionCreators } from "redux";

const ReportHeader =lazy(()=> import("./Child/ReportHeader"));
const ReportDetails =lazy(()=> import("./Child/ReportDetails/ReportDetails"));

const buttonData = [
  // {name: translatedMenuItems[4]},
  { name: 'Task' },
  { name: 'Calls' },
  { name: 'Events'},
  { name: 'Leads Generated' },  
  { name: 'Leads Converted' },  
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
   props.getReportProspect(props.userId,props.endDate,props.startDate);
    }else if(selectedCategory==="Task"){
      props.getReportTask(props.userId,props.endDate,props.startDate,selectedTask);
    }else if(selectedCategory==="Leads Generated"){
      if (userorgflipClick) {
        props.getReportLeadsOrg(props.orgId,props.endDate,props.startDate);
      } else {
        props.getReportLeads(props.userId,props.endDate,props.startDate);
      }
    }else if(selectedCategory==="Leads Converted"){
      if (userorgflipClick) {
        props.getReportConvertedOrg(props.orgId,props.endDate,props.startDate);
      } else {
        props.getReportConverted(props.userId,props.endDate,props.startDate);
      }
    }
    else if(selectedCategory==="Calls"){
      if (userorgflipClick) {
        props.getReportCallOrg(props.orgId,props.endDate,props.startDate);
      } else {
        props.getReportCall(props.userId,props.endDate,props.startDate);
      }
    }

    props.getTaskData(props.organizationId)
    // else {
    //   props.getReportProspect(props.userId,props.endDate,props.startDate);
    // }
  },[props.userId,props.endDate,props.startDate]);


  // handleButtonClick = (category) => {
  //   this.setState({ selectedCategory: category });
  // };
 


 
  // componentDidMount() {
  //   const { setTimeRangeReport, todayStartDate, todayEndDate } = this.props;
  //   setTimeRangeReport(todayStartDate, todayEndDate);
  // }
  
   
 
    // const { reportViewType, selectedReportType, selectedSubReportType } = this.props;
    // console.log("selectedSubReportType", selectedSubReportType, selectedReportType)
   
    const visibilityConditions = {
      Task: props.user.basicAccessInd || props.user.role === "ADMIN",
      Calls: props.user.basicAccessInd || props.user.role === "ADMIN",
      Events: props.user.basicAccessInd || props.user.role === "ADMIN",
      'Leads Generated': props.user.leadsAccessInd && props.user.crmInd,  
      'Leads Converted': props.user.leadsAccessInd && props.user.crmInd,  
      Prospect: props.user.customerAccessInd && props.user.crmInd, 
      Contact: props.user.contactAccessInd && props.user.crmInd,
      Quotation: props.user.opportunityAccessInd && props.user.crmInd,
      Orders: props.user.orderAccessInd && props.user.erpInd,
      Customer: props.user.accountAccessInd && props.user.erpInd,
      'Materials In Stock': props.user.materialAccessInd && props.user.erpInd,
      'Goods In Stock': true,
      Production: props.user.productionAccessInd && props.user.productionInd,
      Productivity: true,
      Receivables: true,
      Invoice: props.user.department === "Management",
      'Credit Memo': true,
      Investors: props.user.investorContactAccessInd && props.user.imInd,
      Deals: props.user.dealAccessInd && props.user.imInd,
      GST: true,
    };
   
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
          reportLeads={props.reportLeads}
          reportLeadsOrg={props.reportLeadsOrg}
          reportConvertedOrg={props.reportConvertedOrg}
          gettingReportConvertOrg={props.gettingReportConvertOrg}
          gettingReportConvert={props.gettingReportConvert}
          reportConverted={props.reportConverted}
          gettingReportLeadsOrg={props.gettingReportLeadsOrg}
          gettingReportLeads={props.gettingReportLeads}
          reportCall={props.reportCall}
          gettingReportCall={props.gettingReportCall}
          reportCallOrg={props.reportCallOrg}
          gettingReportCallOrg={props.gettingReportCallOrg}
          buttonData={buttonData}
          visibilityConditions={visibilityConditions}
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
  reportLeads:report.reportLeads,
  gettingReportLeads:report.gettingReportLeads,
  taskData:report.taskData,
  gettingReportProspect:report.gettingReportProspect,
  user: auth.userDetails,
  userId:auth.userDetails.userId,
  organizationId:auth.userDetails.organizationId,
  gettingReportTask:report.gettingReportTask,
  reportTask:report.reportTask,
  startDate: report.startDate,
  endDate: report.endDate,
  fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
  fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
  selectedSubReportType: report.selectedSubReportType,
  reportLeadsOrg:report.reportLeadsOrg,
  gettingReportLeadsOrg:report.gettingReportLeadsOrg,
  reportConvertedOrg:report.reportConvertedOrg,
  gettingReportConvertOrg:report.gettingReportConvertOrg,
  gettingReportConvert:report.gettingReportConvert,
  reportConverted:report.reportConverted,
  reportCall:report.reportCall,
  gettingReportCall:report.gettingReportCall,
  reportCallOrg:report.reportCallOrg,
  gettingReportCallOrg:report.gettingReportCallOrg,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTimeRangeReport,
      getTaskData,
      getAllReportInvestors,
      getReportProspect,
      getReportTask,
      getReportLeads,
      getReportLeadsOrg,
      getReportConvertedOrg,
      getReportConverted,
      getReportCallOrg,
      getReportCall

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reports);