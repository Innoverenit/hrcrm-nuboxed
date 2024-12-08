import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";
import LeadsTab from "./Child/RulesTab/LeadsTab";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const TabPane = StyledTabs.TabPane;
class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });
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
                 
                   Leaves
                  </span>
                  {activeKey === "1" && <></>}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LeadsTab />
              </Suspense>
            </TabPane>
              
          </StyledTabs>
        </TabsWrapper>
 
      </>
    );
  }
}
const mapStateToProps = ({ settings }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rules);















