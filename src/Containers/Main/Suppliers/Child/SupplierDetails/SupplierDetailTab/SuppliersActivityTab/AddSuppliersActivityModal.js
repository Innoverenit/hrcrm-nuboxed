import React, { Component } from "react";
import { Tabs, Icon, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import SuppliersActivityCallForm from "../SuppliersActivityTab/SuppliersActivityCallForm";
import SuppliersActivityEventForm from "../SuppliersActivityTab/SuppliersActivityEventForm";
import SuppliersActivityTaskForm from "../SuppliersActivityTab/SuppliersActivityTaskForm";
// import LinkAddOrderForm from "./LinkAddOrderForm";

const TabPane = StyledTabs.TabPane;
class AddSuppliersActivityModal extends Component {
    render() {
        const {
            addSuppliersActivityModal,
            handleSuppliersActivityModal,
        } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Activity"
                    width="60%"
                    visible={addSuppliersActivityModal}
                    destroyOnClose
                    closable
                    onClose={() => handleSuppliersActivityModal(false)}
                    footer={null}
                >
                    <StyledTabs defaultActiveKey="1">
                        <TabPane tab={`Call`} key="1">
                            <div style={{ marginTop: 20 }}>
                                <SuppliersActivityCallForm />
                            </div>
                        </TabPane>
                        <TabPane tab={`Event`} key="2">
                            <div style={{ marginTop: 20 }}>
                                <SuppliersActivityEventForm />
                            </div>
                        </TabPane>
                        <TabPane tab={`Task`} key="3">
                            <div style={{ marginTop: 20 }}>
                                <SuppliersActivityTaskForm />
                            </div>
                        </TabPane>
                    </StyledTabs>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSuppliersActivityModal);
