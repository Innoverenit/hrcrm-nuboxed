import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTaskByPhoneId, } from "../../../Refurbish/RefurbishAction"
import { MainWrapper } from "../../../../../Components/UI/Elements";
// import QCPhoneTaskToggle from "./QCPhoneTaskToggle";


function AccountPhoneTaskList(props) {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])

    return (
        <>
            <MainWrapper>

                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[18%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPhoneTaskList);