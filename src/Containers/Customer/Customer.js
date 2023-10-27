import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import CustomerWhiteTable from "../Customer/Child/CustomerTable/CustomerWhiteTable";
import CustomerBlueTable from "../Customer/Child/CustomerTable/CustomerBlueTable";
import {
    handleCustomerModal,
    getCustomerListByUserId,
    setCustomerViewType,
    getCustomerPagination,
    emptyCustomer,
    getLatestCustomer,
    getCustomerCloser,
    
  } from "./CustomerAction";
import CustomerCardView from "./CustomerCardView";
import CustomerMap from "./CustomerMap"
import moment from "moment";
  
const AddCustomerModal = lazy(() => import( "./Child/AddCustomerModal"));
const CustomerHeader = lazy(() => import("./Child/CustomerHeader"));
const CustomerTable = lazy(() => import("./Child/CustomerTable/CustomerTable"));
const CustomerCardList=lazy(() => import("./Child/CustomerTable/CustomerCardList"));

class Customer extends Component {
  state = { currentData: "",
  filter:"creationdate",
  currentUser:"" };
  handleClear = () => {
    const startDate = moment()
      .startOf("month")
      .toISOString();
    const endDate = moment()
      .endOf("month")
      .toISOString();
    this.setState({ currentData: "" });
    this.props.emptyCustomer();
    this.props.getCustomerListByUserId(this.state.currentUser?this.state.currentUser:this.props.userId,0);
    this.props.getLatestCustomer(this.props.userId);
    this.props.getCustomerCloser(this.props.userId, startDate, endDate);
  };
  handleFilterChange=(data)=>{
    this.setState({filter:data})
    this.props.getCustomerListByUserId(this.props.userId,0,data)
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
          this.props.viewType === "dashboard" ?
             <CustomerBlueTable/> :
             this.props.viewType === "table" ?
             <CustomerCardList
             filter={this.state.filter}
             currentUser={this.state.currentUser} 
             /> :
          this.props.viewType==="map"?
          <CustomerMap/>:
            
            null} 
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
      getCustomerCloser
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
