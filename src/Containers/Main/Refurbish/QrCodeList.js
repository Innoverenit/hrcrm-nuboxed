import 'webrtc-adapter';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
// import { QrReader } from 'react-qr-reader';
import QrReader from 'react-qr-scanner';
import { Link } from 'react-router-dom';


const QRCodeListScanner = (props) => {


  return (
    <>
      <Button onClick={props.startScanning}>Open Scanner</Button>

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
            facingMode="environment"
            delay={300}
            onScan={props.handleScan}
              // onResult={props.handleScan}
              onError={props.handleError}
              onClose={props.stopScanning} />
            <span onClick={props.stopScanning}>
              <Link
                to={`scan/${props.data}`}>
                {props.data}
              </Link>
            </span>

          </div>
        )}
      </Modal>
    </>
  );
};

export default QRCodeListScanner;