import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {linkTaskStatusDashboard} from "../DashboardAction"
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import {Button,Tooltip} from "antd"
import dayjs from "dayjs";
import PinIcon from '@mui/icons-material/Pin';
import Shop2Icon from '@mui/icons-material/Shop2'; 
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CategoryIcon from '@mui/icons-material/Category'
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  getMaterialBestBefore,
  addToWaste,

} from "../../Main/Inventory/InventoryAction";
import {getPriceUpdated} from "../../../Containers/Main/Supplies/SuppliesAction";
import { getQuotationDashboard,getReorderdata,getQuotationDashboardCount ,
  getTaskDashboard,getTasklist,getDealDashboard,getDealDashboardCount,
  getOrderDashboard,getOrderDashboardCount,getBestDashboardCount,getReorderDashboardCount
} from "../../Dashboard/DashboardAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";

const ButtonGroup = Button.Group;
const DashBoardSummary=(props) =>{
  const { user } = props;
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
      "199",//   "TASK",0
      "1704",//   No data found1
      "213",//   QUOTATION  2
     "1172", //   To Order3
     "815", //   RE-ORDER 4
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

  const [BestBefore, setBestBefore] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [error1,setError1]=useState(null);

    const fetchBestBefore = async (Ids) => {
      try {
        const response = await axios.get(`${base_url2}/po/getBestBeforeItemList/${Ids}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setBestBefore(response.data);
        setLoading1(false);
      } catch (error) {
        setError1(error);
        setLoading1(false);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      if (props.viewType === "ME") {
        console.log("Fetching for user", props.viewType);
        props.getQuotationDashboard(props.userId);
        props.getQuotationDashboardCount(props.userId);
        props.getMaterialBestBefore(props.locationId);
        props.getBestDashboardCount(props.locationId);
        props.getTaskDashboard(props.userId, page);
        props.getTasklist(props.userId);
        props.getReorderdata("user");
        props.getDealDashboard(props.userId);
        props.getReorderDashboardCount();
        props.getDealDashboardCount(props.userId);
        props.getOrderDashboard(props.userId, "procure");
        props.getOrderDashboardCount(props.userId, "procure");
        props.getPriceUpdated(props.locationId);
        fetchBestBefore(props.userId);
      } else if (props.viewType === "ALL") {
        console.log("Fetching for organization", props.viewType);
        props.getQuotationDashboard(props.orgId);
        props.getQuotationDashboardCount(props.orgId);
        props.getTaskDashboard(props.orgId, page);
        props.getTasklist(props.orgId);
        props.getReorderdata("org");
        props.getDealDashboard(props.orgId);
        props.getReorderDashboardCount();
        props.getDealDashboardCount(props.orgId);
        props.getOrderDashboard(props.orgId, "procure");
        props.getOrderDashboardCount(props.orgId, "procure");
        props.getPriceUpdated(props.locationId);
        fetchBestBefore(props.orgId);
      }
    };
  
    fetchData();
  }, [props.viewType, props.userId, props.orgId, props.locationId, page]);
  


  const handleLoadMore = () => {
    const callPageMapd = props.taskDashboard && props.taskDashboard.length &&props.taskDashboard[0].pageCount
    setTimeout(() => {  
      if  (props.taskDashboard)
      {
        if (page < callPageMapd) {    
    setPage(page + 1);
    if (props.viewType === "ME") {
      props.getTaskDashboard(props.userId, page);
    } else if (props.viewType === "ALL") {
      props.getTaskDashboard(props.orgId, page);
    }
     }
              if (page === callPageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  }
  return (
    <div className=" container  mx-auto  p-2 flex rounded mt-1  bg-white h-[87vh]  overflow-x-auto overflow-y-hidden  ">
      {/* TASK */}
      {(user.basicAccessInd === true || user.role === "ADMIN") && (
      <div class="flex flex-col  w-[14rem] items-center max-sm:min-h-9 ">
        <div className="text-xl font-bold font-poppins mb-2 uppercase">  <FactCheckIcon className='!text-icon mr-1 text-[#b02e0c]'/>{translatedMenuItems[0]}<span  className="font-bold text-[tomato] ml-1"> 
          {`${props.taskperCount.totalTask  ?? ""} `}</span></div>
          <div className=" overflow-x-auto overflow-y-hidden h-[89vh] min-w-[11rem]">
        <InfiniteScroll
        dataLength={props.taskDashboard.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingTaskDashboard?<div class="flex justify-center">Loading ...</div>:null}
        height={"86vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
      {props.fetchingTaskDashboard ? (
        <div className="flex justify-center items-center h-full min-w-[12rem]">
          <BundleLoader/> 
          {/* <div>{translatedMenuItems[1]}</div> */}
          {/* Spinner component */} 
        </div>
      ) : (
        props.taskDashboard.map((deal, index) => {
          const currentDate = dayjs();
        const completionDate = dayjs(deal.completionDate);
          const endDate = dayjs(deal.endDate);
        const difference = currentDate.diff(endDate, 'days');
        return (
          <div key={index} className="mb-2  p-1 ml-2 box-content h-16 min-h-[5.25rem]  border-2 border-[#00008b23] w-[11rem] max-sm:min-w-[9rem]  min-w-[11rem]">
            <div className="flex justify-between flex-col">
              <div>
                <div className="font-semibold font-poppins truncate text-xs ">{deal.taskName}</div>
               
              </div>
              <div className=" flex flex-row justify-between w-full  items-center  content-end">
              <div className=" text-gray-500 font-poppins flex justify-start ">
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
              <div className="text-red-600 text-xs font-bold bg-red-100  px-2 py-1 rounded max-h-max flex justify-end items-center mr-2">
                {`${dayjs(deal.endDate).format("DD/MM/YYYY")}`}
              </div>
              </div>
              
            </div>
          </div> 
        )
       
})
      )}
      </InfiniteScroll>
    </div>
      </div>
        )}
     

      {/* QUOTATION */}
      {(user.opportunityAccessInd === true && user.crmInd === true 

      ) && (
        <>
        <div className="max-md:h-[80vh] h-[80vh]  md:bg-[#fcacc6]  w-[0.1rem] ml-1"></div> 
      <div class="flex flex-col w-[14rem]  items-center">
  <div className="text-xl font-poppins font-bold mb-2 uppercase">  <LightbulbIcon className='!text-icon mr-1 text-[#84a59d]'/>
  {translatedMenuItems[2]} <span  className=" font-bold text-[tomato] ml-1"> 
      {`${props.quotationDashboardCount.countByUserId  ?? ""} `}</span>
</div>
<div className="h-[89vh] overflow-y-hidden">
        <InfiniteScroll
        dataLength={props.taskDashboard.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingTaskDashboard?<div class="flex justify-center">Loading ...</div>:null}
        height={"86vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
  {props.quotationDashboard.length === 0 &&props.fetchingQuotationDashboard? (
    <>
   <div className="flex justify-center items-center h-full min-w-[12rem]">
          <BundleLoader/> 
   
        </div>
    </>
   
  ) : (
    props.quotationDashboard.map((lead, index) => (
      <div key={index} className="mb-2  p-1 ml-2 h-16 min-h-[5.25rem]  box-content border-2 border-[#00008b23] w-[11rem] min-w-[11rem] ">
        <div className="flex justify-between">
          <div className=" font-semibold font-poppins text-xs">{lead.newOrderNo}</div>
          <div className=" text-xs text-gray-500 font-poppins">{lead.time}</div>
          
        </div>
        <div className="text-xs text-gray-500 font-poppins">{lead.amount}</div>
        <div class="flex justify-between">
        <div className=" text-gray-500 font-poppins flex items-center   truncate text-xs ">{lead.contactPersonName}</div>
        <Button style={{  fontSize: "0.75rem" }} type="primary">{translatedMenuItems[3]}</Button>
        </div>
      </div>
    ))
  )}
   </InfiniteScroll>
  </div>
</div>
</>
  )}

    

  {/* Re Order */}
  {(user.materialAccessInd === true && user.erpInd === true )
        && (user.supplierAccessInd === true && user.erpInd === true
      ) &&  (
        <>
        <div className="max-md:h-[80vh] h-[80vh]  md:bg-[#fcacc6]  w-[0.1rem] ml-1"></div> 
  <div class="flex flex-col min-h-[89vh] w-[14rem] items-center">
        <div className="text-xl font-poppins font-bold mb-2 uppercase"> <DynamicFeedIcon className='!text-icon mr-1 text-[#ef6f6c]'/>
        {translatedMenuItems[4]}<span  className=" text-xl font-bold text-[tomato] ml-1">   {`${props.ReorderDashboardCount.bbcnt ?? ""} `}</span> </div>
        {props.reOrderData.map((colleague, index) => (
          <div key={index} className="mb-2  p-1 ml-2 h-16 min-h-[5.25rem]  box-content border-2 border-[#00008b23] w-[11rem] min-w-[11rem]">
            <div className="flex justify-between">
              <div className="font-semibold font-poppins  truncate text-xs ">{colleague.suppliesFullName} {colleague.batchNo}</div>
              <div className="text-red-600 text-xs font-bold font-poppins bg-red-100 inline-block px-2 py-1 rounded">
             {colleague.reorderLevel}
                </div>
            </div>
            <div className="flex justify-between">
            <div className="text-xs text-gray-500 font-poppins"><ShareLocationIcon className="!text-base text-[#637492]"/> {colleague.zone}<MeetingRoomIcon className="!text-base text-[#FFADD6]"/> {colleague.aisle} {colleague.chamber}  </div>
            <div className=" text-xs text-gray-500 font-poppins"> <LocationOnIcon className='!text-base  text-[#2C7775]'
              />{colleague.locationName}</div>
              </div>
              <div className=" flex items-center justify-end w-wk flex-wrap content-end"><Button type="primary">{translatedMenuItems[5]} PO</Button></div>
          
          </div>
        ))}
      </div>
      </>
        )}
        
     
         {/* Best Before */}
         {(user.materialAccessInd === true && user.erpInd === true )
        && (user.supplierAccessInd === true && user.erpInd === true
      ) &&  (
        <>
        <div className="max-md:h-[80vh] h-[80vh]  md:bg-[#fcacc6]  w-[0.1rem] ml-1"></div> 
         <div class="flex flex-col w-[14rem] items-center">
        <div className="text-xl font-bold font-poppins mb-2 uppercase"> <CategoryIcon className='!text-icon mr-1 text-[#7dcfb6]'
              /> {translatedMenuItems[6]} <span  className="font-bold text-[tomato] ml-1">
        {`${props.bestDashboardCount.bbcnt ?? ""} `}</span> </div>
        <div className="overflow-y-hidden max-h-[78vh]">
      {loading1 ? (
        <div className="flex justify-center items-center h-full  min-w-[12rem]">
          <BundleLoader /> {/* Spinner component */}
        </div>
      ) : (
        BestBefore.map((colleague, index) => (
          <div key={index} className="mb-2  p-1  ml-2 h-16 min-h-[5.25rem]  box-content border-2 border-[#00008b23] w-[11rem] min-w-[11rem]">
            <div className="flex  w-full truncate text-xs">
              <div className="font-semibold font-poppins  truncate text-xs ">{colleague.suppliesFullName} {colleague.batchNo}</div>
            
            </div>
            <div className="text-xs text-gray-500 font-poppins">    <Shop2Icon className=" !text-base"/>
              {colleague.newPoNumber} <PinIcon className=" !text-base"/>{colleague.hsn} </div>
            <div class="flex justify-between">
                      <div className="text-xs text-blue-500 font-poppins">{colleague.zone} {colleague.aisle} {colleague.chamber} </div>
                      </div>
                      <div className=" flex align-bottom justify-between"> 
                         <div className="text-red-600 text-xs font-bold bg-red-100 inline-block px-2 py-1 rounded">
              {`${dayjs(colleague.bestBeforeUse).format("DD/MM/YYYY")}`}
                </div>
            <Button style={{  fontSize: "0.75rem" }} type="primary" 
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
                colleague.poSupplierSuppliesId,
            
              );
              
              }}
            >{translatedMenuItems[7]}</Button>
            </div>
            </div>
         
        ))

      )}

        </div>
      </div>
      </>
   )}
      <div className="max-md:h-[80vh] h-[80vh]  md:bg-[#fcacc6]  w-[0.1rem] ml-1"></div> 
        {/* ORDER */}
        <div class="flex flex-col w-[14rem]  items-center">
        <div className="text-xl font-bold font-poppins mb-2 uppercase">  <DynamicFeedIcon className='!text-icon mr-1 text-[#59c9a5]'/>{translatedMenuItems[8]} 
        <span  className=" font-bold text-[tomato] ml-1">
        {`${props.orderDashboardCount.count ?? ""} `}</span></div>
        <div className=" overflow-x-auto overflow-y-hidden h-[89vh]">
        <InfiniteScroll
        dataLength={props.taskDashboard.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingTaskDashboard?<div class="flex justify-center">Loading ...</div>:null}
        height={"86vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
        {props.fetchingTaskDashboard ? (
        <div className="flex justify-center items-center h-full min-w-[12rem]">
          <BundleLoader/> 
          {/* <div>{translatedMenuItems[1]}</div> */}
          {/* Spinner component */} 
        </div>
      ) : (
        props.orderDashboard.map((contact, index) => {
          <div key={index} className="mb-2  p-1 ml-2 h-16 min-h-[5.25rem] box-content border-2 border-[#00008b23] w-[11rem] min-w-[11rem]">
            <div className="flex justify-between">
              <div className="font-semibold font-poppins text-xs">{contact.contactPersonName}</div>
              <div className="text-xs text-gray-500 font-poppins"> {`${dayjs(contact.creationDate).format("DD/MM/YYYY")}`}
              </div>
            </div>
            <div className="text-xs text-gray-500 font-poppins">{contact.status}</div>
            
          </div>
  }  ))}
      
              </InfiniteScroll>
        </div>
      </div>
      
      {/* DEALS */}
      {(user.imInd === true && user.dealAccessInd === true 
      
      ) && (
        <>
        <div className="max-md:h-[80vh] h-[80vh]  md:bg-[#fcacc6]  w-[0.1rem] ml-1"></div> 
      <div class="flex flex-col w-[14rem]  items-center">
        <div className="text-xl font-bold font-poppins mb-2 uppercase">
        <CurrencyExchangeIcon className='!text-icon  text-[#1d4e89]'/> {translatedMenuItems[9]}
         <span  className="font-bold text-[tomato] ml-1"> 
        {`${props.dealsDashboardCount.countByUserId ?? ""} `}</span></div>
        <div className=" overflow-x-auto overflow-y-hidden h-[89vh]">
        <InfiniteScroll
        dataLength={props.taskDashboard.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingTaskDashboard?<div class="flex justify-center">Loading ...</div>:null}
        height={"86vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
        {props.dealsDashboard.map((colleague, index) => (
          <div key={index} className="mb-2  p-1 ml-2 box-content h-16 min-h-[5.25rem]  border-2 border-[#00008b23] w-[11rem] min-w-[11rem] ">
            <div className="flex justify-between">
              <div className="font-semibold">{colleague.name}  </div> 
              <div className="text-xs text-gray-500 font-poppins">
                {colleague.date}
                
                </div>
            </div>
            <div className="text-xs text-gray-500 font-poppins">{colleague.description}</div>
          </div>
        ))}
         </InfiniteScroll>
        </div>
      </div>
      </>
          )}
{/* Price Update */}

{(user.erpInd === true || user.pndAccessInd === true) && (
  <>
  <div className="max-md:h-[80vh] h-[80vh]  md:bg-[#fcacc6]  w-[0.1rem] ml-1"></div> 
      <div class="flex flex-col  w-[14rem] items-center max-sm:min-h-9 ">
        <div className="text-xl font-bold font-poppins mb-2 uppercase">  <FactCheckIcon className='!text-icon mr-1 text-[#b02e0c]'/>Price Update<span  className="font-bold text-[tomato] ml-1"> 
          {/* {`${props.taskperCount.totalTask  ?? ""} `} */}
          </span></div>
          <div className=" overflow-x-auto overflow-y-hidden h-[89vh] min-w-[11rem]">
       
      {props.fetchingPriceUpdated ? (
        <div className="flex justify-center items-center h-full min-w-[12rem]">
          <BundleLoader/> 
        </div>
      ) : (
        props.priceUpdated.map((deal, index) => {
          const currentDate = dayjs();
        const completionDate = dayjs(deal.completionDate);
          const endDate = dayjs(deal.endDate);
        const difference = currentDate.diff(endDate, 'days');
        return (
          <div key={index} className="mb-2  p-1 ml-2 box-content h-16 min-h-[5.25rem]  border-2 border-[#00008b23] w-[11rem] max-sm:min-w-[9rem]  min-w-[11rem]">
            <div className="flex justify-between flex-col">
              <div>
                <div className="font-semibold font-poppins truncate text-xs ">{deal.newSuppliesNo}</div>
                <div className="font-semibold font-poppins truncate text-xs ">{deal.suppliesFullName}</div>
                <div className="font-semibold font-poppins truncate text-xs ">{deal.batchNo}</div>
                <div className="font-semibold font-poppins truncate text-xs ">{deal.brandName}</div>
              </div>
             
              
            </div>
          </div> 
        )
       
})
      )}
    </div>
      </div>
      </>
)}
    </div>   
  );
};
const mapStateToProps = ({ dashboard,inventory, auth ,supplies}) => ({
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
  quotationDashboardCount:dashboard.quotationDashboardCount,
  ReorderDashboardCount:dashboard.ReorderDashboardCount,
  dealsDashboard:dashboard.dealsDashboard,
  dealsDashboardCount:dashboard.dealsDashboardCount,
  orderDashboard:dashboard.orderDashboard,
  orderDashboardCount:dashboard.orderDashboardCount,
  taskDashboard:dashboard.taskDashboard,
  fetchingTaskDashboard:dashboard.fetchingTaskDashboard,
  bestDashboardCount:dashboard.bestDashboardCount,
  user: auth.userDetails,
  locationId:auth.userDetails.locationId,
  priceUpdated:supplies.priceUpdated,
  fetchingPriceUpdated:supplies.fetchingPriceUpdated,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getQuotationDashboard,
  getQuotationDashboardCount,
  getMaterialBestBefore,
  getTasklist,
  linkTaskStatusDashboard,
  getDealDashboard,
  getReorderdata,
  addToWaste,
  getTaskDashboard,
  getDealDashboardCount,
  getOrderDashboard,
  getOrderDashboardCount,
  getBestDashboardCount,
  getReorderDashboardCount,
  getPriceUpdated

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