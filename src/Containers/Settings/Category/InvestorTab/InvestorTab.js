import React, { Component, Suspense,lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import ClubList from "./ClubList";
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import CameraIcon from '@mui/icons-material/Camera';

const InvestorList = lazy(() =>
  import("./InvestorList")
);
const TabPane = StyledTabs.TabPane;

class InvestorTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "0",
      value: 1,
    };
  }



  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "0":
        return     <InvestorList />;
        case "1":
        return     <ClubList />;

      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
           <div class="flex flex-nowrap" >
          <div class ="w-[100%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <CameraIcon className=" !text-icon" />
                     
                      <span class=" ml-1 text-sm" >
                        Type
                      </span>
                      <Badge
                count={this.props.investorCount.InvestorCategoryCount}
                overflowCount={999} offset={[ 0, -16]}
              ></Badge>
                    </>
                  }
                  key="0"
                >
         
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <GolfCourseIcon className=" !text-icon" />
                      {/* <Badge
                count={this.props.investorCount.InvestorCategoryCount}
                overflowCount={999}
              > */}
                      <span class=" ml-1 text-sm" >
                        Club
                      </span>
                      {/* </Badge> */}
                    </>
                  }
                  key="1"
                >
         
                </TabPane>
               
             
              </StyledTabs>
              <Suspense fallback={<div>Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({investorList,industry }) => ({
  investorCount:investorList.investorCount,
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTab);









