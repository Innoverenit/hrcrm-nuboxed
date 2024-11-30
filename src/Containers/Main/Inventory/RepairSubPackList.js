import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Button } from "antd";
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

function RepairSubPackList(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [inputValue, setInputValue] = useState(props.packingNo || '');
    const [loading, setLoading] = useState(true); 
    const [numberInput, setNumberInput] = useState('');
    const [cardData, setcardData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      // props.getRepairSubList(props.rowData.orderId,page)
      setPage(page + 1);
    }, []);
    
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
  const sendInputPutRequest =  async (item) => {
    
    try {
        const response = await axios.put(`${base_url2}/dispatchPacking/dispatch-item-packing/delete/${item.dispatchPackingLinkId}`,item, {  
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

  const handleLoadMore = () => {
    const PageMapd = props.repairSubList && props.repairSubList.length && props.repairSubList[0].pageCount
    setTimeout(() => {  
      if  (props.repairSubList)
      {
        if (page < PageMapd) {    
          setPage(page + 1);
          props.getRepairSubList(props.rowData.orderId,page)
            }
              if (page === PageMapd){
                setHasMore(false)
              }
            }
            }, 100);};

 useEffect(()=>{
  setcardData(props.repairSubList);
 },[]);           
            const handleCheckBox = async () => {
              setLoading(true);
              setError(null);

              const AllRowsSelected = selectedRows.map(orderId => {
                  const selectedRow = props.repairSubList.find(item => item.orderId === orderId);
                  return {
                      orderPhoneId: selectedRow ? selectedRow.orderId : "",
                  };
              });
      
              try {
                const response = await axios.post(`${base_url2}/dispatchPacking/dispatch-packing-item-link/unit`, {
                  userId: props.userId,
                  orgId: props.orgId,
                  AllRowsSelected,
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
                Swal.fire({
                  title: 'Success!',
                  text: 'Invoice generated successfully!',
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
                  text: 'There was an issue generating the invoice.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  showConfirmButton: false,
                  timer: 1500,
                });
              } finally {
                setLoading(false);
              }
              setSelectedRows([]);
            };
                       
            const handleRowSelection = (orderId) => {
              setSelectedRows(prevSelected => {
                if (prevSelected.includes(orderId)) {
                  return prevSelected.filter(id => id !== orderId);
                } else {
                  return [...prevSelected, orderId];
                }
              });
            };          
    return (
        <>
           <div className="ml-2 ">
                    
                    <Button type="primary" 
                    onClick={handleCheckBox}
                    >
                     Generate
                    </Button>
                    </div>
                  
            <div className='flex  sticky z-auto w-wk'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
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
                    <InfiniteScroll
            dataLength={props.repairSubList.length}
            next={handleLoadMore}
     hasMore={hasMore}
    //  initialLoad={true}
            loader={props.fetchingRepairSubList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"83vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
        >
                            {props.repairSubList.map((item) => {
                                return ( 
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                        <div className="flex w-[1.5rem]">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.orderId)}
                            onChange={() => handleRowSelection(item.orderId)}
                          />
                        </div>
                                           <div className="w-[12.1rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] ">{item.company}</div> 
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
          <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.model}</div>
          <div className="w-28 items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.imei}</div>
          <div className="w-[12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] flex" >{item.qcStatus}</div>
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
                          </InfiniteScroll>
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

export default connect(mapStateToProps, mapDispatchToProps)(RepairSubPackList);

