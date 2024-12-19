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
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    useEffect(() => {
            const fetchMenuTranslations = async () => {
              try {
                const itemsToTranslate = [
                "1744",//  "Job",//0
               "1152" ,//   "Requirement",//1
                "213",//   " Quotation ID",//2
               "14" ,//   "Category",//3
                "248",//   "Customer",//4
               "73", //   "Contact",//5
               "679", //   "Created",//6
                "158",//   "Start",//7
               "1010", //   "Billing",//8
                "1153",//   "Talent",//9
                 
              
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
  
    return (
        <div className="flex flex-col w-full  ">
        <div className="flex sticky z-auto">
                <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold font-poppins !text-lm sticky z-10">
                           
                           <div className=" max-md:w-[8.1rem] w-[8.1rem] text-sm truncate text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/> {translatedMenuItems[0]} ID{/* Job ID */}</div>
           <div className=" max-md:w-[4.2rem] truncate w-[9.2rem]"> <RecentActorsIcon className="!text-icon  "/> {translatedMenuItems[1]} {/* Requirement */}</div>
           <div className="max-md:w-[5.8rem] truncate w-[8.3rem]"> <CategoryIcon className="!text-icon text-[#42858c] "/> {translatedMenuItems[3]} {/* Category */}</div>
           <div className="max-md:w-[8.5rem] truncate w-[8.1rem]"> <AcUnitIcon className="!text-icon  text-[#c42847]"/> {translatedMenuItems[4]} {/* Customer */}</div>
           <div className="max-md:w-[3.3rem] truncate w-[8rem]"> <ContactsIcon className="!text-icon text-[#d64933] "/> {translatedMenuItems[5]}{/* Contact */}</div>  
           <div className="max-md:w-[3.8rem] truncate w-[6.8rem]"> <EventIcon className="!text-icon text-[#5A189A] "/>  {translatedMenuItems[6]}{/* Created */}</div> 
           <div className="max-md:w-[6.2rem] truncate w-[7.2rem]"> <RecentActorsIcon className="!text-icon text-[#84a59d] "/> Recruiter</div>
           <div className="max-md:w-[8.5rem] truncate w-[2.1rem]"> On</div>
           <div className="max-md:w-[2.3rem] truncate w-[6.3rem]"> <EventIcon className="!text-icon  "/> {translatedMenuItems[7]}{/* Start  */}</div>
           <div className="max-md:w-[5.3rem] truncate w-[6rem]"> <EventIcon className="!text-icon text-[#f42c04] "/> Duration</div>
           <div className="max-md:w-[3.3rem] truncate  w-[5.5rem]"> <AccessAlarmIcon className="!text-icon  text-[#c42847]"/> {translatedMenuItems[8]} {/* Billing  */}</div>
           <div className="max-md:w-[3.3rem] truncate  w-[4.9rem]"> <PortraitIcon className="!text-icon  text-[#e4eb2f]"/> {translatedMenuItems[9]} {/* Talent  */}</div>                           
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
         {/* Contact */}
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
           {item.recruiterName}
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
<div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.518rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
           <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
      {/* Talent */}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementTable);
