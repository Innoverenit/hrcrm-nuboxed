import React, {  Suspense, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {
  handleCandidateResumeModal,
  getCandidateListByUserId,
  getCandidatePagination,
  setCandidateViewType,
  handleCandidateFilterModal,
  emptyCandidate,
  getCandidateWhitePagination,
  getCandidateBluePagination,
} from "./CandidateAction";

const CandidateHeader = lazy(() => import("./Child/CandidateHeader"));
const CandidateWhiteTable = lazy(() =>import("../Candidate/Child/CandidateWhiteTable"));
const CandidateBlackListTable = lazy(() =>import("../Candidate/CandidateBlackListTable"));
const AddCandidateResumeModal = lazy(() =>import("../Candidate/Child/AddCandidateResumeModal"));
const CandidateBlueTable = lazy(() =>import("../Candidate/Child/CandidateBlueTable"));
const CandidateTable = lazy(() =>import("./Child/CandidateTable/CandidateTable"));
const CandidateMap = lazy(() =>import("../Candidate/CandidateMap"));
const AddCandidateFilterModal = lazy(() =>import("../Candidate/Child/AddCandidateFilterModal"));
const CandidateDollarTable = lazy(() =>import("../Candidate/Child/CandidateTable/CandidateDollarTable"));
const CandidateBillableStepper = lazy(() =>import("../Dashboard/Child/BillableCandidate/CandidateBillableStepper"));
const CandidateCardView = lazy(() => import("./CandidateCardView"));

const Candidate = (props) => {
  const [currentData, setCurrentData] = useState(undefined);
  const [responseData, setResponseData] = useState(null);
  const [currentSkillData, setCurrentSkillData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleResponseData = (data) => {
    console.log(data)
    console.log('function called');
    setResponseData(data);
  };

  const handleDropChange = (value) => {
    setCurrentUser(value);

    if (props.viewType === 'table') {
      props.getCandidatePagination(value, 0);
    }

    if (props.viewType === 'list') {
      props.getCandidateWhitePagination('white', value, 0);
    }

    if (props.viewType === 'dashboard') {
      props.getCandidateBluePagination('blue', value, 0);
    }

    console.log('valid', value);
  };

  const handleClear = () => {
    setCurrentData(undefined);
    props.emptyCandidate();
    props.getCandidateListByUserId(currentUser ? currentUser : props.userId, 0);
  };


  const handleSkillClear = () => {
    setCurrentSkillData('');
    props.getCandidateListByUserId(props.userId);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value);
  };

 

  console.log('candidadte render');
  console.log('candidadte', props.selectedLanguage);

  const {
    addCandidateModal,
    addCandidateResumeModal,
    addCandidateFilterModal,
    handleCandidateModal,
    handleCandidateResumeModal,
    handleCandidateFilterModal,
    handleContactDrawer,
    viewType,
    setCandidateViewType,
    contacts,
    fetchingContacts,
  } = props;

  console.log('statue', responseData);
    return (
    <>
        <CandidateHeader
          viewType={viewType}
          handleDropChange={handleDropChange}
          currentUser={currentUser}
          setCandidateViewType={setCandidateViewType}
          handleCandidateModal={handleCandidateModal}
          handleCandidateResumeModal={handleCandidateResumeModal}
          handleCandidateFilterModal={handleCandidateFilterModal}
          handleClear={handleClear}
          handleChange={handleChange}
          currentData={currentData}
          // text={text}
          setCurrentData={setCurrentData}
          handleSkillClear={handleClear}
          currentSkillData={currentSkillData}
          setCurrentSkillData={setCurrentSkillData}
        />

{/* <AddCandidateModal
          addCandidateModal={addCandidateModal}
          handleCandidateModal={handleCandidateModal}
          responseData={responseData}
        /> */}
       
        <AddCandidateFilterModal
          addCandidateFilterModal={addCandidateFilterModal}
          handleCandidateFilterModal={handleCandidateFilterModal}
        />
         <AddCandidateResumeModal
          addCandidateResumeModal={addCandidateResumeModal}
          handleCandidateResumeModal={handleCandidateResumeModal}
          handleResponseData={handleResponseData}
          responseData={responseData}
        />

        <Suspense fallback={<BundleLoader />}>
          {viewType === "card" ? (
            <CandidateCardView
              viewType={viewType}
              handleResponseData={handleResponseData}
              responseData={responseData}
            />
          ) : viewType === "dollar" ? (
            <CandidateDollarTable viewType={viewType} />
            
          ) 
          : viewType === "billable" ? (
            <CandidateBillableStepper viewType={viewType} />
            
          ) 
          : viewType === "table" ? (
            <CandidateTable
              // handleResponseData={this.handleResponseData}
              // responseData={this.state.responseData}
              currentUser={currentUser}
              // selectedLanguage={this.props.selectedLanguage}

            />
          ) : viewType === "list" ? (
            <CandidateWhiteTable 
            currentUser={currentUser} />
          ) : viewType === "dashboard" ? (
            <CandidateBlueTable currentUser={currentUser} />
          ) : viewType === "black" ? (
            <CandidateBlackListTable />
          ) : // this.props.viewType==="grid"?
          // <CandidateGridTable/>:

          viewType === "map" ? (
            <CandidateMap />
          ) : null}
        </Suspense>

       
   </>
    );
  
}

const mapStateToProps = ({ candidate, account, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addCandidateModal: candidate.addCandidateModal,
  addCandidateResumeModal: candidate.addCandidateResumeModal,
  viewType: candidate.viewType,
  addCandidateFilterModal: candidate.addCandidateFilterModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCandidateFilterModal,
      // handleCandidateModal,
      handleCandidateResumeModal,
      getCandidateListByUserId,
      setCandidateViewType,
      getCandidatePagination,
      emptyCandidate,
      getCandidateWhitePagination,
      getCandidateBluePagination,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
