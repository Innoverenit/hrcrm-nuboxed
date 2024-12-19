import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


const PlacementDetailsLeft = lazy(() => import("./PlacementDetailsLeft"));
// const RecruitmentDetailsRight = lazy(() => import("./RecruitmentDetailsRight"));

class PlacementDetails extends Component {
  render() {
    // console.log(this.props.stageList);
    return (
      <>
     
     <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <Suspense fallback={"Loading..."}>
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[100%] ">
                  <div style={{ width: "100%" }}>
                    <PlacementDetailsLeft 
                    stageList={this.props.stageList}
                    profileId={this.props.profileId}
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}
                     />
                  </div>
                
                </div>
              </Suspense>
            </div>
         
      </>
    );
  }
}
const mappropsToProps = ({ candidate }) => ({
//   fetchingCandidateById: candidate.fetchingCandidateById,
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mappropsToProps, mapDispatchToProps)(PlacementDetails);









