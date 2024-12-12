import {Tag, Tooltip, Avatar, Button } from "antd";
import React, { useState, lazy, Suspense ,useEffect} from "react";
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import { connect } from "react-redux";
import { Tabs } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,
  setDashboardViewType
} from "../DashboardAction";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { bindActionCreators } from "redux";
import TimeInterval from "../../../Utils/TimeInterval";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; 
import ShopIcon from '@mui/icons-material/Shop';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const DashboardShareForm=lazy(()=>import("./DashboardShareForm"));
const { TabPane } = Tabs;

const DashboardActionLeft = (props) => {
  const [dashboardRegionalVisible, setDashboardRegionalVisible] = useState(false);
 const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
          "24", //  "Region",//0
          "1143",   // "Multi Org",//1
          "97",  // "Prospect",//2
           "248", // "Customer",//3
           "203", // "Production",//4
            "661",// "Repair ",//5
            "511", // "Investors",//6
            "1286", //"RecruitPro" 7
            "105", // "Tasks" 8
            "24",  // "Region" 9
            "1287",  // "My Details"10
            "666"// "Procure"
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

  const {
    setSelectedTimeIntervalReport,
    dateRangeList,
    viewType,
    setDashboardViewType,
    handleButtonClick,
    activeButton,
    user,
    toggleShareForm,
    showShareForm
   
  } = props;
   console.log(showShareForm)
   console.log(props.buttonName)
  // const toggleShareForm = () => {
  //   setShowShareForm(!showShareForm);
  // };
  const handleRegionalButtonClick = () => {
    setDashboardRegionalVisible(true);
    // Navigate to the dashboardRegional page here (you can use React Router or any other navigation library)
    // Example using React Router:
    // history.push('/dashboardRegional');
  };
  return (
    <>
      <div class=" flex items-center w-[60vw]"  >
        {user.department === "Management" && (
          <>
          </>
        )}

        {user.dashboardFullListInd === true && (
          <Tag className=" cursor-pointer text-center font-poppins border-[tomato]"
            color={showShareForm && viewType === "ALL" ? "tomato" : "#FFA500"}
            
            style={{
              fontWeight: showShareForm && viewType === "ALL" ? "tomato" : "#FFA500",
              
            }}
            onClick={() => {
              {!showShareForm ? setDashboardViewType("ALL"):setDashboardViewType("ME");}
              toggleShareForm(); // Toggle the state when switching to "ALL"
            }}
          >
            {showShareForm ? "Enterprise" : "My view"}
            
          </Tag>
        )}

        


        <div className="flex w-[22rem] ml-4 items-center">
          {viewType === "ALL" && showShareForm ? (
            // Render all icons except "My Details"
            <>
              {/* Your Badge components here */}
              {/* Example: */}

              {user.dashboardRegionalInd === true && (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Regional")}
                    style={{
                      color: activeButton === "Regional" && "tomato",
                    }}
                  >
                    <Tooltip title={translatedMenuItems[0]}>
                      <Button
                        style={{ background: activeButton === "Regional" ? "#f279ab" : "#28a355" }}

                      >
                        <div class=" text-white  ">{translatedMenuItems[0]}</div>
                      </Button>
                    </Tooltip>
                  </span>
                
              )}

              {user.multyOrgAccessInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("multiOrg")}
                    style={{
                      color: activeButton === "multiOrg" && "tomato",
                    }}
                  >
                    <Tooltip title={translatedMenuItems[1]}>
                      <Button
                        style={{ background: activeButton === "multiOrg" ? "#f279ab" : "#28a355" }}

                      >
                        <span class=" text-white !text-icon">{translatedMenuItems[1]}</span>
                      </Button>
                    </Tooltip>
                  </span>
               
              )}
               <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Summary")}
                    style={{
                      color: activeButton === "Summary" ? activeButton === "Summary" && "tomato" && viewType === "ALL" && "#444" : viewType === "ALL" && "tomato",
                    }}
                  >
                    <Tooltip title="Summary">
                      <Avatar style={{ background: activeButton === "Summary" ? "#f279ab" : "#28a355" }}>
                        <SummarizeIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>

              {props.moduleMapper.crmInd === true && user.customerAccessInd === true && user.crmInd === true  && (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Customer")}
                    style={{
                      color: activeButton === "Customer" ? activeButton === "Customer" && "tomato" && viewType === "ALL" && "#444" : viewType === "ALL" && "tomato",
                    }}
                  >
                    <Tooltip title={translatedMenuItems[2]}>
                      <Avatar style={{ background: activeButton === "Customer" ? "#f279ab" : "#28a355" }}>
                        <ApartmentIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>
               
              )}



              {user.orderManagementInd === true && user.accountAccessInd === true && user.erpInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Accounts")}
                    style={{
                      color: activeButton === "Accounts" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[3]}>
                      <Avatar style={{ background: activeButton === "Accounts" ? "#f279ab" : "#28a355" }}>
                        <AcUnitIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>
                  </span>
              
               
              )}


              {props.moduleMapper.orderManagementInd === true && user.orderAccessInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Order")}
                    style={{
                      color: activeButton === "Order" && "tomato",

                    }}
                  >  <Tooltip title={translatedMenuItems[4]}>
                      <Avatar style={{ background: activeButton === "Order" ? "#f279ab" : "#28a355" }}>
                        <PrecisionManufacturingIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>
               
                  )}

              {user.repairInd === true &&  (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Finance")}
                    style={{
                      color: activeButton === "Finance" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[5]}>
                      <Avatar style={{ background: activeButton === "Finance" ? "#f279ab" : "#28a355" }}>
                        <OnDeviceTrainingIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>

                  </span>
               
              )}
              {props.moduleMapper.imInd === true && user.investorAccessInd && user.imInd === true && (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Investors")}
                    style={{
                      color: activeButton === "Investors" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[6]}>
                      <Avatar style={{ background: activeButton === "Investors" ? "#f279ab" : "#28a355" }}>
                        <LocationCityIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>
              
              )}

              {user.recruitProInd === true && (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("RecruitPro")}
                    style={{
                      color: activeButton === "RecruitPro" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[7]}>
                      <Avatar style={{ background: activeButton === "RecruitPro" ? "#f279ab" : "#28a355" }}>
                        <RecentActorsIcon className="text-white !text-icon"  />
                      </Avatar>
                    </Tooltip>
                  </span>
               
              )}

<span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("totaLists")}
                    style={{
                      color: activeButton === "totaLists" && "tomato",

                    }}
                  >
                    <Tooltip title={"Total"}>
                      <Avatar style={{ background: activeButton === "totaLists" ? "#f279ab" : "#28a355" }}>
                        <PriceCheckIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>
  {/* {(user.taskAccessInd === true || user.role === "ADMIN") && (
            
                <span
                  className="cursor-pointer mr-1"
                  onClick={() => handleButtonClick("Tasks")}
                  style={{
                    color: activeButton === "Tasks" && "tomato",
                  }}
                >
                  <Tooltip title={translatedMenuItems[8]}>
                    <Avatar style={{ background: activeButton === "Tasks" ? "#f279ab" : "#28a355" }}>
                      <FactCheckIcon className="text-white !text-icon" />
                    </Avatar>
                  </Tooltip>
                </span>
              
  )} */}
              {viewType === "ALL" && showShareForm &&<Suspense fallback={<BundleLoader />}><DashboardShareForm activeButton={props.activeButton}/></Suspense> }
            </>
         
        ) : (
            <>
              {user.dashboardRegionalInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Regional")}
                    style={{
                      color: activeButton === "Regional" && "tomato",
                    }}
                  >
                    <Tooltip title={translatedMenuItems[0]}>
                      <Button
                        style={{ background: activeButton === "Regional" ? "#f279ab" : "#28a355" }}
                        type="primary"
                      >
                        <span class=" text-white ">{translatedMenuItems[0]}</span>
                      </Button>
                    </Tooltip>
                  </span>                
              )}
              {user.multyOrgAccessInd === true && (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("multiOrg")}
                    style={{
                      color: activeButton === "multiOrg" && "tomato",
                    }}
                  >
                    <Tooltip title={translatedMenuItems[1]}>
                      <Button
                        style={{ background: activeButton === "multiOrg" ? "#f279ab" : "#28a355" }}

                      >
                        <span class=" text-white !text-icon">{translatedMenuItems[1]}</span>
                      </Button>
                    </Tooltip>
                  </span>
              
              )}
             <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Summary")}
                    style={{
                      color: activeButton === "Summary" ? activeButton === "Summary" && "tomato" && viewType === "ALL" && "#444" : viewType === "ALL" && "tomato",
                    }}
                  >
                    <Tooltip title="Summary">
                      <Avatar style={{ background: activeButton === "Summary" ? "#f279ab" : "#28a355" }}>
                        <SummarizeIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>
              {/* {(user.taskAccessInd === true || user.role === "ADMIN") && (
              
                <span class="cursor-pointer mr-1"
                  onClick={() => handleButtonClick("Tasks")}
                  style={{
                    color: activeButton === "Tasks" && "tomato",

                  }}
                >
                  <Tooltip title={translatedMenuItems[8]}>
                    <Avatar style={{ background: activeButton === "Tasks" ? "#f279ab" : "#28a355" }}>
                      <FactCheckIcon className="text-white !text-icon"  />
                    </Avatar>
                  </Tooltip>
                </span>
             
              )} */}
              {user.crmInd === true && user.customerAccessInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Customer")}
                    style={{
                      color: activeButton === "Customer" ? activeButton === "Customer" && "tomato" && viewType === "ALL" && "#444" : viewType === "ALL" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[2]}>
                      <Avatar style={{ background: activeButton === "Customer" ? "#f279ab" : "#28a355" }}>
                        <ApartmentIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>
                  </span>
              
              )}


{(user.accountAccessInd === true && user.erpInd === true 
     
      ) &&  (
             
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Accounts")}
                    style={{
                      color: activeButton === "Accounts" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[3]}>
                      <Avatar style={{ background: activeButton === "Accounts" ? "#f279ab" : "#28a355" }}>
                        <AcUnitIcon className="text-white !text-icon"

                        />
                      </Avatar>
                    </Tooltip>
                  </span>
                
             
                  )}
 { props.moduleMapper.orderManagementInd === true && user.orderAccessInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => 
                      handleButtonClick("Order")


                    }
                    style={{
                      color: activeButton === "Order" && "tomato",

                    }}
                  >  <Tooltip title={translatedMenuItems[4]}>
                      <Avatar style={{ background: activeButton === "Order" ? "#f279ab" : "#28a355" }}>
                        <PrecisionManufacturingIcon className="text-white !text-icon"

                        />
                      </Avatar>
                    </Tooltip>
                  </span>
               
              )}
              {user.repairInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Finance")}
                    style={{
                      color: activeButton === "Finance" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[5]}>
                      <Avatar style={{ background: activeButton === "Finance" ? "#f279ab" : "#28a355" }}>
                        <OnDeviceTrainingIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>

                  </span>
               
              )}
                {props.moduleMapper.ecomModInd === true && props.moduleMapper.erpInd === true &&
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Procure")}
                    style={{
                      color: activeButton === "Procure" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[11]}>
                      <Avatar style={{ background: activeButton === "Procure" ? "#f279ab" : "#28a355" }}>
                        <ShopIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>

                  </span>
                
}
              {props.moduleMapper.imInd === true && user.investorAccessInd && user.imInd === true && (
                
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("Investors")}
                    style={{
                      color: activeButton === "Investors" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[6]}>
                      <Avatar style={{ background: activeButton === "Investors" ? "#f279ab" : "#28a355" }}>
                        <LocationCityIcon className="text-white !text-icon"
                        />
                      </Avatar>
                    </Tooltip>
                  </span>
               
              )}

              {user.recruitProInd === true && (
               
                  <span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("RecruitPro")}
                    style={{
                      color: activeButton === "RecruitPro" && "tomato",

                    }}
                  >
                    <Tooltip title={translatedMenuItems[7]}>
                      <Avatar style={{ background: activeButton === "RecruitPro" ? "#f279ab" : "#28a355" }}>
                        <RecentActorsIcon className="text-white !text-icon"
                        />
                      </Avatar>
                    </Tooltip>
                  </span>
               
              )}
<span class="cursor-pointer mr-1"
                    onClick={() => handleButtonClick("totaLists")}
                    style={{
                      color: activeButton === "totaLists" && "tomato",

                    }}
                  >
                    <Tooltip title={"Total"}>
                      <Avatar style={{ background: activeButton === "totaLists" ? "#f279ab" : "#28a355" }}>
                        <PriceCheckIcon className="text-white !text-icon"/>
                      </Avatar>
                    </Tooltip>
                  </span>
            </>

          )}
        </div>

        <>
          <>


            {activeButton === "Regional" || activeButton === "multiOrg" ? (
              <div class=" flex justify-end  ml-2  max-sm:hidden">
                <Tabs type="card" activeKey={props.activeTab} onChange={props.handleTabClick}>
                  {props.tab.map((tabs) => (
                    <TabPane key={tabs} tab={tabs}></TabPane>
                  ))}
                </Tabs>
              </div>
            ) : (
              <div class="flex justify-end ml-2">
                <TimeInterval className=" text-xs"
                  times={dateRangeList}
                  handleClick={setSelectedTimeIntervalReport}
                />
              </div>
            )}
          </>

          {/* <Popover>
          <StyledRangePicker
            style={{width:"30%"}}
            onChange={(range) => {
              props.setTimeRangeReport(range[0], range[1]);
              console.log(range);
            }}

          />
        </Popover> */}
        </>

      </div>
    </>
  );
};


const mapStateToProps = ({ auth, dashboard }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  dateRangeList: dashboard.dateRangeList,
  viewType: dashboard.viewType,
  moduleMapper:auth.userDetails.moduleMapper

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setTimeRangeReport,
      setDashboardViewType

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardActionLeft);
