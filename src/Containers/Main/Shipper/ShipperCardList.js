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
import { FormattedMessage } from "react-intl";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";


function ShipperCardList(props) {
  useEffect(() => {
    props.getShipperByUserId(props.userId);
  }, []);

  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal, updateShipperModal } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {

    setPage(page + 1);
    props.getShipperByUserId(
      props.userId
    );
  };


  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[8.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
            <div className=" md:w-[5.1rem]"><FormattedMessage id="app.phones" defaultMessage="Phones #" /></div>
            <div className=" md:w-[6.8rem] "><FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="md:w-[5.9rem]"><FormattedMessage id="app.shipby" defaultMessage="Ship By" /></div>
            <div className="md:w-[7.8rem]"><FormattedMessage id="app.address" defaultMessage="Address" /></div>
            <div className="md:w-[7.9rem]"><FormattedMessage id="app.city" defaultMessage="City" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.pinCode" defaultMessage="Pin Code" /></div>
            <div className="md:w-[4.24rem]">API</div>
          </div>
          <InfiniteScroll
            dataLength={props.shipperByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingShipperByUserId ? <div className="flex items-center" >Loading...</div> : null}
            height={"75vh"}
          >
            {props.shipperByUserId.length ? <>
              {props.shipperByUserId.map((item) => {
                return (
                  <>
                    <div  >
                      <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                        <div className=" flex font-medium flex-col md:w-[13.6rem] max-sm:w-full  ">

                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                              <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                to={`shipper/${item.shipperId}`} title={item.shipperName}>
                                {item.shipperName}
                              </Link>
                            </div>

                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[6.2rem] max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                            {item.dialCode} {item.phoneNo}
                          </div>

                        </div>
                        <div className=" flex font-medium  md:w-[14.3rem] max-sm:justify-between w-full max-sm:flex-row ">

                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                            {item.emailId}
                          </div>

                        </div>

                        <div className=" flex font-medium  md:w-[11.12rem] max-sm:justify-between w-full max-sm:flex-row ">

                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                            {item.shipByName}
                          </div>

                        </div>
                        <div className=" flex font-medium  md:w-[11.31rem] max-sm:justify-between w-full max-sm:flex-row ">

                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                            {`${(item.addresses && item.addresses.length && item.addresses[0].address1) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].state) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].street) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].city) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].pinCode) || ""}`}
                          </div>

                        </div>
                        <div className=" flex font-medium  md:w-[11.21rem] max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                            {(item.addresses &&
                              item.addresses.length &&
                              item.addresses[0].city) ||
                              ""}
                          </div>

                        </div>
                        <div className=" flex font-medium  md:w-[11.45rem] max-sm:justify-between w-full max-sm:flex-row ">

                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                            {(item.addresses &&
                              item.addresses.length &&
                              item.addresses[0].pinCode) ||
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
                        <div class="flex flex-col w-[3%] ml-1 max-sm:flex-row max-sm:w-[10%]">
                          <div>
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                className=" !text-base cursor-pointer text-[tomato]"

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
                              title="Do you want to delete?"
                              onConfirm={() => props.deleteShipperData(item.shipperId)}
                            >
                              <DeleteOutlined
                                className=" !text-base cursor-pointer text-[red]"

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
      <UpdateShipperModal
        rowdata={rowdata}
        shipperId={currentShipperId}
        updateShipperModal={updateShipperModal}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        handleUpdateShipperModal={handleUpdateShipperModal}
      />
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      />
      {/* <AddShipperActivityModal
        addShipperActivityTableModal={props.addShipperActivityTableModal}
        handleShipperActivityTableModal={props.handleShipperActivityTableModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      /> */}
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