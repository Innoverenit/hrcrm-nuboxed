import React, { Component,lazy} from "react";
import { ActionHeader } from "../../Components/Utils";
const DataRoomActionRight=lazy(()=> import("../Data Room/DataRoomActionRight"));
const DataRoomActionLeft=lazy(()=> import("../Data Room/DataRoomActionLeft"));

class DataRoomHeader extends Component {
  render() {
    // const {
    //   handleLeadsModal,
    //   viewType,
    //   setPitchViewType,
   
    //   currentUser,
    //   setLeadsViewType,
    //   handleChange,
    //   currentData,
    //   handleClear,
    //   handleCurrentData
    // } = this.props;
    return (
      <div>
        <ActionHeader
        //   leftComponent={
        //     <DataRoomActionLeft
           
             
        //     />
        //   }
          rightComponent={
            <DataRoomActionRight
            // viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            // handlePitchModal={this.props.handlePitchModal} 
            />
          }
        />
      </div>
    );
  }
}

export default DataRoomHeader;
