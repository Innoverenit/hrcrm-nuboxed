import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url2 } from '../../../Config/Auth';
import { Button, DatePicker } from "antd";

import { Switch, Popconfirm, Input, message,Select } from "antd";
import axios from "axios";
import { useDispatch } from 'react-redux';
import {getAllShipper} from "../Shipper/ShipperAction"
import { getPackData,  getPackAndTrack } from "../Inventory/InventoryAction";
const { Option } = Select;

const AddPackFormID = (props) => {
  const [isMultiple, setIsMultiple] = useState(false); 
  const [trackIds, setTrackIds] = useState([]); 
  const [singleTrackId, setSingleTrackId] = useState("");
  const dispatch = useDispatch();
  const [selectedShipper, setSelectedShipper] = useState("Select UOM");
  const [isTyping, setIsTyping] = useState(false); 
  // const [typingTimeout, setTypingTimeout] = useState(null); 


  useEffect(() => {
    props.getPackData(props.orderPhoneId);
    // props.getPackAndTrack(props.orderPhoneId)
    props.getAllShipper(props.orgId)
  }, []);

 
  const sendDataToServer = async (item) => {
    try {
      const response = await axios.post(
        `${base_url2}/dispatchPacking/dispatch-packing-link`,
        item,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      if (response.data === "Successfully !!!!") {
        message.success("Update successful");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const sendDataToSHipper = async (item) => {
    try {
      const response = await axios.put(
        `${base_url2}/dispatchPacking/dispatch-shipper/${props.orderPhoneId}`,
        item,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      if (response.data === "Successfully !!!!") {
        message.success("Update successful");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleSingleTrackIdBlur = (e) => {
    const value = e.target.value;
    setSingleTrackId(value);
    const payload = {
      trackId: value,
      orderId: props.orderPhoneId,
      userId: props.userId,
      orgId: props.orgId,
      type: "single",
      packingNo: 0
    };
    sendDataToServer(payload); 
  };
  const handleShipperChange = (shipperId) => {
    setSelectedShipper(shipperId); // Set selected shipper ID
  
    // Define the payload for the server request
    const payload = {
      orderId: props.orderPhoneId,
      // userId: props.userId,
      // orgId: props.orgId,
      shipperId: shipperId,
    };
  
    sendDataToSHipper(payload); // Send data on selection
  };
  const handleTrackIdBlur = (index, packingNo,dispatchPackingId) => (e) => {
    const value = e.target.value;
    const newTrackIds = [...trackIds];
    newTrackIds[index] = value;
    setTrackIds(newTrackIds);

    const payload = {
      trackId: value,
      orderId: props.orderPhoneId,
      userId: props.userId,
      orgId: props.orgId,
      type: "multiple",
      packingNo: packingNo,
      dispatchPackingId:dispatchPackingId
    };
    sendDataToServer(payload); 
  };


  const handleToggle = (checked) => {
    setIsMultiple(checked);
    setTrackIds([]); 
    setSingleTrackId("");
  };
  const handleTrackIdChange = () => {
    setIsTyping(true);
    // if (typingTimeout) {
    //   clearTimeout(typingTimeout);
    // }
    // setTypingTimeout(setTimeout(() => {
    //   setIsTyping(false); 
    // }, 1000)); 
  };
  const handleTrackIdInputBlur = () => {
    setIsTyping(false);
  };
  return (
    <>
   <div className="p-5">
   {!isTyping && (
                 <Select
                    style={{ width: "12rem" }}
                    onChange={handleShipperChange}
                    placeholder="Select Shipper"
                  >
                    {props.allShipperList.map((shipper) => (
                      <Option key={shipper.shipperId} value={shipper.shipperId}>
                        {shipper.shipperName}
                      </Option>
                    ))}
                  </Select>
   )}
   </div>
    <div className="p-5">
      <div className="font-semibold text-sm">Tag Track ID ?</div>
      <div className="flex items-center space-x-4 mb-4 mt-1">
        <Popconfirm
          title={`Switch to ${isMultiple ? "Single" : "Multiple"} Packet Mode`}
          onConfirm={() => handleToggle(!isMultiple)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={isMultiple}
            className="toggle-checkbox"
            checkedChildren="Single"
            unCheckedChildren="Multiple"
          />
        </Popconfirm>
      </div>

      {isMultiple ? (
        <div className="flex">
          {/* Multiple mode: render Track ID and Packet ID based on noOfPacket */}
          <div className="flex flex-col ">
            <div className="block font-bold">Packing No</div>
            {props.packData.map((item, index) => (
              <div key={index} className="mt-2">
                <Input
                  // placeholder={`Enter Track ID ${index + 1}`}
                value={item.packingNo || 0}
                  className="border p-2 w-full"
                  disabled
                />
                {/* {item.packingNo} */}
              </div>
            ))}
          </div>
          <div className="flex flex-col ml-4">
            <div className="block font-bold">Track ID </div>
            {props.packData.map((item, index) => (
              <div key={index} className="mt-2">
                <Input
                  placeholder={`Enter Track ID ${index + 1}`}
                  onBlur={handleTrackIdBlur(index, item.packingNo,item.dispatchPackingId)} // Send individual trackId on blur
                  onChange={handleTrackIdChange} 
                  className="border p-2 w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col ml-4">
            <div className="block font-bold">Date</div>
            {props.packData.map((item, index) => (
              <div key={index} className="mt-2">
               <DatePicker
               
               />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Single mode input field */}
          <div className="w-[35%]">
            <div className="block font-bold">Track ID</div>
            <Input
              placeholder="Enter Track ID"
              onBlur={handleSingleTrackIdBlur} // Send individual trackId for single mode
              onChange={handleTrackIdChange} 
              className="border p-2 w-full"
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

const mapStateToProps = ({ inventory,shipper, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  packData: inventory.packData,
  packNo: inventory.packNo,
  allShipperList:shipper.allShipperList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPackData,
      getPackAndTrack,
      getAllShipper
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPackFormID)
