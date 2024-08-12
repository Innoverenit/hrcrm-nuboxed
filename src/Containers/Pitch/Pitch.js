import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handlePitchModal,getPitch,
 } from "../Pitch/PitchAction";
import { BundleLoader, } from "../../Components/Placeholder";
const PitchHeader =lazy(()=>import("./Child/PitchHeader"));
const PitchCardList =lazy(()=>import("./Child/PitchCardList"));
const AddPitchModal =lazy(()=>import("../Pitch/Child/AddPitchModal"));
const PitchAllCardList =lazy(()=>import("./Child/PitchAllCardList"));
const PitchTeamCardlist =lazy(()=>import("./Child/PitchTeamCardlist"));

function Pitch (props) {
  const [currentData,setcurrentData]=useState("");
  const [currentUser,setcurrentUser]=useState("");
  const [filter, setFilter] = useState("creationdate");
  const [viewType, setViewType] = useState(null);
  const [teamsAccessInd, setTeamsAccessInd] = useState(props.teamsAccessInd);
  // const [filter, setFilter] = useState("creationdate");

  const setPitchViewType = (viewType) => {
    setViewType(viewType);
    setTeamsAccessInd(false);
  };
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

  } = props;
        return (
            <React.Fragment>
            <PitchHeader
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
            setPitchViewType={setPitchViewType}
            viewType={viewType}
            teamsAccessInd={teamsAccessInd}
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
             selectedLanguage={props.selectedLanguage}
             translateText={props.translateText}
              addPitchModal={props.addPitchModal}
             
              handlePitchModal={props.handlePitchModal}
            />                    
            <Suspense fallback={<BundleLoader />}>


              
      {teamsAccessInd ? (
      <PitchTeamCardlist
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      
        ) : (
          <>
            {viewType === 'card' &&     <PitchCardList       filter={filter}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
            />}
            {viewType === 'all' &&  <PitchAllCardList       filter={filter}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
            /> }
            {viewType === 'teams' &&  <PitchTeamCardlist
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
            />}
          </>
        )}
            </Suspense> 
          </React.Fragment>
        )
}
const mapStateToProps = ({ pitch,auth }) => ({
    addPitchModal:pitch.addPitchModal,
    // viewType:pitch.viewType,
    teamsAccessInd:auth.userDetails.teamsAccessInd,
    userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handlePitchModal,
    // setPitchViewType,
    getPitch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pitch);