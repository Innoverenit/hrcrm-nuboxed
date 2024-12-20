import React, { useEffect,lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip } from "antd";
import { getExpenseById,handleExpenseVoucherIdDrawer } from "../ExpenseAction";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import axios from "axios";

const ExpenseVoucherIdDrawer=lazy(()=>import("./ExpenseVoucherIdDrawer"));



function ExpenseApprovedStatusCard (props) {
const [expenseLists,setexpenseLists] = useState([]);
  const [expand, setExpand] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const [particularRowData, setParticularRowData] = useState({});
   const [pageNo, setPageNo] = useState(0);

  function handleSetParticularRowData(item) {
    console.log(item);
    setParticularRowData(item);   
  }

  function handleExpand(voucherId) {
    setExpand(!expand);    
    setvoucherId(voucherId);
  }


  const getExpenseLists = async (userId,statusType, pageNo) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Authorization token is missing.");
      return; 
    }

    try {
        const response = await axios.get(
          `${base_url}/api/v1/expense/status/${userId}/${statusType}/${pageNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setexpenseLists(response.data); 
    } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response);
        } else {
          console.error("Error fetching mileage data:", error);
        }
    }
  };

  useEffect(() => {
    if (props.statusType) {
        getExpenseLists(props.userId,props.statusType, pageNo);
    }
  }, [props.userId,props.statusType, pageNo]);

  const loadMore = () => {
    setPageNo(prevPage => prevPage + 1);
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green'; 
      case 'Pending':
        return '#e1d16c';
      case 'Rejected':
        return 'red'; 
      default:
        return 'gray';
    }
  };
  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600'; 
      case 'Pending':
        return 'text-[#e1d16c]';
      case 'Rejected':
        return 'text-red-600'; 
      default:
        return 'text-gray-600'; 
    }
  };
 
    const {
      approvedExpenses,
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;


    return (
      <>
        <div class="rounded m-1 p-1 w-[98%] overflow-scroll h-[29rem] shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:w-wk">
         <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-sm -heading font-poppins"> {props.statusType} </span>
            </span>
          </div>    
              {expenseLists.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                         
                      <div className=" flex font-medium flex-col w-64 mb-1 ">

                         
                              <Tooltip >
                                  <div class=" text-sm  font-poppins">
                                  Voucher ID
                                  </div>
                                  <div class=" text-xs text-blue-500  font-poppins cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </div>

</Tooltip>
<div className=" flex font-medium flex-col w-[9rem] ">  
                                    <div class=" text-xs  font-poppins">
                                    <div
                 style={{
                   border: `2px solid ${getStatusBorderColor(item.status)}`,
                   padding: "0px 0.62em",
                   textAlign: "center",
                   margin: "2px",
                   borderRadius: "0.62em",
                 }}
               >
                 <div className={getStatusTextColor(item.status)}>{item.status}</div>
               </div>
                                    </div>
                                    </div>
</div>
<div className=" flex font-medium flex-col  w-52 ">
                           
                           <div class=" text-sm  font-poppins"> Voucher Date </div>
                           <div class=" text-xs  font-poppins">
                               
                           
                           {dayjs(item.voucherDate).format("MMM Do YY")}

                           </div>
                       </div>
                       <div className=" flex font-medium flex-col w-32 ml-2 ">
                                  

                                  <div class=" text-sm  font-poppins">Amount</div>
                                  <div class=" text-xs  font-poppins">
                                      € {item.amount}
                                  </div>
                              </div>
                             
                        </div>

                        </div>
                    )
                })}
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
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer,
  approvedExpenses:expense.approvedExpenses
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer,
   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseApprovedStatusCard);

