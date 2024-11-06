import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from 'react-intl';
import { Badge, Button, Input } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";
import AddScanModal from "./AddScanModal"
import {getSubList,handleScanModal} from "./InventoryAction";


function SubPackList(props) {


    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [inputValue, setInputValue] = useState(props.packingNo || '');
    const [loading, setLoading] = useState(true); 
    const [numberInput, setNumberInput] = useState('');
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
        const response = await axios.put(`${base_url2}/phoneOrder/packingNo/${props.orderPhoneId}`,item, {  
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
  const handleInputBlur = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue(value);
    sendInputPutRequest({ packingUnits: value });
  };
  const handleInputBlur1 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setNumberInput(value);
    sendInputPutRequest({ manualNo : value });
  };
    return (
        <>
            <div className='flex  sticky z-auto w-wk'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[12rem]">
                            Product
                        </div>
                        <div className=" md:w-[10.1rem]">Units</div>
                        <div className=" md:w-[8.1rem]">Zone</div>
                        <div className=" md:w-[7.1rem]">Room</div>
                        <div className=" md:w-[6.1rem]">Rack</div>


                    </div>
                    <div class="overflow-x-auto ">
                        
                            {props.subList.map((item) => {
                                return ( 
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                           <div>{item.productFullName}</div> 
                                           <input
            id="packingUnits"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={inputValue}
            onBlur={handleInputBlur}  
            onChange={(e) => setInputValue(e.target.value)}
           placeholder="Enter number of packets"
          />
           <input
            id="manualNo"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={numberInput}
            onBlur={handleInputBlur1}  
            onChange={(e) => setNumberInput(e.target.value)}
           placeholder="Enter number "
          />
                                            <Button
                                             onClick={() => {
                                              props.handleScanModal(true);
                                            handleSetScandata(item);
                                            }}
                                            >Scan</Button>
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

