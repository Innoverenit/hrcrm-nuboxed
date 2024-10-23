import React, { Component,Suspense ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";

const OrderPlanList = lazy(() =>import("../Child/OrderPlanList"));

class OrderPlanDrawerModal extends Component {
  render() {
    //   console.log("data5", this.props.customer.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.rowdata.employeeName}
          width="80%"
          visible={this.props.addSalesOrderModal}
          destroyOnClose
          closable
          onClose={() => this.props.handleSalesOrderDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <OrderPlanList 
              tabKey={this.props.tabKey}
            rowdata={this.props.rowdata}
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
)(OrderPlanDrawerModal);
