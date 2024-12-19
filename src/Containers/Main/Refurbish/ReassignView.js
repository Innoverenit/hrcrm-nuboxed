

import { Button, DatePicker, Select, } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductionUsersById, getRemainingPhones, reassignPhonesToTechnician } from "./RefurbishAction"
import QRCodeModal from '../../../Components/UI/Elements/QRCodeModal'
import dayjs from "dayjs";

const { Option } = Select;
const ReassignView = (props) => {

    let depaVal = props.rowData.defaultRepairDepartmentId === "null" ? "" : props.rowData.defaultRepairDepartmentId

    const [user, setUser] = useState("")
    const [technician, setTechnician] = useState("")
    const [department, setDepartment] = useState(depaVal)
    const [selectedRow, setselectedRow] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedRow(selectedRows);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const checkedValue = selectedRow.map(function (item) {
        return item['phoneId'];
    });
    const handleTechnician = (val) => {
        setTechnician(val)
    }
    const handleDepartment = (val) => {
        let depaVal = props.rowData.defaultRepairDepartmentId === "null" ? val : props.rowData.defaultRepairDepartmentId
        setDepartment(depaVal)
        props.getProductionUsersById(depaVal, props.locationId);
    }
    console.log(user)


    useEffect(() => {
        props.getProductionUsersById(props.rowData.defaultRepairDepartmentId, props.locationId);
        props.getRemainingPhones(props.orderPhoneId, props.row.technicianId)
        props.getDepartments()
    }, [])

    const [dueDate, setDueDate] = useState("")

    const hanldeOnChange = (value) => {
        setDueDate(value)
    }

    const disabledDate = current => {
        // Replace 'start' and 'end' with your desired start and end dates
        const startDate = dayjs(props.rowData.availabilityDate);
        const endDate = dayjs(props.rowData.deliveryDate).subtract(1, 'days')
        return current && (current < startDate || current > endDate);
    };
    const column = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "OEM",
            dataIndex: "company",
            width: "15%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "10%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "12%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "12%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "12%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "12%",
        },
        {
            title: "Condition",
            dataIndex: "conditions",
            width: "12%",
        },
        {
            title: "QR",
            width: "8%",
            render: (name, item, i) => {
                return (
                    <div>
                        {item.qrCodeId ? (
                            <QRCodeModal
                                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                imgHeight={"2.8em"}
                                imgWidth={"2.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span color="text-[0.6em] font-bold">
                                No QR
                            </span>
                        )}
                    </div>
                );
            },
        },


    ];


    return (
        <div>

            <div class="mt-[10px] flex justify-between">
                <div>
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
                <div>
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
                <div>
                    <div class="text-[15px] font-semibold m-[10px]">Due Date</div>
                    <DatePicker
                        className="w-[250px]"
                        value={dueDate}
                        onChange={(value) => hanldeOnChange(value)}
                        disabledDate={disabledDate}
                    />
                </div>
            </div>
            <StyledTable
                rowKey="phoneId"
                dataSource={props.remainingPhones}
                pagination={false}
                columns={column}
                rowSelection={rowSelection}
                loading={props.fetchingRemainingPhones}
            />
            <div class="flex justify-end mt-1">
                {department && technician && dueDate && checkedValue && <Button
                    type='primary'
                    loading={props.updatingTechnicianForRepair}
                    onClick={() => props.reassignPhonesToTechnician({
                        phoneDetailsList: checkedValue,
                        orderPhoneId: props.orderPhoneId,
                        productionRepairDispatchId: "",
                        technicianId: technician,
                        userId: props.userId,
                        previouslyAssignByUserId: props.row.technicianId,
                        defaultRepairDepartmentId: department,
                        repairDueDate: dueDate,
                        reAssignDate: dayjs(),
                        reAssignByUserId: props.row.userId,
                    }, props.orderPhoneId,
                        props.row.technicianId
                    )}>
                    Submit
                </Button>}
            </div>
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish, departments }) => ({
    productionUser: refurbish.productionUser,
    remainingPhones: refurbish.remainingPhones,
    noOfPhoneById: refurbish.noOfPhoneById,
    showAssignRepairModal: refurbish.showAssignRepairModal,
    locationId: auth.userDetails.locationId,
    fetchingRemainingPhones: refurbish.fetchingRemainingPhones,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    updatingTechnicianForRepair: refurbish.updatingTechnicianForRepair
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            getRemainingPhones,
            reassignPhonesToTechnician,
            getDepartments
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReassignView);



