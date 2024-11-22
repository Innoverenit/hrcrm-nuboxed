import React, { lazy, Suspense, useState, } from "react";
import {
   getProcessForRecruit,
    dataClear,
} from "../SettingsAction";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'; 
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ShareIcon from '@mui/icons-material/Share';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import RecruitTab from "../../Rules/Child/RulesTab/RecruitPro/RecruitTab";
const SalaryTab = lazy(() => import("./Child/Salary/SalaryTab"));
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
const ThirdParty= lazy(() => import("./Child//thirdparty/ThirdParty"));
const FinanceTab = lazy(() => import("./Child/FinanceTab/FinanceTab"));
const ReportScheduler = lazy(() =>
  import("../Recruitement/Child/ReportScheduler/ReportScheduler")
);
const NotificationToggleForm =lazy(()=>import("./Child/RecruitmentTab/ToggleNotify/NotificationToggleForm"));

function Recruitment(props) {
  const name = [

    {
       rulesName:(
        <span>
          <DesktopAccessDisabledIcon className=" !text-icon text-[#D00000]" />Access
        </span>
      ),
      ruleId: "1",
      component: <Access />,
    },
    {
       rulesName:(
        <span>
          <LibraryAddCheckIcon className=" !text-icon text-[#A7C957]" />Approval
        </span>
      ),
      ruleId: "2",
      component: <ApprovalTab />,
    },
    {
      rulesName:(
        <span>
          <BrightnessAutoIcon className=" !text-icon text-[#B5E2FA]" />Automation
        </span>
      ),
     
      ruleId: "3",
      component: <DistributionTab />,
    },
    {
      rulesName:(
        <span>
          <FormatShapesIcon className=" !text-icon text-[#0FA3B1]" />Form
        </span>
      ),
   
      ruleId: "4",
      component: <Form
      translateText={props.translateText}
                           selectedLanguage={props.selectedLanguage}
      />,
    },
    
    {
      rulesName:(
      <span>
      <AspectRatioIcon className=" !text-icon text-[#432818]" />General
    </span>
  ),
     
      ruleId: "5",
      component: <General/>,
    },
    {
      rulesName:(
        <span>
        <i class="fas fa-luggage-cart mr-1 text-[#e4eb3f] "></i>Holidays & Leaves
      </span>
    ),
      ruleId: "6",
      component: <SettingsHolidayTab />,
    },
    // {
    //   rulesName: "Notification",
    //   ruleId: "15",
    //   component: <NotificationsTab />,
    // },
    
    {
      rulesName:(
        <span>
        <WorkHistoryIcon className=" !text-icon mr-1 text-[#6F1D1B]" />Report Scheduler
      </span>
    ),
     
      ruleId: "7",
      component: <ReportScheduler />,
    },
    // {
    //   rulesName: "Rules",
    //   ruleId: "8",
    //   component: <LeadsTab />,
    // },
    {
      rulesName:(
        <span>
        <WorkspacePremiumIcon className=" !text-icon text-[#C9ADA7]" />Skills & Certification
      </span>
    ),
    
      ruleId: "9",
      component: <SkillsTab/>,
    },
    {
      rulesName:(
        <span>
        <SpaceDashboardIcon className=" !text-icon text-[#22223B]" />Template
      </span>
    ), 
      ruleId: "10",
      component: <Template />,
    },
    {
   rulesName:(
        <span>
        <ShareIcon className=" !text-icon text-[#390099]" />Workflow
      </span>
    ), 
      ruleId: "11",
       component: <WorkFlow/>,
    },
    {
    rulesName:(
        <span>
        <HourglassFullIcon className=" !text-icon text-[#DC2F02]" />Finance
      </span>
    ),
      ruleId: "12",
      component: <FinanceTab/>,
    },
    {
      rulesName:(
        <span>
        <EngineeringIcon className=" !text-icon text-[#6A994E]" />Labour Cost
      </span>
    ),
     
      ruleId: "13",
      component: <Matrix/>,
    },
   {
    rulesName:(
      <span>
      <CircleNotificationsIcon className=" !text-icon text-[#FFD60A]" />Notification
    </span>
  ),
     
      ruleId: "14",
      component: <NotificationToggleForm />,
    },
    {
      rulesName:(
        <span>
        <PaymentsIcon className=" !text-icon text-[#003566]" />Pay Roll(Only for GCC)
      </span>
    ),
      ruleId: "15",
      component: <SalaryTab />,
    },
     {
      rulesName:(
        <span>
        <HourglassFullIcon className=" !text-icon text-[#D8E2DC]" />Automation1
      </span>
    ),
      ruleId: "21",
      component: <RecruitTab/>,
    },
    
    {
      rulesName:(
        <span>
        <SettingsInputCompositeIcon className=" !text-icon text-[#9D8189] " />3rd Party Integration
      </span>
    ),
   
      ruleId: "22",
      component: <ThirdParty />,
    },
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
            <div class=" w-[76%]" >
            
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
