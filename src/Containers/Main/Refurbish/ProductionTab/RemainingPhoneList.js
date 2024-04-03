// import { Button, DatePicker, Select, } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { StyledTable } from '../../../Components/UI/Antd'
// import { getDepartments } from "../../Settings/Department/DepartmentAction"
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getProductionUsersById, getRepairPhoneById, closeRepairModal, UpdateTechnicianForRepairPhone } from "./RefurbishAction"
// import QRCodeModal from '../../../Components/UI/Elements/QRCodeModal'
// import { SubTitle } from '../../../Components/UI/Elements';
// import dayjs from "dayjs";

// const { Option } = Select;
// const RemainingPhoneList = (props) => {

//     let depaVal = props.rowData.defaultDepartmentId === "null" ? "" : props.rowData.defaultDepartmentId

//     const [user, setUser] = useState("")
//     const [technician, setTechnician] = useState("")
//     const [department, setDepartment] = useState(depaVal)
//     const [selectedRow, setselectedRow] = useState([]);

//     const rowSelection = {
//         onChange: (selectedRowKeys, selectedRows) => {
//             setselectedRow(selectedRows);
//             console.log(
//                 `selectedRowKeys: ${selectedRowKeys}`,
//                 "selectedRows: ",
//                 selectedRows
//             );
//         },
//     };
//     const checkedValue = selectedRow.map(function (item) {
//         return item['phoneId'];
//     });
//     const handleTechnician = (val) => {
//         setTechnician(val)
//     }
//     const handleDepartment = (val) => {
//         setDepartment(val)
//         props.getProductionUsersById(val, props.locationId);
//     }
//     console.log(user)


//     useEffect(() => {
//         props.getProductionUsersById(props.rowData.departmentId, props.locationId);
//         props.getRepairPhoneById(props.rowData.orderPhoneId)
//         props.getDepartments()
//     }, [])

//     const [dueDate, setDueDate] = useState("")

//     const hanldeOnChange = (value) => {
//         setDueDate(value)
//     }

//     const handleCallback = () => {
//         if (!props.repairPhoneByOrder.length) {
//             props.closeRepairModal()
//         }
//     }

//     const disabledDate = current => {
//         // Replace 'start' and 'end' with your desired start and end dates
//         const startDate = dayjs(props.rowData.availabilityDate);
//         const endDate = dayjs(props.rowData.deliveryDate).subtract(1, 'days')
//         return current && (current < startDate || current > endDate);
//     };
//     const column = [
//         {
//             title: "",
//             dataIndex: "",
//             width: "1%",
//         },
//         {
//             title: "OEM",
//             dataIndex: "company",
//             width: "15%",

//         },
//         {
//             title: "Model",
//             dataIndex: "model",
//             width: "10%",
//         },
//         {
//             title: "IMEI",
//             dataIndex: "imei",
//             width: "12%",
//         },
//         {
//             title: "OS",
//             dataIndex: "os",
//             width: "12%",

//         },
//         {
//             title: "GB",
//             dataIndex: "gb",
//             width: "12%",
//         },
//         {
//             title: "Color",
//             dataIndex: "color",
//             width: "12%",
//         },
//         {
//             title: "Condition",
//             dataIndex: "conditions",
//             width: "12%",
//         },
//         {
//             title: "QR",
//             width: "8%",
//             render: (name, item, i) => {
//                 return (
//                     <SubTitle>
//                         {item.qrCodeId ? (
//                             <QRCodeModal
//                                 qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
//                                 imgHeight={"2.8em"}
//                                 imgWidth={"2.8em"}
//                                 imgRadius={20}
//                             />
//                         ) : (
//                             <span color="text-[0.6em] font-bold">
//                                 No QR
//                             </span>
//                         )}
//                     </SubTitle>
//                 );
//             },
//         },


//     ];


//     return (
//         <div>

//             <div class="mt-[10px] flex justify-between">
//                 <div>
//                     <label class="text-[15px] font-semibold m-[10px]">Department</label>
//                     <Select
//                         className="w-[350px]"
//                         value={department}
//                         onChange={(value) => handleDepartment(value)}
//                     >
//                         {props.departments.map((a) => {
//                             return <Option value={a.departmentId}>{a.departmentName}</Option>;
//                         })}
//                     </Select>
//                 </div>
//                 <div>
//                     <label class="text-[15px] font-semibold m-[10px]">Technician</label>
//                     <Select
//                         className="w-[350px]"
//                         value={technician}
//                         onChange={(value) => handleTechnician(value)}
//                     >
//                         {props.productionUser.map((a) => {
//                             return <Option value={a.employeeId}>{a.empName}</Option>;
//                         })}
//                     </Select>
//                 </div>
//                 <div>
//                     <label class="text-[15px] font-semibold m-[10px]">Due Date</label>
//                     <DatePicker
//                         className="w-[250px]"
//                         value={dueDate}
//                         onChange={(value) => hanldeOnChange(value)}
//                         disabledDate={disabledDate}
//                     />
//                 </div>
//             </div>
//             <StyledTable
//                 rowKey="phoneId"
//                 dataSource={props.repairPhoneByOrder}
//                 pagination={false}
//                 columns={column}
//                 rowSelection={rowSelection}
//                 loading={props.fetchingRepairPhoneById}
//             />
//             <div class="flex justify-end mt-1">
//                 {department && technician && dueDate && checkedValue && <Button
//                     type='primary'
//                     loading={props.updatingTechnicianForRepair}
//                     onClick={() => props.UpdateTechnicianForRepairPhone({
//                         phoneDetailsList: checkedValue,
//                         orderPhoneId: props.rowData.orderPhoneId,
//                         productionRepairDispatchId: "",
//                         technicianId: technician,
//                         userId: props.userId,
//                         defaultRepairDepartmentId: department,
//                         repairDueDate: dueDate
//                     },
//                         props.rowData.orderPhoneId,
//                         props.locationId,
//                         handleCallback()
//                     )}>
//                     Submit
//                 </Button>}
//             </div>
//         </div>
//     )
// }


// const mapStateToProps = ({ auth, refurbish, departments }) => ({
//     productionUser: refurbish.productionUser,
//     repairPhoneByOrder: refurbish.repairPhoneByOrder,
//     noOfPhoneById: refurbish.noOfPhoneById,
//     showAssignRepairModal: refurbish.showAssignRepairModal,
//     locationId: auth.userDetails.locationId,
//     fetchingRepairPhoneById: refurbish.fetchingRepairPhoneById,
//     userId: auth.userDetails.userId,
//     departments: departments.departments,
//     updatingTechnicianForRepair: refurbish.updatingTechnicianForRepair
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getProductionUsersById,
//             getRepairPhoneById,
//             UpdateTechnicianForRepairPhone,
//             getDepartments
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(RemainingPhoneList);

import React from 'react'

const RemainingPhoneList = () => {
    return (
        <div>
            remaining
        </div>
    )
}

export default RemainingPhoneList
