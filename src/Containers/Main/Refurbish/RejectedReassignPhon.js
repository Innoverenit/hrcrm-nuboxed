
import { Select, DatePicker, Button, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { getProductionUsersById, reassignRejectedPhone } from "./RefurbishAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const { Option } = Select

const RejectedReassignPhon = (props) => {
    const [department, setDepartment] = useState("")
    const [technician, setTechnician] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [toggle, setToggle] = useState(false)

    console.log(technician)
    console.log(props.userId)
    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleDepartment = (val) => {
        setDepartment(val)
        props.getProductionUsersById(val, props.locationId);
    }
    const handleTechnician = (val) => {
        setTechnician(val)
    }
    const hanldeOnChange = (value) => {
        setDueDate(value)
    }

    useEffect(() => {
        props.getDepartments()
    }, [])
    // if (props.fetchingDepartments) {
    //     return <BundleLoader />
    // }
    return (
        <div>

            {toggle ?
                <>
                    <div class="mt-[10px] flex justify-between">
                        <div class=" w-1/5">
                            <div class="text-[15px] font-semibold m-[10px]">Department</div>
                            <Select
                                className="w-[350px]"
                                value={department}
                                onChange={(value) => handleDepartment(value)}
                            >
                                {props.departments.map((a) => {
                                    return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                })}
                            </Select>
                        </div>
                        <div class=" w-1/5">
                            <div class="text-[15px] font-semibold m-[10px]">Technician</div>
                            <Select
                                className="w-[350px]"
                                value={technician}
                                onChange={(value) => handleTechnician(value)}
                            >
                                {props.productionUser.map((a) => {
                                    return <Option value={a.employeeId}>{a.empName}</Option>;
                                })}
                            </Select>
                        </div>

                        <div class=" w-1/5">
                            <div class="text-[15px] font-semibold m-[10px]">Due Date</div>
                            <DatePicker
                                className="w-[250px]"
                                value={dueDate}
                                onChange={(value) => hanldeOnChange(value)}
                            />
                        </div>

                    </div>
                    <div class="flex justify-end mt-1">
                        {department && technician && dueDate && <Button
                            type='primary'
                            // loading={props.updatingTechnicianForRepair}
                            onClick={() => props.reassignRejectedPhone({
                                rejectReceiveUserId: technician,
                                duplicateRepairDueDate: dueDate,
                                rejectReassignInd: true
                            }, props.row.productionRepairDispatchId

                            )}>
                            Submit
                        </Button>}
                    </div>
                </> :
                <>
                    <div class="mt-[10px] flex justify-between">
                        <div class=" w-1/5 font-bold"> Reassign to :</div>
                        <div class=" w-1/5">
                            <Switch
                                checked={toggle}
                                onChange={handleToggle}
                                checkedChildren="Others"
                                unCheckedChildren={props.row.technicianName}
                            />
                        </div>

                        <div class=" w-1/5">
                            <div class="text-[15px] font-semibold m-[10px]">Due Date</div>
                            <DatePicker
                                className="w-[250px]"
                                value={dueDate}
                                onChange={(value) => hanldeOnChange(value)}
                            />
                        </div>
                        <div class=" w-1/5">
                            <Button
                                type='primary'
                                loading={props.reassigningRejectedPhones}
                                onClick={() => props.reassignRejectedPhone({
                                    rejectReceiveUserId: props.row.technicianId,
                                    duplicateRepairDueDate: dueDate,
                                    rejectReassignInd: true
                                }, props.row.productionRepairDispatchId

                                )}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish, departments }) => ({
    departments: departments.departments,
    fetchingDepartments: departments.fetchingDepartments,
    productionUser: refurbish.productionUser,
    reassigningRejectedPhones: refurbish.reassigningRejectedPhones,
    locationId: auth.userDetails.locationId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDepartments,
            getProductionUsersById,
            reassignRejectedPhone
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RejectedReassignPhon);


