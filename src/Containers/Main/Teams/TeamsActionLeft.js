import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PeopleIcon from '@mui/icons-material/People';
import TocIcon from '@mui/icons-material/Toc';
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Button, Empty, Tooltip, Badge } from "antd";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { getperformanceRecord } from "./TeamsAction";
const Option = StyledSelect.Option;
class TeamsActionLeft extends React.Component {
  componentDidMount() {
  
    this.props.getperformanceRecord(this.props.reptMngrId)
  }
  render() {
    const { viewType, setTeamsViewType, user } = this.props;

    return (
      <>
        <FlexContainer alignItems="center">
          {/* {user.functionName !== "Customer Care" && ( */}
          <Tooltip title="Performance Management">
          <Badge
          size="small"
          count={
            (this.props.viewType === "client" &&
              this.props.performancerecordData.EmployeeListByReptMngrId) ||
            0
          }
          overflowCount={999}
        >
            <span
              onClick={() => setTeamsViewType("client")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "client" && "#1890ff",
              }}
            >
              <ManageAccountsIcon className="!text-2xl cursor-pointer" />
            </span>
            </Badge>
          </Tooltip>
            <Tooltip title="List View">
              <Badge size="small">
                <span
                  style={{
                    marginRight: "0.5rem",
                    color: viewType === "table" && "#1890ff",
                  }}
                  onClick={() => setTeamsViewType("table")}>
                  <TocIcon className="!text-2xl cursor-pointer"/>
                </span>
              </Badge>
            </Tooltip>
          {/* )} */}
          {/* {user.functionName !== "Customer Care" && ( */}
            <Tooltip title="Teams">
            <Badge size="small">
              <span
                onClick={() => setTeamsViewType("teams")}
                style={{
                  marginRight: "0.5rem",
                  color: viewType === "teams" && "#1890ff",
                }}
              >
             <PeopleIcon className="!text-2xl cursor-pointer"/>
              </span>
            </Badge>
            </Tooltip>
          {/* )} */}

       

          {/* <Tooltip title="Inventory">
            <span
              onClick={() => setTeamsViewType("inventory")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "inventory" && "#1890ff",
              }}
            >
              <FontAwesomeIcon icon={solid('warehouse')} />
            </span>
          </Tooltip> */}

        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ auth,teams }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  performancerecordData:teams.performancerecordData,
  reptMngrId:auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getperformanceRecord
},
 dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamsActionLeft);
