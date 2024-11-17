import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";

import { BundleLoader } from "../../Components/Placeholder";

const TabPane = StyledTabs.TabPane;

class FinanceDashTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      translatedMenuItems: [],
      loading: true
    };
  }
  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       "Receivable", // 0


      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }


  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey,translatedMenuItems,loading } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
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
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                 
               <span class=" ml-1 font-semibold">
               
                 {translatedMenuItems[0]}
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
                <h1>Receivable</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(FinanceDashTab);
