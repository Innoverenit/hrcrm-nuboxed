import React, { Component, } from "react";
import { connect } from "react-redux";
import { Tabs } from 'antd';
import { bindActionCreators } from "redux";
import {getOrganizationList} from "../../../Auth/AuthAction"
import LanguageIcon from '@mui/icons-material/Language';

// const TabPane = StyledTabs.TabPane;
const { TabPane } = Tabs;
// function handleRefreshPage() {
//   window.location.reload();
// }
class OrganizationHeaderTab extends Component {
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

  componentDidMount() {
    this.props.getOrganizationList();
    }


  handleRecruitClick = () => {
    this.setState({ file: true });
  };

 

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

    return (
      <Tabs type="card" 
       activeKey={this.props.activeTab} 
       onChange={this.props.handleOnClick}
      >
        {this.props.organizationDetailsList.map((item) => (
          <TabPane key={item.organizationId
          } 
          tab={
            <>
            {item.organizationName}
            {item.type==="Parent" && <LanguageIcon className=" !text-icon ml-2" />}
            </>
            }>
            {/* <Card>
              <p>Country: {item.country_name}</p>
              <p>ID: {item.country_id}</p>
            </Card> */}
           
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  // organizationDetailsList:auth.organizationDetailsList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getOrganizationList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHeaderTab);
