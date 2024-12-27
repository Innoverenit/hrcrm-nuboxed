import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "axios";
import dayjs from "dayjs";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { message} from 'antd';
import {
  getPackData
} from "./InventoryAction";
import { base_url2 } from "../../../Config/Auth";
import SubPackList from "./SubPackList";
import AddPackToggle from "./AddPackToggle";
import RepairSubPackList from "./RepairSubPackList";
import RepairPackNoList from "./RepairPackNoList";
import CommercePackNoList from "./CommercePackNoList";

function AddPacketTable(props) {
  const [rowToggleStates, setRowToggleStates] = useState({});
  const [loading, setLoading] = useState(true);
   const [expandPackNo,setexpandPackNo]=useState(false);

  useEffect(() => {
    props.getPackData(props.orderPhoneId);
  }, []);

  useEffect(() => {
    // Initialize rowToggleStates with the existing packData state if available
    const initialToggleStates = {};
    props.packData.forEach(item => {
      initialToggleStates[item.key] = item.packingInd || false; // Set default or initial toggle state
    });
    setRowToggleStates(initialToggleStates);
  }, [props.packData]);
  const [checkAwb, setCheckAwb] = useState(false)
  const [rowData, setRowData] = useState({})
  const handleCheckAwb = () => {
      setCheckAwb(!checkAwb)
  }
  const handleRowData = (item) => {
    setRowData(item)
  }
  const handleExpandPackNo = ()=>{
setexpandPackNo(!expandPackNo);
  };
  const sendPutRequest = async (packingNo, newType) => {
    try {
      const response = await axios.post(
        `${base_url2}/dispatchPacking/dispatch-packing`,
        {
          packingInd: newType, 
          orderId: props.orderPhoneId,
          packingNo: packingNo
        },
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      if (response.data === 'Successfully !!!!') {
        message.success('Update successful');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
  
        
        <div className=' flex sticky h-[86vh] z-auto'>
            <div class="rounded  py-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className="flex justify-between w-full p-1 font-bold text-xs sticky z-10">
          <div className="w-[6.51rem]">Pack ID</div>
          <div className="w-[3.5rem]"></div>
        </div>

               
              
                   
                        <>
                            {props.packData.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div >
                                         <div key={item.key} className="flex rounded justify-between mt-1 bg-white items-center py-1 hover:shadow flex-col">
            <div className="flex justify-start w-wk">
                <div className=" flex   md:w-[2.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                         <div class=" text-xs  font-poppins text-center">
                                                         {item.packingInd?"":
                                                            <>
                                                            {!checkAwb ?
                                                                 <AddBoxIcon 
                                                                 className=" !text-icon items-center text-[#6f0080ad]"

                                                                     onClick={() => {
                                                                         handleCheckAwb();
                                                                         handleRowData(item)
                                                                     }}
                                                                 />:
                                                                 <CancelIcon 
                                                                 className=" !text-icon items-center text-[red]"
                                                                 onClick={() => {
                                                                  handleCheckAwb();
                                                                  handleRowData(item)
                                                              }}
                                                                 />}
                                                                 </>
                                                                 }
                                                              
                                                         </div>
                                                   </div>
              <div className="flex w-[7.2rem] border-l-2 h-8 border-green-500 bg-[#eef2f9]">
                <div className="text-xs font-bold underline text-blue-600 cursor-pointer"
                 onClick={() => {
                  handleExpandPackNo();
                  handleRowData(item)
              }}>
                  {item.packingNo}
                </div>
              </div>
              <div className="flex items-center  justify-end h-8 ml-gap bg-[#eef2f9] ">
              <AddPackToggle
              item={item}
              packData={props.packData}      
                />
              </div>
            </div>  
          </div>

                                        {checkAwb && (item.dispatchPackingId === rowData.dispatchPackingId) &&
                                         props.viewType==="commerce" &&
                                             <SubPackList 
                                             newOrderNo={props.newOrderNo}
                                                              rowData={rowData}
                                                              dispatchPackingId={item.dispatchPackingId}
                                                              />
                                        }
                                           {checkAwb && (item.dispatchPackingId === rowData.dispatchPackingId) &&
                                         props.viewType==="repair" &&
                                             <RepairSubPackList 
                                             newOrderNo={props.newOrderNo}
                                                              rowData={rowData}
                                                              dispatchPackingId={item.dispatchPackingId}
                                                              />
                                        }
                                        {expandPackNo && (item.dispatchPackingId === rowData.dispatchPackingId) &&
                                         props.viewType==="commerce" &&
                                             <CommercePackNoList 
                                             newOrderNo={props.newOrderNo}
                                                              rowData={rowData}
                                                              dispatchPackingId={item.dispatchPackingId}
                                                              />
                                        }
                                           {expandPackNo && (item.dispatchPackingId === rowData.dispatchPackingId) &&
                                         props.viewType==="repair" &&
                                             <RepairPackNoList 
                                             newOrderNo={props.newOrderNo}
                                                              rowData={rowData}
                                                              dispatchPackingId={item.dispatchPackingId}
                                                              />
                                        }
                                    </div>


                                )
                            })}
                        </> 
              


            </div>
        </div >
       
      
           
       
    </>
)
}

const mapStateToProps = ({ inventory, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  packData: inventory.packData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPackData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPacketTable)

