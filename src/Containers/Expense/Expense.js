import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleExpenseModal,setExpenseViewType } from "./ExpenseAction";
const ExpenseHeader = lazy(() => import("./Child/ExpenseHeader"));
const ExpenseStatusCard = lazy(() => import("./Child/ExpenseStatusCard"));
const ExpenseCard = lazy(() => import("./Child/ExpenseCard"));
const AddExpenseModal = lazy(() => import("./Child/AddExpenseModal"));
class Expense extends Component {
  render() {
    const {setExpenseViewType,viewType}=this.props;
    return (
      <React.Fragment>
        <ExpenseHeader setExpenseViewType={setExpenseViewType}
        viewType={viewType}/>
        <AddExpenseModal
          handleExpenseModal={this.props.handleExpenseModal}
          addExpenseModal={this.props.addExpenseModal}
        />
         <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
             <ExpenseCard
             viewType={viewType}
           />
          ) 
          :this.props.viewType === "list" ?(
              <ExpenseStatusCard/>
            )
          : null}
          </Suspense>
       
     
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ expense }) => ({
  addExpenseModal: expense.addExpenseModal,
  viewType:expense.viewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleExpenseModal,
      setExpenseViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
