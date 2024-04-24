import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddDataRoomModal from "../Data Room/AddDataRoomModal"
import DataRoomHeader from "../Data Room/DataRoomHeader"
import DataRoomCard from "../Data Room/DataRoomCard"
// import {handlePitchModal,getPitch,setPitchViewType } from "../Pitch/PitchAction";
import { BundleLoader, } from "../../Components/Placeholder";
// const PitchHeader =lazy(()=>import("./Child/PitchHeader"));
// const PitchCardList =lazy(()=>import("./Child/PitchCardList"));
// const AddPitchModal =lazy(()=>import("../Pitch/Child/AddPitchModal"));
// const PitchAllCardList =lazy(()=>import("./Child/PitchAllCardList"));
// const PitchTeamCardlist =lazy(()=>import("./Child/PitchTeamCardlist"));

function DataRoom (props) {

        return (
            <React.Fragment>
            <DataRoomHeader
      
            />
             {/* <AddDataRoomModal
             
             
            /> */}
           
          
            <Suspense fallback={<BundleLoader />}>
     
            {/* <DataRoomCard/> */}
            Hello
   
            </Suspense>
     
          </React.Fragment>
        )
}

const mapStateToProps = ({ pitch,auth }) => ({
    // addPitchModal:pitch.addPitchModal,
    // viewType:pitch.viewType,
    // userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // handlePitchModal,
    // setPitchViewType,
    // getPitch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DataRoom);