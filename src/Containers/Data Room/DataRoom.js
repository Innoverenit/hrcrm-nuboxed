import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddDataRoomModal from "../Data Room/AddDataRoomModal"
import DataRoomHeader from "../Data Room/DataRoomHeader"
import DataRoomCard from "../Data Room/DataRoomCard"
import { BundleLoader, } from "../../Components/Placeholder";
import {setDataRoomViewType,handleDataroomModal} from "./DataRoomAction";
import DataRoomTab from './DataRoomTab';

function DataRoom (props) {
    const {
        handleDataroomModal ,
        addDataroomModal   
      } = props;
        return (
            <React.Fragment>
            <DataRoomHeader
      setDataRoomViewType={props.setDataRoomViewType}
      viewType={props.viewType}
      handleDataroomModal={handleDataroomModal}
            />
             <AddDataRoomModal
          addDataroomModal={addDataroomModal}
          handleDataroomModal={handleDataroomModal}
        /> 
           
          
            <Suspense fallback={<BundleLoader />}>
            {props.viewType === "list" ? (
           //<DataRoomTab />
         <DataRoomCard/>
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