import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handlePitchModal,getPitch,updateOwnerPitchById
 } from "../Pitch/PitchAction";
import { BundleLoader } from '../../Components/Placeholder';
const PitchHeader =lazy(()=>import("./Child/PitchHeader"));
const PitchCardList =lazy(()=>import("./Child/PitchCardList"));
const AddPitchModal =lazy(()=>import("../Pitch/Child/AddPitchModal"));
const PitchAllCardList =lazy(()=>import("./Child/PitchAllCardList"));
const PitchTeamCardlist =lazy(()=>import("./Child/PitchTeamCardlist"));

function Pitch (props) {
  const [currentData,setcurrentData]=useState("");
  const [currentUser,setcurrentUser]=useState("");
  const [filter, setFilter] = useState("CreationDate");
  const [viewType, setViewType] = useState(null);
  const [teamsAccessInd, setTeamsAccessInd] = useState(props.teamsAccessInd);
  const [isTransferMode, setIsTransferMode] = useState(true);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDeals, setSelectedDeals] = useState([]);
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
  const handleCheckboxChange = (dealName) => {
    console.log(dealName);
    setSelectedDeals((prevSelectedDeals) => {
      if (prevSelectedDeals.includes(dealName)) {
        // Remove dealName if it's already selected
        return prevSelectedDeals.filter((name) => name !== dealName);
      } else {
        // Add dealName if it's not already selected
        return [...prevSelectedDeals, dealName];
      }
    });
  };
  const handleUserSelect = (value) => {
    console.log(value);
    
    // Set the data for the API call
    const data = {
      invLeadsIds: selectedDeals,
    };
    
    // Update the user by calling the prop function
    props.updateOwnerPitchById(data, value);

    // Reset the states after the selection
    setShowCheckboxes(false);
    setSelectedDeals([]);
    setSelectedUser(null);

    console.log('Selected Deals:', selectedDeals);
    // If you need to log selectedUser, it can be done as:
    // console.log('Selected User:', selectedUser);
  };
  const handleTransferClick = () => {
    if (isTransferMode) {
      // If we're in Transfer mode, we show the checkboxes and switch to Cancel mode
      setShowCheckboxes(true);
      setIsTransferMode(false);
    } else {
      // If we're in Cancel mode, we uncheck all checkboxes and switch back to Transfer mode
      setShowCheckboxes(false);
      setIsTransferMode(true);
      setSelectedDeals([]);
    }
  };
  const {
    addInvestorModal,
    handleInvestorModal,

  } = props;
        return (
            <React.Fragment>
           <Suspense fallback={<BundleLoader/>}>
            <PitchHeader
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
            setPitchViewType={setPitchViewType}
            viewType={viewType}
            teamsAccessInd={teamsAccessInd}
            // handleDropChange={this.handleDropChange}
            // currentUser={this.state.currentUser}
            selectedDeals={selectedDeals}
            isTransferMode={isTransferMode}
            showCheckboxes={showCheckboxes}
            handleUserSelect={handleUserSelect}
            handleTransferClick={handleTransferClick}
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
        


              
      {teamsAccessInd ? (
      <PitchTeamCardlist
      handleCheckboxChange={handleCheckboxChange}
      selectedUser={selectedUser}
      showCheckboxes={showCheckboxes}
      selectedDeals={selectedDeals}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      
        ) : (
          <>
            {viewType === 'card' &&     <PitchCardList       filter={filter}
             handleCheckboxChange={handleCheckboxChange}
             selectedUser={selectedUser}
             showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
            />}
            {viewType === 'all' &&  <PitchAllCardList       filter={filter}
             handleCheckboxChange={handleCheckboxChange}
             selectedUser={selectedUser}
             showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
            /> }
            {viewType === 'teams' && <PitchTeamCardlist
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
    updateOwnerPitchById,
    // setPitchViewType,
    getPitch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pitch);