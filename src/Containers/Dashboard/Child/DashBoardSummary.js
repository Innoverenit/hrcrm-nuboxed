import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {linkTaskStatusDashboard} from "../DashboardAction"
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import {Button,Tooltip,Spin} from "antd"
import dayjs from "dayjs";
import PinIcon from '@mui/icons-material/Pin';
import CategoryIcon from '@mui/icons-material/Category';

import {
  getMaterialBestBefore,
  addToWaste,

} from "../../Main/Inventory/InventoryAction";

import { getQuotationDashboard,getReorderdata,getQuotationDashboardCount ,getTakskdashboardGantt,getTasklist} from "../../Dashboard/DashboardAction";

const ButtonGroup = Button.Group;
const DashBoardSummary=(props) =>{

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
      "199",//   "TASK",0
      "1704",//   No data found1
      "213",//   QUOTATION  2
     "1172", //   To Order3
     "805", //   RE-ORDER 4
     "104", //   Create 5
     "1703", //  BEST BEFORE6
     "1702", //  To Waste7
      "660",//  ORDER8
     "490", //  DEALS9
     "143",//  "To Start"
     "144",//  "In Progress",
     "78",//  "Completed"
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
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
    <div className=" container  mx-auto  p-4 flex rounded mt-1  bg-white h-[87vh]  overflow-x-auto ">
      {/* TASK */}
      <div class="flex flex-col w-[16rem] ml-8">
        <h2 className="text-xl font-bold font-poppins mb-4">{translatedMenuItems[0]}-({`${props.taskperCount.totalTask} `})</h2>
        <div className="overflow-y-auto max-h-[78vh]">
      {props.fetchingTaskDashboardGantt ? (
        <div className="flex justify-center items-center h-full">
          <Spin color="#00008b" size={50} /> 
          <div>{translatedMenuItems[1]}</div>
          {/* Spinner component */} 
        </div>
      ) : (
        props.tasksdashboardGantt.map((deal, index) => {
          const currentDate = dayjs();
        const completionDate = dayjs(deal.completionDate);
          const endDate = dayjs(deal.endDate);
        const difference = currentDate.diff(endDate, 'days');
        return (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] w-[14rem]">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold font-poppins truncate ">{deal.taskName}</div>
                <div className="text-sm text-gray-500 font-poppins">
                  <ButtonGroup>
                    <StatusIcon
                      class="!text-icon"
                      type="To Start"
                      iconType={<HourglassEmptyIcon className="!text-icon" />}
                      tooltip={translatedMenuItems[10]}
                      status={deal.taskStatus}
                      difference={difference} 
                      onClick={() =>
                        props.linkTaskStatusDashboard(deal.taskId, {
                          taskStatus: translatedMenuItems[10]
                        })
                      }
                    />
                    <StatusIcon
                      class="!text-icon"
                      type="In Progress"
                      iconType={<HourglassTopIcon className="!text-icon" />}
                      tooltip={translatedMenuItems[11]}
                      status={deal.taskStatus}
              difference={difference}
              onClick={() =>
                props.linkTaskStatusDashboard(deal.taskId, {
                  //  ...item,
                   taskStatus:translatedMenuItems[11]
                })
              }
                    />
                    <StatusIcon
                      class="!text-icon"
                      type="Completed"
                      iconType={<HourglassBottomIcon className="!text-icon" />}
                      tooltip={translatedMenuItems[12]}
                      status={deal.taskStatus}
                      difference={difference}
                      onClick={() =>
                        props.linkTaskStatusDashboard(deal.taskId, {
                          //  ...item,
                           taskStatus: translatedMenuItems[12]
                        })
                      }
                    />
                  </ButtonGroup>
                </div>
              </div>
              <div>
              <div className="text-red-600 font-bold inline-block px-2 py-1 rounded max-h-max">
               
              </div>
              <div className="text-red-600 font-bold bg-red-100 inline-block px-2 py-1 rounded max-h-max">
                {`${dayjs(deal.endDate).format("DD/MM/YYYY")}`}
              </div>
              </div>
              
            </div>
          </div> 
        )
       
})
      )}
    </div>
      </div>
      <div className="md:h-[65vh] md:bg-[#ACB6FC]  w-[0.1rem]"></div> 

      {/* QUOTATION */}
      <div class="flex flex-col w-[16rem] ml-8">
  <h2 className="text-xl font-poppins font-bold mb-4 ">
  {translatedMenuItems[2]} -
  ({`${props.quotationDashboardCount.countByUserId} `})
</h2>
  {props.quotationDashboard.length === 0 &&props.fetchingQuotationDashboard? (
    <>
     <Spin color="#00008b" size={50} /> 
     <div>{translatedMenuItems[1]}</div>
    </>
    
   
  ) : (
    props.quotationDashboard.map((lead, index) => (
      <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] w-[14rem] ">
        <div className="flex justify-between">
          <div className="font-semibold font-poppins">{lead.quotationId}</div>
          <div className="text-sm text-gray-500 font-poppins">{lead.time}</div>
          
        </div>
        <div className="text-sm text-gray-500 font-poppins">{lead.amount}</div>
        <div class="flex justify-between">
        <div className="text-sm text-gray-500 font-poppins  truncate ">{lead.contactPersonName}</div>
        <Button>{translatedMenuItems[3]}</Button>
        </div>
      </div>
    ))
  )}
</div>

<div className="md:h-[65vh] md:bg-[#ACB6FC]  w-[0.1rem]"></div> 
    

  {/* Re Order */}
  <div class="flex flex-col w-[16rem] ml-8 ">
        <h2 className="text-xl font-poppins font-bold mb-4">{translatedMenuItems[4]}-(0) </h2>
        {props.reOrderData.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] w-[14rem]">
            <div className="flex justify-between">
              <div className="font-semibold font-poppins  truncate ">{colleague.suppliesFullName} {colleague.batchNo}</div>
              <div className="text-red-600 font-bold font-poppins bg-red-100 inline-block px-2 py-1 rounded">
             {colleague.reorderLevel}
                </div>
            </div>
            <div className="text-sm text-gray-500 font-poppins">{colleague.zone} {colleague.aisle} {colleague.chamber} </div>
            <div className="text-sm text-gray-500 font-poppins">{colleague.locationName}</div>
            <Button>{translatedMenuItems[5]} PO</Button>
          </div>
        ))}
      </div>
      <div className="md:h-[65vh] md:bg-[#ACB6FC]  w-[0.1rem]"></div> 
         {/* Best Before */}
         <div class="flex flex-col w-[16rem] ml-8">
        <h2 className="text-xl font-bold font-poppins mb-4"> {translatedMenuItems[6]}-(2) </h2>
        <div className="overflow-y-auto max-h-[78vh]">
      {props.fetchingMaterialBestBefore ? (
        <div className="flex justify-center items-center h-full">
          <Spin color="#00008b" size={50} /> {/* Spinner component */}
        </div>
      ) : (
        props.materialBestBefore.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] w-[14rem]">
            <div className="flex  w-full truncate">
              <div className="font-semibold font-poppins  truncate "><CategoryIcon className=" !text-icon"/>{colleague.suppliesFullName} {colleague.batchNo}</div>
            
            </div>
            <div className="text-sm text-gray-500 font-poppins">{colleague.newPoNumber} <PinIcon className=" !text-icon"/>{colleague.hsn} </div>
            <div class="flex justify-between">
                      <div className="text-sm text-gray-500 font-poppins">{colleague.zone} {colleague.aisle} {colleague.chamber} </div>
                      </div>
                      <div className=" flex justify-between"> 
                         <div className="text-red-600 font-bold bg-red-100 inline-block px-2 py-1 rounded">
              {`${dayjs(colleague.bestBeforeUse).format("DD/MM/YYYY")}`}
                </div>
            <Button
              onClick={() => {
                props.addToWaste({
                  poSupplierSuppliesId:colleague.poSupplierSuppliesId,
                  poSupplierDetailsId:colleague.poSupplierDetailsId,
                  suppliesId:colleague.suppliesId,
                  userId:colleague.userId,
                  locationId:colleague.locationId,
                  orgId:props.orgId,
                  moveToWasteInd:true
                },
                colleague.poSupplierSuppliesId
              );
                
              }}
            >{translatedMenuItems[7]}</Button>
            </div>
            </div>
         
        ))

      )}

        </div>
      </div>

      <div className="md:h-[65vh] md:bg-[#ACB6FC]  w-[0.1rem]"></div> 
        {/* ORDER */}
        <div class="flex flex-col w-[16rem] ml-8">
        <h2 className="text-xl font-bold font-poppins mb-4">{translatedMenuItems[8]}-(6)</h2>
        {data.notInCrm.map((contact, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] w-[14rem]">
            <div className="flex justify-between">
              <div className="font-semibold font-poppins">{contact.name}</div>
              <div className="text-sm text-gray-500 font-poppins">{contact.time}</div>
            </div>
            <div className="text-sm text-gray-500 font-poppins">{contact.description}</div>
            
          </div>
        ))}
      </div>
      <div className="md:h-[65vh] md:bg-[#ACB6FC]  w-[0.1rem]"></div> 
      {/* DEALS */}
      <div class="flex flex-col w-[16rem] ml-8">
        <h2 className="text-xl font-bold font-poppins mb-4"> {translatedMenuItems[9]}-(5) </h2>
        {data.colleagues.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] w-[14rem] ">
            <div className="flex justify-between">
              <div className="font-semibold">{colleague.name}  </div>
              <div className="text-sm text-gray-500 font-poppins">
                {colleague.date}
                
                </div>
            </div>
            <div className="text-sm text-gray-500 font-poppins">{colleague.description}</div>
          </div>
        ))}
      </div>
    </div>   
  );
};
const mapStateToProps = ({ dashboard,inventory, auth }) => ({
  userId: auth.userDetails.userId,
  fetchingQuotationDashboard:dashboard.fetchingQuotationDashboard,
  locationId: auth.userDetails.locationId,
  reOrderData:dashboard.reOrderData,
  fetchingTaskper:dashboard.fetchingTaskper,
  taskperCount:dashboard.taskperCount,
  fetchingMaterialBestBefore:inventory.fetchingMaterialBestBefore,
  tasksdashboardGantt:dashboard.tasksdashboardGantt,
  materialBestBefore:inventory.materialBestBefore,
  quotationDashboard:dashboard.quotationDashboard,
  fetchingTaskDashboardGantt:dashboard.fetchingTaskDashboardGantt,
  quotationDashboardCount:dashboard.quotationDashboardCount
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getQuotationDashboard,
  getQuotationDashboardCount,
  getMaterialBestBefore,
  getTasklist,
  linkTaskStatusDashboard,

  getReorderdata,
  addToWaste,
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