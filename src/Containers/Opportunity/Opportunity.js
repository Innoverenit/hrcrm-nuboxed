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
  this.state = { currentData: "",isMobile: false, viewType: null, // Default viewType
  teamsAccessInd: props.teamsAccessInd , };
  };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  componentDidMount() {
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
        />
        <AddOpportunityModal
          addOpportunityModal={addOpportunityModal}
          handleOpportunityModal={handleOpportunityModal}
        />
        <Suspense fallback={<BundleLoader />}>

        {teamsAccessInd ? (
          <OpportunityTeamsCard/>
        ) : (
          <>
            {viewType === "table" && <OpportunityCardList/>}
            { viewType === "stage" &&  <OpportunityBoard/>}
            { viewType === "dashboard" &&  <OpportunityDeletedCard/>}
            {  viewType === "close" &&  <OpportunityCloseCard/>}
            { viewType === "teams" &&  <OpportunityTeamsCard/>}
            {   viewType === "lost" &&  <OpportunityLostCard/>}
            { viewType === "card" &&  <OpportunityCardView/>}
            {  viewType === "won" &&   <OpportunityWonCard/>}
            { viewType==="all" &&  <OpportunityAllCardList/>}
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
  teamsAccessInd:auth.userDetails.teamsAccessInd
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
