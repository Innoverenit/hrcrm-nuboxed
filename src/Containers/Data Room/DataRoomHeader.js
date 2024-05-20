import React, { Component,lazy} from "react";
import { ActionHeader } from "../../Components/Utils";
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
            <DataRoomActionLeft
            setDataRoomViewTyp={this.props.setDataRoomViewType}
      viewType={this.props.viewType}
     
             
            />
          }
          rightComponent={
            <DataRoomActionRight
            viewType={this.props.viewType}
            handleDataroomModal={handleDataroomModal}
            />
          }
        />
      </div>
    );
  }
}

export default DataRoomHeader;
