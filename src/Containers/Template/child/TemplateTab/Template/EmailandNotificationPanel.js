import React, { Component } from "react";
import { StyledCollapse } from "../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "antd";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import TemplateTable from "./TemplateTable";
import NotificationTable from "./NotificationTable";
const Panel = StyledCollapse.Panel;

class EmailandNotificationPanel extends Component {
  render() {
    return (
      <div>
        <StyledCollapse
          bordered={false}
          //   defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <ArrowDropDownCircleIcon type="caret-right" rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel header="Email" key="1" style={{}}>
            <TemplateTable />
          </Panel>
          {/* <Panel header="Notification" key="2" style={{}}> */}
          {/* <NotificationTable /> */}
          {/* </Panel> */}
        </StyledCollapse>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   getProductsByOpportunityId
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailandNotificationPanel);
