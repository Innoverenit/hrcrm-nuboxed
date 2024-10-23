import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const ExpenseActionLeft=lazy(()=>import("./ExpenseActionLeft"));
const ExpenseActionRight=lazy(()=> import("./ExpenseActionRight"));

class ExpenseHeader extends Component {
  render() {
    const {
        
        viewType,
        setExpenseViewType,
    } = this.props;
    return (
      <div className="sticky mt-1 z-50"> 
        <ActionHeader
            leftComponent={

                <ExpenseActionLeft
                    viewType={viewType}
                    setExpenseViewType={setExpenseViewType}
                />

            }
          rightComponent={
            <ExpenseActionRight
            //   handleOpportunityModal={handleOpportunityModal}
            />
          }
        />
      </div>
    );
  }
}

export default ExpenseHeader;
