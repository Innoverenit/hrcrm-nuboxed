import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip, Popconfirm,Switch } from "antd";
import {
  getAllShipperList,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
  handleShipperAddress
} from "./ShipperAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import ShipperSearchedData from "./ShipperSearchedData";
import AddShipperAdressModal from "./AddShipperAdressModal";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApiIcon from '@mui/icons-material/Api';

function AllShipperList(props) {
  const { handleUpdateShipperModal, updateShipperModal } = props;
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(page + 1);
    props.getAllShipperList(props.orgId,page);
  }, []);

  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = props.allShipper && props.allShipper.length &&props.allShipper[0].pageCount
    setTimeout(() => {
      const {
        getAllShipperList,
        orgId
      } = props;
      if  (props.allShipper)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getAllShipperList(orgId, page);
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  return (
    <>
     {props.shipperSerachedData.length > 0 ? (
    <ShipperSearchedData
    shipperSerachedData={props.shipperSerachedData}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
      <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky items-end  z-10">
            <div className="font-poppins font-bold text-[#00A2E8] text-base w-[10.5rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">  
               <CategoryIcon className='!text-icon '/> {props.translatedMenuItems[0]}</div>
            <div className="font-poppins font-bold text-xs w-[6.01rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>   {props.translatedMenuItems[1]}</div>
            <div className="font-poppins font-bold text-xs w-[9.8rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />{props.translatedMenuItems[2]}</div>
            <div className="font-poppins font-bold text-xs w-[6.1rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <LocalShippingIcon className='!text-base  text-[#7dcfb6]'/> {props.translatedMenuItems[3]}</div>
            <div className="font-poppins font-bold text-xs w-[18.7rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
            <LocationOnIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[4]}</div>
            <div className="font-poppins font-bold text-xs w-[12.4rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <LocationOnIcon className='!text-base  text-[#e4eb2f]'/>{props.translatedMenuItems[5]}</div>
            <div className="font-poppins font-bold text-xs w-[5.9rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {props.translatedMenuItems[6]}</div>
            <div className="font-poppins font-bold text-xs w-[13.24rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                <ApiIcon className='!text-base  text-[#e4eb2f]'/>  API</div>
          </div>
          <InfiniteScroll
        dataLength={props.allShipper.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingAllShipper ? <div class="flex justify-center">{props.translatedMenuItems[8]}...</div> : null}
        height={"83vh"}
      >
        {!props.fetchingAllShipper && props.allShipper.length === 0 ? <NodataFoundPage /> : props.allShipper.map((item, index) => {
            return (
              <>
                <div  >
                      <div className="flex rounded  mt-1 bg-white py-ygap items-center max-sm:rounded-lg
               max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                      <div class="flex items-center border-l-2 border-green-500 bg-[#eef2f9] max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                        <div className=" flex  w-[9.9rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[7.6rem] max-lg:w-[6.1rem] max-sm:w-auto  ">

                 
                          <div class=" text-xs text-blue-500  items-center font-poppins font-semibold  cursor-pointer">

<Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
  to={`shipper/${item.shipperId}`} title={item.shipperName}>
  {item.shipperName}
</Link>
</div>

                   
                        </div>
                  
                        </div>
                        <div className=" flex w-[7rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between   md:w-[6rem] max-sm:flex-row ">
<div class="  text-xs ml-gap items-center  font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                        <div className=" flex  w-[10.3rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-xs  ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.emailId}
                          </div>

                        </div>

                        <div className=" flex   w-[6.12rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-xs  ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.shipByName}
                          </div>

                        </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                        <div className=" flex   w-[18.31rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-xs  ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                          </div>

                        </div>
                        <div className=" flex   w-[12.21rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                          <div class=" font-normal text-xs ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {(item.address &&
                              item.address.length &&
                              item.address[0].city) ||
                              ""}
                          </div>

                        </div>
                        <div className=" flex   w-[5.2rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

<div class=" font-normal text-xs ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
  {(item.address &&
    item.address.length &&
    item.address[0].postalCode) ||
    ""}
</div>

</div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                       <div class="flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[10.5rem]">                   
                          <Switch
                            className="toggle-clr"
                            //checked={item.productionInd}
                            isLoading={true}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                        <div className="flex justify-end items-center max-sm:w-wk ">
                          <div class="items-center  justify-center h-8  bg-[#eef2f9] flex">
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleShipperAddress(true);
            handleRowData(item);
          }}
          
        />    
        </div>
        <div class="items-center justify-center h-8   bg-[#eef2f9] flex">
                            <Tooltip title={props.translatedMenuItems[9]}>
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"

                                onClick={() => {
                                  props.setEditShipper(item);
                                  handleRowData(item);
                                  handleUpdateShipperModal(true);
                                  handleSetCurrentShipperId(item.shipperId);
                                }}
                              />
                            </Tooltip>
                          </div>
                          </div>
                          <div>

                            <Popconfirm
                              title={`${props.translatedMenuItems[10]}?`}
                              onConfirm={() => props.deleteShipperData(item.shipperId)}
                            >
                               <div class="items-center justify-center h-8 bg-[#eef2f9] flex">
                              <DeleteOutlineIcon
                                className=" !text-icon cursor-pointer text-[red]"

                              />
                              </div>
                            </Popconfirm>
                          </div>
                        </div>
</div>


                      </div>
                    
              </>
            )
          })}
</InfiniteScroll>
        </div>
      </div>
        )}
      <UpdateShipperModal
        rowdata={rowdata}
        shipperId={currentShipperId}
        updateShipperModal={updateShipperModal}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        handleUpdateShipperModal={handleUpdateShipperModal}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        translatedMenuItems={props.translatedMenuItems}
      />
      {/* <AddShipperActivityModal
        addShipperActivityTableModal={props.addShipperActivityTableModal}
        handleShipperActivityTableModal={props.handleShipperActivityTableModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      /> */}
        <AddShipperAdressModal 
        item={rowdata}
         type="shipper"
         addShipperAddressModal={props.addShipperAddressModal}
         handleShipperAddress={props.handleShipperAddress}
      />
    </>
  )
}
const mapStateToProps = ({ shipper, auth }) => ({
  allShipper: shipper.allShipper,
  userId: auth.userDetails.userId,
  fetchingAllShipper: shipper.fetchingAllShipper,
  fetchingAllShipperError: shipper.fetchingAllShipperError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  orgId:auth.userDetails.organizationId,
  shipperSerachedData: shipper.shipperSerachedData,
  addShipperAddressModal: shipper.addShipperAddressModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateShipperModal,
      handleShipperActivityTableModal,
      handleShipperOrderModal,
      deleteShipperData,
      getAllShipperList,
      setEditShipper,
      handleShipperAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllShipperList);