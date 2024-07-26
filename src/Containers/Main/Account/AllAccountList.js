import React, { useEffect, useState, lazy } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllDistributorsList,
  handleUpdateAccountModal,

} from "./AccountAction"
import dayjs from "dayjs";
import InfiniteScroll from 'react-infinite-scroll-component';
import ExploreIcon from "@mui/icons-material/Explore";
import NodataFoundPage from '../../../Helpers/ErrorBoundary/NodataFoundPage';
import { MultiAvatar } from '../../../Components/UI/Elements';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountSearchedData from './AccountSearchedData';
const AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));

const AllAccountList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [RowData, setRowData] = useState("");
  useEffect(() => {
    props.getAllDistributorsList(props.orgId,page);
    setPage(page + 1);
  }, []);
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDistributorsList(props.orgId,page);
  };
  const {
    handleUpdateAccountModal,
  } = props;
  return (
    <>
     {props.distributorSearch.length > 0 ? (
    <AccountSearchedData
    distributorSearch={props.distributorSearch}
    />
  ) : (
      <div className=' flex  sticky z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex max-sm:hidden  w-[99%] justify-between p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[17.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.1rem] max-lg:w-[16.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="name"
            /></div>
            <div className=" w-[10.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.11rem] max-lg:w-[9.11rem]"><FormattedMessage
              id="app.work#"
              defaultMessage="work#"
            /></div>
            <div className=" w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.1rem] max-lg:w-[8.1rem] ">Category</div>
            <div className="w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem]"><FormattedMessage
              id="app.type"
              defaultMessage="type"
            /></div>
            <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]"><FormattedMessage
              id="app.Paymentdays"
              defaultMessage="Paymentdays"
            /></div>
            <div className="w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.24rem]">Tax#</div>
            {/* <div className="w-[15.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14rem]"><FormattedMessage
              id="app.billingaddress"
              defaultMessage="billingaddress"
            /></div> */}
            

            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
          </div>
         <InfiniteScroll
            dataLength={props.allDistributors.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"80vh"}
        >
            {props.allDistributors.length ?
              <>
                {props.allDistributors.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
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
                    <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-xl:p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "                                >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium flex-col w-[16rem] max-xl:w-[11rem] max-lg:w-[8rem]   max-sm:w-auto">
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
                                  <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer flex items-center">

                                    <Link
                                      class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 max-sm:text-sm text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                      to={`distributor/${item.distributorId}`}
                                      title={`${item.name}`}>
                                      {item.name.substring(0, 25)}
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
                        <div className=" flex   items-center  w-[6.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">

                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-sm ">
                            {item.dialCode} {item.phoneNo}
                          </div>

                        </div>

                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex  flex-col max-sm:w-auto w-[11.2rem] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {/* {item.url} */}
                            {item.dCategoryName}

                          </div>
                        </div>
                        <div className=" flex flex-col max-sm:w-auto w-[7rem] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.clientName}

                          </div>
                        </div>

                        <div className=" flex flex-col max-sm:w-auto w-[12rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.payment}

                          </div>
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                        <div className=" flex flex-col max-sm:w-auto  w-[3.5rem] max-xl:w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.countryValue}
                          </div>

                        </div>
                        {/* <div className=" flex font-medium flex-col max-sm:w-auto  w-[16.1rem] max-xl:w-[9rem] max-lg:w-[8.1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins max-w-[40ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {dataLoc}
                          </div>

                        </div> */}

                        {/* <div className=" flex font-medium flex-col max-sm:w-auto  w-[3.91rem] max-xl:w-[2.91rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.address && item.address.length && item.address[0].postalCode}

                          </div>

                        </div> */}

                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">


                      <div className=" flex  flex-col  max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
                      <div>
                        <Tooltip title={item.url}>
                          {item.url !== "" ? (
                            <div                            
                              style={{ cursor: "pointer" }}
                              onClick={() => { }}
                            >
                              {" "}
                              <a href={`https://${item.url}`} target="_blank">
                                <ExploreIcon
                                  className=" !text-icon cursor-pointer text-[green]"

                                />
                              </a>
                            </div>
                          )
                            : <div class=" w-3">

                            </div>
                          }
                        </Tooltip>

                      </div>
                        </div>

                        <div className=" flex  flex-col  max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Pulse">
                              <MonitorHeartIcon
                                onClick={() => {
                                  props.handleAccountPulse(true);
                                  handleCurrentRowData(item);
                                }}
                                className=" !text-icon cursor-pointer text-[#df9697]"
                              />
                            </Tooltip>
                          </div>
                        </div>
                        <div className=" flex  flex-col  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"
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
              </> : !props.allDistributors.length
                && !props.fetchingAllDistributors ?
                <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>
          )}
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
  )
}

const mapStateToProps = ({ distributor,auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  showPulseModal: distributor.showPulseModal,
  updateAccountModal: distributor.updateAccountModal,
  orgId: auth.userDetails.organizationId,
  distributorSearch:distributor.distributorSearch,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,
      handleUpdateAccountModal,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);



