import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
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
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import ShipperSearchedData from "./ShipperSearchedData";


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
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
        <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky -0 z-10">
            <div className=" w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Name */}
              {props.translatedMenuItems[0]}
              </div>
            <div className=" w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Phone */}
              {props.translatedMenuItems[1]} #
              </div>
            <div className=" w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Email */}
              {props.translatedMenuItems[2]}
              </div>
            <div className="w-[5.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Ship By */}
              {props.translatedMenuItems[3]}
            </div>
            <div className="w-[7.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Address */}
              {props.translatedMenuItems[4]}
              </div>
            <div className="w-[7.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* City */}
              {props.translatedMenuItems[5]}
              </div>
            <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* Pin Code */}
              {props.translatedMenuItems[6]}
              </div>
            <div className="w-[10.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">API</div>
          </div>
          <InfiniteScroll
            dataLength={props.shipperByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingShipperByUserId ? <div className="flex justify-center" >{props.translatedMenuItems[8]}...</div> : null}
            height={"80vh"}
          >
            {props.shipperByUserId.length ? <>
              {props.shipperByUserId.map((item) => {
                return (
                  <>
                    <div  >
                      <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[10.9rem] max-xl:w-[7.6rem] max-lg:w-[6.1rem] max-sm:w-auto  ">

                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`shipper/${item.shipperId}`} title={item.shipperName}>
                                  {item.shipperName}
                                </Link>
                              </div>

                            </div>
                          </div>
                          <div className=" flex  w-[6.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem]  max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dialCode} {item.phoneNo}
                            </div>
                          </div>
                        </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex   w-[13.3rem] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.emailId}
                            </div>
                          </div>

                          <div className=" flex  w-[7.12rem] max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.shipByName}
                            </div>

                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[11.31rem] max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                            </div>
                          </div>
                          
                          <div className=" flex   w-[12.21rem] max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].city) ||
                                ""}
                            </div>
                          </div>
                        </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[6.2rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].postalCode) ||
                                ""}
                            </div>
                          </div>
                          
                          <div>
                            <Switch
                              className="toggle-clr"
                              //checked={item.productionInd}
                              isLoading={true}
                              checkedChildren="Yes"
                              unCheckedChildren="No"
                            />
                          </div>
                        </div>
                        <div class="flex justify-end max-sm:w-wk items-center">
                          <div>
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
                          <div>
                            <Popconfirm
                              title={`${props.translatedMenuItems[10]}?`}
                              onConfirm={() => props.deleteShipperData(item.shipperId, props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red]"

                              />
                            </Popconfirm>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShipperCardList);