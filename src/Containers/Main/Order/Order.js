import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOrderViewType } from "./OrderAction";
import OrderHeader from "./OrderHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import CompleteOrder from "./CompleteOrder";
import AllCompleteOrderList from "./AllCompleteOrderList";
import ProductionOrderCardList from "./ProductionOrderCardList";

const AllOrderList = lazy(() => import("./AllOrderList"));
const OrderTableByUserID = lazy(() => import("./OrderTableByUserID"));
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      activeKey1: "1",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };

  handleTabChange1 = (key) => this.setState({ activeKey1: key });
  render() {
    const { setOrderViewType, viewType } = this.props;
    const { activeKey, activeKey1 } = this.state;
    return (
      <React.Fragment>
        <OrderHeader
          setOrderViewType={setOrderViewType}
          viewType={viewType}
          activeKey={activeKey}
          activeKey1={activeKey1}
        />

        <Suspense fallback={<BundleLoader />}>
          
          {this.props.viewType === "list" ? (
            <OrderTableByUserID
            />
            ) : this.props.viewType === "production" ? (
              <ProductionOrderCardList />
          ) : this.props.viewType === "all" ? (
            <AllOrderList />
          ) : this.props.viewType === "complete" ? (
            <CompleteOrder />
          ) : this.props.viewType === "allcomplete" ? (
            <AllCompleteOrderList />
          ) : null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ order, auth }) => ({
  viewType: order.viewType,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setOrderViewType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Order);
