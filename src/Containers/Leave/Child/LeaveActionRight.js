import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {  Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
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
      <FlexContainer alignItems="center">
        <Tooltip placement="right" title="Apply">
          <Button type="primary"
          onClick={() => handleLeavesModal(true)}>
           <DataSaverOnIcon/> Add
          </Button>
        </Tooltip>
        <AddLeavesModal
          handleLeavesModal={handleLeavesModal}
          addLeaveModal={this.props.addLeaveModal}
        />
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ leave }) => ({
  addLeaveModal: leave.addLeaveModal,
  //   userId: auth.userDetails.userId,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  //   accountFilterText: account.accountFilterText,
  //   users: team.users,
  //   filterByUserOption: team.filterByUserOption,
  //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeavesModal,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeaveActionRight)
);
