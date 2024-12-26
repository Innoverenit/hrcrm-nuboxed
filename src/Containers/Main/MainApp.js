import React, { lazy, Suspense, useEffect,useRef, useState, } from "react";

import { Routes,Link, Route, Navigate, } from "react-router-dom";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import {
  handleDistributorModal,
  handleAccountOpportunityModal,
  getDistributorByDistributorId,
  getSearchDistributor
} from "./Account/AccountAction";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { connect } from "react-redux";

import { login_url } from "../../Config/Auth";
import {
  handleCandidateResumeModal,
} from "../Candidate/CandidateAction";
import {handleCustomerModal} from "../Customer/CustomerAction"
import { bindActionCreators } from "redux";import {
  Tooltip,
  Button,
  Layout,
  message,
  Badge,
  FloatButton
} from "antd";
import { ThemeProvider } from "styled-components";
import {
  LayoutWrapper,
} from "../../Components/UI/Layout";
import { Select } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { handleInTagDrawer } from "../../Containers/Main/Refurbish/RefurbishAction";
import { getSuscrption } from "../Subscription/SubscriptionAction";
import { updateUserById, handleActionDrawerModal, getActionRequiredCount, handlePromotion } from "../Auth/AuthAction";
import { setLanguage } from "../../Language/LanguageAction";
import { getOpportunityRecord } from "../Opportunity/OpportunityAction";
import {handleOpportunityModal} from "../Opportunity/OpportunityAction"
// import { handleMessageModal } from "../LiveMessages/LiveMessageAction";
import { handleCallModal } from "../Call/CallAction";
import { handlePartnerModal } from "../Partner/PartnerAction";
import { BundleLoader } from "../../Components/Placeholder";
import { getPresentNotifications } from "../Notification/NotificationAction";
import FlashOnIcon from '@mui/icons-material/FlashOn'; 
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { MultiAvatar } from "../../Components/UI/Elements";
import {handleContactModal} from "../Contact/ContactAction"
import { handleCreateSubscriptionDrawer } from "../Subscription/SubscriptionAction";

const NodataFoundPage = lazy(() =>
  import("../../Helpers/ErrorBoundary/NodataFoundPage")
);
const AddActionModal = lazy(() =>
  import("./AddActionModal")
);
const EmptyPage = lazy(() =>
  import("./EmptyPage")
);

const LanguageSelector = lazy(() =>
  import("../Translate/LanguageSelector")
);

const FAQPage = lazy(() =>
  import("./FAQ/FAQPage")
);

const DashboardPage = lazy(() =>
  import("../DashboardPage/DashboardPage")
);

const DataRoom = lazy(() =>
  import("../Data Room/DataRoom")
);

const PhoneMaterialScanner = lazy(() =>
  import("../Main/Scan/PhoneScanner/PhoneMaterialScanner")
);
const QRCodeList = lazy(() =>
  import("../../Containers/Main/Refurbish/QrCodeList")
);
const AssessmentData = lazy(() =>
  import("../AssessmentData/AssessmentData")
);

const Waranty = lazy(() =>
  import("../Waranty/Waranty")
);
const Procre = lazy(() =>
  import("./Procre/Procre")
);

const PhoneScanner = lazy(() =>
  import("./Scan/PhoneScanner/PhoneScanner")
);
const TagInDrawer = lazy(() =>
  import("./Refurbish/ProductionTab/TagInDrawer")
);


const Trade = lazy(() =>
  import("./Trade/Trade")
);


const CreateSubscriptionDrawer = lazy(() =>
  import("../Subscription/Child/CreateSubscriptionDrawer")
);

const Quality = lazy(() =>
  import("../Quality/Quality")
);

const Club = lazy(() =>
  import("./Club/Club")
);

const PromotionsDrawerr = lazy(() =>
  import("./PromotionsDrawerr")
);
const Prmotion = lazy(() =>
  import("./Promotion/Prmotion")
);

const AddAccountOpportunityModal = lazy(() =>
  import("./Account/AccountDetailsTab/AccountQuotationDrawer")
);


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

// const LiveMesssageModal = lazy(() =>
//   import("../LiveMessages/LiveMesssageModal")
// );
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


const { Option } = Select;

const { Header, Sider, Content } = Layout;

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
  const [selectedLocation, setSelectedLocation] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const hoverTimer = useRef(null);
  

  console.log(data)

  useEffect(() => {
    props.getOpportunityRecord(props.userId);
    props.getActionRequiredCount(props.userId);
    props.getSuscrption(props.orgId)
    props.getSearchDistributor(props.userId)
   
  }, []);

  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        const languages = await props.getSupportLanguages();
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
  const toggleSelect = () => {
    clearTimeout(hoverTimer.current);
    setIsOpen(!isOpen);
  };

  const filterLocationOptions = (input, option) => {
    return option.children.toLowerCase().includes(input.toLowerCase());
  };
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const handleLocationChange = (distributorId) => {
    setSelectedLocation(distributorId); 
    if (distributorId) {
    props.getDistributorByDistributorId(distributorId)
    props.handleAccountOpportunityModal(true);
    }
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
  console.log(props.distributorId)
  return (

    <>

      <ThemeProvider theme={props.theme}>
        <LayoutWrapper>
          <div class="overflow-x-auto  scroller">
            <Sider className="bg-[#38445E] min-h-[100vh] overflow-auto"
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={"10vw"}          
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
                translateText={translateText}
                selectedLanguage={selectedLanguage}
                toggle={toggle}
              />
            </Sider>
          </div>
          <LayoutWrapper class="w-[90%]  max-sm:w-wk" >
            <div class=" flex flex-row justify-between w-[100%] items-center content-center nowrap sticky z-50  h-10  leading-8  shadow-[0 0.0625em 0.25em 0.0625em] bg-slate-400">
              <Header class=" flex bg-white w-[100%] box-border border-2 justify-between p-0 items-center">
              <div className="md:hidden" >
              <button
                className="text-[green]"
                onClick={toggle}
              >
                {collapsed ? <CloseIcon /> : <MenuOpenIcon />}
              </button>
                  </div>

                  <div class="flex flex-start items-center  ">
                    <div className="flex items-center  ">            
                {/* <Button   
                 type="primary"        
                 onClick
                >Data Room</Button> */}
     <Link to="/dataroom" style={{display:"flex"}}>
      <Button type="primary">
      <MeetingRoomIcon  className=" !text-icon"/>  Data Room
      </Button>
    </Link>
                 </div>
                 <Badge 
  count={`${props.actionCount.ActionRecordCount === 0 ? "0" : props.actionCount.ActionRecordCount}`}
  overflowCount={999}
>
  <div className="text-base cursor-pointer font-normal text-[blue] ml-1 max-sm:hidden" onClick={() => {
    props.handleActionDrawerModal(true);
  }}>
    <Button type="primary"><FlashOnIcon className="!text-icon"/> Action </Button>

  </div>
</Badge>
                  </div>


                <div class="flex justify-between items-center">
                  
                  <StartStop />
                  <div >
                     </div>
                
                  <div class="ml-2">
                  <Tooltip title= "Scanner" >
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
                    </Tooltip>
                  </div>
                </div>
          
                <FloatButton.Group
      // trigger="hover"
        shape="square"
      type="primary"
      style={{
        insetInlineEnd: 12,   
      }}
      icon={
      <SubscriptionsIcon className="!text-icon" />
     
    }
    >
       <FloatButton 
      icon={
   
        <Tooltip title="Order">
           <DynamicFeedIcon
           
        // onClick={() => {
       
        //   props.handleContactModal(true);
          
  
        // }}
        className="!text-icon  text-[blue]"
        />
        </Tooltip>
       
        } />
      <FloatButton 
      icon={
       
        <Tooltip title="Quotation">
       
         <LightbulbIcon 
       className="!text-icon  text-[blue]"
         onClick={toggleSelect} // Open/close Select on click
         />

        </Tooltip>
        } />
      {/* <FloatButton 
      icon={
    
        <Tooltip title="Customer">
        <ApartmentIcon
         style={{color:"blue"}}  
        onClick={() => {
       
          props.handleDistributorModal(true);
          
  
        }}
        className='!text-icon  text-[#e4eb2f]'
        />
        </Tooltip>
        } /> */}
    </FloatButton.Group>
    {isOpen && (
    <FloatButton.Group
      // trigger="hover"
        shape="square"
      type="primary"
      style={{
        insetInlineEnd: 140,   
      }}
      icon={
      <SubscriptionsIcon className="!text-icon" />
     
    }
    >
    {isOpen && (
          <Select
          style={{ width: "12rem" }}
          onChange={handleLocationChange}
          showSearch
          onSearch={handleSearch}
          filterOption={filterLocationOptions}
          placeholder="Select Location"
          value={searchValue}
        >
          {props.searchDistributor.map((item) => (
            <Option key={item.distributorId} value={item.distributorId}>
              {item.distributorName}
            </Option>
          ))}
        </Select>
           )} 
            </FloatButton.Group>
              )} 
                <div class="mr-3 flex items-center h-[2.5rem]">            
                <div class="max-xl:text-[0.75rem]  max-lg:text-[0.5rem] ">
                  <LanguageSelector
                    translateText={translateText}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    supportedLanguages={supportedLanguages}
                  />
                </div> 
                  <div class=" text-[tomato]  bg-white h-[1.75rem] ml-8 mr-3 max-sm:hidden"
                    style={{
                      border: "1px solid tomato",
                      borderRadius: "5px",
                      lineHeight: "24px",
                      padding: "0px 10px",
                    }}
                  >
                    {props.role}
                  </div>
                
                  <div class=" flex items-center h-8">
                    {user.settingsAccessInd === true || user.role === "ADMIN" ?
                
                      <SettingsDropdown/>
                      : null
                    }
                    <a href="#" className="mr-1">             
                        <NotificationPopover />          
                    </a>

                    <RepositoryData  />
                    <FAQPage/>
</div>
              
                  <ProfileDropdown />

               
                </div>
              </Header>
              {collapsed && (
        <div
          className="fixed z-10 md:hidden"
          onClick={toggle}
        ></div>
      )}
            </div>
            <div class=" p-1 bg-light-gray ">
              {/* <NodataFoundPage> */}
                <Content>
                  <Suspense maxDuration={6000} fallback={<BundleLoader />}>
                    {/* <Switch> */}
                   
                    <Routes>
                    <Route
                      // exact
                      // path="/planner"
                      // render={(props) => (
                      //   <Planner
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      path="/planner"
                      element={<Planner 
                        translateText={translateText}
                          selectedLanguage={selectedLanguage}
                      />}
                      // )}
                      

                    />
                       {/* <Route
                      exact
                      path="/dashboardRegional"
                      render={(props) => (
                        <DashboardPage
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    /> */}
                     <Route
                      path="dashboard"
                      element={< Dashboard
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      
                      // exact
                      // path="/dashboard"
                      // render={(props) => (
                      //   <Dashboard
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     
                     <Route
                      exact
                      path="/profile"
                      // render={(props) => (
                      //   <Profile
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Profile
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                    <Route
                      exact
                      path="Invoice"
                      element={< Invoice
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Invoice
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
 <Route
                      exact
                      path="permissions"
                      element={< Permissions
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      
                      // render={(props) => (
                      //   <Permissions
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
<Route
                      exact
                      path="mileage"
                      element={< Mileage
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Mileage
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                       <Route
                      exact
                      path="shipper"
                      element={< Shipper
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Shipper
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                   <Route
                      exact
                      path="/expense"
                      element={< Expense
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Expense
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="supplies"
                      // render={(props) => (
                      //   <Supplies
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Supplies
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="procre"
                      element={< Procre
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Procre
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="order"
                      element={< Order
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Order
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />         
                     <Route
                      exact
                      path="account"
                      // render={(props) => (
                      //   <Account
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Account
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      exact
                      path="plant"
                      element={< Plant
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Plant
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    /> 
                     <Route
                      exact
                      path="/plant/:plantId"
                      // render={(props) => (
                      //   <PlantDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< PlantDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    /> 
                     <Route
                      exact
                      path="suppliers"
                      element={< Suppliers
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Suppliers
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    /> 
                      <Route
                      exact
                      path="trade"
                      element={< Trade
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Trade
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    /> 
                                       
                     <Route
                      exact
                      path="inventory"
                      element={< Inventory
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Inventory
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    /> 
                     <Route
                      exact
                      path="refurbish"
                      // render={(props) => (
                      //   <Refurbish
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Refurbish
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    /> 
                     
                     
                     
                     
                     
                      <Route
                      exact
                      path="location"
                      element={< Location
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Location
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="teams"
                      element={< Teams
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Teams
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="employees"
                      element={< Employees
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Employees
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="leads"
                      // render={(props) => (
                      //   <Leads
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Leads
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                    <Route
                      exact
                      path="assessment"
                      // render={(props) => (
                      //   <AssessmentData
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< AssessmentData
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                    <Route
                      exact
                      path="holiday"
                      // render={(props) => (
                      //   <Holiday
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Holiday
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      exact
                      path="/organization"
                      // render={(props) => (
                      //   <Organization
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Organization
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    /> 
                     <Route
                      exact
                      path="leave"
                      // render={(props) => (
                      //   <Leave
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Leave
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                     <Route
                      exact
                      path="rules"
                      // render={(props) => (
                      //   <Rules
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Rules
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                     <Route
                      exact
                      path="template"
                      // render={(props) => (
                      //   <Template
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Template
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                      
                      <Route
                      exact
                      path="category"
                      // render={(props) => (
                      //   <Category
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Category
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="categoryTab"
                      // render={(props) => (
                      //   <CategoryTab
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< CategoryTab
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      exact
                      path="library"
                      element={< Library
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Library
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="planner"
                      element={< Planner
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Planner
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="/psettinglanner"
                      // render={(props) => (
                      //   <Settings
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Settings
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/reports"
                      element={< Reports
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Reports
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                    <Route
                      exact
                      path="/analytics"
                      element={< Analytics
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Analytics
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="/partner"
                      element={< Partner
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Partner
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="/collection"
                      element={< Collection
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Collection
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="/dataroom"
                      element={< DataRoom
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <DataRoom
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="call"
                      element={< Call
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Call
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />

<Route
                      exact
                      path="/Sold"
                      // render={(props) => (
                      //   <Waranty
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Waranty
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                    <Route
                      exact
                      path="event"
                      // render={(props) => (
                      //   <Event
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Event
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      // exact
                      path="Task"
                      // render={(props) => (
                      //   <Task
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={<Task
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      exact
                      path="/employee/:id"
                      // render={(props) => (
                      //   <EmployeeDetails
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< EmployeeDetails
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                       <Route
                      exact
                      path="/distributor/:distributorId"
                      // render={(props) => (
                      //   <AccountDetails
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< AccountDetails
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  

                     <Route
                      exact
                      path="/hour/candidate/hour-details/project/:candidateId/:projectId"
                      // render={(props) => (
                      //   <CandidateTotalBilling
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< CandidateTotalBilling
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                     <Route
                      exact
                      path="/locationDetails/:locationDetailsId/:data?"
                      // render={(props) => (
                      //   <InventoryDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< InventoryDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />   
                     <Route
                      exact
                      path="/emptypage"
                      // render={(props) => (
                      //   <EmptyPage
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< EmptyPage
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                     <Route
                      exact
                      path="/nodatafoundpage"
                      element={< NodataFoundPage
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      
                      // render={(props) => (
                      //   <NodataFoundPage
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    /> 
                 
                     <Route
                      exact
                      path="/scan/:phoneId"
                      element={< PhoneScanner
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <PhoneScanner
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
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

                    <Route
                      exact
                      path="/course/:courseId"
                      element={< CourseDetails
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <CourseDetails
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    /> 
                     <Route
                      exact
                      path="/projects/:ProjectId"
                      // render={(props) => (
                      //   <ProjectsDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}

                      element={< ProjectsDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    /> 
                     <Route
                      exact
                      path="/program/:programDetailsId"
                      // render={(props) => (
                      //   <ProjectsDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< ProjectsDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    /> 
                         <Route
                      exact
                      path="/assessment/:assessmentId"
                      // render={(props) => (
                      //   <AssessmentDetails
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< AssessmentDetails
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    /> 
                      <Route
                      exact
                      path="/change-password"
                      // render={(props) => (
                      //   <ChangePassword
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< ChangePassword
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                       <Route
                      exact
                      path="/recruite"
                      element={< Recruitment
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Recruitment
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />  
                     <Route
                      exact
                      path="/publish"
                      element={< Publish
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Publish
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />  
                   <Route
                      exact
                      path="/program"
                      element={< Program
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Program
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      
                      <Route
                      exact
                      path="/course"
                      element={< Course
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Course
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                                          
                                          <Route
                      exact
                      path="/project"
                      element={< Projects
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Projects
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     
                     <Route
                      exact
                      path="/billing"
                      element={< Billing
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Billing
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                                     
                      <Route
                      exact
                      path="/customer"
                      element={< Customer
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Customer
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="/contact"
                      element={< Contact
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Contact
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                       <Route
                      exact
                      path="/opportunity"
                      element={< Opportunity
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Opportunity
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                    <Route
                      exact
                      path="/product"
                      element={< Product
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Product
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="/production"
                      element={< Production
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Production
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                    <Route
                     
                      path="/quality"
                      element={< Quality
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Quality
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                     <Route
                      exact
                      path="/shipper/:shipperId"
                      // render={(props) => (
                      //   <ShipperDetails
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}

                      element={< ShipperDetails
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/candidate"
                      element={< Candidate
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <Candidate
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />          
                      {/* <Route
                      exact
                      path="/message"
                      render={(props) => (
                        <LiveMessage
                          {...props}
                          translateText={translateText}
                           selectedLanguage={selectedLanguage}
                        />
                      )}
                    />  */}

                      <Route
                        exact
                        path="/candidate/:candidateId"
                        element={< CandidateDetails
                          translateText={translateText}
                          selectedLanguage={selectedLanguage}
                        />}
                        // element={< CandidateDetails
                        //   translateText={translateText}
                        //   selectedLanguage={selectedLanguage}
                        // />}
                        // render={(props) => <CandidateDetails {...props} 
                        // translateText={translateText}
                        // selectedLanguage={selectedLanguage} />}
                      />

                    <Route
                      exact
                      path="/customer/:customerId"
                      element={< CustomerDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <CustomerDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="/contact/:contactId"
                      element={< ContactDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <ContactDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="/supplier/:supplierId"
                      // render={(props) => (
                      //   <SupplierDetails
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< SupplierDetails
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     
                     <Route
                      exact
                      path="/opportunity"
                      // render={(props) => (
                      //   <Opportunity
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Opportunity
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                     path="/opportunity/:opportunityId"
                    

                      element={< OpportunityDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/partner/:partnerId"
                      // render={(props) => (
                      //   <PartnerDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< PartnerDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/import/account"
                      // render={(props) => (
                      //   <AccountImport
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< AccountImport
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/requirement"
                      // render={(props) => (
                      //   <Requirement
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Requirement
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/procurement"
                      // render={(props) => (
                      //   <Procurement
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Procurement
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      exact
                      path="/demand"
                      // render={(props) => (
                      //   <Demand
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Demand
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     
                      <Route
                      exact
                      path="/pitch"
                      // render={(props) => (
                      //   <Pitch
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Pitch
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />  
                    <Route
                      exact
                      path="/deal"
                      // render={(props) => (
                      //   <Deal
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Deal
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                      <Route
                      exact
                      path="/contactInvest"
                      element={< ContactInvest
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                      // render={(props) => (
                      //   <ContactInvest
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                    />
                      <Route
                      exact
                      path="/investor"
                      // render={(props) => (
                      //   <Investor
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Investor
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                    <Route
                      exact
                      path="/club"
                      // render={(props) => (
                      //   <Club
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Club
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                       <Route
                      exact
                      path="/investor/:investorId"
                      // render={(props) => (
                      //   <InvestorDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< InvestorDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     <Route
                      exact
                      path="/promotion"
                      // render={(props) => (
                      //   <Prmotion
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< Prmotion
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                    <Route
                      exact
                      path="/contactinvest/:contactId"
                      // render={(props) => (
                      //   <ContactInvestDetail
                      //     {...props}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< ContactInvestDetail
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />                      
                    <Route
                      exact
                      path="/subscriptionmainapps"
                      // render={(props) => (
                      //   <SubscriptionMainApps
                      //     {...props}
                      //     rowData={rowData}
                      //     translateText={translateText}
                      //      selectedLanguage={selectedLanguage}
                      //   />
                      // )}
                      element={< SubscriptionMainApps
                        translateText={translateText}
                        selectedLanguage={selectedLanguage}
                      />}
                    />
                     
                     
                    {/* </Switch> */}
                  </Routes>
                
                  </Suspense>
                </Content>
              {/* </NodataFoundPage> */}
            </div>
          </LayoutWrapper>
        </LayoutWrapper>
      </ThemeProvider>
      <AddActionModal
        addDrawerActionModal={props.addDrawerActionModal}
        handleActionDrawerModal={props.handleActionDrawerModal}
      />
      {/* <LiveMesssageModal
        addMessageModal={props.addMessageModal}
        handleMessageModal={props.handleMessageModal}
      /> */}
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
       {props.addAccountOpportunityModal && props.distributorData?.distributorId && (
  <AddAccountOpportunityModal
    selectedLanguage={props.selectedLanguage}
    translateText={props.translateText}
    distributorId={props.distributorData.distributorId}
    addAccountOpportunityModal={props.addAccountOpportunityModal}
    handleAccountOpportunityModal={props.handleAccountOpportunityModal}
  />
)}
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
  customer,
  call,
  task,
  event,
  candidate,
  opportunity,
  partner,
  
  contact,
  language,
  message,
  subscription,
  distributor
}) => ({
  language: language.language,
  addContactModal:contact.addContactModal,
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
  addDistributorModal: distributor.addDistributorModal,
  organizationDetails: auth.organizationDetails,
  addCandidateResumeModal: candidate.addCandidateResumeModal,
  addCallModal: call.addCallModal,
  suscrptionData: subscription.suscrptionData,
  user: auth.userDetails,
  addCustomerModal: customer.addCustomerModal,
  actionCount: auth.actionCount,
  token: auth.token,
  addOpportunityModal:opportunity.addOpportunityModal,
  clickTagInDrawr: refurbish.clickTagInDrawr,
  createSubscriptiondrawer: subscription.createSubscriptiondrawer,
  addPromotionnModal: auth.addPromotionnModal,
  distributorData: distributor.distributorDetailsByDistributorId,
  searchDistributor:distributor.searchDistributor,
  addAccountOpportunityModal: distributor.addAccountOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPresentNotifications,
      handlePartnerModal,
      updateUserById,
      handleCandidateResumeModal,
      handleCallModal,
      handleCustomerModal,
      setLanguage,
      getOpportunityRecord,
      getActionRequiredCount,
      // handleMessageModal,
      handleContactModal,
      handleOpportunityModal,
      handleActionDrawerModal,
      handleInTagDrawer,
      handleCreateSubscriptionDrawer,
      getSuscrption,
      handlePromotion,
      handleDistributorModal,
      handleAccountOpportunityModal,
      getDistributorByDistributorId,
      getSearchDistributor
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
