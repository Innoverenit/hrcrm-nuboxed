import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip, Popconfirm, Switch } from "antd";
import {
  getShipperByUserId,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
} from "./ShipperAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import AddShipperOrderModal from "./AddShipperOrderModal";
import CategoryIcon from '@mui/icons-material/Category'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApiIcon from '@mui/icons-material/Api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
function ShipperSearchedData(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal, updateShipperModal } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});


  useEffect(() => {
    setPage(page + 1);
    props.getShipperByUserId(props.userId, page);
  }, []);

  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

  const handleLoadMore = () => {
    const PageMapd = props.shipperByUserId && props.shipperByUserId.length && props.shipperByUserId[0].pageCount
    setTimeout(() => {
      const {
        getShipperByUserId,
        userId
      } = props;
      if (props.shipperByUserId) {
        if (page < PageMapd) {
          setPage(page + 1);
          getShipperByUserId(userId, page);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };

  return (
    <>
   
      <div className=' flex  sticky  z-auto'>
        <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent  sticky items-end font-poppins font-bold !text-lm max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
            <div className=" text-[#00A2E8] truncate text-sm w-[9.8rem]  ">
             {/* Name */}
             <CategoryIcon
              className='!text-icon'
              /> {props.translatedMenuItems[0]}
              </div>
            <div className="  w-[5.2rem] max-md:w-[5.2rem] truncate  ">
             {/* Phone */}
             <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>  {props.translatedMenuItems[1]} 
              </div>
            <div className=" w-[9.5rem]  max-md:w-[10.8rem] truncate  ">
             {/* Email */}
             <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c]'  />{props.translatedMenuItems[2]}
              </div>
            <div className=" w-[6.1rem] max-md:w-[6.1rem] truncate  ">
              {/* Ship By */}
              <LocalShippingIcon className='!text-base mr-1 text-[#7dcfb6]'/>{props.translatedMenuItems[3]}
            </div>
            <div className="  w-[18.7rem] max-md:w-[18.7rem] truncate  ">
             {/* Address */}
             <LocationOnIcon className='!text-base  text-[#6848e8]'/> {props.translatedMenuItems[4]}
              </div>
            <div className=" w-[12.4rem] max-md:w-[12.4rem] truncate  ">
            {/* City */}
            <LocationOnIcon className='!text-base  text-[#6848e8]'/> {props.translatedMenuItems[5]}
              </div>
            <div className=" w-[5.9rem] max-md:w-[5.9rem] truncate  ">
            {/* Pin Code */}
              {props.translatedMenuItems[6]}
              </div>
            <div className=" w-[13.24rem] max-md:w-[13.24rem] truncate  ">
            <ApiIcon className='!text-base  text-[#e74139]'/> API</div>
          </div>
          
            <>
              {props.shipperSerachedData.map((item) => {
                return (
                  <>
                    <div  >
                      <div className="flex rounded max-sm:rounded-lg py-ygap
                max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                      <div class="flex max-sm:justify-between border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex font-medium w-[9.9rem] max-xl:w-[7.6rem] items-center justify-start h-8   bg-[#eef2f9] max-lg:w-[6.1rem] max-sm:w-auto  ">
                  
                         
                              <div class=" text-xs text-blue-500 ml-gap font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer   max-sm:text-xs"
                                  to={`shipper/${item.shipperId}`} title={item.shipperName}>
                                  {item.shipperName}
                                </Link>
                              </div>

                            </div>
                          </div>
                          <div className=" flex max-md:w-44 w-[7rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
<div class="  text-xs ml-gap items-center  font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex   w-[10.3rem] max-md:w-[10.3rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="flex  text-xs ml-gap  font-poppins   max-sm:text-xs">
                              {item.emailId}
                            </div>
                          </div>

                          <div className=" flex  w-[6.12rem] max-md:w-[6.12rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap   max-sm:text-xs">
                              {item.shipByName}
                            </div>

                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex  w-[18.31rem] max-md:w-[18.31rem]  items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins   max-sm:text-xs">
                              {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                            </div>
                          </div>
                          
                          <div className=" flex   w-[12.21rem] max-md:w-[12.21rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap   max-sm:text-xs">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].city) ||
                                ""}
                            </div>
                          </div>
                    
                          <div className=" flex  w-[5.2rem] max-md:w-[5.2rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins   max-sm:text-xs">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].postalCode) ||
                                ""}
                            </div>
                          </div>
                          </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                        
                          <div class='flex items-center justify-center w-[8rem] h-8   bg-[#eef2f9]'>
                            <Popconfirm
                              title="Do you want to delete?"
                              onConfirm={() => props.deleteShipperData(item.shipperId, props.userId)}
                            >
                              <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </> 
        </div >
      </div>
    
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        translatedMenuItems={props.translatedMenuItems}
      />
    </>
  )
}
const mapStateToProps = ({ shipper, auth }) => ({
  shipperByUserId: shipper.shipperByUserId,
  userId: auth.userDetails.userId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  shipperSerachedData: shipper.shipperSerachedData
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateShipperModal,
      handleShipperActivityTableModal,
      handleShipperOrderModal,
      deleteShipperData,
      getShipperByUserId,
      setEditShipper,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperSearchedData);