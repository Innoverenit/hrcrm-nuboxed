import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOrderViewType } from "./OrderAction";
import OrderHeader from "./OrderHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import CompleteOrder from "./CompleteOrder";
import AllCompleteOrderList from "./AllCompleteOrderList";
import ProductionOrderCardList from "./ProductionOrderCardList";
import ProductionHistoryCardList from "./ProductionHistoryCardList";
import ProductionAllCardList from "./ProductionAllCardList";
import DeletedOrderList from "./DeletedOrderList";
import ProcreCardList from "../Procre/ProcreCardList";

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
         selectedLanguage={this.props.selectedLanguage}
         translateText={this.props.translateText}
          setOrderViewType={setOrderViewType}
          viewType={viewType}
          activeKey={activeKey}
          activeKey1={activeKey1}
        />

        <Suspense fallback={<BundleLoader />}>
          
          {this.props.viewType === "list" ? (
            <OrderTableByUserID
            selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}/>
            ) : this.props.viewType === "production" ? (
              <ProductionOrderCardList
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText} />
              ) : this.props.viewType === "complete" ? (
                <ProductionHistoryCardList />
                ) : this.props.viewType === "productionAll" ? (
                  <ProductionAllCardList 
                  selectedLanguage={this.props.selectedLanguage}
                  translateText={this.props.translateText}/>
          ) : this.props.viewType === "all" ? (
            <AllOrderList
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText} />
          ) : this.props.viewType === "complete" ? (
            <CompleteOrder  
              selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText} />
           ) : this.props.viewType === "delete" ? (
              <DeletedOrderList 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}/>
          ) : this.props.viewType === "allcomplete" ? (
            <AllCompleteOrderList 
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}/>
          ) : this.props.viewType === "procure" ? (
            <ProcreCardList 
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}/>
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
