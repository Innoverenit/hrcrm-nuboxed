import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip, Popconfirm, Switch,Select } from "antd";
import {
  getShipperByUserId,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
  handleShipperAddress
} from "./ShipperAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import ShipperSearchedData from "./ShipperSearchedData";
import AddShipperAdressModal from "./AddShipperAdressModal";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApiIcon from '@mui/icons-material/Api';
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";

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

  useEffect(() => {
    setPage(page + 1);
    props.getShipperByUserId(props.userId, page);
    fetchApiKeyList();
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

const fetchApiKeyList = async () => {
  try {
    const response = await axios.get(`${base_url2}/DUMMY`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    });
    setstoredApiKey(response.data);
    // setLoading(false);
  } catch (error) {
    setErrorFetchApiKey(error);
    // setLoading(false);
  }
};
  const handleSelectedApiDropDown =  async (value,item) => {
    setSelectedApi(value);
    let payload={
      apiKey: value,
      shipperId:item.shipperId,
  }
    try {
      const response = await axios.put(`${base_url2}/change-toggle/DUMMY/${item.shipperId}`,payload,{  
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

  return (
    <>
      {props.shipperSerachedData.length > 0 ? (
    <ShipperSearchedData
    shipperSerachedData={props.shipperSerachedData}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
        <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky items-end  z-10">
            <div className="font-poppins font-bold text-[#00A2E8] truncate text-base w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Name */}
             <CategoryIcon
              className='!text-icon'
              /> {props.translatedMenuItems[0]}
              </div>
            <div className="font-poppins font-bold text-xs w-[7.2rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Phone */}
             <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>  {props.translatedMenuItems[1]} 
              </div>
            <div className="font-poppins font-bold text-xs w-[10.8rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Email */}
             <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c]'  />{props.translatedMenuItems[2]}
              </div>
            <div className="font-poppins font-bold text-xs w-[6.1rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Ship By */}
              <LocalShippingIcon className='!text-base mr-1 text-[#7dcfb6]'/>{props.translatedMenuItems[3]}
            </div>
            <div className=" font-poppins font-bold text-xs w-[18.7rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {/* Address */}
             <LocationOnIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[4]}
              </div>
            <div className="font-poppins font-bold text-xs w-[12.4rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* City */}
            <LocationOnIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[5]}
              </div>
            <div className="font-poppins font-bold text-xs w-[5.9rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* Pin Code */}
              {props.translatedMenuItems[6]}
              </div>
            <div className="font-poppins font-bold text-xs w-[13.24rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <ApiIcon className='!text-base  text-[#e4eb2f]'/> API</div>
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
                    <div  >
                      <div className="flex rounded max-sm:rounded-lg py-ygap
                max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                        <div class="flex max-sm:justify-between border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex font-medium w-[9.9rem] max-xl:w-[7.6rem] items-center justify-start h-8   bg-[#eef2f9] max-lg:w-[6.1rem] max-sm:w-auto  ">
                  
                         
                              <div class=" text-xs text-blue-500 ml-gap font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                  to={`shipper/${item.shipperId}`} title={item.shipperName}>
                                  {item.shipperName}
                                </Link>
                              </div>

                            </div>
                          </div>
                          <div className=" flex max-md:w-44 w-[7rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between w-full max-sm:flex-row ">
<div class="  text-xs ml-gap items-center  font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex   w-[10.3rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="flex  text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.emailId}
                            </div>
                          </div>

                          <div className=" flex  w-[6.12rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-xl:w-[3.72rem] max-lg:w-[4.72rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.shipByName}
                            </div>

                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                          <div className=" flex  w-[18.31rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[9.31rem] max-lg:w-[6.31rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
         
        `}
                            </div>
                          </div>
                          
                          <div className=" flex   w-[12.21rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[8.81rem] max-lg:w-[6.3rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                            <div class="  text-xs  font-poppins ml-gap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].city) ||
                                ""}
                            </div>
                          </div>
                    
                          <div className=" flex  w-[5.2rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">

                            <div class="  text-xs  ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {(item.address &&
                                item.address.length &&
                                item.address[0].postalCode) ||
                                ""}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                          <div className=" flex items-center justify-center w-[10rem] h-8 ml-gap  bg-[#eef2f9]">
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
                          <div class="flex max-sm:flex-row w-[8rem]  justify-end md:w-[3rem] max-sm:w-[25%] ">
                           
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
                            <Tooltip title={props.translatedMenuItems[9]}>
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato] max-sm:!text-2xl"

                                onClick={() => {
                                  props.setEditShipper(item);
                                  handleRowData(item);
                                  handleUpdateShipperModal(true);
                                  handleSetCurrentShipperId(item.shipperId);
                                }}
                              />
                            </Tooltip>
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
              && !props.fetchingShipperByUserId ? <NodataFoundPage /> : null}

          </InfiniteScroll>
        </div >
      </div>
      )}
      <UpdateShipperModal
        rowdata={rowdata}
        shipperId={currentShipperId}
        updateShipperModal={updateShipperModal}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        handleUpdateShipperModal={handleUpdateShipperModal}
        translatedMenuItems={props.translatedMenuItems}
      />
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
      />
    </>
  )
}
const mapStateToProps = ({ shipper, auth }) => ({
  shipperByUserId: shipper.shipperByUserId,
  userId: auth.userDetails.userId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  shipperSerachedData: shipper.shipperSerachedData,
  addShipperAddressModal: shipper.addShipperAddressModal
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
      handleShipperAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperCardList);