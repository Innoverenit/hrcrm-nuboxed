// import React, { useEffect,useState, } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import dayjs from "dayjs";
// import { Select } from "../../../../../Components/UI/Elements";
// import { InputNumber, Popconfirm, Form, Input, Typography, Button, Space, DatePicker,Tooltip } from 'antd';
// import { FormattedMessage } from "react-intl";
// // import AddCandidateSequenceModal from "./AddCandidateSequenceModal"
// import { StyledPopconfirm, StyledTable } from "../../../../../Components/UI/Antd";
//  import {getSequence,handleCAndidateSequenceModal,getSequenceDetail,updateSequenceTableData,deleteSequenceData} from "../../../../Settings/SettingsAction";
// import styled from "styled-components";
//  const { Option } = Select;

//  const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = <Input />;
//   return (
//       <td {...restProps}>
//           {editing ? (
//               <Form.Item
//                   name={dataIndex}
//                   style={{
//                       margin: 0,
//                   }}
//                   rules={[
//                       {
//                           required: true,
//                           message: `Please Input ${title}!`,
//                       },
//                   ]}
//               >
//                   {inputNode}
//               </Form.Item>
//           ) : (
//               children
//           )}
//       </td>
//   );
// };

// function SequenceTable(props) {
//     useEffect(()=>{
//         props.getSequence(props.organizationId)        
//         console.log(props.sequenceId);
//     },[])
//     useEffect(()=>{
//    setData(props.sequence)
//   },[props.sequence])

//     // function handlesetCurrentSequenceId(sequenceId) {
//     //   setCurrentSequenceId(sequenceId);
//     //   console.log(sequenceId);
//     // }

//     function handlesetCurrentSequenceData(item){
//       setCurrentSequenceData(item)
//     }
//     const {
//       deleteSequenceData,
     
//     } = props;
//     const [form] = Form.useForm();
//     const [currentSequenceData,setCurrentSequenceData]= useState([]);
//     const [data, setData] = useState([]);
//     // const [sequenceId]= props.sequence.sequenceId;
//     // const [currentSequenceId, setCurrentSequenceId] = useState("");
//     const [editingKey, setEditingKey] = useState('');
//   const isEditing = (record) => record.sequenceId === editingKey;

//   // console.log("record",record)
  
//     console.log(props.sequenceId);

//                   const edit = (record) => {
//                     form.setFieldsValue({
//                       sequenceId:"",
//                       name:"",
//                       priority:"",
//                       type:"",
//                       noOfDays:"",
//                       ...record,
//                     });
//                     setEditingKey(record.sequenceId);
//                   };
                
//                   const cancel = () => {
//                     setEditingKey('');
//                   };
//                   const save = async (key) => {
//                     // alert("Hello")
//                     try {
//                       // alert("Try")
//                       const row = await form.validateFields();
//                       const newData = [...data];
//                       const index = newData.findIndex((item) => key === item.sequenceId);
//                   // console.log("Item",props.item.sequenceId)
//                   //     console.log("new",newData)
//                       if (index > -1) {
//                         // alert("if");
//                         const item = newData[index];
//                         //console.log(item)
//                         newData.splice(index, 1, { ...item, ...row });
//                         const a = newData[index];          
//                         props.updateSequenceTableData(
//                           {
//                             name: a.name,
//                             priority: a.priority,
//                             type: a.type,
//                             noOfDays:a.noOfDays,
//                           },
//                           key,
//                           a.sequenceId
//                         );
//                         setEditingKey('');
                
//                       } else {
//                         alert("else");
//                         // newData.push(row);
//                         setData(newData);
//                         setEditingKey('');
                
//                       }
//                     } catch (errInfo) {
                     
//                     }
//                   };
//     const columns = [
//       {
//         title: "",
//        width: "2%",
     
//       },
//       {
//         // title: "Priority",
//         dataIndex: "priority",
//         width:"4%",
//         render: (name, item, i) => {
//           //debugger;
//           return (
//             <div>
//               {item.priority === "High" && (
//                 <div
//                   style={{
//                     borderRadius: "50%",
//                     height: "2.1875em",
//                     width: "2.1875em",
//                     backgroundColor: "red",
//                   }}
//                 >
//                 </div>
//               )} 
//               {item.priority === "Medium" && (
//                 <div
//                   style={{
//                     borderRadius: "50%",
//                     height: "2.1875em",
//                     width: "2.1875em",
//                     backgroundColor: "orange",
//                   }}
//                 ></div>
//               )}
//               {item.priority === "Low" && (
//                 <div
//                   style={{
//                     borderRadius: "50%",
//                     height: "2.1875em",
//                     width: "2.1875em",
//                     backgroundColor: "teal",
//                   }}
//                 >
//             </div>  
//               )}
//             </div>
//           );
//         },
//         sorter: (a, b) =>
//           a.priority &&
//             a.priority.toLowerCase() > b.pritority &&
//             b.priority.toLowerCase()
//             ? 1
//             : -1,
//       },
//     {
//       title: "Name",
//       dataIndex: "name",
//      width: "30%",
//      editable: true,
//     },
//     // {
//     //   title: "Priority",
//     //   width: "30%",
//     //   dataIndex: "priority",  
//     //   editable: true,
//     // },
  
//     {
//       title: "Type",
//       dataIndex: "type",
//       width: "30%",
//       editable: true,
//     },
//     {
//         title: "Days",
//         dataIndex: "noOfDays",
//              width: "30%",
//              editable: true,
//       },
//       {
//       width: "8%",
//         render: (name, item, i) => { 
//           // const data1= item.currency
//           return (
//             <>
//               {/* {item.billing} {item.currency} */}
//               <Tooltip title="">
//               <span
//                onClick={() => {
//                props.handleCAndidateSequenceModal(true);
//               //  handlesetCurrentSequenceId(item.sequenceId);
//                props.getSequenceDetail(item.sequenceId)
//      handlesetCurrentSequenceData(item)
              
//              }}
//               >
//               <FontAwesomeIcon style={{fontSize:"1.3em"}} icon={solid("diamond-turn-right")} />
//             </span>
//             </Tooltip>
//             </>
//           );
//         },
//       },
//       {
//         title: '',
//         dataIndex: 'operation',
//         width: "12%", 
//         render: (_, record) => {
//           const editable = isEditing(record);
//           return editable ? (
//             <span>
//               <Typography.Link
//                 onClick={() =>
//                   save(record.sequenceId)
//                 }
//                 style={{
//                   marginRight: 8,
//                 }}
//               >
//                 Save
//                 </Typography.Link>
//               <Popconfirm title="Sure to cancel?"
//                 onConfirm={cancel}>
//                 <a>Cancel</a>
//               </Popconfirm>
//             </span>
//           ) :
//             <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//              <EditIcon></EditIcon>
//             </Typography.Link>
//         },
//       },
//       {
//         title: "",
//         // dataIndex: "id",
//         width: "2%",
//         render: (name, item, i) => {
//           return (
//             <StyledPopconfirm
//               title="Do you want to delete?"
//               onConfirm={() => deleteSequenceData(item.sequenceId)}
//             >
//                {/* {user.opportunityDeleteInd ===true && ( */}
//              
//             </StyledPopconfirm>
//           );
//         },
//       },
//       {
//         title:"",
//         width:"2",
//       }
      
//   ]
// const mergedColumns = columns.map((col) => {
//   if (!col.editable) {
//     return col;
//   }

//   return {
//     ...col,
//     onCell: (record) => ({
//       record,
//       inputType: col.dataIndex === 'noOfDays' ? 'number' : 'text',
//       dataIndex: col.dataIndex,
//       title: col.title,
//       editing: isEditing(record),
//     }),
//   };
// });
//   return (
//     <>
//       <Form form={form} component={false}>
//       <StyledTable
//       rowKey="candidateId"
//         dataSource={data}
//         // loading={
//         //   props.fetchingScheduler ||
//         //   props.fetchingSchedulerError
//         // }
//         columns={mergedColumns}
//         pagination={false}
//         scroll={{ y: 240 }}
//         components={{
//           body: {
//             cell: EditableCell,
//           },
//         }}
//         onChange={console.log("task onChangeHere...")}
        
//         rowClassName="editable-row"
//         />
//         </Form>
  
//   <div>Updated on {dayjs(props.communicationAccess.lastUpdatedOn).format("ll")} by {props.communicationAccess.name}</div>
//       {/* <AddCandidateSequenceModal
//       sequenceDetail={props.sequenceDetail}
//       item={currentSequenceData}
//       // sequenceId={currentSequenceId}
//       // handlesetCurrentSequenceId={handlesetCurrentSequenceId}
//       handleCAndidateSequenceModal={props.handleCAndidateSequenceModal}
//       candidateSequenceModal={props.candidateSequenceModal}
//       /> */}
//     </>
//   );
// }	

// const mapStateToProps = ({  auth,settings,sequence }) => ({
//     organizationId: auth.userDetails.organizationId,
//     sequence: settings.sequence, 
//     sequenceDetail:settings.sequenceDetail,
//     //sequenceId:settings.sequence,
//     communicationAccess:settings.communicationAccess,
//      candidateSequenceModal:settings.candidateSequenceModal,
//     fetchingSequence: settings.fetchingSequence,
//     fetchingSequenceError: settings.fetchingSequenceError,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {   
//         getSequence ,
//         getSequenceDetail,
//         handleCAndidateSequenceModal,
//         updateSequenceTableData,
//         deleteSequenceData
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SequenceTable);

// const AppIcon1 = (props) => (
  
//   <FontAwesomeIcon
//   icon={solid("pen-to-square")}
//   className={`pen-to-square ${props.className}`}
//   >
//   </FontAwesomeIcon>
// );

// const EditIcon = styled(AppIcon1)`
//   color: black;
//   &:hover {
//     // background: yellow;
//     color: blue;
//   }
// `;
