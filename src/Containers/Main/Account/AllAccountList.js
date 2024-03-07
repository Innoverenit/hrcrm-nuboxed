import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllDistributorsList } from "./AccountAction"
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../Helpers/ErrorBoundary/NodataFoundPage';

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
            {props.allDistributors.length ?
              <>
                {props.allDistributors.map((item) => {

                  return (
                    <div>
                      <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 " >
                        <div class="flex">
                          <div className=" flex font-medium flex-col md:w-[13.6rem] max-sm:w-full  ">
                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                {item.name}
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            {item.dialCode} {item.phoneNo}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[8.55rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.url}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[7.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.clientName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[10.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.payment}
                          </div>
                        </div>
                        <div class="flex md:items-center">
                          <div className=" flex font-medium flex-col  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {item.countryValue}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col  md:w-[15.25rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {/* {dataLoc} */}
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



