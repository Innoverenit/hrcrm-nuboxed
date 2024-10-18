import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersList, emptysUPPLIERS, deleteSupplierData,
  handleUpdateSupplierModal, setEditSuppliers,
  handleSuppliersPriceDrawer,
  handleSuppliersListDrawer,
  handleSuppliersAddress
} from "../SuppliersAction"
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import StoreIcon from '@mui/icons-material/Store';
import EuroIcon from '@mui/icons-material/Euro';
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import UpdateSupplierModal from "./UpdateSupplierModal";
import SupplierPriceModal from "./SupplierPriceModal";
import SupplierAddListModal from "./SupplierAddListModal";
import SuplierPublishToggle from "./SuplierPublishToggle";
import SupplierSearchedData from "./SupplierSearchedData";
import SuplierNotApprovalPublish from "./SuplierNotApprovalPublish";
import AddSuppliersAdressModal from "./AddSuppliersAdressModal";

function SuppliersCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    setPage(page + 1);
    props.emptysUPPLIERS();
    props.getSuppliersList(props.userId, page);
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
        getSuppliersList,

        userId
      } = props;
      if (props.supplierList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliersList(userId, page);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };

  // useEffect(() => {
  //   props.emptysUPPLIERS();
  // }, []);

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
          <div className=" flex font-poppins text-xs justify-between w-[90%]  p-1 bg-transparent font-bold sticky  z-10 max-sm:hidden">
            <div className=" w-[18.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">  
            {/* "Name" */}
            {props.translatedMenuItems[0]}
            </div>
            <div className=" w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
              {/* Phone  */}
               {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[21.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               {/* Email */}
               {props.translatedMenuItems[2]}
               </div>
               <div className=" w-[6.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               {/* Email */}
               {/* {props.translatedMenuItems[17]} */}Disqualify
               </div>
            {/* <div className="w-[10.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.5rem]">
             Country 
             {props.translatedMenuItems[3]}

            </div> */}

            {/* <div class=" w-[5.001rem]"> {props.translatedMenuItems[17]}</div> */}
            <div className=" w-[18.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] ">  {props.translatedMenuItems[38]}</div>
          </div>
          <div class="overflow-x-auto h-[80vh]">
            <InfiniteScroll
              dataLength={props.supplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierList ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
              height={"80vh"}
            >
              {props.supplierList.length ?
                <>
                  {props.supplierList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    // const countryCode = item.address[0].countryAlpha2Code;
                    const countryCode = item.address?.[0]?.countryAlpha2Code ?? "None";
                    console.log(countryCode)
                   
                    return (
                      <>
                        <div
                          className="flex  rounded justify-between bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:flex-col  max-sm:h-24  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-start items-center">
                              <div className="  flex border-l-2 border-green-500 bg-[#eef2f9] w-[9.9rem] h-8 max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div>
                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1  underline font-bold font-poppins text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                    to={`supplier/${item.supplierId}`}
                                    title={`${item.shipperName}`}
                                  >{item.name}</Link>

                                </div>

                                {date === currentdate ? (
                                  <div class="text-[0.65rem]  text-[tomato] font-bold"
                                  >
                                    {/* New */}
                                    {props.translatedMenuItems[23]}
                                  </div>
                                ) : null}
                              </div>
                              </div>
                              <div class="flex max-sm:justify-evenly items-center">
                              <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[8.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">

                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {item.dialCode} {item.phoneNo}
                                </div>

                              </div>
                        
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[13.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {item.emailId}
                                </div>

                              </div>
                    
                            </div>
                            </div>
                            <div class=" text-xs max-sm:text-xs items-center justify-center h-8 ml-gap bg-[#eef2f9] font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs">
                           
                           <SuplierNotApprovalPublish
                            approvedInd={item.approvedInd}
                           supplierId={item.supplierId}
                           
                           />
                         </div>
                          
                                   {/* {countryCode}                        */}
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                               
                                <SuplierPublishToggle
                                  publishInd={item.publishInd}
                                  supplierId={item.supplierId}
                                />
                              </div>
                             
                            </div>                          
                            <div class="flex max-sm:w-wk items-center justify-end h-8 ml-gap bg-[#eef2f9] max-sm:justify-evenly">
                              <div>
                                <Tooltip title={props.translatedMenuItems[18]}>
                                  <StoreIcon
                                    className="!text-icon cursor-pointer text-[#ff66b3] max-sm:!text-2xl"
                                  // onClick={() => {
                                  //    props.setEditSuppliers(item);
                                  //   handleRowData(item);
                                  //   props.handleSuppliersPriceDrawer(true);
                                  // }}
                                  />
                                </Tooltip>
                              </div>

                              <div>
                                <Tooltip title={props.translatedMenuItems[19]}>
                                  <EuroIcon
                                    className="!text-icon cursor-pointer text-[blue] max-sm:!text-2xl"
                                    onClick={() => {
                                      props.setEditSuppliers(item);
                                      handleRowData(item);
                                      props.handleSuppliersPriceDrawer(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              <div>
                                <Tooltip title={props.translatedMenuItems[39]}>
                                  <InventoryIcon
                                    className="!text-icon cursor-pointer text-[green] max-sm:!text-2xl"
                                    onClick={() => {
                                      props.setEditSuppliers(item);
                                      handleRowData(item);
                                      props.handleSuppliersListDrawer(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              <Tooltip title={props.translatedMenuItems[34]}>
                              <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-2xl"
          onClick={() => {
            props.handleSuppliersAddress(true);
            handleRowData(item);
          }}
          
        />      
               </Tooltip>                
                              <div>
                                <Tooltip title={props.translatedMenuItems[21]}>
                                  <Popconfirm
                                    title={`${props.translatedMenuItems[22]} ?`}
                                    onConfirm={() => props.deleteSupplierData(item.supplierId, props.userId)}
                                  >
                                    <DeleteOutlined

                                      className=" !text-icon cursor-pointer text-[red]"
                                    />
                                  </Popconfirm>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplierList.length &&
                  !props.fetchingSupplierList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>
 )}
      <UpdateSupplierModal
        rowdata={rowdata}
        updateSupplierModal={props.updateSupplierModal}
        handleRowData={handleRowData}
        handleUpdateSupplierModal={props.handleUpdateSupplierModal}
        translatedMenuItems={props.translatedMenuItems}
      />
      <SupplierPriceModal
        rowdata={rowdata}
        suppliersPriceOpenDrawer={props.suppliersPriceOpenDrawer}
        handleRowData={handleRowData}
        handleSuppliersPriceDrawer={props.handleSuppliersPriceDrawer}
        translatedMenuItems={props.translatedMenuItems}

      />
      <SupplierAddListModal
        rowdata={rowdata}
        suppliersListOpenDrawer={props.suppliersListOpenDrawer}
        handleRowData={handleRowData}
        handleSuppliersListDrawer={props.handleSuppliersListDrawer}
        translatedMenuItems={props.translatedMenuItems}
      />
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
      getSuppliersList,
      emptysUPPLIERS,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal,
      handleSuppliersPriceDrawer,
      handleSuppliersListDrawer,
      handleSuppliersAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersCardList);