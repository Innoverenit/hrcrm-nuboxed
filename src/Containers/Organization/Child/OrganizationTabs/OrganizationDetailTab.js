import React, { Component,lazy,  Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import SignatureView from "./SignatureView";
import { MailOutlined, PlusOutlined, 
} from '@ant-design/icons';
import { handleEmailModal,handleWebsiteModal } from "../../../Settings/SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IndustryForm from "./IndustryForm";
const AddEmailModal = lazy(() => import('../Email/AddEmailModal'))
const AddWebsiteModal = lazy(() => import('../Website/AddWebsiteModal'))
const EmailTable = lazy(() => import('../Email/EmailTable'))



const TabPane = StyledTabs.TabPane;

class OrganizationDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const {
      userDetails: { firstName },
      handleEmailModal,
      addEmailModal,
      addWebsiteModal,
      handleWebsiteModal
    } = this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            {/* <TabPane
                            tab={<><span><Icon type="form" />Boost</span>
                            </>}
                            key="1">
                            <Suspense fallback={'Loading ...'}> <OrganizationBoost /></Suspense>
                        </TabPane> */}
            <TabPane
              tab={
                <>
                  <span>
                    <i className="fas fa-file-signature"></i>
                    &nbsp; Signature
                  </span>
                  {activeKey === "1" && <></>}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SignatureView />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <MailOutlined type="mail" />
                    Email
                  </span>
                  {activeKey === "2" && (
                    <>
                      <>
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Configure"
                          onClick={() =>
                            this.props.handleEmailModal(true)
                          }
                          size="1em"
                          style={{
                            marginLeft: 10,
                            verticalAlign: "center",
                          }}
                        />
                      </>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmailTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <MailOutlined type="mail" />
                   Industry
                  </span>
                
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <IndustryForm />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <span>
                    <MailOutlined type="mail" />
                    Website
                  </span>
                  {activeKey === "3" && (
                    <>
                      <>
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Configure"
                          handleIconClick={() =>
                            this.props.handleWebsiteModal(true)
                          }
                          size="1em"
                          style={{
                            marginLeft: 10,
                            verticalAlign: "center",
                          }}
                        />
                      </>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <WebsiteTable />
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        <AddEmailModal
          addEmailModal={addEmailModal}
          handleEmailModal={handleEmailModal}
        />
        <AddWebsiteModal
        addWebsiteModal={addWebsiteModal}
        handleWebsiteModal={handleWebsiteModal}
        />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ settings }) => ({
  addEmailModal: settings.addEmailModal,
  addWebsiteModal:settings.addWebsiteModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEmailModal,
      handleWebsiteModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailTab);
