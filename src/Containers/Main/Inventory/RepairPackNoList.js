
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Button,Tooltip,Checkbox,Popconfirm } from "antd";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";
import AddScanModal from "./AddScanModal"
import {getRepairSubList,handleScanModal} from "./InventoryAction";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import RepartitionIcon from '@mui/icons-material/Repartition';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

function RepairPackNoList(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [numberInput, setNumberInput] = useState('');
    const [cardData, setcardData] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchPackNoData()
    }, []);

    const [subRow, setSubRow] = useState({});
    function handleSubOrderData(item) {
        setSubRow(item)
    }
    const fetchPackNoData = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`${base_url2}/dispatchPacking/dispatch-packing-item/${props.rowData.dispatchPackingId}`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              }); 
              if (typeof response.data === 'string') {
                setMessage(response.data);
                setcardData([]);
              } else if (Array.isArray(response.data)) {
                setcardData(prevData => [...prevData, ...response.data]);
                setMessage("");
              } else {
            
              }
        } catch (error) {
            setError(error);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
        }
    };

  const deletePackNoRow =  async (item) => {
    
    try {
        const response = await axios.put(`${base_url2}/dispatchPacking/dispatch-item-packing/delete/${item.dispatchPackingLinkId}`,{}, {  
          headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
       });
      
       if (response.data === 'Deleted successfully') {
        const removeSelectedItems = (selectedIds) => {
            setcardData((prevData) => prevData.filter(item => !selectedIds.includes(item.dispatchPackingLinkId)));
          };
          removeSelectedItems([item.dispatchPackingLinkId]);
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };
   
       
    return (
        <>
     
                  
            <div className='flex  sticky z-auto w-wk'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky font-poppins text-lm z-10">
                        <div className=" md:w-[12rem] text-[#00A2E8]  text-sm">
                         <AddShoppingCartIcon className=" !text-icon "/>  items
                        </div>
                        <div className=" md:w-[10.1rem]"><AvTimerIcon className=" !text-icon text-[#14213D]"/> Units</div>
                        <div className=" md:w-[8.1rem]"><ShareLocationIcon className=" !text-icon text-[#00B4D8]"/> Zone</div>
                        <div className=" md:w-[7.1rem]"><MeetingRoomIcon className=" !text-icon text-[#F35B04]"/> Room</div>
                        <div className=" md:w-[6.1rem]"><RepartitionIcon className=" !text-icon text-[#FB6F92]"/> Rack</div>


                    </div>
                    <div class="overflow-x-auto ">

                            {cardData.map((item) => {
                                return ( 
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                           <div className="w-[12.1rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] ">{item.company}</div> 
                                           <div className=" flex w-36 items-center justify-center h-8 ml-gap bg-[#eef2f9]" >
                                          
          </div>
          <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.model}</div>
          <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.imei}</div>
          <div className="w-[12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.qcStatus}</div>
          <div className="w-32 flex items-center justify-center h-8 ml-gap bg-[#eef2f9]" >
    
          </div>
          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                            
                                            </div>
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                            <Popconfirm
                                                title="Do you want to delete?"
                                                onConfirm={() => deletePackNoRow(item)}
                                            >
                                                <Tooltip title="Delete">
                                                    <DeleteIcon
                                                        className="!text-base cursor-pointer text-[red]"
                                                    />
                                                </Tooltip>
                                            </Popconfirm>
                                            </div>
                                        </div>
                                    </div>
                                 )
                            })} 
                   
                    </div>
                </div>
            </div>     
           
        </>
    );
}

const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    repairSubList:inventory.repairSubList,
  orgId: auth.userDetails.organizationId,
    addScanModal:inventory.addScanModal,
    fetchingRepairSubList:inventory.fetchingRepairSubList
    
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairSubList,
            handleScanModal   
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairPackNoList);


