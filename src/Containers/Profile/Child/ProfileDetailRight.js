import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ProfileDetailTab = lazy(() => import("./ProfileTabs/ProfileDetailTab"));
class ProfileDetailRight extends Component {
  render() {
    return (
      <div class=" flex flex-col display-block" >
        <Suspense fallback={"Loading..."}>
        <ProfileDetailTab userDetails={this.props.userDetails}
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage} />
        </Suspense>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailRight);
