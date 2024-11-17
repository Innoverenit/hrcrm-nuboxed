import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";

import { BundleLoader } from "../../Components/Placeholder";
const TaskOrganizationNew=lazy(()=>import("./TaskOrganizationNew"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class TaskOrganizationTab extends Component {
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
        '105',//'Tasks', // 0
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }
  componentDidMount() {
    // const { getTodosCount, userId, startDate, endDate } = this.props;
    // getTodosCount(userId, startDate, endDate);
  }

  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey, loading, translatedMenuItems } = this.state;

    // if (loading) {
    //   return <div><BundleLoader/></div>;
    // } 
    return (
      <>
        <TabsWrapper1>

        <div>
              <ListAltIcon className="!text-icon"/><span class="ml-1 font-bold font-poppins text-base  ">Task</span>

                
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TaskOrganizationNew /> 
              </Suspense>
           


            </div>    
          
        </TabsWrapper1>
     
        <Suspense fallback={null}></Suspense>
      </>
    );
  }
}
const mapStateToProps = ({dashboard,auth}) => ({
  userId: auth.userDetails.userId,
});
 const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskOrganizationTab);
