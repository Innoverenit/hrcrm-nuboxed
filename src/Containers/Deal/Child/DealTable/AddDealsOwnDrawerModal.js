import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const WonForm = lazy(() => import("./WonForm"));
class AddDealsOwnDrawerModal extends Component {
  render() {
     
console.log(this.props.currentItem.opportunityName)
    return (
      <div>
        <StyledDrawer
          title={this.props.currentItem.opportunityName}
          width="30%"
          visible={this.props.addOwnModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleOwnModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <WonForm currentItem={this.props.currentItem}/>
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDealsOwnDrawerModal);
