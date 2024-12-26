import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {
  handleOpportunityModal,
  // setOpportunityViewType,
} from "./OpportunityAction";
const OpportunityTeamsCard = lazy(() => import("./Child/OpportunityTable/OpportunityTeamsCard"));
const OpportunityBoard = lazy(() => import("./Child/OpportunityBoard"));
const OpportunityWonCard = lazy(() => import("./Child/OpportunityTable/OpportunityWonCard"));
const OpportunityCardView = lazy(() => import("./OpportunityCardView"));
const OpportunityHeader = lazy(() => import("./Child/OpportunityHeader"));
const AddOpportunityModal = lazy(() => import("./Child/AddOpportunityModal"));
const OpportunityCardList = lazy(() => import("./Child/OpportunityTable/OpportunityCardList"));
const OpportunityCloseCard=lazy(()=>import("./Child/OpportunityTable/OpportunityCloseCard"));
const OpportunityLostCard=lazy(()=>import("./Child/OpportunityTable/OpportunityLostCard"));
const OpportunityDeletedCard=lazy(()=>import("./Child/OpportunityTable/OpportunityDeletedCard"));
const OpportunityAllCardList = lazy(() => import("./Child/OpportunityTable/OpportunityAllCardList"));

class Opportunity extends Component {
  constructor(props) {
    super(props);
  this.state = { currentData: "",isMobile: false, 
    // viewType: "table", // Default viewType
    viewType: null, // Default viewType
  teamsAccessInd: props.teamsAccessInd , };
  };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  componentDidMount() {
    if (this.props.teamsAccessInd === false) {
      this.setState({ viewType: "table" });
    }
    // Check if isMobile is stored in localStorage
    const storedIsMobile = localStorage.getItem('isMobile');
    this.setState({ isMobile: storedIsMobile ? JSON.parse(storedIsMobile) : window.innerWidth <= 768 });
  
    window.addEventListener('resize', this.handleResize);
  }
  setOpportunityViewType = (viewType) => {
    this.setState({ viewType, teamsAccessInd: false });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.setState({ isMobile });
  
    // Store isMobile in localStorage
    localStorage.setItem('isMobile', JSON.stringify(isMobile));
  };
  render() {
    const { viewType, teamsAccessInd } = this.state;
    const {isMobile } = this.state;
    const {
      addOpportunityModal,
      handleOpportunityModal,
    } = this.props;
    return (
      <React.Fragment>
        <OpportunityHeader
          viewType={viewType}
          teamsAccessInd={teamsAccessInd}
          setOpportunityViewType={this.setOpportunityViewType}
          handleOpportunityModal={handleOpportunityModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
        />
        <AddOpportunityModal
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          addOpportunityModal={addOpportunityModal}
          handleOpportunityModal={handleOpportunityModal}
        />
        <Suspense fallback={<BundleLoader />}>

        {teamsAccessInd ? (
          <OpportunityTeamsCard
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          />
        ) : (
          <>
            {viewType === "table" && <OpportunityCardList
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            
            />}
            { viewType === "stage" &&  <OpportunityBoard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            { viewType === "dashboard" &&  <OpportunityDeletedCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            {  viewType === "close" &&  <OpportunityCloseCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            { viewType === "teams" && <OpportunityTeamsCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />
//             ):(
// <OpportunityCardList
//              translateText={this.props.translateText}
//              selectedLanguage={this.props.selectedLanguage}
//            translatedMenuItems={this.props.translatedMenuItems}
            
//             />
            // )
          }
            {   viewType === "lost" &&  <OpportunityLostCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            { viewType === "card" &&  <OpportunityCardView
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            {  viewType === "won" &&   <OpportunityWonCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
            { viewType==="all" &&  <OpportunityAllCardList
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
            />}
          </>
        )}
          {/* {  this.props.viewType === "table" ?    
            <OpportunityCardList/> :
          
             this.props.viewType === "stage" ?
             <OpportunityBoard/>
          :
          this.props.viewType === "dashboard" ?            
            <OpportunityDeletedCard/>
             :
             this.props.viewType === "close" ?                  
                    <OpportunityCloseCard/>
                     :
                     this.props.viewType === "teams" ?                   
                    <OpportunityTeamsCard/>
                     :
             this.props.viewType === "lost" ?
             (  <OpportunityLostCard/> )                   
                    :
             this.props.viewType === "card" ?
             <OpportunityCardView/> :
             this.props.viewType === "won" ?
             ( <OpportunityWonCard/> )           
            : this.props.viewType==="all" ? 
            (   <OpportunityAllCardList/> )
             : null} */}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  addOpportunityModal: opportunity.addOpportunityModal,
  // viewType: opportunity.viewType,
  teamsAccessInd:auth.userDetails.teamsAccessInd,
  teamLeadInd:auth.userDetails.teamLeadInd
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleOpportunityModal,
      // setOpportunityViewType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
