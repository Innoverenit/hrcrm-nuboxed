import React, { Component, lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  StyledTabs } from "../../../Components/UI/Antd";
import TabsWrapper1 from "../../../Components/UI/Layout/TabsWrapper1";
const LeadHotTable=lazy(()=>import("./LeadHotTable"));
const LeadColdTable=lazy(()=>import("./LeadColdTable"));
const LeadWarmTable=lazy(()=>import("./LeadWarmTable"));

const TabPane = StyledTabs.TabPane;

class LeadHCWDrawerTab extends Component {
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
                 
                 
               <span class=" ml-1">
               <FormattedMessage
          id="app.hot"
          defaultMessage="Hot"
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
           <LeadHotTable/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                 
               <span class=" ml-1">
               <FormattedMessage
          id="app.cold"
          defaultMessage="Cold"
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
            <LeadColdTable/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                 
                 
               <span class=" ml-1">
               <FormattedMessage
          id="app.warm"
          defaultMessage="Warm"
        />
                </span>
              

                  {activeKey === "3" && (
                    <>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
         <LeadWarmTable/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper1>
      </>
    );
  }
}
const mapStateToProps = ({dashboard}) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
   
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadHCWDrawerTab);
