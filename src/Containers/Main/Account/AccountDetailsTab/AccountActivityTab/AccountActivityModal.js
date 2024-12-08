import React, {  lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import ActivityForm from "../../../../Activity/ActivityForm";
// const AcitivityCallForm = lazy(() => import("./AcitivityCallForm"));
// const ActivityEventForm = lazy(() => import("./ActivityEventForm"));
// const ActivityTaskForm = lazy(() => import("./ActivityTaskForm"));

const TabPane = StyledTabs.TabPane;
function AccountActivityModal (props) {

        const {
            addDistributorActivityModal,
            handleDistributorActivityModal,
        } = props;
        const isSmallScreen = window.innerWidth <= 600;
        const drawerWidth = isSmallScreen ? "90%" : "60%";

        return (
            <div>
                <StyledDrawer
                    title="Schedule"
                  width={drawerWidth}
                    visible={addDistributorActivityModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleDistributorActivityModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <StyledTabs defaultActiveKey="1">
                            <TabPane tab={`Call`} key="1">
                                <div style={{ marginTop: 20 }}>
                                    <AcitivityCallForm />
                                </div>
                            </TabPane>
                            <TabPane tab={`Event`} key="2">
                                <div style={{ marginTop: 20 }}>
                                    <ActivityEventForm />
                                </div>
                            </TabPane>
                            <TabPane tab={`Task`} key="3">
                                <div style={{ marginTop: 20 }}>
                                    <ActivityTaskForm/>
                                </div>
                            </TabPane>
                        </StyledTabs> */}
                        <ActivityForm
           defaultValue={props.defaultValue}
           distributorId={props. distributorId }
           uniqueId={props.uniqueId}
           name={props.name}
           distributor={props.distributor}
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
)(AccountActivityModal);
