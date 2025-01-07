import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import { StyledTable } from '../../../Components/UI/Antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDepartments } from "../../Settings/Department/DepartmentAction";
import { getProductionUsersById, UpdateTechnicianByPhone, getNoOfPhoneById, closeRepairModal } from "./RefurbishAction";
import dayjs from "dayjs";

const { Option } = Select;

const AssignPhoneByTechnician = (props) => {
    const depaVal = props.rowData.defaultQcDepartmentId === "null" ? "" : props.rowData.defaultQcDepartmentId;

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
    };

    const handleDepartment = (val) => {
        const depaVal = props.rowData.defaultQcDepartmentId === "null" ? val : props.rowData.defaultQcDepartmentId;
        setDepartment(depaVal);
        props.getProductionUsersById(depaVal, props.locationId);
    };

    const hanldeOnChange = (value) => {
        setDueDate(value);
    };

    const handleCallback = () => {
        if (!props.noOfPhoneById.length) {
            props.closeRepairModal();
        }
    };

    const disabledDate = (current) => {
        const startDate = dayjs(props.rowData.availabilityDate);
        const endDate = dayjs(props.rowData.deliveryDate).subtract(1, 'days');
        return current && (current < startDate || current > endDate);
    };

    useEffect(() => {
        props.getProductionUsersById(props.rowData.defaultQcDepartmentId, props.locationId);
        props.getNoOfPhoneById(props.rowData.orderPhoneId);
        props.getDepartments();
    }, []);

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Brand",
            dataIndex: "company",
            width: "15%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "Model",
            dataIndex: "model",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "Condition",
            dataIndex: "cannotRepairInd",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">{text}</div>
            ),
        },
        {
            title: "Status",
            dataIndex: "cannotRepairInd",
            width: "10%",
            render: (text) => (
                <div className="flex items-center justify-center h-8 bg-[#eef2f9] text-ellipsis overflow-hidden whitespace-nowrap">
                    {text ? <b>Can't Repair</b> : <b>Repair</b>}
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="mt-[10px] flex justify-between">
                <div>
                    <div className="text-[15px] font-semibold m-[10px]">Department</div>
                    <Select
                        className="w-[350px]"
                        value={department}
                        onChange={(value) => handleDepartment(value)}
                    >
                        {props.departments.map((a) => (
                            <Option key={a.departmentId} value={a.departmentId}>
                                {a.departmentName}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <div className="text-[15px] font-semibold m-[10px]">Technician</div>
                    <Select
                        className="w-[350px]"
                        value={technician}
                        onChange={(value) => handleTechnician(value)}
                    >
                        {props.productionUser.map((a) => (
                            <Option key={a.employeeId} value={a.employeeId}>
                                {a.empName}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col">
                    <div className="text-[15px] font-semibold m-[10px]">Due Date</div>
                    <DatePicker
                        className="w-[300px]"
                        value={dueDate}
                        onChange={(value) => hanldeOnChange(value)}
                        disabledDate={disabledDate}
                    />
                </div>
            </div>

            {true && (
                <StyledTable
                    rowKey="phoneId"
                    dataSource={props.noOfPhoneById}
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    loading={props.fetchingNoOfPhonesById}
                />
            )}

            <div className="flex justify-end mt-1">
                {department && technician && dueDate && checkedValue.length > 0 && (
                    <Button
                        loading={props.updatingtechnicianByPhone}
                        type="primary"
                        onClick={() =>
                            props.UpdateTechnicianByPhone(
                                {
                                    phoneDetailsList: checkedValue,
                                    orderPhoneId: props.rowData.orderPhoneId,
                                    productionDispatchId: "",
                                    technicianId: technician,
                                    userId: props.userId,
                                    dueDate: dueDate,
                                    defaultQcDepartmentId: department,
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
    noOfPhoneById: refurbish.noOfPhoneById,
    fetchingNoOfPhonesById: refurbish.fetchingNoOfPhonesById,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    locationId: auth.userDetails.locationId,
    updatingtechnicianByPhone: refurbish.updatingtechnicianByPhone,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            UpdateTechnicianByPhone,
            getNoOfPhoneById,
            getDepartments,
            closeRepairModal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AssignPhoneByTechnician);
