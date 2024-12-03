import React, { lazy, Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { translateText, } from '../../../../../Translate/TranslateService';
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
import {
  handleCandidateEmploymentModal,
  handleCandidateBankModal,
  handleCandidateActivityModal,
} from "../../../../CandidateAction";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AddDocumentModals from "../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
import LinkedDocuments from "../../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments";
const ReactCandidateSpeechModal = lazy(() => import("../../ReactCandidateSpeechModal"));
const ExperienceForm = lazy(() => import("../CandidateDetailTab/Experience/ExperienceForm"));
const CandidateEducationTable = lazy(() => import("./Education/CandidateEducationTable"));
const AddCandidateEducationModal = lazy(() => import("../CandidateDetailTab/Education/AddCandidateEducationModal"));
const AddCandidateTrainingModal = lazy(() => import("../CandidateDetailTab/Training/AddCandidateTrainingModal"));
const CandidateTrainingTable = lazy(() => import("./Training/CandidateTrainingTable"));
const AddCandidateEmploymentModal = lazy(() => import("./Employment/AddCandidateEmploymentModal"));
const CandidateEmploymentTable = lazy(() => import("./Employment/CandidateEmploymentTable"));
const AddBankModal = lazy(() => import("./Bank/AddBankModal"));
const BankTable = lazy(() => import("./Bank/BankTable"));
const PlacementTable = lazy(() => import("./Placement/PlacementTable"));
const ActivityModal = lazy(() => import("./Activity/ActivityModal"));
const ActivityTable = lazy(() => import("./Activity/ActivityTable"));

const TabPane = StyledTabs.TabPane;

function CandidateDetailTab(props) {
  const [activeKey, setActiveKey] = useState('1');
  const [translatedContent, setTranslatedContent] = useState('');
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeKey: "1",
  //   };
  // }


  // handleTabChange = (key) => this.setState({ activeKey: key });

  function handleTabChange(key) {
    setActiveKey(key)
  }

  useEffect(() => {



    const fetchTranslation = async () => {
      try {
        const translation = await Promise.all([
          translateText('RecruitPro', props.selectedLanguage),
          translateText('Experience', props.selectedLanguage),
          translateText('Activity', props.selectedLanguage),
          translateText('Documents', props.selectedLanguage),
          translateText('Notes', props.selectedLanguage),
          translateText('Education', props.selectedLanguage),
          translateText('Employment', props.selectedLanguage),
          translateText('Training', props.selectedLanguage),

          translateText('Bank Details', props.selectedLanguage),
        ]);

        setTranslatedContent(translation);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchTranslation();
  }, [props.selectedLanguage]);
  const renderTabContent = (key) => {
    switch (key) {
      case "1":
        return     <div> 
          <ActivityTable
                candidate={props.candidate.candidateId}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
              />
            </div>;
      case "2":
        return  <div>
          <PlacementTable
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
              />
        </div>;
    case "3":
      return  <div>
           <ExperienceForm 
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
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
                 <CandidateEducationTable 
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
              </div>;
              case "7":
                return  <div>
                   <CandidateTrainingTable 
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
                </div>;
 case "8":
  return  <div>
    <CandidateEmploymentTable 
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

  // const { activeKey } = this.state;
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
                  <LocalActivityIcon className=" !text-icon" />
                  <span class=" ml-1 !text-tab" >
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
                  {/* {translatedContent[1]} */}
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
                  {/* {translatedContent[3]} */}
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
                  <NoteAltIcon className=" !text-icon " />
                Notes
                  {/* {translatedContent[4]} */}
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
