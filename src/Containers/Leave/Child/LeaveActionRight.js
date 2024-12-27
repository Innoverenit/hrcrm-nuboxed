import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {  Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleLeavesModal } from "../LeavesAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const AddLeavesModal = lazy(() => import("./Tab/AddLeavesModal"));

const Option = StyledSelect.Option;

class LeaveActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleLeavesModal } = this.props;
    return (
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
        <Tooltip placement="right" title="Apply">
          <Button type="primary"
          onClick={() => handleLeavesModal(true)}>
           <DataSaverOnIcon className="!text-icons"/> Add
          </Button>
        </Tooltip>
        <AddLeavesModal
          handleLeavesModal={handleLeavesModal}
          addLeaveModal={this.props.addLeaveModal}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ leave }) => ({
  addLeaveModal: leave.addLeaveModal,
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeavesModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeaveActionRight)

