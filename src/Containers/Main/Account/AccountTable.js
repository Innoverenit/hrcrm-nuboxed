import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
import { Link } from "../../../Components/Common";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllDistributorsList,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal,
  handleUpdateAccountModal,
  emptyDistributor
} from "./AccountAction";
import moment from "moment";
import { FormattedMessage } from "react-intl";
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));


function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [RowData, setRowData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllDistributorsList(page);
    setPage(page + 1);
  }, []);
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDistributorsList(props.currentUser ? props.currentUser : page,


    );
  }

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
        <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex  w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[15.12rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="name"
            /></div>
            <div className=" md:w-[8.121rem]"><FormattedMessage
              id="app.work#"
              defaultMessage="work#"
            /></div>
            <div className=" md:w-[8.825rem] "><FormattedMessage
              id="app.website"
              defaultMessage="website"
            /></div>
            <div className="md:w-[6.95rem]"><FormattedMessage
              id="app.type"
              defaultMessage="type"
            /></div>
            <div className="md:w-[7.8rem]"><FormattedMessage
              id="app.Paymentdays"
              defaultMessage="Paymentdays"
            /></div>
            <div className="md:w-[6.94rem]"><FormattedMessage
              id="app.vat"
              defaultMessage="vat"
            /></div>
            <div className="md:w-[14.21rem]"><FormattedMessage
              id="app.billingaddress"
              defaultMessage="billingaddress"
            /></div>
            <div className="md:w-[7.32rem]"><FormattedMessage
              id="app.pincode"
              defaultMessage="pincode"
            /></div>

          </div>
          <InfiniteScroll
            dataLength={props.allDistributors.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
          >

            {props.allDistributors.map((item) => {
              const currentdate = moment().format("DD/MM/YYYY");
              const date = moment(item.creationDate).format("DD/MM/YYYY");
              const diff = Math.abs(
                moment().diff(moment(item.lastRequirementOn), "days")
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
                  <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 "
                  // style={{
                  //     borderBottom: "3px dotted #515050"
                  // }}
                  >
                    <div class="flex">
                      <div className=" flex font-medium flex-col md:w-[13.6rem] max-sm:w-full  ">


                        <Tooltip>
                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                              <Link
                                toUrl={`distributor/${item.distributorId}`}
                                title={`${item.name}`}
                              >{item.name}</Link>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs"
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                  }}
                                >
                                  New
                                </span>
                              ) : null}

                            </div>
                          </div>
                        </Tooltip>

                      </div>

                      <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.dialCode} {item.phoneNo}
                        </div>

                      </div>

                    </div>

                    <div className=" flex font-medium flex-col md:w-[8.55rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</div> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.url}

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[7.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.clientName}

                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[10.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</div> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.payment}

                      </div>
                    </div>

                    <div class="flex md:items-center">

                      <div className=" flex font-medium flex-col  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.countryValue}
                        </div>

                      </div>
                      <div className=" flex font-medium flex-col  md:w-[15.25rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {dataLoc}
                        </div>

                      </div>

                      <div className=" flex font-medium flex-col  md:w-[6.92rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.address && item.address.length && item.address[0].postalCode}
                        </div>

                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">



                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            className=" !text-base cursor-pointer text-[gray]"
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
          </InfiniteScroll>
        </div>
      </div>
      <UpdateAccountModal
        RowData={RowData}
        updateAccountModal={props.updateAccountModal}
        handleUpdateAccountModal={handleUpdateAccountModal}
      />


    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
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
      getAllDistributorsList,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributorData,
      handleBillingAddressModal,
      handleUpdateAccountModal,
      emptyDistributor
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);

