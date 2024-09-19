import React, { useEffect, useState, lazy,Suspense } from "react";
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
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateEventModal = lazy(() => import("../UpdateEventModal"));

function EventCardList (props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "71",  // "Type",//0
        "72" , // "Subject",//1
         "158", // "Start",//2
         "111", // "End",//3
        "75" , // "Include",//4
          "76",// "Assigned",//5
         "77", //  "Owner",//6
           "170",   //  Edit
           "84" ,  //  Delete
         "1259" //  Do you want to delete?

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);



  
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

    if (loading) {
      return <div><BundleLoader/></div>;
    }
  
    return (
      <>
      <div className=' flex  sticky  z-auto'>
      <div class="rounded  justify-between m-1  max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
   
         <div className=" flex  w-[100%]  max-sm:hidden p-1 bg-transparent font-bold sticky  z-10">
          <div className=" flex justify-between text-xs font-poppins w-[93%]">
        <div className=" w-[9.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.2rem]">
        {translatedMenuItems[0]} {/* <FormattedMessage
                  id="app.type"
                  defaultMessage="type"
                /> */}
                </div>
        <div className=" w-[13.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.23rem]">
        {translatedMenuItems[1]} {/* <FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /> */}
                </div>
        <div className=" w-[9.25rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.25rem] ">
        {translatedMenuItems[2]} {/* <FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /> */}
                </div>
        <div className=" w-[13.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.13rem] max-lg:w-[11.13rem] ">
        {translatedMenuItems[3]} {/* <FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /> */}
                </div>
     
        <div className="w-[6.32rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.32rem] max-lg:w-[4.32rem]">
        {translatedMenuItems[4]} {/* <FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /> */}
                </div>
     
        <div className="w-[8.15rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.15rem]">
        {translatedMenuItems[5]} {/* <FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /> */}
                </div>
        <div className="w-24 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[22.01rem] max-lg:w-[23.01rem]">
       {/* <FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /> */}
                </div>
                   {/* <div className="md:w-[5%]"><FormattedMessage
                  id="app.rating"
                  defaultMessage="rating"
                /></div>
        <div className="w-12"><FormattedMessage
                  id="app.action"
                  defaultMessage="action"
                /></div> */}
                </div>
      </div>
      <InfiniteScroll
        dataLength={eventListRangeByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingEventListRangeByUserId?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        style={{scrollbarWidth:"thin"}}
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
                            <div className="flex rounded   mt-1 bg-white h-8 items-center p-1 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:h-24"
                                style={{
                                    // borderBottom: "3px dotted #515050"
                                }}>
                                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[10.98rem] max-xl:w-[6.98rem] max-lg:w-[5.28rem] max-sm:w-auto ">
                                    <div className="flex max-sm:w-full"> 
                                        <div class="max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs   font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">                                       
                                            {item.eventType}
       
                                            </div>
                                               </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex  w-[15.26rem] max-xl:w-[9.6rem] max-lg:w-[7.6rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class=" text-[0.875rem]  font-[0.875rem] font-poppins max-sm:hidden"> Subject </div> */}
                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">   
                                    {item.eventSubject}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[11.9rem] max-xl:w-[7.6rem] max-lg:w-[5.6rem] max-sm:flex-row  max-sm:w-auto">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Start</div> */}
                                    <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    {` ${dayjs(item.startDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                <div className=" flex w-[5.32rem] max-xl:w-[5.32rem] max-lg:w-[3.32rem] max-sm:flex-row  max-sm:w-auto">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">End</div> */}
                                    <div class="text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    {` ${dayjs(item.endDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[9.32rem] max-xl:w-[4.32rem] max-lg:w-[3.23rem] max-sm:flex-row  max-sm:w-auto">
                                   
                                </div>
                                <div className=" flex  w-[3.31rem] max-xl:w-[3.31rem] max-lg:w-[2.31rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Include</div> */}

                                    <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
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
                                <div className="flex  w-[7.69rem] max-xl:w-[4.69rem] max-lg:w-[3.69rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class="text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
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
                                <div className="flex w-[6.12rem] max-xl:w-[2.12rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">Owner</div> */}

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
                               <div class="flex  w-wk justify-end max-sm:w-wk items-center max-sm:justify-evenly"> 
                    
                      <div class="flex max-sm:flex-row items-center justify-end max-sm:w-auto">
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
                    
                         <Tooltip title={
      <div>
        {item.eventDescription}
        <br />
        <FileCopyIcon
          className={`!text-icon cursor-pointer ${isCopied ? 'text-white' : ''}`}
          onClick={handleCopyClick}
        />
        {/* {isCopied && <span className="text-green-500 ml-2">Copied!</span>} */}
      </div>
    }>
      <EventNoteIcon className="!text-icon cursor-pointer" />
    </Tooltip>
                                                                          
          <Tooltip title={translatedMenuItems[7]}>
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
              title={translatedMenuItems[9]}
              onConfirm={() => deleteEvent(item.eventId, employeeId)}
            >
               <Tooltip title={translatedMenuItems[8]}>
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
      <Suspense fallback={<BundleLoader />}>
        <UpdateEventModal
          updateEventModal={updateEventModal}
          handleUpdateEventModal={handleUpdateEventModal}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
        />
         </Suspense>
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

