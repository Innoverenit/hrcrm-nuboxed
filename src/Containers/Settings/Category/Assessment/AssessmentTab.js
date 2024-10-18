import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import Level from "../../Recruitement/Level/Level";
import Stream from "./Stream/Stream";
import Program from "./Program/Program";
const TabPane = StyledTabs.TabPane;

class AssessmentTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      value: 1,
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    return (
      <>
   <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <div style= {{width:"46%"}}>
          <TabsWrapper>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
           
              <TabPane
                tab={
                  <>
                   <i class="far fa-calendar-check"></i>
                    <span style={{ marginLeft: "0.25em" }}>Stream</span>
                  </>
                }
                key="1"
              >
                <Suspense>
                <Stream />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Level</span>
                  </>
                }
                key="2"
              >
                <Suspense>
                <Level />
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Program</span>
                  </>
                }
                key="3"
              >
                <Suspense>
                <Program/>
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentTab);
