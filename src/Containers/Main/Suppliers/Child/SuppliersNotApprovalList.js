import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersNotApprovalList, 
  emptynotApprovedSuppliers,
  handleSuppliersAddress,
  updateSupplierById
} from "../SuppliersAction";
import {Input,Select } from "antd";
import {getAllDialCodeList} from "../../../Auth/AuthAction";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import BorderColorIcon from "@mui/icons-material/BorderColor";

const SuplierNotApprovalPublishToggle =lazy(()=>import("../Child/SuplierNotApprovalPublishToggle"));
const SupplierSearchedData =lazy(()=>import("./SupplierSearchedData"));
const EmptyPage =lazy(()=>import("../../EmptyPage"));
const AddSuppliersAdressModal =lazy(()=>import("./AddSuppliersAdressModal"));

const { Option } = Select;
function SuppliersNotApprovalList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);
  const [editableField, setEditableField] = useState(null); 
const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    setPage(page + 1);
    props.emptynotApprovedSuppliers();
    props.getSuppliersNotApprovalList(props.userId, page);
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
      updatedData[mappedField] = value; // Update the value with selected option
      props.updateSupplierById(updatedData,supplierId)
      setEditableField(null);
      setEditingValue("");
    
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
        <div class=" m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[97%]  p-1 bg-transparent font-bold font-poppins !text-lm text-xs sticky max-lg:text-[0.45rem] max-xl:w-[14.9rem]  max-xl:text-[0.65rem] max-lg:text-text-xs    items-end z-10">
          <div className=" w-[9.91rem] truncate text-[#00A2E8] text-sm "> 
               {/* Supplier ID */}
               <CategoryIcon className="!text-icon"/> {props.translatedMenuItems[40]} ID
               </div>
            <div className=" w-[13.4rem] max-md:w-[13.4rem] truncate "> 
              <ApartmentIcon className="!text-icon text-[#4f5d75] "/> {props.translatedMenuItems[0]} 
              </div>
            <div className=" w-[16.4rem] max-md:w-[16.4rem]  truncate ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>     {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[17.4rem] max-md:w-[17.4rem]  truncate  "> 
            <MailOutlineIcon className="!text-icon  text-[#ff9f1c]"/>  {props.translatedMenuItems[2]}</div>
            <div className=" w-[16.3rem] max-md:w-[16.3rem]  truncate  "> 
               {/* url */}
               <LinkIcon  className="!text-icon  text-[#4f5d75]"/>    {props.translatedMenuItems[41]}
               </div>
            <div className="w-[6.9rem] max-md:w-[13.4rem]  truncate ">
            <CheckCircleIcon className="!text-icon  text-[#4f5d75]"/>    {props.translatedMenuItems[17]}
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
                          className="flex rounded md:flex row-auto py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-38  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:flex-col ">
                          <div class=" flex flex-row justify-between  w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[9.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-md:w-[10.1rem] max-lg:w-[8.06rem]">
                            <div class=" text-xs ml-gap  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {item.newSuppNo}
                            </div>
                            </div>
                              <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[13.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div class="w-[100%] font-semibold text-[0.85rem] font-poppins">
                                  <Link class=" overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 underline text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm"
                                    to={`supplier/${item.supplierId}`}
                                    title={`${item.shipperName}`}
                                  >{item.name}</Link>
                                </div>
                                <div className="flex">
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
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100 ">
   <BorderColorIcon  className=" !text-xs cursor-pointer"/>
    
    </div> 
)}                 
                      </div>
                                {date === currentdate ? (
                                  <div class="text-[0.65rem]  text-[#ff6347] font-bold"
                                  >
                                    {/* New */} {props.translatedMenuItems[23]}
                                  </div>
                                ) : null}
                              </div>
                              <div className=" flex  items-center h-8 ml-gap bg-[#eef2f9] w-[16.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">

                                <div class="text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                <div>
{editableField?.supplierId === item.supplierId && editableField?.field === 'dialCode' ? (
  <Select
  style={{ width: "8rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
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
                            </div>
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[17.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
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
                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[16.2rem]  max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">



</div>                    
                            </div>                        
                   
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">
                              <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs">
                               <Suspense> <SuplierNotApprovalPublishToggle
                                 approvedInd={item.approvedInd}
                                supplierId={item.supplierId}
                                /></Suspense>
                              </div>
                              </div>  
            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[2.2rem]"> 
  <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleSuppliersAddress(true);
            handleRowData(item);
          }}
          
        />     
         <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"

                                // onClick={() => {
                                //   props.setEditCustomer(item);
                                //   handleUpdateCustomerModal(true);
                                //   handleSetCurrentCustomerId(item.customerId);

                                // }}
                              />              </div>

                          
                           
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.notApprovalSupplierList.length &&
                  !props.fetchingNotApprovalSupplierList ? <Suspense><EmptyPage /></Suspense> : null}
            </InfiniteScroll>
          </div> 
        </div>
      </div>
      )}
      <Suspense>
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
  addSuppliersAddressModal: suppliers.addSuppliersAddressModal,
  dialcodeList:auth.dialcodeList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersNotApprovalList,
      emptynotApprovedSuppliers,
      handleSuppliersAddress,
      updateSupplierById,
      getAllDialCodeList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersNotApprovalList);