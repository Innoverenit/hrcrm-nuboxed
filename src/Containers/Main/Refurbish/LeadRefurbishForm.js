import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    addSupervisor,
    getLocationList,
    getUserByLocationDepartment,
} from "../Account/AccountAction"
import { getProductionOrderId, addLeadInRefurbish } from "./RefurbishAction"
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
        props.addLeadInRefurbish({
            teamLeadUserId: technician
        }, props.rowData.orderPhoneId, handleCallback())
    }
    const handleCallback = () => {
        props.getProductionOrderId(props.userId)
    }
    return (
        <>
            {props.fetchingDepartments ? <BundleLoader /> :
                <>
                    <div class=" flex justify-between">
                        <div className=" w-[25%]">
                          
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

                        <div className=" w-[25%]">
                            <div class=" text-xs font-bold font-poppins">Location</div>
                            
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

                        <div className=" w-[25%]">
                        <div class=" text-xs font-bold font-poppins">Lead</div>
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
                        <div class=" flex justify-end  w-[25%]">
                        <Button
                            loading={props.addingLead}
                            disabled={!technician.length}
                            type="primary"
                            onClick={handleSubmit}>Submit</Button>
                    </div>
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
        addLeadInRefurbish,
        getProductionOrderId,
        getLocationList
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadRefurbishForm);
