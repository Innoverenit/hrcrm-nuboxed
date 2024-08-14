import React, {Suspense,lazy} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {setDataRoomViewType,handleDataroomModal} from "./DataRoomAction";
const AddDataRoomModal=lazy(()=> import("../Data Room/AddDataRoomModal"));
const DataRoomHeader=lazy(()=> import("../Data Room/DataRoomHeader"));
const DataRoomCard=lazy(()=> import("../Data Room/DataRoomCard"));
function DataRoom (props) {
    const {
        handleDataroomModal ,
        addDataroomModal   
      } = props;
        return (
            <React.Fragment>
            <Suspense fallback={<BundleLoader />}>
            <DataRoomHeader
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             setDataRoomViewType={props.setDataRoomViewType}
             viewType={props.viewType}
             handleDataroomModal={handleDataroomModal}
            />
             <AddDataRoomModal
             selectedLanguage={props.selectedLanguage}
             translateText={props.translateText}
             addDataroomModal={addDataroomModal}
             handleDataroomModal={handleDataroomModal}
        />                  
       
            {props.viewType === "list" ? (
           //<DataRoomTab />
              <DataRoomCard
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
              translatedMenuItems={props.translatedMenuItems}
              />
          ) : null}   
            </Suspense>  
          </React.Fragment>
        )
}

const mapStateToProps = ({ datRoom }) => ({
    viewType: datRoom.viewType,
    addDataroomModal: datRoom.addDataroomModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setDataRoomViewType,
    handleDataroomModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DataRoom);