import React, { lazy, Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Badge } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import MicIcon from '@mui/icons-material/Mic';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { handleCandidateReactSpeechModal } from "../../../../CandidateAction";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import SchoolIcon from '@mui/icons-material/School';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import {
  handleCandidateEmploymentModal,
  handleCandidateBankModal,
  handleCandidateActivityModal,
} from "../../../../CandidateAction";
import {
  handleEmploymentModal,
  handleTrainingModal,
  handleBankModal,
  handleEducationModal,handleDocumentUploadModal} from "../../../../../Profile/ProfileAction"
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ActivityListData from "../../../../../Activity/ActivityListData";

const AddDocumentModals = lazy(() => import("../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals"));
const LinkedDocuments = lazy(() => import("../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments"));
const EducationTable = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Education/EducationTable"));
const TrainingTable = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Training/TrainingTable"));
const EmploymentTable = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Employment/EmploymentTable"));
const AddBankModal = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Bank/AddBankModal"));
const AddTrainingModal = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Training/AddTrainingModal"));
const AddEducationModal = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Education/AddEducationModal"));
const AddEmploymentModal = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Employment/UpdateEmploymentModal"));
const ReactCandidateSpeechModal = lazy(() => import("../../ReactCandidateSpeechModal"));
const ExperienceForm = lazy(() => import("../CandidateDetailTab/Experience/ExperienceForm"));
const BankTable = lazy(() => import("../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Bank/BankTable"));
const PlacementTable = lazy(() => import("./Placement/PlacementTable"));
const ActivityModal = lazy(() => import("./Activity/ActivityModal"));
const ActivityTable = lazy(() => import("./Activity/ActivityTable"));


const TabPane = StyledTabs.TabPane;

function CandidateDetailTab(props) {
  const [activeKey, setActiveKey] = useState('1');
  const [translatedContent, setTranslatedContent] = useState('');
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleTabChange(key) {
    setActiveKey(key)
  }
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "1165",// ' Activity', 0
             "1286", // 'RecruitPro' 1
      '1697', // 'Experience', // 2
      "1166", // ' Documents',3
       "316",// 'Notes', // 4
      '1195',// Education   5
      '1194',//Training 6
      '1196',//Employment 7
     '1198',//Bank Details 8

      ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const renderTabContent = (key) => {
    switch (key) {
      case "1":
        return     <div> 
          <ActivityListData
          uniqueId={props.candidate.candidateId}
                candidate={props.candidate.candidateId}
                type={"talent"}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}             
              />
            </div>;
      case "2":
        return  <div>
          <PlacementTable
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
          //  translatedMenuItems={props.translatedMenuItems}
              />
        </div>;
    case "3":
      return  <div>
           <ExperienceForm 
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText}/>
      </div>;
         case "4":
          return  <div>
            <LinkedDocuments
              uniqueId={props.candidate.candidateId}
              type={"candidate"}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}
             /> 
          </div>;
          case "5":
            return  <div>
              
            </div>;
            case "6":
              return  <div>
                 <EducationTable
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
              </div>;
              case "7":
                return  <div>
                   <TrainingTable
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
                </div>;
 case "8":
  return  <div>
    <EmploymentTable
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
  </div>;
  case "8":
    return  <div>
       <BankTable
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
    </div>;
      default:
        return null;
    }
  };  
  const {
    candidate: { candidateId, name },
    handleEmploymentModal,
    handleTrainingModal,
    handleBankModal,
    handleEducationModal,
    addingEmail,
    handleDocumentUploadModal,
    documentUploadModal,
    addBankModal,
    addEducationModal,
    addEmploymentModal,
    addTrainingModal,
    handleOpportunityModal,
    addOpportunityModal,
    handleCandidateActivityModal,
    addCandidateActivityModal,
    handleCandidateReactSpeechModal,
    addCandidateSpeechModal,
  } = props;
  console.log(props.candidateId);
  console.log("activeKey", activeKey)
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>



          <TabPane
            tab={
              <>
                <span>
                <HourglassFullIcon className="text-[#edf67d] !text-icon" />
                <span class="ml-1 !text-tab font-poppins ">
                {/* Activity */}
                 {translatedMenuItems[0]}


                  </span>
                </span>
                {activeKey === "1" && (
                  <>

                    {/* {props.user.talentCreateInd === true && props.user.recruitOppsInd === true ( */}
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltiptitle=
                          "Create"
                       
                      
                      onClick={() =>
                        handleCandidateActivityModal(true)
                      }
               

                    />
                    {/* )} */}
                  </>
                )}
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
             
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                <TransferWithinAStationIcon
                  className=" !text-icon"
                />
                <span class=" ml-1 !text-tab" >   {translatedMenuItems[1]}
                  {/* RecruitPro */}
                  {/* {translatedContent[0]} */}
                </span>


              </>
            }
            key="2"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
            
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>

                <WorkspacePremiumIcon className=" !text-icon" />
                <span class=" ml-1 !text-tab" >
                {translatedMenuItems[2]}
                  {/* Experience */}
                </span>
              </>
            }
            key="3"
          >

            {/* <LinkedExperience/> */}
            <Suspense fallback={"Loading ..."}>
              {" "}
             
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                <FileCopyIcon className=" !text-icon" />
                <span class=" ml-1 !text-tab">   {translatedMenuItems[3]}
                  {/* Documents */}
           
                </span>
                <Badge
                count={props.documentsByCount.document}
                overflowCount={999}
              > 
                   </Badge>
                {activeKey === "4" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
                    text-[#6f0080ad]"

                      tooltipTitle="Upload Document"
                      onClick={() => handleDocumentUploadModal(true)}
                    
                    />
                  </>
                )}
              </>
            }
            key="4"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              
               
            </Suspense>
          </TabPane>

          <TabPane
            tab={
              <>
                <span  className="  !text-tab">
                  <NoteAltIcon className=" !text-icon mr-1" />{translatedMenuItems[4]}
                {/* Notes */}
            
                  &nbsp;
                  {activeKey === "5" && (
                    <>
                      <Tooltip title="Voice to Text">
                        <span
                          onClick={() => handleCandidateReactSpeechModal(true)}>
                          <MicIcon
                            className=" !text-icon"
                          />

                        </span>
                      </Tooltip>
                    </>
                  )}
                </span>
              </>
            }
            key="5"
          >
            <Suspense fallback={"Loading ..."}>
              {/* <LinkedNotes 
               translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}/>{" "} */}
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                <SchoolIcon className=" !text-icon" />
                <span class=" ml-1 !text-tab" >{translatedMenuItems[5]}
                  {/* Education */}
  
                </span>
                {activeKey === "6" && (
                  <>
                    {addingEmail ? (
                      <></>
                    ) : (
                      <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                         
                          tooltipTitle="Add"
                          onClick={() =>
                            handleEducationModal(true)
                          }
                       
                        />
                      </>
                    )}
                  </>
                )}
              </>
            }
            key="6"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
             
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                <HeadphonesIcon className=" !text-icon" />
                <span class=" ml-1 !text-tab" > {translatedMenuItems[6]}
                  {/* Training */}
                  {/* {translatedContent[7]} */}
                </span>
                {activeKey === "7" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltipTitle="Add"
                      onClick={() =>
                        handleTrainingModal(true)
                      }
                    />
                  </>
                )}
              </>
            }
            key="7"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
             
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                <AccountBalanceIcon className=" !text-icon" />
                <span class=" ml-1 !text-tab" >{translatedMenuItems[7]}
                  {/* Employment */}
                  {/* {translatedContent[6]} */}
                </span>
                {activeKey === "8" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltipTitle="Add"
                      onClick={() =>
                        handleEmploymentModal(true)
                      }
                    />
                  </>
                )}
              </>
            }
            key="8"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
             
            </Suspense>
          </TabPane>

          <TabPane
            tab={
              <>
                <AccountBalanceIcon className=" !text-icon" />
                <span class=" ml-1 !text-tab" > {translatedMenuItems[8]}
                  {/* Bank Details */}
                  {/* {translatedContent[8]} */}
                </span>
                {activeKey === "9" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltipTitle="Add"
                      onClick={() => handleBankModal(true)}
                    />
                  </>
                )}
              </>
            }
            key="9"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
             
            </Suspense>
          </TabPane>
        </StyledTabs>
        <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
      </TabsWrapper>
      <Suspense fallback={"Loading..."}>
       
        <AddEducationModal
         addEducationModal={addEducationModal}
         handleEducationModal={handleEducationModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddTrainingModal
           addTrainingModal={addTrainingModal}
           handleTrainingModal={handleTrainingModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddEmploymentModal
            addEmploymentModal={addEmploymentModal}
            handleEmploymentModal={handleEmploymentModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddBankModal
          addBankModal={addBankModal}
          handleBankModal={handleBankModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <ActivityModal
        defaultValue={[{ label: name, value: candidateId }]}
        candidateId={{value: candidateId}}
          uniqueId={props.candidate.candidateId}
          name={props.candidate.name}
          candidate={props.candidate}
          addCandidateActivityModal={addCandidateActivityModal}
          handleCandidateActivityModal={handleCandidateActivityModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
           <AddDocumentModals
           candidateId={props.candidate.candidateId}
           uniqueId={props.candidate.candidateId}
           type={"candidate"}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
          />
        <ReactCandidateSpeechModal
          candidate={props.candidate}
          handleCandidateReactSpeechModal={handleCandidateReactSpeechModal}
          addCandidateSpeechModal={addCandidateSpeechModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
      </Suspense>
    </>
  );
}

const mapStateToProps = ({ candidate,customer, auth,profile  }) => ({
  user: auth.userDetails,
  documentUploadModal: customer.documentUploadModal,
  addEducationModal: profile.addEducationModal,
  addTrainingModal: profile.addTrainingModal,
  addEmploymentModal: profile.addEmploymentModal,
  addBankModal: profile.addBankModal,
  addCandidateActivityModal: candidate.addCandidateActivityModal,
  addCandidateSpeechModal: candidate.addCandidateSpeechModal,
  candidateId: candidate.candidateId,
  candidate: candidate.candidate,
  documentsByCount:customer.documentsByCount
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleTrainingModal,
      handleEducationModal,
      handleEmploymentModal,
      handleBankModal,
      handleCandidateEmploymentModal,
      handleCandidateBankModal,
      handleCandidateActivityModal,
      handleCandidateReactSpeechModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetailTab);
