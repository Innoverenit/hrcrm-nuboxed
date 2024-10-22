import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Popconfirm, Switch } from "antd";
import {
  getShipperByUserId,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
  handleShipperAddress
} from "./ShipperAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import ShipperSearchedData from "./ShipperSearchedData";
import AddShipperAdressModal from "./AddShipperAdressModal";


function ShipperCardList(props) {


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
      {props.shipperSerachedData.length > 0 ? (
    <ShipperSearchedData
    shipperSerachedData={props.shipperSerachedData}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
        <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className="font-poppins font-bold text-[#00A2E8] text-base w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Name */}
              {props.translatedMenuItems[0]}
              </div>
            <div className="font-poppins font-bold text-xs w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Phone */}
              {props.translatedMenuItems[1]} #
              </div>
            <div className="font-poppins font-bold text-xs w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Email */}
              {props.translatedMenuItems[2]}
              </div>
            <div className="font-poppins font-bold text-xs w-[5.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Ship By */}
              {props.translatedMenuItems[3]}
            </div>
            <div className=" font-poppins font-bold text-xs w-[7.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Address */}
              {props.translatedMenuItems[4]}
              </div>
            <div className="font-poppins font-bold text-xs w-[7.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* City */}
              {props.translatedMenuItems[5]}
              </div>
            <div className="font-poppins font-bold text-xs w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* Pin Code */}
              {props.translatedMenuItems[6]}
              </div>
            <div className="font-poppins font-bold text-xs w-[10.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">API</div>
          </div>
          <InfiniteScroll
            dataLength={props.shipperByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingShipperByUserId ? <div className="flex justify-center" >{props.translatedMenuItems[8]}...</div> : null}
            height={"88vh"}
          >
            {props.shipperByUserId.length ? <>
              {props.shipperByUserId.map((item) => {
                return (
                  <>
                    <div  >
                      <div className="flex rounded max-sm:rounded-lg
                max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white h-8 items-center max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                        <div class="flex max-sm:justify-between border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex font-medium flex-col  w-[9.9rem] max-xl:w-[7.6rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-lg:w-[6.1rem] max-sm:w-auto  ">
                  
                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                  to={`shipper/${item.shipperId}`} title={item.shipperName}>
                                  {item.shipperName}
                                </Link>
                              </div>

                            </div>
                          </div>
                          <div className=" flex  w-[6.5rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.5rem]  max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.dialCode} {item.phoneNo}
                            </div>
                          </div>
                        </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex   w-[13.3rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.emailId}
                            </div>
                          </div>

                          <div className=" flex  w-[7.12rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.shipByName}
                            </div>

                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex  w-[13.31rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                            </div>
                          </div>
                          
                          <div className=" flex   w-[12.21rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].city) ||
                                ""}
                            </div>
                          </div>
                    
                          <div className=" flex  w-[7.2rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].postalCode) ||
                                ""}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                          <div className="items-center justify-center w-[10rem] h-8 ml-gap  bg-[#eef2f9]">
                            <Switch
                              className="toggle-clr"
                              //checked={item.productionInd}
                              isLoading={true}
                              checkedChildren="Yes"
                              unCheckedChildren="No"
                            />
                          </div>
                          <div class="flex justify-end max-sm:w-wk items-center">
                          <div class="flex max-sm:flex-row w-[8rem]  justify-end md:w-[3rem] max-sm:w-[25%] ">
                           
                          <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                          <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleShipperAddress(true);
            handleRowData(item);
          }}         
        />      
       </div>

                                   <div className=" flex items-center justify-center h-8  bg-[#eef2f9]">          
                            <Tooltip title={props.translatedMenuItems[9]}>
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato] max-sm:!text-2xl"

                                onClick={() => {
                                  props.setEditShipper(item);
                                  handleRowData(item);
                                  handleUpdateShipperModal(true);
                                  handleSetCurrentShipperId(item.shipperId);
                                }}
                              />
                            </Tooltip>
                  </div>
                  <div className=" flex items-center justify-center h-8  bg-[#eef2f9]">
                            <Popconfirm
                              title={`${props.translatedMenuItems[10]}?`}
                              onConfirm={() => props.deleteShipperData(item.shipperId, props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red] max-sm:!text-2xl"

                              />
                            </Popconfirm>
                            </div>
                         </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </> : !props.shipperByUserId.length
              && !props.fetchingShipperByUserId ? <NodataFoundPage /> : null}

          </InfiniteScroll>
        </div >
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
  shipperByUserId: shipper.shipperByUserId,
  userId: auth.userDetails.userId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
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
      getShipperByUserId,
      setEditShipper,
      handleShipperAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperCardList);