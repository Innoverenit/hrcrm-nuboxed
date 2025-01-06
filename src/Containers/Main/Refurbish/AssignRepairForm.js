import { Button, DatePicker, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { StyledTable } from '../../../Components/UI/Antd';
import { getDepartments } from "../../Settings/Department/DepartmentAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getProductionUsersById,
    getRepairPhoneById,
    UpdateTechnicianForRepairPhone,
    getTATQuality
} from "./RefurbishAction";
import dayjs from "dayjs";

const { Option } = Select;

const AssignRepairForm = (props) => {
    let depaVal = props.rowData.defaultRepairDepartmentId === "null" ? "" : props.rowData.defaultRepairDepartmentId;

    const [technician, setTechnician] = useState("");
    const [department, setDepartment] = useState(depaVal);
    const [selectedRow, setSelectedRow] = useState([]);
    const [dueDate, setDueDate] = useState("");

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows);
        },
    };

    const checkedValue = selectedRow.map((item) => item['phoneId']);

    const handleTechnician = (val) => {
        setTechnician(val);
        props.getTATQuality(val);
    };

    const handleDepartment = (val) => {
        const depaVal = props.rowData.defaultRepairDepartmentId === "null" ? val : props.rowData.defaultRepairDepartmentId;
        setDepartment(depaVal);
        props.getProductionUsersById(depaVal, props.locationId);
    };

    const handleDateChange = (value) => {
        setDueDate(value);
    };

    const handleCallback = () => {
        if (!props.repairPhoneByOrder.length) {
            props.closeRepairModal();
        }
    };

    useEffect(() => {
        props.getProductionUsersById(props.rowData.defaultRepairDepartmentId, props.locationId);
        props.getRepairPhoneById(props.rowData.orderPhoneId);
        props.getDepartments();
    }, []);

    const columns = [
        { 
            title: "", 
            dataIndex: "", 
            width: "1%", 
            render: () => <div className="flex items-center justify-center h-8"></div> 
        },
        { 
            title: "Brand", 
            dataIndex: "company", 
            width: "15%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
                    {text}
                </div>
            ) 
        },
        { 
            title: "Model", 
            dataIndex: "model", 
            width: "10%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
                    {text}
                </div>
            ) 
        },
        { 
            title: "IMEI", 
            dataIndex: "imei", 
            width: "12%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
                    
                    {text}
                </div>
            ) 
        },
        { 
            title: "OS", 
            dataIndex: "os", 
            width: "12%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
                    {text}
                </div>
            ) 
        },
        { 
            title: "GB", 
            dataIndex: "gb", 
            width: "12%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
                    {text}
                </div>
            ) 
        },
        { 
            title: "Color", 
            dataIndex: "color", 
            width: "12%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
                    {text}
                </div>
            ) 
        },
        { 
            title: "Condition", 
            dataIndex: "conditions", 
            width: "12%", 
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] truncate">
                    {text}
                </div>
            ) 
        },
    ];

    return (
        <div>
            <div className="mt-[10px] flex justify-between">
                <div className="w-1/5">
                    <div className="text-[15px] font-popins m-[10px]">Due Date</div>
                    <DatePicker
                        className="w-[250px]"
                        value={dueDate}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="w-1/5">
                    <div className="text-[15px] font-popins m-[10px]">Department</div>
                    <Select
                        className="w-[350px]"
                        value={department}
                        onChange={handleDepartment}
                    >
                        {props.departments.map((a) => (
                            <Option key={a.departmentId} value={a.departmentId}>
                                {a.departmentName}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="w-1/5">
                    <div className="text-[15px] font-popins m-[10px]">Technician</div>
                    <Select
                        className="w-[350px]"
                        value={technician}
                        onChange={handleTechnician}
                    >
                        {props.productionUser.map((a) => (
                            <Option key={a.employeeId} value={a.employeeId}>
                                {a.empName}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="w-1/6">
                    <div className="text-[15px] font-popins m-[10px]">AV TAT</div>
                    {props.tatQuality.length === undefined ? null : (
                        <div className="text-base text-green-600">
                            {props.tatQuality.avgTime}
                        </div>
                    )}
                </div>
                <div className="w-1/6">
                    <div className="text-[15px] font-popins m-[10px]">Quality</div>
                    <div className="text-base"></div>
                </div>
            </div>

            <StyledTable
                rowKey="phoneId"
                dataSource={props.repairPhoneByOrder}
                pagination={false}
                columns={columns}
                rowSelection={rowSelection}
                loading={props.fetchingRepairPhoneById}
            />

            <div className="flex justify-end mt-1">
                {department && technician && dueDate && checkedValue.length > 0 && (
                    <Button
                        type="primary"
                        loading={props.updatingTechnicianForRepair}
                        onClick={() =>
                            props.UpdateTechnicianForRepairPhone(
                                {
                                    phoneDetailsList: checkedValue,
                                    orderPhoneId: props.rowData.orderPhoneId,
                                    productionRepairDispatchId: "",
                                    technicianId: technician,
                                    userId: props.userId,
                                    defaultRepairDepartmentId: department,
                                    repairDueDate: dueDate,
                                },
                                props.rowData.orderPhoneId,
                                props.userId,
                                props.locationId,
                                handleCallback()
                            )
                        }
                    >
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth, refurbish, departments }) => ({
    productionUser: refurbish.productionUser,
    repairPhoneByOrder: refurbish.repairPhoneByOrder,
    tatQuality: refurbish.tatQuality,
    noOfPhoneById: refurbish.noOfPhoneById,
    showAssignRepairModal: refurbish.showAssignRepairModal,
    locationId: auth.userDetails.locationId,
    fetchingRepairPhoneById: refurbish.fetchingRepairPhoneById,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    updatingTechnicianForRepair: refurbish.updatingTechnicianForRepair,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            getRepairPhoneById,
            UpdateTechnicianForRepairPhone,
            getDepartments,
            getTATQuality,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AssignRepairForm);
