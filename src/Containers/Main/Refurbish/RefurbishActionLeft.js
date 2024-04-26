import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

class RefurbishActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      value: 1,
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  render() {

    const { setProductionViewType, viewType, } = this.props
    return (
      <>
        <FlexContainer alignItems="center">

          {/* {user.designation === "Executive" && */}


          <Tooltip title="List">
            <span class=" text-sm cursor-pointer"
              onClick={() => setProductionViewType("list")}
              style={{
                color: viewType === "list" && "#1890ff",
              }}
            >
              <Avatar style={{ background: viewType === "list" ? "#f279ab" : "#4bc076" }}>
                <HomeRepairServiceIcon className="text-white cursor-pointer" /></Avatar>

            </span>
          </Tooltip>

          <span class=" ml-2 text-sm cursor-pointer"
            onClick={() => setProductionViewType("all")}
            style={{
              color: viewType === "all" && "#1890ff",
            }}
          >
            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
              <div className="text-white">ALL</div></Avatar>

          </span>
        </FlexContainer>

      </>
    );
  }
}
const mapStateToProps = ({ auth, production }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
