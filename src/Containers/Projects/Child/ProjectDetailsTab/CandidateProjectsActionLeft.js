import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

class CandidateProjectsActionLeft extends React.Component {
  render() {
    return (
      <div class=" flex items-center">
        <RollbackOutlined
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
  connect(mapStateToProps, mapDispatchToProps)(CandidateProjectsActionLeft)
);
