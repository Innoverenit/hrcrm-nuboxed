import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersNotApprovalList, 
  emptynotApprovedSuppliers,
  handleSuppliersAddress
} from "../SuppliersAction"
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InfiniteScroll from "react-infinite-scroll-component";
import SuplierNotApprovalPublishToggle from "../Child/SuplierNotApprovalPublishToggle"
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import SupplierSearchedData from "./SupplierSearchedData";
import AddSuppliersAdressModal from "./AddSuppliersAdressModal";

function SuppliersNotApprovalList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    setPage(page + 1);
    props.emptynotApprovedSuppliers();
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
     {props.searchSupplierList.length > 0 ? (
    <SupplierSearchedData
    searchSupplierList={props.searchSupplierList}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
        <div class=" m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">
          <div className=" w-[8.91rem] text-[#00A2E8] text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               {/* Supplier ID */}
               {props.translatedMenuItems[40]} ID
               </div>
            <div className=" w-[11.4rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[11.8rem]">  {props.translatedMenuItems[0]} </div>
            <div className=" w-[15.8rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[9.8rem]">
            {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[11.91rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[14.9rem] "> 
            {props.translatedMenuItems[2]}</div>
            <div className=" w-[8.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               {/* url */}
               {props.translatedMenuItems[41]}
               </div>
            <div className="w-[9.9rem] max-xl:text-[0.65rem] max-lg:text-text-xs max-xl:w-[9.5rem]">
            {props.translatedMenuItems[17]}
            {/* Approve */}
            </div>

          </div>
         <div class="overflow-x-auto h-[83vh]">
            <InfiniteScroll
              dataLength={props.notApprovalSupplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingNotApprovalSupplierList ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
              height={"83vh"}
              style={{scrollbarWidth:"thin"}}
            >
              {props.notApprovalSupplierList.length ?
                <>
                  {props.notApprovalSupplierList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  
                    return (
                      <>
                        <div
                          className="flex  rounded justify-between bg-white   items-center py-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:flex-col  max-sm:h-[6rem]  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class=" flex flex-row justify-between  w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[9.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                            <div class=" text-xs ml-gap  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {item.newSuppNo}
                            
</div>


</div>
                              <div className=" h-8  flex items-center h-8 ml-gap bg-[#eef2f9] w-[13.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div class=" font-semibold text-[0.85rem] font-poppins">
                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 underline text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm"
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
                              <div className=" flex  items-center h-8 ml-gap bg-[#eef2f9] w-[16.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">

                                <div class="text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                  {item.dialCode} {item.phoneNo}
                                </div>

                              </div>
                            </div>
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[17.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                  {item.emailId}
                                </div>
                              </div>      
                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[16.2rem]  max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">



</div>                    
                            </div>                        
                   
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">
                              <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs">
                                <SuplierNotApprovalPublishToggle
                                 approvedInd={item.approvedInd}
                                supplierId={item.supplierId}
                                />
                              </div>
                              </div>  
            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[2.2rem]"> 
  <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleSuppliersAddress(true);
            handleRowData(item);
          }}
          
        />                   </div>

                          
                           
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
      )}
      <AddSuppliersAdressModal    
        item={rowdata}
         type="supplier"
         addSuppliersAddressModal={props.addSuppliersAddressModal}
         handleSuppliersAddress={props.handleSuppliersAddress}
      /> 
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
  searchSupplierList:suppliers.searchSupplierList,
  addSuppliersAddressModal: suppliers.addSuppliersAddressModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersNotApprovalList,
      emptynotApprovedSuppliers,
      handleSuppliersAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersNotApprovalList);