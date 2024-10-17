import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { handleLocationModal,setLocationViewType } from "./LocationAction";
const LocationHeader = lazy(() => import("./LocationHeader"));
const LocationCard = lazy(() => import("./LocationCard"));
const LocationCard2 = lazy(() => import("./LocationCard2"));
const AddLocationModal = lazy(() => import("./AddLocationModal"));
const LocationMap = lazy(() => import("./LocationMap"));
const DeletedLocationCard = lazy(() =>import("./DeletedLocationCard"));

class Location extends Component {
  render() {
    const {setLocationViewType,viewType}=this.props;
    return (
      <React.Fragment>
        <Suspense fallback={<BundleLoader />}>
        <LocationHeader 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        handleLocationModal={this.props.handleLocationModal}
        addlocationModal={this.props.addlocationModal}
        setLocationViewType={setLocationViewType}
        viewType={viewType}/>
        <AddLocationModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
          handleLocationModal={this.props.handleLocationModal}
          addlocationModal={this.props.addlocationModal}
        />
         
          {this.props.viewType === "card" ? (
             <LocationCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
             viewType={viewType}
           />
          ) 
          :this.props.viewType === "map" ? (
            
            <LocationMap/>
             )
          :this.props.viewType === "tile" ? (
            
            <LocationCard2
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
             )
             :this.props.viewType === "delete" ? (
            
              <DeletedLocationCard
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}/>
               )
          : null}
          </Suspense>
       
     
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ location }) => ({
    addlocationModal: location.addlocationModal,
  viewType:location.viewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleLocationModal,
        setLocationViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Location);


