import React, { Component, Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const UsersMachineCard = lazy(() => import("./UsersMachineCard"));

class AddLocationMachineModal extends Component {
  render() {
    
    return (
      <div>
        <StyledDrawer
          title="Machine"
          width="55em"
        //   style={{ marginTop: "5rem" }}
          visible={this.props.addLocationMachineModal}
          closable
        //   placement="right"
          destroyOnClose
         // maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleLocationMachineModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <UsersMachineCard
          currentItems={this.props.currentItems}
          locationId={this.props.locationId}
                //storedLoc={this.props.storedLoc}
                />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({
//   opportunityId: opportunity.opportunity.opportunityId,
//   candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLocationMachineModal);
