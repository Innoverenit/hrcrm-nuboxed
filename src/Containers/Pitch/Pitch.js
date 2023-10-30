import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PitchHeader from "./Child/PitchHeader"
import PitchCardList from "./Child/PitchCardList"
import AddPitchModal from "../Pitch/Child/AddPitchModal"
import {handlePitchModal,getPitch } from "../Pitch/PitchAction";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";


function Pitch (props) {
  const [currentData,setcurrentData]=useState("");
  const [currentUser,setcurrentUser]=useState("");
  const [filter, setFilter] = useState("creationdate");
  const handleClear = () => {
    setcurrentData("");
    props.getPitch(currentUser || props.userId);
  };
  const handleChange = (e) => {
    setcurrentData(e.target.value)
  };
  function handleCurrentData (value){
    setcurrentData(value)
  }
        return (
            <React.Fragment>
            <PitchHeader
            // handleDropChange={this.handleDropChange}
            // currentUser={this.state.currentUser}
              
                 handlePitchModal={props.handlePitchModal}
                 currentUser={currentUser}
                 currentData={currentData}
                 handleClear={handleClear}
              
                 handleChange={handleChange}
                 handleCurrentData={handleCurrentData}
            />
             <AddPitchModal
             
              addPitchModal={props.addPitchModal}
             
              handlePitchModal={props.handlePitchModal}
            />
           
          
            <Suspense fallback={<BundleLoader />}>
              {/* {viewType==="card" ? (
     <LeadsCardList/>
              ):viewType==="list" ? (<LeadsJunkList/>)
            :null} */}
            <PitchCardList/>
           
            </Suspense>
     
          </React.Fragment>
        )
}

const mapStateToProps = ({ pitch,auth }) => ({
    addPitchModal:pitch.addPitchModal,
    userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handlePitchModal,
    getPitch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pitch);