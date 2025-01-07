import React, {  Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const UsersMachineCard = lazy(() => import("./UsersMachineCard"));

function AddLocationMachineModal(props) {
  
    
    return (
      <div>
        <StyledDrawer
          title="Machine"
          // {`${props.translatedMenuItems[7]}`}        
          width="50%"       
          visible={props.addLocationMachineModal}
          closable     
          destroyOnClose       
          onClose={() => props.handleLocationMachineModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <UsersMachineCard
          currentItems={props.currentItems}
          locationId={props.locationId}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
                />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }

const mapStateToProps = ({ opportunity, candidate }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLocationMachineModal);
