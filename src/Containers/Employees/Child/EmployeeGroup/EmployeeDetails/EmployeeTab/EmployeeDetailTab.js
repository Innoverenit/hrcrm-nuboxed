import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { MailOutlined
} from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaymentIcon from '@mui/icons-material/Payment';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PhoneIcon from '@mui/icons-material/Phone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ContrastIcon from '@mui/icons-material/Contrast';
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import SchoolIcon from '@mui/icons-material/School';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

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
const CandidateTable =lazy(()=>import("../../../../../Candidate/Child/CandidateTable/CandidateTable"));
const OpportunityTable =lazy(()=>import("../../../../../Opportunity/Child/OpportunityTable/OpportunityTable"));
const CustomerTable =lazy(()=>import("../../../../../Customer/Child/CustomerTable/CustomerTable"));
const PartnerTable =lazy(()=>import("../../../../../Partner/child/PartnerTable/PartnerTable"));
const RecruitmentTable =lazy(()=>import("../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentTable"));
const EmployeeExperienceForm =lazy(()=>import("./Experience/EmployeeExperienceForm"));
const AddVisaModal =lazy(()=>import("./Visa/AddVisaModal"));
const VisaTable =lazy(()=>import("./Visa/VisaTable"));
const BankTable = lazy(() => import("./Bank/BankTable"));
const EducationTable = lazy(() => import("./Education/EducationTable"));
const EmploymentTable = lazy(() => import("./Employment/EmploymentTable"));
const TrainingTable = lazy(() => import("./Training/TrainingTable"));
const PersonalTable2 = lazy(() => import("./Personal/PersonalTable2"));
const EmployeesNotes = lazy(() => import("./Notes/EmployeesNotes"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
const TabPane = StyledTabs.TabPane;

class EmployeeDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
componentDidMount(){
  
}
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
                 <DirectionsRunIcon style={{fontSize:"1.1rem"}}/>
                <span class="  ml-1">
                    
                    Performance
                  </span>
                 
                   
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeePerformanceTable 
                singleEmployee={this.props.singleEmployee}
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
                        tooltipTitle="Add"
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
                <EducationTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                  {/* <HeadphonesIcon   style={{fontSize:"1.1rem"}}
                  /> */}
                  < ModelTrainingIcon />
                   <span class=" font-poppins ml-1" >Training
                    
                  </span>
                  {activeKey === "3" &&  user.userCreateInd === true && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <TrainingTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  {/* <AccountBalanceIcon   style={{fontSize:"1.1rem"}} /> */}
                  <AccountBalanceIcon/>
                  <span class=" font-poppins ml-1" >
                    
                    <FormattedMessage
                      id="app.employment"
                      defaultMessage="Employment"
                    />
                  </span>
                  {activeKey === "4" && user.userCreateInd === true &&(
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <EmploymentTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                
                <PhoneIcon 
                 style={{fontSize:"1.1rem"}}
                 />
                  <span class=" font-poppins ml-1">
                    
                    <FormattedMessage
                      id="app.emergency"
                      defaultMessage="Emergency"
                    />
                  </span>
                  {activeKey === "5" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <PersonalTable2 />
              </Suspense>
            </TabPane>
{user.userAccessInd === true ?(
            <TabPane
              tab={
                <>
                <AccountBalanceIcon   style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1">Bank Details
                  </span>
                  {activeKey === "6" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <BankTable />
              </Suspense>
            </TabPane>
):null}
{user.userAccessInd === true ?(
            <TabPane
              tab={
                <>
                <RecentActorsIcon  style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1">Personal Details
                  </span>
                  {activeKey === "7" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <PersonalDetailsTable />
              </Suspense>
            </TabPane>
            ):null}
            <TabPane
              tab={
                <>
                <NoteAltIcon  style={{fontSize:"1.1rem"}}/>
                  <span class="ml-1">  
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
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
                <EmployeesNotes />
              </Suspense>
            </TabPane> 
       
     
            <TabPane
              tab={
                <>
                 <PaymentIcon  style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1">Salary
                  </span>
                  {activeKey === "9" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <SalaryTable />
              </Suspense>
            </TabPane>
            {user.userAccessPlusInd === true ? (
            <TabPane
              tab={
                <>
                <FileCopyIcon   style={{fontSize:"1.1rem"}} />
                  <span class=" font-poppins ml-1">
                    
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
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
                <LinkedDocuments />
              </Suspense>
            </TabPane>
            ):null}
            <TabPane
              tab={
                <>
                <ContrastIcon  style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1">
                    
                   
                    <FormattedMessage
                      id="app.contract"
                      defaultMessage="Contract"
                    />
                  </span>
                  {activeKey === "11" && user.userCreateInd === true && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <ContractTable />
              </Suspense>
            </TabPane>
            
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
               <i class="fas fa-portrait" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1">
                    
                   
                    <FormattedMessage
                      id="app.talent"
                      defaultMessage="Talent"
                    />
                  </span>
                  {activeKey === "12" && (
                    <>
                      
                    </>
                  )}
                </>
              }
              key="12"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTable />
              </Suspense>
            </TabPane>
                :null} 

              {this.props.singleEmployee.suspendInd?    
            <TabPane
              tab={
                <>
                 <i class="far fa-lightbulb" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1" >
                  <FormattedMessage
                id="app.opportunity"
                defaultMessage="Opportunity"
              />
                  </span>
                  {activeKey === "13" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
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
              <Suspense fallback={"Loading ..."}>
                {" "}
                <OpportunityTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-building" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1">
                  <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              />
                  </span>
                  {activeKey === "14" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
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
                <CustomerTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                <ContactsIcon/>
                  <span class=" font-poppins ml-1">
                  <FormattedMessage
                  id="app.requirement"
                  defaultMessage="Requirement"
                />
                  </span>
                  {activeKey === "15" && (
                    <>
                  
                    </>
                  )}
                </>
              }
              key="15"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <RecruitmentTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-handshake" aria-hidden="true"></i>
                  <span class=" font-poppins ml-1">
                  <FormattedMessage
                id="app.vendor"
                defaultMessage="Vendor"
              />
                  </span>
                  {activeKey === "16" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
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
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PartnerTable />
              </Suspense>
            </TabPane>:null}

            <TabPane
              tab={
                <>
                
               <WorkspacePremiumIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1">                  
                Experience
                  </span>                 
                </>
              }
              key="17"
            >
             
              {/* <LinkedExperience/> */}
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeExperienceForm/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <SchoolIcon   style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins ml-1">
                    
                 Visa
                  </span>
                  {activeKey === "18" && user.userCreateInd === true && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
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
                <VisaTable />
              </Suspense>
            </TabPane>
      
        
          </StyledTabs> 
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddEmploymentModal
            addEmploymentModal={addEmploymentModal}
            handleEmploymentModal={handleEmploymentModal}
          />
          <AddPersonalModal
            addPersonalModal={addPersonalModal}
            handlePersonalModal={handlePersonalModal}
          />
          <AddEducationModal
            addEducationModal={addEducationModal}
            handleEducationModal={handleEducationModal}
          />
           <AddVisaModal
            addVisaModal={addVisaModal}
            handleVisaModal={handleVisaModal}
          />


          <AddTrainingModal
            addTrainingModal={addTrainingModal}
            handleTrainingModal={handleTrainingModal}
          />

          <AddBankModal
            addBankModal={addBankModal}
            handleBankModal={handleBankModal}
          />
          <AddPersonalDetailsModal
            addPersonalDetailsModal={addPersonalDetailsModal}
            handlePersonalDetailsModal={handlePersonalDetailsModal}
          />
          <AddSalaryModal
            addSalaryModal={addSalaryModal}
            handleSalaryModal={handleSalaryModal}
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContractModal
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
