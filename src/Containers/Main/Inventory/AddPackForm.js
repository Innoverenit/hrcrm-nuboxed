
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url2 } from '../../../Config/Auth';
import axios from "axios";
import { Button } from "antd";

import {getPackData,getPackNo} from "../Inventory/InventoryAction";
import { useDispatch } from 'react-redux';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CloseIcon from '@mui/icons-material/Close';
import { Switch, Popconfirm, message } from 'antd';
import AddPacketTable from "./AddPacketTable";

const InputToggleForm = (props) => {
  const [fields, setFields] = useState([{ packingNo: '', packingInd: false }]); // Initial row with empty values
  const dispatch = useDispatch();
  // This useEffect ensures that when props change, the state is updated.
  useEffect(() => {
    if (props.packingNo !== undefined && props.packingInd !== undefined) {
      setFields([{ packingNo: props.packingNo, packingInd: props.packingInd }]);
    }
  }, [props.packingNo, props.packingInd]);

  // Function to send PUT request with correct payload
  const sendPutRequest = async (item) => {
    try {
      const response = await axios.post(
        `${base_url2}/dispatchPacking/dispatch-packing`,
        item,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      dispatch(getPackNo(response.data));
      dispatch(getPackData(props.orderPhoneId));
      if (response.data === 'Successfully !!!!') {
        message.success('Update successful');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Handle input blur event for a specific field
  const handleInputBlur = (e, index) => {
    const value = e.target.value.trim();  
    if (value === '') {
      return;  
    }
    const updatedValue = value === '' ? '0' : value; // Default to '0' if empty
    const updatedFields = [...fields];
    updatedFields[index].packingNo = updatedValue;
    setFields(updatedFields);
    // Send payload in the required format on blur
    sendPutRequest({ packingNo: updatedValue,orderId:props.orderPhoneId });
  };

  // Handle toggle change for a specific field
  const handleToggleChange = (confirm, index) => {
    if (confirm) {
      const updatedFields = [...fields];
      updatedFields[index].packingInd = !updatedFields[index].packingInd;
      setFields(updatedFields);
     
      // Send payload in the required format
      sendPutRequest({ packingInd: updatedFields[index].packingInd,orderId:props.orderPhoneId,packingNo:props.packNo.packingNo});
    } else {
      message.info('Toggle action cancelled');
    }
  };

  // Add more fields (empty input and toggle set to false)
  const addMoreFields = () => {
    setFields([...fields, { packingNo: '', packingInd: false }]); // Add a new row to the state
  };

  // Remove a field at the specified index
  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1); // Remove the selected row
    setFields(newFields);
  };
  // const showData = props.packData.map((item) => item.packingNo);
  const packingNumbers = props.packData.map(item => item.packingNo);

  // const showData = `${props.packData[0]?.packingNo}`;
  console.log( packingNumbers)
  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center">
          {/* Input field */}
          <div className="mb-4">
            <div className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`input-box-${index}`}>
              Packet ID
            </div>
            <input
              id={`input-box-${index}`}
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={field.packingNo}
              onBlur={(e) => handleInputBlur(e, index)}
              onChange={(e) => {
                const updatedFields = [...fields];
                updatedFields[index].packingNo = e.target.value;
                setFields(updatedFields);
              }}
              placeholder="Enter Packet ID"
            />
          </div>

          {/* Toggle switch */}
          <div className="flex items-center ml-4">
            <Popconfirm
              title="Are you sure to change the toggle state?"
              onConfirm={() => handleToggleChange(true, index)}
              onCancel={() => handleToggleChange(false, index)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checked={field.packingInd}
                className="toggle-checkbox"
                checkedChildren="Packed"
                unCheckedChildren="UnPacked"
              />
            </Popconfirm>
          </div>

          {/* Remove button */}
          <div className="w-4 mt-[1.5rem] ml-4">
            <CloseIcon onClick={() => removeField(index)} />
          </div>
        </div>
      ))}

      <Button type="primary" onClick={addMoreFields}>
       <ControlPointIcon/> Add Packet
      </Button>
      <AddPacketTable
      newOrderNo={props.newOrderNo}
      orderPhoneId={props.orderPhoneId}
      viewType={props.viewType}
      />
    </>
  );
};

const mapStateToProps = ({  inventory, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  packData:inventory.packData,
  packNo:inventory.packNo
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPackData,
      getPackNo
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InputToggleForm)



