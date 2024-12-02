import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Tooltip,Checkbox,Popconfirm } from "antd";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";
import AddScanModal from "./AddScanModal";
import {getSubList,handleScanModal} from "./InventoryAction";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import RepartitionIcon from '@mui/icons-material/Repartition';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ItemWiseReceivedModal from "./Child/InventoryDetails/InventoryMaterialTab/ItemWiseReceivedModal";
import Swal from 'sweetalert2';

function SubPackList(props) {


    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [inputValue, setInputValue] = useState(props.packingNo || '');
    const [loading, setLoading] = useState(true); 
    const [numberInput, setNumberInput] = useState('');

    const [cardData, setcardData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      props.getSubList(props.rowData.orderId) 
    }, [])
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
          
             "660",    // "Order",1
          "679",     // "Created",2
          "1377" , //    ship id
          "1078" ,  //   Save
          "1079" ,  //   Cancel
           
          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

    const [awbUpdate, setAwbUpdate] = useState(false)
    const handleAwbNoField = () => {
        setAwbUpdate(!awbUpdate)
    }
    const [awbNo, setAwbNo] = useState("")
    const[scandata,setScanData]= useState("")
    const handleAwbUpdate = (val) => {
        setAwbNo(val)
    }

    function handleSetScandata(item) {
      setScanData(item);
      // console.log("opp",item);
    }
    function handleCallback2() {
        setAwbUpdate(false)
        setAwbNo("")
    }
    const [subRow, setSubRow] = useState({});
    function handleSubOrderData(item) {
        setSubRow(item)
    }
      const sendPutRequest =  async (item) => {
    
    try {
        const response = await axios.put(`${base_url2}/dispatchPacking/dispatch-packing-item-link`,item, {  
          headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
       });
      
       if (response.data === 'Successfully !!!!') {
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };
  const sendInputPutRequest =  async (item) => {
    
    try {
        const response = await axios.put(`${base_url2}/dispatchPacking/dispatch-packing-item-link/unit`,item, {  
          headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
       });
      
       if (response.data === 'Successfully !!!!') {
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };
  const handleInputBlur = (productId,type,e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue(value);
    sendInputPutRequest({ packingUnits: value,
      orderId:props.rowData.orderId,
itemId:productId,
dispatchPackingId:props.rowData.dispatchPackingId,
 type:type,
userId:props.userId,
orgId:props.orgId,

     });
  };
  const handleInputBlur1 = (productId,type,e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setNumberInput(value);
    sendInputPutRequest({ manualNo : value ,
      orderId:props.rowData.orderId,
      itemId:productId,
      dispatchPackingId:props.rowData.dispatchPackingId,
      type:type,
      userId:props.userId,
      orgId:props.orgId,

    });
  };

  useEffect(()=>{
    setcardData(props.subList);
   },[]);        
   
   const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);  
    } else {
      const allPhoneIds = props.subList.map(item => item.phoneId);
      setSelectedItems(allPhoneIds);  
    }
    setSelectAll(!selectAll);
  };
  
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selected) => selected !== item.phoneId);
      } else {
        return [...prevSelected, item.phoneId];
      }
    });
  };
  const handleCheckBoxAll = async () => {
    setLoading(true);
    setError(null);

    const selectedItemsData = props.subList.filter(item => selectedItems.includes(item.phoneId));
    try {
      const response = await axios.post(`${base_url2}/dispatchPacking/multiple/repair-dispatch-packing-item`, {
        userId: props.userId,
        orgId: props.orgId,
        orderId:props.rowData.orderId,
        dispatchPackingId:props.rowData.dispatchPackingId,
        itemId: selectedItemsData.map(item => item.phoneId), 
        type:"procure",
        packingUnits:"",

      }, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      if (Array.isArray(response.data)) {
        setcardData(response.data);
      } else {
        console.error('Expected array but got:', response.data);
        setcardData([]);
      }
      const removeSelectedItems = (selectedPhoneIds) => {
        setcardData((prevData) => prevData.filter(item => !selectedPhoneIds.includes(item.phoneId)));
      };
      removeSelectedItems(selectedItems);
      setSelectedItems([]);
      setSelectAll(false);

      Swal.fire({
        title: 'Success!',
        text: 'Dispatched successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } 
    catch (err) {
      setError(err);
      Swal.fire({
        title: 'Error!',
        text: 'Not able to dispatched.',
        icon: 'error',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectedItems([]);
      setSelectAll(false);

    } finally {
      setLoading(false);
    }
  
  };

  const handleCheckBoxSingle = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${base_url2}/dispatchPacking/dispatch-packing-item-link/unit`, {
        userId: props.userId,
        orgId: props.orgId,
        orderId:props.rowData.orderId,
        dispatchPackingId:props.rowData.dispatchPackingId,
        itemId:item.phoneId, 
        type:"procure",
        packingUnits:"",

      }, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      if (Array.isArray(response.data)) {
        setcardData(response.data);
      } else {
        console.error('Expected array but got:', response.data);
        setcardData([]);
      }
      const removeSelectedItems = (selectedPhoneIds) => {
        setcardData((prevData) => prevData.filter(item => !selectedPhoneIds.includes(item.phoneId)));
      };
      removeSelectedItems([item.phoneId]);
      setSelectAll(false);
      setSelectedItems([]);
      Swal.fire({
        title: 'Success!',
        text: 'Dispatched successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      // props.setmodalMultiple(false);
      // props.getGeneratedInvoiveList(props.distributorId)
     
    } catch (err) {
      setError(err);
      Swal.fire({
        title: 'Error!',
        text: 'Not able to dispatched.',
        icon: 'error',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectAll(false);
      setSelectedItems([]);
    } 
    finally {
      setLoading(false);
    }
  };         
    return (
        <>
            <div className='flex  sticky z-auto w-wk'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky font-poppins text-lm z-10">
                    <div className="md:w-[2.01rem]">
          <Popconfirm
          title="Do you want to Dispatch all?"
          onConfirm={handleCheckBoxAll} 
          onCancel={() => setSelectAll(false)}
          okText="Yes"
          cancelText="No"
                    >
          <Tooltip title="Select All">
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
          </Tooltip>
          </Popconfirm>
          </div>
                        <div className=" md:w-[12rem] text-[#00A2E8]  text-sm">
                         <AddShoppingCartIcon className=" !text-icon "/>  items
                        </div>
                        <div className=" md:w-[10.1rem]"><AvTimerIcon className=" !text-icon text-[#14213D]"/> Units</div>
                        <div className=" md:w-[8.1rem]"><ShareLocationIcon className=" !text-icon text-[#00B4D8]"/> Zone</div>
                        <div className=" md:w-[7.1rem]"><MeetingRoomIcon className=" !text-icon text-[#F35B04]"/> Room</div>
                        <div className=" md:w-[6.1rem]"><RepartitionIcon className=" !text-icon text-[#FB6F92]"/> Rack</div>


                    </div>
                    <div class="overflow-x-auto ">
                        
                            {props.subList.map((item) => {
                                return ( 
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                        <div className="flex w-[1.5rem]">
                                        <Popconfirm
          title="Do you want to Dispatch ?"
          onConfirm={() => handleCheckBoxSingle(item)}
          onCancel={() => setSelectedItems([])}
          okText="Yes"
          cancelText="No"
                    >
          <Tooltip title="Select">
                           <Checkbox
                      checked={selectedItems.includes(item.phoneId)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    </Tooltip>
                    </Popconfirm>
                        </div>
                                           
                                           <div className="w-[12.1rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] ">{item.productFullName}</div> 
                                           <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.unit}</div>
                                          
                                           <div className=" flex w-36 items-center justify-center h-8 ml-gap bg-[#eef2f9]" >
                                           <input
            id="packingUnits"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={inputValue}
            onBlur={(e) => handleInputBlur(item.productId,item.type, e)}
            onChange={(e) => setInputValue(e.target.value)}
           placeholder="Enter number of packets"
          />
          </div>
          <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" ></div>
          <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" ></div>
          <div className="w-[12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" ></div>
          <div className="w-32 flex items-center justify-center h-8 ml-gap bg-[#eef2f9]" >
           <input
            id="manualNo"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={numberInput}
            onBlur={(e) => handleInputBlur1(item.productId,item.type, e)}
            onChange={(e) => setNumberInput(e.target.value)}
           placeholder="Enter number "
          />
          </div>
          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                            <Button
                                             onClick={() => {
                                              props.handleScanModal(true);
                                            handleSetScandata(item);
                                            }}
                                            >Scan</Button>
                                            </div>
                                        </div>
                                    </div>
                                 )
                            })} 
                       
                    </div>
                </div>
            </div>

            <AddScanModal
            scandata={scandata}
            orderId={props.rowData.orderId}
            newOrderNo={props.newOrderNo}
            dispatchPackingId={props.dispatchPackingId}
            addScanModal={props.addScanModal}
            handleScanModal={props.handleScanModal}
            />
           
        </>
    );
}

const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    subList:inventory.subList,
  orgId: auth.userDetails.organizationId,
    addScanModal:inventory.addScanModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSubList  ,
            handleScanModal   
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SubPackList);

