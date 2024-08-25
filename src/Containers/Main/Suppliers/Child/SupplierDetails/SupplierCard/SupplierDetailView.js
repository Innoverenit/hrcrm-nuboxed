import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class SupplierDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
         "Phone #",
        "Email"
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      // this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const {
      supplier: { phoneNo, emailId, shipByName },
      toggleViewType,
    } = this.props;

    return (
      <>
        <ShipperItemRow
          label={this.state.translatedMenuItems[0]}
            // <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
          
          value={phoneNo} />
        <ShipperItemRow
          label={this.state.translatedMenuItems[1]}
            // <FormattedMessage id="app.email" defaultMessage="Email" />
          
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
