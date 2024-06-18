
import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { PlusOutlined } from "@ant-design/icons";
import {  StyledTabs } from "../../../../Components/UI/Antd";
import {handleCreateShiftDrawer} from "./LocationAction";

const ShftLocsTable =lazy(()=>import("./ShftLocsTable"));
const ALoctionTable=lazy(()=>import("./ALoctionTable"));
const LocationCreateShiftDrawer=lazy(()=>import("./LocationCreateShiftDrawer"));

const TabPane = StyledTabs.TabPane;

class LocationShiftDrawerTab extends Component {
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
    const {handleCreateShiftDrawer,createShiftDrawer,  storedLoc}=this.props;
    return (
      <>
        <div class="w-full ">
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                 
               <span class=" ml-1">Shift</span>
              

                  {activeKey === "1" && (
                    <>
                  
                    <PlusOutlined
                        type="plus"
                        title="Create"
                        onClick={() => handleCreateShiftDrawer(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                     
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               <ShftLocsTable   storedLoc={storedLoc}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                 
               <span class=" ml-1">Allocation</span>
              

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
                <ALoctionTable storedLoc={storedLoc}/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </div>
        <Suspense fallback={null}>
          <LocationCreateShiftDrawer
          storedLoc={storedLoc}
createShiftDrawer={createShiftDrawer}
          handleCreateShiftDrawer={handleCreateShiftDrawer}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({location,auth}) => ({
  createShiftDrawer:location.createShiftDrawer
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    handleCreateShiftDrawer
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocationShiftDrawerTab);
