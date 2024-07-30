
// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'antd';
// import { QrReader } from 'react-qr-reader';
// import axios from 'axios';

// const QRCodeScanner = () => {
//   const [data, setData] = useState('No result');
//   const [scanning, setScanning] = useState(false);
//   const [shouldRenderCamera, setShouldRenderCamera] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleScan = async (result, error) => {
//     try {
//       if (result && result.text) {
//         setData(result.text);
//       } else if (result instanceof MediaStream) {
//         // Do something with the MediaStream object if needed
//       }

//       if (error) {
//         throw new Error(error);
//       }
//     } catch (error) {
//       console.error('Error in QR code scanner:', error);

//       // Additional handling based on the error, if needed
//     }
//   };

//   const handleError = (error) => {
//     console.error('Error with the QR scanner:', error);
//     setScanning(false);
//     setShouldRenderCamera(false);
//     setModalVisible(false);
//   };

//   const startScanning = () => {
//     setData('No result');
//     setScanning(true);
//     setShouldRenderCamera(true);
//     setModalVisible(true);
//   };

//   const stopScanning = () => {
//     setScanning(false);
//     setShouldRenderCamera(false);
//     setModalVisible(false);
//   };

//   const sendToApi = async () => {
//     try {
//       const response = await axios.post('http://Hrnubox-env.eba-us3qmm3j.ap-south-1.elasticbeanstalk.com/supplies', {
//         scannedData: data,
//       });
//       console.log('API Response:', response.data);
//     } catch (error) {
//       console.error('Error sending data to API:', error);
//     }
//   };

//   return (
//     <>
//       <Button onClick={startScanning}>Open Scanner</Button>

//       <Modal
//         title="QR Code Scanner"
//         visible={modalVisible}
//         onCancel={stopScanning}
//         destroyOnClose={true}
//         footer={[
//           <Button key="send" type="primary" onClick={sendToApi}>
//             Send
//           </Button>,
//         ]}
//       >
//         {shouldRenderCamera && scanning && (
//           <div className={`qr-code-scanner-container`}>
//             <QrReader onResult={handleScan} onError={handleError} onClose={stopScanning} />
//             <p>{data}</p>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default QRCodeScanner;

import 'webrtc-adapter'; 
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';


const QRCodeScanner = () => {
  const [data, setData] = useState('No result');
  const [scanning, setScanning] = useState(false);
  const [shouldRenderCamera, setShouldRenderCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleScan = async (result, error) => {
    try {
      if (result && result.text) {
        setData(result.text);
      } else if (result instanceof MediaStream) {
        // Do something with the MediaStream object if needed
      }

      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.error('Error in QR code scanner:', error);

      // Additional handling based on the error, if needed
    }
  };

  const handleError = (error) => {
    console.error('Error with the QR scanner:', error);
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

  const stopScanning = () => {
    setScanning(false);
    setShouldRenderCamera(false);
    setModalVisible(false);
  };

  const sendToApi = async () => {
    try {
      const response = await axios.post('http://Hrnubox-env.eba-us3qmm3j.ap-south-1.elasticbeanstalk.com/supplies', {
        scannedData: data,
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <>
      <Button onClick={startScanning}>Open Scanner</Button>

      <Modal
        title="QR Code Scanner"
        visible={modalVisible}
        onCancel={stopScanning}
        destroyOnClose={true}
        footer={[
          <Button key="send" type="primary" onClick={sendToApi}>
            Send
          </Button>,
        ]}
      >
        {shouldRenderCamera && scanning && (
          <div className={`qr-code-scanner-container`}>
            <QrReader onResult={handleScan} onError={handleError} onClose={stopScanning} />
            <p>{data}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default QRCodeScanner;





