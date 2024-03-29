import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";
import { FormattedMessage } from "react-intl";
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
    };
  }

  componentDidMount() {
    // const { getTodosCount, userId, startDate, endDate } = this.props;
    // getTodosCount(userId, startDate, endDate);
  }

  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
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
               <FormattedMessage
          id="app.tasks"
          defaultMessage="Tasks"
        />
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
                <TaskOrganizationNew /> 
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
  userId: auth.userDetails.userId,
});
 const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskOrganizationTab);
