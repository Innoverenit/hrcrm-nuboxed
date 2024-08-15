import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button,DatePicker } from "antd";
import { getExpenseByVoucherId, handleDocumentUploadModal,updateExpense, setEditExpense, handleUpdateExpenseModal, deleteExpenseDrawer, } from "../ExpenseAction";
import { getExpenses } from "../../Settings/Expense/ExpenseAction";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import EditUpload from "../../../Components/Forms/Edit/EditUpload";

const AddDocumentModal = lazy(() => import("./AddDocumentModal"));
const UpdateExpenseModal = lazy(() => import("./UpdateExpense/UpdateExpenseModal"));

function ExpenseDrawerCard(props) {
  const [data, setData] = useState(props.expVoucherId);
  const [editStates, setEditStates] = useState(props.expVoucherId.map(() => false));
 
  const [inputValues, setInputValues] = useState([]);
  useEffect(() => {
    const { voucherId } = props;
    props.getExpenseByVoucherId(voucherId);
    props.getExpenses();
  }, [props.voucherId]);
  useEffect(() => {
   
    setInputValues(props.expVoucherId);
  }, [props.expVoucherId]);

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
    documentId:newimageId[index].documentId,
      userId:newData[index].userId,
      expenseDate:`${newData[index].expenseDate}T20:00:00Z`
    }
     props.updateExpense(result)
  };

  const {
    fetchingExpenseByVoucherIdError,
    expVoucherId,
    documentUploadModal,
    updateExpenseModal,
    deleteExpenseDrawer,
    setEditExpense,
    handleUpdateExpenseModal,
  } = props;

  
  return (
    <>
    
    <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  w-[100%]  p-2 bg-transparent font-bold sticky top-0 z-10">
      <div className=" md:w-[10.1rem]"></div>
        <div className=" md:w-[8.1rem]">ID</div>
        <div className=" md:w-[9.5rem]">Type</div>
        <div className=" md:w-[5.6rem] ">Date</div>
        <div className="md:w-[5.9rem]">Cost Code</div>
        <div className="md:w-[7.5rem]">Particulars</div>
        <div className="md:w-[3.8rem]">Amount</div> 
      
        <div className="w-12"></div>

      </div>
    {inputValues.map((item,index) => { 
                  return (
                      <div key={index}>
                          <div
                className="flex rounded-xl  bg-white mt-[0.5rem] h-[7rem] items-center p-3"
              >
                                <div className=" flex font-medium flex-col w-[7.1rem] ">
                                {editStates[index] ? (
  <div>                           
<EditUpload
imageId={item.documentId}
imgWidth={100}
imgHeight={100}
getImage={handleSetImage}
/>
  {/* <button 
  // onClick={() => 
  // deleteHandler(image)}
  >
  delete image
</button> */}
</div>  
):(
<img src={`${base_url}/image/${item.documentId}`}
style={{width:"6rem",height:"6rem"}}
/>
)}
</div>   
                              <div className=" flex font-medium flex-col w-[9.3rem] ">

  
                                    
                                          {/* <div class=" text-sm  font-poppins">
                                           ID
                                          </div> */}
                                          <div class=" text-xs   font-poppins cursor-pointer">
                                              
                                          {/* <div onClick={() => { this.handleExpand(item.voucherId) 
              this.props.handleMileageVoucherIdDrwer(true)}}>
     
       </div> */} {item.expenseId}                       </div>

                                     
                            
                              </div>
                              <div className=" flex font-medium flex-col  w-[10.31rem] ">
                         
                         {/* <div class=" text-sm  font-poppins"> Type </div> */}
                         {editStates[index] ? (
            // <input
            //   type="text"
            //   value={item.expenseType}
            //   onChange={(e) => handleInputChange(index, 'expenseType', e.target.value)}
            //   style={{border:"2px solid black"}}
            // />
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
                              <div className=" flex font-medium flex-col w-[7.8rem] ">
                         
                                  {/* <div class=" text-sm  font-poppins">Date </div> */}
                                  {editStates[index] ? (
  <DatePicker
    value={dayjs(item.expenseDate)} 
    onChange={(date, dateString) =>
      handleInputChange(index, "expenseDate", dateString)
    }
    style={{ border: "1px solid lightgrey",boxShadow:"0 0.01em 0.01em ",margin:"0.25rem",height:"1.4rem" }}
  />
) : (
                                  <div class=" text-xs  font-poppins">
                                      
                                  
                                  {dayjs(item.expenseDate).format("MMM Do YY")}

                                  </div>
                                  )}
                              </div>
                              <div className="flex font-medium flex-col w-[5.12rem]">
                              {/* <div class=" text-sm  font-poppins w-36 ml-[0.25rem]"> Cost Code </div> */}
                              {editStates[index] ? (
            <input
              type="text"
              value={item.clientName}
              onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
              style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
            />
          ) : (
                         <div class=" text-xs  font-poppins">
                             {item.clientName}
                         </div>
          )}
          </div>
                         <div className=" flex font-medium flex-col w-[7.5rem] ">

                                
                                  {/* <div class=" text-sm  font-poppins">Particulars</div> */}
                                  {editStates[index] ? (
                                  <input
              type="text"
              value={item.particular}
              onChange={(e) => handleInputChange(index, 'particular', e.target.value)}
              style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
            />
          ) : (
        
                                  <div class=" text-xs  font-poppins">
                                       {item.particular}
                                  </div>
          )}
     
                              </div>
                              <div className=" flex font-medium flex-col w-[5.1rem] ">
                                
                              <div className=" flex font-medium flex-col w-20 ">


                                {/* <div class=" text-sm  font-poppins">Amount</div> */}
                                {editStates[index] ? (
                                  <input
              type="text"
              value={item.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
              style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
            />
          ) : (
                                                               
          
                                <div class=" text-xs  font-poppins">
                                    {item.amount}   {item.currency}
                                </div>
          )}
                            </div> 

                     </div>
                     <div className=" flex font-medium flex-col w-[4.13rem] ">


{/* <div class=" text-sm  font-poppins">Curency</div> */}
{editStates[index] ? (
  <input
type="text"
value={item.currency}
// onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
/>

                               
):null}
</div> 

                              <div class="flex flex-row items-center w-[10%]">
                              <div class="flex items-center ml-[0.25rem]">
                              {item.status !== 'Approved' && (
                                <button onClick={() => toggleEdit(index)}>
          {editStates[index] ? 'Cancel' : <BorderColorIcon   style={{
                              color: "grey",
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}/>}
        </button>
         )}
        {editStates[index] && (
          <button onClick={() => handleSave(index)} className="ml-[0.25rem]">Save</button>
        )}
       
                      </div>
                                <div class="flex items-center flex-col ml-2">
                                {item.status !== 'Approved' && (
                                <Tooltip title="Upload Document">
            <UploadOutlined
              type="upload"
              style={{ cursor: "pointer",fontSize:"1rem" }}
              onClick={() => {
                handleDocumentUploadModal(true);
                
              }}
            />
          </Tooltip>
                                )}
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
                 
                      <div >
                      <div class="ml-2" >
                      {item.status !== 'Approved' && (
                         <Tooltip title="Delete">
            <DeleteOutlined
              type="delete"
              style={{ cursor: "pointer",fontSize:"1rem" }}
              onClick={() => {
              this.props.deleteExpenseDrawer(item.expenseId);
                
              }}
            />
          </Tooltip>
                      )}
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
    <AddDocumentModal
      documentUploadModal={documentUploadModal}
      handleDocumentUploadModal={handleDocumentUploadModal}
    />
    </>
  );
}

const mapStateToProps = ({ expense,expenses }) => ({
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

