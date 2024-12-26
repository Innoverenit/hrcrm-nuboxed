import React, { Suspense, useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {getAllDialCodeList} from "../../Auth/AuthAction";
import {getShipByData} from "../../Settings/Category/ShipBy/ShipByAction";
import {  Popconfirm,Switch,Input,Select } from "antd";
import {
  getAllShipperList,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
  handleShipperAddress
} from "./ShipperAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApiIcon from '@mui/icons-material/Api';
import Swal from 'sweetalert2'
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";
const AddShipperOrderModal =lazy(()=>import("./AddShipperOrderModal"));
const EmptyPage =lazy(()=>import("../EmptyPage"));
const ShipperSearchedData =lazy(()=>import("./ShipperSearchedData"));
const AddShipperAdressModal =lazy(()=>import("./AddShipperAdressModal"));

const { Option } = Select;
function AllShipperList(props) {
  const { handleUpdateShipperModal, updateShipperModal } = props;
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [editableField, setEditableField] = useState(null); 
const [editingValue, setEditingValue] = useState("");
const [dataShipper, setdataShipper] = useState([]);
const [datadialcode, setdatadialcode] = useState(false);

  useEffect(() => {
    setPage(page + 1);
    props.getAllShipperList(props.orgId,page);
    // props.getAllDialCodeList();
    props.getShipByData(props.orgId);
  }, []);

  const handleRowData = (data) => {
    setrowData(data);
  };
  useEffect(() => {
    setdataShipper(props.allShipper);
}, [props.allShipper]);

 const handleSelectDialcode = () => {
    if (!datadialcode) {
      props.getAllDialCodeList();
      setdatadialcode(true);
    }
  };
  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = dataShipper && dataShipper.length &&dataShipper[0].pageCount
    setTimeout(() => {
      const {
        getAllShipperList,
        orgId
      } = props;
      if  (dataShipper)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getAllShipperList(orgId, page);
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  const handleEditRowField = (shipperId, field, currentValue) => {
    setEditableField({ shipperId, field });  
    setEditingValue(currentValue);  
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleChangeRowSelectItem = async (value) => {
    setEditingValue(value);

      const { shipperId, field } = editableField;
      const updatedData = {};
      let mappedField = field;
    
      // Map the field to the correct key if needed
      if (field === 'shipByName') {
        mappedField = 'shipById'; 
      } else if (field === 'dialCode2') {
        mappedField = 'dialCode';
      } else if (field === 'shipperName') {
        mappedField = 'name';
      }
      updatedData[mappedField] = value; // Update the value with selected option
    
      try {
        const response = await axios.put(
          `${base_url2}/shipper/rowEdit/updateShipper/${shipperId}`,
          updatedData,
          {
            headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
            },
          }
        );
    
        // Update the customer list with the response data
        setdataShipper(prevData =>
          prevData.map(cat =>
            cat.shipperId === shipperId ? response.data : cat
          )
        );
        setEditableField(null); // Reset editable field
        setEditingValue(""); // Reset editing value
    
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Update successful',
          showConfirmButton: false,
          timer: 1500,
        });
    
      } catch (error) {
        console.error("Error updating item:", error);
        setEditableField(null); // Reset editable field on error
      }
    
  };
  const handleUpdateSubmit = async () => {
    const { shipperId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    if (field === 'shipByName') {
      mappedField = 'shipById'; 
    } else if (field === 'dialCode2') {
      mappedField = 'dialCode';
    } else if (field === 'shipperName') {
      mappedField = 'name';
    }
    updatedData[mappedField] = editingValue;

    try {
      const response = await axios.put(
        `${base_url2}/shipper/rowEdit/updateShipper/${shipperId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      setdataShipper(prevData => 
        prevData.map(cat =>
          cat.shipperId === shipperId ? response.data : cat
        )
      );
      setEditableField(null);
      setEditingValue("");
        Swal.fire({
          icon: 'success',
          title: 'Update successful',
          showConfirmButton: false,
          timer: 1500,
        });

    } catch (error) {
      console.error("Error updating item:", error);
      setEditableField(null);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateSubmit(); 
    }
  };
  return (
    <>
     {props.shipperSerachedData.length > 0 ? (
    <ShipperSearchedData
    shipperSerachedData={props.shipperSerachedData}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
      <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent sticky items-end !text-lm font-poppins font-bold  max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
            <div className=" text-[#00A2E8] text-sm w-[10.5rem] max-md:w-[10.5rem] truncate ">  
               <CategoryIcon className='!text-icon '/> {props.translatedMenuItems[0]}</div>
            <div className="  w-[6.01rem]  max-md:w-[6.01rem]] truncate ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>   {props.translatedMenuItems[1]}</div>
            <div className="  w-[9.8rem] max-md:w-[9.8rem] truncate ">
            <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />{props.translatedMenuItems[2]}</div>
            <div className="  w-[6.1rem] max-md:w-[6.1rem] truncate ">
            <LocalShippingIcon className='!text-base mr-1 text-[#7dcfb6]'/>{props.translatedMenuItems[3]}</div>
            <div className="  w-[18.7rem] max-md:w-[18.7rem] truncate "> 
            <LocationOnIcon className='!text-base  text-[#7b36eb]'/> {props.translatedMenuItems[4]}</div>
            <div className="  w-[12.4rem] max-md:w-[12.4rem] truncate ">
            <LocationOnIcon className='!text-base  text-[#7b36eb]'/>{props.translatedMenuItems[5]}</div>
            <div className="  w-[5.9rem] max-md:w-[5.9rem] truncate ">
            <LocationOnIcon className='!text-base  text-[#7b36eb]'/>
              {props.translatedMenuItems[6]}</div>
            <div className="  w-[13.24rem] max-md:w-[13.24rem] truncate ">
                <ApiIcon className='!text-base  text-[#f45236]'/>  API</div>
          </div>
          <InfiniteScroll 
        dataLength={dataShipper.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingAllShipper ? <div class="flex justify-center">{props.translatedMenuItems[8]}...</div> : null}
        height={"83vh"}
      >
        {!props.fetchingAllShipper && dataShipper.length === 0 ? <Suspense><EmptyPage /></Suspense> : dataShipper.map((item, index) => {
            return (
              <>
                <div  >
                      <div className="flex rounded md:flex row-auto py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-38  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:flex-col  ">
                      <div class="flex  border-l-2 border-green-500 bg-[#eef2f9] max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                        <div className=" flex  flex-row  w-[9.9rem] max-md:w-[9.9rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[7.6rem] max-lg:w-[6.1rem] max-sm:w-auto  ">

                 
                          <div class="flex w-[100%] text-xs text-blue-500  items-center font-poppins font-semibold  cursor-pointer">

<Link class="flex w-[100%] overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 items-center text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
  to={`/shipper/${item.shipperId}`} title={item.shipperName}>
  {item.shipperName}
</Link>
<div>
                      {editableField?.shipperId === item.shipperId &&
   editableField?.field === 'shipperName' ? (
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
    handleEditRowField(item.shipperId, 'shipperName', item.shipperName)} 
    className="cursor-pointer text-xs font-poppins opacity-0 hover:opacity-100">
   <BorderColorIcon  className=" !text-xs cursor-pointer"/>
    
    </div> 
)}                 
                      </div>
</div>

                   
                        </div>
                  
                        </div>
                      <div  className=" flex  max-md:flex-row">
                      <div className=" flex w-[7rem] max-md:w-[7rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between   md:w-[6rem] max-sm:flex-row ">
<div class="flex  text-xs ml-gap items-center  font-poppins">
<div>
{editableField?.shipperId === item.shipperId && editableField?.field === 'dialCode2' ? (
  <Select
  style={{ width: "8rem" }}
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
handleEditRowField(item.shipperId, 'dialCode2', item.dialCode2)} 
className="cursor-pointer text-xs font-poppins">
{item.dialCode2 || "Update..."}

</div>         
                        )}
                      </div>
                      <div>
                      {editableField?.shipperId === item.shipperId &&
   editableField?.field === 'phoneNo' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs ml-[0.25rem]"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.shipperId, 'phoneNo', item.phoneNo)} 
    className="cursor-pointer text-xs font-poppins ml-[0.25rem]">
    {item.phoneNo || "Update..."}
    
    </div> 
)}                 
                      </div>
</div>

</div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                        <div className=" flex  w-[10.3rem] max-md:w-[10.3rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-xs  ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {editableField?.shipperId === item.shipperId &&
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
    handleEditRowField(item.shipperId, 'emailId', item.emailId)} 
    className="cursor-pointer text-xs font-poppins">
    {item.emailId || "Update..."}
    
    </div> 
)}   
                          </div>

                        </div>

                        <div className=" flex   w-[6.12rem] max-md:w-[6.12rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-xs  ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          <div>
                              {editableField?.shipperId === item.shipperId &&
   editableField?.field === 'shipByName' ? (
<Select
      style={{ width: "8rem" }}
      value={editingValue}
      onChange={handleChangeRowSelectItem} 
      autoFocus
    >
     {props.ShipByData.map((ship) => (
                              <Option key={ship.shipById} value={ship.shipById}>
                                {ship.name}
                              </Option>
                            ))}
    </Select>
) : (
<div onClick={() => 
    handleEditRowField(item.shipperId, 'shipByName', item.shipByName)} 
    className="cursor-pointer text-xs font-poppins">
    {item.shipByName || "Update..."}
    </div> 
)}

                      </div>
                          </div>

                        </div>
                        </div>
                      </div>
                        
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                        <div className=" flex   w-[18.31rem] max-md:w-[18.31rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                          <div class=" font-normal text-xs  ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                          </div>

                        </div>
                        <div className=" flex   w-[12.21rem] max-md:w-[12.21rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                          <div class=" font-normal text-xs ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {(item.address &&
                              item.address.length &&
                              item.address[0].city) ||
                              ""}
                          </div>

                        </div>
                        <div className=" flex   w-[5.2rem] max-md:w-[5.2rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9]  max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

<div class=" font-normal text-xs ml-gap items-center font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
  {(item.address &&
    item.address.length &&
    item.address[0].postalCode) ||
    ""}
</div>

</div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                       <div class="flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[10.5rem]">                   
                          <Switch
                            className="toggle-clr"
                            //checked={item.productionInd}
                            isLoading={true}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                        <div className="flex justify-end items-center max-sm:w-wk ">
                          <div class="items-center  justify-center h-8  bg-[#eef2f9] flex">
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleShipperAddress(true);
            handleRowData(item);
          }}
          
        />    
        </div>
     
                          </div>
                          <div>

                            <Popconfirm
                              title={`${props.translatedMenuItems[10]}?`}
                              onConfirm={() => props.deleteShipperData(item.shipperId)}
                            >
                               <div class="items-center justify-center h-8 bg-[#eef2f9] flex">
                              <DeleteOutlineIcon
                                className=" !text-icon cursor-pointer text-[red]"

                              />
                              </div>
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
        )}
        <Suspense>
      
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        translatedMenuItems={props.translatedMenuItems}
      />
        <AddShipperAdressModal 
        item={rowdata}
         type="shipper"
         addShipperAddressModal={props.addShipperAddressModal}
         handleShipperAddress={props.handleShipperAddress}
      /></Suspense>
    </>
  )
}
const mapStateToProps = ({ shipper, auth,shipBy }) => ({
  allShipper: shipper.allShipper,
  userId: auth.userDetails.userId,
  fetchingAllShipper: shipper.fetchingAllShipper,
  fetchingAllShipperError: shipper.fetchingAllShipperError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  orgId:auth.userDetails.organizationId,
  shipperSerachedData: shipper.shipperSerachedData,
  addShipperAddressModal: shipper.addShipperAddressModal,
  dialcodeList:auth.dialcodeList,
  ShipByData:shipBy.ShipByData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateShipperModal,
      handleShipperActivityTableModal,
      handleShipperOrderModal,
      deleteShipperData,
      getAllShipperList,
      setEditShipper,
      handleShipperAddress,
      getAllDialCodeList,
      getShipByData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllShipperList);