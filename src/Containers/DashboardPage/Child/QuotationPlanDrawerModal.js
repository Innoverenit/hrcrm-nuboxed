import React, { Component,Suspense ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";

const QuotationPlanList = lazy(() =>import("../Child/QuotationPlanList"));

class QuotationPlanDrawerModal extends Component {
  render() {
    //   console.log("data5", this.props.customer.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.rowdata.employeeName}
          width="88%"
          visible={this.props.addSalesQuotationModal}
          destroyOnClose
          closable
          onClose={() => this.props.handleSalesQuotationDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            {/* <SalesTaskCardList 
              tabKey={this.props.tabKey}
            rowdata={this.props.rowdata}
            /> */}
           <QuotationPlanList
            tabKey={this.props.tabKey}
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
)(QuotationPlanDrawerModal);
