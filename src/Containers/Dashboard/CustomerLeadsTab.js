import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";

import Piechart1 from "../../Components/Charts/PieChart1";
// const LeadsHotColdWarm=lazy(()=>import("./LeadsHotColdWarm"));

const TabPane = StyledTabs.TabPane;
class CustomerLeadsTab extends Component {
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
        <TabsWrapper1 style={{height:"32vh"}}>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                 
               <span class=" ml-1 font-semibold">
             Leads
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
                {/* <LeadsHotColdWarm/> */}
                <Piechart1/>
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
  todosCount:dashboard.todosCount,
  userId: auth.userDetails.userId,
  endDate: dashboard.endDate,
  startDate: dashboard.startDate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
   
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLeadsTab);
