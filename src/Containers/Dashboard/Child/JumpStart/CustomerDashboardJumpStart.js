import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import {getJumpDistributorDetail,
  handleCustomerAddedModal,handleContactAddedModal,handleOrderAddedModal,
  handleOrderClosedModal,} from "../../DashboardAction";
// import {getleaveLeftSideDetails} from "../../../Leave/LeavesAction"
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import CustomerAddedModal from "./CustomerAddedModal";
import ContactAddedModal from "./ContactAddedModal";
import OrdersAddedModal from "./OrdersAddedModal";
import OrdersClosedModal from "./OrdersClosedModal";
// import {getDateWiseList,getSalesDateWiseList,getTasklist,getavgHour,} from "../../DashboardAction";

class CustomerDashboardJumpStart extends React.Component{
  constructor() {
    super();
    const startDate = dayjs().startOf("month"); 
    const endDate = dayjs();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
    startDate,
    endDate
  };
}

componentDidMount() {
   this.props.getJumpDistributorDetail(this.props.timeRangeType);
}
// componentDidMount() {
  
//    if (this.props.role==="USER"&&this.props.user.department==="Recruiter"){
//     const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//     const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//   const { getDateWiseList, recruiterId,   } = this.props;
//   getDateWiseList(recruiterId,  startDate, endDate);
//    }else{
//     const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//     const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//     const { getSalesDateWiseList, orgId } = this.props;
//     getSalesDateWiseList(orgId,  startDate, endDate);
//    }
   
// }
// componentWillReceiveProps(nextProps) {
//   if (
//     this.props.startDate !== nextProps.startDate ||
//     this.props.endDate !== nextProps.endDate
//   ) {
//         if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
//     const { getDateWiseList, recruiterId, startDate, endDate } = nextProps;
//     getDateWiseList(recruiterId, startDate, endDate);
//         }else{
//           const { getSalesDateWiseList, orgId, startDate, endDate } = nextProps;
//           getSalesDateWiseList(orgId, startDate, endDate);
//         }
        
//   }
// }
// componentDidMount() {
//   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//   const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//   this.props.getTasklist(this.props.userId)
//    this.props.getavgHour(this.props.userId, startDate, endDate);
//    this.props.getleaveLeftSideDetails(this.props.userId);
//   console.log(`Start Date: ${this.state.startDate.format("ll")}`);
//   console.log(`End Date: ${this.state.endDate.format("ll")}`);
// }
//   useEffect(() => { 
//    props.getDateWiseList(props.recruiterId,props.startDate, props.endDate);
// }, [props.startDate, props.endDate, props.type]);
  
render() {
  const formattedDate = dayjs(this.props.dateOfJoining).format('DD-MM-YYYY'); // Format the date as per your requirement
  const { showDatelist, fetchingDatewiseReport } = this.props;
  console.log( this.props.taskperCount)
   const startDate = `${this.state.startDate.format('DD-MM-YYYY')}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  console.log(startDate)
  console.log(this.state.endDate.format('DD-MM-YYYY'))
  return(
    <div class=" flex flex-row w-full" >
    <div class="flex w-full max-sm:flex-col" >
    <div class="flex w-wk">
        <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#F15753,orange)"
            title={
              <FormattedMessage
                id="app.customerAdded"
                defaultMessage="Customer Added"
              />
            }
            value={this.props.distributorinDashboard.totalDistributor}
            jumpstartClick={()=>this.props.handleCustomerAddedModal(true)}
          />
  
       
          <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            title={
              <FormattedMessage
                id="app.ContactsAdded"
                defaultMessage="Contacts Added"
              />
            }
            value={this.props.distributorinDashboard.totalContactPerson}
            jumpstartClick={()=>this.props.handleContactAddedModal(true)}
          />
          </div>
          {/* <JumpStartBox
            noProgress
            title="Profiles Submitted"
            bgColor="linear-gradient(270.23deg, #00A843 0.19%, #1FD071 99.8%)"
            value={this.props.showDatelist.taggedProfile}
            isLoading={this.props.fetchingDatewiseReport}
          /> */}
          <div class="flex w-wk">
          <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            // title="Open Tasks"
            title={
              <FormattedMessage
                id="app.OrdersAdded"
                defaultMessage="Orders Added"
              />
            }
            value={this.props.distributorinDashboard.totalOrder}
            jumpstartClick={()=>this.props.handleOrderAddedModal(true)}
            cursorData={"pointer"}
            
          />
          <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            title={
              <FormattedMessage
                id="app.ordersCompleted"
                defaultMessage="Orders Completed"
              />
            }
            value={this.props.distributorinDashboard.completeOrder}
            jumpstartClick={()=>this.props.handleOrderClosedModal(true)}
            cursorData={"pointer"}
            
          />
           </div>
           {/* <JumpStartBox
            noProgress
            title="DashBoard6"
            bgColor="linear-gradient(269.97deg, #FFFFFF 0.02%, #000000 0.03%)"
          /> */}
          {/* <JumpStartBox
                    // jumpstartClick={
                    //   subscriptionType === "PROFESSIONALPLUS"
                    //     ? () => this.props.handleLifetimeModal(true)
                    //     : null
                    // }
                    // cursorData={
                    //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                    // }
                    noProgress
                    currencyType={currencyType}
                    title="Won"
                    bgColor="#4cc9f0"
                />
                <JumpStartBox
                    // jumpstartClick={
                    //   subscriptionType === "PROFESSIONALPLUS"
                    //     ? () => this.props.handleLifetimeModal(true)
                    //     : null
                    // }
                    // cursorData={
                    //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                    // }
                    noProgress
                    currencyType={currencyType}
                    title="Customers Added"
                    bgColor="#92defe"
                /> */}
        </div>

        {/* <FlexContainer>
          <JumpStartBox noProgress title="All Products" bgColor="#8791a1" />
          <JumpStartBox noProgress title="Quantity On Hand" bgColor="#8791a1" />
          <JumpStartBox
            noProgress
            title="Out of Stock Products"
            bgColor="#8791a1"
          />
          <JumpStartBox noProgress title="Total Visitors" bgColor="#8791a1" />
        </FlexContainer> */}
         <CustomerAddedModal
       customerAddedModal={this.props.customerAddedModal}
       handleCustomerAddedModal={this.props.handleCustomerAddedModal}
      />

<ContactAddedModal
       contactAddedModal={this.props.contactAddedModal}
       handleContactAddedModal={this.props.handleContactAddedModal}
      />
        <OrdersAddedModal
       orderAddedModal={this.props.orderAddedModal}
       handleOrderAddedModal={this.props.handleOrderAddedModal}
      />
      <OrdersClosedModal
       orderClosedModal={this.props.orderClosedModal}
       handleOrderClosedModal={this.props.handleOrderClosedModal}
      />
      </div>
    
  ); 
}
}
const mapStateToProps = ({ dashboard,auth ,leave}) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  leaveFetching:leave.leaveFetching,
  showDatelist:dashboard.showDatelist,
  orgId:auth.userDetails.organizationId,
  showSalesDatelist:dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport:dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError:dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
  recruiterId:auth.userDetails.userId,
  fetchingTaskper:dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  dateOfJoining: auth.userDetails && auth.userDetails.dateOfJoining,
  taskperCount:dashboard.taskperCount,
  avgHour:dashboard.avgHour,
  fetchingAvgHour:dashboard.fetchingAvgHour,
  timeRangeType: dashboard.timeRangeType,
  distributorinDashboard:dashboard.distributorinDashboard,
  customerAddedModal:dashboard.customerAddedModal,
  contactAddedModal:dashboard.contactAddedModal,
  orderAddedModal:dashboard.orderAddedModal,
  orderClosedModal:dashboard.orderClosedModal,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getJumpDistributorDetail,
  handleCustomerAddedModal,
  handleContactAddedModal,
  handleOrderAddedModal,
  handleOrderClosedModal,
//   getDateWiseList,
//   getSalesDateWiseList,
//   getTasklist,
//   getavgHour,
//   getleaveLeftSideDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboardJumpStart);
