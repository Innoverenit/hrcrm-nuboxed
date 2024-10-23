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
          width="55%"
       
          visible={this.props.addLocationMachineModal}
          closable
     
          destroyOnClose
       
          onClose={() => this.props.handleLocationMachineModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <UsersMachineCard
          currentItems={this.props.currentItems}
          locationId={this.props.locationId}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
                />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLocationMachineModal);
