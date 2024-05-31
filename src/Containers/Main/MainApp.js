import React, { lazy, Suspense, useEffect, useState, } from "react";
import { Route, Switch } from "react-router-dom";
import HelpIcon from '@mui/icons-material/Help';
import QRCodeList from "../../Containers/Main/Refurbish/QrCodeList";
import { connect } from "react-redux";

import {
  handleCandidateResumeModal,
} from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";

import {
  Button,
  Layout,
  message,
  Badge
} from "antd";
import { ThemeProvider } from "styled-components";
import {
  ApplicationWrapper,
  LayoutWrapper,
  NavbarWrapper,
} from "../../Components/UI/Layout";
import { Select } from "antd";
import { handleInTagDrawer } from "../../Containers/Main/Refurbish/RefurbishAction";
import { updateUserById, handleActionDrawerModal, getActionRequiredCount } from "../Auth/AuthAction";
import { setLanguage } from "../../Language/LanguageAction";
import { getOpportunityRecord } from "../Opportunity/OpportunityAction";
import { handleMessageModal } from "../LiveMessages/LiveMessageAction";
import { handleCallModal } from "../Call/CallAction";
import { getSupportedLanguages } from '../Translate/TranslateService';
import { handlePartnerModal } from "../Partner/PartnerAction";
import { BundleLoader } from "../../Components/Placeholder";
import AppErrorBoundary from "../../Helpers/ErrorBoundary/AppErrorBoundary";
import { getPresentNotifications } from "../Notification/NotificationAction";
import { MultiAvatar } from "../../Components/UI/Elements";
import AddActionModal from "./AddActionModal";
import FAQPage from "./FAQ/FAQPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import DataRoom from "../Data Room/DataRoom";
import TagInDrawer from "./Refurbish/ProductionTab/TagInDrawer";
import PhoneScanner from "./Scan/PhoneScanner/PhoneScanner";
import Vendor from "./Vendor/Vendor";
import Procre from "./Procre/Procre";
import InventoryTableAll from "./Suppliers/Child/SupplierDetails/SupplierDetailTab/InventoryTableAll";
import Trade from "./Trade/Trade";

const NavMenu = lazy(() =>
  import("./NavMenu")
);
const AddCandidateResumeModal = lazy(() =>
  import("../Candidate/Child/AddCandidateResumeModal")
);
const StartStop = lazy(() =>
  import("./Start&Stop/StartStop")
);
const ProfileDropdown = lazy(() =>
  import("./ProfileDropdown")
);
const SettingsDropdown = lazy(() =>
  import("../Settings/SettingsDropdown")
);
const Rules = lazy(() =>
  import("../Rules/Rules")
);
const Template = lazy(() =>
  import("../Template/Template")
);
const Call = lazy(() =>
  import("../Call/Call")
);
const Holiday = lazy(() =>
  import("../Holiday/Holiday")
);

const Reports = lazy(() =>
  import("../Reports/Reports")
);
const Partner = lazy(() =>
  import("../Partner/Partner")
);
const Category = lazy(() =>
  import("../Settings/Category/Category")
);
const Recruitment = lazy(() =>
  import("../Settings/Recruitement/Recruitment")
);
const CategoryTab = lazy(() =>
  import("../Settings/Category/CategoryTab")
);

const LiveMesssageModal = lazy(() =>
  import("../LiveMessages/LiveMesssageModal")
);
const AssessmentDetails = lazy(() =>
  import("../Accessment/Child/AssessmentDetails/AssessmentDetails")
);
const Leads = lazy(() =>
  import("../Leads/Leads")
);
const LeadDetails = lazy(() =>
  import("../Leads/Child/LeadsDetailTab/LeadDetails")
);
const Program = lazy(() =>
  import("../Program/Program")
);


const Course = lazy(() =>
  import("../Course/Course")
);
const Billing = lazy(() =>
  import("../../Components/Billing/Billing")
);
const CourseDetails = lazy(() =>
  import("../Course/Child/CourseDetailsTab/CourseDetails")
);
const ProgramDetails = lazy(() =>
  import("../Program/Child/ProgramDetails/ProgramDetails")
);
const Projects = lazy(() =>
  import("../Projects/Projects")
);
const ProjectsDetail = lazy(() =>
  import("../Projects/Child/ProjectsDetail/ProjectsDetail")
);

const Invoice = lazy(() =>
  import("../Invoice/Invoice")
);
const CandidateTotalBilling = lazy(() =>
  import("../Projects/Child/ProjectDetailsTab/CandidateTotalBilling")
);
const Location = lazy(() =>
  import("../Event/Child/Location/Location")
);
// const PitchDetails = lazy(() =>
//   import("../Pitch/Child/PitchDetails/PitchDetails")
// );
const Navmenu2 = lazy(() =>
  import("./Navmenu2")
);
const Teams = lazy(() =>
  import("./Teams/Teams")
);
const RepositoryData = lazy(() =>
  import("./RepositoryData")
);
const Inventory = lazy(() =>
  import("./Inventory/Inventory")
);
const Order = lazy(() =>
  import("./Order/Order")
);
const Supplies = lazy(() =>
  import("./Supplies/Supplies")
);
const Shipper = lazy(() =>
  import("./Shipper/Shipper")
);
const Account = lazy(() =>
  import("./Account/Account")
);
const ShipperDetails = lazy(() =>
  import("./Shipper/ShipperDetails")
);
const AccountDetails = lazy(() =>
  import("./Account/AccountDetailsTab/AccountDetails")
);
const InventoryDetail = lazy(() =>
  import("./Inventory/Child/InventoryDetails/InventoryDetail")
);
const Refurbish = lazy(() =>
  import("./Refurbish/Refurbish")
);
const Suppliers = lazy(() =>
  import("./Suppliers/Suppliers")
);

const SupplierDetails = lazy(() =>
  import("./Suppliers/Child/SupplierDetails/SupplierDetails")
);

const OpportunityDetail = lazy(() =>
  import("../Opportunity/Child/OpportunityDetail/OpportunityDetail")
);
const CustomerDetail = lazy(() =>
  import("../Customer/Child/CustomerDetail/CustomerDetail")
);
const ContactDetail = lazy(() =>
  import("../Contact/Child/ContactDetail/ContactDetail")
);
const CandidateDetails = lazy(() =>
  import("../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetails")
);

const Customer = lazy(() => import("../Customer/Customer"));
const Publish = lazy(() => import("../Publish/Publish"));
const Opportunity = lazy(() => import("../Opportunity/Opportunity"));
const { Option } = Select;

const { Header, Sider, Content } = Layout;
const Profile = lazy(() => import("../Profile/Profile"));
const Permissions = lazy(() => import("../Permissions/Permissions"));
const Organization = lazy(() => import("../Organization/Organization"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Library = lazy(() => import("../Settings/Library/Library"));
const Planner = lazy(() => import("../Planner/Planner"));
const EmployeeDetails = lazy(() =>
  import("../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeDetails")
);
const Settings = lazy(() => import("../Settings/Settings"));
const AddPartnerModal = lazy(() => import("../Partner/child/AddPartnerModal"));
const Mileage = lazy(() => import("../Mileage/Mileage"));
const Expense = lazy(() => import("../Expense/Expense"));
const Employees = lazy(() => import("../Employees/Employees"));
const Accessment = lazy(() => import("../Accessment/Accessment"));
const Task = lazy(() => import("../Task/Task"));
const Event = lazy(() => import("../Event/Event"));
const Leave = lazy(() => import("../Leave/Leave"));
const PageNotFound = lazy(() => import("../404/PageNotFound"));
const LiveMessage = lazy(() =>
  import("../../Containers/LiveMessages/LiveMessage")
);

const NotificationPopover = lazy(() =>
  import("../Notification/NotificationPopover")
);
const ChangePassword = lazy(() => import("../Auth/ChangePassword"));

const Contact = lazy(() => import("../Contact/Contact"));
const Candidate = lazy(() => import("../Candidate/Candidate"));

const PartnerDetail = lazy(() =>
  import("../Partner/child/PartnerDetail/PartnerDetail")
);
const AccountImport = lazy(() => import("../Import/Child/AccountImport"));
const Requirement = lazy(() => import("../Requirement/Requirement"));
const Demand = lazy(() => import("../Demand/Demand"));
const Pitch = lazy(() => import("../Pitch/Pitch"));
const Deal = lazy(() => import("../Deal/Deal"));
const ContactInvest = lazy(() => import("../ContactInvest/ContactInvest"));
const Investor = lazy(() => import("../Investor/Investor"));
const InvestorDetail = lazy(() => import("../Investor/Child/InvestorDetail/InvestorDetail"));
const ContactInvestDetail = lazy(() => import("../ContactInvest/Child/ContactInvestDetail/ContactInvestDetail"));
const DealDetail = lazy(() => import("../Deal/Child/DealDetail/DealDetail"));
const Product = lazy(() => import("../Product/Product"));
const Collection = lazy(() => import("../Collection/Collection"));
const Plant = lazy(() => import("../Plant/Plant"));
const PlantDetail = lazy(() => import("../Plant/Child/PlantDetail/PlantDetail"));
const Procurement = lazy(() => import("../Procurement/Procurement"));
const Subscription = lazy(() => import("../Subscription/Subscription"));
const Production = lazy(() => import("../Production/Production"));

function MainApp(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const [supportedLanguages, setSupportedLanguages] = useState([]);

  const [data, setData] = useState('No result');
  const [scanning, setScanning] = useState(false);
  const [shouldRenderCamera, setShouldRenderCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(data)

  useEffect(() => {
    props.getOpportunityRecord(props.userId);
    props.getActionRequiredCount(props.userId)
  }, []);



  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        const languages = await getSupportedLanguages();
        setSupportedLanguages(languages);
      } catch (error) {
        console.error('Error fetching supported languages:', error);
      }
    };

    fetchSupportedLanguages();
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };


  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");

  function toggle() {
    setCollapsed(!collapsed);
  }

  function toggleTheme(value) {
    setTheme(value ? "light" : "light");
  }
  function handleLanguageSelect(data) {
    props.updateUserById({
      preferedLanguage: data,
      employeeId: props.userId,
    });
    message.success(`Language sucessfully changed to ${data} `);
  }
  // render() {
  const background = theme === "light" ? "#fff" : null;
  const { organization, user, imageId, orgImageId, organizationName } = props;
  console.log("Done", props.imageId);
  console.log(user);
  let path = window.location.href.split("/")[3];
  console.log("paaaaaaaath", path);

  const organizationLogo = (
    <MultiAvatar
      // style={{width:"8rem"}}
      imageId={imageId}
    //marginLeft="30px"
    // primaryTitle={organizationName}
    />
  );



  const handleError = (error) => {
    console.error('Error with the QR scanner:', error);
    setScanning(false);
    setShouldRenderCamera(false);
    setModalVisible(false);
  };

  const startScanning = () => {
    setData('No result');
    setScanning(true);
    setShouldRenderCamera(true);
    setModalVisible(true);
  };

  const stopScanning = () => {
    setScanning(false);
    setShouldRenderCamera(false);
    setModalVisible(false);
  };
  const handleScan = async (result) => {
    if (result) {
      setData(result.text);
    }
  };
  // const handleScan = async (result, error) => {
  //   try {
  //     if (result && result.text) {
  //       setData(result.text);
  //     } else if (result instanceof MediaStream) {
  //     }

  //     if (error) {
  //       throw new Error(error);
  //     }
  //   } catch (error) {
  //     console.error('Error in QR code scanner:', error);

  //     // Additional handling based on the error, if needed

  //   }
  // };

  return (

    <>

      <ThemeProvider theme={props.theme}>
        <LayoutWrapper>
          <div class="max-sm:hidden overflow-x-auto max-xl:hidden">
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={"10vw"}
              style={{
                minHeight: "100vh",
                background: "#38445E",
                overflow: "auto",
                //flex:"0 0 11vw"
                // height: "100vh",
                // position: "fixed",
              }}
            >
              {/* <div
            className="logo"
            style={{
              justifyContent: !collapsed ? "flex-start" : "center",
              height: 50,
            }}
          > */}
              <div class="  h-3 ml-[2.5rem] "
                className="logo1"
                style={{
                  display: "flex",
                  width: "-webkit-fill-available",
                  justifyContent: !collapsed ? "center" : "center",

                }}
              >
                {collapsed && organizationLogo}
                {!collapsed && organizationLogo}
                {/* {collapsed && organizationLogo}
            {!collapsed && organizationLogo} */}
                {/* {this.state.collapsed && organizationLogo}
                            {!this.state.collapsed && organizationLogo}
                            {!this.state.collapsed && <span style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} >{organization.organizationName}</span>} */}

                {/* {collapsed && (
              <img
                className="small-logo"
                src={FWShortLogo}
                style={{ height: 50 }}
              />
            )}
            {!collapsed && (
              <img
                className="big-logo"
                src={FWLogo}
                style={{ height: "40px", marginLeft: "28px" }}
              />
            )} */}
              </div>
              <NavMenu
                collapsed={collapsed}
                toggleCollapsed={toggle}
                toggleTheme={toggleTheme}
                theme={theme}
                selectedLanguage={selectedLanguage}
              />
            </Sider>
          </div>
          <LayoutWrapper>
            <NavbarWrapper style={{
              padding: 0, height: 50, alignItems: "center", position: "sticky", zIndex: "999", top: " 0.15rem",


            }}>
              <Header>
                <div class="flex justify-between items-center">
                <div class="xl:hidden ml-4 "><Navmenu2 selectedLanguage={selectedLanguage} /></div>
                <div class=" flex items-center h-full self-start "
                >
                  <div class=" ml-3 mt-1 max-sm:hidden " >
                    <Select
                      value={props.preferedLanguage}
                      style={{ width: "3.8rem" }}
                      onChange={(value) => handleLanguageSelect(value)}
                    >
                      <Option value="English">EN</Option>
                      <Option value="Dutch">NL</Option>
                    </Select>
                  </div>
                </div>
              
                <StartStop />
              
                {/* <Button
                  onClick={() => {
                    props.handleInTagDrawer(true)
                  }}
                  class=" bg-green-600 cursor-pointer text-gray-50"
                >
                  Scan </Button> */}
                  <div class="ml-2">
                <QRCodeList
                  handleScan={handleScan}
                  stopScanning={stopScanning}
                  startScanning={startScanning}
                  handleError={handleError}
                  modalVisible={modalVisible}
                  scanning={scanning}
                  data={data}
                  shouldRenderCamera={shouldRenderCamera}
                />
                </div>
                </div>
                {/* <Popconfirm
                title="Stop"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{
                  loading: confirmLoading,
                }}
                onCancel={handleCancel}
              >
                <Button
                  type="primary"
                  htmlType="start"
                  // Loading={isSubmitting}
                  // Loading={this.state.Loading}
                  style={{ width: "10%", height: "2.5em", backgroundColor: "green" }}
                  onClick={showPopconfirm}
                // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                >
                  Start
                </Button>

              </Popconfirm>  */}

                <div class="mr-3 flex items-center h-[2.5rem]"
                >
                  {/* <ReactChat /> */}

                  {/* <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{
                      right: 24,
                    }}
                    icon={<CustomerServiceOutlined />}
                  >
                   
                    <FloatButton
                      tooltip={<div>Customer</div>}
                      icon={
                        <ApartmentIcon
                          onClick={() => {
                            props.handleCustomerModal(true);
                          }}
                        />
                      }
                    />
                    <FloatButton
                      tooltip={<div>Contact</div>}
                      icon={
                        <ContactsIcon
                          onClick={() => {
                            props.handleContactModal(true);
                          }}
                        />
                      }
                    />
                    <FloatButton
                      tooltip={<div>Opportunity</div>}
                      icon={
                        <LightbulbIcon
                          onClick={() => {
                            props.handleOpportunityModal(true);
                          }}
                        />
                      }
                    />
                    <FloatButton
                      tooltip={<div>Partner</div>}
                      icon={
                        <HandshakeIcon
                          onClick={() => {
                            props.handlePartnerModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Talent</div>}
                      icon={
                        <PortraitIcon
                          onClick={() => {
                            props.handleCandidateResumeModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Call</div>}
                      icon={
                        <VolumeUpIcon
                          onClick={() => {
                            props.handleCallModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Event</div>}
                      icon={
                        <EventAvailableIcon
                          onClick={() => {
                            props.handleEventModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Task</div>}
                      icon={
                        <FactCheckIcon
                          onClick={() => {
                            props.handleTaskModal(true);
                          }}
                        />
                      }
                    />
                  </FloatButton.Group> */}


                  {/* <Subscription /> */}
                  <div class=" text-base cursor-pointer font-normal text-[blue] max-sm:hidden"
                    onClick={() => {
                      // handleRowData(item);
                      props.handleActionDrawerModal(true);

                    }}
                  >Action<Badge
                  count={props.actionCount.ActionRecordCount}
                  overflowCount={999}
                ></Badge>
                  {/* <span class=" text-[tomato] font-semibold">{props.actionCount.ActionRecordCount}</span> */}
                  </div>
                  <div class=" text-white bg-mainclr h-[1.75rem] ml-8 mr-3 max-sm:hidden"
                    style={{
                      border: "1px solid tomato",
                      borderRadius: "5px",
                      lineHeight: "24px",
                      padding: "0px 10px",
                    }}
                  >
                    {props.role}
                  </div>

                  <div class=" text-white bg-mainclr h-[1.75rem] mr-3 max-sm:hidden"
                    style={{
                      border: "1px solid tomato",
                      borderRadius: "5px",
                      lineHeight: "24px",
                      padding: "0px 10px",
                    }}
                  >
                    {props.department}
                  </div>
                  <div class=" text-white bg-mainclr h-[1.75rem] mr-3 max-sm:hidden"
                    style={{
                      border: "1px solid tomato",
                      borderRadius: "5px",
                      lineHeight: "24px",
                      padding: "0px 10px",
                    }}
                  >
                    {props.roleType}
                  </div>
                  {/* <Subscription /> */}
                  <div class=" flex items-center h-0">
                    {user.settingsAccessInd === true || user.role === "ADMIN" ?
                      <SettingsDropdown />
                      : null
                    }
                    <a href="#" style={{ marginRight: 4 }}>
                      <div class=" flex items-center "
                      >
                        <NotificationPopover />
                      </div>
                    </a>

                    <RepositoryData />
                    <FAQPage />

                  </div>
                  <ProfileDropdown />

                  {/* <Theme /> */}
                </div>
              </Header>
            </NavbarWrapper>
            <ApplicationWrapper>
              <AppErrorBoundary>
                <Content>
                  <Suspense maxDuration={6000} fallback={<BundleLoader />}>
                    <Switch>
                      <Route exact path="/planner" component={Planner} />

                      <Route exact path="/dashboardRegional" component={DashboardPage} />

                      <Route exact path="/dashboard" component={Dashboard} />



                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/Invoice" component={Invoice} />
                      <Route
                        exact
                        path="/permissions"
                        component={Permissions}
                      />
                      <Route exact path="/mileage" component={Mileage} />
                      <Route exact path="/shipper" component={Shipper} />
                      <Route exact path="/expense" component={Expense} />
                      <Route exact path="/supplies" component={Supplies} />
                      <Route exact path="/procre" component={Procre} />
                      {/* <Route exact path="/supplier" component={Supplier} /> */}
                      <Route exact path="/order" component={Order} />
                      <Route exact path="/account" component={Account} />
                      <Route exact path="/location" component={Location} />
                      <Route exact path="/plant" component={Plant} />
                      <Route exact path="/plant/:plantId" component={PlantDetail} />
                      <Route exact path="/suppliers" component={Suppliers} />
                      <Route exact path="/trade" component={Trade} />
                      <Route exact path="/vendor" component={Vendor} />
                      <Route exact path="/inventory" component={Inventory} />
                      <Route exact path="/refurbish" component={Refurbish} />
                      <Route exact path="/teams" component={Teams} />
                      <Route exact path="/employees" component={Employees} />
                      <Route exact path="/leads" component={Leads} />
                      <Route exact path="/accessment" component={Accessment} />
                      <Route exact path="/holiday" component={Holiday} />
                      <Route
                        exact
                        path="/organization"
                        component={Organization}
                      />
                      <Route exact path="/leave" component={Leave} />
                      <Route exact path="/rules" component={Rules} />
                      <Route exact path="/template" component={Template} />
                      {/* <Route exact path="/documents" component={Documents} /> */}
                      <Route exact path="/category" component={Category} />
                      <Route
                        exact
                        path="/categoryTab"
                        component={CategoryTab}
                      />
                      {/* <Route exact path="/task" component={Task} /> */}
                      <Route exact path="/library" component={Library} />
                      <Route exact path="/planner" component={Planner} />
                      <Route exact path="/setting" component={Settings} />
                      <Route exact path="/reports" component={Reports} />
                      <Route exact path="/partner" component={Partner} />
                      <Route exact path="/call" component={Call} />
                      <Route exact path="/collection" component={Collection} />
                      <Route exact path="/task" component={Task} />
                      <Route exact path="/event" component={Event} />
                      <Route exact path="/dataroom" component={DataRoom} />
                      <Route
                        exact
                        path="/employee/:id"
                        component={EmployeeDetails}
                      />
                      <Route
                        exact
                        path="/distributor/:distributorId"
                        component={AccountDetails}
                      />
                      <Route
                        exact
                        path="/hour/candidate/hour-details/project/:candidateId/:projectId"
                        component={CandidateTotalBilling}
                      />
                      <Route
                        exact
                        path="/locationDetails/:locationDetailsId/:data?"
                        component={InventoryDetail}
                      />
                      <Route
                        exact
                        path="/leads/:leadsId"
                        component={LeadDetails}
                      />
                      <Route
                        exact
                        path="/scan/:phoneId"
                        component={PhoneScanner}
                      />
                      <Route
                        exact
                        path="/course/:courseId"
                        component={CourseDetails}
                      />

                      <Route
                        exact
                        path="/projects/:ProjectId"
                        component={ProjectsDetail}
                      />
                      <Route
                        exact
                        path="/program/:programDetailsId"
                        component={ProgramDetails}
                      />
                      <Route
                        exact
                        path="/assessment/:assessmentId"
                        component={AssessmentDetails}
                      />

                      <Route
                        exact
                        path="/change-password"
                        component={ChangePassword}
                      />

                      <Route exact path="/recruite" component={Recruitment} />
                      <Route exact path="/contact" component={Contact} />
                      <Route exact path="/customer" component={Customer} />
                      <Route exact path="/publish" component={Publish} />
                      <Route exact path="/program" component={Program} />
                      <Route exact path="/course" component={Course} />
                      <Route exact path="/project" component={Projects} />
                      <Route exact path="/billing" component={Billing} />
                      <Route
                        exact
                        path="/opportunity"
                        component={Opportunity}
                      />
                      <Route exact path="/candidate"
                        component={Candidate}
                      />

                      {/* <Route
                        exact
                        path="/candidate"
                        render={(props) => <Candidate {...props} selectedLanguage={selectedLanguage} />}
                      /> */}
                      <Route exact path="/message" component={LiveMessage} />


                      <Route
                        exact
                        path="/candidate/:candidateId"
                        render={(props) => <CandidateDetails {...props} selectedLanguage={selectedLanguage} />}
                      />
                      <Route
                        exact
                        path="/customer/:customerId"
                        component={CustomerDetail}
                      />
                      <Route
                        exact
                        path="/contact/:contactId"
                        component={ContactDetail}
                      />
                      <Route
                        exact
                        path="/shipper/:shipperId"
                        component={ShipperDetails}
                      />
                      <Route
                        exact
                        path="/supplier/:supplierId"
                        component={SupplierDetails}
                      />

                      {/* <Route
                        exact
                        path="/pitch/:investorLeadsId"
                        component={PitchDetails}
                      /> */}
                      <Route
                        exact
                        path="/opportunity"
                        component={Opportunity}
                      />
                      <Route
                        exact
                        path="/opportunity/:opportunityId"
                        component={OpportunityDetail}
                      />
                      <Route
                        exact
                        path="/partner/:partnerId"
                        component={PartnerDetail}
                      />
                      {/* <PotectedRoute exact path="/users" component={Users} /> */}
                      <Route
                        exact
                        path="/import/account"
                        component={AccountImport}
                      />
                      <Route
                        exact
                        path="/requirement"
                        component={Requirement}
                      />
                      <Route
                        exact
                        path="/procurement"
                        component={Procurement}
                      />
                      <Route exact path="/demand" component={Demand} />

                      <Route exact path="/pitch" component={Pitch} />
                      <Route exact path="/deal" component={Deal} />
                      <Route exact path="/contactInvest" component={ContactInvest} />
                      <Route exact path="/investor" component={Investor} />
                      <Route exact path="/investor/:investorId" component={InvestorDetail} />
                      <Route exact path="/contactinvest/:contactId" component={ContactInvestDetail} />
                      <Route exact path="/dealDetails/:invOpportunityId" component={DealDetail} />
                      <Route exact path="/product" component={Product} />
                      <Route exact path="/subscription" component={Subscription} />
                      <Route exact path="/production" component={Production} />

                      <Route path="**" component={PageNotFound} />
                    </Switch>
                  </Suspense>
                </Content>
              </AppErrorBoundary>
            </ApplicationWrapper>
          </LayoutWrapper>
        </LayoutWrapper>
      </ThemeProvider>
      <AddActionModal
        // rowdata={rowdata}
        addDrawerActionModal={props.addDrawerActionModal}
        handleActionDrawerModal={props.handleActionDrawerModal}
      />
      <LiveMesssageModal
        addMessageModal={props.addMessageModal}
        handleMessageModal={props.handleMessageModal}
      />
      <AddPartnerModal
        addPartnerModal={props.addPartnerModal}
        handlePartnerModal={props.handlePartnerModal}
      />
      <AddCandidateResumeModal
        addCandidateResumeModal={props.addCandidateResumeModal}
        handleCandidateResumeModal={props.handleCandidateResumeModal}
      // handleResponseData={this.handleResponseData}
      // responseData={this.state.responseData}
      />

      <TagInDrawer
        clickTagInDrawr={props.clickTagInDrawr}
        handleInTagDrawer={props.handleInTagDrawer}
      />
    </>
  );
}
// }

const mapStateToProps = ({
  auth,
  theme,
  refurbish,
  call,
  task,
  event,
  candidate,
  partner,
  opportunity,
  contact,
  language,
  message,
}) => ({
  language: language.language,
  user: auth.userDetails,
  userDetails: auth.userDetails,
  addDrawerActionModal: auth.addDrawerActionModal,
  addMessageModal: opportunity.addMessageModal,
  // employeeId: auth.userDetails.employeeId,
  userId: auth.userDetails.employeeId,
  theme: theme.theme,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  department: auth.userDetails && auth.userDetails.department,
  roleType: auth.userDetails && auth.userDetails.roleType,
  role: auth.userDetails && auth.userDetails.role,
  // orgImageId:auth.userDetails.orgImageId,

  imageId:
    (auth.userDetails &&
      auth.userDetails.metaData &&
      auth.userDetails.metaData.orgImageId) ||
    "",
  organizationName:
    (auth.userDetails &&
      auth.userDetails.metaData &&
      auth.userDetails.metaData.organization &&
      auth.userDetails.metaData.organization.organizationName) ||
    "",

  preferedLanguage: auth.userDetails.preferedLanguage,
  addPartnerModal: partner.addPartnerModal,
  organizationDetails: auth.organizationDetails,
  addCandidateResumeModal: candidate.addCandidateResumeModal,
  addCallModal: call.addCallModal,
  user: auth.userDetails,
  actionCount: auth.actionCount,
  clickTagInDrawr: refurbish.clickTagInDrawr,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPresentNotifications,
      handlePartnerModal,
      updateUserById,
      handleCandidateResumeModal,
      handleCallModal,
      setLanguage,
      getOpportunityRecord,
      getActionRequiredCount,
      handleMessageModal,
      handleActionDrawerModal,
      handleInTagDrawer,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
