import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist, checkTaskComplition } from "../Account/AccountAction";
import { MainWrapper } from "../../../Components/UI/Elements";
import { Checkbox } from "antd";

function RepairTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.phoneId)
        settask1Ind(props.phoTasklist.task1Ind)
        settask2Ind(props.phoTasklist.task2Ind)
        settask3Ind(props.phoTasklist.task3Ind)
    }, [
        props.phoTasklist.task1Ind,
        props.phoTasklist.task2Ind,
        props.phoTasklist.task3Ind,
    ])
    const [task1Ind, settask1Ind] = useState(props.phoTasklist.task1Ind)
    const [task2Ind, settask2Ind] = useState(props.phoTasklist.task2Ind)
    const [task3Ind, settask3Ind] = useState(props.phoTasklist.task3Ind)
    console.log(task1Ind)
    const handleckeck1 = (e) => {
        settask1Ind(e.target.checked)
        const data1 = {
            task: props.phoTasklist.task1,
            phoneId: props.phoneId,
            task1Ind: task1Ind ? false : true,
            task2Ind: task2Ind,
            task3Ind: task3Ind
        }
        props.checkTaskComplition(data1, props.phoneId)
    }
    const handleckeck2 = (e) => {
        settask2Ind(e.target.checked)
        const data2 = {
            task: props.phoTasklist.task2,
            phoneId: props.phoneId,
            task1Ind: task1Ind,
            task2Ind: task2Ind ? false : true,
            task3Ind: task3Ind
        }
        props.checkTaskComplition(data2, props.phoneId)
    }
    const handleckeck3 = (e) => {
        settask3Ind(e.target.checked)
        const data3 = {
            task: props.phoTasklist.task3,
            phoneId: props.phoneId,
            task1Ind: task1Ind,
            task2Ind: task2Ind,
            task3Ind: task3Ind ? false : true
        }
        props.checkTaskComplition(data3, props.phoneId)
    }
    return (
        <>
            <MainWrapper>
                <h4>Task Type</h4>
                {props.phoTasklist.task1 ?
                    <h5>Task1 :{props.phoTasklist.task1}
                        <Checkbox
                            checked={task1Ind}
                            onChange={handleckeck1}
                        /> </h5> : null}
                {props.phoTasklist.task2 ?
                    <h5>Task2 :{props.phoTasklist.task2}
                        <Checkbox
                            checked={task2Ind}
                            onChange={handleckeck2} /> </h5> : null}
                {props.phoTasklist.task3 ?
                    <h5>Task3 :{props.phoTasklist.task3}
                        <Checkbox
                            checked={task3Ind}
                            onChange={handleckeck3} /> </h5> : null}
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
            checkTaskComplition
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskTable);
