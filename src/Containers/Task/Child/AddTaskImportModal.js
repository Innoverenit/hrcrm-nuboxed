import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
const TaskImportForm = lazy(() => import("../Child/TaskImportForm"));

class AddTaskImportModal extends Component {
  render() {
   
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"60%"}
          visible={this.props.addTaskImportModal}
      
        onClose={() => this.props.handleTaskImportModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
     <TaskImportForm/>
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskImportModal);
