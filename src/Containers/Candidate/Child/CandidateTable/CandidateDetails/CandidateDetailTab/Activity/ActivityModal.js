import React, { Component, lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

const ActivityForm =lazy(()=>import("../../../../../../Activity/ActivityForm"));

class ActivityModal extends Component {
  render() {
    const {
      addCandidateActivityModal,
      handleCandidateActivityModal,
      ...formProps
    } = this.props;

    return (
      <>
        <StyledDrawer
          title="Activity"
          visible={addCandidateActivityModal}
          width={"60%"}
          bodyStyle={{ padding: 0 }}
          style={{Top:"3rem"}}
          maskClosable={false}
          destroyOnClose
          onClose={() => handleCandidateActivityModal(false)}
          footer={null}
        >

            <Suspense fallback={<BundleLoader />}>
            <ActivityForm
             defaultValue={ this.props.defaultValue }
             candidateId={this.props.candidateId}
               uniqueId={this.props.candidate.candidateId}
               name={this.props.candidate.name}
               candidate={this.props.candidate} 
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
