import React from "react";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

class SupplierDetailsHeaderLeft extends React.Component {
  render() {
    return (
      <div class="items-center">
        <Tooltip 
        title={<FormattedMessage id="app.back" defaultMessage="Back" />}
      >
          <RollbackOutlined
            style={{ marginRight: "0.3rem",color: "#1890ff" }}
            onClick={() => this.props.history.goBack()}
          />
        </Tooltip>
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsHeaderLeft)
);
