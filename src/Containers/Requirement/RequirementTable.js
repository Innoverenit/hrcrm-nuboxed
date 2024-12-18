import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getAllRequirementTable,ClearReducerDataOfRequirement} from "../Requirement/RequirementAction"
import InfiniteScroll from "react-infinite-scroll-component";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import { Tooltip, Avatar,Button } from "antd";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContactsIcon from '@mui/icons-material/Contacts';
import { BundleLoader } from "../../Components/Placeholder";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import EmptyPage from "../Main/EmptyPage";

const RequirementTable = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  
    useEffect(() => {
      
      window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
          const resizeObserverErrDiv = document.getElementById(
            'webpack-dev-server-client-overlay-div'
          )
          const resizeObserverErr = document.getElementById(
            'webpack-dev-server-client-overlay'
          )
          if (resizeObserverErr) {
            resizeObserverErr.setAttribute('style', 'display: none');
          }
          if (resizeObserverErrDiv) {
            resizeObserverErrDiv.setAttribute('style', 'display: none');
          }
        }
      })
       
        props.getAllRequirementTable(props.userId,page)
        setPage(page + 1);
        props.ClearReducerDataOfRequirement()
    }, []);
    const handleLoadMore = () => {
   
      setPage(page + 1);
      props.getAllRequirementTable(
        props.userId,page,
      );
  };
    const {
        fetchingAllRequirementTableError,
        requirementTable,
        fetchingAllRequirementTable
      } = props;
      if (fetchingAllRequirementTable) {
        return <div><BundleLoader/></div>;
      }
console.log(requirementTable)
    return (
        <div className="flex flex-col w-full ">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[97.5%] p-1 bg-transparent font-bold font-poppins !text-lm sticky z-10">
                           
                        <div className=" max-md:w-[8.1rem] w-[8.1rem] text-sm truncate text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/> Job ID</div>
        <div className=" max-md:w-[4.2rem] truncate w-[11.5rem]"> <RecentActorsIcon className="!text-icon  "/> Requirement</div>
        <div className="max-md:w-[3.31rem] truncate  w-[4.9rem]">  Quotation ID</div>
        <div className="max-md:w-[10.2rem] truncate w-[10.2rem]"> <CategoryIcon className="!text-icon text-[#42858c] "/> Category</div>
        <div className="max-md:w-[8.5rem] truncate w-[8.1rem]"> <AcUnitIcon className="!text-icon  text-[#c42847]"/> Customer</div>
        <div className="max-md:w-[3.3rem] truncate w-[8rem]"> <ContactsIcon className="!text-icon text-[#d64933] "/> Contact</div>  
        <div className="max-md:w-[3.8rem] truncate w-[6.8rem]"> <EventIcon className="!text-icon text-[#5A189A] "/> Created</div> 
        <div className="max-md:w-[6.2rem] truncate w-[7.2rem]"> <RecentActorsIcon className="!text-icon text-[#84a59d] "/> Recruiter</div>
        <div className="max-md:w-[8.5rem] truncate w-[2.1rem]"> On</div>
        <div className="max-md:w-[2.3rem] truncate w-[6.3rem]"> <EventIcon className="!text-icon  "/> Start</div>
        <div className="max-md:w-[5.3rem] truncate w-[6rem]"> <EventIcon className="!text-icon text-[#f42c04] "/> Duration</div>
        <div className="max-md:w-[3.3rem] truncate  w-[5.5rem]"> <AccessAlarmIcon className="!text-icon  text-[#c42847]"/> Billing</div>
        <div className="max-md:w-[3.3rem] truncate  w-[4.9rem]"> <PortraitIcon className="!text-icon  text-[#e4eb2f]"/> Talent</div>    
                                  
                        </div>
                        <InfiniteScroll
        dataLength={requirementTable.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllRequirementTable?<div  class="flex justify-center"><BundleLoader/></div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
      > 
        {
  fetchingAllRequirementTableError ? (
    <NodataFoundPage />
  ) : !fetchingAllRequirementTable && requirementTable.length === 0 ? (
    <EmptyPage />
  ) : (
    requirementTable.map((item, index) => {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const date2 = dayjs(item.avilableDate).format("DD/MM/YYYY");
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );    
                    return (
                        <div>
                             <div className="flex rounded justify-between  bg-white mt-1 items-center  max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
            
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                     <div className=" flex items-center  border-l-2 border-green-500 bg-[#eef2f9] h-8  w-[7.9rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs  font-poppins ml-gap  max-sm:text-sm">
                                    
                                          {item.jobOrder}
                                        &nbsp;
                                          {date === currentdate ? (
                                                <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
                                    </div>
                                </div>
                                <div className=" flex   w-[9.5rem]   items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  ">
                                <div className="text-xs  font-poppins ml-gap ">
                                                 {item.requirementName}                                         
                                        </div>  
                                        </div>   
                                        <div className=" flex items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[5.518rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
                                    <div class="text-xs truncate  font-poppins  max-sm:text-sm">
                               {item.opportunityId}
                                    </div>
                                    
                                </div>                                                                               
                                        <div className=" flex   items-center h-8 ml-gap bg-[#eef2f9]  w-[8.1rem]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto">                                      
                                            {/* Name */}                        
                                            <div class=" flex items-center   text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">                                                            
                                             {item.category}                                  
                                            </div>
                                            </ div>                             
                                
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                 
                                    <div class="text-xs  font-poppins ml-gap  max-sm:text-sm">   
                                       {item.customerName}
                                    </div>
                                 </div>         
                                 <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">    
                                {item.contactName}
                                  </div>                
                                          <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}
                            <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {date}
                                    </div>
                                </div>
                                <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[7.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs ml-gap font-poppins  max-sm:text-sm">
                                    <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                    {item.recruiterList &&
                  item.recruiterList.map((candidate, i) => {
                    
                    const data1 =candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : `${props.translatedMenuItems[11]}`
                    // "None"
                    return (
                      <Tooltip title={candidate.empName} key={i}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                    </Tooltip>        
                    );
                  })}
                 
            </Avatar.Group>
                                    </div>
                                </div>
                              </div>                
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[2.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* On */}
                                  </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.212rem]  max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                     {date2}
                                     </div>
                                 </div>
                            
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                 
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.billableHour}
                                    </div>
                                  
                                </div>
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.billing}
                                    </div>
                                    
                                </div>                         
                 </div>   
                
                            </div>
                        </div>
                    )
                }))}
     </InfiniteScroll> 
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ auth, requirement }) => ({
  user: auth.userDetails,
  requirementTable:requirement.requirementTable,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fetchingAllRequirementTable:requirement.fetchingAllRequirementTable,
  fetchingAllRequirementTableError:requirement.fetchingAllRequirementTableError
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllRequirementTable,
            ClearReducerDataOfRequirement
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RequirementTable);
