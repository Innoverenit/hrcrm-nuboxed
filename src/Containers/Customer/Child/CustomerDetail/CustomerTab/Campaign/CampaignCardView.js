import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip,Input,Button,Avatar,Select } from "antd";
import { StyledPopconfirm } from "../../../../../../Components/UI/Antd";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {
  deleteEvent,
  setEditEvents,
} from "../../../../../Event/EventAction";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { getCurrency } from "../../../../../Auth/AuthAction";
import { MultiAvatar2 } from "../../../../../../Components/UI/Elements";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {geCustomerCampaignEvent,addCustomerCampaignEvent} from "../../../../CustomerAction";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import EmptyPage from "../../../../../Main/EmptyPage";
import DateRangeIcon from '@mui/icons-material/DateRange';


const { Option } = Select;

function CampaignCardView (props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [data, setData] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
 
       "71", //  //0Type
       "72", //   Subject,//1
       "176", //   startDate,//2
          "126",  //EndDate 3
       "277", //   "Company",//4   
        "316",  // "Notes",5
         "1078", // "Save"6
         "84", // "Delete"7
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
         props.geCustomerCampaignEvent(props.customer.customerId,page);
        setPage(page + 1);
        props.getCurrency();
}, []);

  useEffect(() => {
    setData(props.customerCampaign.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.customerCampaign]);

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };
  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, currency_id: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (key) => {
    console.log(key)
    const targetRow = data.find((row) => row.key === key);
    if (targetRow) {
      const {eventId,  budgetValue,currency_id} = targetRow;
     
      const result = {
        eventId:eventId,
        budgetValue:budgetValue,
        currencyId: currency_id,
        customerId:props.customer.customerId,
  };
      props.addCustomerCampaignEvent(result)
    }
  };

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
         props.getEventListRangeByUserId(props.customer.customerId,page);
        setPage(page + 1);}


    const {
      fetchingCustomerCampaign,
      fetchingCustomerCampaignError,
      deleteEvent,
      setEditNoteEvent,
      updateEventModal,

      userDetails: { employeeId },
    } = props;

if(fetchingCustomerCampaign){
  return <BundleLoader/>
}

    if (isMobile){
      return (
        <>
        <div className=' flex justify-end sticky z-auto'>
        <div class="rounded   w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     
          
        <InfiniteScroll
          dataLength={props.customerCampaign.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingCustomerCampaign?<div class="flex items-center">Loading...</div>:null}
          height={"75vh"}
        >
        {props.customerCampaign.map((item) => { 
              const handleCopyClick = () => {
                const textToCopy = item.eventDescription;
                navigator.clipboard.writeText(textToCopy)
                  .then(() => setIsCopied(true))
                  .catch((err) => console.error('Unable to copy text', err));
                 
              };
                      return (
                          <div>
                             <div className="flex rounded justify-between  bg-white mt-1  items-center max-sm:h-[9rem] max-sm:flex-col  ">
                                      <div class="flex items-center  justify-between">
      
                                          <Tooltip>
                                        <div class="text-xs font-poppins cursor-pointer">                                       
                                              {item.eventType}
         
                                              </div>
                                                
                                          </Tooltip>
                     
                                      <div class=" text-[0.82rem]  font-poppins">   
                                      {item.eventSubject}
                                      </div>
                                  
                                  </div>
                                  <div class="flex  items-center justify-between">
                                  
                                    
                                      <div class="text-[0.82rem]  font-poppins">
                                      {` ${dayjs(item.startDate).format('YYYY-MM-DD')}`}
                                      </div>
                                 
                                 
                                      
                                      <div class="text-[0.82rem]  font-poppins">
                                      {` ${dayjs(item.endDate).format('YYYY-MM-DD')}`}
                                      </div>
                                                                                                                                                                                                        
                                      <div class=" text-[0.82rem]  font-poppins">
                                      <Avatar.Group
                     maxCount={7}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                  {item.included &&
                    item.included.map((candidate, i) => {
                       const data1 = candidate.empName
                       .slice(0,2)
                      //  .split("")[0]
                       .toUpperCase();
                     console.log("datas", data1);
                      return (
                        <Tooltip title={candidate.empName} key={i}>
                        <Avatar className="bg-[#f56a00]">
                        {data1}
                      
                      </Avatar>
                      </Tooltip>
                       
  
                     
                      );
                    })}
              </Avatar.Group>
                                      </div>
                                 
                                  
                                     
  
                                      <div class="text-[0.82rem]  font-poppins">
                                      
              
                <span>
                {item.assignedToName === null ? (
                  "None"
                ) : (
                  <>
                  {item.assignedToName === item.woner ? (
                    
                    null
                  ) : (
                  <MultiAvatar2
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
                                  <div class="flex  justify-between items-center">
                                  <MultiAvatar2
                primaryTitle={item.woner}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
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
     <EventNoteIcon className="text-icon cursor-pointer" />
   </Tooltip>
                   </div>
                                
        
              <div>
             
             <StyledPopconfirm
               // title="Do you want to delete?"
               title="Do you want to delete"
               onConfirm={() => deleteEvent(item.eventId, employeeId)}
             >
                <Tooltip title={translatedMenuItems[16]}>
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
               </Tooltip>
             </StyledPopconfirm>
       
             </div>
       
                        </div>
                              </div>
                          </div>
  
  
                      )
                  })}
                     </InfiniteScroll>
        </div>
        </div>
       
          {/* <UpdateEventModal
            updateEventModal={updateEventModal}
            handleUpdateEventModal={handleUpdateEventModal}
          /> */}
        </>
      ); 
    }

    return (
      <>
      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
   
         <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end  z-10">
        <div className="w-[10.8rem] text-[#00A2E8] truncate text-sm max-md:w-[10.8rem]">
        <LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]} </div>
        {/* Type */}
        <div className="w-[7.23rem] truncate max-md:w-[7.23rem]">{translatedMenuItems[1]} </div>
        {/* Subject */}
        <div className="w-[6.25rem] truncate max-md:w-[6.25rem] "><DateRangeIcon className="!text-icon "/>{translatedMenuItems[2]} </div>
        {/* Start */}
        <div className="w-[5.43rem] truncate max-md:w-[5.43rem] ">
      <DateRangeIcon className="!text-icon "/>{translatedMenuItems[3]} </div>
        {/* End */}
     
        {/* <div className="font-bold font-poppins text-xs md:w-[5.32rem]">{translatedMenuItems[4]} </div> */}
     {/* dial code */}
        {/* <div className="font-bold font-poppins text-xs md:w-[6.15rem]">
          {translatedMenuItems[5]} </div> */}
        {/* phone no */}
        <div className="w-[24rem] truncate max-md:w-[24rem]">
        <ApartmentIcon className="!text-icon mr-1 "/>{translatedMenuItems[4]} </div>
                {/* company    */}
      </div>
      <InfiniteScroll
        dataLength={props.customerCampaign.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomerCampaign?<div class="flex items-center">Loading...</div>:null}
        height={"79vh"}
      >
      { ! props.fetchingCustomerCampaign && props.customerCampaign.length === 0 ?<EmptyPage/> :  props.customerCampaign.map((item,index) => { 
                    return (
                        <div key={item.eventId}>
                             <div
                className="flex rounded justify-between  bg-white mt-1 py-ygap  items-center  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                     <div class="flex ">
                                <div className=" flex border-l-2 border-green-500 bg-[#eef2f9]  w-[9.98rem] max-md:[9.98rem] max-sm:w-full ">
<div className="flex items-center max-sm:w-full"> 
          <div class="max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex  max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="flex items-center text-[0.82rem] ml-gap font-poppins text-xs cursor-pointer">                                       
                                            {item.eventType}
       
                                            </div>
                                               </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex w-[10.26rem]   max-md:w-[10.26rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  w-full ">
                                    {/* <div class=" text-[0.875rem]  font-[0.875rem] font-poppins max-sm:hidden"> Subject </div> */}
                                    <div class=" text-[0.82rem] ml-gap flex  font-poppins">   
                                    {item.eventSubject}
                                    </div>
                                </div>
                                </div>
                                <div class="flex  items-center ">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.9rem]  max-md:w-[5.9rem] max-sm:flex-row  ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Start</div> */}
                                    <div class="text-[0.82rem]  font-poppins">
                                    {` ${dayjs(item.startDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.32rem] max-md:w-[5.32rem] max-sm:flex-row ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">End</div> */}
                                    <div class="text-[0.82rem]  font-poppins">
                                    {` ${dayjs(item.endDate).format('YYYY-MM-DD')}`}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.31rem] max-md:w-[5.31rem] max-sm:flex-row  ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Include</div> */}

                                    <div class=" text-[0.82rem]  font-poppins">
                                    <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                {item.included &&
                  item.included.map((candidate, i) => {
                     const data1 = candidate.empName
                     .slice(0,2)
                    //  .split("")[0]
                     .toUpperCase();
                   console.log("datas", data1);
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
                                <div className="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.69rem]  max-md:w-[4.69rem] max-sm:flex-row  w-full ">                   
              <div>
              <span>
              {item.assignedTo === null ? (
                "None"
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
                                <div className="flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[3.12rem]   max-md:w-[4.12rem] max-sm:flex-row  ">
                   <div class="max-sm:flex justify-end">

            <div>
              <MultiAvatar2
              primaryTitle={item.woner}
              imageId={item.ownerImageId}
              imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </div>
        
          </div>
                   </div>
                                </div>

                                <div class="flex ">
                               
                             
                   <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.32rem] max-md:w-[5.32rem] max-sm:flex-row  w-full">
                                    
                                    <div class="text-[0.82rem]  font-poppins">
                                    {/* {item.budgetValue} */}
                                    <Input className="w-[5rem]"
  value={item.budgetValue}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'budgetValue')}
/>
                    </div>
  </div>
  <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.321rem]  max-md:w-[5.321rem] max-sm:flex-row  w-full">
                                    
                                    <div class="text-[0.82rem]  font-poppins">
                                    
                                    <Select className="w-[5rem]"
                   
                        value={item.currencyName}
                        onChange={(value) => handleSelectChange(value, item.key, 'currencyName')}
                      >
                        {props.currencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    </div>
  </div>
  <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.2rem] max-md:w-[4.2rem] max-sm:flex-row w-full max-sm:justify-between ">
  <Button type="primary" onClick={() => handleSave(item.key)}>
  {translatedMenuItems[7]}   {/* Save */}
        </Button>
                                    </div>
                                </div>     
                      </div>
                            </div>
                       


                    )
                })}
                   </InfiniteScroll>
      </div>
      </div>
     
        {/* <UpdateEventModal
          updateEventModal={updateEventModal}
          handleUpdateEventModal={handleUpdateEventModal}
        /> */}
      </>
    );
  }

const mapStateToProps = ({ auth,customer}) => ({
  userDetails: auth.userDetails,
  fetchingCustomerCampaign: customer.fetchingCustomerCampaign,
  fetchingCustomerCampaignError:
  customer.fetchingCustomerCampaignError,
  customerCampaign: customer.customerCampaign,
  currencies: auth.currencies,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      geCustomerCampaignEvent,
      deleteEvent,
      addCustomerCampaignEvent,
      setEditEvents,
      getCurrency
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCardView);
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

