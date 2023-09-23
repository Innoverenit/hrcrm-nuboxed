import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const CustomerActionLeft=lazy(()=> import("./CustomerActionLeft"));
const CustomerActionRight=lazy(()=> import("./CustomerActionRight"));

class CustomerHeader extends Component {
  render() {
    const {
      handleCustomerModal,
      viewType,
      setCustomerViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <CustomerActionLeft
            viewType={viewType}
            handleChange={handleChange}
            setCustomerViewType={setCustomerViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <CustomerActionRight
            viewType={viewType}
            currentUser={this.props.currentUser} 
            handleDropChange={this.props.handleDropChange}

            handleCustomerModal={handleCustomerModal} />
          }
        />
      </div>
    );
  }
}

export default CustomerHeader;
