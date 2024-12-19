import React, { lazy, Suspense, useState } from "react";
import { getProcessForRecruit, dataClear } from "../SettingsAction";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
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
import HouseboatIcon from '@mui/icons-material/Houseboat';
import RecruitTab from "../../Rules/Child/RulesTab/RecruitPro/RecruitTab";
const SalaryTab = lazy(() => import("./Child/Salary/SalaryTab"));
const RecruitmentActionLeft = lazy(() => import("./RecruitmentActionLeft"));
const RecruitmentActionRight = lazy(() => import("./RecruitmentActionRight"));
const Matrix = lazy(() =>
  import("../Recruitement/Child/RecruitmentTab/Matrix")
);
const Template = lazy(() => import("../../Template/Template"));
const Access = lazy(() => import("./Child/Access/Access"));
const General = lazy(() => import("./Child/General/General"));
const Form = lazy(() => import("./Child/RecruitmentTab/FormTab"));
const WorkFlow = lazy(() => import("./Child/RecruitmentTab/WorkFlowTab"));
const SkillsTab = lazy(() => import("../Library/SkillsTab"));
const ApprovalTab = lazy(() => import("./Child/Approval/ApprovalTab"));
const SettingsHolidayTab = lazy(() =>
  import("./Child/Holiday/SettingsHolidayTab")
);
const LeadsTab = lazy(() => import("../../Rules/Child/RulesTab/LeadsTab"));
const DistributionTab = lazy(() =>
  import("./Child/DistributionTab/DistributionTab")
);
const ThirdParty = lazy(() => import("./Child//thirdparty/ThirdParty"));
const FinanceTab = lazy(() => import("./Child/FinanceTab/FinanceTab"));
const ReportScheduler = lazy(() =>
  import("../Recruitement/Child/ReportScheduler/ReportScheduler")
);
const NotificationToggleForm = lazy(() =>
  import("./Child/RecruitmentTab/ToggleNotify/NotificationToggleForm")
);

function Recruitment(props) {
  const name = [
    {
      rulesName: (
        <span>
          <DesktopAccessDisabledIcon className=" !text-icon text-[#D00000] mr-2" />
          Access
        </span>
      ),
      ruleId: "1",
      component: <Access />,
    },
    {
      rulesName: (
        <span>
          <LibraryAddCheckIcon className=" !text-icon text-[#A7C957] mr-2" />
          Approval
        </span>
      ),
      ruleId: "2",
      component: <ApprovalTab />,
    },
    {
      rulesName: (
        <span>
          <BrightnessAutoIcon className=" !text-icon text-[#B5E2FA] mr-2" />
          Automation
        </span>
      ),

      ruleId: "3",
      component: <DistributionTab />,
    },
    {
      rulesName: (
        <span>
          <FormatShapesIcon className=" !text-icon text-[#0FA3B1] mr-2" />
          Form
        </span>
      ),
      ruleId: "4",
      component: (
        <Form
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
      ),
    },
    {
      rulesName: (
        <span>
        <HouseboatIcon className=" !text-icon mr-2 text-[#6F1D1B]"/>Holidays & Leaves
      </span>
    ),
      ruleId: "6",
      component: <SettingsHolidayTab />,
    },
    {
      rulesName: (
        <span>
          <WorkHistoryIcon className=" !text-icon mr-2 text-[#6F1D1B]" />
          Report Scheduler
        </span>
      ),

      ruleId: "7",
      component: <ReportScheduler />,
    },
    {
      rulesName: (
        <span>
          <WorkspacePremiumIcon className=" !text-icon text-[#C9ADA7] mr-2" />
          Skills & Certification
        </span>
      ),

      ruleId: "9",
      component: <SkillsTab />,
    },
    {
      rulesName: (
        <span>
          <SpaceDashboardIcon className=" !text-icon text-[#22223B] mr-2" />
          Template
        </span>
      ),
      ruleId: "10",
      component: <Template />,
    },
    {
      rulesName: (
        <span>
          <ShareIcon className=" !text-icon text-[#390099] mr-2" />
          Workflow
        </span>
      ),
      ruleId: "11",
      component: <WorkFlow />,
    },
    {
      rulesName: (
        <span>
          <HourglassFullIcon className=" !text-icon text-[#DC2F02] mr-2" />
          Finance
        </span>
      ),
      ruleId: "12",
      component: <FinanceTab />,
    },
    {
      rulesName: (
        <span>
          <EngineeringIcon className=" !text-icon text-[#6A994E] mr-2" />
          Labour Cost
        </span>
      ),

      ruleId: "13",
      component: <Matrix />,
    },
    {
      rulesName: (
        <span>
          <CircleNotificationsIcon className=" !text-icon text-[#FFD60A] mr-2" />
          Notification
        </span>
      ),

      ruleId: "14",
      component: <NotificationToggleForm />,
    },
    {
      rulesName: (
        <span>
          <PaymentsIcon className=" !text-icon text-[#003566] mr-2" />
          Pay Roll(Only for GCC)
        </span>
      ),
      ruleId: "15",
      component: <SalaryTab />,
    },
    {
      rulesName: (
        <span>
          <HourglassFullIcon className=" !text-icon text-[#D8E2DC] mr-2" />
          Automation1
        </span>
      ),
      ruleId: "21",
      component: <RecruitTab />,
    },

    {
      rulesName: (
        <span>
          <SettingsInputCompositeIcon className=" !text-icon text-[#9D8189] mr-2" />
          3rd Party Integration
        </span>
      ),
      ruleId: "22",
      component: <ThirdParty />,
    },
  ];

  const [rules, setRules] = useState(name);
  // const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);
  const [recruitProAdvance, setRecruitProAdvance] = useState( props.advanceRecruitmentInd);
  
  const { user } = props;

  const filteredTabs = name.filter((tab) => {
    switch (tab.rulesName.props.children[1]) {
     
      case "Labour Cost":
        return user.moduleMapper.erpInd && user.moduleMapper.productionInd || user.moduleMapper.repairInd;
    
      case "Pay Roll(Only for GCC)":
        return user.moduleMapper.hrInd;
     
      default:
        return true;
    }
  });

  const [currentRulesOpen, setCurrentRulesOpen] = useState(filteredTabs[0]);

  const handleRuleClick = (item) => {
    setCurrentRulesOpen(item);
    props.dataClear();
  };

  return (
    <div>
      <div class=" flex ">
        <div class=" flex flex-no-wrap w-full ">
          <div class=" w-[24%]">
            <RecruitmentActionLeft
              handleRuleClick={handleRuleClick}
              rules={filteredTabs}
              currentRulesOpen={currentRulesOpen}
            />
          </div>
          <Suspense>
            <div class=" w-[76%]">
              <RecruitmentActionRight current={currentRulesOpen} />
            </div>
          </Suspense>
        </div>
      </div>
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
    user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForRecruit,
      dataClear,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Recruitment);
