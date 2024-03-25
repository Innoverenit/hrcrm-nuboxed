import React, { useEffect } from 'react'
import { getTaskByPhoneId } from "./RefurbishAction"
import { MainWrapper } from '../../../Components/UI/Elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QCPhoneTaskToggle from './QCPhoneTaskToggle'

const RepairTaskTable = (props) => {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    })
    return (
        <div>
            <MainWrapper>

                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[18%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
                                <QCPhoneTaskToggle phoneTaskId={item.phoneTaskId} />
                            </div>
                        </div>
                    )
                })}
            </MainWrapper>
        </div>
    )
}
const mapStateToProps = ({ auth, refurbish }) => ({
    taskByPhone: refurbish.taskByPhone
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaskByPhoneId,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskTable);

