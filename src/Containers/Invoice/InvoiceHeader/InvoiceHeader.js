import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import InvoiceActionLeft from "./InvoiceActionLeft";
import InvoiceActionRight from "./InvoiceActionRight";
class InvoiceHeader extends Component {
  render() {
    const { handleInvoiceModal, viewType, setInvoiceViewType } = this.props;
    return (
      <>
       <div className="sticky mt-1 z-50"> 
          <ActionHeader
             leftComponent={
              <InvoiceActionLeft
                viewType={viewType}
                setInvoiceViewType={setInvoiceViewType}
                currentData={this.props.currentData}
                handleClear={this.props.handleClear}
                setCurrentData={this.props.setCurrentData}
              />
            }
            rightComponent={
              <InvoiceActionRight
                viewType={viewType}
                handleInvoiceModal={handleInvoiceModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default InvoiceHeader;
