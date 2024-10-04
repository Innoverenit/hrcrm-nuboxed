import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { PlusOutlined } from "@ant-design/icons";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaymentIcon from '@mui/icons-material/Payment';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PhoneIcon from '@mui/icons-material/Phone';
import ContrastIcon from '@mui/icons-material/Contrast';
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import SchoolIcon from '@mui/icons-material/School';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


import {
  handlePersonalModal,
  handleEmploymentModal,
  handleTrainingModal,
  handleBankModal,
  handleEducationModal,
  handleVisaModal,
  handlePersonalDetailsModal,
  handleSalaryModal,
  handleDocumentUploadModal,
  handleContractModal,
} from "../../../../../Profile/ProfileAction";

const EmployeePerformanceTable =lazy(()=>import("./Performance/EmployeePerformanceTable"));
const AddPersonalModal =lazy(()=>import("../EmployeeTab/Personal/AddPersonalModal"));
const AddEducationModal =lazy(()=>import("./Education/AddEducationModal"));
const AddTrainingModal =lazy(()=>import("./Training/AddTrainingModal"));
const AddEmploymentModal =lazy(()=>import("./Employment/AddEmploymentModal"));
const AddBankModal =lazy(()=>import("./Bank/AddBankModal"));
const PersonalDetailsTable =lazy(()=>import("./PersonalDetails/PersonalDetailsTable"));
const AddPersonalDetailsModal =lazy(()=>import("./PersonalDetails/AddPersonalDetailsModal"));
const AddSalaryModal =lazy(()=>import("./Salary/AddSalaryModal"));
const SalaryTable =lazy(()=>import("./Salary/SalaryTable"));
const AddContractModal =lazy(()=>import("./Contract/AddContractModal"));
const ContractTable =lazy(()=>import("./Contract/ContractTable"));
const ContactsIcon =lazy(()=>import("@mui/icons-material/Contacts"));
const EmployeeExperienceForm =lazy(()=>import("./Experience/EmployeeExperienceForm"));
const AddVisaModal =lazy(()=>import("./Visa/AddVisaModal"));
const VisaTable =lazy(()=>import("./Visa/VisaTable"));
const BankTable = lazy(() => import("./Bank/BankTable"));
const EducationTable = lazy(() => import("./Education/EducationTable"));
const EmploymentTable = lazy(() => import("./Employment/EmploymentTable"));
const TrainingTable = lazy(() => import("./Training/TrainingTable"));
const PersonalTable2 = lazy(() => import("./Personal/PersonalTable2"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
const TabPane = StyledTabs.TabPane;

class EmployeeDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      translatedMenuItems: [],
    };
  }
componentDidMount(){
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
      "85",//0Performance
      "294",//1 Education
      "104",//2Training
      "796",//3Employment
   "", //  4 "Emergency"
   "",//  5 Bank Details
   "",  //  6 Personal Details
   "", //   7Notes"
    "",  //  8 Salary
    "", // 9  Documents"
    "", //   10"Contract"
    "",  //  11 "Talent"
    "", //  12 Opportunity"
    "", // 13  "Customer"
    "",  //  14 Requirement"
    "", //  15 "Vendor"
    "", //   16 Experience
    "", //   17 Visa
    "", // add
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
      addEducationModal,
      addVisaModal,
      handleEducationModal,
      handleVisaModal,
      addTrainingModal,
      handleTrainingModal,
      addEmploymentModal,
      handleEmploymentModal,
      addPersonalModal,
      handlePersonalModal,
      addPersonalDetailsModal,
      addSalaryModal,
      handlePersonalDetailsModal,
      handleSalaryModal,
      addBankModal,
      handleBankModal,
      handleDocumentUploadModal,
      documentUploadModal,
      addContractModal,
      handleContractModal,
      user
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>

          <TabPane
              tab={
                <>
                 <DirectionsRunIcon className=" !text-icon"/>
                <span class="  ml-1"> 
                {this.state.translatedMenuItems[0]}   {/* Performance  */}
                   </span>
                  </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeePerformanceTable 
                singleEmployee={this.props.singleEmployee}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <SchoolIcon   style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1" >
                    
                  Education
                  </span>
                  {activeKey === "2" && user.userCreateInd === true &&(
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleEducationModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EducationTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                  {/* <HeadphonesIcon   style={{fontSize:"1.1rem"}}
                  /> */}
                  < ModelTrainingIcon className=" !text-icon" />
                   <span class=" font-poppins ml-1" >
                   {this.state.translatedMenuItems[2]} {/* Training */}
                    
                  </span>
                  {activeKey === "3" &&  user.userCreateInd === true && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleTrainingModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TrainingTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  {/* <AccountBalanceIcon   style={{fontSize:"1.1rem"}} /> */}
                  <AccountBalanceIcon className=" !text-icon"/>
                  <span class=" font-poppins ml-1" >
                  {this.state.translatedMenuItems[3]}
                    {/* <FormattedMessage
                      id="app.employment"
                      defaultMessage="Employment"
                    /> */}
                  </span>
                  {activeKey === "4" &&  user.userCreateInd === true &&(
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleEmploymentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmploymentTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                
                <PhoneIcon 
                 className=" !text-icon"
                 />
                  <span class=" font-poppins ml-1">
                  {this.state.translatedMenuItems[4]}
                    {/* <FormattedMessage
                      id="app.emergency"
                      defaultMessage="Emergency"
                    /> */}
                  </span>
                  {activeKey === "5" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handlePersonalModal(true)}
                        size="14px"
                        class="ml-1"
                        style={{ verticalAlign: "center" }}
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
                <PersonalTable2
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage} />
              </Suspense>
            </TabPane>
{user.userAccessInd === true ?(
            <TabPane
              tab={
                <>
                <AccountBalanceIcon  className=" !text-icon"/>
                  <span class=" font-poppins ml-1">
                  {this.state.translatedMenuItems[5]}  {/* Bank Details */}
                  </span>
                  {activeKey === "6" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleBankModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage} />
              </Suspense>
            </TabPane>
):null}
{user.userAccessInd === true ?(
            <TabPane
              tab={
                <>
                <RecentActorsIcon className=" !text-icon"/>
                  <span class=" font-poppins ml-1">
                  {this.state.translatedMenuItems[6]}  {/* Personal Details */}
                  </span>
                  {activeKey === "7" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handlePersonalDetailsModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PersonalDetailsTable
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage} />
              </Suspense>
            </TabPane>
            ):null}
            <TabPane
              tab={
                <>
                <NoteAltIcon  className=" !text-icon"/>
                  <span class="ml-1">  
                  {this.state.translatedMenuItems[7]}  {/* <FormattedMessage id="app.notes" defaultMessage="Notes" /> */}
                  </span>
                  {activeKey === "8" && (
                    <>
                     
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <EmployeesNotes /> */}
              </Suspense>
            </TabPane> 
       
     
            <TabPane
              tab={
                <>
                 <PaymentIcon  className=" !text-icon"/>
                  <span class=" font-poppins ml-1">
                  {this.state.translatedMenuItems[8]} {/* Salary */}
                  </span>
                  {activeKey === "9" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleSalaryModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="9"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SalaryTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            {user.userAccessPlusInd === true ? (
            <TabPane
              tab={
                <>
                <FileCopyIcon   className=" !text-icon" />
                  <span class=" font-poppins ml-1">
                    
                  {this.state.translatedMenuItems[9]}    {/* <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    /> */}
                  </span>
                  {/* {activeKey === "9" && user.userCreateInd === true && (
                    <>
                        <PlusOutlined
                        type="plus"
                        tooltipTitle="Upload Document"
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )} */}
                </>
              }
              key="10"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            ):null}
            <TabPane
              tab={
                <>
                <ContrastIcon className=" !text-icon"/>
                  <span class=" font-poppins ml-1">
                    
                   
                  {this.state.translatedMenuItems[10]} {/* <FormattedMessage
                      id="app.contract"
                      defaultMessage="Contract"
                    /> */}
                  </span>
                  {activeKey === "11" && user.userCreateInd === true && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleContractModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="11"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ContractTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
               <i class="fas fa-portrait" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1">
                    
                  {this.state.translatedMenuItems[11]}
                    {/* <FormattedMessage
                      id="app.talent"
                      defaultMessage="Talent"
                    /> */}
                  </span>
                  {activeKey === "12" && (
                    <>
                      
                    </>
                  )}
                </>
              }
              key="12"
            >
           
            </TabPane>
                :null} 

              {this.props.singleEmployee.suspendInd?    
            <TabPane
              tab={
                <>
                 <i class="far fa-lightbulb" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1" >
                  {/* <FormattedMessage
                id="app.opportunity"
                defaultMessage="Opportunity"
              /> */}{this.state.translatedMenuItems[12]}
                  </span>
                  {activeKey === "13" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="13"
            >
           
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-building" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1">
                  {/* <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              /> */}{this.state.translatedMenuItems[13]}
                  </span>
                  {activeKey === "14" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="14"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                <ContactsIcon className=" !text-icon"/>
                  <span class=" font-poppins ml-1">
                  {this.state.translatedMenuItems[14]} {/* <FormattedMessage
                  id="app.requirement"
                  defaultMessage="Requirement"
                /> */}
                  </span>
                  {activeKey === "15" && (
                    <>
                  
                    </>
                  )}
                </>
              }
              key="15"
            >
             
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-handshake" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1">
                  {this.state.translatedMenuItems[15]}    {/* <FormattedMessage
                id="app.vendor"
                defaultMessage="Vendor"
              /> */}
                  </span>
                  {activeKey === "16" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="16"
            >
              
            </TabPane>:null}

            <TabPane
              tab={
                <>
                
               <WorkspacePremiumIcon className=" !text-icon"/>
                  <span class=" font-poppins ml-1">                  
                  {this.state.translatedMenuItems[16]} {/* Experience */}
                  </span>                 
                </>
              }
              key="17"
            >
             
              {/* <LinkedExperience/> */}
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeExperienceForm
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <SchoolIcon  className=" !text-icon"/>
                  <span class=" font-poppins ml-1">
                    
               {this.state.translatedMenuItems[17]}  {/* Visa */}
                  </span>
                  {activeKey === "18" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleVisaModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="18"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <VisaTable 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
      
        
          </StyledTabs> 
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddEmploymentModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addEmploymentModal={addEmploymentModal}
            handleEmploymentModal={handleEmploymentModal}
          />
          <AddPersonalModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addPersonalModal={addPersonalModal}
            handlePersonalModal={handlePersonalModal}
          />
          <AddEducationModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addEducationModal={addEducationModal}
            handleEducationModal={handleEducationModal}
          />
           <AddVisaModal
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            addVisaModal={addVisaModal}
            handleVisaModal={handleVisaModal}
          />


          <AddTrainingModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addTrainingModal={addTrainingModal}
            handleTrainingModal={handleTrainingModal}
          />

          <AddBankModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addBankModal={addBankModal}
            handleBankModal={handleBankModal}
          />
          <AddPersonalDetailsModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addPersonalDetailsModal={addPersonalDetailsModal}
            handlePersonalDetailsModal={handlePersonalDetailsModal}
          />
          <AddSalaryModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addSalaryModal={addSalaryModal}
            handleSalaryModal={handleSalaryModal}
          />

          <AddDocumentModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContractModal
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
            addContractModal={addContractModal}
            handleContractModal={handleContractModal}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ profile,employee,auth }) => ({
  addEducationModal: profile.addEducationModal,
  addVisaModal:profile.addVisaModal,
  user:auth.userDetails,
  addTrainingModal: profile.addTrainingModal,
  addEmploymentModal: profile.addEmploymentModal,
  addPersonalModal: profile.addPersonalModal,
  addBankModal: profile.addBankModal,
  addPersonalDetailsModal: profile.addPersonalDetailsModal,
  addSalaryModal: profile.addSalaryModal,
  documentUploadModal: profile.documentUploadModal,
  addContractModal: profile.addContractModal,
  singleEmployee:employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTrainingModal,
      handleEducationModal,
      handleVisaModal,
      handleEmploymentModal,
      handlePersonalModal,
      handleBankModal,
      handlePersonalDetailsModal,
      handleSalaryModal,
      handleDocumentUploadModal,
      handleContractModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailTab);
