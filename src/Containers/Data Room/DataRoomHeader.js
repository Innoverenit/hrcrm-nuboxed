import React, { Component,lazy, Suspense} from "react";
import { ActionHeader } from "../../Components/Utils";
import { BundleLoader } from "../../Components/Placeholder";
const DataRoomActionRight=lazy(()=> import("../Data Room/DataRoomActionRight"));
const DataRoomActionLeft=lazy(()=> import("../Data Room/DataRoomActionLeft"));

class DataRoomHeader extends Component {
  render() {
    const {
      handleDataroomModal
    } = this.props;
    return (
      <div>
        
        <ActionHeader
          leftComponent={
            <Suspense fallback={<BundleLoader />}>
            <DataRoomActionLeft
              selectedTab={this.props.selectedTab}
              setSelectedTab={this.props.setSelectedTab}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
            setDataRoomViewTyp={this.props.setDataRoomViewType}
            viewType={this.props.viewType}/>
      </Suspense>
          }
          rightComponent={
            <Suspense fallback={<BundleLoader />}>
            <DataRoomActionRight
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            viewType={this.props.viewType}
            handleDataroomModal={handleDataroomModal}
            />
            </Suspense>
          }
        />
      </div>
    );
  }
}

export default DataRoomHeader;
