import { Badge } from "antd";
import React, { Component, lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrappers from "../../Components/UI/Layout/TabsWrappers";
import IncludedDealCardList from "./ActionRequired/IncludedDealCardList";
import IncludedTaskCardList from "./ActionRequired/IncludedTaskCardList";
import OppIncludedCardList from "./ActionRequired/OppIncludedCardList";


const TabPane = StyledTabs.TabPane;

class ActionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => {
    this.setState(  key );
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <div class=" flex flex-no-wrap" >
        <div class=" w-full" >
        <TabsWrappers style={{ height:"100vh"}}>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            // forceRender={true}
          >
            <TabPane
              tab={
                <>
                 
                 <LightbulbIcon
                // style={{ fontSize: "large" }}
              />
                 <span class="font-poppins ml-[0.25em]" >
               <Badge count={this.props.oppIncludedCount.OpportunityCount} overflowCount={999}>
              
               Opportunity
                 </Badge>
   
                </span>
       

                  {/* {activeKey === "1" && (
                    <>
                    </>
                  )} */}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
           <OppIncludedCardList/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                    <CurrencyExchangeIcon
                // style={{ fontSize: "large" }}
              />
                 
                  <span class="font-poppins ml-[0.25em]" >
                  <Badge count={this.props.dealsIncludedCount.InvestorOppCount} overflowCount={999}>
               <FormattedMessage
          id="app.Deals"
          defaultMessage="Deals"
        />
              </Badge>
                </span>
          

                  {/* {activeKey === "2" && (
                    <>
                    </>
                  )} */}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
            <IncludedDealCardList/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                  <FactCheckIcon
                // style={{ fontSize: "large" }}
              />
                  <span class="font-poppins ml-[0.25em]" >
                  <Badge count={this.props.taskIncludedCount.TaskCount} overflowCount={999}>
               <FormattedMessage
          id="app.Task"
          defaultMessage="Task"
        />
          </Badge>
                </span>
            

                  {/* {activeKey === "3" && (
                    <>
                    </>
                  )} */}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
            <IncludedTaskCardList/>
              </Suspense>
            </TabPane>
         
          </StyledTabs>
        </TabsWrappers>
        </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({dashboard,auth}) => ({
  oppIncludedCount:auth.oppIncludedCount,
  dealsIncludedCount:auth.dealsIncludedCount,
  taskIncludedCount:auth.taskIncludedCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
   
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActionTab);
