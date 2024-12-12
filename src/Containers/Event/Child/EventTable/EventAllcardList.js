import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfiniteScroll from "react-infinite-scroll-component";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip,  Avatar,Button,message,Select } from "antd";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  deleteEvent, 
  getEventAllListRangeByUserId,
  handleUpdateEventModal,
  setEditEvents,
  addeventLocation,
} from "../../EventAction";
import {getEvents} from "../../../Settings/Event/EventAction";
import EventNoteIcon from '@mui/icons-material/EventNote';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar,  } from "../../../../Components/UI/Elements";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { BundleLoader } from "../../../../Components/Placeholder";
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import InfoIcon from '@mui/icons-material/Info';
import DateRangeIcon from '@mui/icons-material/DateRange';
const { Option } = Select;
dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); 
    }
};
function EventAllcardList (props) {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isCopied, setIsCopied] = useState(false);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedLocation, setSelectedLocation] = useState();
    let hoverTimer = null;


    useEffect(() => {
      
           props.getEventAllListRangeByUserId(props.orgId,page);
          setPage(page + 1);
          props.getEvents(); 
    }, []);
   
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

    const toggleSelect = () => {
      setIsOpen(!isOpen);
    };
  
    const handleHover = () => {
      clearTimeout(hoverTimer); // Clear any previous hover timers
      setHovering(true); // Set the hovering state to true
      setIsOpen(true); // Open the Select immediately on hover
    };
  
    const handleLeave = () => {
      // Set a delay before closing the Select dropdown after hover ends
      hoverTimer = setTimeout(() => {
        setHovering(false);
        setIsOpen(false); // Close the Select after a short delay
      }, 20000); // You can adjust the delay time as needed (200ms is an example)
    };
    // Function to filter options based on the search input
    const handleSearch = (value) => {
      setSearchValue(value);
    };
  
    // Function to filter option list based on the search value
    const filterLocationOptions = (input, option) => {
      return option.children.toLowerCase().includes(input.toLowerCase());
    };
    const handleLocationChange = (locationDetailsId) => {
      setSelectedLocation(locationDetailsId); 
  
    };
    const handleLoadMore = () => {
    
     
           props.getEventAllListRangeByUserId(props.orgId,page);
          setPage(page + 1);
  }
  const getLocation = (item) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          let data={
            complitionInd:item.complitionInd===false?true:false,
            latitude:latitude,
            longitude:longitude, 
          }
          props.addeventLocation(data,item.eventId)
          message.success('Location fetched successfully!');
        },
        (error) => {
          console.error('Error fetching location:', error);
          message.error('Error fetching location. Please try again.');
        }
      );
    } else {
      message.error('Geolocation is not supported by your browser.');
    }
  };
  
    return(
        <>
        <div className=' flex  sticky  z-auto'>
        <div class="rounded  justify-between m-1  max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
         <div className=" flex  w-[93%]  max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky  max-xl:text-[0.65rem] max-lg:text-[0.45rem]   z-10">
          <div className=" flex justify-between text-xs font-poppins w-[93%]">
        <div className="flex truncate w-[15.3rem]  max-xl:w-[9.2rem]">
        {/* Type */}     < MergeTypeIcon className='!text-icon text-[#c42847] '/>
       
       {translatedMenuItems[0]}
       <div className="flex">
          <div>
        <FilterAltIcon className="!text-sm text-[tomato]" onClick={toggleSelect} // Open/close Select on click
         onMouseEnter={handleHover} // Open Select on hover
         onMouseLeave={handleLeave} // Optionally close on hover leave
         />
         </div>
         <div>
         {isOpen && (
          <Select
          style={{ width: "8rem",borderColor:"gray" }}
           onChange={handleLocationChange}
          placeholder="Select EventType"
          showSearch
          onSearch={handleSearch} // This is to handle search input
          filterOption={filterLocationOptions} // This is to apply custom filtering
          value={searchValue}
        >
          {props.events.map((shipper) => (
            <Option key={shipper.eventTypeId} value={shipper.eventTypeId}>
              {shipper.eventType}
            </Option>
          ))}
        </Select>
         )}
         </div>
         </div>
                </div>
        <div className="flex truncate w-[14.23rem]  max-xl:w-[13.23rem]">
      {/* Subject */}  <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' />{translatedMenuItems[1]}
                </div>
        <div className="flex truncate w-[10.25rem]  max-xl:w-[9.25rem] ">
      {/* Start */}  <DateRangeIcon className="!text-icon mr-1"/> {translatedMenuItems[2]}
                </div>
        <div className="flex  w-[10.13rem]  max-xl:w-[12.13rem] max-lg:w-[11.13rem] ">
       {/* End */} <DateRangeIcon className="!text-icon mr-1"/>  {translatedMenuItems[3]}
                </div>
                <div className="flex truncate  w-[8.33rem] "></div>
        <div className="flex truncate w-[11.32rem]  max-xl:w-[3.32rem] max-lg:w-[4.32rem]">
       {/* Include */}   <GroupsIcon className='!text-base mr-1 text-[#e4eb2f]'/> {translatedMenuItems[4]}
                </div>
     
        <div className=" flex truncate w-[6.15rem]  max-xl:w-[6.15rem]">
       {/* Assigned */}         <AccountCircleIcon className="!text-icon  mr-1 text-[#d64933]"/>{translatedMenuItems[5]}
                </div>
        <div className=" flex truncate w-[15rem]  max-xl:w-[22.01rem] max-lg:w-[23.01rem]">
  {/* Owner */}        <AccountCircleIcon className="!text-icon  mr-1 text-[#d64933]"/> {translatedMenuItems[6]}
                </div>
                
                </div>
      </div>

  

      <InfiniteScroll
        dataLength={props.eventallListRangeByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingEventAllListRangeByUserId?<div class="flex justify-center">Loading...</div>:null}
        height={"88vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {props.eventallListRangeByUserId.map((item) => { 
            const handleCopyClick = () => {
              const textToCopy = item.eventDescription;
              navigator.clipboard.writeText(textToCopy)
                .then(() => setIsCopied(true))
                .catch((err) => console.error('Unable to copy text', err));
               
            };
                    return (
                        <div>
                            <div className="flex rounded   mt-1 bg-white  items-center py-ygap max-sm:flex-col  max-xl:text-[0.65rem] max-lg:text-[0.45rem]  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:h-24"
                                style={{
                                    // borderBottom: "3px dotted #515050"
                                }}>
                                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[10.98rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[6.98rem] max-lg:w-[5.28rem] max-sm:w-auto ">
                                    <div className="flex max-sm:w-full"> 
                                        <div class="max-sm:w-full flex items-center">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs items-center ml-gap font-poppins cursor-pointer  max-sm:text-xs ">                                       
                                            {item.eventType}  
                                            </div>
                                               </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex  w-[11.26rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[9.6rem] max-lg:w-[7.6rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class=" text-[0.875rem]  font-[0.875rem] font-poppins max-sm:hidden"> Subject </div> */}
                                    <div class=" text-xs ml-gap font-poppins  max-sm:text-xs ">   
                                    {item.eventSubject}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[7.9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.6rem] max-lg:w-[5.6rem] max-sm:flex-row  max-sm:w-auto">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Start</div> */}
                                    <div class="text-xs  font-poppins  max-sm:text-xs ">
                                    {` ${dayjs(item.startDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                <div className=" flex w-[7.32rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.32rem] max-lg:w-[3.32rem] max-sm:flex-row  max-sm:w-auto">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">End</div> */}
                                    <div class="text-xs   font-poppins  max-sm:text-xs ">
                                    {` ${dayjs(item.endDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[7.32rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.32rem] max-lg:w-[3.23rem] max-sm:flex-row  max-sm:w-auto">
                                   
                                </div>
                                <div className=" flex  w-[9.31rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3.31rem] max-lg:w-[2.31rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Include</div> */}

                                    <div class=" text-xs   font-poppins  max-sm:text-xs ">
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
                                <div className="flex  w-[5.69rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.69rem] max-lg:w-[3.69rem] max-sm:flex-row  max-sm:w-auto ">
                                    {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class="text-xs   font-poppins  max-sm:text-xs ">
                                    {/* <Tooltip title={item.assignedToName}> */}
              <div>
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
              </div>
                                    </div>
                                </div>

                                <div className="flex w-[6.12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[2.12rem]  max-sm:flex-row  max-sm:w-auto ">                                
               <div class="max-sm:flex justify-end">
                {item.complitionInd===false&&(
   <Button type="primary"
   onClick={() => getLocation(item)}
   >
        Complete</Button>
                )}
                              {item.complitionInd===true&&(
   <CheckCircleIcon 
   onClick={() => getLocation(item)}
   style={{color:"green"}}
   />     
                )}       
          </div>
               </div>
                         </div>
                               <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                               <div class="flex  w-wk justify-end max-sm:w-wk items-center h-8 ml-gap bg-[#eef2f9] max-sm:justify-evenly">               
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
                     
{Math.round(item.compDistance)}km
          
                        </div>        
                         <Tooltip title={
      <div>
        {item.eventDescription}
        <br />
        <FileCopyIcon
          className={`!text-icon cursor-pointer ${isCopied ? 'text-white' : ''}`}
          onClick={handleCopyClick}
        />
      </div>
    }>
      <EventNoteIcon className="!text-icon cursor-pointer" />
    </Tooltip>                                                                                  
            <div>          
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={translatedMenuItems[9]}
              onConfirm={() => deleteEvent(item.eventId, props.userId)}
            >
               <Tooltip title={translatedMenuItems[8]}>
               <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer"  />
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
    
         </Suspense>
        </>
    );
}

const mapStateToProps = ({ auth, event,events, employee,opportunity}) => ({
  userDetails: auth.userDetails,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  fetchingEventAllListRangeByUserId: event.fetchingEventAllListRangeByUserId,
  fetchingEventListRangeByUserIdError:
    event.fetchingEventListRangeByUserIdError,
    eventallListRangeByUserId: event.eventallListRangeByUserId,
  events:events.events

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEventAllListRangeByUserId,
      deleteEvent,
      handleUpdateEventModal,
      setEditEvents,
      addeventLocation,
      getEvents

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventAllcardList);

