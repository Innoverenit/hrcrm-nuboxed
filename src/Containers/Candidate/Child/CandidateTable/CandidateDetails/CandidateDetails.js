import React, { Component,useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getCandidateById } from "../../../CandidateAction";
const CandidateDetailHeader = lazy(() => import("../CandidateDetails/CandidateDetailHeader"));
const CandidateDetailLeft = lazy(() => import("./CandidateDetailLeft"));
const CandidateDetailRight = lazy(() => import("./CandidateDetailRight"));

function CandidateDetails (props) {
  const { candidateId, data } = useParams();

  // componentDidMount() {
  //   props.getCandidateById(props.match.params.candidateId);
  // }
  useEffect(() => {
       props.getCandidateById(candidateId);
    }, [candidateId]);
  // render() {

    const { candidate, fetchingCandidateById } =props;
    console.log(props.candidateId);
    return (
      <>
        <CandidateDetailHeader />
        {fetchingCandidateById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <div class=" flex ">
            <Suspense fallback={""}>
              <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[25%]" >
                  <CandidateDetailLeft 
                  candidate ={candidate}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
                  />
                </div>
                <div class=" w-[75%]" >
                  <CandidateDetailRight 
                  candidate={candidate}
                  translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}

                  />
                </div>
              </div>
            </Suspense>
          </div>
        )}
      </>
    );
  }
// }

const mapStateToProps = ({ candidate }) => ({
  fetchingCandidateById: candidate.fetchingCandidateById,
  candidate: candidate.candidate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      getCandidateById,
    }, 
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetails);
