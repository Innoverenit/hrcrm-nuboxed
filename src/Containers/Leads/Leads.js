import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {getLeads} from "../Leads/LeadsAction"
import AddLeadsImportModal from "../Leads/AddLeadsImportModal"
import {handleLeadsModal, handleLeadsImportModal } from "./LeadsAction";
const LeadsHeader=lazy(()=>import ("./Child/LeadsHeader"));
const AddLeadsModal=lazy(()=>import ("./Child/AddLeadsModal"));
const LeadsTeamCardList = lazy(()=>import("./Child/LeadsTable/LeadsTeamCardList"));
const LeadsCardList = lazy(()=>import("./Child/LeadsTable/LeadsCardList"));
const LeadsJunkList=lazy(()=>import ("./Child/LeadsTable/LeadsJunkList"));
const LeadsAllCardList = lazy(()=>import("./Child/LeadsTable/LeadsAllCardList"));

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: null, // Default viewType
      teamsAccessInd: props.teamsAccessInd ,// Default UerInd
      currentData: "",currentUser:"", 
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
        translatedMenuItems={this.props.translatedMenuItems}
        />
        <AddLeadsImportModal
         selectedLanguage={this.props.selectedLanguage}
         translatedMenuItems={this.props.translatedMenuItems}
        handleLeadsImportModal={this.props.handleLeadsImportModal}
        addLeadsImportModal={this.props.addLeadsImportModal}
        />
       
        {/* <LeadsTable/>  */}
        <Suspense fallback={<BundleLoader />}>
          {/* {viewType==="card" ? (
  <LeadsCardList  filter={this.state.filter}/>
          ):viewType==="list" ? (<LeadsJunkList/>)
        :viewType==="all" ? (<LeadsAllCardList/>)
        :viewType==="teams" ? (<LeadsTeamCardList/>)
        
        :null} */}
         {teamsAccessInd ? (
          <LeadsTeamCardList 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          
          />
        ) : (
          <>
            {viewType === 'card' && <LeadsCardList  filter={this.state.filter}  
            translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}/>}
            {viewType === 'all' && <LeadsAllCardList 
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            {viewType === 'teams' && <LeadsTeamCardList 
             translateText={this.props.translateText}
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
         handleLeadsImportModal
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
