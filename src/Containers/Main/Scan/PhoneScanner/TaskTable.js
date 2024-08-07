import React, { useEffect } from 'react'
import { getTaskByPhoneId, deleteTaskList } from "../../../../Containers/Main/Refurbish/RefurbishAction"
import { MainWrapper } from '../../../Components/UI/Elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QCPhoneTaskToggle from '../../../../Containers/Main/Refurbish/QCPhoneTaskToggle'
import { Popconfirm } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';

const TaskTable = (props) => {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])
    return (
        <div>
            <MainWrapper>

                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[30%] flex justify-center ">
                            <div class="w-[70%]">
                                {item.taskName}
                            </div>
                            <div class="w-[30%] flex justify-between">
                                <QCPhoneTaskToggle item={item} />
                                <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({
                                        userId: props.userId
                                    }, item.phoneTaskId)}
                                >
                                    <DeleteIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm>
                            </div>

                        </div>
                    )
                })}
            </MainWrapper>
        </div>
    )
}
const mapStateToProps = ({ auth, refurbish }) => ({
    taskByPhone: refurbish.taskByPhone,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaskByPhoneId,
            deleteTaskList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);

