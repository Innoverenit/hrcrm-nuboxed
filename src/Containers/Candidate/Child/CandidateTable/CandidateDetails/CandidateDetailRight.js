import React, { Component, lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CandidateDetailTab = lazy(() =>
  import("./CandidateDetailTab/CandidateDetailTab")
);

class CandidateDetailRight extends Component {
  render() {
    console.log(this.props.candidateId);
    return (
      <div class=" w-full" >
        <CandidateDetailTab 
        candidate={this.props.candidateId} 
        selectedLanguage={this.props.selectedLanguage}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDetailRight);
