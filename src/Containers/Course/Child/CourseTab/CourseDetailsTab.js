import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import TopicTab from "../Topic/TopicTab";

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class CourseDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
      file: false,
    };
  }
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
  
  }

  componentWillUnmount() {
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {
      course: { leadsId, name },
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <TopicOutlinedIcon
                  />
                  <span class=" ml-1">
                  Topic
                  </span>
                  {activeKey === "1" && <></>}
                </>
              }
              key="1"
            >
              <Suspense >
                {" "}
                <TopicTab course={this.props.course} />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}></Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ auth, leads, contact, opportunity }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailsTab);
