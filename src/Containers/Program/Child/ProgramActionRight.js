import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Tooltip } from "antd";

class ProgramActionRight extends React.Component {
  render() {
    const {handleProgramModal } = this.props;
    return (
      <div class=" flex items-center">
        <Tooltip placement="left" title="Create">
          <Button type="primary" onClick={() => handleProgramModal(true)}>
         Add
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProgramActionRight)

