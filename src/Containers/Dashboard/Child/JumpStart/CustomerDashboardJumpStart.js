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
import CustomerJumpStartDrawer from "./CustomerJumpStartDrawer";
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
  this.state = {
    translatedMenuItems: [],
};
  }

componentDidMount() {
   this.props.getJumpDistributorDetail(this.props.timeRangeType);
   this.fetchMenuTranslations();
}
componentDidUpdate(prevProps) {
  if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
    this.fetchMenuTranslations();
  }
}

fetchMenuTranslations = async () => {
  try {
    const itemsToTranslate = [
      "1296",//0 "Customer Added"
      "1297",//1 "Contacts Added"
      "1229",//2 "Orders Added"
      "1298",//3"Orders Completed"
      
    ];

    const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
    this.setState({ translatedMenuItems: translations });
  } catch (error) {
    console.error('Error translating menu items:', error);
  }
};
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
  //  const startDate = `${this.props.startDate.format('DD-MM-YYYY')}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  // console.log(startDate)
  // console.log(this.props.endDate.format('DD-MM-YYYY'));
  return(
    <>
    <div class=" flex flex-row w-full" >
    <div class="flex w-full max-sm:flex-col" >
   

    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#F15753,orange)"
            title={this.state.translatedMenuItems[0]}
            value={this.props.distributorinDashboard.totalDistributor}
            jumpstartClick={()=>this.props.handleCustomerAddedModal(true)}
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            title={this.state.translatedMenuItems[1]}
            value={this.props.distributorinDashboard.totalContactPerson}
            jumpstartClick={()=>this.props.handleContactAddedModal(true)}
          />
                           </div>
                       </div>
                    
                   </div>  
         
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            // title="Open Tasks"
            title={this.state.translatedMenuItems[2]}
            value={this.props.distributorinDashboard.totalOrder}
            jumpstartClick={()=>this.props.handleOrderAddedModal(true)}
            cursorData={"pointer"}
            
          />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            title={this.state.translatedMenuItems[3]}
            value={this.props.distributorinDashboard.completeOrder}
            jumpstartClick={()=>this.props.handleOrderClosedModal(true)}
            cursorData={"pointer"}
            
          />
                          </div>
                      </div>
                     
                  </div>
                  </div>
        </div>

<CustomerJumpStartDrawer

/>
        
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
     
   </>
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
