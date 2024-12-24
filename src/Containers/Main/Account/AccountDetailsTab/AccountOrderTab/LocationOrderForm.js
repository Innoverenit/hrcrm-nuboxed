import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addSupervisor, addLead, getUserByLocationDepartment } from "../../AccountAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"
import { Button, Select } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const { Option } = Select;

function LocationOrderForm(props) {
    // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const fetchMenuTranslations = async () => {
    //       try {
    //         setLoading(true); 
    //         const itemsToTranslate = [
    // '946', // 0 Team Member
    // '326', // 1  Department
    // '154', //  Submit
     
    //       ];
    
    //         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
    //         setTranslatedMenuItems(translations);
    //         setLoading(false);
    //       } catch (error) {
    //         setLoading(false);
    //         console.error('Error translating menu items:', error);
    //       }
    //     };
    
    //     fetchMenuTranslations();
    //   }, [props.selectedLanguage]);
    useEffect(() => {
        props.getDepartments()
    }, []);
    const [technician, setTechnician] = useState("")
    const [department, setDepartment] = useState("")

    const handleTechnician = (val) => {
        setTechnician(val)
    }
    let location = props.particularRowData.locationDetailsId

    const handleDepartment = (val) => {
        setDepartment(val)
        props.getUserByLocationDepartment(location, val);
    }
    const handleSubmit = () => {
        props.addSupervisor({
             supervisorUserId: technician,
             supervisorAssignedBy:props.userId,
         }, props.particularRowData.orderId)
    }
    return (
        <>
            {props.fetchingDepartments ? <BundleLoader /> :
                <>
                    <div class=" flex justify-between">
                        <div className=" w-2/5">
                            <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[82]}</div>
                            <Select
                                placeholder="Select"
                                className="w-[350px]"
                                value={department}
                                onChange={(value) => handleDepartment(value)}
                            >
                                {props.departments.map((a) => {
                                    return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                })}
                            </Select>
                        </div>

                        <div className=" w-2/5">
                            <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[83]}</div>
                            <Select
                                placeholder="Select"
                                className="w-[350px]"
                                value={technician}
                                onChange={(value) => handleTechnician(value)}
                            >
                                {props.departmentUser.map((a) => {
                                    return <Option value={a.employeeId}>{a.empName}</Option>;
                                })}
                            </Select>
                        </div>
                        <div>
                        <Button
                            disabled={!technician.length}
                            type="primary"
                            loading={props.addingSupervisor}
                            onClick={handleSubmit}>{props.translatedMenuItems[84]}</Button>
                    </div>
                    </div>

                   
                </>}
        </>
    );
}
const mapStateToProps = ({ distributor, departments, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    departmentUser: distributor.departmentUser,
    addingSupervisor: distributor.addingSupervisor,
    fetchingDepartments: departments.fetchingDepartments
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getUserByLocationDepartment,
        addSupervisor,
        getDepartments,
        addLead
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationOrderForm);
