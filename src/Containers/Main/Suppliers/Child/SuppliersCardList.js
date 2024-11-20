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
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PublishIcon from '@mui/icons-material/Publish';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import InventoryIcon from '@mui/icons-material/Inventory';
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import StoreIcon from '@mui/icons-material/Store';
import EuroIcon from '@mui/icons-material/Euro';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm, Tooltip } from "antd";
import { Link } from 'react-router-dom';
import UpdateSupplierModal from "./UpdateSupplierModal";
import SupplierPriceModal from "./SupplierPriceModal";
import SupplierAddListModal from "./SupplierAddListModal";
import SuplierPublishToggle from "./SuplierPublishToggle";
import SupplierSearchedData from "./SupplierSearchedData";
import SuplierNotApprovalPublish from "./SuplierNotApprovalPublish";
import AddSuppliersAdressModal from "./AddSuppliersAdressModal";
import EmptyPage from "../../EmptyPage";
import BorderColorIcon from "@mui/icons-material/BorderColor"; 

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
          <div className=" flex font-poppins text-xs justify-between w-[96%]  p-1 bg-transparent font-bold sticky items-end z-10 max-sm:hidden">
          <div className=" w-[9.91rem] truncate text-[#00A2E8] max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[14.9rem] text-base "> 
               {/* Supplier ID */}
              <CategoryIcon className=" text-base"/> {props.translatedMenuItems[40]} ID
               </div>
            <div className=" w-[11.4rem] truncate max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[11.8rem]">  
            {/* "Name" */}
            <ApartmentIcon className="!text-icon text-[#4f5d75] "/>  {props.translatedMenuItems[0]}
            </div>
            <div className=" w-[10.8rem] truncate max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[9.8rem]">
              {/* Phone  */}
              <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[13.92rem] truncate max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[14.9rem] "> 
            <MailOutlineIcon className="!text-icon  text-[#4f5d75]"/> {/* Email */}
               {props.translatedMenuItems[2]}
               </div>
               <div className=" w-[18.93rem]  truncate max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[14.9rem] "> 
               {/* URL */}
               <LinkIcon  className="!text-icon  text-[#4f5d75]"/>    {props.translatedMenuItems[41]}
               </div>
               <div className=" w-[8.5rem] truncate max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[14.9rem] "> 
               {/* Email */} <ConnectWithoutContactIcon className="!text-icon  text-[blue]" />
               {/* {props.translatedMenuItems[17]} */}Disqualify
               </div>     
            <div className=" w-[8.1rem] truncate max-md:text-[0.65rem] max-lg:text-[0.45rem] max-md:w-[14.9rem] "> <PublishIcon className="!text-icon  text-[#4f5d75]"/> {props.translatedMenuItems[38]}</div>
          </div>
          <div class="overflow-x-auto h-[83vh]">
            <InfiniteScroll
              dataLength={props.supplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierList ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
              height={"83vh"}
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
                          className="flex  rounded justify-between bg-white   items-center py-ygap  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:flex-col  max-sm:h-24  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class=" flex flex-row justify-between  w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-start items-center">
                            <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[9.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[10.1rem] max-lg:w-[8.06rem] ">
                            <div class=" text-xs ml-gap font-poppins max-sm:text-sm max-md:text-[0.65rem] max-lg:text-[0.45rem]">
                            {item.newSuppNo}
                            
</div>
                              </div>
                              <div className="  flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[11.2rem]  max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div>
                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 ml-gap underline font-bold font-poppins text-[#042E8A] cursor-pointer max-md:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
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
                              <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[10.1rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[5.01rem] max-lg:w-[5.9rem] ">

                                <div class=" text-xs  font-poppins ml-gap max-md:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {item.dialCode} {item.phoneNo}
                                </div>

                              </div>
                        
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[13.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs ml-gap  font-poppins max-md:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.emailId}
                                </div>

                              </div>
                    
                            </div>
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[19.2rem] max-md:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">


                              
</div>
                            </div>
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.1rem] max-md:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">
                            <div class=" text-xs max-sm:text-xs  font-poppins max-md:text-[0.65rem] max-lg:text-text-xs">
                           
                           <SuplierNotApprovalPublish
                            approvedInd={item.approvedInd}
                           supplierId={item.supplierId}
                           
                           />
                         </div>
                         </div>
                          
                                   {/* {countryCode}                        */}
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.2rem] max-md:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-md:text-[0.65rem] max-lg:text-[0.45rem]">
                               
                                <SuplierPublishToggle
                                  publishInd={item.publishInd}
                                  supplierId={item.supplierId}
                                />
                              </div>
                             
                            </div>                          
                            <div class="flex max-sm:w-wk items-center justify-end  h-8 ml-gap bg-[#eef2f9] max-sm:justify-evenly">
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
               <div>   <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"

                                // onClick={() => {
                                //   props.setEditCustomer(item);
                                //   handleUpdateCustomerModal(true);
                                //   handleSetCurrentCustomerId(item.customerId);

                                // }}
                              />   </div>               
                              <div>
                                <Tooltip title={props.translatedMenuItems[21]}>
                                  <Popconfirm
                                    title={`${props.translatedMenuItems[22]} ?`}
                                    onConfirm={() => props.deleteSupplierData(item.supplierId, props.userId)}
                                  >
                                  <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
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
                  !props.fetchingSupplierList ? <EmptyPage/> : null}
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