import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVendorViewType } from "./VendorAction";
import { BundleLoader } from "../../../Components/Placeholder";
import VendorHeader from "./VendorHeader";
import VendorCardList from "./VendorCardList";




class Vendor extends Component {
  state = { currentData: "" };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const { setVendorViewType, viewType } = this.props;
    return (
      <React.Fragment>
        <VendorHeader
          setVendorViewType={setVendorViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
            <VendorCardList />
          ) 
        //   : this.props.viewType==="all" ? (
        //     <AllSuppliersCardList/>
        //   )
        //   : this.props.viewType==="delete" ? (
        //     <SuppliersDeletedCardList/>
        //   )
          :null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ vendorList, auth }) => ({
  viewType: vendorList.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        setVendorViewType,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
