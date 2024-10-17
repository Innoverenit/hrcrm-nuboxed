import { createSelector } from "reselect";
import dayjs from "dayjs";

const callList = (auth) => auth.callsListByUserId;
const eventList = (auth) => auth.eventsListByUserId;
const taskList = (auth) => auth.tasksListByUserId;
const leaveList = (auth) => auth.leavesListByUserId;
const projectList = (auth) => auth.projectsListByUserId;

const holidayList = (holiday) => holiday.plannerHolidays;

export const holidaySelector = createSelector([holidayList], (plannerHolidays) => {
  console.log("inside holidays selector");
  return plannerHolidays.map((holiday) => {
    var d = new Date();
    console.log(`local sysytem date ${d}`);
    var holidaysDate = dayjs(holiday.date);
    var holidaysendDate = dayjs(holiday.date);
    console.log(`leave start date ${holidaysDate}`);
    console.log(`leave end date ${holidaysendDate}`);

    // if (dayjs().isBetween(holidaysDate, holidaysendDate)) {
    //   var value = "orange";
    // } else {
    //   var value = "white";
    // }

    if (dayjs().isAfter(holidaysDate) && dayjs().isBefore(holidaysendDate)) {
      var value = "orange";
    } else {
      var value = "white";
    }

    return {
      title: holiday.holidayName,
      start: holiday.date,
      end: holiday.date,
      color: holiday.holidayType === "Optional" ? "Orange" : "red",
      // color: #3174ad,
      fontColor: value,
      // animation: value,
      type: "holiday",
      data: holiday,
    };
  });
});

export const leaveSelector = createSelector([leaveList], (leaves) => {
  console.log("inside leave selector");
  return leaves.map((leaves) => {
    var d = new Date();
    console.log(`local sysytem date ${d}`);
    var leaveDate = dayjs(leaves.startDate);
    var leaveendDate = dayjs(leaves.endDate);
    console.log(`leave start date ${leaveDate}`);
    console.log(`leave end date ${leaveendDate}`);

    // if (dayjs().isBetween(leaveDate, leaveendDate)) {
    //   var value = "orange";
    // } else {
    //   var value = "white";
    // }
    if (dayjs().isAfter(leaveDate) && dayjs().isBefore(leaveendDate)) {
      var value = "orange";
    } else {
      var value = "white";
    }
    

    return {
      title: leaves.coverDetails,
      start: leaves.startDate,
      end: leaves.endDate,
      color: "#54672B",
      // color: #3174ad,
      fontColor: value,
      // animation: value,
      type: "leave",
      data: leaves,
    };
  });
});

export const eventSelector = createSelector([eventList], (events) => {
  console.log("inside event selector");
  return events.map((event) => {
    var d = new Date();
    console.log(`local sysytem date ${d}`);
    var eventDate = dayjs(event.startDate);
    var eventendDate = dayjs(event.endDate);
    console.log(`event start date ${eventDate}`);
    console.log(`event end date ${eventendDate}`);

    // if (dayjs().isBetween(eventDate, eventendDate)) {
    //   var value = "orange";
    // } else {
    //   var value = "white";
    // }

    if (dayjs().isAfter(eventDate) && dayjs().isBefore(eventendDate)) {
      var value = "orange";
    } else {
      var value = "white";
    }
    

    return {
      title: event.eventType,
      start: event.startDate,
      end: event.endDate,
      color: "#3174ad",
      // color: #3174ad,
      fontColor: value,
      // animation: value,
      type: "event",

      data: event,
    };
  });
});
export const callSelector = createSelector([callList], (calls) => {
  if (calls) {
    return calls.map((call) => {
      var d = new Date();
      console.log(`local sysytem date ${d}`);
      var callDate = dayjs(call.startDate);
      var callendDate = dayjs(call.endDate);
      console.log(`event start date ${callDate}`);
      console.log(`event end date ${callendDate}`);

      // if (dayjs().isBetween(callDate, callendDate)) {
      //   var value = "orange";
      // } else {
      //   var value = "white";
      // }
      if (dayjs().isAfter(callDate) && dayjs().isBefore(callendDate)) {
        var value = "orange";
      } else {
        var value = "white";
      }

      return {
        title: call.callType,
        start: call.startDate,
        end: call.endDate,
        color: "#06bcbf",
        fontColor: value,
        // color: value,
        type: "call",
        data: call,
      };
    });
  } else {
    return [];
  }
});
export const taskSelector = createSelector([taskList], (tasks) => {
  return tasks.map((task) => {
    var d = new Date();
    console.log(`local sysytem date ${d}`);
    var taskDate = dayjs(task.startDate);
    var taskendDate = dayjs(task.endDate);
    console.log(`event start date ${taskDate}`);
    console.log(`event end date ${taskendDate}`);


    // if (dayjs().isBetween(taskDate, taskendDate)) {
    //   var value = "orange";
    // } else {
    //   var value = "white";
    // }
    if (dayjs().isAfter(taskDate) && dayjs().isBefore(taskendDate)) {
      var value = "orange";
    } else {
      var value = "white";
    }
    return {
      title: task.taskType,
      start: task.startDate,
      end: task.endDate,
      color: "#917a03",
      fontColor: value,
      type: "task",
      data: task,
    };
  });
});

export const projectSelector = createSelector([projectList], (projects) => {
  console.log("inside project selector");
  return projects.map((project) => {
    var d = new Date();
    console.log(`local sysytem date ${d}`);
    var projectDate = dayjs(project.startDate);
    var projectendDate = dayjs(project.endDate);
    console.log(`project start date ${projectDate}`);
    console.log(`project end date ${projectendDate}`);

    // if (dayjs().isBetween(projectDate, projectendDate)) {
    //   var value = "orange";
    // } else {
    //   var value = "white";
    // }
    if (dayjs().isAfter(projectDate) && dayjs().isBefore(projectendDate)) {
      var value = "orange";
    } else {
      var value = "white";
    }
    return {
      title: project.projectType,
      start: project.startDate,
      end: project.endDate,
      color: "#3174ad",
      // color: #3174ad,
      fontColor: value,
      // animation: value,
      type: "project",

      data: project,
    };
  });
});