import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import{handleEmailProfileModal} from "../../../Profile/ProfileAction";
import { handleEducationModal } from "../../ProfileAction";
import { handleBankModal } from "../../ProfileAction";
import { handleTrainingModal } from "../../ProfileAction";
import { handleEmploymentModal } from "../../ProfileAction";
import { handlePersonalModal } from "../../ProfileAction";
import { handlePersonalDetailsModal } from "../../ProfileAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MailOutlined, PlusOutlined, 
} from '@ant-design/icons';
import CommitIcon from '@mui/icons-material/Commit';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import HealingIcon from '@mui/icons-material/Healing';
import SavingsIcon from '@mui/icons-material/Savings';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LeakAddIcon from '@mui/icons-material/LeakAdd';

const PerformanceTable = lazy(() => import("./Performance/PerformanceTable"));
const LinkAccountForm = lazy(() => import("././LinkAccount/LinkAccountForm"));
const EquipmentForm = lazy(() => import("./ProfileBoost/EquipmentForm"));
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
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
      activeKey: "1",
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
        "Performance",
        "Training",
        "Education",
        "Employment",
        "Emergency",
        "Bank Details",
        "Personal Details",
        "Signature",
        "Email",
        "Link Account",
        "Equipment",
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeKey: "1",
  //   };
  // }
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
                    <CommitIcon type="mail" className="!text-icon" />
                    <span class=" ml-[0.1rem]">
                    {this.state.translatedMenuItems[0]}{/* Performance */}
                  </span>
                    </span>
                 
                   
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PerformanceTable 
                employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <ModelTrainingIcon type="customer-service" className="!text-icon"/>
                    <span class=" ml-[0.1rem]">
                    {this.state.translatedMenuItems[1]} {/* Training */}
                  </span>
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
                  <SchoolIcon type="customer-service" className="!text-icon"/>
                    <span class=" ml-[0.1rem]">
                    {this.state.translatedMenuItems[2]}{/* Education */}
                  </span>
                  </span>
                  {activeKey === "3" && (
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
              key="3"
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
                    <BadgeIcon type="bank" className="!text-icon"/>
                    <span class=" ml-[0.1rem]">
                    {this.state.translatedMenuItems[3]} {/* Employment */}
                  </span>
                  </span>
                  {activeKey === "4" && (
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
              key="4"
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
                    <HealingIcon className="!text-icon" type="phone" />
                    <span class=" ml-[0.1rem]">

                    {this.state.translatedMenuItems[4]} {/* Emergency */}
                    </span>
                  </span>
                  {activeKey === "5" && (
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
              key="5"
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
                  <SavingsIcon className="!text-icon" type="phone" />
                     <span class=" ml-[0.1rem]"> 
                     {this.state.translatedMenuItems[5]} {/* Bank Details */}
                  </span>
                  </span>
                  {activeKey === "6" && (
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
              key="6"
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
                  < MailOutlineIcon className="!text-icon" type="phone" />
                    <span class=" ml-[0.1rem]">
                    {this.state.translatedMenuItems[6]}   {/* Personal Details */}
                  </span>
                  </span>
                  {activeKey === "7" && (
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
              key="7"
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
                  <EditNoteIcon className="!text-icon"/>
                    <span class=" ml-[0.1rem]"> 
                    {this.state.translatedMenuItems[7]}  {/* Signature */}
                  </span>
                  </span>
                </>
              }
              key="8"
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
                    <MailOutlined type="mail" className="!text-icon"/>
                    <span class=" ml-[0.1rem]"> 
                    {this.state.translatedMenuItems[8]} {/* Email */}
                  </span>
                  </span>
                  {activeKey === "9" && (
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
              key="9"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmailTable 
                employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <LeakAddIcon className="!text-icon"/>
                    <span class=" ml-[0.1rem]"> 
                    {this.state.translatedMenuItems[9]} {/* Link Account */}
                  </span>
                  </span>
                  {/* {activeKey === "9" && (
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
                  )} */}
                </>
              }
              key="10"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkAccountForm
                employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <HomeRepairServiceIcon className="!text-icon" />
                    <span class=" ml-[0.1rem]"> 
                    {this.state.translatedMenuItems[10]}{/* Equipment */}
                  </span>
                  </span>
            
            
                </>
              }
              key="11"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EquipmentForm
                employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

         

          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading ..."}>
        <AddEmailModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addEmailProfileModal={addEmailProfileModal}
          handleEmailProfileModal={handleEmailProfileModal}
        />

        <AddPersonalModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addPersonalModal={addPersonalModal}
          handlePersonalModal={handlePersonalModal}
          employeeId={this.props.userDetails.employeeId}

        />
        <AddEducationModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addEducationModal={addEducationModal}
          handleEducationModal={handleEducationModal}
          employeeId={this.props.userDetails.employeeId}
        />

        <AddTrainingModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addTrainingModal={addTrainingModal}
          handleTrainingModal={handleTrainingModal}
          employeeId={this.props.userDetails.employeeId}
        />

        <AddEmploymentModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addEmploymentModal={addEmploymentModal}
          handleEmploymentModal={handleEmploymentModal}
          employeeId={this.props.userDetails.employeeId}
        />
        <AddBankModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addBankModal={addBankModal}
          handleBankModal={handleBankModal}
          employeeId={this.props.userDetails.employeeId}
        />
        <AddPersonalDetailsModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          addPersonalDetailsModal={addPersonalDetailsModal}
          handlePersonalDetailsModal={handlePersonalDetailsModal}
          employeeId={this.props.userDetails.employeeId}
        /></Suspense>
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
