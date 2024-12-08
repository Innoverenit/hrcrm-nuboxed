import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ProfileOverviewCard = lazy(() => import("./ProfileCards/ProfileOverviewCard"));
const ProfileAboutCard = lazy(() => import("./ProfileCards/ProfileAboutCard"));
const ProfileStatsCard = lazy(() => import("./ProfileCards/ProfileStatsCard"));
const PersonalCard = lazy(() => import("./ProfileCards/PersonalCard"));
const ProfileTopicOfIntrest = lazy(() => import("./ProfileCards/ProfileTopicOfIntrest"));
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
        <ProfileTopicOfIntrest user={userDetails} 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}/>
        <ProfileStatsCard user={userDetails} 
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
