import React, { Component } from "react";
import {  Popconfirm,Rate,Button } from "antd";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { updateTodoEvent, updateTodoCall,updateTodoTask } from "../DashboardAction"

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const text = "Rate your engagement";

function RatingBox(props) {
    const { todo, } = props;
    console.log("tenth1",todo)

    const [toggle, setToggle] = React.useState(todo.completionInd)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (todo.completionInd&&todo.activity==="Call") {
            props.updateTodoCall(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // status: true,
                    complitionInd: "true",
                    rating:props.ratingValue
                },
                todo.callId,
                todo.activity
                // props.candidateId,
                // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.updateTodoCall(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // // status: true,
                    rating:props.ratingValue,
                    complitionInd:"false"
                },
                todo.callId,
                todo.activity
                // props.candidateId,
                // props.userId,
                //  handleCallback
            );
        }

        if (todo.completionInd&&todo.activity==="Event") {
            props.updateTodoEvent(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // status: true,
                    complitionInd:"true",
                    rating:props.ratingValue
                },
                 todo.eventId,
                 todo.activity
                // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.updateTodoEvent(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // // status: true,
                    complitionInd: "false",
                    rating:props.ratingValue
                },
                todo.eventId,
                todo.activity,
                

                // props.candidateId,
                // props.userId,
                //  handleCallback
            );
        }

        if (todo.completionInd&&todo.activity==="Task") {
            props.updateTodoTask(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // status: true,
                    complitionInd: "true",
                    rating:props.ratingValue
                },
                 todo.taskId,
                 todo.activity
                // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.updateTodoTask(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // // status: true,
                    complitionInd:"false",
                    rating:props.ratingValue
                },
                todo.taskId,
                todo.activity,
                

                // props.candidateId,
                // props.userId,
                //  handleCallback
            );
        }
    }

    // function handleCancel() {
    //     if (props.active) {
    //         setToggle(true);
    //     } else {
    //         setToggle(false);
    //     }
    // }
    return (
        <>
            <div>
                <Popconfirm
                          placement="topRight"
                          title={
                            <span style={{}}>
                              <p>{text}</p>
                              <Rate
                                allowHalf
                                style={{ color: "orange" }}
                                tooltips={desc}
                                onChange={props.handleChange}
                                 defaultValue={Number(todo.rating)}
                                value={todo.rating}
                                title={text}
                              />
                            </span>
                          }
                          // disabled={todo.completionInd === "false"}
                          onConfirm={() => handleToggleCollection()}
                          okText="Ok"
                          // cancelText="Cancel"
                          cancelText={<FormattedMessage
                            id="app.cancel"
                            defaultMessage="Cancel"
                          />}
                        //   onCancel={this.confirm}
                        >
                 <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                            <Button
                              style={{ padding: "0px 0.37em" }}
                              // disabled={todo.completionInd === "false"}
                              //onClick={() => setId(todo)}
                          
                            >
                            
                              <FormattedMessage
                                id="app.rating"
                                defaultMessage="Rating"
                              />
                            </Button>
                          </div>
                        </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, candidate }) => ({
    // userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // linkCandidateStatus,
            updateTodoCall,
            updateTodoEvent,
            updateTodoTask
            // getCandidateListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(RatingBox);
