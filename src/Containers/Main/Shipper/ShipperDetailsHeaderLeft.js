import React from "react";

import { FlexContainer } from "../../../Components/UI/Layout";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class DistributorDetailsHeaderLeft extends React.Component {
  render() {
    return (
      <FlexContainer alignItems="center">
        <Tooltip title="Back">
          <KeyboardReturnIcon
            style={{ marginRight: "0.3rem",color: "#1890ff" }}
            // iconType="rollback"
            // tooltipTitle="Back"
            
            onClick={() => this.props.history.goBack()}
          />
        </Tooltip>
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DistributorDetailsHeaderLeft)

