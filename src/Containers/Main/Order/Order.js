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

const EcomCardList=lazy(()=>import("./EcomCardList"));
const AllOrderList = lazy(() => import("./AllOrderList"));
const OrderTableByUserID = lazy(() => import("./OrderTableByUserID"));

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      activeKey1: "1",
      viewType: this.props.viewType || 'production',
    };
  }
  componentDidMount() {
    const { repairInd, ecomModInd, tradingInd, orderManagementInd, productionInd } = this.props.user.moduleMapper;
  
    // If productionInd is false initially, switch to "repir"
    if (!productionInd && repairInd && orderManagementInd) {
      this.setState({ viewType: 'list' });
    }
    // If repairInd is false and ecomModInd is true, switch to "procure"
    else if (!repairInd && tradingInd && orderManagementInd) {
      this.setState({ viewType: 'procure' });
    }
    // If both repairInd and ecomModInd are false, but ecomModInd and orderManagementInd are true, switch to "ecom"
    else if (!repairInd && !tradingInd && ecomModInd && orderManagementInd) {
      this.setState({ viewType: 'ecom' });
    } else {
      // Default case if none of the conditions match
      this.setState({ viewType: 'production' });
    }
  }
  handleViewChange = (type) => {
    this.setState({ viewType: type });
  };
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };

  handleTabChange1 = (key) => this.setState({ activeKey1: key });
  render() {
    const { setOrderViewType } = this.props;
    const { activeKey, activeKey1 } = this.state;
    const { viewType } = this.state;
    return (
      <React.Fragment>
        <Suspense fallback={<BundleLoader />}>
        <OrderHeader
         selectedLanguage={this.props.selectedLanguage}
         translateText={this.props.translateText}
          setOrderViewType={setOrderViewType}
          handleViewChange={this.handleViewChange}
          viewType={viewType}
          activeKey={activeKey}
          activeKey1={activeKey1}
        />

        
          
          {viewType === "list" && this.props.user.moduleMapper.repairInd === true && this.props.user.moduleMapper.orderManagementInd ? (
            <OrderTableByUserID
            selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}/>
            ) : viewType === "production" && this.props.user.moduleMapper.productionInd === true && this.props.user.moduleMapper.orderManagementInd ? (
              <ProductionOrderCardList
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText} />
              ) : viewType === "complete" ? (
                <ProductionHistoryCardList
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}
                />
                ) : viewType === "productionAll" ? (
                  <ProductionAllCardList 
                  selectedLanguage={this.props.selectedLanguage}
                  translateText={this.props.translateText}/>
          ) : viewType === "all" ? (
            <AllOrderList
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText} />
          ) : viewType === "complete" ? (
            <CompleteOrder  
              selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText} />
           ) : viewType === "delete" ? (
              <DeletedOrderList 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}/>
          ) : viewType === "allcomplete" ? (
            <AllCompleteOrderList 
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}/>
          ) : viewType === "procure" && this.props.user.moduleMapper.tradingInd && this.props.user.moduleMapper.orderManagementInd ? (
            <ProcreCardList 
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}/>
          ) : viewType === "ecom" && this.props.user.moduleMapper.ecomModInd && this.props.user.moduleMapper.orderManagementInd ? (
            <EcomCardList 
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}/>
          ) :
          null}
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
