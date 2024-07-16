import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button, Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class EmployeesActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {}
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleEmployeeModal, userId,user } = this.props;
    return (
      <>
        <div class=" flex items-center">
          {this.props.role === "ADMIN" && (
            <Tooltip placement="left" title="XL">
              <a
                href={`${base_url}/excel/export/vendor/user/employee/${userId}`}
              >
                <InsertDriveFileIcon style={{ fontSize: "x-large" }} />
              </a>
            </Tooltip>
          )}
{user.userCreateInd === true || user.role === "ADMIN" ? (
          <Button
            type="primary"
         
            onClick={() => handleEmployeeModal(true)}
          >
          < DataSaverOnIcon className="!text-icon"/>  Add
          </Button>
         ):null} 
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionRight)
);
