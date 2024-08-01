import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handlePromotionsDrawer,setPromotionViewType } from "./PrmotionAction";
import { BundleLoader } from "../../../Components/Placeholder";
import PrmotionHeader from "./PrmotionHeader";
import AddpromotionModal from "./AddpromotionModal";
import PrmotionTable from "./PrmotionTable";


class Prmotion extends Component {
  render() {
    const {setPromotionViewType,viewType}=this.props;
    return (
      <React.Fragment>
        <PrmotionHeader
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        handlePromotionsDrawer={this.props.handlePromotionsDrawer}
        addingpromotionModal={this.props.addingpromotionModal}
        setPromotionViewType={setPromotionViewType}
        viewType={viewType}/>
        <AddpromotionModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
          handlePromotionsDrawer={this.props.handlePromotionsDrawer}
          addingpromotionModal={this.props.addingpromotionModal}
        />
         <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
             <PrmotionTable
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
             viewType={viewType}
           />
          ) 
          : null}
          </Suspense>
       
     
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ promotion }) => ({
    addingpromotionModal: promotion.addingpromotionModal,
  viewType:promotion.viewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handlePromotionsDrawer,
        setPromotionViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Prmotion);


