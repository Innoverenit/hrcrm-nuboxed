import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTaskByPhoneId, } from "../../../Refurbish/RefurbishAction"

function AccountPhoneTaskList(props) {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])
console.log(props.particularRowData)
    return (
        <>
          <div class="mr-5 ml-5">
<div class="font-semibold text-sm underline">{props.particularRowData.imei}</div>
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
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountPhoneTaskList);