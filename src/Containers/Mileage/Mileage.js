import React, { Component,Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleMileageModal,setMileageViewType } from "./MileageAction";
import { BundleLoader } from "../../Components/Placeholder";
const MileageHeader = lazy(() => import("./Child/MileageHeader"));
const AddMileageModal = lazy(() => import("./Child/AddMilegeModal"));
const MileageCard = lazy(() => import("./Child/MileageCard"));
const MileageStatusCard=lazy(()=>import("./Child/MileageStatusCard"));

class Mileage extends Component {
  render() {
    const {setMileageViewType,viewType}=this.props;
    return (
      <React.Fragment>
        <MileageHeader setMileageViewType={setMileageViewType}
        viewType={viewType}
        />
        <AddMileageModal
          handleMileageModal={this.props.handleMileageModal}
          addMileageModal={this.props.addMileageModal}
        />
    <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
            
             <MileageCard
              viewType={viewType}
            /> 
          ) 
          // :this.props.viewType === "tile" ? (
          //   <MileageCard2/>
            :this.props.viewType==="list" ?(
              <MileageStatusCard/>
            )
          : null}
          </Suspense>  
          
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ mileage }) => ({
  addMileageModal: mileage.addMileageModal,
  viewType:mileage.viewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleMileageModal,
      setMileageViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Mileage);
