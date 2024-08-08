import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddCustomerImportModal from "../Customer/Child/AddCustomerImportModal"
import { BundleLoader } from "../../Components/Placeholder";
import {
    handleCustomerModal,
    getCustomerListByUserId,
    // setCustomerViewType,
    getCustomerPagination,
    emptyCustomer,
    getLatestCustomer,
    getCustomerCloser,
    handleCustomerImportModal,
    getCustomerFilterData,   
  } from "./CustomerAction";
import CustomerMap from "./CustomerMap"
import dayjs from "dayjs";
const CustomerWhiteTable =lazy(()=> import("../Customer/Child/CustomerTable/CustomerWhiteTable"));
const CustomerBlueTable =lazy(()=> import("../Customer/Child/CustomerTable/CustomerBlueTable"));
const CustomerTeamCardList =lazy(()=> import("./Child/CustomerTable/CustomerTeamCardList"));
const CustomerCardView =lazy(()=> import("./CustomerCardView"));
const AddCustomerModal = lazy(() => import( "./Child/AddCustomerModal"));
const CustomerHeader = lazy(() => import("./Child/CustomerHeader"));
const CustomerCardList=lazy(() => import("./Child/CustomerTable/CustomerCardList"));
const CustomerAllCardList=lazy(() => import("./Child/CustomerTable/CustomerAllCardList"));
class Customer extends Component {
  constructor(props) {
    super(props);
  this.state = { 
    currentData: "",
  filter:"creationdate",
  viewType: null, // Default viewType
  teamsAccessInd: props.teamsAccessInd ,
  currentUser:"",
  isMobile: false, };
  }

  setCustomerViewType = (viewType) => {
    this.setState({ viewType, teamsAccessInd: false });
  };
  handleClear = () => {
    const startDate = dayjs()
      .startOf("month")
      .toISOString();
    const endDate = dayjs()
      .endOf("month")
      .toISOString();
    this.setState({ currentData: "" });
    this.props.emptyCustomer();
    this.props.getCustomerListByUserId(this.state.currentUser?this.state.currentUser:this.props.userId,0);
    this.props.getLatestCustomer(this.props.userId);
    this.props.getCustomerCloser(this.props.userId, startDate, endDate);
  };

  // componentDidMount() {
  //   const { viewType, userId, page, getCustomerListByUserId } = this.props;
    
  //   if (viewType === "table") {
  //     getCustomerListByUserId(userId, page, "creationdate");
  //   } else if (viewType === "teams") {
  //     getCustomerListByUserId("teams", page, "creationdate");
  //   } else if (viewType === "all") {
  //     getCustomerListByUserId("all", page, "creationdate");
  //   }
  // }


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
    this.props.getCustomerFilterData(this.props.userId,0,data)
  }
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };

  handleDropChange=(value)=>{
    this.setState({ currentUser: value });
      this.props.getCustomerPagination(value,0 );
    console.log("valid",value)
  };

  render() {
    const { viewType, teamsAccessInd } = this.state;
    const {isMobile } = this.state;
    const {
      addCustomerModal,
      handleCustomerModal,
    } = this.props;
    return (
      <React.Fragment>
        <CustomerHeader
        handleCustomerImportModal={this.props.handleCustomerImportModal}
            handleDropChange={this.handleDropChange}
            currentUser={this.state.currentUser}
           viewType={viewType}
           setCustomerViewType={this.setCustomerViewType}
           teamsAccessInd={teamsAccessInd}
          handleCustomerModal={handleCustomerModal}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
        <AddCustomerModal
          addCustomerModal={addCustomerModal}
          handleCustomerModal={handleCustomerModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
        />
        <Suspense fallback={<BundleLoader />}>

        {teamsAccessInd ? (
            <CustomerTeamCardList
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
            
            />
        ) : (
          <>
            {viewType === 'card' &&   <CustomerCardView
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            />}
            {viewType === 'list' &&   <CustomerWhiteTable 
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            /> }
            {viewType === 'dashboard' &&    <CustomerBlueTable
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            /> }
            {viewType === 'table' &&    <CustomerCardList
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             viewType={this.props.viewType}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
             /> }
            {viewType === 'map' &&    <CustomerMap/> }
            {viewType === 'all' &&        <CustomerAllCardList
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             viewType={this.props.viewType}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
             />  }
            {viewType === 'teams' && <CustomerTeamCardList
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}
            /> }
          </>
        )}
        {/* { this.props.viewType==="card"?
        <CustomerCardView/>:
         this.props.viewType === "list" ?
          <CustomerWhiteTable /> :
          this.props.viewType === "dashboard" ?
             <CustomerBlueTable/> :
             this.props.viewType === "table" ?(
             <CustomerCardList
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             viewType={this.props.viewType}
             /> ):
          this.props.viewType==="map"?
          <CustomerMap/>:
          this.props.viewType==="all" ?(
          
            <CustomerCardList
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             viewType={this.props.viewType}
             /> 
          
          )
            :this.props.viewType==="teams" ? (
            // <CustomerTeamCardList/>
            <CustomerCardList
            viewType={this.props.viewType}
            filter={this.state.filter}
            currentUser={this.state.currentUser} 
            /> 
          )
            : null}  */}
        </Suspense> 
        {/* <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group> */}
     <AddCustomerImportModal
        handleCustomerImportModal={this.props.handleCustomerImportModal}
        addCustomerImportModal={this.props.addCustomerImportModal}
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
       translatedMenuItems={this.props.translatedMenuItems}
        />
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  addCustomerModal: customer.addCustomerModal,
  addCustomerImportModal:customer.addCustomerImportModal,
  // viewType: customer.viewType,
  teamsAccessInd:auth.userDetails.teamsAccessInd

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerModal,
      getCustomerListByUserId,
      handleCustomerImportModal,
      // setCustomerViewType,
      getCustomerPagination,
      emptyCustomer,
      getLatestCustomer,
      getCustomerCloser,
      getCustomerFilterData,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
