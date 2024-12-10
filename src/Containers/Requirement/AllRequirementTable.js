import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getAllRequirementTable,ClearReducerDataOfRequirement} from "../Requirement/RequirementAction"
import InfiniteScroll from "react-infinite-scroll-component";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContactsIcon from '@mui/icons-material/Contacts';
import { BundleLoader } from "../../Components/Placeholder";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import EmptyPage from "../Main/EmptyPage";


const AllRequirementTable = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getAllRequirementTable("All",page)
        props.ClearReducerDataOfRequirement()
    }, []);
    const handleLoadMore = () => {
      const callPageMapd = props.requirementTable && props.requirementTable.length &&props.requirementTable[0].pageCount
      setTimeout(() => {
        const {
          getAllRequirementTable, 
        } = props;
        if  (props.requirementTable)
        {
          if (page < callPageMapd) {
            setPage(page + 1);
            getAllRequirementTable( "All", page,);
        }
        if (page === callPageMapd){
          setHasMore(false)
        }
      }
      }, 100);
    };

    const {
        fetchingAllRequirementTableError,
        requirementTable,
        fetchingAllRequirementTable
      } = props;
    if (fetchingAllRequirementTableError) {
        return <NodataFoundPage/>;
      }
    return (
        <div className="flex flex-col w-full p-4">
        <div className="flex sticky z-auto">
                <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                       
                    <div className=" max-md:w-[8.1rem] w-[6.1rem] text-sm text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/> Job ID</div>
    <div className=" max-md:w-[4.2rem] w-[7.2rem]"> <RecentActorsIcon className="!text-icon  "/> Requirement</div>
    <div className="max-md:w-[5.8rem] w-[5.8rem]"> <CategoryIcon className="!text-icon text-[#42858c] "/> Category</div>
    <div className="max-md:w-[8.5rem] w-[6.5rem]"> <AcUnitIcon className="!text-icon  text-[#c42847]"/> Customer</div>
    <div className="max-md:w-[3.8rem] w-[4.8rem]"> <EventIcon className="!text-icon text-[#5A189A] "/> Created</div> 
    <div className="max-md:w-[5.2rem] w-[5.2rem]"> <RecentActorsIcon className="!text-icon text-[#84a59d] "/> Recruiter</div>
    <div className="max-md:w-[1.5rem] w-[1.5rem]"> On</div>
    <div className="max-md:w-[4.3rem] w-[4.3rem]"> <EventIcon className="!text-icon  "/> Start</div>
    <div className="max-md:w-[3.3rem] w-18"> <EventIcon className="!text-icon text-[#f42c04] "/> Duration</div>
    <div className="max-md:w-[3.3rem] w-16"> <AccessAlarmIcon className="!text-icon  text-[#c42847]"/> Billing</div>
    <div className="max-md:w-[3.3rem] w-16"> <PortraitIcon className="!text-icon  text-[#e4eb2f]"/> Talent</div>
    <div className="max-md:w-[3.3rem] w-20"> <ContactsIcon className="!text-icon text-[#d64933] "/> Contact</div>
                       
                    </div>
                    <InfiniteScroll
    dataLength={requirementTable.length}
    next={handleLoadMore}
    hasMore={hasMore}
    loader={fetchingAllRequirementTable?<div  class="flex justify-center">Loading...</div>:null}
    height={"83vh"}
    style={{scrollbarWidth:"thin"}}
    endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
  >
    
    { !fetchingAllRequirementTable && requirementTable.length === 0 ?<EmptyPage />:requirementTable.map((item,index) =>  {
     const currentdate = dayjs().format("DD/MM/YYYY");
     const date = dayjs(item.creationDate).format("DD/MM/YYYY");
     const date2 = dayjs(item.avilableDate).format("DD/MM/YYYY");

     const diff = Math.abs(
      dayjs().diff(dayjs(item.lastRequirementOn), "days")
      );
    
                return (
                    <div>
                        <div
          className="flex rounded justify-between  py-ygap bg-white mt-1  items-center  max-sm:rounded-lg max-xl:text-xs max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
        >
                                 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                 <div className=" flex items-center  max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                {/* >Source */}

                                <div class="text-xs  font-poppins  max-sm:text-sm">
                                
                                      {item.jobOrder}
                                    &nbsp;
                                      {date === currentdate ? (
                                            <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold">
                                              New
                                            </span>
                                          ) : null}
                                </div>
                            </div>
                            <div className=" flex   w-[10.5rem]  border-l-2 border-green-500 bg-[#eef2f9]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  items-center">
                            <div>

                                             {item.requirementName}
                                              
                                    </div>                                                 
                                 
                                    <div class=" flex max-sm:w-full  flex-row md:flex-col ml-1">                                         
                                        {/* Name */}
                              
                                        <div class=" flex items-center   text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">
                                                                
                                         {item.category}
                                         
                                          
                                         
   
                                        </div>
                                        </ div>
                                  
                          
                            </div>
                            </div>
                            <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                           
                                <div class="text-xs  font-poppins ml-gap  max-sm:text-sm">   
                                {item.customerName}
                                </div>
                            </div>
                                                                                                                                              
                          
                                      <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                {/* # Category */}

                                <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                {date}
                                </div>
                            </div>
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[6.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                {/* >Source */}

                                <div class="text-xs ml-gap font-poppins  max-sm:text-sm">
                                {item.recruiterName}
                                </div>
                            </div>
                            
                          
                            </div>
                          
                            <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                            <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div className=" flex  items-center justify-center w-[3.212rem]  max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        {date2}

                              
                            </div>
                            <div className=" flex items-center justify-center h-8 w-[5.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             
                                <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                               {item.billableHour}
                                </div>
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
            })}

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

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementTable);
