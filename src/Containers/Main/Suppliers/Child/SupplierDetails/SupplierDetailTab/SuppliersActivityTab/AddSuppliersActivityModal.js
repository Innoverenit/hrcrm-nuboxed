import React, {  lazy, Suspense } from "react";
import { Tabs, Icon, Button } from "antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
// import SuppliersActivityCallForm from "../SuppliersActivityTab/SuppliersActivityCallForm";
// import SuppliersActivityEventForm from "../SuppliersActivityTab/SuppliersActivityEventForm";
// import SuppliersActivityTaskForm from "../SuppliersActivityTab/SuppliersActivityTaskForm";
import ActivityForm from "../../../../../../Activity/ActivityForm";


const TabPane = StyledTabs.TabPane;
function AddSuppliersActivityModal (props) {

        const {
            addSuppliersActivityModal,
            handleSuppliersActivityModal,
            supplier
        } = props;
        const isSmallScreen = window.innerWidth <= 600;
        const drawerWidth = isSmallScreen ? "90%" : "60%";
        return (
            <div>
                <StyledDrawer
                   title="Schedule"
                   width={drawerWidth}
                    visible={addSuppliersActivityModal}
                    destroyOnClose
                    closable
                    onClose={() => handleSuppliersActivityModal(false)}
                    footer={null}
                >
                    {/* <StyledTabs defaultActiveKey="1">
                        <TabPane tab={`Call`} key="1">
                            <div style={{ marginTop: 20 }}>
                                <SuppliersActivityCallForm supplier={supplier}
                                   translateText={this.props.translateText}
                                   selectedLanguage={this.props.selectedLanguage}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab={`Event`} key="2">
                            <div style={{ marginTop: 20 }}>
                                <SuppliersActivityEventForm supplier={supplier}
                                   translateText={this.props.translateText}
                                   selectedLanguage={this.props.selectedLanguage}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab={`Task`} key="3">
                            <div style={{ marginTop: 20 }}>
                                <SuppliersActivityTaskForm supplier={supplier}
                                   translateText={this.props.translateText}
                                   selectedLanguage={this.props.selectedLanguage}
                                />
                            </div>
                        </TabPane>
                    </StyledTabs> */}
  <Suspense fallback={<BundleLoader />}>
  <ActivityForm
           defaultValue={props.defaultValue}
           uniqueId={props.uniqueId}
           name={props.name}
           supplier={props.supplier}
           supplierId={props.supplierId}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}/>
  </Suspense>

                </StyledDrawer>
            </div>
        );
    }


const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSuppliersActivityModal);
