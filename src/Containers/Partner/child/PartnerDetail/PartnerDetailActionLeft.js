import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class PartnerDetailActionLeft extends React.Component {
  render() {
    return (
      <div class=" flex items-center">
        <KeyboardReturnIcon
          style={{ color: "#1890ff" }}
          iconType="rollback"
          tooltipTitle="Back"
         
          onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PartnerDetailActionLeft)
);
