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
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden  w-[97.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[15.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.1rem] max-lg:w-[16.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="name"
            /></div>
            <div className=" w-[9.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.11rem] max-lg:w-[9.11rem]"><FormattedMessage
              id="app.work#"
              defaultMessage="work#"
            /></div>
            <div className=" w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.1rem] max-lg:w-[8.1rem] "><FormattedMessage
              id="app.website"
              defaultMessage="website"
            /></div>
            <div className="w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem]"><FormattedMessage
              id="app.type"
              defaultMessage="type"
            /></div>
            <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]"><FormattedMessage
              id="app.Paymentdays"
              defaultMessage="Paymentdays"
            /></div>
            <div className="w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.24rem]"><FormattedMessage
              id="app.vat"
              defaultMessage="vat"
            /></div>
            <div className="w-[14rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14rem]"><FormattedMessage
              id="app.billingaddress"
              defaultMessage="billingaddress"
            /></div>
            <div className="w-[5.83rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.83rem]"><FormattedMessage
              id="app.pincode"
              defaultMessage="pincode"
            /></div>
            <div className="w-[7.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[0.5rem] max-lg:w-[1.5rem]"><FormattedMessage
              id="app.owner"
              defaultMessage="Owner"
            /></div>
            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
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
                      <div className="flex rounded-xl justify-between  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 max-xl:p-1 max-sm:h-[9rem] max-sm:flex-col "                                >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[13rem] max-xl:w-[11rem] max-lg:w-[8rem]   max-sm:w-auto">
                            <div className="flex max-sm:w-auto">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.name}
                                  imageId={item.imageId}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                              <div class="w-[0.25rem]"></div>
                              <div class="max-sm:w-auto flex items-center">
                                <Tooltip>
                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                    <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                      <Link
                                        class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 max-sm:text-sm text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem]"
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
                          <div className=" flex font-medium  items-center  w-[7.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">

                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-sm ">
                              {item.dialCode} {item.phoneNo}
                            </div>

                          </div>

                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium flex-col max-sm:w-auto w-[6.2rem] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.url}

                          </div>
                        </div>
                        <div className=" flex font-medium flex-col max-sm:w-auto w-[7rem] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.clientName}

                          </div>
                        </div>

                        <div className=" flex font-medium flex-col max-sm:w-auto w-[8rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.payment}

                          </div>
                        </div>
</div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex font-medium flex-col max-sm:w-auto  w-[3.5rem] max-xl:w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.countryValue}
                            </div>

                          </div>
                          <div className=" flex font-medium flex-col max-sm:w-auto  w-[14rem] max-xl:w-[9rem] max-lg:w-[8.1rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {dataLoc}
                            </div>

                          </div>

                          <div className=" flex font-medium flex-col max-sm:w-auto  w-[3.91rem] max-xl:w-[2.91rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.address && item.address.length && item.address[0].postalCode}

                            </div>

                          </div>
                         
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium flex-col  w-[6.81rem] max-xl:w-[2.01rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins ">

                              <MultiAvatar
                                primaryTitle={item.salesExecutive}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>

                          </div>
                        <div className=" flex font-medium flex-col  w-[1.8rem] max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
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
                        <div className=" flex font-medium flex-col w-[2rem] max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
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

