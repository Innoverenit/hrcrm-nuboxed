import React, { Component, lazy, Suspense } from "react";
import { Icon, Button, Tooltip } from "antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import {  TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { handleLeavesModal } from "../../LeavesAction";
import { bindActionCreators } from "redux";
import AddLeavesModal from "../../Child/Tab/AddLeavesModal";
const LeaveTable=lazy(()=>import("../Tab/LeaveTable"));

const TabPane = StyledTabs.TabPane;

class DetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { handleLeavesModal } = this.props;
    const { activeKey } = this.state;
    const {
      userDetails: { firstName },
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    {/* <Icon type="bank" /> */}
                    Leave Details
                  </span>
                 
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LeaveTable />
              </Suspense>
              {/* <Button></Button> */}
            </TabPane>

            <TabPane
              tab={
                <Tooltip placement="right" title="Apply">
                  <Button
                    style={{ marginLeft: "67.125em" }}
                    type="primary"
                    onClick={() => handleLeavesModal(true)}
                  >
                    Add
                  </Button>
                </Tooltip>
              }
            ></TabPane>
          </StyledTabs>
        </TabsWrapper>

        <AddLeavesModal
          handleLeavesModal={handleLeavesModal}
          addLeaveModal={this.props.addLeaveModal}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTab);
