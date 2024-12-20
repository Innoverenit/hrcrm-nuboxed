import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleMileageModal } from "../MileageAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

const Option = StyledSelect.Option;

class MileageActionRight extends React.Component {
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
      <div class=" flex items-center ml2" >
      <div >
          
        <Button
          type={this.state.isClicked === "export" ? "primary" : ""}
          onClick={() => this.handleClicked("export")}
        >
         <UploadIcon className=" !text-icon"/> Export
        </Button>
        </div>
        <div class=" ml-2">
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handleMileageModal(true)}
          >
          
           <DataSaverOnIcon className=" !text-icon"/> Add
          </Button>
        </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ handleMileageModal }, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MileageActionRight)
);
