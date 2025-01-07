import { Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleCreateInvoiceDrawer} from "../../ProjectsAction"
import { Title, MultiAvatar } from "../../../../Components/UI/Elements";
import ProjectsInvoiceCreateModal from "../ProjectDetailsTab/ProjectsInvoiceCreateModal";

class ProjectOverView extends Component {
  render() {
     console.log("name",this.props.projectsById.projectName)
    const {
      projectsById: { projectName },
      toggleViewType,
       projectsById,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between"> 
          <div class=" flex justify-start flex-nowrap w-4/6"
          >
            <div class=" w-1/6">
              <MultiAvatar
                primaryTitle={projectsById.projectName}
              />
            </div>
            <div class=" flex flex-col w-2/3" >
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${projectName || ""}`}
              </Title>
            </div>
          
          </div>
          </div>
          
        <ProjectsInvoiceCreateModal
       handleCreateInvoiceDrawer={this.props.handleCreateInvoiceDrawer}
       addCreateInvoiceDrawer={this.props.addCreateInvoiceDrawer}
      />
      </>
    );
  }
}

const mapStateToProps = ({ customer,auth,projects}) => ({
  userId: auth.userDetails.userId,
  addCreateInvoiceDrawer:projects.addCreateInvoiceDrawer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCreateInvoiceDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverView);
