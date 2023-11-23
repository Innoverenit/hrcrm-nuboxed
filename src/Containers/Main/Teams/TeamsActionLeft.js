import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PeopleIcon from '@mui/icons-material/People';
import TocIcon from '@mui/icons-material/Toc';
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Button, Empty, Tooltip, Badge } from "antd";
const Option = StyledSelect.Option;
class TeamsActionLeft extends React.Component {

  render() {
    const { viewType, setTeamsViewType, user } = this.props;

    return (
      <>
        <FlexContainer alignItems="center">
          {/* {user.functionName !== "Customer Care" && ( */}
            <Tooltip title="List View">
              <Badge size="small">
                <span
                  style={{
                    marginRight: "0.5rem",
                    color: viewType === "table" && "#1890ff",
                  }}
                  onClick={() => setTeamsViewType("table")}>
                  <TocIcon/>
                </span>
              </Badge>
            </Tooltip>
          {/* )} */}
          {/* {user.functionName !== "Customer Care" && ( */}
            <Tooltip title="Teams">
              <span
                onClick={() => setTeamsViewType("team")}
                style={{
                  marginRight: "0.5rem",
                  color: viewType === "team" && "#1890ff",
                }}
              >
             <PeopleIcon/>
              </span>
            </Tooltip>
          {/* )} */}

          {/* <Tooltip title="Client">
            <span
              onClick={() => setTeamsViewType("client")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "client" && "#1890ff",
              }}
            >
              <FontAwesomeIcon icon={solid('building')} />
            </span>
          </Tooltip>

          <Tooltip title="Inventory">
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

const mapStateToProps = ({ auth }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamsActionLeft);
