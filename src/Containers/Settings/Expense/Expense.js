import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, Input, Tooltip, message } from "antd";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

import { BundleLoader } from "../../../Components/Placeholder";
import {
  getExpenses,
  getExpenseCount,
  addExpenses,
  removeExpense,
  updateExpenses,
  searchExpenseName,
  ClearReducerDataOfExpense,
} from "./ExpenseAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const Expense = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [expenses, setExpenseData] = useState(props.expenses);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newExpenseName, setExpenseName] = useState("");

  useEffect(() => {
    props.getExpenses();
    props.getExpenseCount(props.orgId);
  }, []);

  const editRegion = (expenseTypeId, name) => {
    setEditingId(expenseTypeId);
    setExpenseName(name);
  };

  const handleAddExpense = () => {
    setAddingRegion(true);
    setExpenseName("");
  };

  const handleUpdateExpense = (region) => {
    let data = {
      expenseTypeId: region.expenseTypeId,
      expenseType: newExpenseName,
    };
    props.updateExpenses(data, region.expenseTypeId);
    setEditingId(null);
  };

  const handleExpense = () => {
    if (!newExpenseName.trim()) {
      message.error("Empty Add Expense. Please provide a value.");
      return;
    }

    let data = {
      editInd: true,
      expenseType: newExpenseName,
      orgId: props.orgId,
    };
    props.addExpenses(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getExpenses();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchExpenseName(currentData);
    } else {
      message.error("Search field is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setExpenseName("");
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

  if (props.fetchingExpenses) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-7px mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=expenseType`}>
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
                className="border-2 border-gray mr-1 ml-1 w-[52%]"
                type="text"
                value={newExpenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleExpense}
              >
                Save
              </button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddExpense}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingExpenses && expenses.length === 0 ? (
            <NodataFoundPage />
          ) : (
            expenses
              .slice()
              .sort((a, b) => a.expenseType.localeCompare(b.expenseType))
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.expenseTypeId}
                >
                  {editingId === region.expenseTypeId ? (
                    <input
                      placeholder="Update Expense"
                      style={{ border: "2px solid black" }}
                      type="text"
                      value={newExpenseName}
                      onChange={(e) => setExpenseName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.expenseType}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}
                  <div>
                    {editingId === region.expenseTypeId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateExpense(region)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {region.editInd && (
                          <BorderColorIcon
                            className="cursor-pointer !text-icon text-red-600"
                            onClick={() =>
                              editRegion(region.expenseTypeId, region.expenseType)
                            }
                          />
                        )}
                      </>
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        props.removeExpense(region.expenseTypeId, props.orgId)
                      }
                    >
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                    </Popconfirm>
                  </div>
                </div>
              ))
          )}
        </MainWrapper>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(
          props.expenses &&
            props.expenses.length &&
            props.expenses[0].updationDate
        ).format("YYYY-MM-DD")}{" "}
        by {props.expenses && props.expenses.length && props.expenses[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ expenses, auth }) => ({
  addingExpenses: expenses.addingExpenses,
  addingExpensesError: expenses.addingExpensesError,
  expenses: expenses.expenses,
  orgId: auth.userDetails.organizationId,
  expenseCount: expenses.expenseCount,
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
      ClearReducerDataOfExpense,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
