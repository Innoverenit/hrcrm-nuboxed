import React from "react";
import { withRouter } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const ImportActionLeft = props => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
      <Tooltip title="Back">
        <RollbackOutlined
            // iconType="rollback"
          // tooltipTitle="Back"
          style={{ marginRight: "0.3rem",color: "#1890ff", fontSize: "1.56em" }}
          onClick={() => props.history.goBack()}
        />
      </Tooltip>
    </div>
  );
};

export default withRouter(ImportActionLeft);
