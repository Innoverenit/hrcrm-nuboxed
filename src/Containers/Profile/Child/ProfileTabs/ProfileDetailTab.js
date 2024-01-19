import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import {
  BankOutlined,
  CustomerServiceOutlined, MailOutlined, PhoneOutlined, PlusOutlined, 
} from '@ant-design/icons';
import{handleEmailProfileModal} from "../../../Profile/ProfileAction";
import { handleEducationModal } from "../../ProfileAction";
import { handleBankModal } from "../../ProfileAction";
import { handleTrainingModal } from "../../ProfileAction";
import { handleEmploymentModal } from "../../ProfileAction";
import { handlePersonalModal } from "../../ProfileAction";
import { handlePersonalDetailsModal } from "../../ProfileAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const AddEducationModal = lazy(() => import("./ProfileBoost/Education/AddEducationModal"));
const AddTrainingModal = lazy(() => import("./ProfileBoost/Training/AddTrainingModal"));
const AddEmploymentModal = lazy(() => import("./ProfileBoost/Employment/AddEmploymentModal"));
const AddPersonalModal = lazy(() => import("./ProfileBoost/Personal/AddPersonalModal"));
const AddBankModal = lazy(() => import("./ProfileBoost/Bank/AddBankModal"));
const AddPersonalDetailsModal = lazy(() => import("./ProfileBoost/PersonalDetails/AddPersonalDetailsModal"));
const Signature = lazy(() => import("./ProfileBoost/Signature"));
const EmailTable = lazy(() => import("./ProfileBoost/Email/EmailTable"));
const AddEmailModal = lazy(() => import("../ProfileTabs/AddEmailModal"));

const BankTable = lazy(() => import("./ProfileBoost/Bank/BankTable"));
const EducationTable = lazy(() =>
  import("./ProfileBoost/Education/EducationTable")
);
const EmploymentTable = lazy(() =>
  import("./ProfileBoost/Employment/EmploymentTable")
);
const TrainingTable = lazy(() =>
  import("./ProfileBoost/Training/TrainingTable")
);

const PersonalTable2 = lazy(() =>
  import("./ProfileBoost/Personal/PersonalTable2")
);

const PersonalDetailsTable = lazy(() =>
  import("./ProfileBoost/PersonalDetails/PersonalDetailsTable")
);



const TabPane = StyledTabs.TabPane;

class ProfileDetailTab extends Component {
  state = {
    order: [],
  };

  moveTabNode = (dragKey, hoverKey) => {
    const newOrder = this.state.order.slice();
    const { children } = this.props;

    React.Children.forEach(children, (c) => {
      if (newOrder.indexOf(c.key) === -1) {
        newOrder.push(c.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);

    this.setState({
      order: newOrder,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    console.log(this.props.userDetails.employeeId)
    const { order } = this.state;
    const { children } = this.props;

    const { activeKey } = this.state;
    // const {
    //   userDetails: { firstName },
    // } = this.props;
    const {
      addEducationModal,
      handleEducationModal,
      addingEmail,
      addEmailProfileModal,
      handleEmailProfileModal,
      addTrainingModal,
      handleTrainingModal,
      addEmploymentModal,
      handleEmploymentModal,
      addPersonalModal,
      handlePersonalModal,
      addBankModal,
      handleBankModal,
      addPersonalDetailsModal,
      handlePersonalDetailsModal,
    } = this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-graduation-cap"></i>
                    &nbsp; Education
                  </span>
                  {activeKey === "1" && (
                    <>
                      {addingEmail ? (
                        <></>
                      ) : (
                          <>
                            <PlusOutlined
                              type="plus"
                              tooltipTitle="Add"
                              onClick={() => handleEducationModal(true)}
                              size="1em"
                              style={{
                                marginLeft: 10,
                                verticalAlign: "center",
                              }}
                            />
                          </>
                        )}
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EducationTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <CustomerServiceOutlined type="customer-service" />
                    Training
                  </span>
                  {activeKey === "2" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleTrainingModal(true)}
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TrainingTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <BankOutlined type="bank" />
                    Employment
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleEmploymentModal(true)}
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmploymentTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <PhoneOutlined type="phone" />
                    Emergency
                  </span>
                  {activeKey === "4" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handlePersonalModal(true)}
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <PersonalTable /> */}
                <PersonalTable2 employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-credit-card"></i>&nbsp; Bank Details
                  </span>
                  {activeKey === "5" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleBankModal(true)}
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-id-card"></i>&nbsp; Personal Details
                  </span>
                  {activeKey === "6" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handlePersonalDetailsModal(true)}
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PersonalDetailsTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i className="fas fa-file-signature"></i>
                    &nbsp; Signature
                  </span>
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Signature employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <MailOutlined type="mail" />
                    Email
                  </span>
                  {activeKey === "8" && (
                    <>
                      <>
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Add"
                          onClick={() =>
                            this.props.handleEmailProfileModal(true) 
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
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmailTable 
                employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
        
        <AddEmailModal
          addEmailProfileModal={addEmailProfileModal}
          handleEmailProfileModal={handleEmailProfileModal}
        />

        <AddPersonalModal
          addPersonalModal={addPersonalModal}
          handlePersonalModal={handlePersonalModal}
          employeeId={this.props.userDetails.employeeId}

        />
        <AddEducationModal
          addEducationModal={addEducationModal}
          handleEducationModal={handleEducationModal}
          employeeId={this.props.userDetails.employeeId}
        />

        <AddTrainingModal
          addTrainingModal={addTrainingModal}
          handleTrainingModal={handleTrainingModal}
          employeeId={this.props.userDetails.employeeId}
        />

        <AddEmploymentModal
          addEmploymentModal={addEmploymentModal}
          handleEmploymentModal={handleEmploymentModal}
          employeeId={this.props.userDetails.employeeId}
        />
        <AddBankModal
          addBankModal={addBankModal}
          handleBankModal={handleBankModal}
          employeeId={this.props.userDetails.employeeId}
        />
        <AddPersonalDetailsModal
          addPersonalDetailsModal={addPersonalDetailsModal}
          handlePersonalDetailsModal={handlePersonalDetailsModal}
          employeeId={this.props.userDetails.employeeId}
        />
      </>
    );
  }
}
const mapStateToProps = ({ profile }) => ({
  addEducationModal: profile.addEducationModal,
  addTrainingModal: profile.addTrainingModal,
  addEmploymentModal: profile.addEmploymentModal,
  addPersonalModal: profile.addPersonalModal,
  addBankModal: profile.addBankModal,
  addPersonalDetailsModal: profile.addPersonalDetailsModal,
  // addEmailModal: profile.addEmailModal,
  addEmailProfileModal:profile.addEmailProfileModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTrainingModal,
      handleEducationModal,
      handleEmploymentModal,
      handlePersonalModal,
      handleBankModal,
      handleEmailProfileModal,
      handlePersonalDetailsModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailTab);
