import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip,  Avatar } from "antd";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  deleteEvent, getEventListRangeByUserId,
  handleUpdateEventModal,
  setEditEvents,
} from "../../EventAction";
import EventNoteIcon from '@mui/icons-material/EventNote';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import FileCopyIcon from '@mui/icons-material/FileCopy';
const UpdateEventModal = lazy(() => import("../UpdateEventModal"));

function EventCardList (props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

 
  useEffect(() => {
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);

  }, []);
 ;
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
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);
}


    const {
      fetchingEventListRangeByUserId,
      fetchingEventListRangeByUserIdError,
      eventListRangeByUserId,
      deleteEvent,
      setEditNoteEvent,
      updateEventModal,
      handleUpdateEventModal,
      userDetails: { employeeId },
    } = props;

    console.log(eventListRangeByUserId)
    return (
      <>
      <div className=' flex  sticky  z-auto'>
      <div class="rounded-lg m-1  max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
   
         <div className=" flex  w-[99%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[9.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.2rem]"><FormattedMessage
                  id="app.type"
                  defaultMessage="type"
                /></div>
        <div className=" w-[13.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.23rem]"><FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /></div>
        <div className=" w-[9.25rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.25rem] "><FormattedMessage
                  id="app.start"
                  defaultMessage="start"
                /></div>
        <div className=" w-[13.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.13rem] max-lg:w-[11.13rem] "><FormattedMessage
                  id="app.end"
                  defaultMessage="end"
                /></div>
     
        <div className="w-[6.32rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.32rem] max-lg:w-[4.32rem]"><FormattedMessage
                  id="app.include"
                  defaultMessage="include"
                /></div>
     
        <div className="w-[8.15rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.15rem]"><FormattedMessage
                  id="app.assignedto"
                  defaultMessage="assignedto"
                /></div>
        <div className="w-24 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[22.01rem] max-lg:w-[23.01rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
                   {/* <div className="md:w-[5%]"><FormattedMessage
                  id="app.rating"
                  defaultMessage="rating"
                /></div>
        <div className="w-12"><FormattedMessage
                  id="app.action"
                  defaultMessage="action"
                /></div> */}
      </div>
      <InfiniteScroll
        dataLength={eventListRangeByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingEventListRangeByUserId?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
      >
      {eventListRangeByUserId.map((item) => { 
            const handleCopyClick = () => {
              const textToCopy = item.eventDescription;
              navigator.clipboard.writeText(textToCopy)
                .then(() => setIsCopied(true))
                .catch((err) => console.error('Unable to copy text', err));
               
            };
                    return (
                        <div>
                            <div className="flex rounded   mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col"
                                style={{
                                    // borderBottom: "3px dotted #515050"
                                }}>
                                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[8.98rem] max-xl:w-[6.98rem] max-lg:w-[5.28rem] max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
          <div class="max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-[0.82rem] text-cardBody font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-[0.82rem]">                                       
                                            {item.eventType}
       
                                            </div>
                                               </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  w-[12.26rem] max-xl:w-[9.6rem] max-lg:w-[7.6rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Subject </div> */}
                                    <div class=" text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-[0.82rem]">   
                                    {item.eventSubject}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[8.9rem] max-xl:w-[7.6rem] max-lg:w-[5.6rem] max-sm:flex-row  max-sm:w-auto">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Start</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-[0.82rem]">
                                    {` ${dayjs(item.startDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[5.32rem] max-xl:w-[5.32rem] max-lg:w-[3.32rem] max-sm:flex-row  max-sm:w-auto">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">End</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-[0.82rem]">
                                    {` ${dayjs(item.endDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[9.32rem] max-xl:w-[4.32rem] max-lg:w-[3.23rem] max-sm:flex-row  max-sm:w-auto">
                                   
                                </div>
                                <div className=" flex font-medium flex-col w-[7.31rem] max-xl:w-[3.31rem] max-lg:w-[2.31rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Include</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-[0.82rem]">
                                    <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                {item.included &&
                  item.included.map((candidate, i) => {
                     const data1 = candidate.fullName
                     .slice(0,2)
                    //  .split("")[0]
                     .toUpperCase();
                   console.log("datas", data1);
                    return (
                      <Tooltip title={candidate.fullName} key={i}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                    </Tooltip>
                     

                   
                    );
                  })}
            </Avatar.Group>
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col w-[7.69rem] max-xl:w-[4.69rem] max-lg:w-[3.69rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned To</div> */}

                                    <div class="text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-[0.82rem]">
                                    {/* <Tooltip title={item.assignedToName}> */}
              <SubTitle>
              <span>
              {item.assignedToName === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedToName === item.woner ? (
                  
                  null
                ) : (
                <MultiAvatar
                  primaryTitle={item.assignedToName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                )}
                </>
              )}
            </span>
              </SubTitle>
             {/* </Tooltip> */}
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col w-[6.12rem] max-xl:w-[2.12rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                   <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.woner}> */}
            <SubTitle>
              <MultiAvatar
              primaryTitle={item.woner}
              imageId={item.ownerImageId}
              imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </SubTitle>
          {/* </Tooltip> */}
          </div>
                   </div>
                               </div>
                               <div class="flex max-sm:justify-end max-sm:w-wk items-center"> 
                    
                      <div class="flex  w-[4rem] max-sm:flex-row items-center justify-between max-sm:w-auto">
                    <div class="">
                    {item.rating === 0 ? (<StarBorderIcon
                     className="!text-icon cursor-pointer text-[#eeeedd]"
                />)
                : (
                  <span>
                    {item.rating}{<StarBorderIcon 
                    className="!text-icon cursor-pointer text-[#FFD700]"/>}
                  </span>)}
                        </div>
                        <div>
                        {item.completionInd === false ? (
                <CheckCircleIcon 
                className="!text-icon cursor-pointer text-[#eeeedd]"
                  />
              ) : (
                <span><CheckCircleIcon 
                className="!text-icon cursor-pointer text-[#67d239]"
                 />
                </span>
              )}
        
                        </div>
                        <div>
                        {/* <Tooltip title={item.eventDescription}>  
                        <EventNoteIcon
                          className="!text-base cursor-pointer"
                       />
                        </Tooltip> */}
                         <Tooltip title={
      <div>
        {item.eventDescription}
        <br />
        <FileCopyIcon
          className={`!text-base cursor-pointer ${isCopied ? 'text-white' : ''}`}
          onClick={handleCopyClick}
        />
        {/* {isCopied && <span className="text-green-500 ml-2">Copied!</span>} */}
      </div>
    }>
      <EventNoteIcon className="!text-icon cursor-pointer" />
    </Tooltip>
                    </div>
                    </div>
                    
                    
        <div class="flex flex-row  w-[4rem] max-sm:flex-row justify-evenly items-center max-sm:w-auto">
       
          <Tooltip title="Edit">
              <BorderColorIcon
                type="edit"
                className="!text-icon cursor-pointer text-[tomato]"
                onClick={() => {
                  props.setEditEvents(item);
                  handleUpdateEventModal(true);
                }}
              />
            </Tooltip>
          
            <div>
           
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwanttodelete" defaultMessage="Do you want to delete" />}
              onConfirm={() => deleteEvent(item.eventId, employeeId)}
            >
               <Tooltip title="Delete">
              <DeleteOutlined  type="delete"
                className="!text-icon cursor-pointer text-[red]"
              />
              </Tooltip>
            </StyledPopconfirm>
      
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
     
        <UpdateEventModal
          updateEventModal={updateEventModal}
          handleUpdateEventModal={handleUpdateEventModal}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, event, employee,opportunity}) => ({
  userDetails: auth.userDetails,
  fetchingEventListRangeByUserId: event.fetchingEventListRangeByUserId,
  fetchingEventListRangeByUserIdError:
    event.fetchingEventListRangeByUserIdError,
  eventListRangeByUserId: event.eventListRangeByUserId,
  updateEventModal: event.updateEventModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEventListRangeByUserId,
      deleteEvent,
      handleUpdateEventModal,
      setEditEvents,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <div class=" flex flex-col items-center justify-center"
      >
        <p>{description || "We couldn't find relevant data"}</p>
      </div>
    </div>
  );
}

