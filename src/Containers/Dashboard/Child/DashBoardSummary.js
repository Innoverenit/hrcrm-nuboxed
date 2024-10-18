import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import {Button,Tooltip} from "antd"
import dayjs from "dayjs";

import {
  getMaterialBestBefore,

} from "../../Main/Inventory/InventoryAction";

import { getQuotationDashboard,getReorderdata,getQuotationDashboardCount ,getTakskdashboardGantt,getTasklist} from "../../Dashboard/DashboardAction";

const ButtonGroup = Button.Group;
const DashBoardSummary=(props) =>{


  useEffect(() => {


    props.getQuotationDashboard(props.userId);
    props.getQuotationDashboardCount(props.userId)
    props.getMaterialBestBefore(props.locationId)
    props.getTakskdashboardGantt(props.userId)
    props.getTasklist(props.userId)
    props.getReorderdata()


   
  }, []);
  const data = {
    deals: [
      { name: "David Miller", description: "Request for Sample logo", date: "Yesterday", amount: "$ 5,000.00" },
      { name: "Adam Johnson", description: "Web design deal-confirmation", date: "Jul 12", amount: "$ 3,000.00" },
      { name: "Martin Taylor", description: "Reg: Price plans", date: "Jul 12", amount: "$ 4,000.00" },
      { name: "Valarie Thomas", description: "Clarification in Pricing", date: "Jul 02", amount: "$ 10,000.00" },
      { name: "George Faulkner", description: "Demo request", date: "Jun 31", amount: "$ 4,000.00" },
      { name: "Patrick Joho Smith", description: "Need business cards design", date: "Jun 21", amount: "$ 5,000.00" },
    ],
    contactsLeads: [
      { name: "Jeremy Watson", description: "Product logo!", time: "10:40 am" },
      { name: "Maria Thomas", description: "Demo request", time: "Yesterday" },
      { name: "Steve Johnson", description: "Plans and benefits", time: "Jul 06" },
      { name: "Sandra Evans", description: "Latest upgrade?", time: "Jun 04" },
      { name: "Warren Hastings", description: "Re: Welcome onboarding", time: "Jun 22" },
      { name: "James Carter", description: "Clarification in the design", time: "Jun 21" },
    ],
    notInCrm: [
      { name: "Donna Baker", description: "Regarding product features", time: "11:58 am" },
      { name: "Sandra Evans", description: "Tradeshow on 12/7/2016", time: "10:20 am" },
      { name: "Twitter", description: "Follow James Carter on Twitter!", time: "9:47 am" },
      { name: "Charles Jones", description: "Interest in your product", time: "7:40 AM" },
      { name: "Nancy Parker", description: "Webinar registration", time: "Yesterday" },
      { name: "Deborah Smith", description: "Let's schedule a call", time: "Yesterday" },
    ],
    colleagues: [
      { name: "Robert Yonker, Me", description: "Re: Final Attempt", date: "Yesterday" },
      { name: "Jennifer from Zylker", description: "Choose the right plan", date: "Jul 11" },
      { name: "Elizabeth Leon, Me (2)", description: "Re: Quick question", date: "Jun 13" },
      { name: "Manish Sharma", description: "New Contact?", date: "Yesterday" },
      { name: "Rose Edward", description: "Trying to connect", date: "Jun 02" },
    ],
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-5 gap-6  rounded mt-1  bg-white h-[87vh] ">
      {/* TASK */}
      <div class="flex flex-col">
        <h2 className="text-xl font-bold mb-4">TASK-({`${props.taskperCount.totalTask} `})</h2>
        <div className="overflow-y-auto max-h-96">
        {props.tasksdashboardGantt.map((deal, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] ">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{deal.taskName}</p>
                <p className="text-sm text-gray-500">
                <ButtonGroup >
         
         <StatusIcon class=" !text-icon"
 type="To Start"
 iconType={<HourglassEmptyIcon  className=" !text-icon" />} 
// iconType="fa-hourglass-start"
 tooltip="To Start"
//  status={item.taskStatus}
//  difference={difference} 
//  onClick={() =>
//    linkTaskStatus(item.taskId, {
//      taskStatus: "To Start",
//    })
//  }
/>
       
           <StatusIcon class=" !text-icon"
             type="In Progress"
            iconType={<HourglassTopIcon  className=" !text-icon"/>}
             tooltip="In Progress"
            //  status={item.taskStatus}
            //  difference={difference}
            //  onClick={() =>
            //    linkTaskStatus(item.taskId, {
            //      //  ...item,
            //       taskStatus: "In Progress",
            //    })
            //  }
           />
        
           <StatusIcon class=" !text-icon"
             type="Completed"
           iconType={<HourglassBottomIcon  className=" !text-icon"/>}
             tooltip="Completed"
            //  status={item.taskStatus}
            //  difference={difference}
            //  onClick={() =>
            //    linkTaskStatus(item.taskId, {
            //      //  ...item,
            //       taskStatus: "Completed",
            //    })
            //  }
           />
         
       </ButtonGroup>
                  
                  
                  
                  </p>
              </div>
              <p className="text-red-600 font-bold bg-red-100 inline-block px-2 py-1 rounded">
              {`${dayjs(deal.endDate).format("DD/MM/YYYY")}`}
                </p>
            </div>
            {/* <p className="text-green-600 font-bold bg-green-100 inline-block px-2 py-1 rounded">${deal.amount}</p> */}
          </div>
        ))}
        </div>
      </div>
{/* <div class="relative   sm:after:content-[''] sm:after:absolute sm:after:w-[3px] sm:after:min-h-[500vh] sm:after:bg-black sm:after:right-[-1rem]"></div> */}
      {/* QUOTATION */}
      <div class="flex flex-col border-l-2 box-border border-black ml-2">
  <h2 className="text-xl font-bold mb-4 ">
  QUOTATION -
  ({`${props.quotationDashboardCount.countByUserId} `})
</h2>
  {props.quotationDashboard.length === 0 ? (
    <p>No data found</p>
  ) : (
    props.quotationDashboard.map((lead, index) => (
      <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
        <div className="flex justify-between">
          <p className="font-semibold">{lead.quotationId}</p>
          <p className="text-sm text-gray-500">{lead.time}</p>
          
        </div>
        <p className="text-sm text-gray-500">{lead.amount}</p>
        <p className="text-sm text-gray-500">{lead.contactPersonName}</p>
        <Button>To Order</Button>
      </div>
    ))
  )}
</div>


    

  {/* Re Order */}
  <div class="flex flex-col border-l-2 box-border border-black ml-2">
        <h2 className="text-xl font-bold mb-4"> Re Order-(0) </h2>
        {props.reOrderData.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
            <div className="flex justify-between">
              <p className="font-semibold">{colleague.suppliesFullName} {colleague.batchNo}</p>
              <p className="text-red-600 font-bold bg-red-100 inline-block px-2 py-1 rounded">
             {colleague.reorderLevel}
                </p>
            </div>
            <p className="text-sm text-gray-500">{colleague.zone} {colleague.aisle} {colleague.chamber} </p>
            <p className="text-sm text-gray-500">{colleague.locationName}</p>
            <Button>Create PO</Button>
          </div>
        ))}
      </div>

         {/* Best Before */}
         <div class="flex flex-col border-l-2 box-border border-black ml-2">
        <h2 className="text-xl font-bold mb-4"> Best Before-(2) </h2>
        {props.materialBestBefore.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
            <div className="flex justify-between">
              <p className="font-semibold">{colleague.suppliesFullName} {colleague.batchNo}</p>
              <p className="text-red-600 font-bold bg-red-100 inline-block px-2 py-1 rounded">
              {`${dayjs(colleague.bestBeforeUse).format("DD/MM/YYYY")}`}
                </p>
            </div>
            <p className="text-sm text-gray-500">{colleague.newPoNumber} {colleague.hsn} </p>
                      <p className="text-sm text-gray-500">{colleague.zone} {colleague.aisle} {colleague.chamber} </p>
            <Button>To Waste</Button>
          </div>
        ))}
      </div>


        {/* ORDER */}
        <div class="flex flex-col border-l-2 box-border border-black ml-2">
        <h2 className="text-xl font-bold mb-4">ORDER-(6)</h2>
        {data.notInCrm.map((contact, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
            <div className="flex justify-between">
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.time}</p>
            </div>
            <p className="text-sm text-gray-500">{contact.description}</p>
            
          </div>
        ))}
      </div>

      {/* DEALS */}
      <div class="flex flex-col border-l-2 box-border border-black ml-2">
        <h2 className="text-xl font-bold mb-4"> DEALS-(5) </h2>
        {data.colleagues.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
            <div className="flex justify-between">
              <p className="font-semibold">{colleague.name}  </p>
              <p className="text-sm text-gray-500">
                {colleague.date}
                
                </p>
            </div>
            <p className="text-sm text-gray-500">{colleague.description}</p>
          </div>
        ))}
      </div>
    </div>   
  );
};
const mapStateToProps = ({ dashboard,inventory, auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,
  reOrderData:dashboard.reOrderData,
  taskperCount:dashboard.taskperCount,
  tasksdashboardGantt:dashboard.tasksdashboardGantt,
  materialBestBefore:inventory.materialBestBefore,
  quotationDashboard:dashboard.quotationDashboard,
  quotationDashboardCount:dashboard.quotationDashboardCount
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getQuotationDashboard,
  getQuotationDashboardCount,
  getMaterialBestBefore,
  getTasklist,
  getReorderdata,
  getTakskdashboardGantt

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardSummary);
function StatusIcon(props) {
  const { type, iconType, tooltip, status, onClick, difference } = props;

  let iconColor = status === type ? "rgb(251, 133, 0)" : "grey";
  let size = status === type ? "1.875em" : "1em";

  // Display the difference as a label next to the icon
  const daysLabel = difference > 0 ? `+${difference} days` : `${difference} days`;

  return (
    <Tooltip title={`${tooltip} (${daysLabel})`}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: iconColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        {/* <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} /> */}
        {iconType}
        {/* <HourglassEmptyIcon/> */}
{/* 
        {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>} */}
     
      </Button>
    </Tooltip>
  );
}