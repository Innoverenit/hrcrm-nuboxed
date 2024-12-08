import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../Components/UI/Antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
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
          <TabsWrapper style={ {height:"83vh"}}>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
           
              <TabPane
                tab={
                  <>
                  
                    <span class=" ml-1">Document</span>
                    {(activeKey === "1" && this.props.user.repositoryCreateInd === true || this.props.user.role === "ADMIN") && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle="Add"
                         onClick={() => this.props.handleOrganizationDocumentDrawer(true)}
                     
                       
                      />
                    </>
                  )}
                  </>
                }
                key="1"
              >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <OrganizationDocumentList
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/>
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
