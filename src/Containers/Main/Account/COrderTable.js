import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  Popconfirm,
  Tooltip,
  Input,
  Button,
  Progress,
  Select,
  Avatar,
} from "antd";
import { Link } from "react-router-dom";
import {
  getOrderProcurement,
} from "./AccountAction";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";


const { Option } = Select;

function COrderTable(props) {

const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);
    
  useEffect(() => {
    props.getOrderProcurement(RowData.distributorId,page,"repair");
  }, []);
 
  const handleLoadMore = () => {
     const PageMap =
       props.procurementOrder &&
       props.procurementOrder.length &&
       props.procurementOrder[0].pageCount;
     setTimeout(() => {
       if (props.procurementOrder) {
         if (page < PageMap) {
           setPage(page + 1);
           props.getOrderProcurement(RowData.distributorId,page,"repair");;
         }
         if (page === PageMap) {
           setHasMore(false);
         }
       }
     }, 100);
   };


  const {
    selectedLanguage,
    RowData,
  translatedMenuItems,
  } = props;

  
  return (
    <>

        <div className=" flex  sticky  z-auto">
          <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-white">
            <div className=" flex max-sm:hidden   w-[94%]  justify-between p-1 bg-transparent sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
              <div class=" flex justify-between items-end !text-lm font-poppins  font-bold  w-[100%]  ">
              <div className="w-[10.2rem] max-md:w-[9.2rem]">{translatedMenuItems[45]} ID</div>
              <div className="w-[7.2rem] max-md:w-[9.2rem]">{translatedMenuItems[46]}</div>
              <div className="w-[5.2rem] max-md:w-[9.2rem]">{translatedMenuItems[47]}</div>
              </div>
            </div>
    
     <InfiniteScroll
                  dataLength={props.procurementOrder.length}
                  next={handleLoadMore}
                  hasMore={hasMore}
                  loader={
                    props.fetchingOrderProcurement ? (
                      <div style={{ textAlign: "center" }}>
                        <BundleLoader />
                      </div>
                    ) : null
                  }
                  height={"83vh"}
                  style={{ scrollbarWidth: "thin" }}
                  endMessage={
                    <p class="fles text-center font-bold text-xs text-red-500">
                      {translatedMenuItems[48]}
                    </p>
                  }
                >
                <>
                  {props.procurementOrder.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                   
                    return (
                      <div>
                        <div className="flex  justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex items-center  ml-gap bg-[#eef2f9] w-[7.4rem] h-8 max-md:w-[7.4rem] max-sm:flex-row  max-sm:justify-between">
                              <div class=" text-xs ml-gap items-center font-poppins">
                                
                                  {item.newOrderNo}
                              
                                {date === currentdate ? (
                                  <span class="text-[tomato] text-[0.65rem] font-bold">
                                    {/* New*/}
                                    {translatedMenuItems[9]}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div class="flex flex-row w-[5.03rem] items-center  justify-center ml-gap bg-[#eef2f9] h-8 max-md:w-[10.03rem] max-sm:flex-row  max-sm:justify-between">
                            <div class=" font-poppins text-xs">
                              {item.newFinalPrice}
                            </div>
                          </div>
                          <div class="flex flex-row w-[5.03rem] items-center  justify-center ml-gap bg-[#eef2f9] h-8 max-md:w-[10.03rem] max-sm:flex-row  max-sm:justify-between">
                            <div class=" font-poppins text-xs">
                              {item.status}
                            </div>
                          </div>
                           </div>
                        </div>
                      </div>
                    );
                  })}
              
            </>
            </InfiniteScroll>
          </div>
        </div>
    

    </>
  );
}
const mapStateToProps = ({ distributor, auth, catgCustomer, customer }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  procurementOrder:distributor.procurementOrder,
  fetchingOrderProcurement:distributor.fetchingOrderProcurement,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderProcurement
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(COrderTable);
