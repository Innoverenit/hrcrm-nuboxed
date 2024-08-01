import React, { Component, lazy,Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const ModuleList = lazy(() =>
  import("./ModuleList")
);
const TabPane = StyledTabs.TabPane;

class ModuleTab extends Component {
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
           <div class="flex flex-nowrap " >
          <div class ="w-[100%]  "style={{scrollbarWidth:"thin"}} >
            {/* <TabsWrapper> */}
              <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
                <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon />
                      <span class=" ml-[0.25em]" >
                      Module
                      </span>
                    </>
                  }
                  key="0"
                >
                  <Suspense>
                    <ModuleList />
                  </Suspense>
                </TabPane>
               
             
              </StyledTabs>
            {/* </TabsWrapper> */}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTab);
