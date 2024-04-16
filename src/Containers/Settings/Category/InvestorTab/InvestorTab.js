import React, { Component, Suspense,lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Industry from "../Industry/Industry";
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
          return     <Industry />;

      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
           <div class="flex flex-nowrap" >
          <div class ="w-[70%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon />
                      <Badge
                count={this.props.investorCount.InvestorCategoryCount}
                overflowCount={999}
              >
                      <span class=" ml-1" >
                        Type
                      </span>
                      </Badge>
                    </>
                  }
                  key="0"
                >
         
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon />
                      <Badge
                count={this.props.industryCount.IndustryCount}
                overflowCount={999}
              >
                      <span class=" ml-1" >
                   Real Estate
                      </span>
                      </Badge>
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
  industryCount:industry.industryCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTab);









