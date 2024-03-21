import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button,Input } from "antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput,  } from "../../../Components/UI/Elements";
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
const SingleExpenses = lazy(() =>
  import("./SingleExpenses")
);

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedExpenses: [],
      isTextInputOpen: false,
      addingExpense: false,
      expenseType: "",
      type: "",
      singleExpense: "",
      editInd:true,
      currentData: "" 
    };
  }
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getExpenses();
      this.props.ClearReducerDataOfExpense();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchExpenseName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getExpenses();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddExpenses = () => {
    const { addExpenses, expenses } = this.props;
    const { expenseType, addingExpenses, isTextInputOpen,editInd } = this.state;
    let expense = { expenseType,editInd };

    let exist =
    expenses &&
    expenses.some((element) => element.expenseType == expenseType);

    // if (exist) {
    //   message.error(
    //     "Can't create as another expense type exists with same name!"
    //   );
    // } else {
      addExpenses(expense, () => console.log("add expense callback"));
    // }

    this.setState({
      expenseType: "",
      singleExpense: "",
      isTextInputOpen: false,
      editInd:true
    });
  };
  handleDeleteExpense = (expenseTypeId={expenseTypeId}) => {
    this.props.removeExpense(expenseTypeId);
    this.setState({ expenseType: "", singleExpense: "" });
  };
  handleUpdateExpense = (expenseType, expenseTypeId,editInd, cb) => {
    this.props.updateExpenses(expenseType, expenseTypeId,editInd, cb);
    this.setState({ expenseType: "", singleExpense: "",editInd:true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { 
      getExpenses,getExpenseCount,orgId
     } = this.props;
    console.log();
    getExpenses();
    getExpenseCount(orgId)
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingExpenses,
      fetchingExpensesError,
      expenses,
      addingExpenses,
      updatingExpenses,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      expenseType,
      singleExpense,
      linkedExpenses,
    } = this.state;
    if (fetchingExpenses) return <BundleLoader/>;
    if (fetchingExpensesError) return <p>We are unable to load data</p>;
    return (
      <>
          <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div class=" flex flex-row justify-between">
        <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
              >
              
                <TextInput
                  placeholder="Add Expense"
                  name="expenseType"
                 value={expenseType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!expenseType}
                  loading={addingExpenses}
                  onClick={this.handleAddExpenses}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
                
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                   loading={addingExpenses}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
                
              </>
            )}
              </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
              {expenses.length ? (
  expenses
    .slice() 
    .sort((a, b) => a.expenseType.localeCompare(b.expenseType)) 
    .map((expense, i) => (
                    <SingleExpenses
                      key={i}
                      value={singleExpense}
                      name="singleExpense"
                      expense={expense}
                      linkedExpenses={linkedExpenses}
                      updatingExpenses={updatingExpenses}
                      handleChange={this.handleChange}
                      handleUpdateExpense={this.handleUpdateExpense}
                         handleDeleteExpense={this.handleDeleteExpense}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
          
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.expenses && this.props.expenses.length && this.props.expenses[0].updationDate).format('YYYY-MM-DD')} by {this.props.expenses && this.props.expenses.length && this.props.expenses[0].name}</div>
      </>
    );
  }
}

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
