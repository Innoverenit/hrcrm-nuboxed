import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip } from "antd";
import { getExpenseById,handleExpenseVoucherIdDrawer } from "../ExpenseAction";
import dayjs from "dayjs";
const ExpenseVoucherIdDrawer=lazy(()=>import("./ExpenseVoucherIdDrawer"));

function ExpenseCard2(props) {
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
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;
  

    return (
      <>
      <div class=" h-h86 overflow-hidden overflow-x-hidden">
      <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] h-[36rem] bg-[#E3E8EE] max-sm:w-wk max-sm:h-[32rem]">
              {Expenses.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4 max-sm:flex-col"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                          <div class=" text-sm text-cardBody font-poppins">
                                 Name
                                  </div> 
                      <div className=" flex font-medium flex-col md:w-72 max-sm:w-full justify-between max-sm:flex-row  ">

                         
                              <Tooltip >
                                <div  class=" flex max-sm:w-full justify-between max-sm:flex-row md:flex-col ">
                                  <div class=" text-sm text-cardBody font-poppins">
                                  Voucher ID
                                  </div>
                                  <div class=" text-xs text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </div>
         </div>
</Tooltip>

</div>
<div className=" flex font-medium flex-col  md:w-52 max-sm:w-full justify-between max-sm:flex-row ">
                           
                           <div class=" text-sm text-cardBody font-poppins"> Voucher Date </div>
                           <div class=" text-xs text-cardBody font-poppins">
                               
                           
                           {dayjs(item.voucherDate).format("MMM Do YY")}

                           </div>
                       </div>
                       <div className=" flex font-medium flex-col md:w-32 max-sm:w-full justify-between max-sm:flex-row ">
                                  

                                  <div class=" text-sm text-cardBody font-poppins">Amount</div>
                                  <div class=" text-xs text-cardBody font-poppins">
                                      € {item.amount}
                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col md:w-[12rem] max-sm:w-full justify-between max-sm:flex-row ">
                                    {/* <div class=" text-sm text-cardBody font-poppins">Status</div> */}

                                    <div class=" text-xs text-cardBody font-poppins">
                                    {item.status === "Approved" && (
                 <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-green-500 p-[0px_0.62em]"
               >
                 <div className="text-[green]">{item.status}</div>
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div
                className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-red-500 p-[0px_0.62em] "
              >
                <div className="text-[red]">{item.status}</div></div>
              )}
              {item.status === "Pending" && (
                  <div
                  className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-[#e1d16c] p-[0px_0.62em]"
                >
                 <div className="text-[#e1d16c]"> Waiting for approval</div>
                  </div>
              )}
                                    </div>
                                    </div>
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
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError: expense.fetchingExpenseByIdError,
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCard2);
