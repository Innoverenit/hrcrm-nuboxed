import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ProfileOverviewView = lazy(() => import("./ProfileOverviewView"))
const ProfileOverviewEdit = lazy(() => import("./ProfileOverviewEdit"))

class ProfileOverviewCard extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ProfileOverviewView
              translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
                user={user}
                toggleViewType={toggleViewType}
              />
            ) : (
              <ProfileOverviewEdit
              translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
                user={user}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ProfileOverviewCard;
