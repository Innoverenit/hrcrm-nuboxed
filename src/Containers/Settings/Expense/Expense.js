import React, { useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Input ,Tooltip} from "antd";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
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
import { MainWrapper } from "../../../Components/UI/Layout";

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
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mt-7px mr-2"  >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[2rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"expenseType"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
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
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingExpenses && expenses.length === 0 ? <NodataFoundPage /> : expenses.slice().sort((a, b) => a.expenseType.localeCompare(b.expenseType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.expenseTypeId}>
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
                <div >{region.expenseType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.expenseTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateExpense(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {region.editInd ? (
                    <BorderColorIcon  className=" cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.expenseTypeId, region.expenseType)} />
                    ) : null}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeExpense(region.expenseTypeId,props.orgId)}
                      >
                <DeleteOutlined className=" cursor-pointer !text-icon text-red-600"
                 
              // onClick={() => 
              //     props.removeServiceLine(item.expenseTypeId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
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
