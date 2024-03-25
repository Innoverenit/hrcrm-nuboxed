import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTaskByPhoneId, } from "./RefurbishAction"
import { MainWrapper } from "../../../Components/UI/Elements";
import QCPhoneTaskToggle from "./QCPhoneTaskToggle";
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from "antd";


function QCPhoneTaskList(props) {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])

    return (
        <>
            <MainWrapper>

                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[25%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
                                <Tooltip title="Delete">
                                    <DeleteIcon
                                        className="text-base cursor-pointer text-[red]"
                                    />
                                </Tooltip>
                                {/* <QCPhoneTaskToggle phoneTaskId={item.phoneTaskId}/> */}
                            </div>
                        </div>
                    )
                })}
            </MainWrapper>


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
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QCPhoneTaskList);