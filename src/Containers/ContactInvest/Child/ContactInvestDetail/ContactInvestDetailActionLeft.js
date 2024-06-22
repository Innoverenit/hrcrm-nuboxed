import React from "react";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

function ContactInvestDetailActionLeft (props) {

    return (
      <div class=" flex items-center">
            <Tooltip title="Back">
        <RollbackOutlined
          iconType="rollback"
             onClick={() =>props.history.goBack()}
        />
        </Tooltip>
      </div>
    );
  }
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactInvestDetailActionLeft)
);
