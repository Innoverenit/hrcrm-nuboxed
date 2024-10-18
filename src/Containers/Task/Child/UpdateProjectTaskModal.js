import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
const ProjectTaskForm = lazy(() => import("../Child/ProjectTaskForm"));
class UpdateProjectTaskModal extends Component {
   
  render() {
console.log("Item",this.props.item)
  
    return (
      <div>
 <StyledDrawer
          title={this.props.item.taskName}
          width="25%"
          style={{marginTop:"5rem"}}
          visible={this.props.updateProjectTaskModal}
        //   maskClosable={false}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          
        
        onClose={() => this.props.handleUpdateProjectTaskModal(false)}
        footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
        <ProjectTaskForm
        item={this.props.item}
        />
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity,candidate }) => ({
//   opportunityId: opportunity.opportunity.opportunityId,
//   candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectTaskModal);
