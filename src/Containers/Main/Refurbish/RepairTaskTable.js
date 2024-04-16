import React, { useEffect } from 'react'
import { getTaskByPhoneId, deleteTaskList } from "./RefurbishAction"
import { MainWrapper, MultiAvatar } from '../../../Components/UI/Elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QCPhoneTaskToggle from './QCPhoneTaskToggle'
import { Popconfirm } from "antd";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

const RepairTaskTable = (props) => {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])
    return (
        <div>
            <MainWrapper>

                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[50%] flex justify-center max-sm:w-auto mt-2 ">
                            <div class="w-[50%]">
                                {item.taskName}
                            </div>
                            <div class="w-[50%] flex justify-between">
                                <QCPhoneTaskToggle item={item} />
                                <MultiAvatar
                                    primaryTitle={`${item.completeTaskUserName}`}
                                    imgWidth={"2.1em"}
                                    imgHeight={"2.1em"}
                                />
                                <span>
                                    {dayjs(item.creationDate).format("DD-MM-YY HH:mm:ss")}
                                </span>
                                {!item.completeTaskInd && <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({
                                        userId: props.userId
                                    }, item.phoneTaskId)}
                                >
                                    <DeleteIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm>}
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

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskTable);

