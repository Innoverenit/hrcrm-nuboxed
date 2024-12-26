import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import ExtraCandidateCardView from "./CandidateCards/ExtraCandidateCardView";
const CandidateDetailCard =lazy(()=>import("./CandidateCards/CandidateDetailCard"));
const CandidateAddressCard =lazy(()=>import("./CandidateCards/CandidateAddressCard"));
const CandidateOverViewCard =lazy(()=>import("./CandidateCards/CandidateOverViewCard"));
const ProfileTopicOfIntrest =lazy(()=>import("./CandidateCards/CandidateTopicOfInterest"));
const CandidateDetailExtraCard=lazy(()=>import("./CandidateCards/CandidateDetailExtraCard"));
const CandidateExtraDetailCard=lazy(()=>import("./CandidateCards/CandidateExtraDetailCard"));
const CertificationLibrary =lazy(()=>import("./CandidateCards/CertificationLibrary"));
class CandidateDetailLeft extends Component {
  render() {
    const { candidate } = this.props;
    // console.log(userDetails);
    return (
      <div class=" flex flex-col "  >
        <CandidateOverViewCard       
        candidate={candidate}
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
         />
        <ProfileTopicOfIntrest 
         userType={"candidate"}
         uniqueId={this.props.candidate.candidateId}
         candidateId={this.props.candidate.candidateId}
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
      translatedMenuItems={this.props.translatedMenuItems}
        />
        <CertificationLibrary 
         userType={"candidate"}
         uniqueId={this.props.candidate.candidateId}
         candidateId={this.props.candidate.candidateId}
        translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
        />
        <CandidateExtraDetailCard 
        candidate={candidate} 
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}
        />
        <ExtraCandidateCardView candidate={candidate}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}/>
        
        <CandidateDetailCard candidate={candidate}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems} />
        
        <CandidateAddressCard candidate={candidate} />
        {/* <CandidateOverViewDetailCard candidate={candidate}/> */}
        <CandidateDetailExtraCard candidate={candidate}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}/>

       
      </div>
    );
  }
}
const mapStateToProps = ({ candidate }) => ({
  // singleCandidate: candidate.singleCandidate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDetailLeft);
