import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  List,
} from "antd";
import {
    getUpcomingEvents,
} from "../DashboardAction";

import { setRating, setId } from "../../Event/EventAction";
import { BundleLoader } from "../../../Components/Placeholder";
const UpcomingItems=lazy(() => import("./UpcomingItems"));


const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const text = "Rate your engagement";

class UpcomingEvents extends Component {
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
      value: "",
    };
  }

  handleChange = (value) => {
    const { setRating } = this.props;
    this.setState({ value });
    // alert("selected"+ {value})
    setRating(value);
    console.log(value);
  };
  componentDidMount() {
    const { getUpcomingEvents, userId, startDate, endDate } = this.props;
    getUpcomingEvents();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      const { getUpcomingEvents, userId, startDate, endDate } = nextProps;
      getUpcomingEvents();
    }
  }
  onConfirm = () => {
    ////debugger
    const {
      updateTodoEvent,
      updateTodoCall,
      todo,
      updateTodoTask,
     
      ratingValue,
      idValue,
    } = this.props;

    console.log("Rate4", idValue);
    console.log("Rate", ratingValue);

    if (idValue.activity === "Call") {
      console.log("inside call");
      if (idValue.completionInd === true) {
        updateTodoCall(

          { completionInd: "true", rating: `${ratingValue}` },
          idValue.callId,
          idValue.activity,
          // getTodos
        );
      }
      if (idValue.completionInd === false) {
        updateTodoCall(

          { completionInd: false },
          idValue.callId,
          idValue.activity,
          // getTodos
        );
      }
    }
    if (idValue.activity === "Event") {
      ////debugger;
      console.log("inside event", todo);
      if (idValue.completionInd === true) {
        ////debugger;
        updateTodoEvent(

          {
            completionInd: "true",
            rating: `${ratingValue}`,
          },
          idValue.eventId,
          idValue.activity,
        );
      }
      if (idValue.completionInd === false) {
        ////debugger;
        updateTodoEvent(

          {
            completionInd: "false",
            rating: `${ratingValue}`
          },
          idValue.eventId,
          idValue.activity,
        );
      }
    }

    if (idValue.activity === "Task") {
      ////debugger;
      console.log("inside event", todo);
      if (idValue.completionInd === true) {
        ////debugger;
        updateTodoTask(

          {
            completionInd: "true",
            rating: `${ratingValue}`,
          },
          idValue.taskId,
          idValue.activity,
        );
      }
      if (idValue.completionInd === false) {
        ////debugger;
        updateTodoTask(

          { completionInd: "false" },
          idValue.taskId,
          idValue.activity,
        );
      }
    }
  };
  render() {
    const {
        upcomingEvents,
      todosPrevious,
      todosUpcoming,
      fetchingUpcomingEvents,
      fetchingTodosPrevious,
      fetchingTodosUpcoming,
      updateTodoCall,
      updateTodoEvent,
      updateTodoTask,
      getUpcomingEvents,
      setId,
      user,
      idValue,
    } = this.props;

    console.log(idValue);
    const { value } = this.state;
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.4;
    if (fetchingUpcomingEvents) return <BundleLoader />;


    return (
      <>


     

        {/* <TimeInterval
          times={this.props.dateTodoRangeList}
          handleClick={this.props.setSelectedTodoTimeIntervalReport}
        /> */}



        <div class=" flex">
          {upcomingEvents &&
            upcomingEvents.slice(0, 5).map((upComing, i) => {
              return (
                <List.Item key={upComing.id} style={{ width: "100%"
                //, overflow:"scroll"
                 }}>
                  <UpcomingItems
                    key={upComing.id}
                    upComing={upComing}
                    
                    updateTodoCall={updateTodoCall}
                    updateTodoEvent={updateTodoEvent}
                    updateTodoTask={updateTodoTask}
                     getUpcomingEvents={getUpcomingEvents}

                  />
                  {/* <Popconfirm
                    placement="topRight"
                    title={"Done"

                    }
                    // disabled={todo.completionInd === "false"}
                    onConfirm={this.onConfirm}
                    okText="Ok"
                    // cancelText="Cancel"
                   
                    onCancel={this.confirm}
                  >
                    <FlexContainer justifyContent="flex-end"
>
                      <Button
                        style={{ padding: "0px 0.37em", border: "none" }}
                        // disabled={todo.completionInd === "false"}
                        onClick={() => setId(todo)}


                      >

                   
                      </Button>
                    </FlexContainer>
                  </Popconfirm> */}
                  {/* <RatingBox
                        handleChange={this.handleChange}
                        todo={todo}
                        ratingValue={this.props.ratingValue}
                        /> */}

                </List.Item>
              );
            })}
        </div>



        {/* </MainWrapper> */}
      </>
    );
  }
}

const mapStateToProps = ({ auth, dashboard, customer, event }) => ({
  user: auth.userDetails,
  fetchingUpcomingEvents: dashboard.fetchingUpcomingEvents,
  userId: auth.userDetails.userId,
  // todosPrevious: dashboard.todosPrevious,
  // todosUpcoming: dashboard.todosUpcoming,
  // todos: dashboard.todos,
  ratingValue: event.ratingValue,
  idValue: event.idValue,
  dateTodoRangeList: customer.dateTodoRangeList,

  endDate: customer.endDate,
  startDate: customer.startDate,
  upcomingEvents: dashboard.upcomingEvents
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getUpcomingEvents,
      setRating,
      setId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);
