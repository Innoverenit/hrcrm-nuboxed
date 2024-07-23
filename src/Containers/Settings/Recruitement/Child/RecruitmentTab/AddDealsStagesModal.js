import React, { Component, Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DealsTaskForm from "../../Child/RecruitmentTab/DealsTaskForm"
import { StyledDrawer } from "../../../../../Components/UI/Antd";
//import MainNotes from "../../../CustomNote/MainNotes";





class AddDealsStagesModal extends Component {
  render() {
    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title="Task"
          width="64%"
          visible={this.props.addDrawerDealsStagesModal}
          destroyOnClose
          closable
          onClose={() => this.props.handledealStagesModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
           
            {/* <MainNotes
             type="customer"
             uniqueId={this.props.rowdata.customerId}
            /> */}
          <DealsTaskForm
            // stagesId={this.props.stagesId}
            currentItem={this.props.currentItem}
          />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDealsStagesModal);
