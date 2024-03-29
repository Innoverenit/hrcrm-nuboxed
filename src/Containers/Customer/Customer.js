import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {
    handleCustomerModal,
    getCustomerListByUserId,
    setCustomerViewType,
    getCustomerPagination,
    emptyCustomer,
    getLatestCustomer,
    getCustomerCloser,
    getCustomerFilterData,   
  } from "./CustomerAction";
import CustomerMap from "./CustomerMap"
import dayjs from "dayjs";
const CustomerWhiteTable =lazy(()=> import("../Customer/Child/CustomerTable/CustomerWhiteTable"));
const CustomerBlueTable =lazy(()=> import("../Customer/Child/CustomerTable/CustomerBlueTable"));
const CustomerTeamCardList =lazy(()=> import("./Child/CustomerTable/CustomerTeamCardList"));
const CustomerMapView =lazy(()=> import("./CustomerMapView"));
const CustomerCardView =lazy(()=> import("./CustomerCardView"));
const AddCustomerModal = lazy(() => import( "./Child/AddCustomerModal"));
const CustomerHeader = lazy(() => import("./Child/CustomerHeader"));
const CustomerCardList=lazy(() => import("./Child/CustomerTable/CustomerCardList"));
const CustomerAllCardList=lazy(() => import("./Child/CustomerTable/CustomerAllCardList"));
class Customer extends Component {
  state = { currentData: "",
  filter:"creationdate",
  currentUser:"",
  isMobile: false, };
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
    const {isMobile } = this.state;
    const {
      addCustomerModal,
      handleCustomerModal,
    } = this.props;
    return (
      <React.Fragment>
        <CustomerHeader
            handleDropChange={this.handleDropChange}
            currentUser={this.state.currentUser}
           viewType={this.props.viewType}
           setCustomerViewType={this.props.setCustomerViewType}
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
        />
        <Suspense fallback={<BundleLoader />}>
        { this.props.viewType==="card"?
        <CustomerCardView/>:
         this.props.viewType === "list" ?
          <CustomerWhiteTable /> :
          this.props.viewType==="mapView"?
          <CustomerMapView/>:
          this.props.viewType === "dashboard" ?
             <CustomerBlueTable/> :
             this.props.viewType === "table" ?(
             <CustomerCardList
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             /> ):
          this.props.viewType==="map"?
          <CustomerMap/>:
          this.props.viewType==="all" ?(
            <CustomerAllCardList 
            filter={this.state.filter}
             currentUser={this.state.currentUser} 
            />)
            :this.props.viewType==="teams" ? (<CustomerTeamCardList/>)
            : null} 
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
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  addCustomerModal: customer.addCustomerModal,
  viewType: customer.viewType,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerModal,
      getCustomerListByUserId,
      setCustomerViewType,
      getCustomerPagination,
      emptyCustomer,
      getLatestCustomer,
      getCustomerCloser,
      getCustomerFilterData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
