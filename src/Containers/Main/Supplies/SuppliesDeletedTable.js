import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { MultiAvatar } from "../../../Components/UI/Elements";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

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
   <div className=" flex justify-end sticky  z-auto">
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[1rem] max-xl:w-[2rem]"></div>
            <div className=" w-[6.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">HSN</div>
            <div className=" w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
            <div className=" w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Category</div>
            <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sub Category</div>
            <div className="w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Attribute</div>
            <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Re-order level</div>
            <div className="w-[4.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Created</div>
            <div className="w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Reinstate</div>
            
          </div>

          <InfiniteScroll
            dataLength={props.deleteSuppliesHistory.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingDeletedSuppliesHistory ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"80vh"}
            style={{overflowX:"hidden"}}
          >
            {props.deleteSuppliesHistory.length ?
              <>
                {props.deleteSuppliesHistory.map((item) => {
                    const currentDate = dayjs().format("DD/MM/YYYY");
                  return (
                    <>
                      <div className="flex rounded justify-center bg-white mt-1  h-8  p-1 max-sm:h-[7.5rem] max-sm:flex-col">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[14.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem]   max-sm:w-auto">
                            <div className="flex max-sm:w-wk max-sm:justify-between ">
                              <div>
<span>
                                <MultiAvatar
                                  // primaryTitle={item.name}
                                  imageId={item.imageId}
                                  // imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                </span>

                              </div>
                              <div class="w-[2.2rem] max-sm:w-auto max-xl:w-[1.2rem] max-lg:w-[0.2rem]">

                              </div>

                              <div class="max-sm:w-auto flex items-center">

                                <div className=" flex font-medium flex-col w-[10rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                  <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} </span> &nbsp;  {item.hsn}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.suppliesName}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[9.81rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.categoryName}
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col w-[9.3rem] max-xl:w-[6.23rem] max-lg:w-[5.23rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.subCategoryName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[8.12rem] max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.attributeName} {item.subAttributeName}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[9.41rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.reorder}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[9.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] items-center flex max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <MultiAvatar
                              primaryTitle={item.userName}
                              imageId={item.imageId}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                               {`${dayjs(item.creationDate).format("ll")}`}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[7.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateSupplies suppliesId={item.suppliesId} />
                            </div>
                          </div>
                          
                          
                          </div>
                          
                        
                        </div>
                      </div>
                    </>
                  );
                })}
              </> :
              !props.deleteSuppliesHistory.length
                && !props.fetchingDeletedSuppliesHistory ? <NodataFoundPage /> : null}
          </InfiniteScroll>
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
