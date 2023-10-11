import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTable } from "../../../Components/UI/Antd";
import { Icon, Tooltip } from "antd";
import AssistantIcon from '@mui/icons-material/Assistant';
import { getExpenseById,
  handleExpenseVoucherIdDrawer,
  handleStatusExpenseModal,
  deleteExpense } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import moment from "moment";
import styled from 'styled-components';
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined, } from "@ant-design/icons";
import ExpenseVoucherIdDrawer from "./ExpenseVoucherIdDrawer";
import ExpenseStatusDrawer from "./UpdateExpense/ExpenseStatusDrawer";

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
  

    return (
      <>
       <div class=" h-[87vh] overflow-auto overflow-x-auto">
         <CardWrapper>      
              {Expenses.map((item) => {
                 return (
                    <CardElement>
        
                               
                   <div >
                          
                         </div>
                      {/* <CardDescription> */}
                      <div class="flex items-center justify-between">
                      <h4 class="text-sm">Voucher ID</h4>
                        <Header>
<div class="text-xs" onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
                        </Header> 
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">Voucher Name</h3>
                            <h4 class="text-xs">{item.voucherName}</h4>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">Voucher Date</h3>
                            <h4 class="text-xs">{dayjs(item.voucherDate).format("MMM Do YY")}</h4>
                        </div>
                        <div class="flex justify-between">
                    <h4 class="text-sm">Total Amount</h4> 
                    <h5 class="text-xs">{item.totalAmount}</h5>
                    </div>
                        {item.status === "Approved" && (
                 <div
                 style={{
                   border: "2px solid green",
                   padding: "0px 0.62em",
                   textAlign: "center",
                   margin: "2px",
                   width:"max-content",
                   borderRadius: "0.62em",
                 }}
               >
                 <div className="text-[green]">{item.status}</div>
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div
                style={{
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  width:"max-content",
                  borderRadius: "0.62em",
                }}
              >
               <div className="text-[red]">{item.status}</div></div>
              )}
              <div class="flex justify-between">
              {item.status === "Pending" && (
                  <div
                  style={{
                    border: "2px solid #e1d16c",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    width:"max-content",
                    borderRadius: "0.62em",
                  }}
                >
                 <div className="text-[#e1d16c]">Waiting for approval</div> </div>
              )}

<div style={{ cursor: "pointer",padding:"2px"}}
// style={{ cursor: "pointer" }}
onClick={() => {
handleStatusExpenseModal(true);
handleExpand(item.voucherId);

}}
>
                 <Tooltip  title={"status"}>
                 <AssistantIcon
style={{ color: "grey",fontSize:"1.2rem",padding:"2px" }}/>
   </Tooltip> 

   </div>
               {item.status === "Pending" && (
        <Tooltip title="Delete">
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                props.deleteExpense(item.voucherId);
                  
                }}
              />
            </Tooltip>
               )}          
                </div> 
                     
           
                      

                       
                      
                    
                        
                    </CardElement>
                 )  
            })}
              </CardWrapper>
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
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.35rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 8rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 20vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 9rem;
      margin: 0.1em;
    
  }
`
const CardDescription = styled.div`
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const CardImage = styled.div`
  
  width:200;
  display:flex;
  height:200
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const WithOutImage = styled.div`
  
  width:200px;
  height:200px;
  display:flex;
    align-items: center;
    flex-direction:column
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`