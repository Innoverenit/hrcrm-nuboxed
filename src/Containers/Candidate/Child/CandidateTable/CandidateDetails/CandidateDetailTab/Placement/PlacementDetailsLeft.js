import React from "react";
import PlacementDetailsTab from "./PlacementDetailsTab";

class PlacementDetailsLeft extends React.Component {
  render() {
    // console.log(this.props.stageList);
    return (
      <div style={{ width: "100%" }}>
        <PlacementDetailsTab
        //   candidate={this.props.candidate}
          stageList={this.props.stageList}
          profileId={this.props.profileId}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
      </div>
    );
  }
}
export default PlacementDetailsLeft;
