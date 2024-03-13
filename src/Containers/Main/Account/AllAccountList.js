import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllDistributorsList } from "./AccountAction"
import dayjs from "dayjs";
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../Helpers/ErrorBoundary/NodataFoundPage';
import { MultiAvatar } from '../../../Components/UI/Elements';
import { Link } from "../../../Components/Common";
import { Tooltip } from 'antd';

const AllAccountList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllDistributorsList(page);
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDistributorsList(page);
  };
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
            <div className="md:w-[7.5rem]"><FormattedMessage
              id="app.type"
              defaultMessage="type"
            /></div>
            <div className="md:w-[7.8rem]"><FormattedMessage
              id="app.Paymentdays"
              defaultMessage="Paymentdays"
            /></div>
            <div className="md:w-[5rem]"><FormattedMessage
              id="app.vat"
              defaultMessage="vat"
            /></div>
            <div className="md:w-[16rem]"><FormattedMessage
              id="app.billingaddress"
              defaultMessage="billingaddress"
            /></div>
            <div className="md:w-[5rem]"><FormattedMessage
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
                      <div className="flex rounded-xl justify-between  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 "                                >
                        <div class="flex">
                          <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
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

                                      <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer" title={item.name}>
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
                        <div className=" flex font-medium flex-col md:w-[7.8rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                          <div className=" flex font-medium flex-col  md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {dataLoc}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {item.address && item.address.length && item.address[0].postalCode}
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
    </>
  )
}

const mapStateToProps = ({ distributor }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);



