import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import {
  MainWrapper,
} from "../../../../../../../Components/UI/Layout";
const RecruitmentDetailsLeft = lazy(() => import("./RecruitmentDetailsLeft"));

class RecruitmentDetails extends Component {
  render() {
    console.log(this.props.stageList);
    console.log("Detail",this.props.candidateId);
    return (
      <>
        {this.props.fetchingCandidateById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <Suspense fallback={"Loading..."}>
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
                  <div style={{ width: "100%" }}>
                    <RecruitmentDetailsLeft 
                    candidate={this.props.candidate}
                    candidateId={this.props.candidateId}
                    stageList={this.props.stageList}
                    profileId={this.props.profileId}
                    />
                  </div>
                  {/* <div style={{ width: "75%" }}>
                    <RecruitmentDetailsRight
                      candidate={this.props.candidate}
                      stageList={this.props.stageList}
                      profileId={this.props.profileId}
                    />
                  </div> */}
                </div>
              </Suspense>
            </div>
          )}
      </>
    );
  }
}
const mappropsToProps = ({ candidate }) => ({
  fetchingCandidateById: candidate.fetchingCandidateById,
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mappropsToProps, mapDispatchToProps)(RecruitmentDetails);
