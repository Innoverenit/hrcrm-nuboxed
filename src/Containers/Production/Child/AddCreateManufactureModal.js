

import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import { connect } from "react-redux";

//import RecruitmentDetails from "../../../OpportunityDetail/OpportunityTab/Recruitment/Child/RecruitmentDetails"
//import { getCandidateDocument } from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";
//import CandidateDocumentView from "../Candidate/CandidateDocumentView"

import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";
import ProductionManufactureCard from "./ProductionManufactureCard"



class AddCreateManufactureModal extends Component {
  
  // componentDidMount() {
  //   const {
  //     candidate: { candidateId },
  //     getCandidateDocument,
  //   } = this.props;
  //   getCandidateDocument(candidateId);
  // }
   
  

  

 
  render() {
    // const data=this.props.candidateByUserId.map((item)=>{
    //   return item.fullName
      
    // })
   
   
   
    return (
      <div>
 <StyledDrawer 
          title="Manufacture"
          width="83em"
          visible={this.props.addCreateManufactureCard}
        //   maskClosable={false}
          closable
         
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //   onCancel={() => this.props.handleCandidateEmailModal(false)}
        onClose={() => this.props.addCreateManufactureCardModal(false)}
          //style={{ top: 40 }}
        //   footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
  <ProductionManufactureCard
  productionProductId={this.props.productionProductId}
  />
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  // candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCreateManufactureModal);
