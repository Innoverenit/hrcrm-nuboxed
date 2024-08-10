import { Button, DatePicker, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    getProductionUsersById,
    getCatalogueListInRefurbish,
    updateCatalogueInRefurbish,
} from "./RefurbishAction"
import { getCatalogueListById } from "../Account/AccountAction"

const { Option } = Select;

const AssignCatalogueRepairForm = (props) => {
    
    const [technician, setTechnician] = useState("")
    const [department, setDepartment] = useState("")
    const [selectedRow, setselectedRow] = useState([]);
    const [catalogue, setCatalogue] = useState("")

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
        return item['productManufacturingId'];
    });
    const handleTechnician = (val) => {
        setTechnician(val)
    }
    const handleCatalogue = (val) => {
        setCatalogue(val)
        props.getCatalogueListInRefurbish(props.rowData.orderPhoneId, val)
    }
    const handleDepartment = (val) => {
        setDepartment(val)
        props.getProductionUsersById(val, props.locationId);
    }

    useEffect(() => {
        props.getProductionUsersById(props.rowData.departmentId, props.locationId);
        props.getDepartments()
        props.getCatalogueListById(props.rowData.orderPhoneId)
    }, [])

    const [dueDate, setDueDate] = useState("")

    const hanldeOnChange = (value) => {
        setDueDate(value)
    }
    const column = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        }, {
            title: "ID #",
            dataIndex: "productManufacturingId",
            width: "10%",
        },

        {
            title: "Name",
            dataIndex: "name",
            width: "15%",

        },
        {
            title: "Category",
            dataIndex: "categoryName",
            width: "10%",
        },
        {
            title: "Sub Category",
            dataIndex: "subCategoryName",
            width: "10%",
        },
        {
            title: "Attribute",
            dataIndex: "attributeName",
            width: "10%",

        },
        {
            title: "Sub Attribute",
            dataIndex: "subAttributeName",
            width: "10%",
        },
    ];
    return (
        <div>

<div class="mt-[10px] flex justify-between">
                <div>
                <div class="text-[15px] font-semibold m-[10px]">Department</div>
                    <Select
                        style={{
                            width: 170,
                        }}
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
                        style={{
                            width: 170,
                        }}
                        value={technician}
                        onChange={(value) => handleTechnician(value)}
                    >
                        {props.productionUser.map((a) => {
                            return <Option value={a.employeeId}>{a.empName}</Option>;
                        })}
                    </Select>
                </div>
                <div>
                <div class="text-[15px] font-semibold m-[10px]">Catalogue</div>
                    <Select
                        style={{
                            width: 200,
                        }}
                        disabled={!technician}
                        value={catalogue}
                        onChange={(value) => handleCatalogue(value)}
                    >
                        {props.catalogueById.map((a) => {
                            return <Option value={a.productId}>{a.name}</Option>;
                        })}
                    </Select>
                </div>
                <div>
                <div class="text-[15px] font-semibold m-[10px]">Due Date</div>
                    <DatePicker
                        style={{
                            width: 150,
                        }}
                        value={dueDate}
                        onChange={(value) => hanldeOnChange(value)}
                    />
                </div>
            </div>
            <StyledTable
                rowKey="productManufacturingId"
                dataSource={props.catalogueInRefurbish}
                pagination={false}
                columns={column}
                rowSelection={rowSelection}
                loading={props.fetchingNoOfPhonesById}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                <Button
                    type='primary'
                    disabled={!rowSelection}
                    onClick={() => props.updateCatalogueInRefurbish({
                        productDetailsList: checkedValue,
                        orderPhoneId: props.rowData.orderPhoneId,
                        technicianId: technician,
                        userId: props.userId,
                        repairDueDate: dueDate
                    },
                        props.rowData.orderPhoneId,
                        catalogue,
                    )}>
                    Submit
                </Button>
            </div>
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish, departments, distributor }) => ({
    productionUser: refurbish.productionUser,
    locationId: auth.userDetails.locationId,
    fetchingNoOfPhonesById: refurbish.fetchingNoOfPhonesById,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    catalogueInRefurbish: refurbish.catalogueInRefurbish,
    catalogueById: distributor.catalogueById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

            getProductionUsersById,
            getCatalogueListInRefurbish,
            updateCatalogueInRefurbish,
            getDepartments,
            getCatalogueListById,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignCatalogueRepairForm);

