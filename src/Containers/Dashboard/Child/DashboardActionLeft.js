import { Badge, Popover,Tooltip,Avatar } from "antd";
import React, {  } from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,
  setDashboardViewType
} from "../DashboardAction";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonIcon from '@mui/icons-material/Person';
import { bindActionCreators } from "redux";
import TimeInterval from "../../../Utils/TimeInterval";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const DashboardActionLeft = (props) => {
  const {
    setSelectedTimeIntervalReport,
    dateRangeList,
    viewType,
    handleButtonClick,
    activeButton,
    user,
  } = props;

  return (
    <>
      <div class=" flex items-center "  >
        
        <div class="flex w-[10rem] ">
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class=" cursor-pointer mr-2 "
                onClick={() => handleButtonClick("test")} 
          // onClick={() => props.setDashboardViewType("test")}
          style={{
            color: activeButton === "test" && "tomato",
  
          }}> 
              <Tooltip title="My Details">
              <Avatar style={{ background: activeButton === "test" ? "#f279ab" : "#4bc076" }}>
          <PersonIcon className="text-white"   />
          </Avatar>
          </Tooltip>
        
        </span>
        </Badge>
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer mr-2" 
        onClick={() => handleButtonClick("Tasks")} 
        style={{
          color:activeButton === "Tasks" && "tomato",
          
        }}
        >
         <Tooltip title="Tasks">
         <Avatar style={{ background: activeButton === "Tasks" ? "#f279ab" : "#4bc076" }}>     
     <FactCheckIcon className="text-white"
               
              />
                  </Avatar>
              </Tooltip>
        </span>
  </Badge>
       
    {user.crmInd === true && (
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer mr-2"
        onClick={() =>  handleButtonClick("Customer")} 
        style={{
          color:activeButton ==="Customer" ? activeButton === "Customer" && "tomato" && viewType === "ALL" && "#444" : viewType === "ALL" && "tomato" ,
       
        }}
        >
          <Tooltip title="Prospect">
          <Avatar style={{ background: activeButton === "Customer" ? "#f279ab" : "#4bc076" }}>     
          <ApartmentIcon  className="text-white"


/>
</Avatar>
</Tooltip>        
        </span>
        </Badge>
)}
       

   
    {user.erpInd === true && (
         <Badge
         size="small"
         // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
         // overflowCount={999}
       >
        <span class="cursor-pointer mr-2"
        onClick={() => handleButtonClick("Accounts")} 
        style={{
          color:activeButton === "Accounts" && "tomato",
          
        }}
        >
          <Tooltip title="Customer">
          <Avatar style={{ background: activeButton === "Accounts" ? "#f279ab" : "#4bc076" }}>     
          <AcUnitIcon className="text-white"
                
              />
                </Avatar>
          </Tooltip>
        </span>
        </Badge>
    )}
{user.erpInd === true  && (
      <Badge
      size="small"
      // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
      // overflowCount={999}
    >
        <span class="cursor-pointer mr-2"
        onClick={() => handleButtonClick("Order")} 
        style={{
          color:activeButton === "Order" && "tomato",
    
        }}
        >  <Tooltip title="Orders">
            <Avatar style={{ background: activeButton === "Order" ? "#f279ab" : "#4bc076" }}>     
          <DynamicFeedIcon className="text-white"
               
              />
               </Avatar>
           </Tooltip>
        </span>
        </Badge>
)}
   
    {user.erpInd === true && (
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer mr-2"
        onClick={() => handleButtonClick("Finance")} 
        style={{
          color:activeButton === "Finance" && "tomato",
          
        }}
        >
           <Tooltip title="Finance">
           <Avatar style={{ background: activeButton === "Finance" ? "#f279ab" : "#4bc076" }}>     
          <ReceiptIcon  className="text-white"/>
          </Avatar>
          </Tooltip>
          
        </span>
        </Badge>
    )}
        {user.imInd === true  && (
            <Badge
            size="small"
            // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
            // overflowCount={999}
          >
        <span class="cursor-pointer mr-2"
        onClick={() => handleButtonClick("Investors")} 
        style={{
          color:activeButton === "Investors" && "tomato",
    
        }}
        >  
        <Tooltip title="Investors">
        <Avatar style={{ background: activeButton === "Investors" ? "#f279ab" : "#4bc076" }}>     
          <LocationCityIcon className="text-white"
/>
</Avatar>
</Tooltip>       
        </span>
        </Badge>
)}

{/* {user.imInd === true  && ( */}
            <Badge
            size="small"
            // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
            // overflowCount={999}
          >
        <span class="cursor-pointer mr-2"
        onClick={() => handleButtonClick("RecruitPro")} 
        style={{
          color:activeButton === "RecruitPro" && "tomato",
    
        }}
        >  
        <Tooltip title="RecruitPro">
        <Avatar style={{ background: activeButton === "RecruitPro" ? "#f279ab" : "#4bc076" }}>     
          <RecentActorsIcon className="text-white"
/>
</Avatar>
</Tooltip>       
        </span>
        </Badge>
{/* )} */}
    
   </div>
   
      <>
      <div class="ml-[9rem] max-sm:hidden" >
    <TimeInterval
    style={{fontSize:"0.67"}}
          times={dateRangeList}
          handleClick={setSelectedTimeIntervalReport}
        />
        </div>
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
  viewType:dashboard.viewType,

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
