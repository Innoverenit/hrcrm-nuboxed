import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getDistributorOrderPayment, updateOrderPayment } from "../../AccountAction";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

function OrderPaymentTable(props) {

    useEffect(() => {
        props.getDistributorOrderPayment(props.particularRowData.orderId)
    }, [])

  const [editedFields, setEditedFields] = useState({});
  const [editpaymentId, setEditpaymentId] = useState(null);

  const handleChange = (paymentId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [paymentId]: {
        ...prevFields[paymentId],
        [fieldName]: value,
      },
    }));
 
  };
  
  const handleEditClick = (paymentId) => 
  {
    setEditpaymentId(paymentId);
  };
  const handleCancelClick = (paymentId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [paymentId]: undefined }));
    setEditpaymentId(null);
  };

  const handleUpdatePayment = (paymentId,transactionNumber,remarks,orderPaymentType,paymentMode,paymentAmount,docId,
    orderCurrencyId,date,indentId
    ) => {
        let newEndDate =dayjs(date).format('YYYY-MM-DD');
    const data = {
      paymentId:paymentId,
      transactionNumber:editedFields[paymentId]?.transactionNumber !== undefined ? editedFields[paymentId].transactionNumber : transactionNumber,
      remarks:editedFields[paymentId]?.remarks !== undefined ? editedFields[paymentId].remarks : remarks,
      orderPaymentType:editedFields[paymentId]?.orderPaymentType !== undefined ? editedFields[paymentId].orderPaymentType : orderPaymentType,
      paymentMode: editedFields[paymentId]?.paymentMode !== undefined ? editedFields[paymentId].paymentMode : paymentMode,                 
      paymentAmount: editedFields[paymentId]?.paymentAmount !== undefined ? editedFields[paymentId].paymentAmount : paymentAmount,       
      docId:editedFields[paymentId]?.docId !== undefined ? editedFields[paymentId].docId : docId,
      date: `${newEndDate}T00:00:00Z`,
      orderCurrencyId:editedFields[paymentId]?.orderCurrencyId !== undefined ? editedFields[paymentId].orderCurrencyId : orderCurrencyId,
      userId: props.userId,
      orderId: props.particularRowData.orderId
    };
  
    props.updateOrderPayment(data,paymentId)
      setEditedFields((prevFields) => ({ ...prevFields, [paymentId]: undefined }));
      setEditpaymentId(null);
    
  };

return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">

         <div className=" md:w-[4.1rem]">Transaction #</div>
        <div className=" md:w-[4.5rem] ">Created By</div>
        <div className="md:w-[5.8rem]">Entry</div>
        <div className=" md:w-[4.2rem] ">Amount</div>
        <div className=" md:w-[4.2rem] ">Mode</div>
        <div className=" md:w-[4.2rem] ">Reason</div>
        <div className=" md:w-[5.2rem] ">Approved By</div>
        <div className="w-12"></div>
            </div>
      
             {props.paymentHistory.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "    >
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.transactionNumber}
                            </div>
    </div>
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.salesExecutive}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs text-cardBody font-semibold  font-poppins">
        {dayjs(item.date).format("DD-MM-YY")}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
    {editpaymentId === item.paymentId ? (
                       <input
                       class="w-8 border-2 border-black "
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.paymentId]?.paymentAmount !== undefined ? editedFields[item.paymentId].paymentAmount : item.quantity}
                       onChange={(e) => handleChange(item.paymentId, 'paymentAmount', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span>  {item.paymentAmount} {item.orderCurrencyName}</span>
                      </div>
                    )}  
   
                    </div>
    </div>

    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.paymentModeName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.remarks}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
    {item.approveByFinanceInd===true ?(
                        <div class="flex">
                            <span class="text-green-700">
                            {item.approveByName} on 
                            </span>
                            &nbsp;
                            <span class="text-green-700"> {dayjs(item.approveDate).format('YYYY-MM-DD')}</span>
                           
                            </div>
                    ):"No Data"}
                    </div>
    </div>

  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
    <div>
    {editpaymentId === item.paymentId ? (
                        <>
                      <Button onClick={() => handleUpdatePayment(item.paymentId,item.supplySupplyLinkId,item.suppliesName,item.description,item.categoryName,item.subCategoryName)}>
                        Save
                      </Button>
                        <Button 
                        className="ml-2"
                        onClick={() => handleCancelClick(item.paymentId)}>
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                        <>
                        {item.approveByFinanceInd===false && (
                      <BorderColorIcon
                      className="text-[blue] flex justify-items-center justify-center text-xs cursor-pointer"
                        onClick={() => handleEditClick(item.paymentId)}
                        // style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                        )}
                        </>
                    )}
    </div>
    <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeMaterialBuilder({active:false},item.supplySupplyLinkId)}
                          >
                     <Tooltip title="Delete">
                          <DeleteIcon
                          className="text-base cursor-pointer text-[red]"
                           
                            // style={{
                            //   cursor: "pointer",
                            //   color: "red",
                            //   fontSize: "1rem",
                            // }}
                          />
                       </Tooltip>
                       </StyledPopconfirm>
                       </div>
                        </div>
</div>
</div>
          );
        })}
             
              </div>
              </div>
 
    </>
);
}

const mapStateToProps = ({ distributor,auth }) => ({
    paymentHistory: distributor.paymentHistory,
    fetchingPaymentHistory: distributor.fetchingPaymentHistory,
    userId:auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorOrderPayment,
            updateOrderPayment
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);


// import { Popconfirm, DatePicker, Typography, Input, Form, message } from "antd";
// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../Components/UI/Antd";
// import { getDistributorOrderPayment, updateOrderPayment } from "../../AccountAction";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// ;

// function OrderPaymentTable(props) {

//     useEffect(() => {
//         props.getDistributorOrderPayment(props.particularRowData.orderId)
//     }, [])
//     const [form] = Form.useForm();
//     const [data, setData] = useState([]);
//     const [editingKey, setEditingKey] = useState('');
//     const [deliveryDate, setdeliveryDate] = useState(undefined)
//     useEffect(() => {
//         setData(props.paymentHistory)
//     }, [props.paymentHistory])

//     const isEditing = (record) => record.paymentId === editingKey;

//     function handleDatePickerCahnge(date, dateString) {
//         setdeliveryDate(dayjs(dateString).format('YYYY-MM-DD'))
//     }
//     const EditableCell = ({
//         editing,
//         dataIndex,
//         title,
//         inputType,
//         record,
//         index,
//         children,
//         ...restProps
//     }) => {
//         const dateFormat = "MM/DD/YYYY";
//         const inputNode = <Input />;
//         return (
//             <td {...restProps}>
//                 {editing && inputType !== "picker" ? (
//                     <Form.Item
//                         name={dataIndex}
//                         // style={{
//                         //     margin: 0,
//                         // }}
//                         rules={[
//                             {
//                                 required: true,
//                                 message: `Input required ${title}!`,
//                             },
//                         ]}
//                     >
//                         {inputNode}
//                     </Form.Item>
//                 ) : editing && inputType === "picker" ? (
//                     <DatePicker format={dateFormat}
//                         onChange={(date, dateString) => handleDatePickerCahnge(date, dateString)} />
//                 ) : (
//                     children
//                 )}
//             </td>
//         );
//     };
//     const edit = (record) => {
//         form.setFieldsValue({
//             paymentAmount: "",
//             ...record,
//         });
//         setEditingKey(record.paymentId);
//     };
//     const cancel = () => {
//         setEditingKey('');
//     };
//     const save = async (key) => {
//         // alert("try");
//         try {
//             const row = await form.validateFields();
//             const newData = [...data];
//             const index = newData.findIndex((item) => key === item.paymentId);
//             if (index > -1) {
//                 // alert("if");
//                 const item = newData[index];
//                 console.log(item)
//                 newData.splice(index, 1, { ...item, deliveryDate, ...row });
//                 const a = newData[index];
//                 let newEndDate =dayjs(a.date).format('YYYY-MM-DD');

//                 props.updateOrderPayment(
//                     {
//                         paymentAmount: a.paymentAmount,
//                         transactionNumber: a.transactionNumber,
//                         paymentId: a.paymentId,
//                         date: `${newEndDate}T00:00:00Z`,
//                         remarks: a.remarks,
//                         docId: a.docId,
//                         orderCurrencyId: a.orderCurrencyId,
//                         orderPaymentType: a.orderPaymentType,
//                         paymentMode: a.paymentMode,
//                         userId: a.userId,
//                         orderId: props.particularRowData.orderId
//                     },
//                     key,
//                     a.indentId,

//                 );

//                 setEditingKey('');
//             } else {
//                 alert("else");
//                 // newData.push(row);
//                 setData(newData);
//                 setEditingKey('');
//             }
//         } catch (errInfo) {
//             console.log('Validate Failed:', errInfo);
//         }
//     };

//     const columns = [
//         {
//             title: "",
//             width: "1%"
//         },
//         {
//             title: "Transaction #",
//             width: "13%",
//             dataIndex: "transactionNumber",
//         },
//         {
//             title: "Created By",
//             width: "10%",
//             dataIndex: "salesExecutive",
//         },
//         {
//             title: "Entry",
//             width: "11%",
//             dataIndex: "date",
//             render: (name, item, i) => {
//                 return (
//                     <>{dayjs(item.date).format("DD-MM-YY")}</>
//                 );
//             }
//         },
//         {
//             title: "Amount",
//             width: "8%",
//             dataIndex: "paymentAmount",
//             render: (name, item, i) => {
//                 return (
//                     <>{item.paymentAmount} {item.orderCurrencyName}</>
//                 );
//             },
//             editable: true
//         },

//         {
//             title: "Mode",
//             dataIndex: "paymentModeName",
//             width: "7%",
//         },
//         {
//             title: "Reason",
//             dataIndex: "remarks",
//             width: "12%",
//         },
//         {
//             title:"Approved By",
//             dataIndex:"approveByName",
//             width:"18%",
//             render: (text, item) => {
//                 const approvedname = item.approveByName;
//                 const approvedDate =dayjs(item.approveDate).format('YYYY-MM-DD');
//                 return (
//                   <>
//                      {item.approveByFinanceInd===true ?(
//                         <div class="flex">
//                             <span class="text-green-700">
//                             {approvedname} on 
//                             </span>
//                             &nbsp;
//                             <span class="text-green-700"> {approvedDate}</span>
                           
//                             </div>
//                     ):"No Data"}
//                   </>
//                 );
//               },

//         },
//         {
//             title: '',
//             dataIndex: 'operation',
//             width: "6%",
//             render: (_, record) => {
            
//                 const editable = isEditing(record);
               
//                 return editable ? (
                    
//                     <span>
                        
//                         <Typography.Link
//                             onClick={() =>
//                                 save(record.paymentId)
//                                 // alert("Save success")
//                             }
//                             style={{
//                                 marginRight: 8,
//                             }}
//                         >
//                             Save
//                         </Typography.Link>
//                         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                             <a>Cancel</a>
//                         </Popconfirm>
//                     </span>
//                 ) :
               
//                     <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                      {record.approveByFinanceInd===false && (
//                         <BorderColorIcon
// className=" !text-base cursor-pointer text-[tomato]"
//                      )}
//                     </Typography.Link>
                

//             },
//         },

//     ];

//     const mergedColumns = columns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 inputType: col.dataIndex === 'paymentAmount' ? 'number' : 'picker',
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 editing: isEditing(record),
//             }),
//         };
//     });
//     return (
//         <>
//             {true && (
//                 <Form form={form} component={false}>
//                     <StyledTable
//                         key="id"
//                         dataSource={data}
//                         pagination={false}
//                         scroll={{ y: 200 }}
//                         components={{
//                             body: {
//                                 cell: EditableCell,
//                             },
//                         }}
//                         columns={mergedColumns}
//                         loading={props.fetchingPaymentHistory}
//                         rowClassName="editable-row"
//                         sticky={true}
//                     />
//                 </Form>
//             )}
//         </>
//     );
// }


// const mapStateToProps = ({ distributor, }) => ({
//     paymentHistory: distributor.paymentHistory,
//     fetchingPaymentHistory: distributor.fetchingPaymentHistory
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getDistributorOrderPayment,
//             updateOrderPayment
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);



