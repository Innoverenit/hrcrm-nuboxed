import 'webrtc-adapter';
import React from 'react';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Modal, Button } from 'antd';
import { QrReader } from 'react-qr-reader';
import { Link } from 'react-router-dom';


const QRCodeListScanner = (props) => {
console.log(props.data)

  return (
    <>
     <DocumentScannerIcon onClick={props.startScanning} className='!cursor-pointer text-lg text-[tomato]'/>

      <Modal
        title="QR Code Scanner"
        visible={props.modalVisible}
        onCancel={props.stopScanning}
        destroyOnClose={true}
      // footer={[
      //   <Button key="send" type="primary" onClick={sendToApi}>
      //     Send
      //   </Button>,
      // ]}
      >
        {props.shouldRenderCamera && props.scanning && (
          <div className={`qr-code-scanner-container`}>
            <QrReader
              constraints={{ facingMode: 'environment' }}
              delay={300}
              // onScan={props.handleScan}
              onResult={props.handleScan}
              onError={props.handleError}
              onClose={props.stopScanning} />
               {typeof props.data === 'string' && props.data.trim() !== '' && props.data !== 'No result' ? (
              <span onClick={props.stopScanning}>
                <Link to={props.data}>
                  Click here to Proceed
                </Link>
              </span>
            ) : (
              <span>No result</span>
            )}
            {/* <span onClick={props.stopScanning}>
              <Link
                 to={props.data}
                >
                
                 
               
                {props.data?"Click here to Proceed":"No result"}
              </Link>
            </span> */}

          </div>
        )}
      </Modal>
    </>
  );
};

export default QRCodeListScanner;



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