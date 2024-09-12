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