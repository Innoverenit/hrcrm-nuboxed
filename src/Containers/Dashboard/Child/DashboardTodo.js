import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  List,
  Popconfirm,
  Rate,
} from "antd";
import {
  getTodos,
  updateTodoCall,
  updateTodoEvent,
  updateTodoTask
} from "../DashboardAction";

import { setSelectedTodoTimeIntervalReport } from "../../Customer/CustomerAction"
import TimeInterval from "../../../Utils/TimeInterval";
import { setRating, setId } from "../../Event/EventAction";
import { BundleLoader } from "../../../Components/Placeholder";
const TodoItem=lazy(() => import("./TodoItem"));

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const text = "Rate your engagement";

class Todo extends Component {
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

  // componentDidMount() {
  //    this.props.getTodos();
  //   // this.props.getTodosPrevious();
  //   // this.props.getTodosUpcoming();
  // }
  componentDidMount() {
    const { getTodos, userId, startDate, endDate } = this.props;
    getTodos(userId, startDate, endDate);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      const { getTodos, userId, startDate, endDate } = nextProps;
      getTodos(userId, startDate, endDate);
    }
  }
  onConfirm = () => {
    ////debugger
    const {
      updateTodoEvent,
      updateTodoCall,
      todo,
      updateTodoTask,
      //   getTodos,
      //   getTodosPrevious,
      //   getTodosUpcoming,
      ratingValue,
      idValue,
    } = this.props;
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
      todos,
      todosPrevious,
      todosUpcoming,
      fetchingTodos,
      fetchingTodosPrevious,
      fetchingTodosUpcoming,
      updateTodoCall,
      updateTodoEvent,
      updateTodoTask,
      getTodos,
      //   getTodosPrevious,
      //   getTodosUpcoming,
      setId,
      user,
      idValue,
    } = this.props;

    console.log(idValue);
    const { value } = this.state;
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.4;
    if (fetchingTodos) return <BundleLoader />;
    // if (!todos.length)
    //   return (
    //     <Empty
    //       description={` No appointments listed for Today`}
    //       style={{ color: "#777" }}
    //     />
    //   );

    return (
      <>


        {/* <MainWrapper
      style={{
          height: "50vh",
   
      }}
      > */}
      <div  >

        <TimeInterval
          times={this.props.dateTodoRangeList}
          handleClick={this.props.setSelectedTodoTimeIntervalReport}
        />

        {todos.length ? 
                <div class=" flex flex-col ">
          {todos &&
            todos.slice(0, 5).map((todo, i) => {
              return (
                <List.Item key={todo.id} style={{ width: "100%"
                //, overflow:"scroll"
                 }}>
                  <div class=" flex flex-row justify-between">
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    //overflow={"scroll"}
                    //ratingValue={this.props.ratingValue}
                    updateTodoCall={updateTodoCall}
                    updateTodoEvent={updateTodoEvent}
                    updateTodoTask={updateTodoTask}
                    getTodos={getTodos}

                  />
                                     <div class=" flex justify-end" 
>
                  <Popconfirm
                    placement="topRight"
                    title={"Done"

                    }
                    // disabled={todo.completionInd === "false"}
                    onConfirm={this.onConfirm}
                    okText="Ok"
                    // cancelText="Cancel"
                    cancelText={<FormattedMessage
                      id="app.cancel"
                      defaultMessage="Cancel"
                    />}
                    onCancel={this.confirm}
                  >
 
                      <button
                      className="button-borderless"
                        style={{ padding: "0px 0.37em", border: "none" }}
                        // disabled={todo.completionInd === "false"}
                        onClick={() => setId(todo)}


                      >

                        <Rate
                          allowHalf
                          style={{ color: "orange" }}
                          tooltips={desc}
                          onChange={this.handleChange}
                          defaultValue={Number(todo.rating)}
                          // defaultValue={$`{2}`}
                          value={`${todo.rating} `}
                          title={text}

                        />
                      </button>
                  
                  </Popconfirm>
                  </div>
                  </div>
                  {/* <RatingBox
                        handleChange={this.handleChange}
                        todo={todo}
                        ratingValue={this.props.ratingValue}
                        /> */}

                </List.Item>
              );
            })}
        </div>
        :"Data Not Available"
  }

</div>
        {/* </MainWrapper> */}
      </>
    );
  }
}

const mapStateToProps = ({ auth, dashboard, customer, event }) => ({
  user: auth.userDetails,
  fetchingTodos: dashboard.fetchingTodos,
  userId: auth.userDetails.userId,
  ratingValue: event.ratingValue,
  idValue: event.idValue,
  dateTodoRangeList: customer.dateTodoRangeList,
  endDate: customer.endDate,
  startDate: customer.startDate,
  todos: dashboard.todos
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTodos,
      setSelectedTodoTimeIntervalReport,
      updateTodoCall,
      updateTodoEvent,
      updateTodoTask,


      //   getTodosPrevious,
      //   getTodosUpcoming,
      //   updateTodoCall,
      //   updateTodoEvent,
      setRating,
      setId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
