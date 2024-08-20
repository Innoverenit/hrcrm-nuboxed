import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper, } from "../../Components/UI/Layout";
const ProfileDetailLeft = lazy(() => import("./Child/ProfileDetailLeft"));
const ProfileDetailRight = lazy(() => import("./Child/ProfileDetailRight"));

class Profile extends Component {
  componentDidMount() {
    const {
      user: { userId },
    } = this.props;
  }
  render() {
    return (
      <>
        {false ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <div class=" flex ">
              <Suspense fallback={"Loading..."}>
              <div class=" flex flex-no-wrap w-full ">
                  <div class=" w-[25%] h-full" >
                    <ProfileDetailLeft 
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}/>
                  </div>
                  <div class=" w-[75%] h-full" >
                    <ProfileDetailRight 
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}/>
                  </div>
                </div>
              </Suspense>
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
