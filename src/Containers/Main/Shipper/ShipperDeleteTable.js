import React, { useEffect, useState, lazy,  Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDeletedShipper,
  handleShipperActivityTableModal,
} from "./ShipperAction";
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "../../../Components/Common";
import { BundleLoader } from "../../../Components/Placeholder";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const ReInstateShipper =lazy(()=>import("./ReInstateShipper"));
const ShipperSearchedData =lazy(()=>import("./ShipperSearchedData"));
const EmptyPage =lazy(()=>import("../EmptyPage"));

function ShipperDeleteTable(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getDeletedShipper(props.userId,page);
  }, []);
  const {
    handleUpdateShipperModal,
    updateShipperModal,
    deletedShipper,
  } = props;

  const handleLoadMore = () => {
    const PageMapd = deletedShipper && deletedShipper.length &&deletedShipper[0].pageCount
    setTimeout(() => {
      const {
        getDeletedShipper,
        userId
      } = props;
      if  (deletedShipper)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getDeletedShipper(userId, page);
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const [currentShipperId, setCurrentShipperId] = useState("");

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

    if (props.fetchingDeletedShipper) {
    return <BundleLoader />;
  }
  return (
    <>
    {props.shipperSerachedData.length > 0 ? (
    <ShipperSearchedData
    shipperSerachedData={props.shipperSerachedData}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
<div className=' flex  sticky z-auto'>
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
<div className=" flex justify-between w-[100%]  p-1 bg-transparent sticky items-end font-poppins font-bold !text-lm max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
        <div className="  text-[#00A2E8] text-sm  w-[12.1rem] max-md:w-[12.1rem]">
            <CategoryIcon className='!text-icon '/>   {props.translatedMenuItems[0]}</div>
        <div className=" w-[10.1rem] max-md:w-[10.1rem]">
        <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{props.translatedMenuItems[1]} </div>
        <div className=" w-[8.8rem] max-md:w-[8.8rem] ">   
        <MailOutlineIcon className="!text-icon  text-[#32486e]"/>  {props.translatedMenuItems[2]}</div>
        <div className=" w-[7.9rem] max-md:w-[7.9rem]"> 
        <LocalShippingIcon className='!text-base mr-1 text-[#7dcfb6]'/>{props.translatedMenuItems[3]}</div>
        <div className=" w-[7.8rem] max-md:w-[7.8rem]"> 
        <LocationOnIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[4]}</div>
        <div className=" w-[7.9rem] max-md:w-[7.9rem]">   
        <LocationOnIcon className='!text-base  text-[#676a19]'/> {props.translatedMenuItems[5]}</div>
        <div className=" w-[9.2rem] max-md:w-[9.2rem]"> 
             {props.translatedMenuItems[6]}</div>
        <div className="  w-[4.8rem] max-md:w-[4.8rem]">
          {props.translatedMenuItems[7]}</div>
        </div>
        <InfiniteScroll
            dataLength={deletedShipper.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingDeletedShipper ? <div className="flex justify-center" >{props.translatedMenuItems[8]}...</div> : null}
            height={"83vh"}
          >
            {deletedShipper.length ? <>
              {deletedShipper.map((item) => {
                return (
               
                     <>
     <div className="flex rounded justify-between mt-1 bg-white py-ygap items-center hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "               >
     <div class="flex max-sm:justify-between border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-wk items-center max-sm:items-center">
     <div className=" flex font-medium w-[9.9rem] max-xl:w-[7.6rem] items-center justify-start h-8   bg-[#eef2f9] max-lg:w-[6.1rem] max-sm:w-auto  ">



 <div class=" text-xs ml-gap text-blue-500  font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                  to={`/shipper/${item.shipperId}`} title={item.shipperName}>
                                  {item.shipperName}
                                </Link>
                              </div>
</div>
</div>
<div className=" flex w-44 max-md:w-44 items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
<div class="  text-xs ml-gap items-center  font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
<div className=" flex  w-44 max-md:w-44  items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
<div class="  text-xs  ml-gap items-center font-poppins">
{item.emailId} 
</div>

</div>

<div className=" flex  max-md:w-44   w-44  items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between max-sm:flex-row ">
<div class="  text-xs  ml-gap items-center font-poppins">
{item.shipByName} 
</div>

</div>
<div className=" flex  max-md:w-44 w-44  items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">

<div class=" text-xs  ml-gap items-center font-poppins">
{`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
</div>
</div>
<div className=" flex  max-md:w-44  w-44 items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">

<div class="  text-xs ml-gap items-center  font-poppins">
{(item.address &&
                              item.address.length &&
                              item.address[0].city) ||
                              ""}
</div>
</div>
<div className=" flex max-md:w-44 w-44 max-sm:justify-between  items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row ">

<div class="  text-xs  ml-gap items-center font-poppins">
{(item.address &&
                              item.address.length &&
                              item.address[0].postalCode) ||
                              ""}
</div>
</div>

<div className=" flex  w-[7.2rem] max-md:w-[7.2rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <Suspense><ReInstateShipper shipperId={item.shipperId} /></Suspense>
                            </div>
                          </div>

              </div>
    </>       
                )
              })}
            </> : !deletedShipper.length
              && !props.fetchingDeletedShipper ? <Suspense><EmptyPage/></Suspense> : null}

          </InfiniteScroll>
  </div>
  </div>
  )}
    </>
  );
}
const mapStateToProps = ({ shipper, auth }) => ({
  fetchingDeletedShipper: shipper.fetchingShipper,
  fetchingDeletedShipperError: shipper.fetchingShipperError,
  deletedShipper: shipper.deletedShipper,
  userId: auth.userDetails.userId,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  shipperSerachedData: shipper.shipperSerachedData
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedShipper,
      handleShipperActivityTableModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDeleteTable);

