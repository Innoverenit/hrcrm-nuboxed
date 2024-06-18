
import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import {
  getDateWiseList, getSalesDateWiseList, getJumpBulblist, getJumpBulblist2,
  getJumpBulblist3, getavgHour, getJumpTasklist, getTasklist, getJumpTask2list
} from "../../DashboardAction";
import { FormattedMessage } from "react-intl";

class DashboardTaskOrganizationJumpstart extends React.Component {
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

    if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
      const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
      const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
      const { getDateWiseList, recruiterId, } = this.props;
      getDateWiseList(recruiterId, startDate, endDate);
    } else {
      const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
      const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
      const { getSalesDateWiseList, orgId } = this.props;
      getSalesDateWiseList(orgId, startDate, endDate);
    }

  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
        const { getDateWiseList, recruiterId, startDate, endDate } = nextProps;
        getDateWiseList(recruiterId, startDate, endDate);
      } else {
        const { getSalesDateWiseList, orgId, startDate, endDate } = nextProps;
        getSalesDateWiseList(orgId, startDate, endDate);
      }

    }
  }
  componentDidMount() {
    const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
    // this.props.getJumpBulblist(this.props.userId,startDate, endDate);
    // this.props.getJumpBulblist2(this.props.userId,startDate,endDate);
    this.props.getTasklist(this.props.userId);
    this.props.getJumpTasklist(this.props.userId, startDate, endDate);
    this.props.getJumpTask2list(this.props.userId, startDate, endDate);
  }

  render() {
    const { showDatelist, fetchingDatewiseReport } = this.props;
    const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
    return (
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-1/2">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={<FormattedMessage
                id="app.openTasks"
                defaultMessage="Open Tasks"
              />}


              value={this.props.taskperCount.totalTask}
              isLoading={this.props.fetchingTaskper}
            />

            <JumpStartBox
              bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={<FormattedMessage
                id="app.tasksDeadline"
                defaultMessage="Tasks > Deadline"
              />}
              // title="Tasks > Deadline"
              value={this.props.jumpstartTask2listCount.no}
              isLoading={this.props.fetchingJumpstartTask2list}


            />
          </div>
          <div class="flex w-1/2">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={<FormattedMessage
                id="app.highPriorityTasks"
                defaultMessage="High Priority Tasks"
              />}
              // title="High Priority Tasks"
              value={this.props.jumpstartTasklistCount.no}
              isLoading={this.props.fetchingJumpstartTasklist}
            />
            <JumpStartBox
              bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={<FormattedMessage
                id="app.status"
                defaultMessage="Status"
              />}
            // title="Status"
            // value={this.props.jumpstartBulb3Count.junkedLeadsList}

            // isLoading={this.props.fetchingJumpstartBulb3}
            />
          </div>
        </div>


      </div>

    );
  }
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  showDatelist: dashboard.showDatelist,
  orgId: auth.userDetails.organizationId,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
  recruiterId: auth.userDetails.userId,
  fetchingTaskper: dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  jumpstartBulbCount: dashboard.jumpstartBulbCount,
  jumpstartBulb2Count: dashboard.jumpstartBulb2Count,
  jumpstartBulb3Count: dashboard.jumpstartBulb3Count,
  fetchingJumpstartBulb: dashboard.fetchingJumpstartBulb,
  fetchingJumpstartBulb2: dashboard.fetchingJumpstartBulb2,
  fetchingJumpstartBulb3: dashboard.fetchingJumpstartBulb3,
  fetchingJumpstartTasklist: dashboard.fetchingJumpstartTasklist,
  jumpstartTasklistCount: dashboard.jumpstartTasklistCount,
  taskperCount: dashboard.taskperCount,
  fetchingJumpstartTask2list: dashboard.fetchingJumpstartTask2list,
  jumpstartTask2listCount: dashboard.jumpstartTask2listCount,

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getDateWiseList,
  getSalesDateWiseList,
  getJumpBulblist,
  getavgHour,
  getJumpBulblist2,
  getJumpBulblist3,
  getJumpTasklist,
  getTasklist,
  getJumpTask2list
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskOrganizationJumpstart);
