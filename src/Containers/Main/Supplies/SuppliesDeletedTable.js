import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";
import InfiniteScroll from "react-infinite-scroll-component";


function SuppliesDeletedTable(props) {
  useEffect(() => {
    props.getDeleteHistory()
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    props.getDeleteHistory()
  };
  return (
    <>
      <div className=" flex justify-end sticky top-28 z-auto">
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[6.1rem]">Name</div>
            <div className=" md:w-[5.1rem]">Mobile</div>
            <div className=" md:w-[6.2rem] ">Websites</div>
            <div className="md:w-[6.1rem]">Address</div>
            <div className="md:w-[4.8rem]">City</div>
            <div className="md:w-[4.1rem]">Pin Code</div>
            <div className="md:w-[6.1rem]">Re-Instate</div>
          </div>
          <div class="overflow-x-auto h-[64vh]">
            <InfiniteScroll
              dataLength={props.deleteSuppliesHistory.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingDeletedSuppliesHistory ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
            >
              {props.deleteSuppliesHistory.map((item) => {
                return (
                  <>
                    <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3">
                      <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">


                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.name}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.dialCode} {item.phoneNo}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.url}
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {`${item.addresses[0].address1 || ""} ${item.addresses[0]
                              .address2 || ""} ${item.addresses[0].street || ""} 
                ${item.addresses[0].city || ""}
                    `}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.addresses[0].city || ""}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.addresses[0].pinCode || ""}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            <ReInstateSupplies suppliesId={item.suppliesId} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ supplies }) => ({
  deleteSuppliesHistory: supplies.deleteSuppliesHistory,
  fetchingDeletedSuppliesHistory: supplies.fetchingDeletedSuppliesHistory
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeleteHistory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesDeletedTable);
