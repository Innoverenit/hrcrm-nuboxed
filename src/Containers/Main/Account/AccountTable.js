import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import {
  getCustomerByUser,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal,
  handleUpdateAccountModal,
  emptyDistributor,
  handleAccountPulse
} from "./AccountAction";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import AccountPulseModal from "./AccountPulseModal";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar } from "../../../Components/UI/Elements";
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));


function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [RowData, setRowData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getCustomerByUser(props.userId, page);
    setPage(page + 1);
  }, []);
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getCustomerByUser(props.userId, page);
  };

  const {
    handleUpdateAccountModal,
  } = props;
  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex  w-[97.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[15rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="name"
            /></div>
            <div className=" md:w-[8.1rem]"><FormattedMessage
              id="app.work#"
              defaultMessage="work#"
            /></div>
            <div className=" md:w-[9rem] "><FormattedMessage
              id="app.website"
              defaultMessage="website"
            /></div>
            <div className="md:w-[7rem]"><FormattedMessage
              id="app.type"
              defaultMessage="type"
            /></div>
            <div className="md:w-[8rem]"><FormattedMessage
              id="app.Paymentdays"
              defaultMessage="Paymentdays"
            /></div>
            <div className="md:w-[5rem]"><FormattedMessage
              id="app.vat"
              defaultMessage="vat"
            /></div>
            <div className="md:w-[15rem]"><FormattedMessage
              id="app.billingaddress"
              defaultMessage="billingaddress"
            /></div>
            <div className="md:w-[4.8rem]"><FormattedMessage
              id="app.pincode"
              defaultMessage="pincode"
            /></div>
            <div className="md:w-[4.8rem]"><FormattedMessage
              id="app.owner"
              defaultMessage="Owner"
            /></div>
            <div class="w-[2rem]"></div>
            <div class="w-[2rem]"></div>
          </div>
          <InfiniteScroll
            dataLength={props.customerListByUser.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingCustomerByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
          >
            {props.customerListByUser.length ?
              <>
                {props.customerListByUser.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  const diff = Math.abs(
                    dayjs().diff(dayjs(item.lastRequirementOn), "days")
                  );
                  const dataLoc = `${item.address && item.address.length && item.address[0].address1
                    } 
            ${item.address && item.address.length && item.address[0].street
                    }   
           ${item.address && item.address.length && item.address[0].state}
          ${(item.address && item.address.length && item.address[0].country) || ""
                    } 
           
            `;
                  return (
                    <div>
                      <div className="flex rounded-xl justify-between  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 "                                >
                        <div class="flex">
                          <div className=" flex font-medium flex-col w-[12rem]   max-sm:w-full">
                            <div className="flex max-sm:w-full">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.name}
                                  imageId={item.imageId}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                              <div class="w-[1rem]"></div>
                              <div class="max-sm:w-full md:flex items-center">
                                <Tooltip>
                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                    <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                      <Link
                                        class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                        to={`distributor/${item.distributorId}`}
                                        title={`${item.name}`}>
                                        {item.name}
                                      </Link>  &nbsp;&nbsp;
                                      {date === currentdate ? (
                                        <div class="text-xs text-[tomato] font-bold" >
                                          New
                                        </div>
                                      ) : null}

                                    </div>
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                            <div class=" text-xs text-cardBody font-poppins">
                              {item.dialCode} {item.phoneNo}
                            </div>

                          </div>

                        </div>

                        <div className=" flex font-medium flex-col md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.url}

                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.clientName}

                          </div>
                        </div>

                        <div className=" flex font-medium flex-col md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.payment}

                          </div>
                        </div>

                        <div class="flex md:items-center">

                          <div className=" flex font-medium flex-col  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {item.countryValue}
                            </div>

                          </div>
                          <div className=" flex font-medium flex-col  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {dataLoc}
                            </div>

                          </div>

                          <div className=" flex font-medium flex-col  md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {item.address && item.address.length && item.address[0].postalCode}

                            </div>

                          </div>
                          <div className=" flex font-medium flex-col  md:w-[4.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">

                              <MultiAvatar
                                primaryTitle={item.salesExecutive}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>

                          </div>
                        </div>
                        <div className=" flex font-medium flex-col  md:w-[20px] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Pulse">
                              <MonitorHeartIcon
                                onClick={() => {
                                  props.handleAccountPulse(true);
                                  handleCurrentRowData(item);
                                }}
                                className=" !text-base cursor-pointer text-[#df9697]"
                              />
                            </Tooltip>
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[20px] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                className=" !text-base cursor-pointer text-[tomato]"
                                onClick={() => {
                                  props.setEditDistributor(item)
                                  handleUpdateAccountModal(true);
                                  handleCurrentRowData(item);
                                }}
                              />

                            </Tooltip>
                          </div>


                        </div>
                      </div>
                    </div>


                  )
                })}
              </>
              : !props.customerListByUser.length && !props.fetchingCustomerByUser ? <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>
      <UpdateAccountModal
        RowData={RowData}
        updateAccountModal={props.updateAccountModal}
        handleUpdateAccountModal={handleUpdateAccountModal}
      />
      <AccountPulseModal
        RowData={RowData}
        handleAccountPulse={props.handleAccountPulse}
        showPulseModal={props.showPulseModal}
      />

    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  customerListByUser: distributor.customerListByUser,
  showPulseModal: distributor.showPulseModal,
  fetchingCustomerByUser: distributor.fetchingCustomerByUser,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateAccountModal: distributor.updateAccountModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getCustomerByUser,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributorData,
      handleBillingAddressModal,
      handleUpdateAccountModal,
      emptyDistributor,
      handleAccountPulse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);

