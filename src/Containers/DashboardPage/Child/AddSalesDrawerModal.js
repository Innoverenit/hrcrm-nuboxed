import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import RegionSalesList from "./RegionSalesList";

class AddSalesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Sales"
          title={`${this.props.rowdata.regions} Sales`}
          width="74%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addSalesModal}
          onClose={() => this.props.handleSalesModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <RegionSalesList 
             tabKey={this.props.tabKey}
             handleTabClick={this.props.handleTabClick}
             rowdata={this.props.rowdata} 
            // leadsId={this.props.rowdata.leadsId} 
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
)(AddSalesDrawerModal);
