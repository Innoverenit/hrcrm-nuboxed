import React, { Component,lazy,Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";
const TeamsActionLeft =lazy(()=> import('./TeamsActionLeft'));
const TeamsActionRight =lazy(()=> import('./TeamsActionRight'));

class TeamsHeader extends Component {
  render() {
    const { handleTeamsModal, viewType, setTeamsViewType } = this.props;

    return (
      <>
        <Suspense fallback={<BundleLoader />}>
        <ActionHeader
          leftComponent={
            <TeamsActionLeft
            translateText={this.props.translateText}
      
       selectedLanguage={this.props.selectedLanguage}
              viewType={viewType}
              setTeamsViewType={setTeamsViewType}
            />
          }
          rightComponent={
            <TeamsActionRight 
            translateText={ this.props.translateText}
            selectedLanguage={ this.props.selectedLanguage}
            viewType={viewType}
            handleTeamsModal={handleTeamsModal} />
          }
        />
        </Suspense>
      </>
    );
  }
}

export default TeamsHeader;
