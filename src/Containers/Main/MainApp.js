import React, { lazy, Suspense, useEffect, useState, } from "react";
import { Route, Switch } from "react-router-dom";
import PhoneMaterialScanner from "../Main/Scan/PhoneScanner/PhoneMaterialScanner"
import QRCodeList from "../../Containers/Main/Refurbish/QrCodeList";
import { connect } from "react-redux";
import AssessmentData from "../AssessmentData/AssessmentData"
import { login_url } from "../../Config/Auth";
import Waranty from "../Waranty/Waranty"
import ProductionPhoneScanner from "../Main/Scan/PhoneScanner/ProductionPhoneScanner"
import {
  handleCandidateResumeModal,
} from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";import {
  Button,
  Layout,
  message,
  Badge
} from "antd";
import { ThemeProvider } from "styled-components";
import {
  LayoutWrapper,
} from "../../Components/UI/Layout";
import { Select } from "antd";
import { handleInTagDrawer } from "../../Containers/Main/Refurbish/RefurbishAction";
import { getSuscrption } from "../Subscription/SubscriptionAction";
import { updateUserById, handleActionDrawerModal, getActionRequiredCount, handlePromotion } from "../Auth/AuthAction";
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
import LanguageSelector from "../Translate/LanguageSelector";
import FAQPage from "./FAQ/FAQPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import DataRoom from "../Data Room/DataRoom";
import TagInDrawer from "./Refurbish/ProductionTab/TagInDrawer";
import PhoneScanner from "./Scan/PhoneScanner/PhoneScanner";
import Vendor from "./Vendor/Vendor";
import Procre from "./Procre/Procre";
import Trade from "./Trade/Trade";
import CreateSubscriptionDrawer from "../Subscription/Child/CreateSubscriptionDrawer";
import { handleCreateSubscriptionDrawer } from "../Subscription/SubscriptionAction";
import Quality from "../Quality/Quality";
import Club from "./Club/Club";
import PromotionsDrawerr from "./PromotionsDrawerr";
import Prmotion from "./Promotion/Prmotion";
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
const Analytics = lazy(() =>
  import("../Reports/Analytics")
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
const Product = lazy(() => import("../Product/Product"));
const Collection = lazy(() => import("../Collection/Collection"));
const Plant = lazy(() => import("../Plant/Plant"));
const PlantDetail = lazy(() => import("../Plant/Child/PlantDetail/PlantDetail"));
const Procurement = lazy(() => import("../Procurement/Procurement"));
const SubscriptionMainApps = lazy(() => import("../Subscription/SubscriptionMainApps"));
const Production = lazy(() => import("../Production/Production"));

function MainApp(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [supportedLanguages, setSupportedLanguages] = useState([]);

  const [data, setData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [shouldRenderCamera, setShouldRenderCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rowData, setrowData] = useState({});
  console.log(data)

  useEffect(() => {
    props.getOpportunityRecord(props.userId);
    props.getActionRequiredCount(props.userId);
    props.getSuscrption(props.orgId)
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

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRowData = (data) => {
    setrowData(data);
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

  const translateText = async (text, targetLanguage) => {
    const url = `${login_url}/words/convertWordsById`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    });


    const data = await response.json();
    const result = data.map((translation) => translation.translatedText);
    console.log("result", result)
    if (data) {
      return data.map((translation) => translation.translatedText);
    } else {
      throw new Error('Translation failed');
    }
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
  const background = theme === "light" ? "#fff" : null;
  const { organization, user, imageId, orgImageId, organizationName } = props;
  console.log("Done", props.imageId);
  console.log(user);
  let path = window.location.href.split("/")[3];
  console.log("paaaaaaaath", path);

  const organizationLogo = (
    <MultiAvatar
      imageId={imageId}
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
  const Subscription = 
  props.suscrptionData.subscriptionType === "1" ? "Starter" :
  props.suscrptionData.subscriptionType === "2" ? "Professional" :
  props.suscrptionData.subscriptionType === "3" ? "Enterprise" :
  props.suscrptionData.subscriptionType === "4" ? "Custom" :
  "Unknown";
  console.log(props.suscrptionData)
  return (

    <>

      <ThemeProvider theme={props.theme}>
        <LayoutWrapper>
          <div class="max-sm:hidden overflow-x-auto max-xl:hidden scroller">
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={"10vw"}
              style={{
                minHeight: "100vh",
                background: "#38445E",
                overflow: "auto",
              }}
            >
              <div class="  h-3 ml-[2.5rem] "
                className="logo1"
                style={{
                  display: "flex",
                  width: "90%",
                  justifyContent: !collapsed ? "center" : "center",

                }}
              >
                {collapsed && organizationLogo}
                {!collapsed && organizationLogo}
               
              </div>
              <NavMenu
                collapsed={collapsed}
                toggleCollapsed={toggle}
                toggleTheme={toggleTheme}
                theme={theme}
                translateText={translateText}
                selectedLanguage={selectedLanguage}
              />
            </Sider>
          </div>
          <LayoutWrapper class="w-[90%] max-sm:w-wk" >
            <div class=" flex flex-row justify-between w-[100%] items-center content-center nowrap sticky z-50  h-10  leading-8  shadow-[0 0.0625em 0.25em 0.0625em] bg-slate-400">
           
              <Header class=" flex bg-white w-[100%] box-border border-2 justify-between p-0 items-center">
              <div ><Navmenu2 className=" z-10 "
                  translateText={translateText}
                  selectedLanguage={selectedLanguage} /></div>
              <div class="max-xl:text-[0.75rem]  max-lg:text-[0.5rem] ">
                  <LanguageSelector
                    translateText={translateText}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    supportedLanguages={supportedLanguages}
                  />
                </div> 
                <div class="flex justify-between items-center">
                  
                  <StartStop />
                  <div >
                     </div>
                
                  <div class="ml-2">
                    <QRCodeList  class
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
            

                <div class="mr-3 flex items-center h-[2.5rem]"
                >
                 
 {/* <div className="flex items-center">           
                <Button
                 type="primary"
                 onClick={() =>{
                  props.handlePromotion(true)}}
                >Promotions</Button>
                 </div> */}
           <div className="flex items-center">
                <div className=" text-sm font-semibold font-poppins mr-1">{Subscription}</div>
                <Button
                 type="primary"
                 onClick={() =>{
                  handleRowData(props.suscrptionData);
                  props.handleCreateSubscriptionDrawer(true)}}
                >Upgrade</Button>
                 </div>
                  <div class=" text-base cursor-pointer font-normal text-[blue]  ml-1 max-sm:hidden "
                    onClick={() => {
                      props.handleActionDrawerModal(true);

                    }}
                  >Action<Badge
                    count={props.actionCount.ActionRecordCount}
                    overflowCount={999}
                  ></Badge>
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

                    <RepositoryData  />
                    <FAQPage/>

                  </div>
                  <ProfileDropdown />

               
                </div>
              </Header>
            </div>
            <div class=" p-1 bg-light-gray ">
              <AppErrorBoundary>
                <Content>
                  <Suspense maxDuration={6000} fallback={<BundleLoader />}>
                    <Switch>
                    <Route
                      exact
                      path="/planner"
                      render={(props) => (
                        <Planner
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                       <Route
                      exact
                      path="/dashboardRegional"
                      render={(props) => (
                        <DashboardPage
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/dashboard"
                      render={(props) => (
                        <Dashboard
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     
                     <Route
                      exact
                      path="/profile"
                      render={(props) => (
                        <Profile
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/Invoice"
                      render={(props) => (
                        <Invoice
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
 <Route
                      exact
                      path="/permissions"
                      render={(props) => (
                        <Permissions
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
<Route
                      exact
                      path="/mileage"
                      render={(props) => (
                        <Mileage
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                       <Route
                      exact
                      path="/shipper"
                      render={(props) => (
                        <Shipper
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                   <Route
                      exact
                      path="/expense"
                      render={(props) => (
                        <Expense
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/supplies"
                      render={(props) => (
                        <Supplies
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/procre"
                      render={(props) => (
                        <Procre
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/order"
                      render={(props) => (
                        <Order
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />         
                     <Route
                      exact
                      path="/account"
                      render={(props) => (
                        <Account
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/plant"
                      render={(props) => (
                        <Plant
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     <Route
                      exact
                      path="/plant/:plantId"
                      render={(props) => (
                        <PlantDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     <Route
                      exact
                      path="/suppliers"
                      render={(props) => (
                        <Suppliers
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                      <Route
                      exact
                      path="/trade"
                      render={(props) => (
                        <Trade
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                      <Route
                      exact
                      path="/vendor"
                      render={(props) => (
                        <Vendor
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />                  
                     <Route
                      exact
                      path="/inventory"
                      render={(props) => (
                        <Inventory
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     <Route
                      exact
                      path="/refurbish"
                      render={(props) => (
                        <Refurbish
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     
                     
                     
                     
                     
                      <Route
                      exact
                      path="/location"
                      render={(props) => (
                        <Location
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/teams"
                      render={(props) => (
                        <Teams
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/employees"
                      render={(props) => (
                        <Employees
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/leads"
                      render={(props) => (
                        <Leads
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/assessment"
                      render={(props) => (
                        <AssessmentData
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/holiday"
                      render={(props) => (
                        <Holiday
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/organization"
                      render={(props) => (
                        <Organization
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     <Route
                      exact
                      path="/leave"
                      render={(props) => (
                        <Leave
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                     <Route
                      exact
                      path="/rules"
                      render={(props) => (
                        <Rules
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                     <Route
                      exact
                      path="/template"
                      render={(props) => (
                        <Template
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                      
                      <Route
                      exact
                      path="/category"
                      render={(props) => (
                        <Category
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/categoryTab"
                      render={(props) => (
                        <CategoryTab
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/library"
                      render={(props) => (
                        <Library
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/planner"
                      render={(props) => (
                        <Planner
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/psettinglanner"
                      render={(props) => (
                        <Settings
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/reports"
                      render={(props) => (
                        <Reports
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/analytics"
                      render={(props) => (
                        <Analytics
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/partner"
                      render={(props) => (
                        <Partner
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/collection"
                      render={(props) => (
                        <Collection
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/dataroom"
                      render={(props) => (
                        <DataRoom
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/call"
                      render={(props) => (
                        <Call
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />

<Route
                      exact
                      path="/Sold"
                      render={(props) => (
                        <Waranty
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/event"
                      render={(props) => (
                        <Event
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/task"
                      render={(props) => (
                        <Task
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/employee/:id"
                      render={(props) => (
                        <EmployeeDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                       <Route
                      exact
                      path="/distributor/:distributorId"
                      render={(props) => (
                        <AccountDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  

                     <Route
                      exact
                      path="/hour/candidate/hour-details/project/:candidateId/:projectId"
                      render={(props) => (
                        <CandidateTotalBilling
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                     <Route
                      exact
                      path="/locationDetails/:locationDetailsId/:data?"
                      render={(props) => (
                        <InventoryDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />   
                     {/* <Route
                      exact
                      path="/leads/:leadsId"
                      render={(props) => (
                        <LeadDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  */}
                     <Route
                      exact
                      path="/scan/:phoneId"
                      render={(props) => (
                        <PhoneScanner
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 

<Route
                      exact
                      path="/material/:suppliesId"
                      render={(props) => (
                        <PhoneMaterialScanner
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
{/* 
<Route
                      exact
                      path="/production/:manufactureId"
                      render={(props) => (
                        <ProductionPhoneScanner
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  */}
                    <Route
                      exact
                      path="/course/:courseId"
                      render={(props) => (
                        <CourseDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     <Route
                      exact
                      path="/projects/:ProjectId"
                      render={(props) => (
                        <ProjectsDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                     <Route
                      exact
                      path="/program/:programDetailsId"
                      render={(props) => (
                        <ProjectsDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                         <Route
                      exact
                      path="/assessment/:assessmentId"
                      render={(props) => (
                        <AssessmentDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 
                      <Route
                      exact
                      path="/change-password"
                      render={(props) => (
                        <ChangePassword
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                       <Route
                      exact
                      path="/recruite"
                      render={(props) => (
                        <Recruitment
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                     <Route
                      exact
                      path="/publish"
                      render={(props) => (
                        <Publish
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                   <Route
                      exact
                      path="/program"
                      render={(props) => (
                        <Program
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      
                      <Route
                      exact
                      path="/course"
                      render={(props) => (
                        <Course
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                                          
                                          <Route
                      exact
                      path="/project"
                      render={(props) => (
                        <Projects
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     
                     <Route
                      exact
                      path="/billing"
                      render={(props) => (
                        <Billing
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                                     
                      <Route
                      exact
                      path="/customer"
                      render={(props) => (
                        <Customer
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/contact"
                      render={(props) => (
                        <Contact
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                       <Route
                      exact
                      path="/opportunity"
                      render={(props) => (
                        <Opportunity
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/product"
                      render={(props) => (
                        <Product
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/production"
                      render={(props) => (
                        <Production
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/quality"
                      render={(props) => (
                        <Quality
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/shipper/:shipperId"
                      render={(props) => (
                        <ShipperDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/candidate"
                      render={(props) => (
                        <Candidate
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />          
                      <Route
                      exact
                      path="/message"
                      render={(props) => (
                        <LiveMessage
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> 

                      <Route
                        exact
                        path="/candidate/:candidateId"
                        render={(props) => <CandidateDetails {...props} 
                        translateText={translateText}
                        selectedLanguage={selectedLanguage} />}
                      />

                    <Route
                      exact
                      path="/customer/:customerId"
                      render={(props) => (
                        <CustomerDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/contact/:contactId"
                      render={(props) => (
                        <ContactDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/supplier/:supplierId"
                      render={(props) => (
                        <SupplierDetails
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     
                     <Route
                      exact
                      path="/opportunity"
                      render={(props) => (
                        <Opportunity
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/opportunity/:opportunityId"
                      render={(props) => (
                        <OpportunityDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/partner/:partnerId"
                      render={(props) => (
                        <PartnerDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/import/account"
                      render={(props) => (
                        <AccountImport
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/requirement"
                      render={(props) => (
                        <Requirement
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/procurement"
                      render={(props) => (
                        <Procurement
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/demand"
                      render={(props) => (
                        <Demand
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     
                      <Route
                      exact
                      path="/pitch"
                      render={(props) => (
                        <Pitch
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  
                    <Route
                      exact
                      path="/deal"
                      render={(props) => (
                        <Deal
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/contactInvest"
                      render={(props) => (
                        <ContactInvest
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                      <Route
                      exact
                      path="/investor"
                      render={(props) => (
                        <Investor
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/club"
                      render={(props) => (
                        <Club
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                       <Route
                      exact
                      path="/investor/:investorId"
                      render={(props) => (
                        <InvestorDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     <Route
                      exact
                      path="/promotion"
                      render={(props) => (
                        <Prmotion
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/contactinvest/:contactId"
                      render={(props) => (
                        <ContactInvestDetail
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />                      
                    <Route
                      exact
                      path="/subscriptionmainapps"
                      render={(props) => (
                        <SubscriptionMainApps
                          {...props}
                          rowData={rowData}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />
                     
                     
                    </Switch>
                  </Suspense>
                </Content>
              </AppErrorBoundary>
            </div>
          </LayoutWrapper>
        </LayoutWrapper>
      </ThemeProvider>
      <AddActionModal
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
     />
      <CreateSubscriptionDrawer
        rowData={rowData}
        createSubscriptiondrawer={props.createSubscriptiondrawer}
        handleCreateSubscriptionDrawer={props.handleCreateSubscriptionDrawer}
      />
       <PromotionsDrawerr
        rowData={rowData}
        addPromotionnModal={props.addPromotionnModal}
        handlePromotion={props.handlePromotion}
      />
      <TagInDrawer
        clickTagInDrawr={props.clickTagInDrawr}
        handleInTagDrawer={props.handleInTagDrawer}
      />
    </>
  );
}


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
  subscription
}) => ({
  language: language.language,
  user: auth.userDetails,
  userDetails: auth.userDetails,
  addDrawerActionModal: auth.addDrawerActionModal,
  addMessageModal: opportunity.addMessageModal,
  userId: auth.userDetails.employeeId,
  theme: theme.theme,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  department: auth.userDetails && auth.userDetails.department,
  roleType: auth.userDetails && auth.userDetails.roleType,
  role: auth.userDetails && auth.userDetails.role,
  orgId: auth.userDetails.organizationId,

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
  suscrptionData: subscription.suscrptionData,
  user: auth.userDetails,
  actionCount: auth.actionCount,
  token: auth.token,
  clickTagInDrawr: refurbish.clickTagInDrawr,
  createSubscriptiondrawer: subscription.createSubscriptiondrawer,
  addPromotionnModal: auth.addPromotionnModal
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
      handleCreateSubscriptionDrawer,
      getSuscrption,
      handlePromotion
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
