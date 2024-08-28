import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class SupplierOverDetailView extends Component {
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
       
      "188",  // "City",
      // "",   // "State",
      "1236",   // "Pincode",
      "1109",  // "Country",
      "186",   // "Street" 
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    console.log(this.props.supplier);
    const {
        supplier: { addresses },
    } = this.props;
    const { shipper } = this.props;

    return (
      <>
        <ShipperItemRow
            label={this.state.translatedMenuItems[4]}
            // {
            //   <FormattedMessage id="app.street" defaultMessage="Street" />
            // }
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow 
           label={this.state.translatedMenuItems[0]}
            // <FormattedMessage id="app.city" defaultMessage="City" />
          
        value={addresses && addresses[0].city} />
        <ShipperItemRow
   
         label={this.state.translatedMenuItems[1]}
        //  {
        //   <FormattedMessage id="app.state" defaultMessage="State" />
        // }
          value={addresses && addresses[0].state} />
        <ShipperItemRow
            label=
            {this.state.translatedMenuItems[2]}
            // {
            //   <FormattedMessage id="app.pincode" defaultMessage="Pincode" />
            // }
            value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
             label={this.state.translatedMenuItems[3]}
            //  {
            //   <FormattedMessage id="app.country" defaultMessage="Country" />
            // }
     
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default SupplierOverDetailView;

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
