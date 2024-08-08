import React, { Component } from "react";
import error from "../../Assets/Images/i.png";
import { Button } from "antd";

class PageNotFound extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4.6875em 1.25em"
        }}
      >
        <div
          style={{
            width: "25em",
            height: "25em",
            padding: "0.3125em 1.25em",
            /* border-radius: "50%"; */
            boxShadow: " 0 0.8125em 1.6875em -0.3125em rgba(50, 50, 93, 0.25)",
            backgroundColor: " #f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
            // margin-bottom: 0.625em;
            // margin-top: 0.625em;
          }}
        >
          <img
            src={error}
            style={{ height: "3.125em", width: "3.125em", borderRadius: "50%" }}
          ></img>
          {/* <div>
            <h1
              style={{
                fontSize: "2.5em",
                fontWeight: "37.5em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              OOPS !
            </h1>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              &nbsp; &nbsp; It is a problem with us.
              <br />
              Please refresh your browser
            </h1>
          </div>
          <div class=" mt-3" /> */}
          {/* <Button
            type="primary"
            icon="reload"
            onClick={() => this.handleRefreshPage()}
          >
            Retry
          </Button> */}
          <h3>PageNotFound Component</h3>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
