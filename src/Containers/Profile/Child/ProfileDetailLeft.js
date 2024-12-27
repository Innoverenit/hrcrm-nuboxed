import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileStatsView from "./ProfileCards/ProfileStatsView";
import PersonalView from "./ProfileCards/PersonalView";
import ProfileTopicOfIntrest from "../../Candidate/Child/CandidateTable/CandidateDetails/CandidateCards/CandidateTopicOfInterest";
import ProfileAboutView from "./ProfileCards/ProfileAboutView";
const ProfileOverviewCard = lazy(() => import("./ProfileCards/ProfileOverviewCard"));



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
       
        <ProfileAboutView
                              user={userDetails} 
                              translateText={this.props.translateText}
                              selectedLanguage={this.props.selectedLanguage}
                            />
         <PersonalView user={userDetails} 
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