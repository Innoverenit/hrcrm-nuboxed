import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import Industry from "./Industry";



const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class IndustryTab extends Component {
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

  // componentDidMount() {
  //   this.props.getContactListByCustomerId(this.props.customer.customerId);
  // }

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
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon  style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                     Real Estate
                    </span>
                  </span>
              
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Industry  />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      Manufacturing
                    </span>
                  </span>
               
                </>
              }
              key="2"
            >
              {/* <Suspense fallback={"Loading ..."}>
                {" "}
                <Industry   />
              </Suspense> */}
            </TabPane>

        
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                     Refurbish
                    </span>
                  </span>
               
                </>
              }
              key="3"
            >
              {/* <Suspense fallback={"Loading ..."}>
                {" "}
                <Industry   />
              </Suspense> */}
            </TabPane>
         
           
             

          </StyledTabs>
        </TabsWrapper>
      
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndustryTab);
