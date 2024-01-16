import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist, receiveTaskByDispatch } from "../../../../Account/AccountAction";
import { MainWrapper } from "../../../../../../Components/UI/Elements";
import { Checkbox, Switch } from "antd";

function DispatchTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.phoneId)
        settask1Ind(props.phoTasklist.task1Ind)
        settask2Ind(props.phoTasklist.task2Ind)
        settask3Ind(props.phoTasklist.task3Ind)
        settask1CompleteInd(props.phoTasklist.task1CompleteInd)
        settask2CompleteInd(props.phoTasklist.task2CompleteInd)
        settask3CompleteInd(props.phoTasklist.task3CompleteInd)
    }, [
        props.phoTasklist.task1Ind,
        props.phoTasklist.task2Ind,
        props.phoTasklist.task3Ind,
        props.phoTasklist.task1CompleteInd,
        props.phoTasklist.task2CompleteInd,
        props.phoTasklist.task3CompleteInd
    ])
    const [task1Ind, settask1Ind] = useState(props.phoTasklist.task1Ind)
    const [task2Ind, settask2Ind] = useState(props.phoTasklist.task2Ind)
    const [task3Ind, settask3Ind] = useState(props.phoTasklist.task3Ind)
    const [task1CompleteInd, settask1CompleteInd] = useState(props.phoTasklist.task1CompleteInd)
    const [task2CompleteInd, settask2CompleteInd] = useState(props.phoTasklist.task2CompleteInd)
    const [task3CompleteInd, settask3CompleteInd] = useState(props.phoTasklist.task3CompleteInd)

    const handleToggleChange1 = () => {
        props.receiveTaskByDispatch({
            task1CompleteInd: task1CompleteInd ? false : true,
        }, props.phoneId)
    }
    const handleToggleChange2 = () => {
        props.receiveTaskByDispatch({
            task2CompleteInd: task2CompleteInd ? false : true,
        }, props.phoneId)
    }
    const handleToggleChange3 = () => {
        props.receiveTaskByDispatch({
            task3CompleteInd: task3CompleteInd ? false : true,
        }, props.phoneId)
    }
    return (
        <>
            <MainWrapper>
                <>
                    <h4>Task Type</h4>
                    {props.phoTasklist.task1 ?
                        <div class=" flex" >
                            <h5>Task1 :{props.phoTasklist.task1}
                                &nbsp;&nbsp;&nbsp;
                                <Checkbox
                                    disabled
                                    checked={task1Ind} />
                            </h5>
                            <div class=" ml-[4px]" >
                                <Switch
                                    onChange={handleToggleChange1}
                                    checked={props.phoTasklist.task1CompleteInd}
                                    unCheckedChildren="No"
                                    checkedChildren="Yes"
                                />
                            </div>
                        </div> : null}
                    {props.phoTasklist.task2 ?
                <div class=" flex" >
                            <h5>Task2 :{props.phoTasklist.task2}
                                &nbsp;&nbsp;&nbsp;
                                <Checkbox
                                    disabled
                                    checked={task2Ind} />
                            </h5>
                            <div class=" ml-[4px]" >
                                <Switch
                                    checked={props.phoTasklist.task2CompleteInd}
                                    onChange={handleToggleChange2}
                                    unCheckedChildren="No"
                                    checkedChildren="Yes"
                                />
                            </div>
                        </div>
                        : null}

                    {props.phoTasklist.task3 ?
                             <div class=" flex" >
                            <h5>Task3 :{props.phoTasklist.task3}
                                &nbsp;&nbsp;&nbsp;
                                <Checkbox
                                    disabled
                                    checked={task3Ind} />
                            </h5>
                            <div class="  ml-[4px]" >
                                <Switch
                                    onChange={handleToggleChange3}
                                    checked={props.phoTasklist.task3CompleteInd}
                                    unCheckedChildren="No"
                                    checkedChildren="Yes"
                                />
                            </div>
                        </div>
                        : null}
                </>
            </MainWrapper>
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    phoTasklist: distributor.phoTasklist,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist,
            receiveTaskByDispatch
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DispatchTaskTable);
