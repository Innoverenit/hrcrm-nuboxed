import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddBoxIcon from '@mui/icons-material/AddBox';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaymentIcon from '@mui/icons-material/Payment';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PhoneIcon from '@mui/icons-material/Phone';
import ContrastIcon from '@mui/icons-material/Contrast';
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import SchoolIcon from '@mui/icons-material/School';
import { Badge } from "antd";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ApartmentIcon from '@mui/icons-material/Apartment';
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
const AddDocumentModals =lazy(()=>import("../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals"));
const LinkedDocuments =lazy(()=>import("../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments"));
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
// const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
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
      "1139",//0Performance
      "1195",//1 Education
      "1194",//2Training
      "992",//3Employment
   "1197", //  4 "Emergency"
   "1198",//  5 Bank Details
   "1199",  //  6 Personal Details
   "316", //   7Notes"
    "981",  //  8 Salary
    "1166", // 9  Documents"
    "1205", //   10"Contract"
    "1153",  //  11 "Talent"
    "99", //  12 Opportunity"
    "248", // 13  "Customer"
    "1152",  //  14 Requirement"
    "870", //  15 "Vendor"
    "1697", //   16 Experience
    "1696", //   17 Visa
    "85", // add
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
console.log(this.props.singleEmployee)
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>

          <TabPane
              tab={
                <>
                 <DirectionsRunIcon className=" !text-icon"/>
                <span class="  !text-tab ml-1"> 
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
                <SchoolIcon  className=" !text-icon" />
                  <span class=" font-poppins ml-1  !text-tab" >
                    
                  {this.state.translatedMenuItems[1]}     {/* Education */}
                  </span>
                  {activeKey === "2" && user.userCreateInd === true &&(
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleEducationModal(true)}
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
                  
                  {/* <HeadphonesIcon   className=" !text-icon" 
                  /> */}
                  < ModelTrainingIcon className=" !text-icon" />
                   <span class="  !text-tab font-poppins ml-1" >
                   {this.state.translatedMenuItems[2]} {/* Training */}
                    
                  </span>
                  {activeKey === "3" &&  user.userCreateInd === true && (
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleTrainingModal(true)}
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
                  {/* <AccountBalanceIcon   className=" !text-icon"  /> */}
                  <AccountBalanceIcon className=" !text-icon"/>
                  <span class="  !text-tab font-poppins ml-1" >
                  {this.state.translatedMenuItems[3]}
                
                  </span>
                  {activeKey === "4" &&  user.userCreateInd === true &&(
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleEmploymentModal(true)}
                      
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
                  <span class="  !text-tab font-poppins ml-1">
                  {this.state.translatedMenuItems[4]}
                  </span>
                  {activeKey === "5" && user.userCreateInd === true && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handlePersonalModal(true)}
                       
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
                  <span class=" font-poppins ml-1  !text-tab">
                  {this.state.translatedMenuItems[5]}  {/* Bank Details */}
                  </span>
                  {activeKey === "6" && user.userCreateInd === true && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleBankModal(true)}
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
                   employeeId={this.props.singleEmployee.employeeId}
                   uniqueId={this.props.singleEmployee.employeeId}
                   type={"employee"}
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
                  <span class=" font-poppins ml-1  !text-tab">
                  {this.state.translatedMenuItems[6]}  {/* Personal Details */}
                  </span>
                  {activeKey === "7" && user.userCreateInd === true && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handlePersonalDetailsModal(true)}
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
                  <span class="ml-1  !text-tab">  
                  {this.state.translatedMenuItems[7]} 
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
                  <span class=" font-poppins ml-1  !text-tab">
                  {this.state.translatedMenuItems[8]} {/* Salary */}
                  </span>
                  {activeKey === "9" && user.userCreateInd === true && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleSalaryModal(true)}
            
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
                  <span class=" font-poppins ml-1  !text-tab">
                    
                  {this.state.translatedMenuItems[9]}   
                 
                  </span>
                  <Badge
                count={this.props.documentsByCount.document}
                overflowCount={999}
              > 
                   </Badge>
                  {activeKey === "10" && user.userCreateInd === true && (
                    <>
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle="Upload Document"
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="10"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments
          uniqueId={this.props.singleEmployee.employeeId}
          type={"employee"}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
         />
              </Suspense>
            </TabPane>
            ):null}
            <TabPane
              tab={
                <>
                <ContrastIcon className=" !text-icon"/>
                  <span class=" font-poppins ml-1  !text-tab">
                    
                   
                  {this.state.translatedMenuItems[10]} 
                  </span>
                  {activeKey === "11" && user.userCreateInd === true && (
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleContractModal(true)}
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
                  <span class=" font-poppins ml-1  !text-tab">
                    
                  {this.state.translatedMenuItems[11]}
                 
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
                  <span class=" font-poppins ml-1  !text-tab" >
               {this.state.translatedMenuItems[12]}
                  </span>
                  {activeKey === "13" && (
                    <>
                     
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
                 <ApartmentIcon className="!text-icon "/>
                  <span class=" font-poppins ml-1  !text-tab">
               {this.state.translatedMenuItems[13]}
                  </span>
                  {activeKey === "14" && (
                    <>
                     
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
                  <span class=" font-poppins ml-1  !text-tab">
                  {this.state.translatedMenuItems[14]} 
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
                  <span class=" font-poppins ml-1  !text-tab">
                  {this.state.translatedMenuItems[15]}   
                  </span>
                  {activeKey === "16" && (
                    <>
                    
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
                  <span class=" font-poppins ml-1  !text-tab">                  
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
                  <span class=" font-poppins ml-1  !text-tab">
                    
               {this.state.translatedMenuItems[17]}  {/* Visa */}
                  </span>
                  {activeKey === "18" && user.userCreateInd === true && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle={this.state.translatedMenuItems[18]}
                        onClick={() => handleVisaModal(true)}
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
            employeeId={this.props.singleEmployee.employeeId}
            uniqueId={this.props.singleEmployee.employeeId}
            type={"employee"}
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

           <AddDocumentModals
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            employeeId={this.props.singleEmployee.employeeId}
            uniqueId={this.props.singleEmployee.employeeId}
            type={"employee"}
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
const mapStateToProps = ({ profile,employee,auth,customer }) => ({
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
  documentsByCount:customer.documentsByCount
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