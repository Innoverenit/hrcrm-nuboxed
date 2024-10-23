import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import RegionForm from "./RegionForm"
import { StyledDrawer } from "../../../../Components/UI/Antd";




class AddRegionDrawerModal extends Component {
  render() {
   
    return (
      <div>
 <StyledDrawer
          title="Target"
          width={"60%"}
          visible={this.props.addRegionModal}
          destroyOnClose
          closable
          placement="right"
        onClose={() => this.props.handleRegionDrawerModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
      <RegionForm
       setActiveTab={this.props.setActiveTab}
       activeTab={this.props.activeTab}
       currentregionId={this.props.currentregionId}
       selectedYear={this.props.selectedYear}
       setSelectedYear={this.props.setSelectedYear}
       sales={this.props.sales}
       setSales={this.props.setSales}
       fulfillment={this.props.fulfillment}
       setFulfillment={this.props.setFulfillment}
       years={this.props.years}
       investment={this.props.investment}
       yearSelectRef={this.props.yearSelectRef}
       setInvestment={this.props.setInvestment}
      />
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddRegionDrawerModal);
