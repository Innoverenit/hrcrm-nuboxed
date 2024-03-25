import React, { useEffect,lazy,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getExpenses,
  getExpenseCount,
  addExpenses,
  removeExpense,
  updateExpenses,
  searchExpenseName,
  ClearReducerDataOfExpense
} from "./ExpenseAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const Expense = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [expenses, setExpenseData] = useState(props.expenses);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newExpenseName, setExpenseName] = useState('');
  useEffect(() => {
      props.getExpenses(); 
      props.getExpenseCount(props.orgId) 
  }, [])

  const editRegion = (expenseTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(expenseTypeId);
      setExpenseName(name);
  };



  const handleAddExpense = () => {
      setAddingRegion(true);
      setExpenseName("")
  };

  const handleUpdateExpense=(region)=>{
      console.log(region)
      let data={
        expenseTypeId:region.expenseTypeId,
        expenseType:newExpenseName
       
      }
props.updateExpenses(data,region.expenseTypeId)
setEditingId(null);
  }

  const handleExpense = () => {
      // if (newRegionName.trim() !== '') {
      //     console.log("New Region:", newRegionName);
      //     const newRegion = {
      //         id: Date.now(),
      //         item: newRegionName
      //     };
      //     setRegions([...regions, newRegion]);
      //     setNewRegionName('');
      //     setAddingRegion(false);
      // }
      let data={
        editInd:true,
        expenseType:newExpenseName,
        orgId:props.orgId,
        editInd:true,
      }
      props.addExpenses(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getExpenses();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchExpenseName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setExpenseName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.expenses.length > 0) {
        
        setExpenseData(props.expenses);
      }
    }, [props.expenses]);

// console.log(regions)
if (props.fetchingExpenses) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                        placeholder="Add Expense"
                      style={{border:"2px solid black"}}
                          type="text" 
                          value={newExpenseName} 
                          onChange={(e) => setExpenseName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingExpenses}
                      onClick={handleExpense}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddExpense}> Add More</button>
              )}
          </div>
          </div>
          {!props.fetchingExpenses && expenses.length === 0 ? <NodataFoundPage /> : expenses.slice().sort((a, b) => a.expenseType.localeCompare(b.expenseType)).map((region, index) => (
            <div className="card9" key={region.expenseTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.expenseTypeId ? (
                <input
                placeholder="Update Expense"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newExpenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                />
            ) : (
                <div className="region">{region.expenseType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.expenseTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateExpense(region)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {region.editInd ? (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.expenseTypeId, region.expenseType)} />
                    ) : null}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeExpense(region.expenseTypeId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.expenseTypeId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
      
  <div class=" font-bold">Updated on {dayjs(props.expenses && props.expenses.length && props.expenses[0].updationDate).format('YYYY-MM-DD')} by {props.expenses && props.expenses.length && props.expenses[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ expenses,auth}) => ({
  addingExpenses: expenses.addingExpenses,
  addingExpensesError: expenses.addingExpensesError,
     expenses: expenses.expenses,
     orgId: auth.userDetails.organizationId,
     expenseCount:expenses.expenseCount,
//   removingEducations: expense.removingEducations,
//   removingEducationsError: expense.removingEducationsError,
  fetchingExpenses: expenses.fetchingExpenses,
  fetchingExpensesError: expenses.fetchingExpensesError,

  updatingExpenses: expenses.updatingExpenses,
  updatingExpensesError: expenses.updatingExpensesError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenses,
      getExpenseCount,
     addExpenses,
     removeExpense,
     updateExpenses,
     searchExpenseName,
     ClearReducerDataOfExpense
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Expense);
