import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addSupervisor, addLead, getLocationList, getUserByLocationDepartment } from "../Account/AccountAction"
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { Button, Select } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
const { Option } = Select;

function LeadRefurbishForm(props) {
    useEffect(() => {
        props.getDepartments()
        props.getLocationList(props.orgId);
    }, []);
    const [technician, setTechnician] = useState("")
    const [department, setDepartment] = useState("")
    const [location, setLocation] = useState("")

    const handleTechnician = (val) => {
        setTechnician(val)
    }

    const handleLocation = (val) => {
        setLocation(val)
        props.getUserByLocationDepartment(val, department);
    }

    const handleDepartment = (val) => {
        setDepartment(val)

    }
    const handleSubmit = () => {
        props.addLead({})
    }
    return (
        <>
            {props.fetchingDepartments ? <BundleLoader /> :
                <>
                    <div class=" flex justify-between">
                        <div className=" w-1/3">
                            <label>Department</label>
                            <Select
                                className="w-[250px]"
                                value={department}
                                onChange={(value) => handleDepartment(value)}
                            >
                                {props.departments.map((a) => {
                                    return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                })}
                            </Select>
                        </div>

                        <div className=" w-1/3">
                            <label>Location</label>
                            <Select
                                className="w-[250px]"
                                value={location}
                                onChange={(value) => handleLocation(value)}
                            >
                                {props.locationlist.map((a) => {
                                    return <Option value={a.locationDetailsId}>{a.locationName}</Option>;
                                })}
                            </Select>
                        </div>

                        <div className=" w-1/3">
                            <label>Lead</label>
                            <Select
                                className="w-[250px]"
                                value={technician}
                                onChange={(value) => handleTechnician(value)}
                            >
                                {props.departmentUser.map((a) => {
                                    return <Option value={a.employeeId}>{a.empName}</Option>;
                                })}
                            </Select>
                        </div>
                    </div>
                    <div class=" flex justify-end">
                        <Button
                            loading={props.addingLead}
                            disabled={!technician.length}
                            type="primary"
                            onClick={handleSubmit}>Submit</Button>
                    </div>
                </>}
        </>
    );
}
const mapStateToProps = ({ distributor, departments, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    locationlist: distributor.locationlist,
    departments: departments.departments,
    addingLead: distributor.addingLead,
    departmentUser: distributor.departmentUser,
    fetchingDepartments: departments.fetchingDepartments
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getUserByLocationDepartment,
        addSupervisor,
        getDepartments,
        addLead,
        getLocationList
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadRefurbishForm);
