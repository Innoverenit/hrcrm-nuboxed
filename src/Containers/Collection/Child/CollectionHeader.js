import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import CollectionActionLeft from "./CollectionActionLeft";
class CollectionHeader extends Component {
  render() {

    const {
      viewType,
      setCollectionViewType,
      activeKey,
      activeKey1
    } = this.props;

    return (
      <div>
        <ActionHeader
          leftComponent={
            <CollectionActionLeft
              setCollectionViewType={setCollectionViewType}
              setCustomerSubViewType={this.props.setCustomerSubViewType}
              setDistributorViewType={this.props.setDistributorViewType}
              viewType={viewType}
              activeKey={activeKey}
              activeKey1={activeKey1}
              subViewCustomer={this.props.subViewCustomer}
              subViewDistributor={this.props.subViewDistributor}
              functionName={this.props.functionName}
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
              setCurrentData={this.props.setCurrentData}
              currentData1={this.props.currentData1}
              handleClear1={this.props.handleClear1}
              setCurrentData1={this.props.setCurrentData1}
            />
          }
          // rightComponent={<CollectionActionRight />}
        />
      </div>
    );
  }
}

export default CollectionHeader;
