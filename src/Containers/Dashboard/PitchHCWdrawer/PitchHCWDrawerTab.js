import React, { Component, lazy, Suspense } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  StyledTabs } from "../../../Components/UI/Antd";
import TabsWrapper1 from "../../../Components/UI/Layout/TabsWrapper1";
const PitchHotTable=lazy(()=>import("./PitchHotTable"));
const PitchColdTable=lazy(()=>import("./PitchColdTable"));
const PitchWarmTable=lazy(()=>import("./PitchWarmTable"));

const TabPane = StyledTabs.TabPane;

class PitchHCWDrawerTab extends Component {
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
             Hot</span>
              

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
           <PitchHotTable/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                 
               <span class=" ml-1">   Cold</span>
              

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
            <PitchColdTable/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                 
                 
               <span class=" ml-1"> Warm</span>
              

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
         <PitchWarmTable/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PitchHCWDrawerTab);
