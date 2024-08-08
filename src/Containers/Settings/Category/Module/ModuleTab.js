import React, { Component, lazy,Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
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
          <div class ="w-[100%] scroll-thin" >
            {/* <TabsWrapper> */}
              <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
                <TabPane
                  tab={
                    <>
                      <ViewModuleIcon />
                      <span class=" ml-1 !text-icon" >
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
