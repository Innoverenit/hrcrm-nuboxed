import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddCustomerImportModal from "../Customer/Child/AddCustomerImportModal"
import {
    handleCustomerModal,
    getCustomerListByUserId,
    getCustomerPagination,
    emptyCustomer,
    getLatestCustomer,
    getCustomerCloser,
    handleCustomerImportModal,
    getCustomerFilterData, 
    updateOwnercustomerById
  } from "./CustomerAction";
import CustomerMap from "./CustomerMap"
import dayjs from "dayjs";

const CustomerWhiteTable =lazy(()=> import("../Customer/Child/CustomerTable/CustomerWhiteTable"));
const CustomerBlueTable =lazy(()=> import("../Customer/Child/CustomerTable/CustomerBlueTable"));
const CustomerTeamCardList =lazy(()=> import("./Child/CustomerTable/CustomerTeamCardList"));
const AddCustomerModal = lazy(() => import( "./Child/AddCustomerModal"));
const CustomerHeader = lazy(() => import("./Child/CustomerHeader"));
const CustomerCardList=lazy(() => import("./Child/CustomerTable/CustomerCardList"));
const CustomerAllCardList=lazy(() => import("./Child/CustomerTable/CustomerAllCardList"));
const CustomerDeleteCard=lazy(() => import("./Child/CustomerTable/CustomerDeletecard"));
class Customer extends Component {
  constructor(props) {
    super(props);
  this.state = { 
    currentData: "",
  filter:"CreationDate",
  viewType: null, // Default viewType
  teamsAccessInd: props.teamsAccessInd ,
  currentUser:"",
  showCheckboxes: false,
  isTransferMode: true,
  selectedDeals: [],
  selectedUser: null,
  isMobile: false, };
  }



  handleCheckboxChange = (dealName) => {
    console.log(dealName)
    this.setState((prevState) => {
      const { selectedDeals } = prevState;
      if (selectedDeals.includes(dealName)) {
        return { selectedDeals: selectedDeals.filter((name) => name !== dealName) };
      } else {
        return { selectedDeals: [...selectedDeals, dealName] };
      }
    });
  };


  handleUserSelect = (value) => {
    // const selectedUser = userList.find((user) => user.id === value);
    // this.setState({ selectedUser });
    console.log(value)
    let data={
      customerIds:this.state.selectedDeals
    }
    this.props.updateOwnercustomerById(data,value)
    this.setState({
      showCheckboxes: false,
      selectedDeals: [],
      selectedUser: null,
    });
    console.log('Selected Deals:', this.state.selectedDeals);
    // console.log('Selected User:', selectedUser);
  };

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

  componentDidMount() {
    if (this.props.teamsAccessInd === false) {
      this.setState({ viewType: "table" });
    }
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

  // handleTransferClick = () => {
  //   this.setState({ showCheckboxes: true });
  // };

  handleTransferClick = () => {
    const { isTransferMode } = this.state;

    if (isTransferMode) {
      // If we're in Transfer mode, we show the checkboxes and switch to Cancel mode
      this.setState({ showCheckboxes: true, isTransferMode: false });
    } else {
      // If we're in Cancel mode, we uncheck all checkboxes and switch back to Transfer mode
      this.setState({ showCheckboxes: false, isTransferMode: true, selectedDeals: [] });
    }
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
            <Suspense fallback={"Loading ..."}>
        <CustomerHeader
        isTransferMode={this.state.isTransferMode}
        showCheckboxes={this.state.showCheckboxes}
        handleTransferClick={this.handleTransferClick}
        handleUserSelect={this.handleUserSelect}
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
          selectedDeals={this.state.selectedDeals}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
        />
        <AddCustomerModal
          addCustomerModal={addCustomerModal}
          handleCustomerModal={handleCustomerModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
        />
        {teamsAccessInd ? (
            <CustomerTeamCardList
            handleCheckboxChange={this.handleCheckboxChange}
              translateText={this.props.translateText}
              selectedUser={this.state.selectedUser}
              showCheckboxes={this.state.showCheckboxes}
              selectedDeals={this.state.selectedDeals}
           
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
            
            />
        ) : (
          <>
            {/* {viewType === 'card' &&   <CustomerCardView
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            />} */}
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
             handleCheckboxChange={this.handleCheckboxChange}
             currentUser={this.state.currentUser} 
             
             showCheckboxes={this.state.showCheckboxes}
             selectedDeals={this.state.selectedDeals}
             viewType={this.props.viewType}
             selectedUser={this.state.selectedUser}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
             /> }
            {viewType === 'map' &&    <CustomerMap/> }
            {viewType === 'all' &&        <CustomerAllCardList
               handleCheckboxChange={this.handleCheckboxChange}
              
               selectedUser={this.state.selectedUser}
               showCheckboxes={this.state.showCheckboxes}
               selectedDeals={this.state.selectedDeals}
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             viewType={this.props.viewType}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
             />  }
            {viewType === 'teams' ?( <CustomerTeamCardList
             handleCheckboxChange={this.handleCheckboxChange}
              translateText={this.props.translateText}
              selectedUser={this.state.selectedUser}
              showCheckboxes={this.state.showCheckboxes}
              selectedDeals={this.state.selectedDeals}
              selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}
            /> 
            ):(
              <CustomerCardList
              filter={this.state.filter}
              handleCheckboxChange={this.handleCheckboxChange}
              currentUser={this.state.currentUser} 
              
              showCheckboxes={this.state.showCheckboxes}
              selectedDeals={this.state.selectedDeals}
              viewType={this.props.viewType}
              selectedUser={this.state.selectedUser}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
              />

            )}
            { viewType === "dashboard1"  && <CustomerDeleteCard
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}            
           viewType={this.props.viewType}
            />}
          </>
        )}
     
        </Suspense> 
        {/* <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      
    >
      <FloatButton />
     
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
      updateOwnercustomerById,
      getCustomerFilterData,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
