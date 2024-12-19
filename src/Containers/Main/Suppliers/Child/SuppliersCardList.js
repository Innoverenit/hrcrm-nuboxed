import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersList, emptysUPPLIERS, deleteSupplierData,
  handleUpdateSupplierModal, setEditSuppliers,
  handleSuppliersPriceDrawer,
  handleSuppliersListDrawer,
  handleSuppliersAddress,
  updateSupplierById
} from "../SuppliersAction"
import {getAllDialCodeList} from "../../../Auth/AuthAction";
import PublishIcon from '@mui/icons-material/Publish';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import StoreIcon from '@mui/icons-material/Store';
import EuroIcon from '@mui/icons-material/Euro';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm, Tooltip,Input,Select } from "antd";
import { Link } from 'react-router-dom';
import BorderColorIcon from "@mui/icons-material/BorderColor"; 
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';

const SupplierPriceModal =lazy(()=>import("./SupplierPriceModal"));
const SupplierAddListModal =lazy(()=>import("./SupplierAddListModal"));
const SuplierPublishToggle =lazy(()=>import("./SuplierPublishToggle"));
const SuplierNotApprovalPublish =lazy(()=>import("./SuplierNotApprovalPublish"));
const EmptyPage =lazy(()=>import("../../EmptyPage"));
const SupplierSearchedData =lazy(()=>import("./SupplierSearchedData"));
const AddSuppliersAdressModal =lazy(()=>import("./AddSuppliersAdressModal"));
 
const { Option } = Select;
function SuppliersCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);
  const [editableField, setEditableField] = useState(null); 
const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    setPage(page + 1);
    props.emptysUPPLIERS();
    props.getSuppliersList(props.userId, page);
    props.getAllDialCodeList();
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

  const handleEditRowField = (supplierId, field, currentValue) => {
    setEditableField({ supplierId, field });  
    setEditingValue(currentValue);  
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleUpdateSubmit = async () => {
    const { supplierId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    // if (field === 'shipByName') {
    //   mappedField = 'shipById'; 
    // } else if (field === 'dialCode2') {
    //   mappedField = 'dialCode';
    // } else if (field === 'shipperName') {
    //   mappedField = 'name';
    // }
    updatedData[mappedField] = editingValue;
    props.updateSupplierById(updatedData,supplierId)
    setEditableField(null);
      setEditingValue("");
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateSubmit(); 
    }
  };
  const handleChangeRowSelectItem = async (value) => {
    setEditingValue(value);

      const { supplierId, field } = editableField;
      const updatedData = {};
      let mappedField = field;
    
      // Map the field to the correct key if needed
      // if (field === 'shipByName') {
      //   mappedField = 'shipById'; 
      // } if (field === 'dialCode') {
      //   mappedField = 'dialCode';
      // } else if (field === 'shipperName') {
      //   mappedField = 'name';
      // }
      updatedData[mappedField] = value; // Update the value with selected option
      props.updateSupplierById(updatedData,supplierId)
      setEditableField(null);
      setEditingValue("");
    
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
        <div class=" m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex font-poppins text-xs justify-between w-[98%] max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm   p-1 bg-transparent font-bold sticky items-end z-10 max-sm:hidden">
          <div className=" w-[8.8rem] truncate text-[#00A2E8]  max-md:w-[14.9rem] text-sm  "> 
               {/* Supplier ID */}
              <CategoryIcon className=" !text-icon"/> {props.translatedMenuItems[40]} ID 
               </div>
            <div className=" w-[10.4rem] truncate  text-sm text-[#00A2E8] max-md:w-[11.8rem]">  
            {/* "Name" */}
            <ApartmentIcon className="!text-icon text-[#4f5d75] "/>  {props.translatedMenuItems[0]}
            </div>
            <div className=" w-[9rem] truncate  max-md:w-[9.8rem]">
              {/* Phone  */}
              <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[12.5rem] truncate  max-md:w-[14.9rem] "> 
            <MarkEmailUnreadIcon className='!text-icon  text-[#ff9f1c] ' /> {/* Email */}
               {props.translatedMenuItems[2]}
               </div>
               <div className=" w-[17.93rem]  truncate  max-md:w-[14.9rem] "> 
               {/* URL */}
               <LinkIcon  className="!text-icon  text-[#4f5d75]"/>    {props.translatedMenuItems[41]}
               </div>
               <div className=" w-[7.5rem] truncate  max-md:w-[7.5rem] "> 
               {/* Email */} <ExtensionOffIcon className='!text-icon mr-1 text-[#3a2cda] ' />
             
               {/* {props.translatedMenuItems[17]} */}Disqualify
               </div>     
            <div className=" w-[9.1rem] truncate  max-md:w-[9.1rem] "> 
              <PublishIcon className="!text-icon  text-[#4f5d75]"/> {props.translatedMenuItems[38]}</div>
          </div>
          <div class="overflow-x-auto h-[83vh]">
            <InfiniteScroll
              dataLength={props.supplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierList ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
              
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
                          className="flex rounded md:flex row-auto py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-38  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:flex-col">
                          <div class=" flex flex-row justify-between font-poppins w-wk max-sm:flex-col max-md:text-[0.65rem] max-lg:text-[0.45rem]">
                            <div class="flex max-sm:justify-start items-center">
                            <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[9.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[10.1rem] max-lg:w-[8.06rem] ">
                            <div class=" text-xs ml-gap  max-sm:text-sm ">
                            {item.newSuppNo}
                            </div>
                              </div>
                              <div className="  flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[11.2rem]  max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[10.1rem] max-lg:w-[8.06rem] ">
                            
                                  <Link class="w-[100%] overflow-ellipsis items-center  whitespace-nowrap h-8 text-xs p-1 ml-gap underline font-bold font-poppins text-[#042E8A] cursor-pointer max-md:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                    to={`supplier/${item.supplierId}`}
                                    title={`${item.name}`}
                                  >{item.name}</Link>

<div>
                      {editableField?.supplierId === item.supplierId &&
   editableField?.field === 'name' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.supplierId, 'name', item.name)} 
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
   
    
    </div> 
)}                 
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
                              <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[10.1rem] max-sm:justify-between  max-sm:flex-row max-md:w-[17.01rem] max-lg:w-[5.9rem] ">

                                <div class=" text-xs  font-poppins ml-gap max-md:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                <div>
{editableField?.supplierId === item.supplierId && editableField?.field === 'dialCode' ? (
  <Select
  style={{ width: "10rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
>
{props.dialcodeList.map((country) => (
   <Option key={country.country_dial_code} value={country.country_dial_code}>
  {country.country_dial_code}
   </Option>
 ))}
</Select>
) : (
<div onClick={() => 
handleEditRowField(item.supplierId, 'dialCode', item.dialCode)} 
className="cursor-pointer text-xs font-poppins">
{item.dialCode || "Update..."}

</div>         
                        )}
                      </div>
                      <div>
                      {editableField?.supplierId === item.supplierId &&
   editableField?.field === 'phoneNo' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.supplierId, 'phoneNo', item.phoneNo)} 
    className="cursor-pointer text-xs font-poppins">
    {item.phoneNo || "Update..."}
    
    </div> 
)}                 
                      </div>
                                </div>

                              </div>
                        
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[13.2rem] max-sm:justify-between  max-sm:flex-row max-md:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs ml-gap  font-poppins max-md:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {editableField?.supplierId === item.supplierId &&
   editableField?.field === 'emailId' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.supplierId, 'emailId', item.emailId)} 
    className="cursor-pointer text-xs font-poppins">
    {item.emailId || "Update..."}
    
    </div> 
)}   
                                </div>

                              </div>
                    
                            </div>
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[19.2rem] max-md:w-[5rem] max-lg:w-[10rem]  max-sm:justify-evenly  max-sm:flex-row ">                             
</div>
                            </div>
                            <div  className="flex  max-md:flex-row">
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.1rem] max-md:w-[5rem] max-lg:w-[3rem]  max-sm:justify-evenly  max-sm:flex-row ">
                            <div class=" text-xs max-sm:text-xs  font-poppins max-md:text-[0.65rem] max-lg:text-text-xs">
                           
                           <SuplierNotApprovalPublish
                            approvedInd={item.approvedInd}
                           supplierId={item.supplierId}
                           
                           />
                         </div>
                         </div>
                          
                                   {/* {countryCode}                        */}
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.2rem] max-md:w-[5rem] max-lg:w-[3rem]  max-sm:justify-evenly  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-md:text-[0.65rem] max-lg:text-[0.45rem]">
                               
                                <SuplierPublishToggle
                                  publishInd={item.publishInd}
                                  supplierId={item.supplierId}
                                />
                              </div>
                             
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
                              {/* <div>
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
                              </div> */}
                              <Tooltip title={props.translatedMenuItems[34]}>
                              <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-2xl"
          onClick={() => {
            props.handleSuppliersAddress(true);
            handleRowData(item);
          }}
          
        />      
               </Tooltip> 
               {/* <div>   <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]" */}

                               {/* onClick={() => { */}
                                {/* //   props.setEditCustomer(item);
                                //   handleUpdateCustomerModal(true);
                                //   handleSetCurrentCustomerId(item.customerId);

                                // }}
                              // />   </div>                */}
                              <div>
                                <Tooltip title={props.translatedMenuItems[21]}>
                                  <Popconfirm
                                    title={`${props.translatedMenuItems[22]} ?`}
                                    onConfirm={() => props.deleteSupplierData(item.supplierId, props.userId)}
                                  >
                                  <DeleteOutlineIcon ClassName="!text-icon text-[#ff6347] cursor-pointer"  />
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
                  !props.fetchingSupplierList ? <suspense><EmptyPage/></suspense> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>
 )}
 <Suspense>
    
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
      /> </Suspense>
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
  addSuppliersAddressModal: suppliers.addSuppliersAddressModal,
  dialcodeList:auth.dialcodeList,
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
      handleSuppliersAddress,
      updateSupplierById,
      getAllDialCodeList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersCardList);