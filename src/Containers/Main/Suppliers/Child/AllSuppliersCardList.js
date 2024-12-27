import React, { Suspense, useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getAllSuppliersList,emptysUPPLIERS,
  deleteSupplierData,handleUpdateSupplierModal,
  setEditSuppliers,handleSuppliersAddress,updateSupplierById } from "../SuppliersAction"
import StoreIcon from '@mui/icons-material/Store';
import {Popconfirm,Tooltip,Input,Select } from "antd";
import dayjs from "dayjs";
import {getAllDialCodeList} from "../../../Auth/AuthAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link'; 
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";


const EmptyPage =lazy(()=>import("../../EmptyPage"));
const SupplierSearchedData =lazy(()=>import("./SupplierSearchedData"));
const AddSuppliersAdressModal =lazy(()=>import("./AddSuppliersAdressModal"));

const { Option } = Select;
function AllSuppliersCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState("");
  const [datadialcode, setdatadialcode] = useState(false);
  
  const handleSelectDialcode = () => {
      if (!datadialcode) {
        props.getAllDialCodeList();
        setdatadialcode(true);
      }
    };
  

  useEffect(() => {
    setPage(page + 1);
    props.getAllSuppliersList(props.orgId,page);
    // props.getAllDialCodeList();
  }, []);

  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = props.allSupplierList && props.allSupplierList.length &&props.allSupplierList[0].pageCount
    setTimeout(() => {
      const {
        getAllSuppliersList,
        orgId
      } = props;
      if  (props.allSupplierList)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getAllSuppliersList(orgId, page);
      }
      if (page === PageMapd){
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
return(
<>
{props.searchSupplierList.length > 0 ? (
    <SupplierSearchedData
    searchSupplierList={props.searchSupplierList}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
    <div className=" flex">
    <div className=' flex rounded w-[13vw] max-sm:w-[39vw] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
    <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[white] mt-1  items-center shadow-[#a3abb980] ">
     <div> Search team Member</div>
      </div>
      <div class="flex rounded w-[92%]  p-1 h-[73vh] box-content border bg-[white] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
       <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
      <div class="flex items-center flex-no-wrap h-16">
        <div class=" flex basis-[15%] mr-[0.2rem] h-15" >
          <MultiAvatar
            // primaryTitle={item.opportunityName}
            // imageId={item.imageId}
            imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
          />
        </div>
        
        <div class="flex basis-[100%] overflow-hidden">
        
        <div class="font-semibold text-[#337df4] cursor-pointer text-xs " >
      
  Itisri Chaudhury

      </div> 
      </div>
      </div>
      <div className="flex flex-col max-sm:justify-between ">
        
            <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
              97886556738              </div>
          
        <div>
        <div class="font-medium text-xs ">
     
            <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
             itisrichudhuryiti@gmail.com
            </div>         
        </div>
        </div>
        </div>
    </div>

      </div>
      </div>
<div className=' flex  sticky  z-auto'>
<div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
<div className=" flex max-sm:hidden ml-4 justify-between w-[99%]  p-1 bg-transparent font-bold font-poppins   !text-lm items-end sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
<div className=" w-[6.91rem] truncate text-[#00A2E8]  max-xl:w-[14.9rem] text-sm  "> 
               {/* Supplier ID */}
               <CategoryIcon className=" !text-icon"/>  {props.translatedMenuItems[40]} ID
               </div>
            <div className=" w-[16rem] truncate  max-xl:w-[11.8rem] "> 
                <ApartmentIcon className="!text-icon text-[#4f5d75] "/>   
                 {props.translatedMenuItems[0]}
                </div>
            <div className=" w-[8.1rem] truncate  max-xl:w-[9.8rem] ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> 
             {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[12.92rem] truncate  max-xl:w-[14.9rem]  ">    
              <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] ' />
               {props.translatedMenuItems[2]}</div>  
            <div className=" w-[16.94rem] truncate  max-xl:w-[14.9rem]  "> 
               {/* Supplier ID */}
               <LinkIcon  className="!text-icon  text-[#4f5d75]"/>  
                {props.translatedMenuItems[41]}
               </div>   
          <div className=" w-[11.91rem] truncate  max-xl:w-[14.9rem]  "> 
            <AccountCircleIcon className="!text-icon  text-[#f28482]"/>Owner</div>
          </div>
        <InfiniteScroll
        dataLength={props.allSupplierList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingSupplierList?<div class="text-center font-semibold text-xs">
          {props.translatedMenuItems[10]}...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
      >
{!props.fetchingSupplierList &&  props.allSupplierList===0 ? <Suspense> <EmptyPage /></Suspense> :props.allSupplierList.map((item) => {
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
  return (
    <>
        <div
                  className="flex rounded md:flex row-auto py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-38  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:flex-col ">
                          <div class=" flex flex-row justify-between  max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[7.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                          <div class=" text-xs ml-gap  max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {item.newSuppNo}                  
</div>
</div>
                            <div className=" h-8 flex items-center ml-gap w-[16.5rem] bg-[#eef2f9] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                              <div className="flex w-[100%]"  >
                              <a class="flex items-center w-[100%] overflow-ellipsis whitespace-nowrap h-8 p-1 text-[#042E8A] text-xs  underline font-bold  cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm" 
                            href={`/supplier/${item.supplierId}`}>{item.name}</a>
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
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                      </div>
                              </div>
                          
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem]  text-[tomato] font-bold"
                                    >
                                      {/* New */}               {props.translatedMenuItems[23]}
                                    </div>
                                  ) : null}
                            </div>       
                            </div>      
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">             
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[8.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">
                              <div class=" flex text-xs ml-gap  max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                              <div>
{editableField?.supplierId === item.supplierId && editableField?.field === 'dialCode' ? (
  <Select
  style={{ width: "8.2rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
  onFocus={handleSelectDialcode}
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
className="cursor-pointer text-xs ">
+{item.dialCode || "Update..."}&nbsp;

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
    className="cursor-pointer text-xs ">
    {item.phoneNo || "Update..."}
    
    </div> 
)}                 
                      </div>
                              </div>
                            </div>                                                 
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[12.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">
                                <div class="flex  text-xs ml-gap  max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
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
    className="cursor-pointer text-xs ">
    {item.emailId || "Update..."}
    
    </div> 
)}   
                              </div>
                            </div>
                                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[19.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">
{/* URL */}                           
</div>        
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.5rem] max-lg:w-[2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                    
                     <Tooltip title={item.userName}>
                 <span>
                   <MultiAvatar2
                     primaryTitle={item.userName}
                     imageId={item.ownerImageId}
                       imageURL={item.imageURL}
                       imgWidth={"1.8rem"}
                       imgHeight={"1.8rem"}
                     />
                   </span>
                     </Tooltip>
                           </div>
                           </div>
                           
                            <div class="flex max-sm:justify-evenly max-sm:w-wk items-center justify-end h-8 ml-gap bg-[#eef2f9]">
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
          <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-2xl"
          onClick={() => {
            props.handleSuppliersAddress(true);
            handleRowData(item);
          }}
          
        />            
 
          <div>
          <Popconfirm
              title={`${props.translatedMenuItems[22]} ?`}
             onConfirm={() => props.deleteSupplierData(item.supplierId)}
            >
            <DeleteOutlineIcon className="!text-icon text-[#ff6347] cursor-pointer"  />
            </Popconfirm>
            </div>
            </div> 
            </div>
           </div>
    </>
  )
})}
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
      /> 
      </Suspense>
</>
)
}
const mapStateToProps = ({ shipper, suppliers,auth }) => ({
  allSupplierList: suppliers.allSupplierList,
  userId: auth.userDetails.userId,
  fetchingSupplierList: suppliers.fetchingSupplierList,
  fetchingSupplierListError: suppliers.fetchingSupplierListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  orgId:auth.userDetails.organizationId,
  updateSupplierModal:suppliers.updateSupplierModal,
  searchSupplierList:suppliers.searchSupplierList,
  addSuppliersAddressModal: suppliers.addSuppliersAddressModal,
  dialcodeList:auth.dialcodeList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllSuppliersList,
      emptysUPPLIERS,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal,
      handleSuppliersAddress,
      getAllDialCodeList,
      updateSupplierById
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliersCardList);