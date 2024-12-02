import React, { lazy, useEffect, useState, } from "react";
import { Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { QrReader } from 'react-qr-reader';
import {addScanReceivedata} from "../../../InventoryAction";


const ReceiveScanForm = (props) => {
// console.log(props.data)
const [data, setData] = useState(null);
const [matchedValue, setMatchedValue] = useState(null);
const [scanning, setScanning] = useState(false);
const [shouldRenderCamera, setShouldRenderCamera] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
console.log(props.receivedData)


useEffect(() => {
  const checkMatch = () => {
    for (const group of props.receivedData) {
      for (const barcodeObj of group.barCodeList) {
        if (barcodeObj.barCode === data) {
          setMatchedValue(barcodeObj.barCode);
          return;
        }
      }
    }
    setMatchedValue(null);
  };

  checkMatch();
}, [props.receivedData, data]);

const handleScan = async (result) => {
    if (result) {
      setData(result.text);
    }
    
  };

  const stopScanning = () => {
    setScanning(false);
    setShouldRenderCamera(false);
    setModalVisible(false);
  };

  const startScanning = () => {
    setData('No result');
    setScanning(true);
    setShouldRenderCamera(true);
    setModalVisible(true);
  };

  const handleError = (error) => {
    console.error('Error with the QR scanner:', error);
    setScanning(false);
    setShouldRenderCamera(false);
    setModalVisible(false);
  };


  const handleSubmit = () => {
    if (matchedValue) {
      console.log("Matched Value:", matchedValue);
    }
    let result={
      poReceivedInd:true,
      userId:props.userId,


    }
  props.addScanReceivedata(result,props.poSupplierDetailsId,data)
  };

  return (
    <>
     {/* <DocumentScannerIcon onClick={startScanning} className='!cursor-pointer text-lg text-[tomato]'/> */}

  
        {/* {shouldRenderCamera && scanning && ( */}
          <div className={`qr-code-scanner-container`}>
            <QrReader
              constraints={{ facingMode: 'environment' }}
              delay={300}
              // onScan={props.handleScan}
              onResult={handleScan}
              onError={handleError}
              onClose={stopScanning} />
               {typeof data === 'string' && data.trim() !== '' && data !== 'No result' ? (
              <span onClick={stopScanning}>
                {/* <Link to={`scan/${data}`}>
                  Click here to Proceed
                </Link> */}
                {data}
              </span>
            ) : (
              <span>No result</span>
            )}
           
<Button 
style={{cursor: matchedValue ? "pointer" : "not-allowed",}}
  disabled={!matchedValue} 
onClick={handleSubmit}
>Submit</Button>
          </div>
        {/* )} */}
     
    </>
  );
};

const mapStateToProps = ({ inventory, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId:auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          addScanReceivedata
            // addScandata
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveScanForm);



// import React, { useRef, useState } from 'react';
// import { BrowserMultiFormatReader } from '@zxing/library';
// import { Button, Modal } from 'antd';
// import { Link } from 'react-router-dom';
// import 'antd/dist/reset.css'; // Ensure you import the Ant Design CSS

// function QrCodeList() {
//   const videoRef = useRef(null);
//   const [data, setData] = useState('Not Found');
//   const [isModalVisible, setIsModalVisible] = useState(false);
  
//   const codeReaderRef = useRef(null); // Store the codeReader reference here
//   const lastError = useRef(null);
//   const lastErrorTime = useRef(Date.now());

//   const handleScan = (result, error) => {
//     if (result) {
//       setData(result.text);
//     } else if (error) {
//       const now = Date.now();
//       if (!lastError.current || (now - lastErrorTime.current > 1000)) { // Throttle errors to every 1000ms
//         console.error(error);
//         lastError.current = error;
//         lastErrorTime.current = now;
//       }
//     }
//   };

//   const startScanner = async () => {
//     const codeReader = new BrowserMultiFormatReader();
//     codeReaderRef.current = codeReader; // Store the instance in the ref

//     // Use 'environment' to request back camera
//     const constraints = {
//       video: { facingMode: { exact: "environment" } }
//     };
    
//     try {
//       await codeReader.decodeFromVideoDevice(null, videoRef.current, handleScan, constraints);
//     } catch (err) {
//       console.warn("Back camera not available, switching to default camera:", err);
//       // If the back camera is unavailable, try without the facingMode constraint (defaults to front camera)
//       codeReader.decodeFromVideoDevice(null, videoRef.current, handleScan);
//     }
//   };

//   const stopScanner = () => {
//     if (codeReaderRef.current) {
//       codeReaderRef.current.reset(); // Safely reset using the ref
//       codeReaderRef.current = null; // Clear the reference
//     }
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   React.useEffect(() => {
//     if (isModalVisible) {
//       startScanner();
//     } else {
//       stopScanner();
//     }

//     return () => {
//       stopScanner(); // Ensure cleanup when component unmounts
//     };
//   }, [isModalVisible]);

//   console.log(data);

//   return (
//     <div>
//       <Button type="primary" onClick={showModal}>
//         Scan Code
//       </Button>

//       <Modal
//         title="Scan QR Code"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={null} // Hide default footer
//       >
//         <video ref={videoRef} style={{ width: '100%', height: '100%' }}></video>
//         {/* <p>{data}</p> */}
//         {typeof data === 'string' && data.trim() !== '' && data !== 'Not Found' ? (
//               <span 
//               // onClick={props.stopScanning}
//               >
//                 <Link to={data}>
//                   Click here to Proceed
//                 </Link>
//               </span>
//             ) : (
//               <span>Not Found</span>
//             )}
//       </Modal>
//     </div>
//   );
// }

// export default QrCodeList;