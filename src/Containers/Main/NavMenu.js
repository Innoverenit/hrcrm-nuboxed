import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Menu, Badge } from "antd";
import CellTowerIcon from '@mui/icons-material/CellTower';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ComputerIcon from '@mui/icons-material/Computer';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FilePresentIcon from '@mui/icons-material/FilePresent'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PortraitIcon from "@mui/icons-material/Portrait";
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CategoryIcon from '@mui/icons-material/Category'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import PeopleIcon from '@mui/icons-material/People';
import { BundleLoader } from '../../Components/Placeholder';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import FactoryIcon from '@mui/icons-material/Factory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import LuggageIcon from '@mui/icons-material/Luggage';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
const SubMenu = Menu.SubMenu;

function NavMenu(props) {
  const { user } = props;
  const navigate = useNavigate();
  
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("abv", props.selectedLanguage)


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '22', // 0
'43', // 1
'70', // 2
'199', // 3
'35', // 4
'197', // 5
'270', // 6
'213', // 7
'73', // 8
'97', // 9
'426', // 10
'481', // 11
'490', // 12
'517', // 13
'201', // 14
'592', // 15
'202', // 16
'248', // 17
'725', // 18
'654', // 19
'666', // 20
'796', // 21
'824', // 22
'856', // 23
'870', // 24
'1145', // 25
'880', // 26
'887', // 27
'41', // 28
'1099', // 29
'1146', // 30
'1101', // 31
'495', // 32
'948', // 33
'658', //34
'1147', //35
'920', //36
'203', //37
'758', //38
'1148', //39
'1149', //40
'1150',//41
'1102', //42
'1151', //43
'137', //44
'1152', //45
'1153', //46
'1164',//47
"1204",
"1010" ,//Billing 49
"739",//Publish
            
             
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

   const [selectedMenuItem, setSelectedMenuItem] = useState("/dashboard");
  // const [selectedMenuItem, setSelectedMenuItem] = useState(user.dashboardRegionalInd ? "/dashboardRegional" : "/dashboard");


  useEffect(() => {
    const storedMenuItem = localStorage.getItem('selectedMenuItem');
    if (storedMenuItem) {
      setSelectedMenuItem(storedMenuItem);
    }
  }, []);

  const handleClick = (e) => {
    console.log(e.key)
    navigate(e.key);
  };
  const handleSelect = (menuItemKey) => {
    setSelectedMenuItem(menuItemKey);
    localStorage.setItem('selectedMenuItem', menuItemKey);
    if (window.innerWidth <= 768) { // Assuming 768px is the breakpoint for mobile screens
      props.toggle(true);
    }
    // Additional logic for handling selection
  };

  console.log("Oppo", props.opportunityRecord);

  let path = window.location.href.split("/")[3];
  console.log("path", path);
  console.log(user);
  console.log("userDetails",props.userDetails)
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <div >
 <aside
        className={` text-white w-[9vw] max-md:w-[9vw] min-w-[9vw] h-[-webkit-fill-available] overflow-x-auto max-sm:w-[34vw] fixed md:relative z-[100] md:translate-x-0 transform ${
          props.collapsed ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-30 ease-in-out`}
      >
      <Menu
      //  defaultSelectedKeys={[selectedMenuItem]}
        defaultSelectedKeys={["/" + path]}
        defaultOpenKeys={[]}
        mode="inline"
        theme="dark"
        style={{ background: "#38445E", fontFamily: "Poppins", }}
         inlineCollapsed={props.collapsed}
        selectedKeys={[selectedMenuItem]}
        onClick={handleClick}
      >
        {/* dashboard */}
 
 
          {/* {(user.userType !== "USER" && user.department !== "Vendor" && user.department !== "Customer" && user.dashboardAccessInd === true || user.role === "ADMIN") && ( */}

<Menu.Item key="/dashboard" 
// style={{ height: "1.45rem", display:"flex", display:"flex", paddingLeft:"1px",

// color: selectedMenuItem === '/dashboard' ? 'tomato' : '#28a355',}} 
className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '

>
  {/* <Link to="/dashboard" 
  // onClick={() => handleSelect('/dashboard')}
   > */}
    <DashboardIcon

    className='!text-base  text-[#e4eb2f] '
    />

    <span class="text-white text-ls ml-1">     
      {translatedMenuItems[0]}
      {/* Dashboard */}
      {/* RecruitProBoard */}
    </span>
  {/* </Link> */}
</Menu.Item>

{/* )} */}

     
        {(user.imInd === true && user.basicAccessInd === true || user.role === "ADMIN" && user.imInd === true) && (
          <Menu.Item key="/planner" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/planner' ? 'tomato' : '#28a355', paddingLeft:"1px"} } className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '> 
            <Link to="/planner" onClick={() => handleSelect('/planner')}>  
              <CalendarMonthIcon
              className='!text-base  text-[#e4eb2f] '
              />

              <span class="text-white text-ls ml-1">    
                {/* Planner */}
                {translatedMenuItems[1]}
              </span>
            </Link>
          </Menu.Item>
        )}
             
        {(user.basicAccessInd === true || user.role === "ADMIN") && (
          <Menu.Item key="/call" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/call' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/call" onClick={() => handleSelect('/call')}>
              <VolumeUpIcon        
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">        
                {translatedMenuItems[2]}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Call}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
        )}
        {(user.basicAccessInd === true || user.role === "ADMIN") && (
          <Menu.Item key="/Task" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/Task' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/Task" onClick={() => handleSelect('/Task')}>    
              <FactCheckIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">    
                {/* Task */}
                {translatedMenuItems[3]}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Task}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
        )}
        {(user.basicAccessInd === true && user.eventAccessInd === true || user.role === "ADMIN") &&  (
          <Menu.Item key="/event" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/event' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/event" onClick={() => handleSelect('/event')}>
              <EventAvailableIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">               
                {/* Event */}
                {translatedMenuItems[4]}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Event}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
        )}

        {(user.basicAccessInd === true || user.role === "ADMIN") && (
          <Menu.Item key="/reports" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/reports' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/reports"onClick={() => handleSelect('/reports')}>
              <PictureAsPdfIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">      
                {/* Reports */}
                {translatedMenuItems[5]}
              </span>
            </Link>
          </Menu.Item>
        )}

{(user.basicAccessInd === true || user.role === "ADMIN") && (
          <Menu.Item key="/Analytics" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/Analytics' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/Analytics"onClick={() => handleSelect('/Analytics')}>
              <DonutSmallIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
               
                Analytics
                {/* {translatedMenuItems[5]} */}
              </span>
            </Link>
          </Menu.Item>
        )}



        <hr />
        {(user.leadsAccessInd === true && user.crmInd === true 
        // || user.role === "ADMIN" && user.crmInd === true
      ) && (
          <Menu.Item key="/leads" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/leads' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/leads" onClick={() => handleSelect('/leads')}>
              <GroupsIcon

              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">  
                {translatedMenuItems[6]}
                {/* Leads */}
                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.leads}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}

        {(user.opportunityAccessInd === true && user.crmInd === true 
        // || user.role === "ADMIN" && user.crmInd === true
      ) && (
          <Menu.Item key="/opportunity" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/opportunity' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/opportunity" onClick={() => handleSelect('/opportunity')}>
            <LightbulbIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
       {/* Quotation */}
                {translatedMenuItems[7]}
                

                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.opportunityList}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}


        {(user.contactAccessInd === true && user.crmInd === true
        //  || user.role === "ADMIN" && user.crmInd === true
        ) && (
          <Menu.Item key="/contact" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/contact' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/contact" onClick={() => handleSelect('/contact')}>

              <ContactsIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* Contact"*/}
                {translatedMenuItems[8]}
                
                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.customerContact}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}

        {/* Customer */}
        {(user.customerAccessInd === true && user.crmInd === true 
        // || user.role === "ADMIN" && user.crmInd === true
      ) && (
          <Menu.Item key="/customer" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/customer' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/customer" onClick={() => handleSelect('/customer')}>

              <ApartmentIcon

              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* "Prospect */}
              {translatedMenuItems[9]}
                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.CustomerNo}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}
        <hr />
        
        {(user.imInd === true && user.pitchAccessInd === true
        //  || user.role === "ADMIN" && user.imInd === true 
        ) && (
          <Menu.Item key="/pitch " style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/pitch' ? 'tomato' : '#28a355',paddingLeft:"1px" }}className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/pitch" onClick={() => handleSelect('/pitch')}>
              <FilePresentIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* "Pitch" */}
                {translatedMenuItems[10]}
                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.investorLeads}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}


        {(user.imInd === true && user.dealAccessInd === true 
        // || user.role === "ADMIN" && user.imInd === true
      ) && (
          <Menu.Item key="/deal " style={{ height: "1.45rem", display:"flex", 
            color: selectedMenuItem === '/deal' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/deal" onClick={() => handleSelect('/deal')}>
              <CurrencyExchangeIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* "Deals"*/}
                {translatedMenuItems[12]}
                <Badge
                  count={props.opportunityRecord.investorOpportunity}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}
        {(user.imInd === true && user.investorContactAccessInd === true 
        // || user.role === "ADMIN" && user.imInd === true
      ) && (
          <Menu.Item key="/contactInvest" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/contactInvest' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/contactInvest"  onClick={() => handleSelect('/contactInvest')}>
              <ContactEmergencyIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* Contact Invest*/}
                {translatedMenuItems[13]}
                <Badge
                  count={props.opportunityRecord.investorcontact}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}
        {(user.imInd === true && user.investorAccessInd === true 
        // || user.role === "ADMIN" && user.imInd === true
      ) && (
          <Menu.Item key="/investor" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/investor' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/investor" onClick={() => handleSelect('/investor')}>

              <LocationCityIcon className='!text-base  text-[#e4eb2f]'  />
              <span class="text-white text-ls ml-1">
              {/* Investor */}
                {translatedMenuItems[14]}
                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.investor}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}
          {(user.imInd === true && user.clubAccessInd === true 
  ) &&  (
         <Menu.Item key="/club" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/club' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/club" onClick={() => handleSelect('/club')}>

              <GolfCourseIcon className='!text-base  text-[#e4eb2f]'

               
              />
              <span class="text-white text-ls ml-1 ">
             {/* Club */}
                {translatedMenuItems[15]}
                &nbsp;&nbsp;&nbsp;             
              </span>
            </Link>
          </Menu.Item>
          )}
          {/* {(user.imInd === true && user.dataRoomAccessInd === true */}
            {/* //  || user.role === "ADMIN" && user.imInd === true  */}
            {/* ) && ( */}
                      {/* <Menu.Item key="/dataroom " style={{ height: "1.45rem", display:"flex",
                        color: selectedMenuItem === '/dataroom' ? 'tomato' : '#28a355',paddingLeft:"1px" }}>
                        <Link to="/dataroom" onClick={() => handleSelect('/dataroom')}>
                          <MarkUnreadChatAltIcon
                          className='!text-base  text-[#e4eb2f]'
                          />
                          <span class="text-white text-ls ml-1">
                          Data Room
                            {translatedMenuItems[11]}
                            &nbsp;&nbsp;&nbsp;
                            
                          </span>
                        </Link>
                      </Menu.Item> */}
            {/* )} */}
       
        <hr/>
       
        {(user.orderAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.orderManagementInd === true
      ) &&  (

          <Menu.Item key="/order" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/order' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/order"  onClick={() => handleSelect('/order')}>
              <DynamicFeedIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
                {/*Order"
               */}
              {translatedMenuItems[16]}
              </span>
            </Link>
          </Menu.Item>
        )}

        {(user.accountAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.orderManagementInd === true
      ) &&  (

          <Menu.Item key="/account" style={{ height: "1.45rem", display:"flex", 
           color: selectedMenuItem === '/account' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/account"  onClick={() => handleSelect('/account')}>
              <AcUnitIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {translatedMenuItems[17]}
                {/* Customer"
              */}
              </span>
            </Link>
          </Menu.Item>
        )}
        {(user.catalogAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.productionInd === true
      ) &&  (
        <Menu.Item key="/product" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/product' ? 'tomato' : '#28a355' ,paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/product" onClick={() => handleSelect('/product')}>
            <ViewInArIcon
            className='!text-base  text-[#e4eb2f]'
            />
            <span class="text-white text-ls ml-1">
              {/*Catalogue"
           */}
            {translatedMenuItems[18]}
            </span>
          </Link>
        </Menu.Item>
        )}

          {(user.promotionAccessInd === true && user.moduleMapper.ecomModInd === true 
        // || user.role === "ADMIN" && user.productionInd === true
      ) &&  (
        <Menu.Item key="/promotion" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/promotion' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/promotion" onClick={() => handleSelect('/promotion')}>
            <PointOfSaleIcon 
            className='!text-base  text-[#e4eb2f]'
            />
            <span class="text-white text-ls ml-1">
              {/*Quality"
            */}
             {translatedMenuItems[47]}
            </span>
          </Link>
        </Menu.Item>
         )}

         {(user.subscriptionAccessInd === true && user.erpInd === true 
        //  || user.role === "ADMIN" && user.subscriptionAccessInd === true
        ) &&  (
        <Menu.Item key="/subscriptionmainapps" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/subscriptionmainapps' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/subscriptionmainapps" onClick={() => handleSelect('/subscriptionmainapps')}>
            <SubscriptionsIcon
            className='!text-base  text-[#e4eb2f]'
            />
            <span class="text-white text-ls ml-1">
              {/* Subscription"
            */}
            {translatedMenuItems[39]}
            </span>
          </Link>
        </Menu.Item>
         )}
        <hr />
        {(user.refurbishWorkshopInd === true && user.repairInd === true 
        // || user.role === "ADMIN" && user.repairInd === true
      ) &&  (

          <Menu.Item key="/refurbish" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/refurbish' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/refurbish" onClick={() => handleSelect('/refurbish')}>
              <OnDeviceTrainingIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
                {/*Refurbish"
                 */}
                 {translatedMenuItems[38]}
              </span>
            </Link>
          </Menu.Item>
        )}
         {(user.productionAccessInd === true && user.productionInd === true 
        //  || user.role === "ADMIN" && user.productionInd === true
        ) &&  (
        <Menu.Item key="/production" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/production' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/production" onClick={() => handleSelect('/production')}>
            <PrecisionManufacturingIcon
            className='!text-base  text-[#e4eb2f]'
            />
            <span class="text-white text-ls ml-1">
              {/*Production"
             */}
              {translatedMenuItems[37]}
            </span>
          </Link>
        </Menu.Item>
        )} 
 {( user.erpInd === true && user.qualityAccessInd === true 
  ) &&  (
<Menu.Item key="/quality" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/quality' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          {/* <Link to="/quality" onClick={() => handleSelect('/quality')}> */}
            <VerifiedUserIcon
            className='!text-base  text-[#e4eb2f]'
            />
            <span class="text-white text-ls ml-1">
              {/* Quality"
             */}
             {translatedMenuItems[19]}
            </span>
          {/* </Link> */}
        </Menu.Item>
 )}
  {(user.warAccInd === true &&  user.erpInd === true && user.hrInd === true
  || user.productionInd === true &&  user.repairInd === true 
       
      ) &&  (
<Menu.Item key="/sold" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/sold' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/sold" onClick={() => handleSelect('/sold')}>

              <ApartmentIcon

              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* Prospect */}     
             {translatedMenuItems[48]} 
             {/* Waranty */}
                &nbsp;&nbsp;&nbsp;                
              </span>
            </Link>
          </Menu.Item>
           )}
<hr/>
        {(user.materialAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.inventoryInd === true
      ) &&  (

          <Menu.Item key="/supplies" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/supplies' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/supplies" onClick={() => handleSelect('/supplies')} >
              <CategoryIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
                {/*Material"
            */}
               {translatedMenuItems[21]}
              </span>
            </Link>
          </Menu.Item>
        )}
         {(user.supplierAccessInd === true && user.erpInd === true 
        //  || user.role === "ADMIN" && user.inventoryInd === true
        ) && (

<Menu.Item key="/suppliers" style={{ height: "1.45rem", display:"flex", 
 color: selectedMenuItem === '/suppliers' ? 'tomato' : '#28a355',paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
  <Link to="/suppliers" onClick={() => handleSelect('/suppliers')}>
    <FactoryIcon
    className='!text-base  text-[#e4eb2f]'
    />
    <span class="text-white text-ls ml-1">
      {/* Suppliers"
    */}
     {translatedMenuItems[22]}
    </span>
  </Link>
</Menu.Item>
 )} 
  {( user.tradingInd === true 
       
      ) &&  (
<Menu.Item key="/trade" style={{ height: "1.45rem", display:"flex", 
 color: selectedMenuItem === '/trade' ? 'tomato' : '#28a355',paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
  <Link to="/trade" onClick={() => handleSelect('/trade')}>
    <ShopTwoIcon
    className='!text-base  text-[#e4eb2f]'
    />
    <span class="text-white text-ls ml-1">
      {/* Trade */}
      {translatedMenuItems[23]}
    </span>
  </Link>
</Menu.Item>
      )}

  {(user.procurementAccessInd === true && user.erpInd === true 
    // || user.role === "ADMIN" && user.procurementInd === true
    ) && (
<Menu.Item key="/procurement" style={{ height: "1.45rem", display:"flex", 
color: selectedMenuItem === '/procurement' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/procurement" onClick={() => handleSelect('/procurement')}>
              <CrisisAlertIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
                {/* Procurement"
               */}
               {translatedMenuItems[25]}
              </span>
            </Link>
          </Menu.Item>
  )}
        <hr />
        {
  (user.inventoryAccessInd === true && user.erpInd === true 
    // || user.role === "ADMIN" && user.inventoryInd === true
  ) && (
    <Menu.Item key="/inventory" style={{ height: "1.45rem", display:"flex",  color: selectedMenuItem === '/inventory' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
      <Link to="/inventory" onClick={() => handleSelect('/inventory')}>
        <InventoryIcon
        className='!text-base  text-[#e4eb2f]'
        />
        <span className="text-white text-ls ml-1">
          {/* Inventory"
           */}
           {translatedMenuItems[26]}
        </span>
      </Link>
    </Menu.Item>
  )
}


        {(user.shipperAccessInd === true && user.erpInd === true 
        // ||  user.role === "ADMIN" && user.logisticsInd === true
      ) &&  (

          <Menu.Item key="/shipper" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/shipper' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/shipper" onClick={() => handleSelect('/shipper')}>
              <LocalShippingIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
                {/* Shipper"
              */}
               {translatedMenuItems[27]}
              </span>
            </Link>
          </Menu.Item>
        )}
        <hr />

    


        
  {(user.collectionAccessInd === true && user.financeInd === true 
  // || user.role === "ADMIN" && user.financeInd === true
) &&  (

        <Menu.Item key="/collection" style={{ height: "1.45rem", display:"flex",
         color: selectedMenuItem === '/collection' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/collection" onClick={() => handleSelect('/collection')} >
            <ReceiptIcon   className='!text-base  text-[#e4eb2f]' style={{ fontSize: "large" }} />
            <span class="text-white text-ls ml-1">
            {/* Collections"
                */}
               {translatedMenuItems[36]}
            </span>
          </Link>
        </Menu.Item>

  )}

    
        <hr />
        {(user.leaveAccessInd === true   && user.moduleMapper.hrInd === true
        // || user.role === "ADMIN"
      ) && ( 
        <Menu.Item key="/report" style={{ height: "1.45rem", display:"flex", 
         color: selectedMenuItem === '/report' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/leave" onClick={() => handleSelect('/report')}>
            <LuggageIcon className="!text-base  text-[#e4eb2f]"/>
            <span class="text-white text-ls ml-1 ">
              {/* Leaves"  */}
             {translatedMenuItems[28]}
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.leave}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item>
       )} 
        {(user.mileageAccessInd === true  && user.moduleMapper.hrInd === true
        // ||
        //  user.role === "ADMIN"
        ) &&( 
        <Menu.Item key="/mileage" style={{ height: "1.45rem", display:"flex", 
         color: selectedMenuItem === '/mileage' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/mileage" onClick={() => handleSelect('/mileage')}>
            <DirectionsCarFilledIcon className="!text-base  text-[#e4eb2f]"/>
          
            <span class="text-white   text-ls ml-1">
              {/*Mileage"
             */}
             {translatedMenuItems[29]}
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.mileage}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item>
        )}
     {(user.expenseAccessInd === true    && user.moduleMapper.hrInd === true
    //  || user.role === "ADMIN"
    ) && ( 
        <Menu.Item key="/expense" style={{ height: "1.45rem", display:"flex",
          color: selectedMenuItem === '/expense' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/expense" onClick={() => handleSelect('/expense')}>
            <ReceiptIcon className='!text-base  text-[#e4eb2f]'/>
            <span class="text-white text-ls ml-1">
              {/* Expense"
             */}
             {translatedMenuItems[30]}
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.expense}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item>
        )} 


{(user.holidayAccessInd === true   
// || user.role === "ADMIN"
) && ( 
        <Menu.Item key="/holiday" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/holiday' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/holiday" onClick={() => handleSelect('/holiday')}>

          <ModeOfTravelIcon  className='!text-base  text-[#e4eb2f]'/>
           
            <span class="text-white text-ls ml-1">
              {/* Holiday"
             */}
 {translatedMenuItems[31]}
            </span>
          </Link>
        </Menu.Item>
       )} 


{( user.hrInd === true   && user.role === "ADMIN" && user.moduleMapper.recruitProInd === true 

) && ( 
        <Menu.Item key="/assessment" style={{ height: "1.45rem", display:"flex", 
        color: selectedMenuItem === '/assessment' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
          <Link to="/assessment" onClick={() => handleSelect('/assessment')}>

            < AssessmentIcon  className="!text-base  text-[#e4eb2f]"/>
      
            <span class="text-white text-ls ml-1">
           {/* KPI Assessment */}
           {translatedMenuItems[35]}
            </span>
          </Link>
        </Menu.Item>
        )} 

        {/* 
           </SubMenu> 
     )}  */}
    
        <hr />
        {((user.talentAccessInd === true && user.moduleMapper.recruitProInd === true) 
      ) && ( 
            <Menu.Item key="/candidate" style={{ height: "1.45rem", display:"flex", 
             color: selectedMenuItem === '/candidate' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
              <Link to="/candidate" onClick={() => handleSelect('/candidate')}>
          
                <PortraitIcon
            
                className='!text-base  text-[#e4eb2f]'
                />
                 <span class="text-white text-ls ml-1">
            
              
                  {translatedMenuItems[46]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.CandidateNo}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}   
        {/*Talent*/}
        {/*Requirement*/}
        {((user.requirementAccessInd === true && user.moduleMapper.recruitProInd === true )
    ) &&  ( 
          <Menu.Item key="/requirement" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/requirement' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/requirement" onClick={() => handleSelect('/requirement')}>

              <RecentActorsIcon
              className='!text-base  text-[#e4eb2f]' />

              <span class="text-white text-ls ml-1">
                {translatedMenuItems[45]}
                &nbsp;
                <Badge
                  count={props.opportunityRecord.RecruitmentList}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
          )} 
          {((user.requirementAccessInd === true && user.moduleMapper.recruitProInd === true)
          // || user.role === "ADMIN" && user.recruitProInd === true
        ) &&  (
         <Menu.Item key="/project" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/project' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
              <Link to="/project" onClick={() => handleSelect('/project')}>
                <LightbulbIcon
                className='!text-base  text-[#e4eb2f]'
                />
                <span class="text-white text-ls ml-1">
                {/* Project */}
                
                  {translatedMenuItems[44]}
                </span>
              </Link>
            </Menu.Item> 
 )}
          {/* <hr/> */}
        {/* )} */}
        {/*Demand*/}
        {/* {(user.moduleMapper.recruitProInd === true &&  
          <Menu.Item key="/demand" style={{ height: "1.45rem", display:"flex", 
           color: selectedMenuItem === '/demand' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/demand" onClick={() => handleSelect('/demand')}>
              <ContactsIcon

              className='!text-base  text-[#e4eb2f]' />

              <span class="text-white text-ls ml-1">
              Demand
              {translatedMenuItems[43]} 
              
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </Link>
          </Menu.Item>
         )} */}
        {/*Demand*/}

        {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}

        {/*Customer*/}


       
 
        {(user.moduleMapper.recruitProInd === true &&  
        <Menu.Item key="/billing" style={{height:"1.45rem",paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/Billing">
              <AccessAlarmIcon className='!text-base  text-[#e4eb2f]'/>
             <span class="text-white text-ls "> {translatedMenuItems[49]} </span>
            </Link>
          </Menu.Item>
       )} 
{/*Publish*/}
        {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
        {((user.publishAccessInd === true  && user.moduleMapper.recruitProInd === true))  && (
        <Menu.Item key="/publish" style={{ height: "1.45rem", display:"flex", 
          color: selectedMenuItem === '/publish' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/publish" onClick={() => handleSelect('/publish')}>

              <CellTowerIcon className='!text-base  text-[#e4eb2f]'/>
              <span class="text-white text-ls ml-1">
              {translatedMenuItems[50]}
                 {/* publish */}
                </span>
            </Link>
          </Menu.Item>
        )} 

        {/*Publish*/}
              {/* {user.department === "Management" && user.moduleMapper.recruitProInd === true && (
            <Menu.Item key="/invoice" style={{height:"1.45rem",paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
              <Link to="/Invoice">
                <TextSnippetIcon

                  className='!text-base  text-[#e4eb2f]'
                />
               <span class="text-white text-ls ml-3">
                
                  {translatedMenuItems[17]}
                </span>
              </Link>
            </Menu.Item>
          )}   */}
      

        {/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Customer" && user.department !== "Recruiter" &&( */}
        {/* VENDOR */}
        {/* {user.vendorAccessInd === true && (
            <Menu.Item key="/partner" style={{height:"1.45rem"}}>
              <Link to="/partner">
              
                <HandshakeIcon
             
               className='!text-base  text-[#e4eb2f]'
                />
                <span class="text-white text-ls ml-3">
           
                  {translatedMenuItems[18]}
             
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.PartnerNo}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )} */}
        {/*Vendor*/}


        {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( */}



        {/* Accessment */}


        {/* <hr /> */}
        {/* Accessment */}

        {(user.eLearningInd === true && user.assessmentAccessInd === true 
        // || user.role === "ADMIN" && user.eLearningInd === true
      ) &&  (
            <Menu.Item key="/accessment" style={{ height: "1.45rem", display:"flex",
              color: selectedMenuItem === '/accessment' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
              <Link to="/Accessment" onClick={() => handleSelect('/accessment')}>
                <ComputerIcon

                  className='!text-base  text-[#e4eb2f]'
                />
                 <span class="text-white text-ls ml-1">
               
                 {translatedMenuItems[42]} 
                </span>
              </Link>
            </Menu.Item>
          )}

        {(user.eLearningInd === true && user.courseAccessInd === true 
        // || user.role === "ADMIN" && user.eLearningInd === true
      ) && (
            <Menu.Item key="/course" style={{ height: "1.45rem", display:"flex",
             color: selectedMenuItem === '/course' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
              <Link to="/Course" onClick={() => handleSelect('/course')}>
                <NewspaperIcon

                className='!text-base  text-[#e4eb2f]'
                />
               <span class="text-white text-ls ml-1">
              
                 {translatedMenuItems[41]}
                </span>
              </Link>
            </Menu.Item>
          )}
        {/* Program */}
        {(user.eLearningInd === true && user.programAccessInd === true 
        // || user.role === "ADMIN" && user.eLearningInd === true
      ) && (
            <Menu.Item key="/program" style={{ height: "1.45rem", display:"flex",
              color: selectedMenuItem === '/program' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
              <Link to="/Program" onClick={() => handleSelect('/program')}>
                <LibraryBooksIcon

                 className='!text-base  text-[#e4eb2f]'
                />
                <span class="text-white text-ls ml-1">
            
               {translatedMenuItems[40]}
                </span>
              </Link>
            </Menu.Item>
          )}

        {/* <hr /> */}



        <hr />
        {/* {user.userAccessInd === true || user.role === "ADMIN"  && ( */}
        { (user.teamsAccessInd === true &&  user.hrInd === true 
        // || user.role === "ADMIN" &&  user.hrInd === true
      ) ? (
               
               <Menu.Item key="/teams" style={{height:"1.45rem",
                color: selectedMenuItem === '/teams' ? 'tomato' : '#28a355',paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
                <Link to="/teams" onClick={() => handleSelect('/teams')}>
                 <PeopleIcon
              className='!text-base  text-[#e4eb2f]'
                  />
                  <span class="text-white text-ls ml-1">
                  
                {translatedMenuItems[32]}
                   </span>
                 </Link> 
                </Menu.Item>
                ):null} 

        {(user.userAccessInd === true && user.hrInd === true  
         || user.role === "ADMIN" &&  user.hrInd === true
      ) ? (

          <Menu.Item key="/employees" style={{ height: "1.45rem", display:"flex",
            color: selectedMenuItem === '/employees' ? 'tomato' : '#28a355',paddingLeft:"1px" }} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/Employees" onClick={() => handleSelect('/employees')}>
              <GroupsIcon

              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {translatedMenuItems[33]}
               
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Employee}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
        ):null}
        {/* )} */}

        {/* <Menu.Item key="/plant" style={{ height: "1.45rem", display:"flex", paddingLeft: "1rem" }}>
          <Link to="/plant">
            <FactoryIcon
            className='!text-base  text-[#e4eb2f]'
            />
            <span class="text-white text-ls ml-1">Plant
           
            </span>
          </Link>
        </Menu.Item> */}
        {(user.locationAccessInd === true && user.hrInd === true || user.role === "ADMIN" &&  user.hrInd === true) &&  (

          <Menu.Item key="/location" style={{ height: "1.45rem", display:"flex",
           color: selectedMenuItem === '/location' ? 'tomato' : '#28a355' ,paddingLeft:"1px"}} className='scale-[0.99] hover:scale-100 ease-in duration-100  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] '>
            <Link to="/location" onClick={() => handleSelect('/location')}>
              <LocationOnIcon
              className='!text-base  text-[#e4eb2f]'
              />
              <span class="text-white text-ls ml-1">
              {/* Location */}
              {translatedMenuItems[34]}
              </span>
            </Link>
          </Menu.Item>
        )}
        {/* Employees */}

      </Menu>
      </aside>
    </div>
  );
}


const mapStateToProps = ({ auth, opportunity, requirement }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  userDetails: auth.userDetails,
  opportunityRecord: opportunity.opportunityRecord,
  requirementRecord: requirement.requirementRecord,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOpportunityRecord
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
