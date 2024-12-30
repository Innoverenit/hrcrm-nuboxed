import React, {lazy,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { handleChooserModal } from "../PlannerAction";

const PlannerTab =lazy(()=>import("./PlannerTab"));

class FormChooserModal extends React.Component {
  render() {
    const {
      chooserModal,
      handleChooserModal,
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Schedule"         
          visible={chooserModal}
          width={"50%"}
          style={{ overflow: "visible"}}
          maskClosable={false}         
          destroyOnClose
          onClose={() => handleChooserModal(false)}
          footer={null}
        >
          <div className="flex items-center justify-evenly">
            <Suspense fallback={"Loading"}>
            <PlannerTab
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems} />
            </Suspense>
          </div>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = ({ call, event, task, planner, leave }) => ({
  chooserModal: planner.chooserModal,
  callModal: call.callModal,
  eventModal: event.eventModal,
  taskModal: task.taskModal,
  leaveModal: leave.leaveModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleChooserModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormChooserModal);
