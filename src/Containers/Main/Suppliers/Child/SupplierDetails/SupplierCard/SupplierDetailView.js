import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class SupplierDetailView extends Component {
  render() {
    const {
      supplier: { phoneNo, emailId, shipByName },
      toggleViewType,
    } = this.props;

    return (
      <>
        <ShipperItemRow
          label={
            <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
          }
          value={phoneNo} />
        <ShipperItemRow
          label={
            <FormattedMessage id="app.email" defaultMessage="Email" />
          }
          value={emailId} />

      </>
    );
  }
}
export default SupplierDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <div class="flex items-center flex-nowrap m-1 text-sm max-xl:text-[0.65rem]">
      <div class="text-[#444] font-semibold w-[40%]">
        {label}
      </div>
      <div
        class=" whitespace-nowrap overflow-hidden text-ellipsis w-[61%] max-xl:text-[0.65rem]">
        {value}
      </div>
    </div>
  );
};
