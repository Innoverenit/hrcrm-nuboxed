import React, { useEffect, useState,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip, Avatar,Button } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContactsIcon from '@mui/icons-material/Contacts';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {
  deleteCall,
  addcallLocation,
  getCallListRangeByUserId,
  handleCallModal,
  setEditNote,
  handleCallNotesDrawerModal,
  getNotesListByCallId,
  emptyCall
} from "../../CallAction";
import { MultiAvatar2, MultiAvatar } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddCallNotesDrawerModal = lazy(() => import("../AddCallNotesDrawerModal"));

function CallTable(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
const [currentNameId, setCurrentNameId] = useState("");
const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const {
      getCallListRangeByUserId,
      userDetails: { employeeId },
    } = props;
    getCallListRangeByUserId(employeeId, page);
    setPage(page + 1);
  }, []);

  useEffect(() => {
    return () => props.emptyCall();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  dayjs.extend(relativeTime);

  const getRelativeTime = (creationDate) => {
      const now = dayjs();
      const creationDay = dayjs(creationDate);
  
      if (creationDay.isSame(now, 'day')) {
          return 'Today';
      } else {
          return creationDay.from(now); // e.g., "2 days ago"
      }
  };

  const handleLoadMore = () => {
    const callPageMapd = props.callListRangeByUserId && props.callListRangeByUserId.length &&props.callListRangeByUserId[0].pageCount
    setTimeout(() => {
      const {
        getCallListRangeByUserId,
        userDetails: { employeeId },
      } = props;
      if  (props.callListRangeByUserId)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
        getCallListRangeByUserId(employeeId, page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  function handleSetCallNameId(item) {
    setCurrentNameId(item);
  }
  const getLocation = (item) => {
    props.addcallLocation(item.completionInd===false?true:false,item.callId)
  };
  const {
    fetchingCallListRangeByUserId,
    callListRangeByUserId,
    deleteCall,
    handleCallNotesDrawerModal,
    userDetails: { employeeId },
  } = props;

  
  return (
    <>
       <div className=' flex   sticky  z-auto'>
       <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
       <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold items-end sticky  z-10">
        <div className=" flex justify-between w-[79%] text-xs font-poppins">
        <div className="flex  w-[11.14rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">            
        < MergeTypeIcon className='!text-icon text-[#c42847] '  />  {props.translatedMenuItems[1]} 
        {/* Type */}
        </div>
        <div className="flex w-[18.9rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">   <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' />    {props.translatedMenuItems[2]}</div>
        <div className=" flex  w-[14.5rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] "> <ContactsIcon className="!text-icon mr-1 "/>{props.translatedMenuItems[3]}</div>
        <div className="flex  w-[14.4rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> <DateRangeIcon className="!text-icon  mr-1"/>{props.translatedMenuItems[4]}</div>
        <div className=" flex  w-[15.1rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>{props.translatedMenuItems[6]}</div> 
        <div className=" flex w-[9.2rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>{props.translatedMenuItems[7]} </div>

         </div>    
      </div>
      <InfiniteScroll
        dataLength={callListRangeByUserId.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingCallListRangeByUserId?<div class="flex justify-center">{props.translatedMenuItems[9]}...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <div class="flex text-center font-poppins font-bold text-xs text-red-500">{props.translatedMenuItems[10]}. </div>}
      >    
          {callListRangeByUserId.map((item) => {
            const incdata =item.included
            const findEmp = incdata.map(item => ({
              empName: item.empName
                ? item.empName
                    .split(' ')
                    .map(word => (word ? word.charAt(0).toUpperCase() : '')) 
                    .slice(0,2)
                : ''
            }));
             return (
              <div>
            <div className="flex rounded justify-between bg-white py-ygap  max-sm:rounded  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              <div class="flex  w-[8.9rem]  border-l-2 border-green-500 h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
            <div className=" flex items-center ml-gap max-xl:text-[0.65rem] text-xs max-lg:text-[0.45rem] max-sm:text-sm"> {item.callType}</div>
            </div>
            <div class="flex w-[14.8rem] items-center justify-start h-8 bg-[#eef2f9] ml-gap text-xs max-xl:w-[9.8rem] max-lg:w-[7.3rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
            <div className="max-xl:text-[0.65rem] ml-gap text-xs max-lg:text-[0.45rem] max-sm:text-sm"> {item.callPurpose}</div>
              </div>
              <div class="flex w-[11.5rem] ml-gap items-center justify-center h-8 bg-[#eef2f9] max-xl:w-[4.8rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
      
              <MultiAvatar2
                    primaryTitle={item.contactName}
                    // imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  /> 
              </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center ">        
              <div class="flex  text-xs   w-[11.354rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[6.35rem] max-sm:flex-col max-sm:justify-between max-sm:w-auto">
              <div className="max-xl:text-[0.65rem] text-xs max-lg:text-[0.45rem] max-sm:text-sm"> {dayjs(item.startDate).format('YYYY-MM-DD')}</div>
              </div>
           </div>
           <div class="flex   w-[11.35rem]   items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.5rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:justify-evenly max-sm:w-auto">
              <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                    {item.included &&
                  item.included.map((candidate, i) => {
                    
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
        <div  class="flex   w-[7.25rem]   items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.5rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:justify-evenly max-sm:w-auto">
              {item.assignedTo === null ? (
                // "Not available"
                <div>{props.translatedMenuItems[12]}</div>
              ) : (
                <>
                {item.assignedTo === item.woner ? (
                  
                  null
                ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                )}
                </>
              )} 
           </div>
           <div className="flex w-[7.12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[2.12rem]  max-sm:flex-row  max-sm:w-auto ">                                
               <div class="max-sm:flex justify-end">
                {item.completionInd===false&&(
   <Button type="primary"
  onClick={() => getLocation(item)}
   >
        Complete</Button>
                )}
                              {item.completionInd===true&&(
   <PowerSettingsNewIcon 
  onClick={() => getLocation(item)}
   style={{color:"green"}}
   />
       
                )}           
          </div>
                   </div>
           <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  items-center font-poppins">
                            {/* {date} */}
                            <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span>
                            </div>                                       
                        </div>
             <div class="flex max-sm:justify-between max-sm:w-wk  items-center justify-center h-8 bg-[#eef2f9] ">
              <div class="flex flex-row items-center max-sm:flex-row max-sm:w-auto">
                    <div>
                    <Tooltip title={props.translatedMenuItems[14]}>
       <NoteAltIcon
                onClick={() => {
                  handleCallNotesDrawerModal(true);
                  handleSetCallNameId(item);
                }}
                className="!text-icon cursor-pointer text-[green] flex"
              />
           </Tooltip>
                    </div>
                    <div>
                    <Tooltip title={props.translatedMenuItems[15]}>
                    <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer"  
                  
                onClick={() => deleteCall(item.callId, employeeId)}
              />
                </Tooltip>
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
      <Suspense fallback={<BundleLoader />}>      
      <AddCallNotesDrawerModal
handleSetCallNameId={handleSetCallNameId}
handleCallNotesDrawerModal={props.handleCallNotesDrawerModal}
addDrawerCallNotesModal={props.addDrawerCallNotesModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/></Suspense>
    </>
  );
}
const mapStateToProps = ({ auth, call, employee }) => ({
  userDetails: auth.userDetails,
  fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
  fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
  callListRangeByUserId: call.callListRangeByUserId,
  addDrawerCallNotesModal:call.addDrawerCallNotesModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallListRangeByUserId,
      emptyCall,
      deleteCall,
      handleCallModal,
      setEditNote,
      addcallLocation,
      getNotesListByCallId,
      handleCallNotesDrawerModal
    },
    dispatch
  );

  export default connect(mapStateToProps, mapDispatchToProps)(CallTable);