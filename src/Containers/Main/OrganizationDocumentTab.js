import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../Components/UI/Antd";
import { PlusOutlined } from "@ant-design/icons";
import {handleOrganizationDocumentDrawer} from "../Auth/AuthAction"
import { TabsWrapper } from "../../Components/UI/Layout";
import { connect } from "react-redux";
const AddOrgDocumentModal = lazy(() =>
  import("./AddOrgDocumentModal")
);
const OrganizationDocumentList = lazy(() =>
  import("./OrganizationDocumentList")
);
const TabPane = StyledTabs.TabPane;

class OrganizationDocumentTab extends Component {
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
    const { activeKey } = this.state;
    return (
      <>
        <div class=" flex flex-no-wrap" >
        <div class=" w-full" >
          <TabsWrapper style={ {height:"80vh"}}>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
           
              <TabPane
                tab={
                  <>
                  
                    <span style={{ marginLeft: "0.25em" }}>Document</span>
                    {(activeKey === "1" && this.props.user.repositoryCreateInd === true || this.props.user.role === "ADMIN") && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                         onClick={() => this.props.handleOrganizationDocumentDrawer(true)}
                        size="14px"
                        style={{ marginLeft: "0.25", verticalAlign: "center" }}
                      />
                    </>
                  )}
                  </>
                }
                key="1"
              >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <OrganizationDocumentList/>
                </Suspense>
              </TabPane>



          
            </StyledTabs>
          </TabsWrapper>
          <Suspense fallback={"Loading..."}>
          <AddOrgDocumentModal
            organizationDocumentDrawer={this.props.organizationDocumentDrawer}
            handleOrganizationDocumentDrawer={this.props.handleOrganizationDocumentDrawer}
          />
        
     
  
        </Suspense>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({auth}) => ({
  user: auth.userDetails,
    organizationDocumentDrawer:auth.organizationDocumentDrawer
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleOrganizationDocumentDrawer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDocumentTab);
