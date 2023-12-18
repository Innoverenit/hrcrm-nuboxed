import React, { Component, lazy, Suspense ,useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { translateText, getSupportedLanguages } from '../../../../../Translate/TranslateService';
import { Icon, Tooltip } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { PlusOutlined } from "@ant-design/icons";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { handleCandidateReactSpeechModal } from "../../../../CandidateAction";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import SchoolIcon from '@mui/icons-material/School';
import { handleCandidateEducationModal } from "../../../../CandidateAction";
import { handleDocumentUploadModal } from "../../../../CandidateAction";
import { handleCandidateTrainingModal } from "../../../../CandidateAction";
import {
  handleCandidateEmploymentModal,
  handleCandidateBankModal,
  handleCandidateActivityModal,
} from "../../../../CandidateAction";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ExperienceForm from "./Experience/ExperienceForm";
import ReactCandidateSpeechModal from "../../ReactCandidateSpeechModal";
// import ExperienceForm from "./Experience/ExperienceForm";
const LinkedDocuments = lazy(()=>import("./Document/LinkedDocuments"));

const AddDocumentModal = lazy(()=>import("./Document/AddDocumentModal"));
const CandidateEducationTable = lazy(()=>import("./Education/CandidateEducationTable"));
const AddCandidateEducationModal = lazy(()=>import("../CandidateDetailTab/Education/AddCandidateEducationModal"));
const AddCandidateTrainingModal =lazy(()=>import("../CandidateDetailTab/Training/AddCandidateTrainingModal"));
const CandidateTrainingTable =lazy(()=>import("./Training/CandidateTrainingTable"));
const AddCandidateEmploymentModal =lazy(()=>import("./Employment/AddCandidateEmploymentModal"));
const CandidateEmploymentTable =lazy(()=>import("./Employment/CandidateEmploymentTable"));
const AddBankModal =lazy(()=>import("./Bank/AddBankModal"));
const BankTable =lazy(()=>import("./Bank/BankTable"));
const PlacementTable =lazy(()=>import("./Placement/PlacementTable"));
const ActivityModal =lazy(()=>import("./Activity/ActivityModal"));
const ActivityTable = lazy(() => import("./Activity/ActivityTable"));
const LinkedNotes = lazy(() => import("./Notes/LinkedNotes"));

const TabPane = StyledTabs.TabPane;

function CandidateDetailTab (props) {
  const [activeKey, setActiveKey] = useState('1');
  const [translatedContent, setTranslatedContent] = useState('');
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeKey: "1",
  //   };
  // }
  

  // handleTabChange = (key) => this.setState({ activeKey: key });

  function handleTabChange(key){
    setActiveKey({ activeKey: key})
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
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
           
            <TabPane
              tab={
                <>  
                  <TransferWithinAStationIcon 
                  style={{fontSize:"1.1rem"}}
                   />
                    <span style={{ marginLeft: "0.25em" }}>
                      RecruitPro
                      {/* {translatedContent[0]} */}
                      </span>
                  
                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PlacementTable 
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                
               <WorkspacePremiumIcon style={{fontSize:"1.1rem"}}/>
                  <span style={{ marginLeft: "0.25em" }}>                  
                  {/* {translatedContent[1]} */}
                  Experience
                  </span>                 
                </>
              }
              key="9"
            >
             
              {/* <LinkedExperience/> */}
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ExperienceForm/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <LocalActivityIcon style={{fontSize:"1.1rem"}}/>
                    <span style={{ marginLeft: "0.25em" }}>
                      Activity
                      {/* {translatedContent[2]} */}
                      </span>
                  </span>
                  {activeKey === "2" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Create"
                        onClick={() =>
                          handleCandidateActivityModal(true)
                        }
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
                <ActivityTable 
                candidate={props.candidateId}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <FileCopyIcon style={{fontSize:"1.1rem"}} />
                  <span style={{ marginLeft: "0.25em" }}>
                    Documents
                    {/* {translatedContent[3]} */}
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Upload Document"
                        onClick={() => handleDocumentUploadModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <span>
                <NoteAltIcon style={{fontSize:"1.1rem"}}/>
                &nbsp;
                    <FormattedMessage
                      id="app.notes"
                      defaultMessage="Notes"
                    />
                      {/* {translatedContent[4]} */}
                    &nbsp; 
                    {activeKey === "4" && (
                      <>
                        <Tooltip title="Voice to Text">
                      <span                       
                   onClick={()=>handleCandidateReactSpeechModal(true)}>
                  <MicIcon
                  style={{fontSize:"1.1rem"}}
                   />
                  
                  </span>
                  </Tooltip>
                  </>
                    )}
                    </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                <LinkedNotes />{" "}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <SchoolIcon style={{fontSize:"1.1rem"}}/>
                  <span style={{ marginLeft: "0.25em" }}>
                    Education
                    {/* {translatedContent[5]} */}
                  </span>
                  {activeKey === "5" && (
                    <>
                      {addingEmail ? (
                        <></>
                      ) : (
                        <>
                          <PlusOutlined
                            type="plus"
                            tooltipTitle="Add"
                            onClick={() =>
                              handleCandidateEducationModal(true)
                            }
                            size="1em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEducationTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <AccountBalanceIcon style={{fontSize:"1.1rem"}}/>
                  <span style={{ marginLeft: "0.25em" }}>
                    Employment
                    {/* {translatedContent[6]} */}
                  </span>
                  {activeKey === "7" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() =>
                          handleCandidateEmploymentModal(true)
                        }
                        size="1em"
                        style={{ marginLeft: "0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEmploymentTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <HeadphonesIcon style={{fontSize:"1.1rem"}} />
                  <span style={{ marginLeft: "0.25em" }}>
                    Training
                    {/* {translatedContent[7]} */}
                  </span>
                  {activeKey === "6" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() =>
                          handleCandidateTrainingModal(true)
                        }
                        size="1em"
                        style={{ marginLeft:"0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTrainingTable />
              </Suspense>
            </TabPane>

            
            
            <TabPane
              tab={
                <>
                <AccountBalanceIcon style={{fontSize:"1.1rem"}}/>
                  <span style={{ marginLeft: "0.25em" }}>
                     Bank Details
                     {/* {translatedContent[8]} */}
                  </span>
                  {activeKey === "8" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleCandidateBankModal(true)}
                        size="1em"
                        style={{ marginLeft:"0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddCandidateEducationModal
            addCandidateEducationModal={addCandidateEducationModal}
            handleCandidateEducationModal={handleCandidateEducationModal}
          />
          <AddCandidateTrainingModal
            addCandidateTrainingModal={addCandidateTrainingModal}
            handleCandidateTrainingModal={handleCandidateTrainingModal}
          />
          <AddCandidateEmploymentModal
            addCandidateEmploymentModal={addCandidateEmploymentModal}
            handleCandidateEmploymentModal={handleCandidateEmploymentModal}
          />
          <AddBankModal
            addCandidateBankModal={addCandidateBankModal}
            handleCandidateBankModal={handleCandidateBankModal}
          />
          <ActivityModal
            addCandidateActivityModal={addCandidateActivityModal}
            handleCandidateActivityModal={handleCandidateActivityModal}
          />

      <ReactCandidateSpeechModal
          candidate={props.candidate}
          handleCandidateReactSpeechModal={handleCandidateReactSpeechModal}
          addCandidateSpeechModal={addCandidateSpeechModal}
          />
        </Suspense>
      </>
    );
  }

const mapStateToProps = ({ candidate }) => ({
  documentUploadModal: candidate.documentUploadModal,
  addCandidateEducationModal: candidate.addCandidateEducationModal,
  addCandidateTrainingModal: candidate.addCandidateTrainingModal,
  addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
  addCandidateBankModal: candidate.addCandidateBankModal,
  addCandidateActivityModal: candidate.addCandidateActivityModal,
  addCandidateSpeechModal:candidate.addCandidateSpeechModal,
  candidateId: candidate.candidateId,
  candidate: candidate.candidate,
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
