import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addSupervisor, getUserByLocationDepartment } from "../../AccountAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"
import * as Yup from "yup";
import { Select } from "antd";
const { Option } = Select;

function LocationOrderForm(props) {
    useEffect(() => {
        props.getDepartments()
    }, []);
    const [technician, setTechnician] = useState("")
    const [department, setDepartment] = useState("")

    const handleTechnician = (val) => {
        setTechnician(val)
        props.addSupervisor({ supervisorUserId: val }, props.particularRowData.orderId)
    }
    const handleDepartment = (val) => {
        let location = props.particularRowData.locationDetailsViewDTO.locationDetailsId
        setDepartment(val)
        props.getUserByLocationDepartment(location, val);
    }
    return (
        <>
            <div class=" flex justify-between">
                <div className=" w-2/5">
                    <Select
                        className="w-[350px]"
                        value={department}
                        onChange={(value) => { handleDepartment(value) }}
                    >
                        {props.departments.map((a) => {
                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                        })}
                    </Select>
                </div>

                <div className=" w-2/5">

                    <Select
                        className="w-[350px]"
                        value={technician}
                        onChange={(value) => handleTechnician(value)}
                    >
                        {props.departmentUser.map((a) => {
                            return <Option value={a.employeeId}>{a.empName}</Option>;
                        })}
                    </Select>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = ({ distributor, departments, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    departmentUser: distributor.departmentUser,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getUserByLocationDepartment,
        addSupervisor,
        getDepartments
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationOrderForm);
