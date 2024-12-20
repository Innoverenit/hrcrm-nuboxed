import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { Avatar, Tooltip, Badge  } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import GridViewIcon from '@mui/icons-material/GridView';

const TabPane = StyledTabs.TabPane;

class ProjectsActionLeft extends Component {
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
    const { activeKey } = this.state;

    const { setProjectsViewType, viewType, user } = this.props
    return (
      <>
        <div class="flex items-center" >      
          <Tooltip title="Card View">
          <Badge size="small">
            <span
            
              style={{
                marginRight: "0.5rem",
                color: viewType === "list" && "#1890ff",
                cursor:"pointer"
              }}
              onClick={() => setProjectsViewType("list")}>

              <Avatar style={{ background: this.props.viewType === "list" ? "#f279ab" : "#28a355" }}>
            <div className="text-white !text-icon"> <GridViewIcon className="!text-2xl cursor-pointer "/></div>
            </Avatar>
              </span>
            </Badge>
          </Tooltip>
         
          <Tooltip title="All ">
          <Badge size="small">
            <span
              style={{
                marginRight: "1.4rem",
                color: viewType === "all" && "#1890ff",
                cursor:"pointer"
              }}
             
              onClick={() => setProjectsViewType("all")}>
                 <Avatar style={{ background: this.props.viewType === "all" ? "#f279ab" : "#28a355" }}>
            <div className="text-white !text-icon"> <TocIcon className="!text-2xl cursor-pointer "/></div>
            </Avatar>
            </span>
            </Badge>
          </Tooltip>
          

        </div>

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
)(ProjectsActionLeft);
