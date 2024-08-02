import React, { lazy} from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProspectCustomerForm from "./ProspectCustomerForm";
import SupplierContactuserForm from "./SupplierContactuserForm";
import ProspectContactToUserForm from "./ProspectContactToUserForm"
const ApproveForm = lazy(() => import("./ApproveForm"));
const MileageApproveForm = lazy(() => import("./MileageApproveForm"));
const ExpenseApproveForm = lazy(() => import("./ExpenseApproveForm"));
const ContactUserForm = lazy(() => import("./ContactUserForm"));
const PhonesPairApproveForm = lazy(() => import("./PhonesPairApproveForm"));



const TabPane = StyledTabs.TabPane;

function ApprovalTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Leaves`} key="1">
                        <div class=" mt-4" >
                        <ApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Mileage`} key="2">
                    <div class=" mt-4" >
                        <MileageApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Expense`} key="3">
                        <div style={{ marginTop: 10 }}>
                        <ExpenseApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Customer Contact To User`} key="4">
                        <div style={{ marginTop: 10 }}>
                        <ContactUserForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Supplier Contact To User`} key="5">
                        <div style={{ marginTop: 10 }}>
                        <SupplierContactuserForm/>
                        </div>
                    </TabPane>
                    {props.user.repairInd === true && (
                    <TabPane tab={`Repair`} key="6">
                        <div style={{ marginTop: 10 }}>
                        <PhonesPairApproveForm/>
                        </div>
                    </TabPane>
                    )}
                      <TabPane tab={`Prospect to Customer`} key="7">
                        <div style={{ marginTop: 10 }}>
                        <ProspectCustomerForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Prospect Contact to User`} key="8">
                        <div style={{ marginTop: 10 }}>
                        <ProspectContactToUserForm/>
                        </div>
                    </TabPane>
                    {/* <TabPane tab={`ApproveList`} key="4">
                        <div style={{ marginTop: 10 }}>
                            <ApproveTable/>
                        </div>
                    </TabPane> */}
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({
    user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalTab);


