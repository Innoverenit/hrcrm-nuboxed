import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Menu, Badge } from "antd";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ComputerIcon from '@mui/icons-material/Computer';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { FormattedMessage } from "react-intl";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
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
import { Link } from "react-router-dom";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CategoryIcon from '@mui/icons-material/Category'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import PeopleIcon from '@mui/icons-material/People';

const SubMenu = Menu.SubMenu;

function NavMenu(props) {
  const { user } = props;
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("abv", props.selectedLanguage)


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          'Dashboard',
            'Planner',
            'Calls',
            'Task',
            'Events',
            'Reports',
            'Leads',
            'Quotation',
            'Contact',
            'Prospect',
            'Pitch',
            'Data Room',
            'Deals',
            'Contact Invest',
            'Investor',
            'Club',
            'Order',
            'Customer',
            'Catalogue',
            'Quality',
            'Procure',
            'Material',
            'Suppliers',
            'Trade',
            'Vendor',
            'Procurement',
            'Inventory',
            'Shipper',
            'Leaves',
            'Mileage',
            'Expense',
            'Holiday',
            'Teams',
            'Users',
            
             
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
  // useEffect(() => {
  //   const fetchMenuTranslations = async () => {
  //     try {
  //       const translations = await Promise.all([
  //         translateText('Dashboard', props.selectedLanguage),
  //         translateText('Planner', props.selectedLanguage),
  //         translateText('Calls', props.selectedLanguage),
  //         translateText('Tasks', props.selectedLanguage),
  //         translateText('Events', props.selectedLanguage),
  //         translateText('Reports', props.selectedLanguage),
  //         translateText('Users', props.selectedLanguage),
  //         translateText('Opportunity', props.selectedLanguage),
  //         translateText('Contact', props.selectedLanguage),
  //         translateText('Customer', props.selectedLanguage),
  //         translateText('Talent', props.selectedLanguage),
  //         translateText('Requirement', props.selectedLanguage),
  //         translateText('Demand', props.selectedLanguage),
  //         translateText('Leads', props.selectedLanguage),
  //         translateText('Post', props.selectedLanguage),
  //         translateText('Project', props.selectedLanguage),
  //         translateText('Hours', props.selectedLanguage),
  //         translateText('Invoice', props.selectedLanguage),
  //         translateText('Vendor', props.selectedLanguage),
  //         translateText('Test', props.selectedLanguage),
  //         translateText('Courses', props.selectedLanguage),
  //         translateText('Program', props.selectedLanguage),
  //       ]);

  //       setTranslatedMenuItems(translations);
  //     } catch (error) {
  //       console.error('Error translating menu items:', error);
  //     }
  //   };

  //   fetchMenuTranslations();
  // }, [props.selectedLanguage]);

   const [selectedMenuItem, setSelectedMenuItem] = useState("/dashboard");
  // const [selectedMenuItem, setSelectedMenuItem] = useState(user.dashboardRegionalInd ? "/dashboardRegional" : "/dashboard");


  useEffect(() => {
    const storedMenuItem = localStorage.getItem('selectedMenuItem');
    if (storedMenuItem) {
      setSelectedMenuItem(storedMenuItem);
    }
  }, []);
  const handleSelect = (menuItemKey) => {
    setSelectedMenuItem(menuItemKey);
    localStorage.setItem('selectedMenuItem', menuItemKey);
    // Additional logic for handling selection
  };

  console.log("Oppo", props.opportunityRecord);

  let path = window.location.href.split("/")[3];
  console.log("path", path);
  console.log(user);
  console.log("userDetails",props.userDetails)
  return (
    <div style={{ marginLeft: "-1.1875em" }}>

      <Menu
      //  defaultSelectedKeys={[selectedMenuItem]}
        defaultSelectedKeys={["/" + path]}
        defaultOpenKeys={[]}
        mode="inline"
        // theme={props.theme}
        theme="dark"
        style={{ background: "#38445E", fontFamily: "Poppins", }}
        inlineCollapsed={props.collapsed}
        selectedKeys={[selectedMenuItem]}
      >
        {/* dashboard */}
 
 
          {(user.userType !== "USER" && user.department !== "Vendor" && user.department !== "Customer" && user.dashboardAccessInd === true || user.role === "ADMIN") && (

<Menu.Item key="/dashboard" style={{ height: "1.45rem", 

color: selectedMenuItem === '/dashboard' ? 'tomato' : '#4bc076',}}>
  <Link to="/dashboard" onClick={() => handleSelect('/dashboard')}>
    <DashboardIcon

      style={{ fontSize: "large" }}
    />

    <span class="text-white text-ls ml-1">
      {/* <FormattedMessage
          id="app.dashboard"
          defaultMessage="Dashboard"
        /> */}
      {translatedMenuItems[0]}
      {/* Dashboard */}
      {/* RecruitProBoard */}
    </span>
  </Link>
</Menu.Item>

)}


      
        {(user.imInd === true && user.basicAccessInd === true || user.role === "ADMIN" && user.imInd === true) && (
          <Menu.Item key="/planner" style={{ height: "1.45rem", 
          color: selectedMenuItem === '/planner' ? 'tomato' : '#4bc076', }}>
            <Link to="/planner" onClick={() => handleSelect('/planner')}>
              {/* <Icon type="calendar" style={{ color: "white" }} /> */}
              <CalendarMonthIcon
                style={{ fontSize: "large" }}
              />

              <span class="text-white text-ls ml-1">
                {/* <FormattedMessage id="app.planner" defaultMessage="Planner" /> */}
                {/* Planner */}
                {translatedMenuItems[1]}
              </span>
            </Link>
          </Menu.Item>
        )}
     

        
        {(user.basicAccessInd === true || user.role === "ADMIN") && (
          <Menu.Item key="/call" style={{ height: "1.45rem",
           color: selectedMenuItem === '/call' ? 'tomato' : '#4bc076', }}>
            <Link to="/call" onClick={() => handleSelect('/call')}>
              {/* <Icon style={{ color: "white" }} type="phone" /> */}
              <VolumeUpIcon
                // icon={solid("phone-volume")}
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
                {/* <FormattedMessage id="app.calls" defaultMessage="Calls" /> */}
                {/* Calls */}
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
          <Menu.Item key="task" style={{ height: "1.45rem",
           color: selectedMenuItem === '/Task' ? 'tomato' : '#4bc076' }}>
            <Link to="/Task" onClick={() => handleSelect('/Task')}>
              {/* <Icon type="file-done" /> */}
              <FactCheckIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
                <FormattedMessage id="app.task" defaultMessage="Task" />
                {/* Task */}
                {/* {translatedMenuItems[3]} */}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Task}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
        )}
        {(user.basicAccessInd === true || user.role === "ADMIN") && (
          <Menu.Item key="/event" style={{ height: "1.45rem",
           color: selectedMenuItem === '/event' ? 'tomato' : '#4bc076' }}>
            <Link to="/event" onClick={() => handleSelect('/event')}>
              {/* <Icon type="schedule" /> */}
              <EventAvailableIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
                <FormattedMessage
                  id="app.events"
                  defaultMessage="Events"
                />
                {/* Event */}
                {/* {translatedMenuItems[4]} */}
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
          <Menu.Item key="/reports" style={{ height: "1.45rem", 
          color: selectedMenuItem === '/reports' ? 'tomato' : '#4bc076' }}>
            <Link to="/reports"onClick={() => handleSelect('/reports')}>
              <PictureAsPdfIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
                <FormattedMessage id="app.reports" defaultMessage="Reports" />
                {/* Reports */}
                {/* {translatedMenuItems[5]} */}
              </span>
            </Link>
          </Menu.Item>
        )}




        <hr />
        {(user.leadsAccessInd === true && user.crmInd === true 
        // || user.role === "ADMIN" && user.crmInd === true
      ) && (
          <Menu.Item key="/leads" style={{ height: "1.45rem",
           color: selectedMenuItem === '/leads' ? 'tomato' : '#4bc076' }}>
            <Link to="/leads" onClick={() => handleSelect('/leads')}>
              <GroupsIcon

                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.leads" defaultMessage="Leads" />
                {/* {translatedMenuItems[13]} */}
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
          <Menu.Item key="/opportunity" style={{ height: "1.45rem",
            color: selectedMenuItem === '/opportunity' ? 'tomato' : '#4bc076' }}>
            <Link to="/opportunity" onClick={() => handleSelect('/opportunity')}>
            <LightbulbIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.quotation" defaultMessage="Quotation" />
                {/* {translatedMenuItems[7]} */}
                

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
          <Menu.Item key="/contact" style={{ height: "1.45rem",
           color: selectedMenuItem === '/contact' ? 'tomato' : '#4bc076' }}>
            <Link to="/contact" onClick={() => handleSelect('/contact')}>

              <ContactsIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.contact" defaultMessage="Contact" />
                {/* {translatedMenuItems[8]} */}
                
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
          <Menu.Item key="/customer" style={{ height: "1.45rem",
            color: selectedMenuItem === '/customer' ? 'tomato' : '#4bc076' }}>
            <Link to="/customer" onClick={() => handleSelect('/customer')}>

              <ApartmentIcon

                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.prospect" defaultMessage="Prospect" />
                
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
          <Menu.Item key="/pitch " style={{ height: "1.45rem",
            color: selectedMenuItem === '/pitch' ? 'tomato' : '#4bc076' }}>
            <Link to="/pitch" onClick={() => handleSelect('/pitch')}>
              <FilePresentIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.pitch" defaultMessage="Pitch" />
                {/* {translatedMenuItems[13]} */}
                &nbsp;&nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.investorLeads}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
        )}

{(user.imInd === true && user.dataRoomAccessInd === true
//  || user.role === "ADMIN" && user.imInd === true 
) && (
          <Menu.Item key="/dataroom " style={{ height: "1.45rem",
            color: selectedMenuItem === '/dataroom' ? 'tomato' : '#4bc076' }}>
            <Link to="/dataroom" onClick={() => handleSelect('/dataroom')}>
              <FilePresentIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              Data Room
                {/* {translatedMenuItems[13]} */}
                &nbsp;&nbsp;&nbsp;
                
              </span>
            </Link>
          </Menu.Item>
)}
        {(user.imInd === true && user.dealAccessInd === true 
        // || user.role === "ADMIN" && user.imInd === true
      ) && (
          <Menu.Item key="/deal " style={{ height: "1.45rem", 
            color: selectedMenuItem === '/deal' ? 'tomato' : '#4bc076' }}>
            <Link to="/deal" onClick={() => handleSelect('/deal')}>
              <CurrencyExchangeIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.deals" defaultMessage="Deals" />
                {/* {translatedMenuItems[13]} */}
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
          <Menu.Item key="/contactInvest" style={{ height: "1.45rem",
            color: selectedMenuItem === '/contactInvest' ? 'tomato' : '#4bc076' }}>
            <Link to="/contactInvest"  onClick={() => handleSelect('/contactInvest')}>
              <PermContactCalendarIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.contactInvest" defaultMessage="Contact Invest" />
                {/* {translatedMenuItems[13]} */}
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
          <Menu.Item key="/investor" style={{ height: "1.45rem", 
          color: selectedMenuItem === '/investor' ? 'tomato' : '#4bc076' }}>
            <Link to="/investor" onClick={() => handleSelect('/investor')}>

              <LocationCityIcon

                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.investor" defaultMessage="Investor" />
                {/* {translatedMenuItems[9]} */}
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
         <Menu.Item key="/club" style={{ height: "1.45rem", 
          color: selectedMenuItem === '/club' ? 'tomato' : '#4bc076' }}>
            <Link to="/club" onClick={() => handleSelect('/club')}>

              <LocationCityIcon

                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
             Club
                {/* {translatedMenuItems[9]} */}
                &nbsp;&nbsp;&nbsp;
                {/* <Badge
                  count={props.opportunityRecord.investor}
                  overflowCount={999}
                ></Badge> */}
              </span>
            </Link>
          </Menu.Item>
          )}
        {/* {user.userType !== "USER" && user.department !== "Customer" &&user.department == "VENDOR" && ( */}


        {/*Requirement*/}
        {/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Recruiter" &&user.department !== "Customer"&&
          ( */}


        {/*Opportunity*/}

        {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
        {/* {user.talentCreateInd ===true && ( */}

        {/* )}  */}
        {/* {user.userType !== "USER" && props.department !== "Recruiter" &&user.department !== "VENDOR" &&user.department === "Customer" &&props.role !== "ADMIN" &&props.role !== "USER" &&(   */}


        {/*Contact*/}
        {/* )}  */}
        <hr/>
        {/* Talent */}
       {((user.talentAccessInd === true && user.recruitProInd === true) 
      //  || (user.role === "ADMIN" && user.recruitProInd === true)
      ) &&  (
            <Menu.Item key="/candidate" style={{ height: "1.45rem", 
             color: selectedMenuItem === '/candidate' ? 'tomato' : '#4bc076' }}>
              <Link to="/candidate" onClick={() => handleSelect('/candidate')}>
          
                <PortraitIcon
            
                  style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-1">
                 <FormattedMessage id="app.talent" defaultMessage="Talent" />
              
                  {/* {translatedMenuItems[10]} */}
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
        {(user.requirementAccessInd === true && user.recruitProInd === true 
        // || user.role === "ADMIN" && user.recruitProInd === true
      )
         &&  (
          <Menu.Item key="/requirement" style={{ height: "1.45rem",
            color: selectedMenuItem === '/requirement' ? 'tomato' : '#4bc076' }}>
            <Link to="/requirement " onClick={() => handleSelect('/requirement')}>

              <RecentActorsIcon
                style={{ fontSize: "large" }} />

              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.requirement" defaultMessage="Requirement" />

                {/* {translatedMenuItems[11]} */}
                &nbsp;&nbsp;
                <Badge
                  count={props.opportunityRecord.RecruitmentList}
                  overflowCount={999}
                ></Badge>
              </span>
            </Link>
          </Menu.Item>
           )}
          {(user.requirementAccessInd === true && user.recruitProInd === true 
          // || user.role === "ADMIN" && user.recruitProInd === true
        ) &&  (
         <Menu.Item key="/project" style={{ height: "1.45rem",
           color: selectedMenuItem === '/project' ? 'tomato' : '#4bc076' }}>
              <Link to="/project" onClick={() => handleSelect('/project')}>
                <LightbulbIcon
                  style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-1">
                <FormattedMessage id="app.project" defaultMessage="Project" />
                
                  {/* {translatedMenuItems[15]} */}
                </span>
              </Link>
            </Menu.Item> 
 )}
          <hr/>
        {/* )} */}
        {/*Demand*/}
        {(user.userType === "USER" && user.department === "Customer" && user.recruitProInd === true 
        // || user.role === "ADMIN" && user.recruitProInd === true
      ) && (
          <Menu.Item key="/demand" style={{ height: "1.45rem", 
           color: selectedMenuItem === '/demand' ? 'tomato' : '#4bc076' }}>
            <Link to="/demand" onClick={() => handleSelect('/demand')}>
              <ContactsIcon

                style={{ fontSize: "large" }} />

              <span class="text-white text-ls ml-1">
              <FormattedMessage id="app.demand" defaultMessage="Demand" />

              
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </Link>
          </Menu.Item>
        )}
        {/*Demand*/}

        {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}

        {/*Customer*/}


        {/*Publish*/}
        {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
        {/* {(user.publishAccessInd === true  && user.recruitProInd === true) || (user.role === "ADMIN"  && user.recruitProInd === true) && (
          <Menu.Item key="/publish" style={{ height: "1.45rem", 
          color: selectedMenuItem === '/publish' ? 'tomato' : '#4bc076' }}>
            <Link to="/publish" onClick={() => handleSelect('/publish')}>

              <CellTowerIcon  style={{ fontSize: "large" }}/>
              <span class="text-white text-ls ml-1">
                 <FormattedMessage
                id="app.publish"
                defaultMessage="Publish"
              />
                 
                </span>
            </Link>
          </Menu.Item>)} */}

        {/*Publish*/}
 
        {/* {user.department === "Management" && ( */}
        {/* <Menu.Item key="/billing" style={{height:"1.45rem"}}>
            <Link to="/Billing">
              <AccessAlarmIcon

                 style={{ fontSize: "large" }}
              />
             <span class="text-white text-ls ml-3">
            
                {translatedMenuItems[16]}
              </span>
            </Link>
          </Menu.Item> */}
        {/* )} */}

        {/* {user.department === "Management" && (
            <Menu.Item key="/invoice" style={{height:"1.45rem"}}>
              <Link to="/Invoice">
                <TextSnippetIcon

                    style={{ fontSize: "large" }}
                />
               <span class="text-white text-ls ml-3">
                
                  {translatedMenuItems[17]}
                </span>
              </Link>
            </Menu.Item>
          )} */}

        {/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Customer" && user.department !== "Recruiter" &&( */}
        {/* VENDOR */}
        {/* {user.vendorAccessInd === true && (
            <Menu.Item key="/partner" style={{height:"1.45rem"}}>
              <Link to="/partner">
              
                <HandshakeIcon
             
                 style={{ fontSize: "large" }}
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


        <hr />
        {/* Accessment */}

        {(user.eLearningInd === true && user.assessmentAccessInd === true 
        // || user.role === "ADMIN" && user.eLearningInd === true
      ) &&  (
            <Menu.Item key="/accessment" style={{ height: "1.45rem",
              color: selectedMenuItem === '/accessment' ? 'tomato' : '#4bc076' }}>
              <Link to="/Accessment" onClick={() => handleSelect('/accessment')}>
                <ComputerIcon

                    style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-1">
                 <FormattedMessage
                id="app.assessment"
                defaultMessage="Assessment"
              />
                 
                </span>
              </Link>
            </Menu.Item>
          )}

        {(user.eLearningInd === true && user.courseAccessInd === true 
        // || user.role === "ADMIN" && user.eLearningInd === true
      ) && (
            <Menu.Item key="/course" style={{ height: "1.45rem",
             color: selectedMenuItem === '/course' ? 'tomato' : '#4bc076' }}>
              <Link to="/Course" onClick={() => handleSelect('/course')}>
                <NewspaperIcon

                  style={{ fontSize: "large" }}
                />
               <span class="text-white text-ls ml-1">
               <FormattedMessage
                id="app.course"
                defaultMessage="Course"
              />
                
                </span>
              </Link>
            </Menu.Item>
          )}
        {/* Program */}
        {(user.eLearningInd === true && user.programAccessInd === true 
        // || user.role === "ADMIN" && user.eLearningInd === true
      ) && (
            <Menu.Item key="/program" style={{ height: "1.45rem",
              color: selectedMenuItem === '/program' ? 'tomato' : '#4bc076' }}>
              <Link to="/Program" onClick={() => handleSelect('/program')}>
                <LibraryBooksIcon

                   style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-1">
              
                <FormattedMessage
                id="app.program"
                defaultMessage="Program"
              />
                </span>
              </Link>
            </Menu.Item>
          )}

        <hr />




        {/* <Menu.Item key="/message">
            <Link to="/message">
            <FontAwesomeIcon icon={solid("user-group")} style={{fontSize: "small"}}/>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                  id="app.chat"
                  defaultMessage="Chat"
                />
              </span>
            </Link>
          </Menu.Item> */}
        {/* Employees */}

        {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( 
          <SubMenu
            key="sub2"
          style={{ marginBottom: "-1.25em" }}
         title={
              <span>
              
                 <i class="fab fa-servicestack"></i>&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ color: "white" }}>

                  <FormattedMessage
                 id="app.selfService"
                    defaultMessage="Self Service"
                  />
                </span>
              </span>
            }
          >
           */}
        {(user.orderAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.orderManagementInd === true
      ) &&  (

          <Menu.Item key="/order" style={{ height: "1.45rem", 
          color: selectedMenuItem === '/order' ? 'tomato' : '#4bc076' }}>
            <Link to="/order"  onClick={() => handleSelect('/order')}>
              <DynamicFeedIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1"><FormattedMessage
                id="app.order"
                defaultMessage="Order"
              />
              </span>
            </Link>
          </Menu.Item>
        )}

        {(user.accountAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.orderManagementInd === true
      ) &&  (

          <Menu.Item key="/account" style={{ height: "1.45rem", 
           color: selectedMenuItem === '/account' ? 'tomato' : '#4bc076' }}>
            <Link to="/account"  onClick={() => handleSelect('/account')}>
              <AcUnitIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1"><FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              />
              </span>
            </Link>
          </Menu.Item>
        )}
        {(user.catalogAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.productionInd === true
      ) &&  (
        <Menu.Item key="/product" style={{ height: "1.45rem", 
        color: selectedMenuItem === '/product' ? 'tomato' : '#4bc076' }}>
          <Link to="/product" onClick={() => handleSelect('/product')}>
            <ViewInArIcon
              style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.catalogue"
              defaultMessage="Catalogue"
            />
            </span>
          </Link>
        </Menu.Item>
        )}
         {(user.subscriptionAccessInd === true && user.erpInd === true 
        //  || user.role === "ADMIN" && user.subscriptionAccessInd === true
        ) &&  (
        <Menu.Item key="/subscription" style={{ height: "1.45rem", 
        color: selectedMenuItem === '/subscription' ? 'tomato' : '#4bc076' }}>
          <Link to="/subscription" onClick={() => handleSelect('/subscription')}>
            <SubscriptionsIcon
              style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.subscription"
              defaultMessage="Subscription"
            />
            </span>
          </Link>
        </Menu.Item>
         )}
        <hr />
        {(user.refurbishWorkshopInd === true && user.repairInd === true 
        // || user.role === "ADMIN" && user.repairInd === true
      ) &&  (

          <Menu.Item key="/refurbish" style={{ height: "1.45rem",
            color: selectedMenuItem === '/refurbish' ? 'tomato' : '#4bc076' }}>
            <Link to="/refurbish" onClick={() => handleSelect('/refurbish')}>
              <OnDeviceTrainingIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
                <FormattedMessage
                  id="app.refurbish"
                  defaultMessage="Refurbish"
                />
              </span>
            </Link>
          </Menu.Item>
        )}
         {(user.productionAccessInd === true && user.productionInd === true 
        //  || user.role === "ADMIN" && user.productionInd === true
        ) &&  (
        <Menu.Item key="/production" style={{ height: "1.45rem", 
        color: selectedMenuItem === '/production' ? 'tomato' : '#4bc076' }}>
          <Link to="/production" onClick={() => handleSelect('/production')}>
            <PrecisionManufacturingIcon
              style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.production"
              defaultMessage="Production"
            />
            </span>
          </Link>
        </Menu.Item>
        )} 
 {/* {( user.erpInd === true && user.qualityAccessInd === true 
  ) &&  ( */}
<Menu.Item key="/quality" style={{ height: "1.45rem", 
        color: selectedMenuItem === '/quality' ? 'tomato' : '#4bc076' }}>
          <Link to="/quality" onClick={() => handleSelect('/quality')}>
            <VerifiedUserIcon
              style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.quality"
              defaultMessage="Quality"
            />
            </span>
          </Link>
        </Menu.Item>
 {/* )} */}

{/* <Menu.Item key="/procre" style={{ height: "1.45rem", 
 color: selectedMenuItem === '/procre' ? 'tomato' : '#4bc076'}}>
  <Link to="/procre" onClick={() => handleSelect('/procre')}>
    <LocalMallIcon
      style={{ fontSize: "large" }}
    />
    <span class="text-white text-ls ml-1">
      Procure
    </span>
  </Link>
</Menu.Item> */}

        {(user.materialAccessInd === true && user.erpInd === true 
        // || user.role === "ADMIN" && user.inventoryInd === true
      ) &&  (

          <Menu.Item key="/supplies" style={{ height: "1.45rem",
            color: selectedMenuItem === '/supplies' ? 'tomato' : '#4bc076' }}>
            <Link to="/supplies" onClick={() => handleSelect('/supplies')} >
              <CategoryIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1"><FormattedMessage
                id="app.material"
                defaultMessage="Material"
              />
              </span>
            </Link>
          </Menu.Item>
        )}
         {(user.supplierAccessInd === true && user.erpInd === true 
        //  || user.role === "ADMIN" && user.inventoryInd === true
        ) && (

<Menu.Item key="/suppliers" style={{ height: "1.45rem", 
 color: selectedMenuItem === '/suppliers' ? 'tomato' : '#4bc076'}}>
  <Link to="/suppliers" onClick={() => handleSelect('/suppliers')}>
    <CategoryIcon
      style={{ fontSize: "large" }}
    />
    <span class="text-white text-ls ml-1"><FormattedMessage
      id="app.suppliers"
      defaultMessage="Suppliers"
    />
    </span>
  </Link>
</Menu.Item>
 )} 
  {( user.tradingInd === true 
       
      ) &&  (
<Menu.Item key="/trade" style={{ height: "1.45rem", 
 color: selectedMenuItem === '/trade' ? 'tomato' : '#4bc076'}}>
  <Link to="/trade" onClick={() => handleSelect('/trade')}>
    <ShopTwoIcon
      style={{ fontSize: "large" }}
    />
    <span class="text-white text-ls ml-1">
      Trade
    </span>
  </Link>
</Menu.Item>
      )}
{/* {(user.supplierAccessInd === true && user.erpInd === true || user.role === "ADMIN" && user.inventoryInd === true) && ( */}
{/* {( user.erpInd === true &&
<Menu.Item key="/vendor" style={{ height: "1.45rem", 
 color: selectedMenuItem === '/vendor' ? 'tomato' : '#4bc076'}}>
  <Link to="/vendor" onClick={() => handleSelect('/vendor')}>
    <CategoryIcon
      style={{ fontSize: "large" }}
    />
    <span class="text-white text-ls ml-1">
      Vendor
    </span>
  </Link>
</Menu.Item>
)}  */} 
{/* if any body want to use reuse this component */}


  {(user.procurementAccessInd === true && user.erpInd === true 
    // || user.role === "ADMIN" && user.procurementInd === true
    ) && (
<Menu.Item key="/procurement" style={{ height: "1.45rem", 
color: selectedMenuItem === '/procurement' ? 'tomato' : '#4bc076' }}>
            <Link to="/procurement" onClick={() => handleSelect('/procurement')}>
              <CrisisAlertIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1"><FormattedMessage
                id="app.procurement"
                defaultMessage="Procurement"
              />
              </span>
            </Link>
          </Menu.Item>
  )}
        <hr />
        {
  (user.inventoryAccessInd === true && user.erpInd === true 
    // || user.role === "ADMIN" && user.inventoryInd === true
  ) && (
    <Menu.Item key="/inventory" style={{ height: "1.45rem",  color: selectedMenuItem === '/inventory' ? 'tomato' : '#4bc076' }}>
      <Link to="/inventory" onClick={() => handleSelect('/inventory')}>
        <InventoryIcon
          style={{ fontSize: "large" }}
        />
        <span className="text-white text-ls ml-1">
          <FormattedMessage
            id="app.inventory"
            defaultMessage="Inventory"
          />
        </span>
      </Link>
    </Menu.Item>
  )
}


        {(user.shipperAccessInd === true && user.erpInd === true 
        // ||  user.role === "ADMIN" && user.logisticsInd === true
      ) &&  (

          <Menu.Item key="/shipper" style={{ height: "1.45rem",
            color: selectedMenuItem === '/shipper' ? 'tomato' : '#4bc076' }}>
            <Link to="/shipper" onClick={() => handleSelect('/shipper')}>
              <LocalShippingIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1"><FormattedMessage
                id="app.shipper"
                defaultMessage="Shipper"
              />
              </span>
            </Link>
          </Menu.Item>
        )}
        <hr />

    


        
  {(user.collectionAccessInd === true && user.financeInd === true 
  // || user.role === "ADMIN" && user.financeInd === true
) &&  (

        <Menu.Item key="/collection" style={{ height: "1.45rem",
         color: selectedMenuItem === '/collection' ? 'tomato' : '#4bc076' }}>
          <Link to="/collection" onClick={() => handleSelect('/collection')} >
            <ReceiptIcon style={{ fontSize: "large" }} />
            <span class="text-white text-ls ml-1">
            <FormattedMessage 
                    id="app.collections"
                   defaultMessage="Collections"
               />
              
            </span>
          </Link>
        </Menu.Item>

  )}

        
        {/* {user.imInd === true  && ( */}
        {/* <Menu.Item key="/report" style={{ height: "1.45rem", paddingLeft: "1rem" }}>
          <Link to="/leave">
            <i class="fas fa-luggage-cart"></i>
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.leaves"
              defaultMessage="Leaves"
            />
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.leave}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item> */}
        {/* )} */}
        {/* {user.userType !== "USER" && user.imInd === true  && user.department !== "VENDOR" && (  */}
        {/* <Menu.Item key="/mileage" style={{ height: "1.45rem", paddingLeft: "1rem" }}>
          <Link to="/mileage">

            <i class="fas fa-tachometer-alt"></i>
            <span class="text-white text-ls ml-[0.3rem]"><FormattedMessage
              id="app.mileage"
              defaultMessage="Mileage"
            />
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.mileage}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item> */}
        <hr />
        {(user.leaveAccessInd === true   
        // || user.role === "ADMIN"
      ) && ( 
        <Menu.Item key="/report" style={{ height: "1.45rem", 
         color: selectedMenuItem === '/report' ? 'tomato' : '#4bc076' }}>
          <Link to="/leave" onClick={() => handleSelect('/report')}>
            <i class="fas fa-luggage-cart"></i>
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.leaves"
              defaultMessage="Leaves"
            />
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.leave}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item>
       )} 
        {(user.mileageAccessInd === true
        // ||
        //  user.role === "ADMIN"
        ) &&( 
        <Menu.Item key="/mileage" style={{ height: "1.45rem", 
         color: selectedMenuItem === '/mileage' ? 'tomato' : '#4bc076' }}>
          <Link to="/mileage" onClick={() => handleSelect('/mileage')}>

            <i class="fas fa-tachometer-alt"></i>
            <span class="text-white text-ls ml-[0.3rem]"><FormattedMessage
              id="app.mileage"
              defaultMessage="Mileage"
            />
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.mileage}
                overflowCount={999}
              ></Badge>
            </span>
          </Link>
        </Menu.Item>
        )}
     {(user.expenseAccessInd === true   
    //  || user.role === "ADMIN"
    ) && ( 
        <Menu.Item key="/expense" style={{ height: "1.45rem",
          color: selectedMenuItem === '/expense' ? 'tomato' : '#4bc076' }}>
          <Link to="/expense" onClick={() => handleSelect('/expense')}>
            <ReceiptIcon
              style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.expense"
              defaultMessage="Expense"
            />
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
        <Menu.Item key="/holiday" style={{ height: "1.45rem", 
        color: selectedMenuItem === '/holiday' ? 'tomato' : '#4bc076' }}>
          <Link to="/holiday" onClick={() => handleSelect('/holiday')}>

            <i class="fas fa-holly-berry"></i>
            &nbsp;
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.holiday"
              defaultMessage="Holiday"
            />

            </span>
          </Link>
        </Menu.Item>
       )} 

        {/* 
           </SubMenu> 
     )}  */}
        <hr />
        {/* {user.userAccessInd === true || user.role === "ADMIN"  && ( */}
        { (user.teamsAccessInd === true &&  user.hrInd === true 
        // || user.role === "ADMIN" &&  user.hrInd === true
      ) ? (
               
               <Menu.Item key="/teams" style={{height:"1.45rem",
                color: selectedMenuItem === '/teams' ? 'tomato' : '#4bc076'}}>
                <Link to="/teams" onClick={() => handleSelect('/teams')}>
                 <PeopleIcon
                style={{ fontSize: "large" }}
                  />
                  <span class="text-white text-ls ml-1"><FormattedMessage 
                    id="app.teams"
                   defaultMessage="Teams"
               />
                   </span>
                 </Link> 
                </Menu.Item>
                ):null} 

        {(user.userAccessInd === true && user.hrInd === true  
         || user.role === "ADMIN" &&  user.hrInd === true
      ) ? (

          <Menu.Item key="/employees" style={{ height: "1.45rem",
            color: selectedMenuItem === '/employees' ? 'tomato' : '#4bc076' }}>
            <Link to="/Employees" onClick={() => handleSelect('/employees')}>
              <GroupsIcon

                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1">
                <FormattedMessage id="app.users" defaultMessage="Users" />
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

        {/* <Menu.Item key="/plant" style={{ height: "1.45rem", paddingLeft: "1rem" }}>
          <Link to="/plant">
            <FactoryIcon
              style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage
              id="app.plant"
              defaultMessage="Plant"
            />
            </span>
          </Link>
        </Menu.Item> */}
        {(user.locationAccessInd === true && user.hrInd === true || user.role === "ADMIN" &&  user.hrInd === true) &&  (

          <Menu.Item key="/location" style={{ height: "1.45rem",
           color: selectedMenuItem === '/location' ? 'tomato' : '#4bc076' }}>
            <Link to="/location" onClick={() => handleSelect('/location')}>
              <LocationOnIcon
                style={{ fontSize: "large" }}
              />
              <span class="text-white text-ls ml-1"><FormattedMessage
                id="app.location"
                defaultMessage="Location"
              />
              </span>
            </Link>
          </Menu.Item>
        )}
        {/* Employees */}

      </Menu>

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
