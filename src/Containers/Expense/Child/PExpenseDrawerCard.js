import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip ,Button,DatePicker } from "antd";
import { getExpenseByVoucherId, handleDocumentUploadModal,updateExpense, setEditExpense, handleUpdateExpenseModal, deleteExpenseDrawer, } from "../ExpenseAction";
import { getExpenses } from "../../Settings/Expense/ExpenseAction";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import UploadIcon from '@mui/icons-material/Upload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EditUpload from "../../../Components/Forms/Edit/EditUpload";
import { BundleLoader } from "../../../Components/Placeholder";


const UpdateExpenseModal = lazy(() => import("./UpdateExpense/UpdateExpenseModal"));

function ExpenseDrawerCard(props) {
  console.log("iddss",props.newvoucherId,props.newparticularRowData)
  useEffect(() => {
    const { newvoucherId } = props;
    props.getExpenseByVoucherId("VI5914102454022023");
    props.getExpenses();
  }, [props.voucherId]);

  useEffect(() => {
   
    setInputValues(props.expVoucherId);
  }, [props.expVoucherId]);

  const [data, setData] = useState(props.expVoucherId);
  const [editStates, setEditStates] = useState(props.expVoucherId.map(() => false));
 
  const [inputValues, setInputValues] = useState([]);
 

  const toggleEdit = (index) => {
    const newEditStates = [...editStates];
    newEditStates[index] = !newEditStates[index];
    setEditStates(newEditStates);
  };
  const handleInputChange = (index, field, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index][field] = value;
    setInputValues(newInputValues);
  };

  const [newimageId, setnewimageId] = useState("");
  function handleSetImage(imageId) {
    setnewimageId(imageId);
  }
  const handleSave = (index) => {
    const newData = [...data];
    newData[index] = { ...inputValues[index] };
      console.log('Previous Data:', data[index]);
  console.log('New Data:', newData[index]);
  console.log('New Data1:', newData);
    setData(newData);

    const newEditStates = [...editStates];
    newEditStates[index] = false;
    setEditStates(newEditStates);
    // console.log(newData[index].clientName)
    let result={
      clientName:newData[index].clientName,
     
      expenseType:newData[index].expenseType,
    
      organizationId:newData[index].organizationId,
      // remark:newData[index].remark,
    amount:newData[index].amount,
    expenseId:newData[index].expenseId,
    particular:newData[index].particular,
    // imageId: newimageId !== "" ? newimageId.imageId  : props.setEditingUser.imageId,
    // documentId:newimageId !== "" ? newData[index].documentId :newimageId.documentId,
    documentId:newimageId.documentId,
      userId:newData[index].userId,
      expenseDate:`${newData[index].expenseDate}T20:00:00Z`
    }
     props.updateExpense(result)
  };

  const {
    fetchingExpenseByVoucherId,
    expVoucherId,
    documentUploadModal,
    updateExpenseModal,
    deleteExpenseDrawer,
    setEditExpense,
    handleUpdateExpenseModal,
  } = props;
if(fetchingExpenseByVoucherId) {
  return <BundleLoader/>
}
  
  return (
    <>
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
       {inputValues.map((item,index) => { 
                  return (
                      <div key={index}>
                          <div className="flex justify-between mt-4"
                              style={{
                                  borderBottom: "3px dotted #515050"
                              }}>
                                <div className=" flex font-medium flex-col w-[6rem] ">
                                {editStates[index] ? (
  <div>                           
<EditUpload
imageId={item.documentId}
imgWidth={100}
imgHeight={100}
getImage={handleSetImage}
/>
  <button 
  // onClick={() => 
  // deleteHandler(image)}
  >
  delete image
</button>
</div>  
):(
<img src={`${base_url}/image/${item.documentId}`}
style={{width:"3rem",height:"3rem"}}
/>
)}
</div>   
                              <div className=" flex font-medium flex-col w-[2rem] ">
                                          <div class=" text-sm  font-poppins">
                                           ID
                                          </div>
                                          <div class=" text-xs text-blue-500  font-poppins cursor-pointer">
                                              
       <Tooltip title={item.expenseId}>
         
         <QuestionMarkIcon style={{fontSize:"1rem"}}/>
         </Tooltip>                        </div>

                                     
                            
                              </div>
                              <div className=" flex font-medium flex-col  w-20 ">
                         
                         <div class=" text-sm  font-poppins"> Type </div>
                         {editStates[index] ? (
            <select
  className="input-field"
  value={item.expenseType}
  onChange={(e) => handleInputChange(index, 'expenseType', e.target.value)}
>
  {props.expenses.map(item => (
    <option key={item.expenseTypeId} value={item.expenseTypeId}>
      {item.expenseType}
    </option>
  ))}
</select>
          ) : (
                         <div class=" text-xs  font-poppins">
                             {item.expenseType}
                         </div>
                           )}
                     </div>
                              <div className=" flex font-medium flex-col w-32 ml-[0.25rem]">
                         
                                  <div class=" text-sm  font-poppins">Date </div>
                                  {editStates[index] ? (
  <DatePicker
    value={dayjs(item.expenseDate)} 
    onChange={(date, dateString) =>
      handleInputChange(index, "expenseDate", dateString)
    }
    style={{ border: "1px solid grey" }}
  />
) : (
                                  <div class=" text-xs  font-poppins">
                                      
                                  
                                  {dayjs(item.expenseDate).format("MMM Do YY")}

                                  </div>
                                  )}
                              </div>
                              <div className="flex font-medium flex-col w-32">
                              <div class=" text-sm  font-poppins w-36 ml-[0.25rem]"> Cost Code </div>
                              {editStates[index] ? (
            <input
              type="text"
              value={item.clientName}
              onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
              style={{ border: "1px solid grey" }}
            />
          ) : (
                         <div class=" text-xs  font-poppins">
                             {item.clientName}
                         </div>
          )}
          </div>
                         <div className=" flex font-medium flex-col w-64 ml-[0.25rem]">

                                
                                  <div class=" text-sm  font-poppins">Particulars</div>
                                  {editStates[index] ? (
                                  <input
              type="text"
              value={item.particular}
              onChange={(e) => handleInputChange(index, 'particular', e.target.value)}
              style={{ border: "1px solid grey" }}
            />
          ) : (
        
                                  <div class=" text-xs  font-poppins">
                                       {item.particular}
                                  </div>
          )}
     
                              </div>
                              <div className=" flex font-medium flex-col w-32 ml-[0.25rem]">
                                
                              <div className=" flex font-medium flex-col w-20 ">


                                <div class=" text-sm  font-poppins">Amount</div>
                                {editStates[index] ? (
                                  <input
              type="text"
              value={item.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
              style={{ border: "1px solid grey" }}
            />
          ) : (
                                                               
          
                                <div class=" text-xs  font-poppins">
                                    {item.amount}
                                </div>
          )}
                            </div> 

                     </div>
                     <div className=" flex font-medium flex-col w-20 ml-[0.25rem]">


<div class=" text-sm  font-poppins">Curency</div>
{editStates[index] ? (
  <input
type="text"
value={item.currency}
// onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
style={{ border: "1px solid grey" }}
/>
) : (
                               

<div class=" text-xs  font-poppins">
   {item.currency}
</div>
)}
</div> 

                              <div class="flex flex-row items-center w-[10%]">
                                <div class="flex items-center">
                                <Tooltip title="Upload Document">
            <UploadIcon
              type="upload"
              style={{ cursor: "pointer",fontSize:"1rem" }}
              onClick={() => {
                handleDocumentUploadModal(true);
                
              }}
            />
          </Tooltip>
          <Tooltip title="Download Document">
          <a
          href={`${base_url}/document/${item.documentId}`}
        // target="_blank"
        >
          <DownloadIcon
            type="download"
            // onClick={() => startDownload()}
            style={{ cursor: "pointer",fontSize:"1rem" }}
          />
        </a>
          </Tooltip>
                                </div>
                  <div class="flex items-center ml-[0.25rem]">
                <button onClick={() => toggleEdit(index)}>
          {editStates[index] ? 'Cancel' : 'Edit'}
        </button>
        {editStates[index] && (
          <button onClick={() => handleSave(index)} className="ml-[0.25rem]">Save</button>
        )}
                      </div>
                      <div >
                      <div >
                         {/* {item.status === "Pending" ? ( */}
                         <Tooltip title="Delete">
            <DeleteOutlineIcon
              type="delete"
              style={{ cursor: "pointer",fontSize:"1rem" }}
              onClick={() => {
              this.props.deleteExpenseDrawer(item.expenseId);
                
              }}
            />
          </Tooltip>
          {/* ):null} */}
           {item.status==="Rejected" && (
          <Button type="primary"
          onClick={()=>{
            // this.props.reapply();
          }}>
          Reapply
          </Button>
        )}
            </div>

                  </div>
                  </div>
                            
                          </div>
                      </div>


                  )
              })}

    </div>
        <UpdateExpenseModal
      // expenseId={currentExpenseId}
      updateExpenseModal={updateExpenseModal}
      handleUpdateExpenseModal={handleUpdateExpenseModal}
      // handleSetCurrentExpenseId={handleSetCurrentExpenseId}
    />
    {/* <AddDocumentModal
      documentUploadModal={documentUploadModal}
      handleDocumentUploadModal={handleDocumentUploadModal}
    /> */}
    </>
  );
}

const mapStateToProps = ({ expense,expenses }) => ({
  fetchingExpenseByVoucherId:expense.fetchingExpenseByVoucherId,
  fetchingExpenseByVoucherIdError: expense.fetchingExpenseByVoucherIdError,
  expVoucherId: expense.expVoucherId,
  documentUploadModal: expense.documentUploadModal,
  updateExpenseModal: expense.updateExpenseModal,
  expenses: expenses.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getExpenseByVoucherId,
  deleteExpenseDrawer,
  setEditExpense,
  updateExpense,
  getExpenses,
  handleUpdateExpenseModal,
  handleDocumentUploadModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDrawerCard);

