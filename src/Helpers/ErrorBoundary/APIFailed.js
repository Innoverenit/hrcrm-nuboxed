import React from "react";
import { Modal, Button } from "antd";
import connectionLoss from "../../Assets/Images/connectionLost.webp";


function APIFailed() {
  function handleRefreshPage() {
    window.location.reload();
  }

  return (
    <Modal
      title=""
      visible={true}
      footer={null}
      maskClosable={false}
      closable={false}
      destroyOnClose
      maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
      style={{ top: 30 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "25em",
            height: "25em",
            padding: "0.3125em 1.25em",
            /* border-radius: "50%"; */
            // boxShadow: " 0 0.8125em 1.6875em -0.3125em rgba(50, 50, 93, 0.25)",
            // backgroundColor: " #f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // margin-bottom: 0.625em;
            // margin-top: 0.625em;
          }}
        >
          {/* <img
                    src={error}
                    style={{ height: "3.125em", width: "3.125em", borderRadius: "50%" }}
                ></img> */}
          <div>
            <h1
              style={{
                fontSize: "2.5em",
                fontWeight: "37.5em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={connectionLoss}
                style={{ height: "9.375em", width: "9.375em", borderRadius: "50%" }}
              ></img>
            </h1>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.25em",
              }}
            >
              {/* &nbsp; &nbsp;  */}
              Your internet connection is interrupted.
              <br />
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; Check
              your connectivity
            </h1>
          </div>
          <div class=" mt-3" />
          <Button
            type="primary"
            // icon="reload"
            onClick={() => handleRefreshPage()}
          >
           
            Refresh
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default APIFailed;
