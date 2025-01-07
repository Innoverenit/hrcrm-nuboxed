import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CalendarInstance } from "../../../../Components/Utils";
import dayjs from "dayjs";
import {
  MainWrapper,
} from "../../../../Components/UI/Layout";
import FormChooserModal from "../FormChooserModal";
import { handleChooserModal, setPlannerDate } from "../../PlannerAction";
import {
  getCallsListByUserId,
  getEventsListByUserId,
  getTasksListByUserId,
  getLeavesByUserId,
} from "../../../Auth/AuthAction";

import {
  eventSelector,
  callSelector,
  taskSelector,
  leaveSelector,
  holidaySelector,
} from "../../PlannerSelector";
import AddEventModal from "../../../Event/Child/AddEventModal";
import AddCallModal from "../../../Call/Child/AddCallModal";
import AddTaskModal from "../../../Task/Child/AddTaskModal";
import AddLeavesModal from "../../../Leave/Child/Tab/AddLeavesModal";
import AddProjectModal from "../../../Project/AddProjectModal";
import { handleLeavesModal } from "../../../Leave/LeavesAction";
import { handleEventModal } from "../../../Event/EventAction";
import { handleCallModal } from "../../../Call/CallAction";
import { handleTaskModal } from "../../../Task/TaskAction";
import { 

  getPlannerHoliday } from "../../../Holiday/HolidayAction";
import { handleProjectModal } from "../../../Project/ProjectAction";
export class PlannerCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvent: {},
      selectedCall: {},
      selectedTask: {},
      selectedLeaves: {},
      selectedProject: {},
    };
  }
  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color;
    var color = event.fontColor;
    var style = {
      backgroundColor: backgroundColor,
      // animation: animation,
      borderRadius: "0.1875em",
      padding: 0,
      paddingLeft: "0.3rem",
      opacity: 0.8,
      color: color,
      fontWeight: 600,
      border: "0em",
      display: "block",
    };
    return {
      style: style,
    };
  };

  componentDidMount() {
    const {
      getCallsListByUserId,
      getEventsListByUserId,
      getTasksListByUserId,
      getLeavesByUserId,
      getPlannerHoliday,
      // getHoliday,
      userDetails: { userId },
    } = this.props;
    getCallsListByUserId(userId);
    getEventsListByUserId(userId);
    getLeavesByUserId(userId);
    getTasksListByUserId(userId,0);
    // getHoliday();
    getPlannerHoliday(userId);
  }

  onSelectEvent = (e) => {
    console.log(e);
    if (e.type === "event") {
      this.props.handleEventModal(true);
      this.setState({ selectedEvent: e.data });
    }
    if (e.type === "call") {
      this.props.handleCallModal(true);
      this.setState({ selectedCall: e.data });
    }
    if (e.type === "task") {
      this.props.handleTaskModal(true);
      this.setState({ selectedTask: e.data });
    }
    if (e.type === "leave") {
      this.props.handleLeavesModal(true);
      this.setState({ selectedLeaves: e.data });
    }
    if (e.type === "project") {
      this.props.handleProjectModal(true);
      this.setState({ selectedProject: e.data });
    }
  };

  render() {
    const {
      handleChooserModal,
      setPlannerDate,
      events,
      calls,
      tasks,
      leaves,
      holidays,
      plannerHolidays,
      projects,
      addCallModal,
      addEventModal,
      addTaskModal,
      addLeavesModal,
      addProjectModal,
      handleCallModal,
      handleEventModal,
      handleTaskModal,
      handleLeavesModal,
      handleProjectModal,
    } = this.props;
    return (
      <MainWrapper>
        <CalendarInstance
          selectable
          handleChooserModal={handleChooserModal}
          eventPropGetter={this.eventStyleGetter}
          onSelectSlot={setPlannerDate}
          onSelectEvent={this.onSelectEvent}
          events={[...calls, ...events, ...tasks, ...leaves, ...plannerHolidays]}
        />
        <FormChooserModal />
        <AddEventModal
          isEditing
          prefillEvent={{
            ...this.state.selectedEvent,
            startDate: dayjs(this.state.selectedEvent.startDate),
            endDate: dayjs(this.state.selectedEvent.endDate),
            startTime: dayjs(this.state.selectedEvent.startDate),
            endTime: dayjs(this.state.selectedEvent.endDate),
          }}
          addEventModal={addEventModal}
          handleEventModal={handleEventModal}
        />
        <AddCallModal
          isEditing
          prefillCall={{
            ...this.state.selectedCall,

            startDate: dayjs(this.state.selectedCall.startDate),
            endDate: dayjs(this.state.selectedCall.endDate),
            startTime: dayjs(this.state.selectedCall.startDate),
            endTime: dayjs(this.state.selectedCall.endDate),
          }}
          addCallModal={addCallModal}
          handleCallModal={handleCallModal}
        />
        <AddTaskModal
          addTaskModal={addTaskModal}
          handleTaskModal={handleTaskModal}
          selectedTask={this.state.selectedTask}
          isEditing
          prefillTask={{
            ...this.state.selectedTask,

            startDate: dayjs(this.state.selectedTask.startDate),
            endDate: dayjs(this.state.selectedTask.endDate),
            startTime: dayjs(this.state.selectedTask.startDate),
            endTime: dayjs(this.state.selectedTask.endDate),
          }}
        />
        <AddLeavesModal
          addLeavesModal={addLeavesModal}
          handleLeavesModal={handleLeavesModal}
          selectedLeaves={this.state.selectedLeaves}
          isEditing
          prefillLeave={{
            ...this.state.selectedLeaves,

            startDate: dayjs(this.state.selectedLeaves.startDate),
            endDate: dayjs(this.state.selectedLeaves.endDate),
          }}
        />

        <AddProjectModal
          isEditing
          prefillEvent={{
            ...this.state.selectedProject,
            startDate: dayjs(this.state.selectedProject.startDate),
            endDate: dayjs(this.state.selectedProject.endDate),
            startTime: dayjs(this.state.selectedProject.startDate),
            endTime: dayjs(this.state.selectedProject.endDate),
          }}
          addProjectModal={addProjectModal}
          handleProjectModal={handleProjectModal}
        />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({ auth, leave, call, event, task, holiday, project }) => ({
  userDetails: auth.userDetails,
  fetchingCallsListByUserId: auth.fetchingCallsListByUserId,
  callsListByUserId: auth.callsListByUserId,
  fetchingEventsListByUserId: auth.fetchingEventsListByUserId,
  eventsListByUserId: auth.eventsListByUserId,
  fetchingTasksListByUserId: auth.fetchingTasksListByUserId,
  tasksListByUserId: auth.tasksListByUserId,
  fetchingLeavesByUserId: auth.fetchingLeavesByUserId,
  fetchingLeavesByUserIdError: auth.fetchingLeavesByUserIdError,
  leavesListByUserId: auth.leavesListByUserId,
  plannerHolidays: holidaySelector(holiday),
  // plannerHolidays:holiday.plannerHolidays,
  calls: callSelector(auth),
  events: eventSelector(auth),
  tasks: taskSelector(auth),
  leaves: leaveSelector(auth),
  // holidays: holidaySelector(holiday),
  // projects: projectSelector(auth),
  addCallModal: call.addCallModal,
  addEventModal: event.addEventModal,
  addTaskModal: task.addTaskModal,
  userId:auth.userDetails.userId,
  addLeavesModal: leave.addLeavesModal,
  addProjectModal: project.addProjectModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleChooserModal,
      setPlannerDate,
      getCallsListByUserId,
      getEventsListByUserId,
      getTasksListByUserId,
      getLeavesByUserId,
      handleEventModal,
      handleCallModal,
      handleTaskModal,
      handleLeavesModal,
      handleProjectModal,
      // getHoliday,
      getPlannerHoliday
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlannerCalendar);
