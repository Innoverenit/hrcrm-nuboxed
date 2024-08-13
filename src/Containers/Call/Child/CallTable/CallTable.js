import React, { useEffect, useState,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Avatar } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  deleteCall,
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


  const {
    fetchingCallListRangeByUserId,
    callListRangeByUserId,
    deleteCall,
    handleCallNotesDrawerModal,
    userDetails: { employeeId },
  } = props;

  
  return (
    <>
       <div className=' flex  justify-center sticky  z-auto'>
       <div class="rounded max-sm:m-1 m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
       <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
        <div className=" w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">            
        {props.translatedMenuItems[2]}
</div>
        <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[3]}</div>
        <div className=" w-[7.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{props.translatedMenuItems[4]}</div>
        <div className=" w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[5]}</div>
        <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[6]}</div> 
        <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[7]} </div>
         <div className="w-[6.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[8]}</div>
        <div className="w-[9.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[9]}</div>
       
        <div className="w-12"></div>
      </div>
      <InfiniteScroll
        dataLength={callListRangeByUserId.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingCallListRangeByUserId?<div class="flex justify-center">{props.translatedMenuItems[10]}...</div>:null}
        height={"80vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <div class="flex text-center font-bold text-xs text-red-500">{props.translatedMenuItems[11]}. </div>}
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
            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8  items-center p-1 max-sm:h-[7rem] max-sm:flex-row scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              <div class="flex  w-[8.9rem] max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
            <div className="max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"> {item.callType}</div>
            </div>
            <div class="flex w-[12.8rem] max-xl:w-[9.8rem] max-lg:w-[7.3rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
            <div className="max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"> {item.callPurpose}</div>
              </div>
              <div class="flex w-[7.5rem] max-xl:w-[4.8rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
      
              <MultiAvatar2
                    primaryTitle={item.contactName}
                    // imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              
   
              </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
              
              <div class="flex   justify-center w-[11.35rem] max-xl:w-[7.5rem] max-lg:w-[6.35rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
              <div className="max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"> {dayjs(item.startDate).format('YYYY-MM-DD')}</div>
              </div>
              <div class="flex w-[8.5rem] max-xl:w-[6.5rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
             
              <div>
           
              <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                    {item.included &&
                  item.included.map((candidate, i) => {
                    
                    const data1 =candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : `${props.translatedMenuItems[12]}`
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
              <div class="flex w-[7.8rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
             <span>
              {item.assignedTo === null ? (
                // "Not available"
                <div>{props.translatedMenuItems[13]}</div>
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
            </span>
              </div>
              </div>
              
              <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
             
              <div class="flex w-[9.38rem] max-xl:w-[7.78rem] max-lg:w-[5.38rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto mt-1 mb-1">
             
             <MultiAvatar
                   primaryTitle={item.woner}
                   imageURL={item.imageURL}
                   imgWidth={"1.8rem"}
                   imgHeight={"1.8rem"}
                 />
            
             </div>
              <div class="flex w-[11.35rem] max-xl:w-[7.5rem] max-lg:w-[6.35rem] max-sm:flex-row max-sm:justify-between max-sm:w-auto">
           
              <div className="max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"> {item.completionInd ? `${props.translatedMenuItems[14]}` : `${props.translatedMenuItems[15]}`} </div>
              </div>
            
              
             
              <div class="flex flex-row  w-[6%] max-sm:flex-row max-sm:w-auto">
                    <div>
                    <Tooltip title={props.translatedMenuItems[16]}>
       <NoteAltIcon
                onClick={() => {
                  handleCallNotesDrawerModal(true);
                  handleSetCallNameId(item);
                }}
                className="!text-icon cursor-pointer text-[green]"
              />
           </Tooltip>
                    </div>
                    <div>
                    <Tooltip title={props.translatedMenuItems[17]}>
                    <DeleteOutlined  type="delete" 
                    className="!text-icon cursor-pointer text-[red]"
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
      getNotesListByCallId,
      handleCallNotesDrawerModal
    },
    dispatch
  );

  export default connect(mapStateToProps, mapDispatchToProps)(CallTable);