import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileStatsView from "./ProfileCards/ProfileStatsView";
import ProfileTopicOfIntrest from "../../Candidate/Child/CandidateTable/CandidateDetails/CandidateCards/CandidateTopicOfInterest";
const ProfileOverviewCard = lazy(() => import("./ProfileCards/ProfileOverviewCard"));
const ProfileAboutCard = lazy(() => import("./ProfileCards/ProfileAboutCard"));
const PersonalCard = lazy(() => import("./ProfileCards/PersonalCard"));

class ProfileDetailLeft extends Component {
  render() {
    const { userDetails } = this.props;
    console.log(userDetails);
    return (
      <div class=" flex flex-col h-full "
      ><Suspense fallback={"Loading..."}>
        <ProfileOverviewCard user={userDetails} 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}/>
    
         <ProfileTopicOfIntrest
                 userType={"employee"}
                 uniqueId={this.props.userDetails.userId}
                 employeeId={this.props.userDetails.userId}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}
                />
        <ProfileStatsView
        user={userDetails} 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}/>
        <ProfileAboutCard user={userDetails} 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}/>
        <PersonalCard user={userDetails} 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}/>
        </Suspense>
        {/* <ProfileDetailMap user={userDetails} /> */}
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailLeft);
