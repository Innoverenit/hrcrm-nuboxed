// import React, { useState,useEffect } from 'react';
// import { base_url2 } from '../../../Config/Auth';
// import axios from "axios";
// import { Button } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import { Switch, Popconfirm, message } from 'antd';

// const InputToggleForm = (props) => {
//   const [inputValue, setInputValue] = useState(props.noOfPacket || '');
//   const [toggleValue, setToggleValue] = useState(props.packetInd || false);
//   const [fields, setFields] = useState([{  noOfPacket: "", packetInd: ""  }]); // Form fields state


//   const addMoreFields = () => {
//     setFields([...fields, {  noOfPacket: "", packetInd: ""  }]); // Add a new row to the state
//   };

//   const removeField = (index) => {
//     const newFields = [...fields];
//     newFields.splice(index, 1); // Remove the selected row
//     setFields(newFields);
//   };

//   useEffect(() => {
//     setInputValue(props.noOfPacket);
//     setToggleValue(props.packetInd);
//   }, [props.noOfPacket, props.packetInd]);
//   const sendPutRequest =  async (item) => {
    
//     try {
//         const response = await axios.put(`${base_url2}/phoneOrder/noOfPacket/${props.orderPhoneId}`,item, {  
//           headers: {
//               Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
//           },
//        });
      
//        if (response.data === 'Successfully !!!!') {
//       } else {
//         console.log(response.data);
//       }
//       } catch (error) {
//         console.error("Error updating item:", error);
//       }
//   };

//   const handleInputBlur = (e) => {
//     const value = e.target.value === '' ? '0' : e.target.value; // Default to '0' if empty
//     setInputValue(value);
//     // Send payload in the required format on blur
//     sendPutRequest({ noOfPacket: value });
//   };

//   // Handle toggle change
//   const handleToggleChange = (confirm) => {
//     if (confirm) {
//       const newValue = !toggleValue;
//       setToggleValue(newValue);
//       // Send payload in the required format
//       sendPutRequest({ packetInd: newValue });
//     } else {
//       message.info('Toggle action cancelled');
//     }
//   };

//   return (
//     <>
//      {fields.map((field, index) => (
//     <div key={index} className="flex  items-center  ">
    
//         {/* Input field */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input-box">
//            Packet
//           </label>
//           <input
//             id="input-box"
//             type="text"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             defaultValue={inputValue}
//             onBlur={handleInputBlur}  
//             onChange={(e) => setInputValue(e.target.value)}
//            placeholder="Enter number of packets"
//           />
//         </div>

//         {/* Toggle switch */}
//         <div className="flex items-center ml-4">
//           <Popconfirm
//             title="Are you sure to change the toggle state?"
//             onConfirm={() => handleToggleChange(true)}
//             onCancel={() => handleToggleChange(false)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Switch
//               checked={toggleValue}
//               className="toggle-checkbox"
//                checkedChildren="Packed"
//                         unCheckedChildren="UnPacked"
//             />
//           </Popconfirm>
//         </div>
//         <div className="w-4 mt-[1.5rem]">
//                                             <CloseOutlined onClick={() => removeField(index)} />
//                                         </div>
//     </div>
//        ))}
//     <Button type="primary" onClick={addMoreFields}>
//                 Add Row
//             </Button>
//     </>
//   );
// };

// export default InputToggleForm;

import React, { useState, useEffect } from 'react';
import { base_url2 } from '../../../Config/Auth';
import axios from "axios";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Switch, Popconfirm, message } from 'antd';

const InputToggleForm = (props) => {
  const [fields, setFields] = useState([{ noOfPacket: '', packetInd: false }]); // Initial row with empty values

  // This useEffect ensures that when props change, the state is updated.
  useEffect(() => {
    if (props.noOfPacket !== undefined && props.packetInd !== undefined) {
      setFields([{ noOfPacket: props.noOfPacket, packetInd: props.packetInd }]);
    }
  }, [props.noOfPacket, props.packetInd]);

  // Function to send PUT request with correct payload
  const sendPutRequest = async (item) => {
    try {
      const response = await axios.put(
        `${base_url2}/phoneOrder/noOfPacket/${props.orderPhoneId}`,
        item,
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

  // Handle input blur event for a specific field
  const handleInputBlur = (e, index) => {
    const value = e.target.value === '' ? '0' : e.target.value; // Default to '0' if empty
    const updatedFields = [...fields];
    updatedFields[index].noOfPacket = value;
    setFields(updatedFields);
    // Send payload in the required format on blur
    sendPutRequest({ noOfPacket: value });
  };

  // Handle toggle change for a specific field
  const handleToggleChange = (confirm, index) => {
    if (confirm) {
      const updatedFields = [...fields];
      updatedFields[index].packetInd = !updatedFields[index].packetInd;
      setFields(updatedFields);
      // Send payload in the required format
      sendPutRequest({ packetInd: updatedFields[index].packetInd });
    } else {
      message.info('Toggle action cancelled');
    }
  };

  // Add more fields (empty input and toggle set to false)
  const addMoreFields = () => {
    setFields([...fields, { noOfPacket: '', packetInd: false }]); // Add a new row to the state
  };

  // Remove a field at the specified index
  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1); // Remove the selected row
    setFields(newFields);
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center">
          {/* Input field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`input-box-${index}`}>
              Packet
            </label>
            <input
              id={`input-box-${index}`}
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={field.noOfPacket}
              onBlur={(e) => handleInputBlur(e, index)}
              onChange={(e) => {
                const updatedFields = [...fields];
                updatedFields[index].noOfPacket = e.target.value;
                setFields(updatedFields);
              }}
              placeholder="Enter number of packets"
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
                checked={field.packetInd}
                className="toggle-checkbox"
                checkedChildren="Packed"
                unCheckedChildren="UnPacked"
              />
            </Popconfirm>
          </div>

          {/* Remove button */}
          <div className="w-4 mt-[1.5rem] ml-4">
            <CloseOutlined onClick={() => removeField(index)} />
          </div>
        </div>
      ))}

      <Button type="primary" onClick={addMoreFields}>
        Add Row
      </Button>
    </>
  );
};

export default InputToggleForm;
