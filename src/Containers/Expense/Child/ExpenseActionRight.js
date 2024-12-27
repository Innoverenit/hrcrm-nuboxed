import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {  Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleExpenseModal } from "../ExpenseAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';


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
  
        <div  class=" ml-2">
        <Button
          type={this.state.isClicked === "export" ? "primary" : ""}
          onClick={() => this.handleClicked("export")}
          // ghost
        >
         <UploadIcon className=" !text-icon"/> Export
        </Button>
        </div>
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
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, Expense }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleExpenseModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseActionRight)
