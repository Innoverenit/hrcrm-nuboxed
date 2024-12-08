import React, { lazy, useEffect, useState, } from "react";
import { Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { QrReader } from 'react-qr-reader';
import {addScandata} from "./InventoryAction";


const ScanInventoryForm = (props) => {
// console.log(props.data)
const [data, setData] = useState(null);
const [isMatched, setIsMatched] = useState(false);
const [matchedValue, setMatchedValue] = useState(null);


console.log(props.scandata)

console.log(matchedValue)


useEffect(() => {

  // const foundMatch = props.scandata.barCodeList.some((res) =>
  //   res.some((value) => value.barCode === data)
  // );
  const foundMatch = props.scandata.barCodeList.some(
    (item) => item.barCode === data
  );
  console.log(foundMatch)

  if (foundMatch) {
    setIsMatched(true);
    const matchingValue = props.scandata.barCodeList.find(
      (item) => item.barCode === data
    );
console.log(matchingValue)
    setMatchedValue(matchingValue.barCode);
  } else {
    setIsMatched(false);
    setMatchedValue(null);
  }
}, [props.scandata, data]);
const handleScan = async (result) => {
    if (result) {
      setData(result.text);
    }
    
  };

  const stopScanning = () => {
    // setScanning(false);
    //setShouldRenderCamera(false);
    //setModalVisible(false);
  };

  // const startScanning = () => {
  //   setData('No result');
  //   setScanning(true);
  //   setShouldRenderCamera(true);
  //   setModalVisible(true);
  // };

  const handleError = (error) => {
    console.error('Error with the QR scanner:', error);
    // setScanning(false);
    //setShouldRenderCamera(false);
    // setModalVisible(false);
  };


  const handleSubmit = () => {
    let result={
        orderId:props.orderId,
        itemId:props.scandata.productId,
        dispatchPackingId:props.dispatchPackingId,
        orgId:props.orgId,
        manualNo:matchedValue,
    }
    props.addScandata(result,props.scandata.productId)
  };

  return (
    <>
    
          <div className={`qr-code-scanner-container`}>
            <QrReader
              constraints={{ facingMode: 'environment' }}
              delay={300}
             
              onResult={handleScan}
              onError={handleError}
              onClose={stopScanning} />
               {typeof data === 'string' && data.trim() !== '' && data !== 'No result' ? (
              <span 
              style={{color:"black",fontWeight:"bolder"}}
              onClick={stopScanning}>
               
                {data}
              </span>
            ) : (
              <span>No result</span>
            )}
           
<Button 
style={{ cursor: isMatched ? "pointer" : "not-allowed",}}
 onClick={handleSubmit}
 disabled={!isMatched}
>Submit</Button>
          </div>
        {/* )} */}
     
    </>
  );
};

const mapStateToProps = ({ inventory, auth }) => ({
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addScandata
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ScanInventoryForm);



// import React, { useEffect, useState } from "react";
// import { Button } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { QrReader } from "react-qr-reader";
// import { addScandata } from "./InventoryAction";

// const ScanInventoryForm = (props) => {
//   const [data, setData] = useState(null); // Stores the scanned QR code
//   const [isMatched, setIsMatched] = useState(false); // Tracks if a match is found
//   const [matchedValue, setMatchedValue] = useState(null); // Stores the matched value

//   console.log("Props scandata:", props.scandata);

//   // Effect to check for a match between scanned data and barCodeList
//   useEffect(() => {
//     if (!props.scandata || !Array.isArray(props.scandata.barCodeList)) {
//       console.error("Invalid scandata or barCodeList:", props.scandata);
//       setIsMatched(false);
//       return;
//     }

//     const foundMatch = props.scandata.barCodeList.some(
//       (value) => value && typeof value.barCode === "string" && value.barCode === data
//     );

//     if (foundMatch) {
//       setIsMatched(true);
//       const matchingValue = props.scandata.barCodeList.find(
//         (value) => value && value.barCode === data
//       );
//       setMatchedValue(matchingValue ? matchingValue.barCode : null);
//     } else {
//       setIsMatched(false);
//       setMatchedValue(null);
//     }
//   }, [props.scandata, data]);

//   // Handle scanning success
//   const handleScan = (result) => {
//     if (result) {
//       setData(result.text);
//     }
//   };

//   // Handle scanning error
//   const handleError = (error) => {
//     console.error("Error with the QR scanner:", error);
//   };

//   // Handle submit action
//   const handleSubmit = () => {
//     if (!data || !isMatched) return;

//     const result = {
//       orderId: props.orderId,
//       itemId: props.scandata.productId,
//       dispatchPackingId: props.dispatchPackingId,
//       orgId: props.orgId,
//       manualNo: data,
//     };

//     console.log("Submitting matched data:", result);
//     props.addScandata(result);
//   };

//   return (
//     <>
//       <div className="qr-code-scanner-container" style={{ padding: "20px" }}>
//         <h2>Scan QR Code</h2>
//         <QrReader
//           constraints={{ facingMode: "environment" }}
//           delay={300}
//           onResult={handleScan}
//           onError={handleError}
//           style={{ width: "100%" }}
//         />

//         <div style={{ marginTop: "20px" }}>
//           <span>
//             {typeof data === "string" && data.trim() !== "" && data !== "No result"
//               ? `Scanned Code: ${data}`
//               : "No result"}
//           </span>
//         </div>

//         <Button
//           type="primary"
//           style={{ marginTop: "20px" }}
//           onClick={handleSubmit}
//           disabled={!isMatched}
//         >
//           Submit
//         </Button>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = ({ inventory, auth }) => ({
//   orgId: auth.userDetails.organizationId,
//   scandata: inventory.scandata, // Assuming scandata comes from the inventory reducer
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addScandata,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(ScanInventoryForm);
