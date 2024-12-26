import React, { Suspense, useEffect, useState,lazy} from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm, Switch } from "antd";
import {
  getShipperByUserId,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
  handleShipperAddress,
} from "./ShipperAction";
import Swal from 'sweetalert2'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Input,Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApiIcon from '@mui/icons-material/Api';
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";

const AddShipperOrderModal =lazy(()=>import("./AddShipperOrderModal"));
const EmptyPage =lazy(()=>import("../EmptyPage"));
const ShipperSearchedData =lazy(()=>import("./ShipperSearchedData"));
const AddShipperAdressModal =lazy(()=>import("./AddShipperAdressModal"));
const { Option } = Select;

function ShipperCardList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal, updateShipperModal } = props;
  const [dataShipper, setdataShipper] = useState([]);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [toggleYes, settoggleYes] = useState({});
  const [tempToggleState, setTempToggleState] = useState({});
  const [SelectedApi,setSelectedApi] =useState("");
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
const[storedApiKey,setstoredApiKey]=useState([{apikeyId:"api1",apikeyName:"apiOne"},{apikeyId:"api2",apikeyName:"apiTwos"}]);
const[ErrorFetchApiKey,setErrorFetchApiKey]=useState(null);
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
    props.getShipperByUserId(props.userId, page);
    // fetchApiKeyList();
    // props.getAllDialCodeList();
    // props.getShipByData(props.orgId);
  }, []);

  useEffect(() => {
    setdataShipper(props.shipperByUserId);
}, [props.shipperByUserId]);


  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = dataShipper.map((item) =>
        item.orderId === key ? { ...item, [dataIndex]: value } : item
    );
    setdataShipper(updatedData);

};
const handleEditClick = (orderId) => {
  setEditsuppliesId(orderId);
};
const handleCancelClick = (orderId) => {
  setEditedFields((prevFields) => ({ ...prevFields, [orderId]: undefined }));
  setEditsuppliesId(null);
};

const handleToggleClick = (checked, shipperId) => {
  setTempToggleState(prevState => ({
    ...prevState,
    [shipperId]: checked, 
  }));
};
const handleToggleConfirm = (shipperId) => {
  settoggleYes(prevState => ({
    ...prevState,
    [shipperId]: tempToggleState[shipperId], 
  }));
  setEditsuppliesId(shipperId); 
};

// const fetchApiKeyList = async () => {
//   try {
//     const response = await axios.get(`${base_url2}/DUMMY`,{
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     });
//     setstoredApiKey(response.data);
//     // setLoading(false);
//   } catch (error) {
//     setErrorFetchApiKey(error);
//     // setLoading(false);
//   }
// };
  const handleSelectedApiDropDown =  async (value,item) => {
    setSelectedApi(value);
    let payload={
      apiKey: value,
      shipperId:item.shipperId,
  }
    try {
      const response = await axios.put(`${base_url2}/ApiKey/getBy/${props.orgId}`,payload,{  
          headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
       });
       if (response.dataShipper === 'Successfully order created..') {
        const updatedOrderItems = dataShipper.filter(itm => itm.shipperId !== item.shipperId);
        setdataShipper(updatedOrderItems);
      } else {
        console.log(response.dataShipper);
      }
        setEditsuppliesId(null);
      } catch (error) {
        console.error("Error updating item:", error);
        setEditsuppliesId(null);
      }
  }

  const handleLoadMore = () => {
    const PageMapd = dataShipper && dataShipper.length && dataShipper[0].pageCount
    setTimeout(() => {
      const {
        getShipperByUserId,
        userId
      } = props;
      if (dataShipper) {
        if (page < PageMapd) {
          setPage(page + 1);
          getShipperByUserId(userId, page);
        }
        if (page === PageMapd) {
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
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent  sticky items-end font-poppins font-bold !text-lm max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
            <div className=" text-[#00A2E8] truncate text-sm w-[10.5rem]  ">
             {/* Name */}
             <CategoryIcon
              className='!text-icon'
              /> {props.translatedMenuItems[0]}
              </div>
            <div className="  w-[7.2rem] max-md:w-[7.2rem] truncate  ">
             {/* Phone */}
             <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>  {props.translatedMenuItems[1]} 
              </div>
            <div className=" w-[10.8rem]  max-md:w-[10.8rem] truncate  ">
             {/* Email */}
             <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c]'  />{props.translatedMenuItems[2]}
              </div>
            <div className=" w-[6.1rem] max-md:w-[6.1rem] truncate  ">
              {/* Ship By */}
              <LocalShippingIcon className='!text-base mr-1 text-[#7dcfb6]'/>{props.translatedMenuItems[3]}
            </div>
            <div className="  w-[18.7rem] max-md:w-[18.7rem] truncate  ">
             {/* Address */}
             <LocationOnIcon className='!text-base  text-[#7b36eb]'/> {props.translatedMenuItems[4]}
              </div>
            <div className=" w-[12.4rem] max-md:w-[12.4rem] truncate  ">
            {/* City */}
            <LocationOnIcon className='!text-base  text-[#7b36eb]'/> {props.translatedMenuItems[5]}
              </div>
            <div className=" w-[5.9rem] max-md:w-[5.9rem] truncate  ">
            <LocationOnIcon className='!text-base  text-[#7b36eb]'/>{props.translatedMenuItems[6]}
            {/* Pin Code */}
              
              </div>
            <div className=" w-[13.24rem] max-md:w-[13.24rem] truncate  ">
            <ApiIcon className='!text-base  text-[#e74139]'/> API</div>
          </div>
          <InfiniteScroll
            dataLength={dataShipper.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingShipperByUserId ? <div className="flex justify-center" >{props.translatedMenuItems[8]}...</div> : null}
            height={"88vh"}
          >
            {dataShipper.length ? <>
              {dataShipper.map((item) => {
                return (
                  <>
                    <div>
                      <div className="flex rounded md:flex row-auto py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-38  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:flex-col ">
                        <div class="flex max-sm:justify-between border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-wk items-center max-sm:items-center max-md:flex-initial">
                          <div className=" flex font-medium  flex-row  w-[9.9rem] max-md:w-44 items-center justify-start h-8   bg-[#eef2f9] max-lg:w-[6.1rem] max-sm:w-auto  ">
                              <div class=" text-xs flex w-full    text-blue-500 ml-gap font-poppins font-semibold  cursor-pointer">
                                <Link class=" w-[100%]  overflow-ellipsis whitespace-nowrap items-center h-8 text-xs p-1 text-[#042E8A] cursor-pointer truncate   max-sm:text-xs"
                                  to={`shipper/${item.shipperId}`} title={item.shipperName}>
                                  {item.shipperName}
                                </Link>
                                <div>
                      {editableField?.shipperId === item.shipperId &&
   editableField?.field === 'shipperName' ? (
    <div className=" flex  ">
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onMouseDown={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
/></div>
) : (
<div onClick={() => 
    handleEditRowField(item.shipperId, 'shipperName', item.shipperName)} 
    className="cursor-pointer text-xs flex items-center font-poppins opacity-0 hover:opacity-100 ">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>   
    </div> 
)}                 
                      </div>
                              </div>
                            </div>
                          </div>

                          <div className=" flex  max-md:flex-row">
                          <div className=" flex max-md:w-48 w-[7rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row max-md:flex-initial ">
                              <div class="  text-xs ml-gap items-center truncate  font-poppins flex ">
                              {/* {item.dialCode} {item.phoneNo} */}

                              <div>
                              {editableField?.shipperId === item.shipperId && editableField?.field === 'dialCode2' ? (
                                <Select
                                style={{ width: "7rem" }}
                                value={editingValue}
                                onChange={handleChangeRowSelectItem} 
                                onBlur={() => handleEditRowField(null, null, null)}
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
                                className="h-7 w-[4rem] text-xs ml-[0.25rem] "
                                value={editingValue}
                                onChange={handleChangeRowItem}
                                onMouseDown={handleUpdateSubmit}
                                onKeyDown={handleKeyDown} 
                                onBlur={() => handleEditRowField(null, null, null)}
                                autoFocus
                              />
                              ) : (
                              <div onClick={() => 
                                  handleEditRowField(item.shipperId, 'phoneNo', item.phoneNo)} 
                                  className="cursor-pointer text-xs font-poppins truncate ml-[0.25rem]">
                                  {item.phoneNo || "Update..."}
                                  
                                  </div> 
                              )}                 
                                                    </div>
                              </div>

                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex   w-[10.3rem] max-md:w-[10.3rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="flex  text-xs ml-gap  font-poppins   max-sm:text-xs truncate">
                            {editableField?.shipperId === item.shipperId &&
                        editableField?.field === 'emailId' ? (
                      <Input
                        type="text"
                        className="h-7 w-[4rem] text-xs"
                        value={editingValue}
                        onChange={handleChangeRowItem}
                        onMouseDown={handleUpdateSubmit}
                        onKeyDown={handleKeyDown} 
                        onBlur={() => handleEditRowField(null, null, null)}
                        autoFocus
                    />
                              ) : (
                              <div onClick={() => 
                                  handleEditRowField(item.shipperId, 'emailId', item.emailId)} 
                                  className="cursor-pointer text-xs font-poppins truncate">
                                  {item.emailId || "Update..."}
                                  
                                  </div> 
                              )}   
                                                      
                       
                            </div>
                          </div>

                          <div className=" flex  w-[6.12rem] max-md:w-[6.12rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap   max-sm:text-xs truncate">
                              {/* {item.shipByName} */}
                              <div>
                              {editableField?.shipperId === item.shipperId &&
   editableField?.field === 'shipByName' ? (
<Select
      style={{ width: "6.12rem" }}
      value={editingValue}
      onChange={handleChangeRowSelectItem} 
      onBlur={() => handleEditRowField(null, null, null)}
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
                          <div className=" flex  w-[18.31rem] max-md:w-[18.31rem]  items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins   max-sm:text-xs truncate">
                              {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                            </div>
                          </div>
                          
                          <div className=" flex   w-[12.21rem] max-md:w-[12.21rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap   max-sm:text-xs truncate">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].city) ||
                                ""}
                            </div>
                          </div>
                    
                          <div className=" flex  w-[5.2rem] max-md:w-[5.2rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins   max-sm:text-xs truncate">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].postalCode) ||
                                ""}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                          <div className=" flex items-center justify-center w-[10rem] max-md:44 h-8 ml-gap  bg-[#eef2f9] truncate">
                          <Popconfirm
          title={`Do you want to change ${tempToggleState[item.shipperId] ? "No" : "Yes"}`}
          onConfirm={() => handleToggleConfirm(item.shipperId)} 
          okText="Yes"
          cancelText="No"
        >
          <Switch
           className="toggle-clr"
           checked={toggleYes[item.shipperId] || false}
           onChange={(checked) => handleToggleClick(checked, item.shipperId)}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
        {toggleYes[item.shipperId] && editsuppliesId === item.shipperId ? (
          <Select
           classNames="w-32"
         value={SelectedApi} 
          onChange={(value) => { handleSelectedApiDropDown(value,item)}}
          >
            {storedApiKey.map((item) => {
                                    return <Option value={item.apikeyId}>{item.apikeyName}</Option>;
                                })}
          {/* <Option value={"closedOrder"}>Opt1</Option>
          <Option value={"createRemainingOrder"}>Opt2</Option> */}
           </Select>
        ) : ""}   
                          </div>
                          <div class="flex justify-end max-sm:w-wk items-center">
                          <div class="flex max-sm:flex-row w-[8rem] max-md:44  ml-gap justify-end md:w-[3rem] max-sm:w-[25%] truncate ">
                           
                          <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                          <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleShipperAddress(true);
            handleRowData(item);
          }}         
        />      
       </div>

                  <div className=" flex items-center justify-center h-8  bg-[#eef2f9]">
                            <Popconfirm
                              title={`${props.translatedMenuItems[10]}?`}
                              onConfirm={() => props.deleteShipperData(item.shipperId, props.userId)}
                            >
                             <DeleteOutlineIcon 
                                className=" !text-icon cursor-pointer text-[red] "

                              />
                            </Popconfirm>
                            </div>
                         </div>
                        </div>
                        </div>
                      </div>
                    </div> 
                  </>
                )
              })}
            </> : !dataShipper.length
              && !props.fetchingShipperByUserId ?<Suspense> <EmptyPage /></Suspense> : null}

          </InfiniteScroll>
        </div >
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
  shipperByUserId: shipper.shipperByUserId,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
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
      getShipperByUserId,
      setEditShipper,
      handleShipperAddress,
      // getAllDialCodeList,
      // getShipByData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperCardList);