import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

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
          <div className=" flex justify-between w-[91.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">HSN</div>
            <div className=" w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
            <div className=" w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Category</div>
            <div className="w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Attribute</div>
            <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Re-order level</div>
            <div className="w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Created</div>
          </div>
          <div class="overflow-x-auto h-[70vh]">
            {/* <InfiniteScroll
              dataLength={props.deleteSuppliesHistory.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingDeletedSuppliesHistory ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
            > */}
              {props.deleteSuppliesHistory.map((item) => {
                return (
                  <>
                    <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3">
                      <div class=" flex flex-row justify-evenly  max-sm:flex-col">
                        <div className=" flex font-medium flex-col w-[13.1rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">


                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.hsn}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col w-[13.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.suppliesName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col w-[15.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.categoryName}  {item.subCategoryName}
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col w-[14.02rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.attributeName} {item.subAttributeName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col w-[12.51rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.reorder}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col w-[6.1rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {`${moment(item.creationDate).format("ll")}`}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col w-[3.02rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            <ReInstateSupplies suppliesId={item.suppliesId} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </>
                );
              })}
            {/* </InfiniteScroll> */}
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
