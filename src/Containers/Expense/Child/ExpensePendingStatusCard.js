import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip } from "antd";
import { getExpenseById,handlePExpenseVoucherIdDrawer,getPendingExpense,deleteExpense } from "../ExpenseAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";

import { StyledPopconfirm } from "../../../Components/UI/Antd";

const PExpenseVoucherIdDrawer =lazy(()=>import("./PExpenseVoucherIdDrawer"));

function ExpensePendingStatusCard(props) {
  const [expand, setExpand] = useState(false);
  const [newvoucherId, setnewvoucherId] = useState("");
  const [newparticularRowData, setnewParticularRowData] = useState({});
  const [pageNo, setPage] = useState(0);

  function handleSetNewParticularRowData(item) {
    console.log(item);
    setnewParticularRowData(item);   
  }

  function handleExpand(newvoucherId) {
    setExpand(!expand);    
    setnewvoucherId(newvoucherId);
  }

  useEffect(() => {
    setPage(pageNo + 1);
    props.getPendingExpense(props.userId,pageNo);
  }, [props.userId]);

 
    const {
      pendingExpenses,
      pexpenseVoucherIdDrawer,
      handlePExpenseVoucherIdDrawer,
      fetchingPendingExpense,
    } = props;
if(fetchingPendingExpense){
return <BundleLoader/>
}
    return (
      <>
        <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:w-wk">
         <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-sm -heading font-poppins"> Pending </span>
            </span>
          </div>    
              {pendingExpenses.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                         
                      <div className=" flex font-medium flex-col w-72 mb-1 ">

                         
                              <Tooltip >
                                  <div class=" text-sm  font-poppins">
                                  Voucher ID
                                  </div>
                                  <div class=" text-xs text-blue-500  font-poppins cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetNewParticularRowData(item);
                props.handlePExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </div>

</Tooltip>
<div className=" flex font-medium flex-col w-max ">
                                    <div class=" text-xs  font-poppins"></div>

                                    <div class=" text-xs  font-poppins">
         
            
              
                                    <div
                  style={{
                    border: "2px solid #e1d16c",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                    width:"10rem"
                  }}
                >
                  <div className="text-[#e1d16c]">Waiting for approval
                    </div></div>
                                    </div>
                                    </div>
</div>

<div className=" flex font-medium flex-col  w-52 ">
                           
                           <div class=" text-sm  font-poppins"> Voucher Date </div>
                           <div class=" text-xs  font-poppins">
                               
                           
                           {dayjs(item.voucherDate).format("MMM Do YY")}

                           </div>
                       </div>
                       <div className=" flex font-medium flex-col w-32 ">
                                  

                                  <div class=" text-sm  font-poppins">Amount</div>
                                  <div class=" text-xs  font-poppins">
                                      € {item.amount}
                                  </div>
                              </div>
                              <StyledPopconfirm
           title="Do you want to delete?"
           onConfirm={() =>   props.deleteExpense(item.voucherId)}
         >
              <DeleteOutlineIcon
                type="delete"
                style={{ cursor: "pointer" }}
                // onClick={() => {
                // props.deleteExpense(item.voucherId);
                  
                // }}
              />
           </StyledPopconfirm>
                        </div>
              
                        </div>
                    )
                })}
      </div>
      

        <PExpenseVoucherIdDrawer
        newvoucherId={newvoucherId} 
        newparticularRowData={newparticularRowData}
        pexpenseVoucherIdDrawer={pexpenseVoucherIdDrawer}
        handlePExpenseVoucherIdDrawer={handlePExpenseVoucherIdDrawer}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError:expense.fetchingExpenseByIdError,
  pexpenseVoucherIdDrawer:expense.pexpenseVoucherIdDrawer,
  pendingExpenses:expense.pendingExpenses,
  fetchingPendingExpense:expense.fetchingPendingExpense

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handlePExpenseVoucherIdDrawer,
      getPendingExpense,
      deleteExpense
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpensePendingStatusCard);

