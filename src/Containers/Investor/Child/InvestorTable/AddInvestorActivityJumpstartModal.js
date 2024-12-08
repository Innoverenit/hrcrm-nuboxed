import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const InvestorActivityJumpstartCardList =lazy(()=> import("./InvestorActivityJumpstartCardList"));
class AddInvestorActivityJumpstartModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Sales"
           title={this.props.RowData.name}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addInvestorActivityJumpstartModal}
          onClose={() => this.props.handleInvestorActivityJumpstartModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <InvestorActivityJumpstartCardList 
          RowData={this.props.RowData} 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
            />
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
)(AddInvestorActivityJumpstartModal);
