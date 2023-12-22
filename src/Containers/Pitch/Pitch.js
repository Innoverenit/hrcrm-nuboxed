import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handlePitchModal,getPitch,setPitchViewType } from "../Pitch/PitchAction";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
const PitchHeader =lazy(()=>import("./Child/PitchHeader"));
const PitchCardList =lazy(()=>import("./Child/PitchCardList"));
const AddPitchModal =lazy(()=>import("../Pitch/Child/AddPitchModal"));
const PitchAllCardList =lazy(()=>import("./Child/PitchAllCardList"));
const PitchTeamCardlist =lazy(()=>import("./Child/PitchTeamCardlist"));

function Pitch (props) {
  const [currentData,setcurrentData]=useState("");
  const [currentUser,setcurrentUser]=useState("");
  const [filter, setFilter] = useState("creationdate");
  // const [filter, setFilter] = useState("creationdate");
  const handleClear = () => {
    setcurrentData("");
    props.getPitch(currentUser || props.userId);
  };
  const handleChange = (e) => {
    setcurrentData(e.target.value)
  };
  const handleFilterChange = (data) => {
    setFilter(data);
    props.getPitch(props.userId, 0, data);
  };
  function handleCurrentData (value){
    setcurrentData(value)
  }
  const {
    addInvestorModal,
    handleInvestorModal,
    viewType,
    setPitchViewType,

  } = props;
        return (
            <React.Fragment>
            <PitchHeader
            setPitchViewType={setPitchViewType}
            viewType={viewType}
            // handleDropChange={this.handleDropChange}
            // currentUser={this.state.currentUser}
            handleFilterChange={handleFilterChange}
            filter={filter}
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
            
            {  viewType === "card" ?
          <PitchCardList       filter={filter}/> 
 
  :viewType==="all" ?
 <PitchAllCardList       filter={filter}/> 
 :viewType==="teams" ? (<PitchTeamCardlist/>)
// <CustomerCardView/>  
          :null}
            </Suspense>
     
          </React.Fragment>
        )
}

const mapStateToProps = ({ pitch,auth }) => ({
    addPitchModal:pitch.addPitchModal,
    viewType:pitch.viewType,
    userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handlePitchModal,
    setPitchViewType,
    getPitch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pitch);