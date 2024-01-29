import React, { lazy, Suspense, useState, } from "react";
import {
   getProcessForRecruit,
    dataClear,
} from "../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const RecruitmentActionLeft = lazy(() => import("./RecruitmentActionLeft"));
const RecruitmentActionRight = lazy(() => import("./RecruitmentActionRight"));
const Matrix = lazy(() => import("../Recruitement/Child/RecruitmentTab/Matrix"));
const Template = lazy(() => import("../../Template/Template"));
const Access = lazy(() => import("./Child/Access/Access"));
const General = lazy(() => import("./Child/General/General"));
const Form = lazy(() => import("./Child/RecruitmentTab/FormTab"));
 const WorkFlow = lazy(() => import("./Child/RecruitmentTab/WorkFlowTab"));
const SkillsTab = lazy(() => import("../Library/SkillsTab"));
const ApprovalTab = lazy(() => import("./Child/Approval/ApprovalTab"));
const SettingsHolidayTab = lazy(() => import("./Child/Holiday/SettingsHolidayTab"));
const LeadsTab = lazy(() => import("../../Rules/Child/RulesTab/LeadsTab"));
const DistributionTab = lazy(() => import("./Child/DistributionTab/DistributionTab"));
const FinanceTab = lazy(() => import("./Child/FinanceTab/FinanceTab"));
const ReportScheduler = lazy(() =>
  import("../Recruitement/Child/ReportScheduler/ReportScheduler")
);
const NotificationToggleForm =lazy(()=>import("./Child/RecruitmentTab/ToggleNotify/NotificationToggleForm"));

function Recruitment(props) {
  const name = [

    {
      rulesName: "Access",
      ruleId: "1",
      component: <Access />,
    },
    {
      rulesName: "Approval",
      ruleId: "2",
      component: <ApprovalTab />,
    },
    {
      rulesName: "Automation",
      ruleId: "3",
      component: <DistributionTab />,
    },
    {
      rulesName: "Form",
      ruleId: "4",
      component: <Form/>,
    },
    
    {
      rulesName: "General",
      ruleId: "5",
      component: <General/>,
    },
    {
      rulesName: "Holidays & Leaves",
      ruleId: "6",
      component: <SettingsHolidayTab />,
    },
    // {
    //   rulesName: "Notification",
    //   ruleId: "15",
    //   component: <NotificationsTab />,
    // },
    
    {
      rulesName: "Report Scheduler",
      ruleId: "7",
      component: <ReportScheduler />,
    },
    // {
    //   rulesName: "Rules",
    //   ruleId: "8",
    //   component: <LeadsTab />,
    // },
    {
      rulesName: "Skills and Certifications",
      ruleId: "9",
      component: <SkillsTab/>,
    },
    {
      rulesName: "Template",
      ruleId: "10",
      component: <Template />,
    },
    {
      rulesName: "Workflow",
      ruleId: "11",
       component: <WorkFlow/>,
    },
    {
      rulesName: "Finance",
      ruleId: "12",
      component: <FinanceTab/>,
    },
    {
      rulesName: "Matrix",
      ruleId: "13",
      component: <Matrix/>,
    },
   {
      rulesName: "Notification",
      ruleId: "14",
      component: <NotificationToggleForm />,
    },
    // {
    //   rulesName: "Automation",
    //   ruleId: "2",
    //   component: <RecruitTab />,
    // },
    // {
    //   rulesName: "Search",
    //   ruleId: "3",
    //   component: <SeachTab />,
    // },
    // {
    //   rulesName: "Sourcing",
    //   ruleId: "5",
    //   component: <IndeedForm />,
    // },
    
    

    // {
    //   rulesName: "Monetize",
    //   ruleId: "9",
    //   component: <ThirdPartyAccess />,
    // },
   
    

    // {
    //   rulesName: "Compliance",
    //   ruleId: "13",
    //   component: <ComplianceForm />,
    // },
    // {
    //   rulesName: "Commission",
    //   ruleId: "7",
    //   component: <Commission/>,
    // },
    
    
    // {
    //   rulesName: "Assessment",
    //   ruleId: "16",
    //   component: <AssessmentTab />,
    // },
    

    
   
    
 
     ];
  const [rules, setRules] = useState(name);
  const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);
  const [recruitProAdvance, setRecruitProAdvance] = useState(
  props.advanceRecruitmentInd
  );
  const handleRuleClick = (item) => {
    setCurrentRulesOpen(item);
    props.dataClear();
  };
  // function handleRecruitProAdvance(checked) {
  //   props.enableRecruitmentAdvance(props.recruitmentDetailsId);
  // }
  // useEffect(() => {
  //   setRecruitProAdvance(props.advanceRecruitInd);
  // }, [props.advanceRecruitInd]);
  //gfgfghvfghvf

  return (
    <div>
      <div class=" flex ">
        {/* <Suspense fallback={"Loading..."}> */}
        <div class=" flex flex-no-wrap w-full ">
            <div class=" w-[24%]">
              <RecruitmentActionLeft
                handleRuleClick={handleRuleClick}
                rules={rules}
                currentRulesOpen={currentRulesOpen}
                // recruitProAdvance={recruitProAdvance}
                // handleRecruitProAdvance={handleRecruitProAdvance}
              />
            </div>
            <Suspense 
            // fallback={"Loading..."}
            >
            <div class=" w-[74%]" >
            
              <RecruitmentActionRight current={currentRulesOpen} />
            </div>
            </Suspense>
          </div>
        {/* </Suspense> */}
      </div>
      {/* )} */}
    </div>
  );
}
const mapStateToProps = ({ settings, auth }) => ({
  recruitmentDetailsId:
    auth.userDetails && auth.userDetails.recruitmentDetailsId,
    organizationId: auth.userDetails && auth.userDetails.organizationId,
  advanceRecruitInd:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.advanceRecruitInd,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getProcessForRecruit,
         dataClear,
        //  enableRecruitmentAdvance
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Recruitment);
