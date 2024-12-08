import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
 import {getAllSalesDateWiseList,
} from "../../DashboardAction";

class DashboardJumpstartAll extends React.Component{
  constructor() {
    super();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
  };
}
componentDidMount() {

    const { getAllSalesDateWiseList, userId, department,startDate, endDate } = this.props;
    getAllSalesDateWiseList(userId,  startDate, endDate,department);
   }

componentWillReceiveProps(nextProps) {
  if (
    this.props.startDate !== nextProps.startDate ||
    this.props.endDate !== nextProps.endDate
  ) {
   
          const { getAllSalesDateWiseList, userId, department,startDate, endDate } = nextProps;
          getAllSalesDateWiseList(userId, startDate, endDate,department);
        }
  // }
}
 
render() {
  const { showDatelist, fetchingDatewiseReport } = this.props;
  return(
    <div class=" flex flex-row w-full" >
    <div class="flex w-full max-sm:flex-col" >
      <div class="flex w-wk">
          <JumpStartBox
            bgColor="linear-gradient(270deg,#F15753,orange)"
            noProgress
            title="Requirements"
              
            value={
            
              this.props.showAllSalesDatelist.openRequirement
            }
            isLoading={
             
              this.props.fetchingAllSalesDatewiseReport
            }
          />
       
          <JumpStartBox
           bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            noProgress
            title="Positions"
              
            // title="Positions "
            value={
          
              this.props.showAllSalesDatelist.openPosition
            }
            isLoading={
              
              this.props.fetchingAllSalesDatewiseReport
            }
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          />
          </div> 
       
           <div class="flex w-wk">
          <JumpStartBox
 bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            noProgress
            title="Selected"
             
       
            value={
            
              this.props.showAllSalesDatelist.selectted
            }
            // isLoading={this.props.fetchingDatewiseReport}
            isLoading={
              this.props.fetchingAllSalesDatewiseReport
           
            }
            
          />
          <JumpStartBox
                       bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            noProgress
            title="On Boarded"
              
           
            
             value={this.props.showAllSalesDatelist.onboarded}
           
            isLoading={this.props.fetchingAllSalesDatewiseReport}
          
            
          />
           </div>
        </div>
  
      </div>
    
  ); 
}
}
const mapStateToProps = ({ dashboard,auth }) => ({
  userId:auth.userDetails.userId,
  user: auth.userDetails,
   role: auth.userDetails.role,
   department:auth.userDetails.department,
fetchingAllSalesDatewiseReportError:dashboard.fetchingAllSalesDatewiseReportError,
fetchingAllSalesDatewiseReport:dashboard.fetchingAllSalesDatewiseReport,
showAllSalesDatelist:dashboard.showAllSalesDatelist,

showAllDatelist:dashboard.showAllDatelist,
fetchingAllDatewiseReport:dashboard.fetchingAllDatewiseReport,

   endDate: dashboard.endDate,
   startDate: dashboard.startDate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

getAllSalesDateWiseList,

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardJumpstartAll);
