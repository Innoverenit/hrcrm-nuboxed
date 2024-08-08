import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTaskByPhoneId, deleteTaskList } from "./RefurbishAction"
import { Popconfirm, Tooltip } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';

function QCPhoneTaskList(props) {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])

    return (
        <>
<div class="mr-5 ml-5">
                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[25%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
                                <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({}, item.phoneTaskId)}
                                >
                                    <DeleteIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm>

                            </div>
                        </div>
                    )
                })}
            </div>


        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
    taskByPhone: refurbish.taskByPhone,
    userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaskByPhoneId,
            deleteTaskList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QCPhoneTaskList);