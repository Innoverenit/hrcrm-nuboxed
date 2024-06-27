import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {  Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleExpenseModal } from "../ExpenseAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';


const Option = StyledSelect.Option;

class ExpenseActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    return (
      <div class=" flex items-center" >
        {/* <Button
                    type="primary"
                    default
                    disabled
                >
                    Import
                </Button>

                <Button
                    type="primary"
                    default
                    disabled
                >
                    Import
                </Button> */}
        {/* <Button
          type={this.state.isClicked === "import" ? "primary" : ""}
          onClick={() => this.handleClicked("import")}
        >
          Import
        </Button>
        &nbsp; */}
    <div>
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handleExpenseModal(true)}
          >
            < DataSaverOnIcon/>Add           
          </Button>
        </Tooltip>
        </div>
        <div  class=" ml-2">
        <Button
          type={this.state.isClicked === "export" ? "primary" : ""}
          onClick={() => this.handleClicked("export")}
          // ghost
        >
          Export
        </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, Expense }) => ({
  //   userId: auth.userDetails.userId,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  //   ExpenseFilterText: Expense.ExpenseFilterText,
  //   users: team.users,
  //   filterByUserOption: team.filterByUserOption,
  //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleExpenseModal,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExpenseActionRight)
);

// function onChangeDatePicker(date, dateString, dataPass) {
//   console.log(date);
//   console.log(dateString);
//   console.log(dataPass);
//   setRows((value) => {
//     console.log(value);
//     return value.map((data) => {
//       if (`${data.id}date` === dataPass) {
//         console.log(dateString);
//         return { ...data, date: dateString };
//       } else {
//         return data;
//       }
//     });
//   });
// }
