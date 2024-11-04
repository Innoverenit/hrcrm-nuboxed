import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { Popconfirm, message, Switch } from 'antd';
import {
  getPackData
} from "./InventoryAction";
import { base_url2 } from "../../../Config/Auth";
import SubPackList from "./SubPackList";
import AddPackToggle from "./AddPackToggle";

function AddPacketTable(props) {
  const [rowToggleStates, setRowToggleStates] = useState({});
  const [loading, setLoading] = useState(true);

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

  const handleCheckAwb = () => {
      setCheckAwb(!checkAwb)
  }
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
    <div className="flex sticky z-auto">
      <div className="rounded m-1 p-1 w-full overflow-auto shadow bg-[#eaedf1]">
        <div className="flex justify-between w-full p-1 font-bold text-xs sticky z-10">
          <div className="w-[6.51rem]">Pack ID</div>
          <div className="w-[3.5rem]"></div>
        </div>
        {props.packData.map((item) => (
          <div key={item.key} className="flex rounded justify-between mt-1 bg-white items-center py-1 hover:shadow flex-col">
            <div className="flex justify-start w-wk">
                <div className=" flex   md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                         <div class=" text-xs  font-poppins text-center">
                                                        
                                                                 <AddIcon

                                                                     onClick={() => {
                                                                         handleCheckAwb();
                                                                        //handleSetParticularOrderData(item)
                                                                     }
                                                                     }
                                                                 />
                                                              
                                                         </div>
                                                   </div>
              <div className="flex w-[7.2rem] border-l-2 h-8 border-green-500 bg-[#eef2f9]">
                <div className="text-xs font-bold underline text-blue-600">
                  {item.packingNo}
                </div>
              </div>
              <div className="flex items-center ml-4">
              <AddPackToggle
                                
                                />
              </div>
            </div>
            {checkAwb &&
                   
                   <SubPackList />
               }
          </div>
        ))}
      </div>
    </div>
  );
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddPacketTable)
);
