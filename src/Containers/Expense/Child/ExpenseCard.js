import React, { useEffect, useState ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledPopconfirm, } from "../../../Components/UI/Antd";
import {  Tooltip } from "antd";
import AssistantIcon from '@mui/icons-material/Assistant';
import { getExpenseById,
  handleExpenseVoucherIdDrawer,
  handleStatusExpenseModal,
  deleteExpense } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import dayjs from "dayjs";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const ExpenseVoucherIdDrawer=lazy(()=>import("./ExpenseVoucherIdDrawer"));
const ExpenseStatusDrawer=lazy(()=>import("./UpdateExpense/ExpenseStatusDrawer"));


function ExpenseCard(props) {
  const [expand, setExpand] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularRowData(item) {
    console.log(item);
    setParticularRowData(item);   
  }

  function handleExpand(voucherId) {
    setExpand(!expand);    
    setvoucherId(voucherId);
  }

  useEffect(() => {
    props.getExpenseById(props.userId);
  }, [props.userId]);

 
    const {
      Expenses,
      fetchingExpenseById,
      fetchingExpenseByIdError,
      handleStatusExpenseModal,
      updateStatusExpenseModal,
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;
    if (fetchingExpenseById) return <BundleLoader/>;

    return (
      <>
       <div class=" h-[87vh] overflow-auto overflow-x-auto">
       <div class="flex flex-wrap w-full max-sm:justify-between max-sm:h-[34rem] max-sm:items-center overflow-x-auto h-[37rem]">   
              {Expenses.map((item) => {
                 return (
                  <div class="rounded border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[8rem] 
                  text-[#444444] m-1 p-1 w-[19vw] flex flex-col max-sm:w-wk  ">                              
                   <div >
                          
                         </div>
                  
                      <div class="flex items-center justify-between">
                      <div class="text-sm">Voucher ID</div>
                      <div className="flex text-ellipsis whitespace-nowrap overflow-hidden h-[2em] text-base p-1
                         text-[blue] cursor-pointer max-sm:items-center">
<div class="text-[0.82rem] font-bold" onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
                        </div> 
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">Voucher Name</h3>
                            <div class="text-[0.82rem]">{item.voucherName}</div>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">Voucher Date</h3>
                            <div class="text-[0.82rem]">{dayjs(item.voucherDate).format("MMM Do YY")}</div>
                        </div>
                        <div class="flex justify-between">
                    <div class="text-sm">Total Amount</div> 
                    <h5 class="text-[0.82rem]">{item.totalAmount}</h5>
                    </div>
                        {item.status === "Approved" && (
                 <div
                 className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-green-500 p-[0px_0.62em]"
               >
                 <div className="text-[green]">{item.status}</div>
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div
                className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-red-500 p-[0px_0.62em] w-max"
              >
               <div className="text-[red]">{item.status}</div></div>
              )}
              <div class="flex justify-between">
              {item.status === "Pending" && (
                  <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-[#e1d16c] p-[0px_0.62em] w-max"
                >
                 <div className="text-[#e1d16c]">Waiting for approval</div> </div>
              )}

<div className=" cursor-pointer p-[2px]"
// style={{ cursor: "pointer" }}
onClick={() => {
handleStatusExpenseModal(true);
handleExpand(item.voucherId);

}}
>
                 <Tooltip  title={"Status"}>
                 <AssistantIcon
className="!text-base cursor-pointer text-[grey] p-[2px]"/>
   </Tooltip> 

   </div>
               {item.status === "Pending" && (
          <StyledPopconfirm
          title="Do you want to delete?"
          onConfirm={() => props.deleteExpense(item.voucherId)}
        >
              <DeleteOutlineIcon
                type="delete"
                className="!text-icon cursor-pointer text-[red]" 
                // onClick={() => {
                // props.deleteExpense(item.voucherId);
                  
                // }}
              />
           </StyledPopconfirm>
               )}          
                </div> 
                     
           
                      

                       
                      
                    
                        
                    </div>
                 )  
            })}
              </div>
              </div>

        <ExpenseVoucherIdDrawer
        voucherId={voucherId} 
        particularRowData={particularRowData}
        expenseVoucherIdDrawer={expenseVoucherIdDrawer}
        handleExpenseVoucherIdDrawer={handleExpenseVoucherIdDrawer}
        />
            <ExpenseStatusDrawer
        voucherId={voucherId} 
        handleExpand={handleExpand}
        particularRowData={particularRowData}
        updateStatusExpenseModal={updateStatusExpenseModal}
        handleStatusExpenseModal={handleStatusExpenseModal}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  updateStatusExpenseModal:expense.updateStatusExpenseModal,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError: expense.fetchingExpenseByIdError,
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer,
      deleteExpense,
      handleStatusExpenseModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCard);
