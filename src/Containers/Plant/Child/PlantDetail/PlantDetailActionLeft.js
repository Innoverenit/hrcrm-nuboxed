import React from "react";

import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class PlantDetailActionLeft extends React.Component {
  render() {
    return (
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
        <Tooltip title="Back">
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

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetailActionLeft)

