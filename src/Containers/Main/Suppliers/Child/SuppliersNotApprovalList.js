import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersNotApprovalList, 
} from "../SuppliersAction"
import InfiniteScroll from "react-infinite-scroll-component";
import SuplierNotApprovalPublishToggle from "../Child/SuplierNotApprovalPublishToggle"
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

function SuppliersNotApprovalList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    setPage(page + 1);
    props.getSuppliersNotApprovalList(props.userId, page);
  }, []);

  const handleRowData = (item) => {
    setrowData(item);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = props.supplierList && props.supplierList.length && props.supplierList[0].pageCount
    setTimeout(() => {
      const {
        getSuppliersNotApprovalList,

        userId
      } = props;
      if (props.supplierList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliersNotApprovalList(userId, page);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };

  return (
    <>
      <div className=' flex  sticky  z-auto'>
        <div class=" m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[20.4rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[11.8rem]">  {props.translatedMenuItems[0]} </div>
            <div className=" w-[10.8rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[9.8rem]">
            {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[22.91rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[14.9rem] "> 
            {props.translatedMenuItems[2]}</div>
            
            <div className="w-[10.9rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[9.5rem]">
            {props.translatedMenuItems[3]}
            </div>

            <div class=" w-[5rem]"></div>
          </div>
         <div class="overflow-x-auto h-[80vh]">
            <InfiniteScroll
              dataLength={props.notApprovalSupplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingNotApprovalSupplierList ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
              height={"80vh"}
              style={{scrollbarWidth:"thin"}}
            >
              {props.notApprovalSupplierList.length ?
                <>
                  {props.notApprovalSupplierList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    const countryCode = item.address[0].country_alpha2_code;
                    const dataLoc = ` Address : ${
                      item.address && item.address.length && item.address[0].address1
                    } 
                        
                       Country : ${
                         (item.address &&
                           item.address.length &&
                           item.address[0].country) ||
                         ""
                       } 
                         `;
                    return (
                      <>
                        <div
                          className="flex  rounded justify-between bg-white mt-1 h-8 items-center p-1  max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className="font-medium  flex items-center w-[14.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div class=" font-semibold text-[0.85rem] font-poppins">
                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm"
                                    to={`supplier/${item.supplierId}`}
                                    title={`${item.shipperName}`}
                                  >{item.name}</Link>
                                </div>

                                {date === currentdate ? (
                                  <div class="text-[0.65rem]  text-[tomato] font-bold"
                                  >
                                    {/* New */} {props.translatedMenuItems[23]}
                                  </div>
                                ) : null}
                              </div>
                              <div className=" flex  items-center flex-col w-[8.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">

                                <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                  {item.dialCode} {item.phoneNo}
                                </div>

                              </div>
                            </div>
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex  w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                  {item.emailId}
                                </div>
                              </div>                          
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex w-[9.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[8.05rem] max-lg:w-[6.02rem] ">

                                <div class="  text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                <CountryFlag1 countryCode={countryCode} />
                                 &nbsp;
                                   {countryCode}
                                </div>
                              </div>
                            </div>

                            <div className=" flex  w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs">
                                <SuplierNotApprovalPublishToggle
                                 approveInd={item.approveInd}
                                supplierId={item.supplierId}
                                />
                              </div>
                            </div>                  
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.notApprovalSupplierList.length &&
                  !props.fetchingNotApprovalSupplierList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div> 
        </div>
      </div>
    </>
  )
}
const mapStateToProps = ({ shipper, suppliers, auth }) => ({
  supplierList: suppliers.supplierList,
  suppliersListOpenDrawer: suppliers.suppliersListOpenDrawer,
  userId: auth.userDetails.userId,
  fetchingNotApprovalSupplierList:suppliers.fetchingNotApprovalSupplierList,
  notApprovalSupplierList:suppliers.notApprovalSupplierList,
  fetchingSupplierList: suppliers.fetchingSupplierList,
  suppliersPriceOpenDrawer: suppliers.suppliersPriceOpenDrawer,
  fetchingSupplierListError: suppliers.fetchingSupplierListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  updateSupplierModal: suppliers.updateSupplierModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersNotApprovalList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersNotApprovalList);