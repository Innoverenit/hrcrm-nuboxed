import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { Tooltip } from "antd";
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
            <span
              style={{
                marginRight: "0.5rem",
                color: viewType === "list" && "#1890ff",
                cursor:"pointer"
              }}
              
              onClick={() => setProjectsViewType("list")}
            ><GridViewIcon style={{fontSize:"1.4rem"}}  /></span>
          </Tooltip>
         
          <Tooltip title="All ">
            <TocIcon
              style={{
                marginRight: "1.4rem",
                color: viewType === "all" && "#1890ff",
                cursor:"pointer"
              }}
             
              onClick={() => setProjectsViewType("all")}
            />
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
