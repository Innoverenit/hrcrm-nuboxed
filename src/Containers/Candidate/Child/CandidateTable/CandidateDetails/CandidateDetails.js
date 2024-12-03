import React, { Component, lazy, Suspense } from "react";
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

class CandidateDetails extends Component {
  componentDidMount() {
    this.props.getCandidateById(this.props.match.params.candidateId);
  }

  render() {
    const { candidate, fetchingCandidateById } = this.props;
    console.log(this.props.candidateId);
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
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                translatedMenuItems={this.props.translatedMenuItems}
                  />
                </div>
                <div class=" w-[75%]" >
                  <CandidateDetailRight 
                  candidate={candidate}
                  translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}

                  />
                </div>
              </div>
            </Suspense>
          </div>
        )}
      </>
    );
  }
}

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
