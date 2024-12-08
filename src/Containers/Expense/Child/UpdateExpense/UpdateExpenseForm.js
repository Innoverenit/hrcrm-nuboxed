import { Button, DatePicker, message, Select } from "antd";
import React, { useState, useEffect } from "react";
import {  TextInput } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import {getCurrencyList} from "../../../Settings/Category/Currency/CurrencyAction"
import { connect } from "react-redux";
import { getExpenses } from "../../../Settings/Expense/ExpenseAction";
import { updateExpense  } from "../../ExpenseAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const { Option } = Select;

function UpdateExpenseForm(props) {
  const [row, setRows] = useState([
    {
      expenseDate: props.setEditingExpense.expenseDate || "",
      clientName:props.setEditingExpense.clientName || "",
      particular:props.setEditingExpense.particular || "",
      expenseType:props.setEditingExpense.expenseType || "",
      amount:props.setEditingExpense.amount || "",
      currency: props.user.currency,
      userId: props.userId,
      expenseTypeId:props.expenseTypeId,
      id: 1,
    },
  ]);
  const [id, setId] = useState(1);
  function onChangeDatePicker(date, dateString, id) {
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}date` === id) {
          console.log(dateString);
          return { ...data, expenseDate: dayjs(dateString).toISOString() };
        } else {
          return data;
        }
      });
    });
  }
  function handleChange(id, billType) {
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}select` === id) {
          return { ...data, billType: billType };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangeattribute(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}attribute`);
        console.log(e.target.name);

        if (`${d.id}attribute` === e.target.name) {
          return { ...d, clientName: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  useEffect(() => {
    props.getExpenses();
    props.getCurrencyList();
  }, []);
  function handleCurrencyChange(currency, id) {
    console.log(currency);
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}curr` === id) {
          return { ...data, currency: currency };
        } else {
          return data;
        }
      });
    });
  }
  function handleExpenseChange(expenseType, id) {
    console.log(expenseType);
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}expenseType` === id) {
          return { ...data, expenseType: expenseType };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangeBillType(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}billType`);
        console.log(e.target.name);

        if (`${d.id}billType` === e.target.name) {
          return { ...d, billType: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChangeParticular(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}particular`);
        console.log(e.target.name);

        if (`${d.id}particular` === e.target.name) {
          return { ...d, particular: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChangeAmount(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}amount`);
        console.log(e.target.name);

        if (`${d.id}amount` === e.target.name) {
          return { ...d, amount: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleAddRowClick() {
    setId((v) => v + 1);
    setRows((v) => [
      ...v,
      {
        expenseDate: "",
        clientName: "",
        particular: "",
        expenseType: "",
        amount: "",
        id: id + 1,
      },
    ]);
  }
  function handleDelete(row) {
    setRows((v) => v.filter((d) => d.id !== row.id));
  }

  function handleCallBack(status) {
    if (status === "Success") {
      props.getExpenseById(props.userId);
    } else {
      message.error("Something went wrong! Occourd");
    }
  }
  function handleSubmit() {
    
    console.log(row);

    if (row) {
      row.map((item) => {
        if (
          !item.expenseDate &&
          !item.expenseType &&
          !item.clientName &&
          !item.particular &&
          !item.amount
        ) {
          alert("All Fields Required");
        } else {
          props.updateExpense(row, handleCallBack);
        }
      });
    } else {
    }
  }

  const { addingExpense,updateExpense } = props;
  return (
    <div>
      <table>
        <th>Date</th>
        <th>Assigned</th>

        <th>Expense Type</th>
        <th>More Information</th>
        <th>Amount</th>
        <th>Currency</th>
        {row.map((item) => {
          return (
            <tr>
              <td style={{ width: "18%" }}>
                <DatePicker
                  style={{ width: "96%" }}
                  onChange={(date, dateString) =>
                    onChangeDatePicker(date, dateString, `${item.id}date`)
                  }
                  isRequired
                />
              </td>
              <td style={{ width: "24%" }}>
                <TextInput
                  style={{ width: "95%" }}
                  name={`${item.id}attribute`}
                  value={`${item.clientName}`}
                  onChange={handleChangeattribute}
                />
              </td>

              <td style={{ width: "19%" }}>
                <Select
                  isRequired
                  style={{ width: "96%" }}
                  onSelect={(value) =>
                    handleExpenseChange(value, `${item.id}expenseType`)
                  }
                 
                >
                  {/* <Option value="Cellphone">Cellphone</Option>
                  <Option value="Fuel Bill">Fuel Bill</Option>
                  <Option value="Internet">Internet</Option>
                  <Option value="Hardware">Hardware</Option>
                  <Option value="Stationary">Stationary</Option>
                  <Option value="Team Welfare">Team Welfare</Option>
                  <Option value="Team outing">Team outing</Option>
                  <Option value="Others">Others</Option> */}
                   {props.expenses.map((item) => {
                    return (
                      <Option value={item.expenseType} >
                        {item.expenseType}
                      </Option>
                    );
                  })}
                </Select>
              </td>

              <td style={{ width: "19%" }}>
                <TextInput
                  style={{ width: "96%" }}
                  name={`${item.id}particular`}
                  value={`${item.particular}`}
                  onChange={handleChangeParticular}
                />
              </td>
              <td style={{ width: "10%" }}>
                <TextInput
                  name={`${item.id}amount`}
                  value={`${item.amount}`}
                  onChange={handleChangeAmount}
                  style={{ width: "90%" }}
                  isRequired
                />
              </td>
              <td>
                <Select
                  style={{ width: 70 }}
                  onSelect={(value) =>
                    handleCurrencyChange(value, `${item.id}curr`)
                  }
                  disabled
                  defaultValue={props.user.currency}
                >
                 {props.currencyList.map((item) => {
                    return (
                      <Option value={item.currency_name} 
                      // defaultValue={props.user.address[0].country}
                       >
                        {item.currency_name}
                      </Option>
                    );
                  })}
                </Select>
              </td>
              <td>
                {/* <Select
                 style={{ width: 120 }}
                ></Select> */}
              </td>
              {row.length > 1 && (
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer" 
                  onClick={() => handleDelete(item)}
                />
              )}
            </tr>
          );
        })}
      </table>
      <Button
        style={{ float: "right", marginTop:"-1%" }}
        type="primary"
        onClick={handleSubmit}
        Loading={updateExpense}
      >
        Submit
      </Button>
      {/* &nbsp; &nbsp; &nbsp;
      <Button
        style={{ float: "right", marginRight: "1%" }}
        type="primary"
        onClick={handleAddRowClick}
        Loading={addingExpense}
      >
        Add more
      </Button> */}
    </div>
  );
}

const mapStateToProps = ({ expense, auth,currency,expenses }) => ({
  // addingExpense: expense.addingExpense,
  updateExpense:expense.updateExpense,
  updateExpenseError:expense.updateExpenseError,
  currencyList: currency.currencyList,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  setEditingExpense:expense.setEditingExpense,
  expenses: expenses.expenses,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       updateExpense,
       getCurrencyList,
      getExpenses,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateExpenseForm);
