import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTradeViewType } from "./TradeAction";
import { BundleLoader } from "../../../Components/Placeholder";
import InventoryTableAll from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/InventoryTableAll";
import TradeHeader from "./TradeHeader";



class Trade extends Component {
  state = { currentData: "" };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const { setTradeViewType, viewType } = this.props;
    return (
      <React.Fragment>
        <TradeHeader
          setTradeViewType={setTradeViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ? (
            <InventoryTableAll />
          )
          :null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ trade, auth }) => ({
  viewType: trade.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTradeViewType,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
