import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    getQuotationEcomList,
} from "./OrderAction";
import "jspdf-autotable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { MultiAvatar } from "../../../Components/UI/Elements";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import UpdateIcon from '@mui/icons-material/Update';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { BundleLoader } from "../../../Components/Placeholder";

function QuotationCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getQuotationEcomList(props.userId, page,"procure");
    setPage(page + 1);
  }, []);
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const handleLoadMore = () => {
    const callPageMapd = props.ecomQuotation && props.ecomQuotation.length &&props.ecomQuotation[0].pageCount
    setTimeout(() => {
      const {
        getQuotationEcomList,
      } = props;
      if  (props.ecomQuotation)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getQuotationEcomList(props.userId, page,"procure" );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  dayjs.extend(relativeTime);

  return (
    <div>
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
        <div className=" flex justify-between w-[96%]  p-1 bg-transparent font-poppins !text-lm font-bold sticky  z-10">
    
                        <div className="w-[8.5rem] truncate max-md:w-[4.02rem] text-[#00A2E8] text-sm"><DynamicFeedIcon className='!text-base mr-1 '/>{props.translatedMenuItems[14]} ID</div>
                        <div className="w-[8.1rem] truncate max-md:w-[5.04rem]"><ContactsIcon className='!text-base mr-1 text-[#e4eb2f]'/>{props.translatedMenuItems[15]}</div>
                        <div className="w-[9.4rem] truncate max-md:w-[8.04rem] flex"> <ApartmentIcon className='!text-icon  text-[#606C38]'/>{props.translatedMenuItems[18]}</div>
                        {/* Customer */}
                        <div className="w-[15.4rem] truncate max-md:w-[12.14rem]"> <LocationOnIcon className='!text-icon  text-[#2B2D42]'/>{props.translatedMenuItems[62]}</div>
                        {/* Shipping */}
                        <div className="w-[15.5rem] truncate max-md:w-[8.13rem]">        <TextSnippetIcon className='!text-icon  text-[#457B9D]'/>{props.translatedMenuItems[63]}</div>
                        {/* Billing */}
                        <div className="w-[9.04rem] truncate max-md:w-[5.12rem]"> <AddShoppingCartIcon className='!text-icon  text-[#B23A48]'/>{props.translatedMenuItems[64]}</div>
                        {/* item */}                    
                        <div className="w-[9.7rem] truncate max-md:w-[4.3rem]">  <UpdateIcon className='!text-icon text-[#ff66b3]' /> {props.translatedMenuItems[65]}</div>              
                        <div className="w-[4.3rem] truncate max-md:w-[5.4rem]"> 
                        < MergeTypeIcon className='!text-icon text-[#c42847] '  />   {props.translatedMenuItems[68]}
                          
                          </div>              
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.ecomQuotation.length}
          next={handleLoadMore}
          loader={props.fetchingecomQuotation?<div><BundleLoader/></div>:null}
          height={"83vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">{props.translatedMenuItems[31]}.</div>}
        >
          {props.ecomQuotation.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 h-8 items-center   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between w-[8.04rem] max-sm:w-wk items-center border-l-2 border-green-500 bg-[#eef2f9]">
                        <div className=" flex   md:w-[6.4rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.newOrderNo}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold" >
                                 {props.translatedMenuItems[25]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex  items-center md:w-[7.9rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                          
                            <div class=" text-xs  items-center font-poppins ">
                            <MultiAvatar
                  primaryTitle={item.contactPersonName}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                            </div>
                    
                        </div>

                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9]  md:w-[9.12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                                {item.distributorName}
                            </div>

                        </div>
                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9]  md:w-[15.3rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                               
                            </div>
                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[15.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                             
                            </div>
                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[9.1rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs cursor-pointer text-blue-500 font-poppins"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleItemViewDrawer(true);                               
                            }}>
                                {item.itemCount}
                            </div>
                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[9.8rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.status}
                            </div>
                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[6.6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.orderSource}
                            </div>

                        </div>
                </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
     
    </>

  </div>
  );



}

const mapStateToProps = ({ order,procre,inventory,auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  ecomQuotation:order.ecomQuotation
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
        getQuotationEcomList

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotationCardList);
