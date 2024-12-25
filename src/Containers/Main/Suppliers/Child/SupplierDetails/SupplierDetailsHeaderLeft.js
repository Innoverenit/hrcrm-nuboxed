import React from "react";

import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


class SupplierDetailsHeaderLeft extends React.Component {
  render() {
    return (
      <div class="items-center">
        <Tooltip 
       title="Back"
      >
          <KeyboardReturnIcon
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsHeaderLeft)

