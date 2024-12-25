import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getLeads} from "../Leads/LeadsAction"
import AddLeadsImportModal from "../Leads/AddLeadsImportModal"
import {handleLeadsModal,updateOwnerLeadById, handleLeadsImportModal,updateJunkLeadById } from "./LeadsAction";
const LeadsHeader=lazy(()=>import ("./Child/LeadsHeader"));
const AddLeadsModal=lazy(()=>import ("./Child/AddLeadsModal"));
const LeadsTeamCardList = lazy(()=>import("./Child/LeadsTable/LeadsTeamCardList"));
const LeadsCardList = lazy(()=>import("./Child/LeadsTable/LeadsCardList"));
const LeadsJunkList=lazy(()=>import  ("./Child/LeadsTable/LeadsJunkList"));
const LeadsAllCardList = lazy(()=>import("./Child/LeadsTable/LeadsAllCardList"));

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTransferMode: true, // Initial state for Transfer mode
      showCheckboxes: false,
      viewType: null, // Default viewType
      teamsAccessInd: props.teamsAccessInd ,// Default UerInd
      currentData: "",
      currentUser:"", 
     selectedDeals: [],
     isTransferModeJunk: true, // Initial state for Transfer mode
      showCheckboxesJunk: false,
     currentJunk: "",
     currentJunk:"", 
    selectedJunk: [],

    };
  }

  setLeadsViewType = (viewType) => {
    this.setState({ viewType, teamsAccessInd: false });
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getLeads(this.props.userId);
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };


  handleUserSelect = (value) => {
    // Log the selected value
    console.log(value);

   
    let data = {
      leadsIds: this.state.selectedDeals
    };

    // Call the parent's updateOwnercustomerById method with data and the selected user ID
    this.props.updateOwnerLeadById(data, value);

   
    console.log('Selected Deals:', this.state.selectedDeals);

   
  };

  handleUserSelectJunk = (value) => {
    // Log the selected value
    console.log(value);

   
    let data = {
      leadsIds: this.state.selectedJunk
    };

    // Call the parent's updateOwnercustomerById method with data and the selected user ID
    this.props.updateJunkLeadById(data, value);

   
    console.log('Selected Deals:', this.state.selectedJunk);

   
  };


  handleTransferClick = () => {
    const { isTransferMode } = this.state;

    if (isTransferMode) {
      // If in Transfer mode, show checkboxes and switch to Cancel mode
      this.setState({ showCheckboxes: true, isTransferMode: false });
    } else {
      // If in Cancel mode, hide checkboxes, reset selected deals, and switch to Transfer mode
      this.setState({ showCheckboxes: false, isTransferMode: true, selectedDeals: [] });
    }
  };
  handleTransferClickJunk = () => {
    const { isTransferModeJunk } = this.state;

    if (isTransferModeJunk) {
      // If in Transfer mode, show checkboxes and switch to Cancel mode
      this.setState({ showCheckboxesJunk: true, isTransferModeJunk: false });
    } else {
      // If in Cancel mode, hide checkboxes, reset selected deals, and switch to Transfer mode
      this.setState({ showCheckboxesJunk: false, isTransferModeJunk: true, selectedJunk: [] });
    }
  };
  componentDidMount() {
    // Check if isMobile is stored in localStorage
    const storedIsMobile = localStorage.getItem('isMobile');
    this.setState({ isMobile: storedIsMobile ? JSON.parse(storedIsMobile) : window.innerWidth <= 768 });
  
    window.addEventListener('resize', this.handleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.setState({ isMobile });
  
    // Store isMobile in localStorage
    localStorage.setItem('isMobile', JSON.stringify(isMobile));
  };
  handleFilterChange=(data)=>{
    this.setState({filter:data})
    this.props.getLeads(this.props.userId,0,data)
  }
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };


  handleCheckboxChange = (dealName) => {
    console.log(dealName);
    this.setState((prevState) => {
      const { selectedDeals } = prevState;
      if (selectedDeals.includes(dealName)) {
        return { selectedDeals: selectedDeals.filter((name) => name !== dealName) };
      } else {
        return { selectedDeals: [...selectedDeals, dealName] };
      }
    });
  };
  handleCheckboxChangeJunk = (JunkName) => {
    console.log(JunkName);
    this.setState((prevState) => {
      const { selectedJunk } = prevState;
      if (selectedJunk.includes(JunkName)) {
        return { selectedJunk: selectedJunk.filter((name) => name !== JunkName) };
      } else {
        return { selectedJunk: [...selectedJunk, JunkName] };
      }
    });
  };
  handleDropChange=(value)=>{
    this.setState({ currentUser: value });
      this.props.getLeads(value );

  };
  render() {
    const { viewType, teamsAccessInd } = this.state;
    const {isMobile } = this.state;
    const {
      addLeadsModal,
        handleLeadsModal,
        setLeadsViewType,
      // viewType,     
    } = this.props;
    console.log(viewType)
    return (
      <React.Fragment>
        <LeadsHeader
          selectedDeals={this.state.selectedDeals}
         isTransferMode={this.state.isTransferMode}
         showCheckboxes={this.state.showCheckboxes}
         handleTransferClick={this.handleTransferClick}
         handleUserSelect={this.handleUserSelect}
         selectedJunk={this.state.selectedJunk}
         isTransferModeJunk={this.state.isTransferModeJunk}
         showCheckboxesJunk={this.state.showCheckboxesJunk}
         handleTransferClickJunk={this.handleTransferClickJunk}
         handleUserSelectJunk={this.handleUserSelectJunk}
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
        //  translatedMenuItems={this.props.translatedMenuItems}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          handleDropChange={this.handleDropChange}
          currentUser={this.state.currentUser}
            handleLeadsModal={handleLeadsModal}
        setLeadsViewType={this.setLeadsViewType}
        
          viewType={viewType}
          teamsAccessInd={teamsAccessInd}
          handleChange={this.handleChange}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          handleLeadsImportModal={this.props.handleLeadsImportModal}
          setCurrentData={this.setCurrentData}
        />
         <AddLeadsModal
          addLeadsModal={addLeadsModal}
          handleLeadsModal={handleLeadsModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        // translatedMenuItems={this.props.translatedMenuItems}
        />
        <AddLeadsImportModal
          translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
        //  translatedMenuItems={this.props.translatedMenuItems}
        handleLeadsImportModal={this.props.handleLeadsImportModal}
        addLeadsImportModal={this.props.addLeadsImportModal}
        />
       
        {/* <LeadsTable/>  */}
        <Suspense fallback={ "Loading..."}>
         {teamsAccessInd ? (
          <LeadsTeamCardList 
          handleCheckboxChange={this.handleCheckboxChange}
          selectedUser={this.state.selectedUser}
          showCheckboxes={this.state.showCheckboxes}
          selectedDeals={this.state.selectedDeals}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          
          />
        ) : (
          <>
            {viewType === 'card' && <LeadsCardList  filter={this.state.filter}  
            translateText={this.props.translateText}
            handleCheckboxChange={this.handleCheckboxChange}
            selectedUser={this.state.selectedUser}
            showCheckboxes={this.state.showCheckboxes}
            selectedDeals={this.state.selectedDeals}
               selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}/>}
            {viewType === 'all' && <LeadsAllCardList 
                      handleCheckboxChange={this.handleCheckboxChange}
             selectedUser={this.state.selectedUser}
             showCheckboxes={this.state.showCheckboxes}
             selectedDeals={this.state.selectedDeals}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            {viewType === 'teams'?( <LeadsTeamCardList 
             translateText={this.props.translateText}
             handleCheckboxChange={this.handleCheckboxChange}
             selectedUser={this.state.selectedUser}
             showCheckboxes={this.state.showCheckboxes}
             selectedDeals={this.state.selectedDeals}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />
            ):(
              <LeadsCardList  filter={this.state.filter}  
            translateText={this.props.translateText}
            handleCheckboxChange={this.handleCheckboxChange}
            selectedUser={this.state.selectedUser}
            showCheckboxes={this.state.showCheckboxes}
            selectedDeals={this.state.selectedDeals}
               selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}/>
            )}
              {viewType === 'list' && <LeadsJunkList 
             translateText={this.props.translateText}
             handleCheckboxChangeJunk={this.handleCheckboxChangeJunk}
             selectedUser={this.state.selectedUser}
             showCheckboxesJunk={this.state.showCheckboxesJunk}
             selectedJunk={this.state.selectedJunk}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
          </>
        )}
       
        </Suspense>
 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ leads,auth }) => ({
    addLeadsModal:leads.addLeadsModal,
   //viewType: leads.viewType,
   userId: auth.userDetails.userId,
   addLeadsImportModal:leads.addLeadsImportModal,
   teamsAccessInd:auth.userDetails.teamsAccessInd

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        //setLeadsViewType,
         handleLeadsModal,
         getLeads,
         handleLeadsImportModal,
         updateOwnerLeadById,
         updateJunkLeadById
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
