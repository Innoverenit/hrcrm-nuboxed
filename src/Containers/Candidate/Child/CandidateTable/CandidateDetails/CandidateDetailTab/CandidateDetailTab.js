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
import { handleCandidateEducationModal } from "../../../../CandidateAction";
import { handleDocumentUploadModal } from "../../../../../Customer/CustomerAction";
import { handleCandidateTrainingModal } from "../../../../CandidateAction";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import {
  handleCandidateEmploymentModal,
  handleCandidateBankModal,
  handleCandidateActivityModal,
} from "../../../../CandidateAction";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AddDocumentModals from "../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
import LinkedDocuments from "../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments";
import EducationTable from "../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Education/EducationTable";
import TrainingTable from "../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Training/TrainingTable";
import EmploymentTable from "../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Employment/EmploymentTable";
const ReactCandidateSpeechModal = lazy(() => import("../../ReactCandidateSpeechModal"));
const ExperienceForm = lazy(() => import("../CandidateDetailTab/Experience/ExperienceForm"));
const CandidateEducationTable = lazy(() => import("./Education/CandidateEducationTable"));
const AddCandidateEducationModal = lazy(() => import("../CandidateDetailTab/Education/AddCandidateEducationModal"));
const AddCandidateTrainingModal = lazy(() => import("../CandidateDetailTab/Training/AddCandidateTrainingModal"));
const CandidateTrainingTable = lazy(() => import("./Training/CandidateTrainingTable"));
const AddCandidateEmploymentModal = lazy(() => import("./Employment/AddCandidateEmploymentModal"));
const CandidateEmploymentTable = lazy(() => import("./Employment/CandidateEmploymentTable"));
const AddBankModal = lazy(() => import("./Bank/AddBankModal"));
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
          // 'RecruitPro' 
'1697', // 'Experience', // 0
"1165",// ' Activity', 1
"316",// 'Notes', // 2
"138", // ' Documents',3
'1195',// Education   4
'1196',//Employment 5
 '1194',//Training 6
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
          <ActivityTable
                candidate={props.candidate.candidateId}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}             
              />
            </div>;
      case "2":
        return  <div>
          <PlacementTable
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText}
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
    addingEmail,
    handleDocumentUploadModal,
    documentUploadModal,
    handleOpportunityModal,
    addOpportunityModal,
    addCandidateEducationModal,
    handleCandidateEducationModal,
    handleCandidateTrainingModal, 
    addCandidateTrainingModal,
    handleCandidateEmploymentModal,
    addCandidateEmploymentModal,
    handleCandidateBankModal,
    addCandidateBankModal,
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
               
                   Activity


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
                <span class=" ml-1 !text-tab" >
                  RecruitPro
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
                  {/* {translatedContent[0]} */}
                  Experience
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
                <span class=" ml-1 !text-tab">
                  Documents
                  {/* {translatedContent[1]} */}
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
                  <NoteAltIcon className=" !text-icon mr-1" />
                Notes
                  {/* {translatedContent[2]} */}
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
                <span class=" ml-1 !text-tab" >
                  Education
                  {/* {translatedContent[5]} */}
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
                            handleCandidateEducationModal(true)
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
                <span class=" ml-1 !text-tab" >
                  Training
                  {/* {translatedContent[7]} */}
                </span>
                {activeKey === "7" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltipTitle="Add"
                      onClick={() =>
                        handleCandidateTrainingModal(true)
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
                <span class=" ml-1 !text-tab" >
                  Employment
                  {/* {translatedContent[6]} */}
                </span>
                {activeKey === "8" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltipTitle="Add"
                      onClick={() =>
                        handleCandidateEmploymentModal(true)
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
                <span class=" ml-1 !text-tab" >
                  Bank Details
                  {/* {translatedContent[8]} */}
                </span>
                {activeKey === "9" && (
                  <>
                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                     
                      tooltipTitle="Add"
                      onClick={() => handleCandidateBankModal(true)}
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
       
        <AddCandidateEducationModal
          addCandidateEducationModal={addCandidateEducationModal}
          handleCandidateEducationModal={handleCandidateEducationModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddCandidateTrainingModal
          addCandidateTrainingModal={addCandidateTrainingModal}
          handleCandidateTrainingModal={handleCandidateTrainingModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddCandidateEmploymentModal
          addCandidateEmploymentModal={addCandidateEmploymentModal}
          handleCandidateEmploymentModal={handleCandidateEmploymentModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddBankModal
          addCandidateBankModal={addCandidateBankModal}
          handleCandidateBankModal={handleCandidateBankModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <ActivityModal
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

const mapStateToProps = ({ candidate,customer, auth }) => ({
  user: auth.userDetails,
  documentUploadModal: customer.documentUploadModal,
  addCandidateEducationModal: candidate.addCandidateEducationModal,
  addCandidateTrainingModal: candidate.addCandidateTrainingModal,
  addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
  addCandidateBankModal: candidate.addCandidateBankModal,
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
      handleCandidateEducationModal,
      handleCandidateTrainingModal,
      handleCandidateEmploymentModal,
      handleCandidateBankModal,
      handleCandidateActivityModal,
      handleCandidateReactSpeechModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetailTab);
