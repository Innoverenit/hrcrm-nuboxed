// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { base_url2 } from '../../../Config/Auth';
// import { Button } from "antd";
// import { withRouter } from "react-router-dom";
// import { Switch, Popconfirm, Input, message } from "antd";
// import axios from "axios";
// import { useDispatch } from 'react-redux';
// import {getPackData} from "../Inventory/InventoryAction";

// const AddPackFormID = (props) => {
//   const [isMultiple, setIsMultiple] = useState(false); // Toggle between single and multiple
//   const [trackIds, setTrackIds] = useState([]); // Store multiple Track IDs
//   const [singleTrackId, setSingleTrackId] = useState(""); // Store single Track ID for single mode
//   const dispatch = useDispatch();
//   // Function to send data to server when blur occurs
//   useEffect(() => {
//     props.getPackData(props.orderPhoneId);
//   }, []);
//   const sendDataToServer = async (item) => {
//     try {
//       const response = await axios.post(
//         `${base_url2}/dispatchPacking/dispatch-packing-link`,
//         item,
//         {
//           headers: {
//             Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
//           },
//         }
//       );
//      // dispatch(getPackData(props.orderPhoneId));
//       if (response.data === 'Successfully !!!!') {
//         message.success('Update successful');
//       } else {
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//   };
//   // Handle trackId blur for single mode
//   const handleSingleTrackIdBlur = (e) => {
//     const value = e.target.value;
//     setSingleTrackId(value);
//     const payload = { 
//         trackId: value,
//         orderId:props.orderPhoneId,
//         userId:props.userId,
//         orgId:props.orgId,
//         type:"single"

//      }; // Send single value for single mode
//     sendDataToServer(payload); // Send data on blur
//   };

//   // Handle trackId blur for multiple mode (individual submissions for each input)
//   const handleTrackIdBlur = (index) => (e) => {
//     const value = e.target.value;
//     const newTrackIds = [...trackIds];
//     newTrackIds[index] = value;
//     setTrackIds(newTrackIds);
//     // const packetId = index + 1;
//     // const packetId = packetIds[index];
//     const payload = { trackId: value,orderPhoneId:props.orderPhoneId,
//         // packetId: packetIds[index] 
//     }; // Send each Track ID individually
//     sendDataToServer(payload); // Send data on blur
//   };

//   // Toggle between single and multiple mode
//   const handleToggle = (checked) => {
//     setIsMultiple(checked);
//     setTrackIds([]); // Reset the inputs when toggling
//     setSingleTrackId(""); // Reset single input
//   };

//   return (
//     <div className="p-5">
//       <div className="flex items-center space-x-4 mb-4">
//         <Popconfirm
//           title={`Switch to ${isMultiple ? "Single" : "Multiple"} Mode`}
//           onConfirm={() => handleToggle(!isMultiple)}
//           okText="Yes"
//           cancelText="No"
//         >
//              <Switch
//                checked={isMultiple}
//                 className="toggle-checkbox"
//                 checkedChildren="Single"
//                 unCheckedChildren="Multiple"
//               />
//         </Popconfirm>
//       </div>

//       {isMultiple ? (
//         <div className="flex">
//           {/* Multiple mode: render Track ID and Packet ID based on noOfPacket */}
//           <div className="flex flex-col">
//             <div className="block font-bold">Track ID </div>
          
//             {props.packData.map((index) => {
//             <div key={index} className="mt-2"> 
//               <Input
//                 placeholder={`Enter Track ID ${index + 1}`}
//                 onBlur={handleTrackIdBlur(index)} // Send individual trackId on blur
//                 className="border p-2 w-full"
//               /> 
//             </div>
//         })}
//           </div>
//         </div>
//       ) : (
//         <div>
//           {/* Single mode input field */}
//           <div className="w-[35%]">
//             <div className="block font-bold">Track ID</div>
//             <Input
//               placeholder="Enter Track ID"
//               onBlur={handleSingleTrackIdBlur} // Send individual trackId for single mode
//               className="border p-2 w-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const mapStateToProps = ({  inventory, auth }) => ({
//     userId: auth.userDetails.userId,
//     orgId: auth.userDetails.organizationId,
//     packData:inventory.packData,
//     packNo:inventory.packNo
//   });
  
//   const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//       {
//         getPackData,
//       },
//       dispatch
//     );
  
//   export default withRouter(
//     connect(mapStateToProps, mapDispatchToProps)(AddPackFormID)
//   );


import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url2 } from '../../../Config/Auth';
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { Switch, Popconfirm, Input, message } from "antd";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getPackData } from "../Inventory/InventoryAction";

const AddPackFormID = (props) => {
  const [isMultiple, setIsMultiple] = useState(false); // Toggle between single and multiple
  const [trackIds, setTrackIds] = useState([]); // Store multiple Track IDs
  const [singleTrackId, setSingleTrackId] = useState(""); // Store single Track ID for single mode
  const dispatch = useDispatch();

  // Fetch pack data on component mount
  useEffect(() => {
    props.getPackData(props.orderPhoneId);
  }, []);

  // Function to send data to server when blur occurs
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

  // Handle trackId blur for single mode
  const handleSingleTrackIdBlur = (e) => {
    const value = e.target.value;
    setSingleTrackId(value);
    const payload = {
      trackId: value,
      orderId: props.orderPhoneId,
      userId: props.userId,
      orgId: props.orgId,
      type: "single",
      packingNo: 0 // Sending 0 packingNo for single mode
    };
    sendDataToServer(payload); // Send data on blur
  };

  // Handle trackId blur for multiple mode (individual submissions for each input)
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
      packingNo: packingNo, // Send corresponding packingNo
      dispatchPackingId:dispatchPackingId
    };
    sendDataToServer(payload); // Send data on blur
  };

  // Toggle between single and multiple mode
  const handleToggle = (checked) => {
    setIsMultiple(checked);
    setTrackIds([]); // Reset the inputs when toggling
    setSingleTrackId(""); // Reset single input
  };

  return (
    <div className="p-5">
      <div className="flex items-center space-x-4 mb-4">
        <Popconfirm
          title={`Switch to ${isMultiple ? "Single" : "Multiple"} Mode`}
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
          <div className="flex flex-col">
            <div className="block font-bold">Track ID </div>
            {props.packData.map((item, index) => (
              <div key={index} className="mt-2">
                <Input
                  placeholder={`Enter Track ID ${index + 1}`}
                  onBlur={handleTrackIdBlur(index, item.packingNo,item.dispatchPackingId)} // Send individual trackId on blur
                  className="border p-2 w-full"
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
              className="border p-2 w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ inventory, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  packData: inventory.packData,
  packNo: inventory.packNo,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPackData,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddPackFormID)
);