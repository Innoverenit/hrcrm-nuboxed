import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import ProjectsTaskTable from "../TaskDetailTable/ProjectsTaskTable";
import ProjectsTeamTable from "./ProjectsTeamTable";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ProjectInvoiceTable from"./ProjectInvoiceTable"; 

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class ProjectDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
      file: false,
    };
  }
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
  }

  componentWillUnmount() {
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {
        projectsById: { leadsId, name },
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
        
            <TabPane
              tab={
                <>
                  <FactCheckIcon
                 style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">Task</span>
                </>
              }
              key="1"
            >
            <ProjectsTaskTable projectsById={this.props.projectsById}/>
            </TabPane>

            <TabPane
              tab={
                <>
                  <FactCheckIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">
                  Team
                  </span>
                </>
              }
              key="2"
            >
           <ProjectsTeamTable projectsById={this.props.projectsById}/>
            </TabPane>
            
            <TabPane
              tab={
                <>              
                  <span class=" ml-1">
                  <ReceiptIcon className="!text-icon text-[#a9d8b8] mr-1" /> Invoice
                  </span>
                  <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                  
                        //  tooltiptitle= {this.state.translatedMenuItems[7]}
                         onClick={() => {
                       
                         }}                     
                       />
                </>
              }
              key="2"
            >
           {/* <ProjectInvoiceTable projectsById={this.props.projectsById}/> */}
            </TabPane>      
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ projects }) => ({
  projectsById:projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsTab);
