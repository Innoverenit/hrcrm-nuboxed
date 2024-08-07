import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDeletedShipper,
  handleShipperActivityTableModal,
} from "./ShipperAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { Link } from "../../../Components/Common";
import { BundleLoader } from "../../../Components/Placeholder";
import ReInstateShipper from "./ReInstateShipper";

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
<div className=' flex  sticky z-auto'>
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[8.1rem]">   {props.translatedMenuItems[0]}</div>
        <div className=" md:w-[5.1rem]">{props.translatedMenuItems[1]} #</div>
        <div className=" md:w-[6.8rem] ">      {props.translatedMenuItems[2]}</div>
        <div className="md:w-[5.9rem]">   {props.translatedMenuItems[3]}</div>
        <div className="md:w-[7.8rem]">   {props.translatedMenuItems[4]}</div>
        <div className="md:w-[7.9rem]">     {props.translatedMenuItems[5]}</div>
        <div className="md:w-[9.2rem]">    {props.translatedMenuItems[6]}</div>
        <div className="w-[3.8rem]">{props.translatedMenuItems[7]}</div>
        </div>
        <InfiniteScroll
            dataLength={deletedShipper.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingDeletedShipper ? <div className="flex justify-center" >{props.translatedMenuItems[8]}...</div> : null}
            height={"80vh"}
          >
            {deletedShipper.length ? <>
              {deletedShipper.map((item) => {
                return (
               
                     <>
     <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1"               >
 <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">



<div class=" font-normal text-xs  font-poppins">
<Link
          toUrl={`shipper/${item.shipperId}`}
          title={`${item.shipperName}`}
        >{item.shipperName}</Link>
</div>

</div>
<div className=" flexl md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-xs  font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
<div className=" flex   md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-xs  font-poppins">
{item.emailId} 
</div>

</div>

<div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-xs  font-poppins">
{item.shipByName} 
</div>

</div>
<div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-xs  font-poppins">
{`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
</div>
</div>
<div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-xs  font-poppins">
{(item.address &&
                              item.address.length &&
                              item.address[0].city) ||
                              ""}
</div>
</div>
<div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-xs  font-poppins">
{(item.address &&
                              item.address.length &&
                              item.address[0].postalCode) ||
                              ""}
</div>
</div>

<div className=" flex  w-[7.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateShipper shipperId={item.shipperId} />
                            </div>
                          </div>
 </div>
              </div>
    </>       
                )
              })}
            </> : !deletedShipper.length
              && !props.fetchingDeletedShipper ? <NodataFoundPage /> : null}

          </InfiniteScroll>
  </div>
  </div>
    </>
  );
}
const mapStateToProps = ({ shipper, auth }) => ({
  fetchingDeletedShipper: shipper.fetchingShipper,
  fetchingDeletedShipperError: shipper.fetchingShipperError,
  deletedShipper: shipper.deletedShipper,
  userId: auth.userDetails.userId,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
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

