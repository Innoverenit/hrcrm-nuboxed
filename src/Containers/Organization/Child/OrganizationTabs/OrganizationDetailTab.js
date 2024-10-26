import React, { Component,lazy,  Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { MailOutlined,
} from '@ant-design/icons';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { handleEmailModal,handleWebsiteModal } from "../../../Settings/SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConstructionIcon from '@mui/icons-material/Construction';
import EditNoteIcon from '@mui/icons-material/EditNote';
const AddEmailModal = lazy(() => import('../Email/AddEmailModal'));
const AddWebsiteModal = lazy(() => import('../Website/AddWebsiteModal'));
const EmailTable = lazy(() => import('../Email/EmailTable'));
const IndustryForm = lazy(() => import('./IndustryForm'));
const SignatureView = lazy(() => import('./SignatureView'));


const TabPane = StyledTabs.TabPane;

class OrganizationDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
          
         
        "Signature",
        "Email",
        "Industry"
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
                    <EditNoteIcon className="!text-icon"/>
                    {this.state.translatedMenuItems[0]} 
                    {/* Signature */}
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
                    <MailOutlined type="mail" className="!text-icon"/>
                    {this.state.translatedMenuItems[1]} {/* Email */}
                  </span>
                  {activeKey === "2" && (
                    <>
                      <>
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Configure"
                          onClick={() =>
                            this.props.handleEmailModal(true)
                          }
                     
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
                    <ConstructionIcon type="mail"  className="!text-icon"/>
                    {this.state.translatedMenuItems[2]}  {/* Industry */}
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
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
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
         selectedLanguage={this.props.selectedLanguage}
         translateText={this.props.translateText}
          addEmailModal={addEmailModal}
          handleEmailModal={handleEmailModal}
        />
        <AddWebsiteModal
         selectedLanguage={this.props.selectedLanguage}
         translateText={this.props.translateText}
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
