import React, { Component, lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";
const PitchAddChart = lazy(()=>import("./PitchAddChart"));
const ContactInvestAddChart = lazy(()=>import("./ContactInvestAddChart"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DashInvestorsChartTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }


  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <TabsWrapper1>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  {/* <ListAltIcon style={{fontSize:"1.1rem"}}/> */}
                 
               <span class=" ml-1 font-semibold">
               <FormattedMessage
              id="app.pitchAdded"
              defaultMessage="Pitch Added"
            />
               </span>
                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PitchAddChart/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  {/* <EventAvailableIcon style={{fontSize:"1.1rem"}}/> */}

                  <span class=" ml-1 font-semibold">
                  <FormattedMessage
              id="app.contactInvestorAdded"
              defaultMessage="Contacts Added"
            />
                   </span>

                  {activeKey === "2" && (
                    <>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
        <ContactInvestAddChart/>
              </Suspense>
            </TabPane>
     
          
          </StyledTabs>
        </TabsWrapper1>
        <Suspense fallback={null}></Suspense>
      </>
    );
  }
}
const mapStateToProps = ({dashboard,auth}) => ({
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {

  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashInvestorsChartTab);
